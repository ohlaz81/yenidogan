import { normalizeNameSlug } from "@/lib/slug";
import type { Gender, Name, NameStyle } from "@/types/database";

export type SecondNameSuggestion = Pick<Name, "id" | "slug" | "displayName" | "gender">;

type IndexedName = Name & {
  sound: string;
  normalizedDisplayName: string;
  vowels: string;
  syllables: number;
};

type ScoredCandidate = {
  candidate: IndexedName;
  score: number;
  tieBreak: number;
};

const VOWELS = "aeıioöuü";
const HARD_CONSONANTS = "çfhkpsşt";
const MAX_SUGGESTIONS = 10;
const indexCache = new Map<string, ReadonlyMap<string, SecondNameSuggestion[]>>();

function normalizeTurkish(value: string) {
  return value.trim().toLocaleLowerCase("tr-TR").normalize("NFC").replace(/ğ/g, "g").replace(/[^a-zçğıöşü]/g, "");
}

function stableHash(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function levenshtein(a: string, b: string) {
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let diagonal = previous[0];
    previous[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const above = previous[j];
      previous[j] = Math.min(previous[j] + 1, previous[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1));
      diagonal = above;
    }
  }
  return previous[b.length];
}

function indexName(name: Name): IndexedName {
  const sound = normalizeTurkish(name.displayName);
  const vowels = [...sound].filter((letter) => VOWELS.includes(letter)).join("");
  return { ...name, sound, normalizedDisplayName: normalizeTurkish(name.displayName), vowels, syllables: Math.max(1, vowels.length) };
}

function styleCompatibility(source: NameStyle, candidate: NameStyle) {
  if (source === candidate) return 34;
  if (
    (source === "MODERN" && candidate === "POPULAR") ||
    (source === "POPULAR" && candidate === "MODERN") ||
    (source === "CLASSIC" && candidate === "POPULAR") ||
    (source === "RARE" && candidate === "MODERN")
  ) return 17;
  if (source === "MODERN" && candidate === "CLASSIC") return -16;
  if (source === "CLASSIC" && candidate === "RARE") return -10;
  return 3;
}

function hasRepeatedBoundarySyllable(source: IndexedName, candidate: IndexedName) {
  return [3, 2].some(
    (size) =>
      source.sound.length >= size &&
      candidate.sound.length >= size &&
      source.sound.slice(-size) === candidate.sound.slice(0, size),
  );
}

function hardBoundaryPenalty(source: IndexedName, candidate: IndexedName) {
  const boundary = `${source.sound.slice(-2)}${candidate.sound.slice(0, 2)}`;
  const consonantRun = boundary.match(new RegExp(`[^${VOWELS}]{3,}`, "u"));
  if (!consonantRun) return 0;
  const hardCount = [...consonantRun[0]].filter((letter) => HARD_CONSONANTS.includes(letter)).length;
  return hardCount >= 2 ? 30 : 18;
}

function isInvalidPair(source: IndexedName, candidate: IndexedName) {
  if (!candidate.published || candidate.gender !== source.gender) return true;
  if (!source.sound || !candidate.sound || candidate.sound.length < 2) return true;
  if (
    candidate.id === source.id ||
    normalizeNameSlug(candidate.slug) === normalizeNameSlug(source.slug) ||
    candidate.normalizedDisplayName === source.normalizedDisplayName
  ) return true;
  if (source.sound.includes(candidate.sound) || candidate.sound.includes(source.sound)) return true;
  const distance = levenshtein(source.sound, candidate.sound);
  if (distance <= 1 || distance / Math.max(source.sound.length, candidate.sound.length) < 0.28) return true;
  if (hasRepeatedBoundarySyllable(source, candidate)) return true;
  if (source.sound.length + candidate.sound.length > 19) return true;
  if (hardBoundaryPenalty(source, candidate) >= 30) return true;
  return false;
}

function pairScore(source: IndexedName, candidate: IndexedName) {
  const totalLength = source.sound.length + candidate.sound.length;
  const popularityDistance = Math.abs(
    Math.min(1000, source.popularScore || source.popularity * 100) -
      Math.min(1000, candidate.popularScore || candidate.popularity * 100),
  );
  const sourceLast = source.sound.at(-1) ?? "";
  const candidateFirst = candidate.sound[0] ?? "";
  const sourceEndsVowel = VOWELS.includes(sourceLast);
  const candidateStartsVowel = VOWELS.includes(candidateFirst);
  let score = 100;
  score += styleCompatibility(source.style, candidate.style);
  score += Math.max(0, 22 - popularityDistance / 35);
  score += Math.min(1000, candidate.popularScore) / 25;
  score += Math.min(5, candidate.popularity) * 3;
  score += candidate.beautifulMeaning ? 9 : -5;
  score += totalLength >= 8 && totalLength <= 13 ? 22 : totalLength <= 16 ? 8 : -18;
  score += Math.abs(source.sound.length - candidate.sound.length) <= 3 ? 7 : 0;
  score += Math.abs(source.syllables - candidate.syllables) <= 1 ? 8 : -4;
  score += sourceEndsVowel === candidateStartsVowel ? -7 : 13;
  score += sourceLast === candidateFirst ? -20 : 5;
  score -= hardBoundaryPenalty(source, candidate);
  if (source.vowels.at(-1) && source.vowels.at(-1) === candidate.vowels[0]) score -= 8;
  if (source.sound.slice(-2) === candidate.sound.slice(0, 2)) score -= 28;
  if (source.sound.length <= 4 && candidate.sound.length <= 4) score -= 9;
  if (source.sound.length >= 8 && candidate.sound.length >= 8) score -= 22;
  if (candidate.isShort !== source.isShort) score += 5;
  return score;
}

function scoreCandidates(source: IndexedName, pool: IndexedName[]) {
  return pool
    .filter((candidate) => !isInvalidPair(source, candidate))
    .map((candidate): ScoredCandidate => {
      const tieBreak = stableHash(`${source.slug}\u0000${candidate.slug}`) / 0xffffffff;
      const globalAttractionPenalty = Math.min(1000, candidate.popularScore) / 45 + candidate.popularity * 2;
      return { candidate, score: pairScore(source, candidate) - globalAttractionPenalty + tieBreak * 28, tieBreak };
    })
    .filter(({ score }) => score >= 82)
    .sort((a, b) => b.score - a.score || b.tieBreak - a.tieBreak || a.candidate.displayName.localeCompare(b.candidate.displayName, "tr-TR"));
}

function cacheKey(names: Name[], limit: number) {
  return `${limit}:${names.length}:${names.map((name) => `${name.id}:${name.updatedAt}:${name.published ? 1 : 0}`).sort().join("|")}`;
}

function toSuggestion(name: IndexedName): SecondNameSuggestion {
  return { id: name.id, slug: name.slug, displayName: name.displayName, gender: name.gender };
}

function selectForSource(source: IndexedName, candidates: ScoredCandidate[], limit: number) {
  if (limit !== MAX_SUGGESTIONS || candidates.length <= limit) return candidates.slice(0, limit);
  const selected = candidates.slice(0, limit - 1);
  const anchorWindow = Math.min(70, candidates.length - (limit - 1));
  const anchorIndex = limit - 1 + (stableHash(`anchor:${source.slug}`) % anchorWindow);
  selected.push(candidates[anchorIndex]);
  return selected;
}

/**
 * Tüm yayınlanmış havuzu deterministik sırada paylaştırır. Dinamik kullanım sayacı
 * kaliteye yakın adaylar arasında global tekrar cezası olarak çalışır; veritabanına yazmaz.
 */
export function buildSecondNameSuggestionIndex(names: Name[], requestedLimit = MAX_SUGGESTIONS) {
  const limit = Math.max(0, Math.min(requestedLimit, MAX_SUGGESTIONS));
  const key = cacheKey(names, limit);
  const cached = indexCache.get(key);
  if (cached) return cached;

  const uniqueByGender = new Map<Gender, Map<string, IndexedName>>();
  const displayNamesByGender = new Map<Gender, Set<string>>();
  for (const rawName of names) {
    if (!rawName.published || (rawName.gender !== "GIRL" && rawName.gender !== "BOY")) continue;
    const indexed = indexName(rawName);
    const genderPool = uniqueByGender.get(indexed.gender) ?? new Map<string, IndexedName>();
    const identity = normalizeNameSlug(indexed.slug);
    const displayNames = displayNamesByGender.get(indexed.gender) ?? new Set<string>();
    const current = genderPool.get(identity);
    if (!current && !displayNames.has(indexed.normalizedDisplayName)) {
      genderPool.set(identity, indexed);
      displayNames.add(indexed.normalizedDisplayName);
    }
    uniqueByGender.set(indexed.gender, genderPool);
    displayNamesByGender.set(indexed.gender, displayNames);
  }

  const result = new Map<string, SecondNameSuggestion[]>();
  for (const gender of ["GIRL", "BOY"] as const) {
    const pool = [...(uniqueByGender.get(gender)?.values() ?? [])];
    const candidatePool = [...pool]
      .sort((a, b) => {
        const aStrength = a.popularScore + a.popularity * 80 + (a.beautifulMeaning ? 180 : 0);
        const bStrength = b.popularScore + b.popularity * 80 + (b.beautifulMeaning ? 180 : 0);
        return bStrength - aStrength || a.displayName.localeCompare(b.displayName, "tr-TR");
      })
      .slice(0, 500);
    const sources = [...pool].sort((a, b) => stableHash(a.slug) - stableHash(b.slug) || a.slug.localeCompare(b.slug, "tr-TR"));
    for (const source of sources) {
      const candidates = scoreCandidates(source, candidatePool);
      const selected = selectForSource(source, candidates, limit);
      result.set(normalizeNameSlug(source.slug), selected.map(({ candidate }) => toSuggestion(candidate)));
    }
  }

  indexCache.clear();
  indexCache.set(key, result);
  return result;
}

export function getSecondNameSuggestionsFromPool(name: Name, names: Name[], limit = MAX_SUGGESTIONS) {
  if (name.gender !== "GIRL" && name.gender !== "BOY") return [];
  const normalizedLimit = Math.max(0, Math.min(limit, MAX_SUGGESTIONS));
  const source = indexName(name);
  const seenSlugs = new Set<string>();
  const seenNames = new Set<string>();
  const candidatePool = names
    .filter((candidate) => {
      if (!candidate.published || candidate.gender !== name.gender) return false;
      const slug = normalizeNameSlug(candidate.slug);
      const displayName = normalizeTurkish(candidate.displayName);
      if (!slug || !displayName || seenSlugs.has(slug) || seenNames.has(displayName)) return false;
      seenSlugs.add(slug);
      seenNames.add(displayName);
      return true;
    })
    .map(indexName)
    .sort((a, b) => {
      const aStrength = a.popularScore + a.popularity * 80 + (a.beautifulMeaning ? 180 : 0);
      const bStrength = b.popularScore + b.popularity * 80 + (b.beautifulMeaning ? 180 : 0);
      return bStrength - aStrength || a.displayName.localeCompare(b.displayName, "tr-TR");
    })
    .slice(0, 500);
  return selectForSource(source, scoreCandidates(source, candidatePool), normalizedLimit).map(({ candidate }) => toSuggestion(candidate));
}
