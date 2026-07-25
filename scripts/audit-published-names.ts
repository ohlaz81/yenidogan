import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { config as loadEnv } from "dotenv";
import { normalizeNameSlug } from "../src/lib/slug";
import { getNameBySlugFromDbUncached } from "../src/lib/queries/names-from-db";

loadEnv({ path: path.resolve(".env.local"), override: false, quiet: true });
loadEnv({ path: path.resolve(".env"), override: false, quiet: true });

type AuditRow = {
  id: string;
  slug: string | null;
  displayName: string | null;
  gender: string | null;
  meaning: string | null;
  origin: string | null;
  pronunciation: string | null;
  popularity: number | null;
  popularScore: number | null;
  inQuran: boolean | null;
  quranReference: string | null;
  style: string | null;
  isShort: boolean | null;
  beautifulMeaning: boolean | null;
  firstLetter: string | null;
  intro: string | null;
  traits: unknown;
  published: boolean | null;
  imageId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

const PAGE_SIZE = 500;
const SELECT = "id,slug,displayName,gender,meaning,origin,pronunciation,popularity,popularScore,inQuran,quranReference,style,isShort,beautifulMeaning,firstLetter,intro,traits,published,imageId,createdAt,updatedAt";
const ENCODING_ERROR = /(?:Ãƒ|Ã„|Ã…|Ã‚|ï¿½|�)/;
const TEMPLATE_SIGNATURES = [
  "farklı kuşaklarda duyulan",
  "günümüzde bebek isim rehberlerinde yer alan",
  "aile tercihlerine uygun, dengeli tını",
  "kökeniyle eşleşen bir tercihtir",
  "Türkiye’de aileler arasında sık tercih edilen bir tınıdır",
];

function env(name: string) {
  return (process.env[name] ?? "").trim().replace(/^['"]|['"]$/g, "");
}

function firstWords(value: string, count = 6) {
  return value.trim().split(/\s+/).slice(0, count).join(" ");
}

function decodeCommonHtmlEntities(value: string) {
  return value
    .replace(/&quot;/g, "\"")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function fetchRows(published?: boolean) {
  const client = createClient(env("NEXT_PUBLIC_SUPABASE_URL").replace(/\/rest\/v1\/?$/, ""), env("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const rows: AuditRow[] = [];
  let exactCount: number | null = null;
  for (let from = 0; ; from += PAGE_SIZE) {
    let query = client.from("Name").select(SELECT, from === 0 ? { count: "exact" } : undefined);
    if (published !== undefined) query = query.eq("published", published);
    const { data, error, count } = await query.order("id", { ascending: true }).range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(`Name sayfası ${from}-${from + PAGE_SIZE - 1} okunamadı: ${error.message}`);
    if (from === 0) exactCount = count;
    const batch = (data ?? []) as AuditRow[];
    rows.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }
  if (exactCount !== null && rows.length !== exactCount) throw new Error(`Sayfalama eksik: ${rows.length}/${exactCount}`);
  return rows;
}

async function probeRoute(baseUrl: string | null, row: AuditRow) {
  if (!baseUrl) return { status: "skipped", httpStatus: null, error: null };
  const slug = normalizeNameSlug(row.slug ?? "");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/isim/${encodeURIComponent(slug)}`, {
      redirect: "manual",
      signal: controller.signal,
    });
    const html = decodeCommonHtmlEntities(await response.text());
    const name = (row.displayName ?? "").trim();
    const meaningLead = firstWords(row.meaning ?? "");
    const introLead = firstWords(row.intro ?? "");
    const meaningMatches = !meaningLead || html.includes(meaningLead);
    const introMatches = !introLead || html.includes(introLead);
    const correct = response.status === 200 && html.includes(name) && meaningMatches && introMatches;
    return {
      status: response.status === 404 ? "unexpected-404" : response.status >= 500 ? "route-error" : correct ? "ok" : "wrong-content",
      httpStatus: response.status,
      meaningMatches,
      introMatches,
      error: null,
    };
  } catch (error) {
    return {
      status: error instanceof DOMException && error.name === "AbortError" ? "timeout" : "route-error",
      httpStatus: null,
      meaningMatches: false,
      introMatches: false,
      error: String(error),
    };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  if (!env("NEXT_PUBLIC_SUPABASE_URL") || !env("SUPABASE_SERVICE_ROLE_KEY")) {
    throw new Error("Salt-okunur audit için NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.");
  }
  const baseUrlArg = process.argv.find((arg) => arg.startsWith("--base-url="));
  const baseUrl = baseUrlArg ? baseUrlArg.slice("--base-url=".length) : null;
  const [allRows, publishedRows] = await Promise.all([fetchRows(), fetchRows(true)]);
  const slugGroups = new Map<string, AuditRow[]>();
  for (const row of publishedRows) {
    const key = normalizeNameSlug(row.slug ?? "");
    slugGroups.set(key, [...(slugGroups.get(key) ?? []), row]);
  }

  const auditRow = async (row: AuditRow) => {
    const normalizedSlug = normalizeNameSlug(row.slug ?? "");
    const invalid: string[] = [];
    if (!row.slug?.trim()) invalid.push("empty-slug");
    if (row.slug !== row.slug?.trim()) invalid.push("slug-whitespace");
    if (row.slug && row.slug !== normalizedSlug) invalid.push("noncanonical-slug");
    if (!row.displayName?.trim()) invalid.push("empty-displayName");
    if (!row.meaning?.trim()) invalid.push("empty-meaning");
    if (!row.intro?.trim()) invalid.push("empty-intro");
    if (!row.origin?.trim()) invalid.push("empty-origin");
    if (!Array.isArray(row.traits)) invalid.push("invalid-traits");
    if (row.inQuran === false && row.quranReference?.trim()) invalid.push("quran-contradiction");
    const expectedFirst = (row.displayName ?? "").trim().slice(0, 1).toLocaleUpperCase("tr-TR");
    if (expectedFirst && row.firstLetter?.trim().toLocaleUpperCase("tr-TR") !== expectedFirst) invalid.push("firstLetter-mismatch");
    const text = `${row.slug} ${row.displayName} ${row.meaning} ${row.origin} ${row.intro}`;
    const encodingError = ENCODING_ERROR.test(text);
    const templateContent = TEMPLATE_SIGNATURES.some((signature) => text.toLocaleLowerCase("tr-TR").includes(signature.toLocaleLowerCase("tr-TR")));
    let directRead: "ok" | "missing" | "wrong-content" | "route-error" = "ok";
    let directMeaningMatches = false;
    let directIntroMatches = false;
    try {
      const direct = await getNameBySlugFromDbUncached(normalizedSlug);
      if (!direct) directRead = "missing";
      else {
        directMeaningMatches = direct.meaning === (row.meaning ?? "");
        directIntroMatches = direct.intro === row.intro;
        if (direct.displayName !== row.displayName || !directMeaningMatches || !directIntroMatches) {
          directRead = "wrong-content";
        }
      }
    } catch {
      directRead = "route-error";
    }
    const route = await probeRoute(baseUrl, row);
    return {
      id: row.id,
      slug: row.slug,
      normalizedSlug,
      displayName: row.displayName,
      invalid,
      duplicateSlug: (slugGroups.get(normalizedSlug)?.length ?? 0) > 1,
      encodingError,
      templateContent,
      directRead,
      directMeaningMatches,
      directIntroMatches,
      route,
    };
  };
  const records: Awaited<ReturnType<typeof auditRow>>[] = [];
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(12, publishedRows.length) }, async () => {
    while (true) {
      const index = nextIndex++;
      const row = publishedRows[index];
      if (!row) return;
      records[index] = await auditRow(row);
    }
  });
  await Promise.all(workers);

  const summary = {
    totalDbRecords: allRows.length,
    totalPublishedRecords: publishedRows.length,
    testedNames: records.length,
    directMissing: records.filter((record) => record.directRead === "missing").length,
    directWrongContent: records.filter((record) => record.directRead === "wrong-content").length,
    duplicateSlugRecords: records.filter((record) => record.duplicateSlug).length,
    duplicateSlugGroups: [...slugGroups.values()].filter((group) => group.length > 1).length,
    invalidDataRecords: records.filter((record) => record.invalid.length > 0).length,
    templateContentRecords: records.filter((record) => record.templateContent).length,
    encodingErrorRecords: records.filter((record) => record.encodingError).length,
    http200: records.filter((record) => record.route.httpStatus === 200).length,
    http404: records.filter((record) => record.route.httpStatus === 404).length,
    http500: records.filter((record) => (record.route.httpStatus ?? 0) >= 500).length,
    wrongContent: records.filter((record) => record.route.status === "wrong-content").length,
    unexpected404: records.filter((record) => record.route.status === "unexpected-404").length,
    routeErrors: records.filter((record) => record.route.status === "route-error").length,
    timeouts: records.filter((record) => record.route.status === "timeout").length,
    routeTestsSkipped: baseUrl === null,
  };
  const report = { generatedAt: new Date().toISOString(), dryRun: true, pageSize: PAGE_SIZE, baseUrl, summary, records };
  const reportDir = path.resolve("scripts/reports");
  await mkdir(reportDir, { recursive: true });
  await writeFile(path.join(reportDir, "published-names-audit.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
  const markdown = `# Published isim audit raporu\n\n- Üretim: ${report.generatedAt}\n- Dry-run: evet; DB yazması yapılmadı\n- Toplam DB kaydı: ${summary.totalDbRecords}\n- Published kayıt: ${summary.totalPublishedRecords}\n- Test edilen: ${summary.testedNames}\n- Direct missing: ${summary.directMissing}\n- Direct wrong-content: ${summary.directWrongContent}\n- Duplicate slug grubu: ${summary.duplicateSlugGroups}\n- Geçersiz veri kaydı: ${summary.invalidDataRecords}\n- Şablon içerik şüphesi: ${summary.templateContentRecords}\n- Encoding hatası: ${summary.encodingErrorRecords}\n- HTTP 200 / 404 / 500: ${summary.http200} / ${summary.http404} / ${summary.http500}\n- HTTP wrong-content: ${summary.wrongContent}\n`;
  await writeFile(path.join(reportDir, "published-names-audit.md"), markdown, "utf8");
  console.log(JSON.stringify(summary, null, 2));
}

void main();
