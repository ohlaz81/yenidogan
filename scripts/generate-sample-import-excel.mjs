/**
 * Tek seferlik: örnek toplu import Excel üretir.
 * Çalıştır: node scripts/generate-sample-import-excel.mjs
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as XLSX from "xlsx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outFile = path.join(root, "yenidogan_ornek_5_isim_import.xlsx");

/** Sistemdeki seed slug'larıyla çakışmaması için `ydgn-demo-*` önekli benzersiz slug'lar. */
const rows = [
  {
    slug: "ydgn-demo-nehir",
    displayName: "Nehir (Örnek)",
    gender: "GIRL",
    meaning: "Örnek içe aktarma satırı; su ile çağrışan modern bir kız adı betimlemesi.",
    origin: "Türkçe",
    pronunciation: "Ne-hir",
    popularity: 3,
    popularScore: 210,
    style: "MODERN",
    inQuran: "Hayır",
    quranReference: "",
    isShort: "Evet",
    beautifulMeaning: "Evet",
    firstLetter: "N",
    intro: "Toplu yükleme örneği için üretilmiştir; içerik sonradan düzenlenebilir.",
    traits: "Sakin, Zarif, Doğa sever",
    published: "Evet",
  },
  {
    slug: "ydgn-demo-akarsu",
    displayName: "Akarsu (Örnek)",
    gender: "BOY",
    meaning: "Örnek satır; akan su, tazelik ve hareket çağrışımı.",
    origin: "Türkçe",
    pronunciation: "A-kar-su",
    popularity: 4,
    popularScore: 340,
    style: "CLASSIC",
    inQuran: "Evet",
    quranReference: "Örnek not: Kur’an’da doğrudan isim geçmeyebilir; içerik yalnızca şablon amaçlıdır.",
    isShort: "Hayır",
    beautifulMeaning: "Evet",
    firstLetter: "A",
    intro: "Erkek isim örneği; yayın ve görseller panelden yönetilir.",
    traits: "Enerjik, Dürüst",
    published: "Evet",
  },
  {
    slug: "ydgn-demo-ruzgar",
    displayName: "Rüzgar (Örnek)",
    gender: "UNISEX",
    meaning: "Örnek satır; özgürlük ve hareket hissi veren evrensel bir ad betimlemesi.",
    origin: "Türkçe",
    pronunciation: "Rüz-gar",
    popularity: 2,
    popularScore: 120,
    style: "RARE",
    inQuran: "Hayır",
    quranReference: "",
    isShort: "Hayır",
    beautifulMeaning: "Hayır",
    firstLetter: "R",
    intro: "Unisex örnek; kısa telaffuz.",
    traits: "Özgür, Dinamik",
    published: "Evet",
  },
  {
    slug: "ydgn-demo-yaprak",
    displayName: "Yaprak (Örnek)",
    gender: "GIRL",
    meaning: "Örnek satır; doğa ve tazelik çağrışımı.",
    origin: "Türkçe",
    pronunciation: "Yaprak",
    popularity: 5,
    popularScore: 480,
    style: "POPULAR",
    inQuran: "Hayır",
    quranReference: "",
    isShort: "Evet",
    beautifulMeaning: "Evet",
    firstLetter: "Y",
    intro: "Popüler skor yüksek örnek satırı.",
    traits: "Taze, Neşeli, Doğa ile uyumlu",
    published: "Evet",
  },
  {
    slug: "ydgn-demo-kumsal",
    displayName: "Kumsal (Örnek)",
    gender: "BOY",
    meaning: "Örnek satır; sahil ve dinginlik çağrışımı.",
    origin: "Türkçe",
    pronunciation: "Kum-sal",
    popularity: 3,
    popularScore: 265,
    style: "MODERN",
    inQuran: "Hayır",
    quranReference: "",
    isShort: "Hayır",
    beautifulMeaning: "Evet",
    firstLetter: "K",
    intro: "Son örnek satır; görsel alanı boş bırakılabilir.",
    traits: "Sakin, Düşünceli",
    published: "Evet",
  },
];

const ws = XLSX.utils.json_to_sheet(rows);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "İsimler");
XLSX.writeFile(wb, outFile);
console.log("Yazıldı:", outFile);
