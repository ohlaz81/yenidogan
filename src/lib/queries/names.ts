import type { Gender, NameWithDetail } from "@/types/database";
import {
  getNameBySlugFromStore,
  getNamesByLetterFromStore,
  listNamesFromStore,
} from "@/lib/static/names-store";
import type { NameListParams } from "@/lib/name-list-params";

export type { NameListParams } from "@/lib/name-list-params";

/** Tüm isim listeleri ve detay sayfaları `src/data/baby-names.ts` kaynağından beslenir. */
export function listNames(p: NameListParams) {
  return Promise.resolve(listNamesFromStore(p));
}

export function getNameBySlug(slug: string): Promise<NameWithDetail | null> {
  return Promise.resolve(getNameBySlugFromStore(slug));
}

export function getNamesByLetter(letter: string, gender?: Gender, take = 12) {
  return Promise.resolve(getNamesByLetterFromStore(letter, gender, take));
}
