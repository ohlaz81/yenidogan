import { BABY_NAME_SEED, seedToName } from "@/data/baby-names";
import type { Gender, Name, NameWithDetail, MediaAsset } from "@/types/database";
import { DEFAULT_NAME_MEDIA } from "@/lib/static/default-name-media";
import { genderForBabyMediaIndex, babyMediaAlt } from "@/lib/static/baby-media-gender";
import { babyMediaPublicUrl } from "@/lib/static/baby-media-url";
import type { NameListParams } from "@/lib/name-list-params";
import fs from "node:fs";
import path from "node:path";

type NameWithImage = Name & { image: MediaAsset | null };

type IndexedMedia = {
  index: number;
  asset: MediaAsset;
};

function readBabyMediaFromPublic(): IndexedMedia[] {
  try {
    const dir = path.join(process.cwd(), "public", "media", "babies");
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir, { withFileTypes: true });
    const ranked = files
      .filter((f) => f.isFile())
      .map((f) => {
        // "baby (12).jpeg", "baby(41).jpeg", "baby (1).jpg"
        const m = /^baby\s*\((\d+)\)\.(jpg|jpeg|png|webp)$/i.exec(f.name);
        if (!m) return null;
        const idx = Number(m[1]);
        if (!Number.isFinite(idx)) return null;
        const ext = m[2].toLowerCase();
        const extRank = ext === "jpeg" ? 0 : ext === "jpg" ? 1 : ext === "png" ? 2 : 3;
        return { idx, extRank, fileName: f.name };
      })
      .filter((x): x is { idx: number; extRank: number; fileName: string } => x !== null)
      .sort((a, b) => a.idx - b.idx || a.extRank - b.extRank);

    // Aynı index için tek dosya seç (örn: baby (1).jpg + baby (1).jpeg)
    const picked = new Map<number, string>();
    for (const x of ranked) {
      if (!picked.has(x.idx)) picked.set(x.idx, x.fileName);
    }

    return Array.from(picked.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([index, fileName]) => {
        const g = genderForBabyMediaIndex(index);
        return {
          index,
          asset: {
            id: `baby-media-${index}`,
            url: babyMediaPublicUrl(fileName),
            alt: babyMediaAlt(index, g),
            createdAt: "2020-01-01T00:00:00.000Z",
          },
        };
      });
  } catch {
    return [];
  }
}

const allBabyMedia = readBabyMediaFromPublic();
const girlMediaPool = allBabyMedia.filter((m) => genderForBabyMediaIndex(m.index) === "GIRL");
const boyMediaPool = allBabyMedia.filter((m) => genderForBabyMediaIndex(m.index) === "BOY");

function stableNumericBucketFromId(id: string): number {
  const fromSeed = Number(String(id).replace(/^n-/, ""));
  if (Number.isFinite(fromSeed) && fromSeed > 0) return fromSeed;
  let h = 0;
  for (let i = 0; i < id.length; i += 1) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0;
  }
  return (h % 899) + 1;
}

/** Cinsiyete göre ilk stok görseli (UI yedeği; liste havuzuyla uyumlu). */
export function getBabyStockImageFallbackUrl(gender: Gender): string {
  if (allBabyMedia.length === 0) return DEFAULT_NAME_MEDIA.url;
  if (gender === "GIRL" && girlMediaPool.length > 0) return girlMediaPool[0].asset.url;
  if (gender === "BOY" && boyMediaPool.length > 0) return boyMediaPool[0].asset.url;
  return allBabyMedia[0].asset.url;
}

/** Kapak görseli yokken id + cinsiyete göre `public/media/babies` havuzu (liste, kart, ana sayfa, detay ile aynı). */
export function pickMediaForName(n: Name): MediaAsset {
  if (allBabyMedia.length === 0) return DEFAULT_NAME_MEDIA;
  const idNumber = stableNumericBucketFromId(n.id);

  if (n.gender === "GIRL" && girlMediaPool.length > 0) {
    return girlMediaPool[(idNumber - 1) % girlMediaPool.length]?.asset ?? DEFAULT_NAME_MEDIA;
  }
  if (n.gender === "BOY" && boyMediaPool.length > 0) {
    return boyMediaPool[(idNumber - 1) % boyMediaPool.length]?.asset ?? DEFAULT_NAME_MEDIA;
  }
  return allBabyMedia[(idNumber - 1) % allBabyMedia.length]?.asset ?? DEFAULT_NAME_MEDIA;
}

const bySlug = new Map<string, (typeof BABY_NAME_SEED)[number]>();
for (const s of BABY_NAME_SEED) {
  bySlug.set(s.slug, s);
}

function withImage(n: Name): NameWithImage {
  return { ...n, image: pickMediaForName(n) };
}

const allWithImage: NameWithImage[] = BABY_NAME_SEED.map((s) => withImage(seedToName(s)));

const byId = new Map<string, NameWithImage>();
for (const n of allWithImage) byId.set(n.id, n);

function matchFilters(n: NameWithImage, p: NameListParams): boolean {
  if (p.gender && n.gender !== p.gender) return false;
  if (p.inQuran === true && !n.inQuran) return false;
  if (p.inQuranFalse === true && n.inQuran) return false;
  if (p.style && n.style !== p.style) return false;
  if (p.letter && n.firstLetter !== p.letter) return false;
  if (p.isShort === true && !n.isShort) return false;
  if (p.beautifulMeaning === true && !n.beautifulMeaning) return false;
  if (p.origin?.trim()) {
    if (!n.origin.toLowerCase().includes(p.origin.trim().toLowerCase())) return false;
  }
  if (p.search?.trim()) {
    const x = p.search.trim().toLowerCase();
    const inName = n.displayName.toLowerCase().includes(x);
    const inMeaning = n.meaning.toLowerCase().includes(x);
    const inSlug = n.slug.includes(x);
    if (!inName && !inMeaning && !inSlug) return false;
  }
  return true;
}

function sortList(items: NameWithImage[], orderBy: NameListParams["orderBy"]): NameWithImage[] {
  const copy = [...items];
  if (orderBy === "alpha") {
    copy.sort((a, b) => a.displayName.localeCompare(b.displayName, "tr-TR"));
  } else {
    copy.sort(
      (a, b) =>
        b.popularScore - a.popularScore ||
        a.displayName.localeCompare(b.displayName, "tr-TR"),
    );
  }
  return copy;
}

export function getStaticNameCount() {
  return allWithImage.length;
}

export function getAllNameSlugs(): string[] {
  return BABY_NAME_SEED.map((s) => s.slug);
}

/** `Name` + görsel ile aynı filtre/sıralama/sayfalama (Supabase ile paylaşılır). */
export function applyNameListParams(
  all: readonly NameWithImage[],
  p: NameListParams,
): { items: NameWithImage[]; total: number } {
  const skip = p.skip ?? 0;
  const take = p.take ?? 24;
  let list = [...all].filter((n) => matchFilters(n, p));
  list = sortList(list, p.orderBy);
  const total = list.length;
  const items = list.slice(skip, skip + take);
  return { items, total };
}

export function listNamesFromStore(p: NameListParams) {
  return applyNameListParams(allWithImage, p);
}

export function getNameBySlugFromStore(slug: string): NameWithDetail | null {
  const seed = bySlug.get(slug);
  if (!seed) return null;
  const base = withImage(seedToName(seed));
  const similarFrom = (seed.similar || [])
    .map((sSlug) => {
      const t = bySlug.get(sSlug);
      if (!t) return null;
      return { target: withImage(seedToName(t)) };
    })
    .filter((x): x is { target: NameWithImage } => x !== null);
  return { ...base, similarFrom };
}

export function getNamesByLetterFromStore(letter: string, gender?: Gender, take = 12) {
  const { items } = listNamesFromStore({
    letter: letter.toLocaleUpperCase("tr-TR"),
    gender,
    take: 200,
    orderBy: "popular",
  });
  return items.slice(0, take);
}

export function pickRandomNameFromStore(): NameWithImage | null {
  return pickRandomNameFromStoreExcluding([]);
}

function dailySeedKey(date: Date, timeZone: string) {
  const f = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return f.format(date); // YYYY-MM-DD
}

function hashString(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

/**
 * Aynı gün için her zaman aynı indeksi verir (`YYYY-MM-DD` takvim günü, örn. Europe/Istanbul’da gece 00:00 ile değişir).
 * Supabase listesi ile de paylaşılır.
 */
export function pickDailyFromNameList<T>(list: readonly T[], opts?: { date?: Date; timeZone?: string }): T | null {
  if (list.length === 0) return null;
  const date = opts?.date ?? new Date();
  const tz = opts?.timeZone ?? "Europe/Istanbul";
  const key = dailySeedKey(date, tz);
  const i = hashString(`bugunun-ismi:${key}`) % list.length;
  return list[i] ?? null;
}

/**
 * "Bugünün İsmi": verilen timezone gününe göre 24 saatte bir değişen deterministik seçim.
 * Varsayılan timezone: Europe/Istanbul (gece yarısı itibarıyla yeni seçim).
 */
export function pickDailyNameFromStore(opts?: { date?: Date; timeZone?: string }): NameWithImage | null {
  return pickDailyFromNameList(allWithImage, opts);
}

/** Rastgele; `excludeSlugs` boş kümede ise tüm listeden seçer (tek isim bile olsa döner). */
export function pickRandomNameFromStoreExcluding(excludeSlugs: string[]): NameWithImage | null {
  if (allWithImage.length === 0) return null;
  let pool = allWithImage.filter((n) => !excludeSlugs.includes(n.slug));
  if (pool.length === 0) pool = allWithImage;
  const i = Math.floor(Math.random() * pool.length);
  return pool[i] ?? null;
}

export function getFeaturedByGenderFromStore(gender: "GIRL" | "BOY", limit: number) {
  const { items } = listNamesFromStore({ gender, take: 200, orderBy: "popular" });
  return items.slice(0, limit);
}

export function countNamesByGender(gender: "GIRL" | "BOY") {
  return allWithImage.filter((n) => n.gender === gender).length;
}

/** Veri setinde bu cinsiyette en az bir ismi olan ilk harfler (A–Z Türkçe sıra). */
export function getFirstLettersForGender(gender: "GIRL" | "BOY"): string[] {
  const set = new Set<string>();
  for (const n of allWithImage) {
    if (n.gender === gender && n.firstLetter) set.add(n.firstLetter);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "tr-TR"));
}

/** `letter` dışındaki filtrelerle eşleşen isimlerde geçen ilk harfler (kategori + isteğe bağlı cinsiyet). */
export function getFirstLettersForNameListFilters(
  p: Omit<NameListParams, "letter" | "skip" | "take" | "orderBy" | "search">,
): string[] {
  const set = new Set<string>();
  for (const n of allWithImage) {
    if (!matchFilters(n, { ...p, letter: undefined })) continue;
    if (n.firstLetter) set.add(n.firstLetter);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "tr-TR"));
}

export function getModernOrPopularTopByGenderFromStore(gender: "GIRL" | "BOY", limit: number) {
  const { items: modern } = listNamesFromStore({
    gender,
    style: "MODERN",
    take: 200,
    orderBy: "popular",
  });
  if (modern.length >= limit) return modern.slice(0, limit);
  return getFeaturedByGenderFromStore(gender, limit);
}
