import { config } from "dotenv";
import { fetchPublishedNamesRowsUncached } from "../src/lib/queries/names-from-db";
import { buildSecondNameSuggestionIndex } from "../src/lib/second-name-suggestions";
import { normalizeNameSlug } from "../src/lib/slug";

const EXAMPLES = ["Yona", "Yüsra", "Azra", "Zeynep", "Elif", "Mira", "Hakan", "Mert", "Göktuğ", "Kuzey"];

async function main() {
  config({ path: ".env.local", quiet: true });
  const names = await fetchPublishedNamesRowsUncached();
  if (!names) throw new Error("Published isim havuzu alınamadı.");

  const eligible = names.filter((name) => name.published && (name.gender === "GIRL" || name.gender === "BOY"));
  const bySlug = new Map(eligible.map((name) => [normalizeNameSlug(name.slug), name]));
  const first = buildSecondNameSuggestionIndex(eligible, 10);
  const second = buildSecondNameSuggestionIndex(eligible, 10);
  const usage = new Map<string, number>();
  const signatures = new Map<string, string[]>();
  let genderMismatchCount = 0;
  let duplicateSuggestionCount = 0;
  let selfSuggestionCount = 0;
  let pagesBelowTen = 0;
  let suggestionCount = 0;

  for (const source of eligible) {
    const suggestions = first.get(normalizeNameSlug(source.slug)) ?? [];
    const seen = new Set<string>();
    if (suggestions.length < 10) pagesBelowTen += 1;
    suggestionCount += suggestions.length;
    const signature = suggestions.map((item) => normalizeNameSlug(item.slug)).sort().join("|");
    if (suggestions.length === 10) {
      const pages = signatures.get(signature) ?? [];
      pages.push(source.slug);
      signatures.set(signature, pages);
    }

    for (const suggestion of suggestions) {
      const slug = normalizeNameSlug(suggestion.slug);
      usage.set(slug, (usage.get(slug) ?? 0) + 1);
      if (suggestion.gender !== source.gender) genderMismatchCount += 1;
      if (seen.has(slug)) duplicateSuggestionCount += 1;
      seen.add(slug);
      if (slug === normalizeNameSlug(source.slug) || suggestion.id === source.id) selfSuggestionCount += 1;
    }

    const repeated = second.get(normalizeNameSlug(source.slug)) ?? [];
    if (suggestions.map((item) => item.slug).join("|") !== repeated.map((item) => item.slug).join("|")) {
      throw new Error(`${source.displayName} için sonuç deterministik değil.`);
    }
  }

  const duplicateSets = [...signatures.values()].filter((pages) => pages.length > 1);
  const topTwenty = [...usage.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "tr-TR"))
    .slice(0, 20)
    .map(([slug, count]) => ({ name: bySlug.get(slug)?.displayName ?? slug, pageCount: count }));
  const examples = Object.fromEntries(
    EXAMPLES.map((displayName) => {
      const source = eligible.find((name) => name.displayName.toLocaleLowerCase("tr-TR") === displayName.toLocaleLowerCase("tr-TR"));
      return [
        displayName,
        source ? (first.get(normalizeNameSlug(source.slug)) ?? []).map((item) => item.displayName) : ["KAYIT BULUNAMADI"],
      ];
    }),
  );

  const report = {
    processedNameCount: eligible.length,
    duplicateTenItemSetPageCount: duplicateSets.reduce((sum, pages) => sum + pages.length, 0),
    duplicateTenItemSets: duplicateSets,
    genderMismatchCount,
    duplicateSuggestionCount,
    selfSuggestionCount,
    pagesBelowTen,
    averageSuggestionCount: Number((suggestionCount / Math.max(1, eligible.length)).toFixed(2)),
    topTwenty,
    examples,
  };
  console.log(JSON.stringify(report, null, 2));

  const yona = examples.Yona.join("|");
  const yusra = examples["Yüsra"].join("|");
  if (yona === yusra) throw new Error("Yona ve Yüsra önerileri aynı.");
  if (report.duplicateTenItemSetPageCount !== 0) throw new Error("Aynı 10'lu öneri seti bulundu.");
  if (genderMismatchCount || duplicateSuggestionCount || selfSuggestionCount) {
    throw new Error("Öneri bütünlük kontrollerinden biri başarısız.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
