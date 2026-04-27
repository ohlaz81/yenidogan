import type { Gender } from "@/types/database";

/**
 * `baby (N).jpeg` görsellerinin kız / erkek havuzlarına ayrımı (görsellere göre).
 * Yeni numaralı görsel eklendiğinde burayı güncelleyin; tanımsız index için eski tek/çift yedek kullanılır.
 */
const GIRL_INDICES = new Set<number>([
  2, 4, 5, 6, 11, 19, 20, 22, 24, 26, 29, 32, 34, 35,
]);

const BOY_INDICES = new Set<number>([
  1, 3, 12, 21, 23, 25, 27, 28, 30, 31, 33, 36, 37, 38, 39, 40,
]);

/** Kız veya erkek bebek stok görseli; UNISEX isimlerde kullanılmaz. */
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
