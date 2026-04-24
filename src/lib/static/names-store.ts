import { BABY_NAME_SEED, seedToName } from "@/data/baby-names";
import type { Gender, Name, NameWithDetail, MediaAsset } from "@/types/database";
import { DEFAULT_NAME_MEDIA } from "@/lib/static/default-name-media";
import type { NameListParams } from "@/lib/name-list-params";

type NameWithImage = Name & { image: MediaAsset | null };

const bySlug = new Map<string, (typeof BABY_NAME_SEED)[number]>();
for (const s of BABY_NAME_SEED) {
  bySlug.set(s.slug, s);
}

function withImage(n: Name): NameWithImage {
  return { ...n, image: DEFAULT_NAME_MEDIA };
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
