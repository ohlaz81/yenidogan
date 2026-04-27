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

function pickMediaForName(n: Name): MediaAsset {
  if (allBabyMedia.length === 0) return DEFAULT_NAME_MEDIA;
  const idNumber = Number(n.id.replace("n-", "")) || 1;

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

export function listNamesFromStore(p: NameListParams) {
  const skip = p.skip ?? 0;
  const take = p.take ?? 24;
  let list = allWithImage.filter((n) => matchFilters(n, p));
  list = sortList(list, p.orderBy);
  const total = list.length;
  const items = list.slice(skip, skip + take);
  return { items, total };
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
  if (allWithImage.length === 0) return null;
  const i = Math.floor(Math.random() * allWithImage.length);
  return allWithImage[i] ?? null;
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
