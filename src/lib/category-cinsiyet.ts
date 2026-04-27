import type { Gender } from "@/types/database";

/** `?cinsiyet=KIZ` / `ERKEK` → listeleme filtresi (harf sayfası ile aynı sözlük). */
export function genderFromCinsiyetParam(raw: string | string[] | undefined): Gender | undefined {
  const c = Array.isArray(raw) ? raw[0] : raw;
  if (c === "KIZ") return "GIRL";
  if (c === "ERKEK") return "BOY";
  return undefined;
}

/** Sayfalama linklerinde cinsiyet filtresini koru. */
export function cinsiyetPaginationExtra(gender: Gender | undefined): Record<string, string> | undefined {
  if (gender === "GIRL") return { cinsiyet: "KIZ" };
  if (gender === "BOY") return { cinsiyet: "ERKEK" };
  return undefined;
}
