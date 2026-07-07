import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { BABY_NAME_SEED } from "../src/data/baby-names";
import type { Name } from "../src/types/database";

config({ path: ".env.local" });

type NameLite = Pick<
  Name,
  | "id"
  | "slug"
  | "displayName"
  | "gender"
  | "meaning"
  | "style"
  | "isShort"
  | "beautifulMeaning"
  | "firstLetter"
  | "popularScore"
>;

type SimilarRow = {
  sourceId: string;
  target: NameLite | null;
};

function cleanEnvValue(v: string | undefined): string {
  if (!v) return "";
  const t = v.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1).trim();
  }
  return t;
}

const url = cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL).replace(/\/rest\/v1\/?$/, "");
const key = cleanEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);

if (!url || !key) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.");
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
});

function isUGirlSeed(seed: (typeof BABY_NAME_SEED)[number]) {
  const first = seed.displayName.slice(0, 1).toLocaleUpperCase("tr-TR");
  return seed.id.startsWith("u-girl-") && seed.gender === "GIRL" && (first === "U" || first === "Ü");
}

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

function hasCloseSound(source: NameLite, candidate: NameLite) {
  const sourceName = normalizeNameSound(source.displayName);
  const candidateName = normalizeNameSound(candidate.displayName);
  if (!sourceName || !candidateName) return false;
  if (sourceName.slice(0, 2) === candidateName.slice(0, 2)) return true;
  if (sourceName.slice(-2) === candidateName.slice(-2)) return true;

  const sourceVowels = vowelShape(source.displayName);
  const candidateVowels = vowelShape(candidate.displayName);
  return Boolean(sourceVowels && candidateVowels && sourceVowels.slice(0, 2) === candidateVowels.slice(0, 2));
}

function siblingScore(source: NameLite, candidate: NameLite) {
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

function rankSiblingPool(source: NameLite, pool: NameLite[], limit: number) {
  return [...pool]
    .filter((candidate) => candidate.slug !== source.slug)
    .sort((a, b) => {
      const byScore = siblingScore(source, b) - siblingScore(source, a);
      if (byScore !== 0) return byScore;
      return b.popularScore - a.popularScore || a.displayName.localeCompare(b.displayName, "tr-TR");
    })
    .slice(0, limit)
    .map((item) => item.displayName);
}

async function fetchAllNames(gender: "GIRL" | "BOY") {
  const out: NameLite[] = [];
  const pageSize = 1000;
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from("Name")
      .select("id,slug,displayName,gender,meaning,style,isShort,beautifulMeaning,firstLetter,popularScore")
      .eq("gender", gender)
      .eq("published", true)
      .range(from, from + pageSize - 1);

    if (error) throw new Error(`${gender} isim havuzu alınamadı: ${error.message}`);
    out.push(...((data ?? []) as NameLite[]));
    if (!data || data.length < pageSize) break;
  }
  return out;
}

async function main() {
  const seeds = BABY_NAME_SEED.filter(isUGirlSeed);
  const seedSlugs = seeds.map((seed) => seed.slug);
  const sampleSlugs = ["ubeyde", "umayra", "uftade", "ulfet", "ummu-gulsum"];
  const pageCheckSlugs = ["ulku", "umay", "ulviye", "ubeyde"];

  const { data: rows, error } = await supabase
    .from("Name")
    .select("id,slug,displayName,gender,meaning,style,isShort,beautifulMeaning,firstLetter,popularScore")
    .in("slug", seedSlugs);

  if (error) throw new Error(`U/Ü isimleri alınamadı: ${error.message}`);

  const names = (rows ?? []) as NameLite[];
  const ids = names.map((name) => name.id);
  const { data: similarRows, error: similarError } = await supabase
    .from("SimilarName")
    .select("sourceId,target:Name!SimilarName_targetId_fkey(id,slug,displayName,gender,meaning,style,isShort,beautifulMeaning,firstLetter,popularScore)")
    .in("sourceId", ids);

  if (similarError) throw new Error(`SimilarName doğrulaması başarısız: ${similarError.message}`);

  const similarBySource = new Map<string, NameLite[]>();
  for (const row of (similarRows ?? []) as unknown as SimilarRow[]) {
    if (!row.target) continue;
    const current = similarBySource.get(row.sourceId) ?? [];
    current.push(row.target);
    similarBySource.set(row.sourceId, current);
  }

  const girls = await fetchAllNames("GIRL");
  const boys = await fetchAllNames("BOY");
  const bySlug = new Map(names.map((name) => [name.slug, name]));
  const letterUCount = names.filter((name) => name.firstLetter === "U").length;
  const letterUUCount = names.filter((name) => name.firstLetter === "Ü").length;
  const relationCounts = Object.fromEntries(names.map((name) => [name.slug, similarBySource.get(name.id)?.length ?? 0]));
  const missingRelationCount = Object.values(relationCounts).filter((count) => count < 8).length;
  const duplicateCount =
    (similarRows?.length ?? 0) -
    new Set((similarRows ?? []).map((row) => `${String(row.sourceId)}->${String((row as unknown as SimilarRow).target?.id ?? "")}`)).size;

  const sample = sampleSlugs
    .map((slug) => bySlug.get(slug))
    .filter((name): name is NameLite => Boolean(name))
    .map((name) => ({
      displayName: name.displayName,
      slug: name.slug,
      meaning: name.meaning,
      similarNames: (similarBySource.get(name.id) ?? []).slice(0, 10).map((item) => item.displayName),
      girlSiblingSuggestions: rankSiblingPool(name, girls, 9),
      boySiblingSuggestions: rankSiblingPool(name, boys, 8),
    }));

  console.log(
    JSON.stringify(
      {
        seedCount: seeds.length,
        uCount: seeds.filter((seed) => seed.displayName.startsWith("U")).length,
        uuCount: seeds.filter((seed) => seed.displayName.startsWith("Ü")).length,
        dbNameCount: names.length,
        relationCounts,
        duplicateCount,
        missingRelationCount,
        pageChecks: {
          "/harf/u": letterUCount > 0,
          "/harf/ü": letterUUCount > 0,
          checkedSlugs: Object.fromEntries(pageCheckSlugs.map((slug) => [`/isim/${slug}`, bySlug.has(slug)])),
          ubeydeIncludedAsGirl: bySlug.get("ubeyde")?.gender === "GIRL",
        },
        sample,
      },
      null,
      2,
    ),
  );
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
