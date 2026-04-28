import { getSupabase } from "@/lib/supabase/admin";
import { applyNameListParams } from "@/lib/static/names-store";
import type { NameListParams } from "@/lib/name-list-params";
import type { Gender, MediaAsset, Name, NameWithDetail } from "@/types/database";

type RowWithImg = Record<string, unknown> & {
  image?: MediaAsset | null;
};

function tryGetSupabase() {
  try {
    return getSupabase();
  } catch {
    return null;
  }
}

function mapTraits(raw: unknown): unknown {
  if (raw === null || raw === undefined) return null;
  if (Array.isArray(raw)) return raw;
  return null;
}

function mapNameRow(row: RowWithImg): Name & { image: MediaAsset | null } {
  const image = row.image && typeof row.image === "object" ? (row.image as MediaAsset) : null;
  return {
    id: String(row.id),
    slug: String(row.slug),
    displayName: String(row.displayName),
    gender: row.gender as Gender,
    meaning: String(row.meaning),
    origin: String(row.origin),
    pronunciation: String(row.pronunciation),
    popularity: Number(row.popularity) || 1,
    popularScore: Number(row.popularScore) ?? 0,
    inQuran: Boolean(row.inQuran),
    style: row.style as Name["style"],
    isShort: Boolean(row.isShort),
    beautifulMeaning: Boolean(row.beautifulMeaning),
    firstLetter: String(row.firstLetter),
    intro: row.intro === null || row.intro === undefined ? null : String(row.intro),
    traits: mapTraits(row.traits),
    published: Boolean(row.published),
    imageId: row.imageId === null || row.imageId === undefined ? null : String(row.imageId),
    createdAt: String(row.createdAt),
    updatedAt: String(row.updatedAt),
    image,
  };
}

/**
 * Yayında tüm isimler (filtre için bellek içi kullanım).
 * Başarısız veya env yoksa null.
 */
export async function fetchPublishedNamesRows(): Promise<Array<Name & { image: MediaAsset | null }> | null> {
  const s = tryGetSupabase();
  if (!s) return null;

  const { data, error } = await s
    .from("Name")
    .select("*, image:imageId(id,url,alt,createdAt)")
    .eq("published", true)
    .limit(8000);

  if (error) return null;
  if (!data?.length) return [];

  return (data as RowWithImg[]).map(mapNameRow);
}

export async function listNamesFromDb(p: NameListParams) {
  const rows = await fetchPublishedNamesRows();
  if (rows === null) return null;
  /** Tablo boşsa seed veriye düşelim (importsuz ortam). */
  if (rows.length === 0) return null;
  return applyNameListParams(rows, p);
}

export async function getNameBySlugFromDb(slug: string): Promise<NameWithDetail | null> {
  const s = tryGetSupabase();
  if (!s) return null;

  const { data: row, error } = await s
    .from("Name")
    .select("*, image:imageId(id,url,alt,createdAt)")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !row) return null;

  const base = mapNameRow(row as RowWithImg);

  const { data: links } = await s.from("SimilarName").select("targetId").eq("sourceId", base.id);

  const tids = (links ?? []).map((l: { targetId: string }) => l.targetId).filter(Boolean);
  if (!tids.length) {
    return { ...base, similarFrom: [] };
  }

  const { data: targets, error: tErr } = await s
    .from("Name")
    .select("*, image:imageId(id,url,alt,createdAt)")
    .in("id", tids)
    .eq("published", true);

  if (tErr || !targets?.length) {
    return { ...base, similarFrom: [] };
  }

  const mapped = (targets as RowWithImg[]).map(mapNameRow);
  const similarFrom = mapped.map((target) => ({ target }));

  return { ...base, similarFrom };
}

export async function getNamesByLetterFromDb(letter: string, gender?: Gender, take = 12) {
  const p: NameListParams = {
    letter: letter.toLocaleUpperCase("tr-TR"),
    gender,
    take: 200,
    orderBy: "popular",
  };
  const r = await listNamesFromDb(p);
  if (!r) return null;
  return r.items.slice(0, take);
}
