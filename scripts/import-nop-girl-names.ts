import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { BABY_NAME_SEED, seedToName } from "../src/data/baby-names";
import type { Name } from "../src/types/database";

config({ path: ".env.local" });

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

function isNopGirlSeed(seed: (typeof BABY_NAME_SEED)[number]) {
  const first = seed.displayName.slice(0, 1).toLocaleUpperCase("tr-TR");
  return seed.id.startsWith("nop-girl-") && seed.gender === "GIRL" && ["N", "O", "Ö", "P"].includes(first);
}

function toDbRow(seed: (typeof BABY_NAME_SEED)[number], now: string): Name {
  const n = seedToName(seed);
  return {
    ...n,
    popularity: Math.min(5, Math.max(1, Math.round(Number(n.popularity) || 1))),
    published: true,
    imageId: null,
    createdAt: n.createdAt ?? now,
    updatedAt: now,
  };
}

function byLetter(rows: Array<{ displayName: string }>) {
  return rows.reduce<Record<string, number>>((acc, row) => {
    const first = row.displayName.slice(0, 1).toLocaleUpperCase("tr-TR");
    acc[first] = (acc[first] ?? 0) + 1;
    return acc;
  }, {});
}

async function main() {
  const seeds = BABY_NAME_SEED.filter(isNopGirlSeed);
  const seedSlugs = seeds.map((seed) => seed.slug);

  if (seeds.length === 0) {
    throw new Error("nop-girl-* seed kaydı bulunamadı.");
  }

  const { data: existingRows, error: existingError } = await supabase
    .from("Name")
    .select("slug,displayName,gender,published")
    .in("slug", seedSlugs);

  if (existingError) {
    throw new Error(`Mevcut slug kontrolü başarısız: ${existingError.message}`);
  }

  const existingSlugs = new Set((existingRows ?? []).map((row) => String(row.slug)));
  const alreadyExisting = seeds.filter((seed) => existingSlugs.has(seed.slug));
  const missingSeeds = seeds.filter((seed) => !existingSlugs.has(seed.slug));
  const now = new Date().toISOString();
  const rowsToInsert = missingSeeds.map((seed) => toDbRow(seed, now));

  if (rowsToInsert.length > 0) {
    const { error: insertError } = await supabase.from("Name").insert(rowsToInsert as never[]);
    if (insertError) {
      throw new Error(`Eksik isim insert işlemi başarısız: ${insertError.message}`);
    }
  }

  const listChecks: Record<string, number> = {};
  for (const letter of ["N", "O", "Ö", "P"]) {
    const letterSlugs = seeds
      .filter((seed) => seed.displayName.slice(0, 1).toLocaleUpperCase("tr-TR") === letter)
      .map((seed) => seed.slug);

    const { data, error } = await supabase
      .from("Name")
      .select("slug")
      .eq("gender", "GIRL")
      .eq("published", true)
      .eq("firstLetter", letter)
      .in("slug", letterSlugs);

    if (error) throw new Error(`${letter} harfi liste kontrolü başarısız: ${error.message}`);
    listChecks[letter] = data?.length ?? 0;
  }

  console.log(
    JSON.stringify(
      {
        seedCount: seeds.length,
        insertedCount: rowsToInsert.length,
        existingCount: alreadyExisting.length,
        preparedByLetter: byLetter(seeds),
        insertedByLetter: byLetter(rowsToInsert),
        existingByLetter: byLetter(alreadyExisting),
        insertedNames: rowsToInsert.map((row) => ({ slug: row.slug, displayName: row.displayName })),
        existingNames: alreadyExisting.map((seed) => ({ slug: seed.slug, displayName: seed.displayName })),
        listChecks,
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
