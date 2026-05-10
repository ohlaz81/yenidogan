import type { NormalizedNameImportRow } from "@/lib/admin/name-bulk-import";

type RawRow = Record<string, unknown>;

function foldHeader(h: string): string {
  return h
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/\s+/g, "")
    .replace(/_/g, "");
}

function cellBoolString(s: string): "true" | "false" {
  const u = s.trim().toLocaleLowerCase("tr-TR");
  if (["evet", "e", "var", "1", "true", "yes", "x"].includes(u)) return "true";
  if (["hayır", "hayir", "h", "yok", "0", "false", "no"].includes(u)) return "false";
  return "false";
}

/** İlk satır başlıkları → iç şema alan adı (camelCase). */
function headerToField(folded: string): keyof NormalizedNameImportRow | null {
  const m: Record<string, keyof NormalizedNameImportRow> = {
    slug: "slug",
    displayname: "displayName",
    görünenisim: "displayName",
    gorunenisim: "displayName",
    görünenad: "displayName",
    gorunenad: "displayName",
    isim: "displayName",
    gender: "gender",
    cinsiyet: "gender",
    meaning: "meaning",
    anlam: "meaning",
    origin: "origin",
    köken: "origin",
    koken: "origin",
    pronunciation: "pronunciation",
    telaffuz: "pronunciation",
    popularity: "popularity",
    popülerlik: "popularity",
    populerlik: "popularity",
    popularscore: "popularScore",
    popülerskor: "popularScore",
    populerskor: "popularScore",
    skor: "popularScore",
    inquran: "inQuran",
    kuranda: "inQuran",
    kuran: "inQuran",
    quranreference: "quranReference",
    kurannotu: "quranReference",
    kuranreferansı: "quranReference",
    kuranreferansi: "quranReference",
    style: "style",
    stil: "style",
    isshort: "isShort",
    kısa: "isShort",
    kisa: "isShort",
    beautifulmeaning: "beautifulMeaning",
    güzelanlam: "beautifulMeaning",
    guzelanlam: "beautifulMeaning",
    firstletter: "firstLetter",
    ilkharf: "firstLetter",
    intro: "intro",
    giriş: "intro",
    giris: "intro",
    traits: "traits",
    özellikler: "traits",
    ozellikler: "traits",
    published: "published",
    yayında: "published",
    yayinda: "published",
    yayın: "published",
    yayin: "published",
    imageid: "imageId",
    görselid: "imageId",
    gorselid: "imageId",
    görsel: "imageId",
    gorsel: "imageId",
  };
  return m[folded] ?? null;
}

function cellStr(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return Number.isFinite(v) ? String(v) : "";
  return String(v).trim();
}

function normalizeGender(raw: string): string {
  const u = raw.trim().toLocaleUpperCase("tr-TR");
  if (["GIRL", "KIZ", "KIZLAR"].includes(u)) return "GIRL";
  if (["BOY", "ERKEK", "OĞLAN", "OGLAN"].includes(u)) return "BOY";
  if (["UNISEX", "UNİSEX", "UNISEKS"].includes(u)) return "UNISEX";
  return raw.trim();
}

function normalizeStyle(raw: string): string {
  const u = raw.trim().toLocaleUpperCase("tr-TR");
  const map: Record<string, string> = {
    MODERN: "MODERN",
    KLASİK: "CLASSIC",
    KLASIK: "CLASSIC",
    CLASSIC: "CLASSIC",
    NADİR: "RARE",
    NADIR: "RARE",
    RARE: "RARE",
    POPÜLER: "POPULAR",
    POPULER: "POPULAR",
    POPULAR: "POPULAR",
  };
  return map[u] ?? raw.trim();
}

function excelRowToObject(row: RawRow): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(row)) {
    if (key === "__rowNum__") continue;
    const field = headerToField(foldHeader(key));
    if (!field) continue;
    const s = cellStr(val);
    if (
      s === "" &&
      field !== "intro" &&
      field !== "quranReference" &&
      field !== "traits" &&
      field !== "firstLetter" &&
      field !== "imageId" &&
      field !== "inQuran" &&
      field !== "isShort" &&
      field !== "beautifulMeaning" &&
      field !== "published"
    ) {
      continue;
    }
    if (field === "gender") {
      out[field] = normalizeGender(s);
      continue;
    }
    if (field === "style") {
      out[field] = normalizeStyle(s);
      continue;
    }
    if (field === "inQuran" || field === "isShort" || field === "beautifulMeaning") {
      out[field] = s === "" ? "false" : cellBoolString(s);
      continue;
    }
    if (field === "published") {
      if (s === "") continue;
      out[field] = cellBoolString(s);
      continue;
    }
    out[field] = s;
  }
  return out;
}

function isRowEmptyish(obj: Record<string, unknown>): boolean {
  const slug = cellStr(obj.slug);
  const name = cellStr(obj.displayName);
  return !slug && !name;
}

/**
 * İlk çalışma sayfasını okur; ilk satır başlık satırıdır.
 * Çıktı, `validateAndNormalizeNamesImport` ile uyumlu düz dizi JSON metnidir.
 */
export async function excelFileToNamesJsonText(file: File): Promise<{ ok: true; json: string } | { ok: false; error: string }> {
  const lower = file.name.toLowerCase();
  if (!lower.endsWith(".xlsx") && !lower.endsWith(".xls")) {
    return { ok: false, error: "Yalnızca .xlsx veya .xls dosyası seçin." };
  }

  let XLSX: typeof import("xlsx");
  try {
    XLSX = await import("xlsx");
  } catch {
    return { ok: false, error: "Excel modülü yüklenemedi." };
  }

  const buf = await file.arrayBuffer();
  let wb: import("xlsx").WorkBook;
  try {
    wb = XLSX.read(buf, { type: "array" });
  } catch {
    return { ok: false, error: "Excel dosyası okunamadı." };
  }

  const sheetName = wb.SheetNames[0];
  if (!sheetName) return { ok: false, error: "Çalışma sayfası bulunamadı." };

  const sheet = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<RawRow>(sheet, { defval: "", raw: false });
  if (!rows.length) return { ok: false, error: "Sayfada veri satırı yok." };

  const objects = rows
    .map((r) => {
      const o = excelRowToObject(r);
      if (!("inQuran" in o)) o.inQuran = "false";
      if (!("isShort" in o)) o.isShort = "false";
      if (!("beautifulMeaning" in o)) o.beautifulMeaning = "false";
      return o;
    })
    .filter((o) => !isRowEmptyish(o));

  if (!objects.length) {
    return { ok: false, error: "Slug veya görünen isim içeren satır bulunamadı." };
  }

  return { ok: true, json: JSON.stringify(objects, null, 2) };
}
