import { config } from "dotenv";
import { BABY_NAME_SEED } from "../src/data/baby-names";
import { getNameBySlug, getNamesByLetter } from "../src/lib/queries/names";

config({ path: ".env.local" });

function isIijGirlSeed(seed: (typeof BABY_NAME_SEED)[number]) {
  const first = seed.displayName.slice(0, 1).toLocaleUpperCase("tr-TR");
  return seed.id.startsWith("iij-girl-") && seed.gender === "GIRL" && ["I", "İ", "J"].includes(first);
}

async function main() {
  const seeds = BABY_NAME_SEED.filter(isIijGirlSeed);
  const sampleSlugs = ["isilay", "irmak", "ilayda", "ikra", "jiyan"];
  const sampleRows = await Promise.all(
    sampleSlugs.map(async (slug) => {
      const row = await getNameBySlug(slug);
      return {
        slug,
        found: Boolean(row),
        displayName: row?.displayName ?? null,
        gender: row?.gender ?? null,
        similarCount: row?.similarFrom.length ?? 0,
      };
    }),
  );

  const letterChecks: Record<string, { expectedSeedCount: number; listedCount: number; listedSlugs: string[] }> = {};
  for (const letter of ["I", "İ", "J"]) {
    const expectedSeedCount = seeds.filter(
      (seed) => seed.displayName.slice(0, 1).toLocaleUpperCase("tr-TR") === letter,
    ).length;
    const listed = await getNamesByLetter(letter, "GIRL", 200);
    letterChecks[letter] = {
      expectedSeedCount,
      listedCount: listed?.length ?? 0,
      listedSlugs: (listed ?? []).filter((row) => seeds.some((seed) => seed.slug === row.slug)).map((row) => row.slug),
    };
  }

  console.log(
    JSON.stringify(
      {
        sampleRows,
        letterChecks,
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
