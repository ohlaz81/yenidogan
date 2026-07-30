import type { Gender, Name, NameWithDetail } from "@/types/database";
import { ensureNameDetailDisplayImage } from "@/lib/name-display-image";
import {
  fetchPublishedNameSlugs,
  fetchPublishedNamesRows,
  getNameBySlugFromDb,
  getNamesByLetterFromDb,
  listNamesFromDb,
} from "@/lib/queries/names-from-db";
import type { NameListParams } from "@/lib/name-list-params";
import { normalizeNameSlug } from "@/lib/slug";
import {
  getSecondNameSuggestionsFromPool,
  type SecondNameSuggestion,
} from "@/lib/second-name-suggestions";

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

export type { SecondNameSuggestion } from "@/lib/second-name-suggestions";

export async function getSecondNameSuggestions(name: Name, limit = 10): Promise<SecondNameSuggestion[]> {
  const names = await fetchPublishedNamesRows();
  if (!names) return [];
  return getSecondNameSuggestionsFromPool(name, names, limit);
}
