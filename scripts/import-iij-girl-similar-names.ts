import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { createId } from "@paralleldrive/cuid2";
import { BABY_NAME_SEED } from "../src/data/baby-names";

config({ path: ".env.local" });

type NameLite = {
  id: string;
  slug: string;
  displayName: string;
  gender: "GIRL" | "BOY" | "UNISEX";
  published: boolean;
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

function isIijGirlSeed(seed: (typeof BABY_NAME_SEED)[number]) {
  const first = seed.displayName.slice(0, 1).toLocaleUpperCase("tr-TR");
  return seed.id.startsWith("iij-girl-") && seed.gender === "GIRL" && ["I", "İ", "J"].includes(first);
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function slugifyTr(text: string) {
  return text
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

function relationKey(sourceId: string, targetId: string) {
  return `${sourceId}->${targetId}`;
}

async function main() {
  const seeds = BABY_NAME_SEED.filter(isIijGirlSeed);
  const sourceSlugs = seeds.map((seed) => seed.slug);
  const relatedSlugs = unique(seeds.flatMap((seed) => seed.similar ?? []).map(slugifyTr).filter(Boolean));
  const allSlugs = unique([...sourceSlugs, ...relatedSlugs]);

  const { data: nameRows, error: namesError } = await supabase
    .from("Name")
    .select("id,slug,displayName,gender,published")
    .in("slug", allSlugs);

  if (namesError) {
    throw new Error(`Name slug kontrolü başarısız: ${namesError.message}`);
  }

  const bySlug = new Map((nameRows ?? []).map((row) => [String(row.slug), row as NameLite]));
  const sourceIds = unique(seeds.map((seed) => bySlug.get(seed.slug)?.id).filter((id): id is string => Boolean(id)));
  const relationSourceIds = unique((nameRows ?? []).map((row) => String(row.id)));

  const { data: existingRelations, error: relationsError } = await supabase
    .from("SimilarName")
    .select("sourceId,targetId")
    .in("sourceId", relationSourceIds);

  if (relationsError) {
    throw new Error(`SimilarName kontrolü başarısız: ${relationsError.message}`);
  }

  const existing = new Set((existingRelations ?? []).map((row) => relationKey(String(row.sourceId), String(row.targetId))));
  const pending = new Set<string>();
  const toInsert: Array<{ id: string; sourceId: string; targetId: string; sourceSlug: string; targetSlug: string }> = [];
  const missingTargets: Array<{ sourceSlug: string; targetSlug: string; reason: string }> = [];
  const skippedExisting: Array<{ sourceSlug: string; targetSlug: string }> = [];

  for (const seed of seeds) {
    const source = bySlug.get(seed.slug);
    if (!source) {
      missingTargets.push({ sourceSlug: seed.slug, targetSlug: seed.slug, reason: "source_not_found" });
      continue;
    }
    if (source.gender !== "GIRL") {
      missingTargets.push({ sourceSlug: seed.slug, targetSlug: seed.slug, reason: `source_gender_${source.gender}` });
      continue;
    }

    for (const rawTargetSlug of unique(seed.similar ?? [])) {
      const targetSlug = slugifyTr(rawTargetSlug);
      const target = bySlug.get(targetSlug);
      if (!target) {
        missingTargets.push({ sourceSlug: seed.slug, targetSlug: rawTargetSlug, reason: "target_not_found" });
        continue;
      }
      if (target.gender !== "GIRL") {
        missingTargets.push({ sourceSlug: seed.slug, targetSlug, reason: `target_gender_${target.gender}` });
        continue;
      }
      if (target.id === source.id) continue;

      for (const [from, to] of [
        [source, target],
        [target, source],
      ] as const) {
        const key = relationKey(from.id, to.id);
        if (existing.has(key) || pending.has(key)) {
          skippedExisting.push({ sourceSlug: from.slug, targetSlug: to.slug });
          continue;
        }
        pending.add(key);
        toInsert.push({
          id: createId(),
          sourceId: from.id,
          targetId: to.id,
          sourceSlug: from.slug,
          targetSlug: to.slug,
        });
      }
    }
  }

  if (toInsert.length > 0) {
    const rows = toInsert.map(({ id, sourceId, targetId }) => ({ id, sourceId, targetId }));
    const { error: insertError } = await supabase.from("SimilarName").insert(rows as never[]);
    if (insertError) {
      throw new Error(`SimilarName insert başarısız: ${insertError.message}`);
    }
  }

  const { data: verifyRelations, error: verifyError } = await supabase
    .from("SimilarName")
    .select("sourceId,targetId")
    .in("sourceId", sourceIds);

  if (verifyError) {
    throw new Error(`SimilarName doğrulaması başarısız: ${verifyError.message}`);
  }

  const countsBySourceId = new Map<string, Set<string>>();
  for (const rel of verifyRelations ?? []) {
    const sourceId = String(rel.sourceId);
    const targetId = String(rel.targetId);
    const set = countsBySourceId.get(sourceId) ?? new Set<string>();
    set.add(targetId);
    countsBySourceId.set(sourceId, set);
  }

  const relationCounts = Object.fromEntries(
    seeds.map((seed) => {
      const source = bySlug.get(seed.slug);
      return [seed.slug, source ? (countsBySourceId.get(source.id)?.size ?? 0) : 0];
    }),
  );
  const belowTarget = Object.entries(relationCounts)
    .filter(([, count]) => count < 5)
    .map(([slug, count]) => ({ slug, count }));

  const duplicatePairCount =
    (verifyRelations?.length ?? 0) -
    new Set((verifyRelations ?? []).map((row) => relationKey(String(row.sourceId), String(row.targetId)))).size;

  console.log(
    JSON.stringify(
      {
        sourceSeedCount: seeds.length,
        relatedSlugCount: relatedSlugs.length,
        insertedRelationCount: toInsert.length,
        skippedExistingCount: skippedExisting.length,
        missingRelatedCount: missingTargets.length,
        duplicatePairCount,
        allSourcesAtLeastFive: belowTarget.length === 0,
        belowTarget,
        relationCounts,
        insertedRelations: toInsert.map(({ sourceSlug, targetSlug }) => ({ sourceSlug, targetSlug })),
        missingRelated: missingTargets,
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
