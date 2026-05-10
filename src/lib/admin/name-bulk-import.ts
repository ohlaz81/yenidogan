import { z } from "zod";
import { slugify } from "@/lib/slug";
import { firstLetterTr } from "@/lib/text";

const genderZ = z.enum(["GIRL", "BOY", "UNISEX"]);
const styleZ = z.enum(["MODERN", "CLASSIC", "RARE", "POPULAR"]);

function toBool(v: unknown): boolean | undefined {
  if (typeof v === "boolean") return v;
  if (v === "true" || v === "1" || v === 1) return true;
  if (v === "false" || v === "0" || v === 0) return false;
  return undefined;
}

/** İçe aktarım satırı: `id` ve diğer bilinmeyen alanlar yoksayılır (strict değil). */
const importRowSchema = z
  .object({
    slug: z.string().min(1),
    displayName: z.string().min(1),
    gender: genderZ,
    meaning: z.string().min(1),
    origin: z.string().min(1),
    pronunciation: z.string().min(1),
    popularity: z.coerce.number(),
    popularScore: z.coerce.number(),
    inQuran: z.union([z.boolean(), z.string(), z.number()]).transform((v) => toBool(v) ?? false),
    quranReference: z.union([z.string(), z.null()]).optional(),
    style: styleZ,
    isShort: z.union([z.boolean(), z.string(), z.number()]).transform((v) => toBool(v) ?? false),
    beautifulMeaning: z.union([z.boolean(), z.string(), z.number()]).transform((v) => toBool(v) ?? false),
    firstLetter: z.string().optional(),
    intro: z.union([z.string(), z.null()]).optional(),
    traits: z.unknown().optional(),
    published: z
      .union([z.boolean(), z.string(), z.number()])
      .optional()
      .transform((v) => (v === undefined ? true : toBool(v) ?? true)),
    imageId: z.union([z.string(), z.null()]).optional(),
    id: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .strip();

export type NameImportRowError = { index: number; slug?: string; message: string };

export type NormalizedNameImportRow = {
  slug: string;
  displayName: string;
  gender: z.infer<typeof genderZ>;
  meaning: string;
  origin: string;
  pronunciation: string;
  popularity: number;
  popularScore: number;
  inQuran: boolean;
  quranReference: string | null;
  style: z.infer<typeof styleZ>;
  isShort: boolean;
  beautifulMeaning: boolean;
  firstLetter: string;
  intro: string | null;
  traits: string[] | null;
  published: boolean;
  imageId: string | null;
};

function normalizeTraits(raw: unknown): string[] | null {
  if (raw == null) return null;
  if (Array.isArray(raw)) {
    const arr = raw.filter((x): x is string => typeof x === "string").map((s) => s.trim()).filter(Boolean);
    return arr.length ? arr : null;
  }
  if (typeof raw === "string") {
    const arr = raw
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    return arr.length ? arr : null;
  }
  return null;
}

export type ParsedNamesImport = {
  rows: NormalizedNameImportRow[];
  errors: NameImportRowError[];
};

export function parseNamesImportJsonString(raw: string): { ok: true; data: unknown } | { ok: false; error: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return { ok: false, error: "JSON ayrıştırılamadı (geçersiz sözdizimi)." };
  }
  return { ok: true, data: parsed };
}

export function extractNamesArray(data: unknown): unknown[] | { error: string } {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (Array.isArray(o.names)) return o.names;
    if (Array.isArray(o.Name)) return o.Name as unknown[];
    if (Array.isArray(o.rows)) return o.rows as unknown[];
  }
  return {
    error: 'Beklenen biçim: kök düzeyde dizi veya { "names": [...] } / { "rows": [...] } (yedek) objesi.',
  };
}

export function validateAndNormalizeNamesImport(arr: unknown[]): ParsedNamesImport {
  const errors: NameImportRowError[] = [];
  const rows: NormalizedNameImportRow[] = [];
  const slugFirstIndex = new Map<string, number>();

  arr.forEach((item, index) => {
    const parsed = importRowSchema.safeParse(item);
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join("; ");
      errors.push({ index, message: msg });
      return;
    }
    const d = parsed.data;
    const slug = slugify(d.slug);
    if (!slug) {
      errors.push({ index, message: "Geçerli bir slug üretilemedi." });
      return;
    }
    if (slugFirstIndex.has(slug)) {
      errors.push({
        index,
        slug,
        message: `Yinelenen slug (önce satır ${String(slugFirstIndex.get(slug))}).`,
      });
      return;
    }
    slugFirstIndex.set(slug, index);

    const popularity = Math.min(5, Math.max(1, Math.round(Number(d.popularity) || 1)));
    const popularScore = Math.min(1000, Math.max(0, Math.round(Number(d.popularScore) || 0)));
    const inQuranTrue = d.inQuran;
    const quranRefTrim = (d.quranReference ?? "").trim();
    const quranReference = inQuranTrue && quranRefTrim.length > 0 ? quranRefTrim : null;
    const firstLetter = (d.firstLetter?.trim() || firstLetterTr(d.displayName)).slice(0, 8) || firstLetterTr(d.displayName);

    rows.push({
      slug,
      displayName: d.displayName.trim(),
      gender: d.gender,
      meaning: d.meaning.trim(),
      origin: d.origin.trim(),
      pronunciation: d.pronunciation.trim(),
      popularity,
      popularScore,
      inQuran: inQuranTrue,
      quranReference,
      style: d.style,
      isShort: d.isShort,
      beautifulMeaning: d.beautifulMeaning,
      firstLetter,
      intro: d.intro?.trim() ? d.intro.trim() : null,
      traits: normalizeTraits(d.traits),
      published: d.published,
      imageId: d.imageId && String(d.imageId).length ? String(d.imageId) : null,
    });
  });

  return { rows, errors };
}

export function countInsertVsUpdate(
  rows: NormalizedNameImportRow[],
  existingSlugs: Set<string>,
): { toInsert: number; toUpdate: number } {
  let toInsert = 0;
  let toUpdate = 0;
  for (const r of rows) {
    if (existingSlugs.has(r.slug)) toUpdate += 1;
    else toInsert += 1;
  }
  return { toInsert, toUpdate };
}
