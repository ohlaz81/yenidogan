import type { Gender } from "@/types/database";

/**
 * `public/media/babies` içindeki `baby (N)` / `baby(N)` dosya numaralarının kız / erkek havuzları.
 * Tüm mevcut görseller iki gruba bölünmüştür; yeni numara eklendiğinde kümelere ekleyin.
 * Admin’de isme özel kapak (`Name.imageId`) seçilirse o görsel kullanılır — bu tablo yalnızca otomatik atama içindir.
 */
const GIRL_INDICES = new Set<number>([
  2, 4, 5, 6, 11, 19, 20, 22, 24, 26, 28, 29, 32, 34, 35, 41,
]);

const BOY_INDICES = new Set<number>([
  1, 3, 12, 21, 23, 25, 27, 30, 31, 33, 36, 37, 38, 39, 40, 42,
]);

/** Kız veya erkek stok görseli; UNISEX’te index çift/tek ile yedeklenir. */
export function genderForBabyMediaIndex(index: number): "GIRL" | "BOY" {
  if (GIRL_INDICES.has(index)) return "GIRL";
  if (BOY_INDICES.has(index)) return "BOY";
  return index % 2 === 1 ? "GIRL" : "BOY";
}

export function babyMediaAlt(index: number, gender: Gender): string {
  if (gender === "GIRL") return `Kız bebek görseli ${index}`;
  if (gender === "BOY") return `Erkek bebek görseli ${index}`;
  return `Bebek görseli ${index}`;
}
