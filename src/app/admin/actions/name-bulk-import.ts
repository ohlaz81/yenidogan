"use server";

import { createId } from "@paralleldrive/cuid2";
import { revalidatePath } from "next/cache";
import { revalidatePublicNamePages } from "@/lib/revalidate-public-names";
import { getSupabase } from "@/lib/supabase/admin";
import { ADMIN_PERMISSIONS, requirePermission } from "@/lib/admin-permissions";
import {
  fetchAllNameSlugs,
  fetchAllNamesForBackup,
  fetchExistingNamesBySlugs,
  upsertNamesInChunks,
} from "@/lib/admin/name-db-pagination";
import {
  countInsertVsUpdate,
  extractNamesArray,
  parseNamesImportJsonString,
  validateAndNormalizeNamesImport,
  type NameImportRowError,
  type NormalizedNameImportRow,
} from "@/lib/admin/name-bulk-import";

const MAX_ERROR_SAMPLES = 100;

function revalidateNamePaths() {
  revalidatePublicNamePages();
  revalidatePath("/admin/isimler");
  revalidatePath("/admin/anasayfa");
  revalidatePath("/admin/isimler/yeni");
  revalidatePath("/admin/isimler/[id]", "page");
}

export type PreviewBulkNamesImportResult =
  | {
      ok: true;
      totalInFile: number;
      validRows: number;
      errorCount: number;
      toInsert: number;
      toUpdate: number;
      errors: NameImportRowError[];
      errorsTruncated: boolean;
    }
  | { ok: false; error: string };

export async function previewBulkNamesImportAction(jsonText: string): Promise<PreviewBulkNamesImportResult> {
  await requirePermission(ADMIN_PERMISSIONS.names);
  const trimmed = jsonText.trim();
  if (!trimmed) return { ok: false, error: "JSON metni boş." };

  const parsed = parseNamesImportJsonString(trimmed);
  if (!parsed.ok) return { ok: false, error: parsed.error };

  const arr = extractNamesArray(parsed.data);
  if (!Array.isArray(arr)) return { ok: false, error: arr.error };

  const { rows, errors } = validateAndNormalizeNamesImport(arr);
  const s = getSupabase();
  const { slugs: slugSet, error: eErr } = await fetchAllNameSlugs(s);
  if (eErr) return { ok: false, error: `Veritabanı okunamadı: ${eErr}` };
  const { toInsert, toUpdate } = countInsertVsUpdate(rows, slugSet);

  const errorsTruncated = errors.length > MAX_ERROR_SAMPLES;
  const errorSample = errorsTruncated ? errors.slice(0, MAX_ERROR_SAMPLES) : errors;

  return {
    ok: true,
    totalInFile: arr.length,
    validRows: rows.length,
    errorCount: errors.length,
    toInsert,
    toUpdate,
    errors: errorSample,
    errorsTruncated,
  };
}

export type ApplyBulkNamesImportResult =
  | {
      ok: true;
      backupJson: string;
      backupRowCount: number;
      appliedValid: number;
      toInsert: number;
      toUpdate: number;
    }
  | {
      ok: false;
      error: string;
      phase?: "validate" | "backup" | "upsert";
      errors?: NameImportRowError[];
      /** Yedek, upsert öncesi alındı; hata halinde istemci indirip durumu inceleyebilir. */
      backupJson?: string;
    };

function normalizedToDbRow(
  r: NormalizedNameImportRow,
  id: string,
  createdAt: string,
  updatedAt: string,
): Record<string, unknown> {
  return {
    id,
    slug: r.slug,
    displayName: r.displayName,
    gender: r.gender,
    meaning: r.meaning,
    origin: r.origin,
    pronunciation: r.pronunciation,
    popularity: r.popularity,
    popularScore: r.popularScore,
    inQuran: r.inQuran,
    quranReference: r.quranReference,
    style: r.style,
    isShort: r.isShort,
    beautifulMeaning: r.beautifulMeaning,
    firstLetter: r.firstLetter,
    intro: r.intro,
    traits: r.traits,
    published: r.published,
    imageId: r.imageId,
    createdAt,
    updatedAt,
  };
}

export async function applyBulkNamesImportAction(jsonText: string): Promise<ApplyBulkNamesImportResult> {
  await requirePermission(ADMIN_PERMISSIONS.names);
  const trimmed = jsonText.trim();
  if (!trimmed) return { ok: false, error: "JSON metni boş.", phase: "validate" };

  const parsed = parseNamesImportJsonString(trimmed);
  if (!parsed.ok) return { ok: false, error: parsed.error, phase: "validate" };

  const arr = extractNamesArray(parsed.data);
  if (!Array.isArray(arr)) return { ok: false, error: arr.error, phase: "validate" };

  const { rows, errors } = validateAndNormalizeNamesImport(arr);
  if (errors.length > 0) {
    return {
      ok: false,
      error: `${errors.length} geçersiz veya yinelenen satır var; içe aktarma yapılmadı.`,
      phase: "validate",
      errors: errors.slice(0, MAX_ERROR_SAMPLES),
    };
  }
  if (rows.length === 0) {
    return { ok: false, error: "İçe aktarılacak geçerli kayıt yok.", phase: "validate" };
  }

  const s = getSupabase();
  const now = new Date().toISOString();

  const { rows: backupRows, error: bErr } = await fetchAllNamesForBackup(s);
  if (bErr) return { ok: false, error: `Yedek alınamadı: ${bErr}`, phase: "backup" };

  const backupJson = JSON.stringify(
    { exportedAt: now, source: "Name table full backup before bulk JSON import", rows: backupRows },
    null,
    2,
  );

  const slugs = rows.map((r) => r.slug);
  const { rows: existingForSlugs, error: exErr } = await fetchExistingNamesBySlugs(s, slugs);
  if (exErr) return { ok: false, error: `Mevcut kayıtlar okunamadı: ${exErr}`, phase: "backup" };

  const bySlug = new Map(existingForSlugs.map((row) => [row.slug, row]));

  let toInsert = 0;
  let toUpdate = 0;
  for (const r of rows) {
    if (bySlug.has(r.slug)) toUpdate += 1;
    else toInsert += 1;
  }

  const dbRows: Record<string, unknown>[] = rows.map((r) => {
    const ex = bySlug.get(r.slug);
    const id = ex?.id ?? createId();
    const createdAt = ex?.createdAt ?? now;
    return normalizedToDbRow(r, id, createdAt, now);
  });

  const { error: upErr } = await upsertNamesInChunks(s, dbRows);
  if (upErr) {
    return {
      ok: false,
      error: upErr,
      phase: "upsert",
      backupJson,
    };
  }

  revalidateNamePaths();

  return {
    ok: true,
    backupJson,
    backupRowCount: backupRows.length,
    appliedValid: rows.length,
    toInsert,
    toUpdate,
  };
}
