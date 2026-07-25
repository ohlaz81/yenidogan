import { revalidateTag, unstable_cache } from "next/cache";
import { getSupabase } from "@/lib/supabase/admin";
import { ensureNameDisplayImage } from "@/lib/name-display-image";
import { applyNameListParams, pickDailyFromNameList } from "@/lib/static/names-store";
import { firstLetterTr } from "@/lib/text";
import { normalizeNameSlug } from "@/lib/slug";
import type { NameListParams } from "@/lib/name-list-params";
import type { Gender, MediaAsset, Name, NameWithDetail } from "@/types/database";

type RowWithImg = Record<string, unknown> & {
  image?: MediaAsset | null;
  similarFrom?: Array<{
    target?: RowWithImg | null;
  }> | null;
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

export class PublishedNamesDataSourceError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "PublishedNamesDataSourceError";
  }
}

function requireSupabase() {
  const client = tryGetSupabase();
  if (!client) {
    throw new PublishedNamesDataSourceError("Yayınlanmış isimler için Supabase bağlantısı yapılandırılmamış.");
  }
  return client;
}

function normalizeDbBool(raw: unknown): boolean {
  if (typeof raw === "boolean") return raw;
  if (typeof raw === "number") return raw === 1;
  if (typeof raw === "string") {
    const value = raw.trim().toLocaleLowerCase("tr-TR");
    return ["true", "1", "yes", "evet", "e", "yayinda", "yayında", "published"].includes(value);
  }
  return false;
}

function normalizeDbGender(raw: unknown): Gender {
  const value = String(raw ?? "").trim().toLocaleUpperCase("tr-TR");
  if (["GIRL", "KIZ", "KIZLAR", "FEMALE"].includes(value)) return "GIRL";
  if (["BOY", "ERKEK", "OĞLAN", "OGLAN", "MALE"].includes(value)) return "BOY";
  if (["UNISEX", "UNİSEX", "UNISEKS", "ÜNISEX", "ÜNİSEX"].includes(value)) return "UNISEX";
  return "UNISEX";
}

function normalizeDbFirstLetter(raw: unknown, displayName: string): string {
  const fromDb = String(raw ?? "").trim();
  return firstLetterTr(fromDb || displayName);
}

function mapNameRow(row: RowWithImg): Name & { image: MediaAsset | null } {
  const rawImage = Array.isArray(row.image) ? row.image[0] : row.image;
  const image = rawImage && typeof rawImage === "object" ? (rawImage as MediaAsset) : null;
  const displayName = String(row.displayName);
  return {
    id: String(row.id),
    slug: String(row.slug),
    displayName,
    gender: normalizeDbGender(row.gender),
    meaning: row.meaning === null || row.meaning === undefined ? "" : String(row.meaning),
    origin: row.origin === null || row.origin === undefined ? "" : String(row.origin),
    pronunciation: row.pronunciation === null || row.pronunciation === undefined ? "" : String(row.pronunciation),
    popularity: Number(row.popularity) || 1,
    popularScore: Number(row.popularScore) ?? 0,
    inQuran: normalizeDbBool(row.inQuran),
    quranReference:
      row.quranReference === null || row.quranReference === undefined
        ? null
        : String(row.quranReference).trim() || null,
    style: row.style as Name["style"],
    isShort: normalizeDbBool(row.isShort),
    beautifulMeaning: normalizeDbBool(row.beautifulMeaning),
    firstLetter: normalizeDbFirstLetter(row.firstLetter, displayName),
    intro: row.intro === null || row.intro === undefined ? null : String(row.intro),
    traits: mapTraits(row.traits),
    published: normalizeDbBool(row.published),
    imageId: row.imageId === null || row.imageId === undefined ? null : String(row.imageId),
    createdAt: row.createdAt === null || row.createdAt === undefined ? "2020-01-01T00:00:00.000Z" : String(row.createdAt),
    updatedAt: row.updatedAt === null || row.updatedAt === undefined ? "2020-01-01T00:00:00.000Z" : String(row.updatedAt),
    image,
  };
}

const PUBLISHED_PAGE_SIZE = 1000;
const NAME_CACHE_REVALIDATE_SECONDS = 86400;
const NAME_CACHE_TAG = "published-names";
const NAME_DETAIL_CACHE_TAG = "published-name-detail";
const NAME_LIST_SELECT =
  "id,slug,displayName,gender,meaning,origin,pronunciation,popularity,popularScore,inQuran,style,isShort,beautifulMeaning,firstLetter,published,imageId,createdAt,updatedAt,image:imageId(id,url,alt,createdAt)";
const NAME_DETAIL_BASE_SELECT =
  "id,slug,displayName,gender,meaning,origin,pronunciation,popularity,popularScore,inQuran,quranReference,style,isShort,beautifulMeaning,firstLetter,intro,traits,published,imageId,createdAt,updatedAt,image:imageId(id,url,alt,createdAt)";
const NAME_DETAIL_SELECT = `${NAME_DETAIL_BASE_SELECT},similarFrom:SimilarName!SimilarName_sourceId_fkey(target:Name!SimilarName_targetId_fkey(${NAME_LIST_SELECT}))`;

export function revalidatePublishedNameCache() {
  revalidateTag(NAME_CACHE_TAG, "max");
  revalidateTag(NAME_DETAIL_CACHE_TAG, "max");
}

async function fetchPublishedNamesVersion(): Promise<string> {
  const s = tryGetSupabase();
  if (!s) return "no-db";

  const { data, error } = await s
    .from("Name")
    .select("updatedAt")
    .eq("published", true)
    .order("updatedAt", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data?.updatedAt) return "unknown";
  return String(data.updatedAt);
}

/**
 * Yayında tüm isimler (filtre için bellek içi kullanım).
 * PostgREST tek istekte ~1000 satır döndürür; sayfalı okunur.
 * Başarısız veya env yoksa null.
 */
async function fetchPublishedNamesRowsUncached(): Promise<Array<Name & { image: MediaAsset | null }> | null> {
  const s = requireSupabase();

  const all: RowWithImg[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await s
      .from("Name")
      .select(NAME_LIST_SELECT)
      .eq("published", true)
      .order("popularScore", { ascending: false })
      .order("displayName", { ascending: true })
      .range(from, from + PUBLISHED_PAGE_SIZE - 1);

    if (error) {
      throw new PublishedNamesDataSourceError(`Yayınlanmış isim listesi okunamadı: ${error.message}`, { cause: error });
    }

    const batch = (data ?? []) as unknown as RowWithImg[];
    all.push(...batch);
    if (batch.length < PUBLISHED_PAGE_SIZE) break;
    from += PUBLISHED_PAGE_SIZE;
  }

  if (!all.length) return [];

  return all.map(mapNameRow).map((row) => ensureNameDisplayImage(row));
}

const fetchPublishedNamesRowsCached = unstable_cache(
  async (version: string) => {
    void version;
    return fetchPublishedNamesRowsUncached();
  },
  ["published-names-rows"],
  { revalidate: NAME_CACHE_REVALIDATE_SECONDS, tags: [NAME_CACHE_TAG] },
);

export async function fetchPublishedNamesRows() {
  return fetchPublishedNamesRowsCached(await fetchPublishedNamesVersion());
}

async function fetchPublishedNameSlugsUncached(): Promise<string[] | null> {
  const s = requireSupabase();

  const all: string[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await s
      .from("Name")
      .select("slug")
      .eq("published", true)
      .order("slug", { ascending: true })
      .range(from, from + PUBLISHED_PAGE_SIZE - 1);

    if (error) {
      throw new PublishedNamesDataSourceError(`Yayınlanmış isim slug'ları okunamadı: ${error.message}`, { cause: error });
    }

    const batch = (data ?? []) as Array<{ slug: string | null }>;
    all.push(...batch.map((row) => row.slug).filter((slug): slug is string => Boolean(slug)));
    if (batch.length < PUBLISHED_PAGE_SIZE) break;
    from += PUBLISHED_PAGE_SIZE;
  }

  return all;
}

const fetchPublishedNameSlugsCached = unstable_cache(
  async (version: string) => {
    void version;
    return fetchPublishedNameSlugsUncached();
  },
  ["published-name-slugs"],
  { revalidate: NAME_CACHE_REVALIDATE_SECONDS, tags: [NAME_CACHE_TAG] },
);

export async function fetchPublishedNameSlugs() {
  return fetchPublishedNameSlugsCached(await fetchPublishedNamesVersion());
}

export async function listNamesFromDb(p: NameListParams) {
  const rows = await fetchPublishedNamesRows();
  if (rows === null) throw new PublishedNamesDataSourceError("Yayınlanmış isim listesi alınamadı.");
  return applyNameListParams(rows, p);
}

export async function getNameBySlugFromDbUncached(slug: string): Promise<NameWithDetail | null> {
  const s = requireSupabase();
  const normalizedSlug = normalizeNameSlug(slug);
  if (!normalizedSlug) return null;

  const { data: exactRows, error } = await s
    .from("Name")
    .select(NAME_DETAIL_SELECT)
    .ilike("slug", normalizedSlug)
    .eq("published", true)
    .limit(2);

  if (error) return getNameBySlugFromDbFallback(normalizedSlug);
  let row = (exactRows ?? [])[0] as unknown as RowWithImg | undefined;
  if (!row) {
    const id = await findPublishedNameIdByNormalizedSlug(s, normalizedSlug);
    if (!id) return null;
    const { data: recoveredRow, error: recoveredError } = await s
      .from("Name")
      .select(NAME_DETAIL_SELECT)
      .eq("id", id)
      .eq("published", true)
      .maybeSingle();
    if (recoveredError) return getNameBySlugFromDbFallback(normalizedSlug, id);
    row = recoveredRow as unknown as RowWithImg | undefined;
  }
  if (!row) return null;

  const rowWithSimilar = row;
  const base = ensureNameDisplayImage(mapNameRow(rowWithSimilar));
  const embeddedSimilar = (rowWithSimilar.similarFrom ?? [])
    .map((link) => link.target)
    .filter((target): target is RowWithImg => Boolean(target))
    .map(mapNameRow)
    .filter((target) => target.published)
    .map((target) => ({ target: ensureNameDisplayImage(target) }));

  if (Array.isArray(rowWithSimilar.similarFrom)) {
    return { ...base, similarFrom: embeddedSimilar };
  }

  return getSimilarNamesForBase(s, base);
}

async function findPublishedNameIdByNormalizedSlug(
  s: ReturnType<typeof getSupabase>,
  normalizedSlug: string,
): Promise<string | null> {
  let from = 0;
  while (true) {
    const { data, error } = await s
      .from("Name")
      .select("id,slug")
      .eq("published", true)
      .order("id", { ascending: true })
      .range(from, from + PUBLISHED_PAGE_SIZE - 1);
    if (error) {
      throw new PublishedNamesDataSourceError(`İsim slug dizini okunamadı: ${error.message}`, { cause: error });
    }
    const batch = (data ?? []) as Array<{ id: string; slug: string | null }>;
    const match = batch.find((candidate) => normalizeNameSlug(candidate.slug ?? "") === normalizedSlug);
    if (match) return match.id;
    if (batch.length < PUBLISHED_PAGE_SIZE) return null;
    from += PUBLISHED_PAGE_SIZE;
  }
}

async function getNameBySlugFromDbFallback(slug: string, id?: string): Promise<NameWithDetail | null> {
  const s = requireSupabase();

  let query = s
    .from("Name")
    .select(NAME_DETAIL_BASE_SELECT)
    .eq("published", true);
  query = id ? query.eq("id", id) : query.ilike("slug", slug);
  const { data: rows, error } = await query.limit(2);

  if (error) {
    throw new PublishedNamesDataSourceError(`İsim detayı okunamadı: ${error.message}`, { cause: error });
  }
  const row = (rows ?? [])[0];
  if (!row) return null;

  const base = ensureNameDisplayImage(mapNameRow(row as unknown as RowWithImg));
  return getSimilarNamesForBase(s, base);
}

async function getSimilarNamesForBase(
  s: ReturnType<typeof getSupabase>,
  base: Name & { image: MediaAsset | null },
): Promise<NameWithDetail> {
  const { data: links } = await s.from("SimilarName").select("targetId").eq("sourceId", base.id);

  const tids = (links ?? []).map((l: { targetId: string }) => l.targetId).filter(Boolean);
  if (!tids.length) {
    return { ...base, similarFrom: [] };
  }

  const { data: targets, error: tErr } = await s
    .from("Name")
    .select(NAME_LIST_SELECT)
    .in("id", tids)
    .eq("published", true);

  if (tErr || !targets?.length) {
    return { ...base, similarFrom: [] };
  }

  const mapped = (targets as unknown as RowWithImg[]).map(mapNameRow).map((target) => ensureNameDisplayImage(target));
  const similarFrom = mapped.map((target) => ({ target }));

  return { ...base, similarFrom };
}

const getCachedNameBySlugFromDb = unstable_cache(
  async (slug: string, version: string) => {
    void version;
    return getNameBySlugFromDbUncached(slug);
  },
  ["published-name-detail"],
  { revalidate: NAME_CACHE_REVALIDATE_SECONDS, tags: [NAME_CACHE_TAG, NAME_DETAIL_CACHE_TAG] },
);

export async function getNameBySlugFromDb(slug: string): Promise<NameWithDetail | null> {
  const normalizedSlug = normalizeNameSlug(slug);
  if (!normalizedSlug) return null;
  return getCachedNameBySlugFromDb(normalizedSlug, await fetchPublishedNamesVersion());
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

/** Yukarıda `fetchPublishedNamesRows` ile uyumlu: İstanbul takvim gününe göre günde bir kez (gece yarısı) değişen seçim. */
export async function pickDailyNameFromPublishedDb(opts?: { date?: Date; timeZone?: string }) {
  const rows = await fetchPublishedNamesRows();
  if (!rows?.length) return null;
  return pickDailyFromNameList(rows, opts);
}

export async function pickRandomPublishedFromDb(excludeSlugs: string[]): Promise<(Name & { image: MediaAsset | null }) | null> {
  const rows = await fetchPublishedNamesRows();
  if (!rows?.length) return null;
  let pool = rows.filter((r) => !excludeSlugs.includes(r.slug));
  if (pool.length === 0) pool = rows;
  const i = Math.floor(Math.random() * pool.length);
  return pool[i] ?? null;
}
