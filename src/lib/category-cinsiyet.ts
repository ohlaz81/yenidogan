import type { Gender } from "@/types/database";
import { normalizeTrLetter } from "@/lib/text";

export function categoryAlphabetTone(gender: Gender | undefined): "girl" | "boy" | "neutral" {
  if (gender === "GIRL") return "girl";
  if (gender === "BOY") return "boy";
  return "neutral";
}

/** `?cinsiyet=KIZ` / `ERKEK` → listeleme filtresi (harf sayfası ile aynı sözlük). */
export function genderFromCinsiyetParam(raw: string | string[] | undefined): Gender | undefined {
  const c = Array.isArray(raw) ? raw[0] : raw;
  if (c === "KIZ") return "GIRL";
  if (c === "ERKEK") return "BOY";
  return undefined;
}

/** `?harf=` — kategori listelerinde ilk harf süzmesi. */
export function harfFromSearchParams(sp: Record<string, string | string[] | undefined>): string | undefined {
  const raw = Array.isArray(sp.harf) ? sp.harf[0] : sp.harf;
  return raw?.trim() ? normalizeTrLetter(raw) : undefined;
}

/** Alfabet şeridinde cinsiyet sekmesi seçiliyken `harf` dışında korunacak sorgu. */
export function genderPreserveQuery(gender: Gender | undefined): Record<string, string> {
  if (gender === "GIRL") return { cinsiyet: "KIZ" };
  if (gender === "BOY") return { cinsiyet: "ERKEK" };
  return {};
}

/** Sayfalama ve harf şeridinde cinsiyet + harf parametrelerini birlikte koru. */
export function categoryListPaginationExtra(
  gender: Gender | undefined,
  harf?: string | undefined,
): Record<string, string> | undefined {
  const o: Record<string, string> = { ...genderPreserveQuery(gender) };
  if (harf) o.harf = harf;
  return Object.keys(o).length ? o : undefined;
}

/** Sayfalama linklerinde cinsiyet filtresini koru. */
export function cinsiyetPaginationExtra(gender: Gender | undefined): Record<string, string> | undefined {
  return categoryListPaginationExtra(gender, undefined);
}
