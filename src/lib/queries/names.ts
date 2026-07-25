import type { Gender, Name, NameWithDetail } from "@/types/database";
import { ensureNameDetailDisplayImage } from "@/lib/name-display-image";
import {
  fetchPublishedNameSlugs,
  getNameBySlugFromDb,
  getNamesByLetterFromDb,
  listNamesFromDb,
} from "@/lib/queries/names-from-db";
import type { NameListParams } from "@/lib/name-list-params";
import { normalizeNameSlug } from "@/lib/slug";

export type { NameListParams } from "@/lib/name-list-params";

/** Canlı içerik: Supabase’de yayınlanmış isimler öncelikli; eksik ortamda `baby-names` seed kullanılır. */
export async function listNames(p: NameListParams) {
  const fromDb = await listNamesFromDb(p);
  if (fromDb === null) throw new Error("Yayınlanmış isim listesi alınamadı.");
  return fromDb;
}

export async function getNameBySlug(slug: string): Promise<NameWithDetail | null> {
  const fromDb = await getNameBySlugFromDb(normalizeNameSlug(slug));
  if (fromDb) return ensureNameDetailDisplayImage(fromDb);
  return null;
}

export async function getPublishedNameSlugs(): Promise<string[]> {
  const fromDb = await fetchPublishedNameSlugs();
  if (fromDb === null) throw new Error("Yayınlanmış isim slug'ları alınamadı.");
  return fromDb;
}

export async function getNamesByLetter(letter: string, gender?: Gender, take = 12) {
  const fromDb = await getNamesByLetterFromDb(letter, gender, take);
  if (fromDb === null) throw new Error("Harfe göre isim listesi alınamadı.");
  return fromDb;
}

export type SiblingNameSuggestion = Pick<
  Name,
  "id" | "slug" | "displayName" | "gender" | "style" | "isShort" | "beautifulMeaning" | "firstLetter" | "popularScore"
>;

export type SiblingNameSuggestions = {
  girls: SiblingNameSuggestion[];
  boys: SiblingNameSuggestion[];
};

function normalizeNameSound(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/[^a-zçöşü]/g, "");
}

function vowelShape(value: string) {
  return normalizeNameSound(value).replace(/[^aeiouöü]/g, "");
}

function hasCloseSound(source: Name, candidate: SiblingNameSuggestion) {
  const sourceName = normalizeNameSound(source.displayName);
  const candidateName = normalizeNameSound(candidate.displayName);
  if (!sourceName || !candidateName) return false;
  if (sourceName.slice(0, 2) === candidateName.slice(0, 2)) return true;
  if (sourceName.slice(-2) === candidateName.slice(-2)) return true;

  const sourceVowels = vowelShape(source.displayName);
  const candidateVowels = vowelShape(candidate.displayName);
  return Boolean(sourceVowels && candidateVowels && sourceVowels.slice(0, 2) === candidateVowels.slice(0, 2));
}

function siblingScore(source: Name, candidate: SiblingNameSuggestion) {
  let score = 0;
  if (candidate.firstLetter === source.firstLetter) score += 80;
  if (hasCloseSound(source, candidate)) score += 55;
  if (candidate.style === source.style) score += 34;
  if (source.isShort && candidate.isShort) score += 28;
  if (!source.isShort && !candidate.isShort) score += 8;
  if (candidate.beautifulMeaning) score += 22;
  score += Math.min(candidate.popularScore, 1000) / 25;
  return score;
}

function rankSiblingPool(source: Name, pool: SiblingNameSuggestion[], limit: number) {
  const seen = new Set<string>();
  const unique = pool.filter((candidate) => {
    if (candidate.slug === source.slug || seen.has(candidate.slug)) return false;
    seen.add(candidate.slug);
    return true;
  });

  const ranked = [...unique].sort((a, b) => {
    const byScore = siblingScore(source, b) - siblingScore(source, a);
    if (byScore !== 0) return byScore;
    return b.popularScore - a.popularScore || a.displayName.localeCompare(b.displayName, "tr-TR");
  });

  const fallback = [...unique].sort(
    (a, b) => b.popularScore - a.popularScore || a.displayName.localeCompare(b.displayName, "tr-TR"),
  );

  const result: SiblingNameSuggestion[] = [];
  for (const candidate of ranked) {
    if (result.length >= limit) break;
    result.push(candidate);
  }
  for (const candidate of fallback) {
    if (result.length >= limit) break;
    if (!result.some((item) => item.slug === candidate.slug)) result.push(candidate);
  }
  return result;
}

export async function getSiblingNameSuggestions(name: Name): Promise<SiblingNameSuggestions> {
  const [girlsResult, boysResult] = await Promise.all([
    listNames({ gender: "GIRL", take: 1000, orderBy: "popular" }),
    listNames({ gender: "BOY", take: 1000, orderBy: "popular" }),
  ]);

  return {
    girls: rankSiblingPool(name, girlsResult.items, 9),
    boys: rankSiblingPool(name, boysResult.items, 8),
  };
}

export type SecondNameSuggestion = Pick<Name, "id" | "slug" | "displayName" | "gender">;

const CONTEMPORARY_SECOND_NAME_PRIORITY: Record<"GIRL" | "BOY", string[]> = {
  GIRL: [
    "lina",
    "defne",
    "duru",
    "ela",
    "nehir",
    "ecrin",
    "asel",
    "azra",
    "mira",
    "alya",
    "ada",
    "maya",
    "nil",
    "ipek",
    "idil",
    "ilay",
    "ilayda",
    "melis",
    "selin",
    "derin",
    "ırmak",
    "yağmur",
    "zümra",
    "nisa",
  ],
  BOY: [
    "aras",
    "atlas",
    "emir",
    "kaan",
    "mert",
    "berk",
    "ege",
    "tuna",
    "kuzey",
    "ayaz",
    "demir",
    "deniz",
    "doruk",
    "alp",
    "arda",
    "kerem",
    "emre",
    "umut",
    "onur",
    "efe",
  ],
};

const DATED_SECOND_NAME_SLUGS = new Set([
  "ayse",
  "hatice",
  "makbule",
  "nermin",
  "nurcan",
  "saniye",
  "semiha",
  "leman",
  "mujgan",
  "gulten",
  "sukriye",
  "sabriye",
  "hayriye",
  "kudret",
  "sukru",
  "cevdet",
  "hikmet",
]);

function turkishSoundKey(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/[^a-z]/g, "");
}

function vowelCount(value: string) {
  return (turkishSoundKey(value).match(/[aeiou]/g) ?? []).length;
}

function hasHardBoundary(source: string, candidate: string) {
  const sourceKey = turkishSoundKey(source);
  const candidateKey = turkishSoundKey(candidate);
  const boundary = `${sourceKey.slice(-2)}${candidateKey.slice(0, 2)}`;
  return /[^aeiou]{3,}/.test(boundary);
}

function isContemporaryModernName(gender: "GIRL" | "BOY", candidate: Name) {
  return candidate.style === "MODERN" || CONTEMPORARY_SECOND_NAME_PRIORITY[gender].includes(candidate.slug);
}

function passesSecondNameQualityFilter(source: Name, candidate: Name) {
  const sourceKey = turkishSoundKey(source.displayName);
  const candidateKey = turkishSoundKey(candidate.displayName);
  if (!sourceKey || !candidateKey || candidate.gender !== source.gender) return false;
  if (candidate.slug === source.slug || candidateKey === sourceKey) return false;
  if (
    source.style === "MODERN" &&
    !isContemporaryModernName(source.gender as "GIRL" | "BOY", candidate)
  ) return false;
  if (DATED_SECOND_NAME_SLUGS.has(candidate.slug)) return false;

  const combinedLetterCount = sourceKey.length + candidateKey.length;
  const combinedVowelCount = vowelCount(source.displayName) + vowelCount(candidate.displayName);
  if (candidateKey.length < 2 || candidateKey.length > 8 || combinedLetterCount > 15) return false;
  if (combinedVowelCount < 3 || combinedVowelCount > 6) return false;
  if (hasHardBoundary(source.displayName, candidate.displayName)) return false;
  if (sourceKey.slice(0, 2) === candidateKey.slice(0, 2)) return false;
  if (sourceKey.slice(-2) === candidateKey.slice(-2)) return false;
  if (sourceKey.includes(candidateKey) || candidateKey.includes(sourceKey)) return false;
  return true;
}

function secondNameQualityScore(source: Name, candidate: Name) {
  const priority = CONTEMPORARY_SECOND_NAME_PRIORITY[source.gender as "GIRL" | "BOY"].indexOf(candidate.slug);
  const sourceKey = turkishSoundKey(source.displayName);
  const candidateKey = turkishSoundKey(candidate.displayName);
  let score = priority >= 0 ? 800 - priority * 50 : 0;
  if (isContemporaryModernName(source.gender as "GIRL" | "BOY", candidate)) score += 90;
  if (candidate.isShort) score += 24;
  if (candidate.beautifulMeaning) score += 16;
  score += Math.min(candidate.popularity, 5) * 18;
  score += Math.min(candidate.popularScore, 1000) / 18;

  const sourceEndsWithVowel = /[aeiou]$/.test(sourceKey);
  const candidateStartsWithVowel = /^[aeiou]/.test(candidateKey);
  if (sourceEndsWithVowel !== candidateStartsWithVowel) score += 18;
  if (sourceKey.at(-1) !== candidateKey.at(0)) score += 8;
  if (sourceKey.length + candidateKey.length <= 11) score += 12;
  return score;
}

export async function getSecondNameSuggestions(name: Name, limit = 10): Promise<SecondNameSuggestion[]> {
  if (name.gender !== "GIRL" && name.gender !== "BOY") return [];

  const result = await listNames({ gender: name.gender, take: 1000, orderBy: "popular" });
  const sourceDisplayName = name.displayName.trim().toLocaleLowerCase("tr-TR");
  const seenSlugs = new Set<string>();
  const seenNames = new Set<string>();

  return result.items
    .filter((candidate) => {
      const displayName = candidate.displayName.trim();
      const normalizedDisplayName = displayName.toLocaleLowerCase("tr-TR");
      if (!candidate.slug || !displayName || candidate.gender !== name.gender) return false;
      if (candidate.slug === name.slug || normalizedDisplayName === sourceDisplayName) return false;
      if (seenSlugs.has(candidate.slug) || seenNames.has(normalizedDisplayName)) return false;
      if (!passesSecondNameQualityFilter(name, candidate)) return false;
      seenSlugs.add(candidate.slug);
      seenNames.add(normalizedDisplayName);
      return true;
    })
    .sort((a, b) => {
      const byQuality = secondNameQualityScore(name, b) - secondNameQualityScore(name, a);
      return byQuality || a.displayName.localeCompare(b.displayName, "tr-TR");
    })
    .slice(0, Math.max(0, Math.min(limit, 10)))
    .map(({ id, slug, displayName, gender }) => ({ id, slug, displayName, gender }));
}
