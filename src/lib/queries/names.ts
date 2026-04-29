import type { Gender, NameWithDetail } from "@/types/database";
import {
  getNameBySlugFromStore,
  getNamesByLetterFromStore,
  listNamesFromStore,
} from "@/lib/static/names-store";
import { ensureNameDetailDisplayImage } from "@/lib/name-display-image";
import {
  getNameBySlugFromDb,
  getNamesByLetterFromDb,
  listNamesFromDb,
} from "@/lib/queries/names-from-db";
import type { NameListParams } from "@/lib/name-list-params";

export type { NameListParams } from "@/lib/name-list-params";

/** Canlı içerik: Supabase’de yayınlanmış isimler öncelikli; eksik ortamda `baby-names` seed kullanılır. */
export async function listNames(p: NameListParams) {
  const fromDb = await listNamesFromDb(p);
  if (fromDb !== null) return fromDb;
  return listNamesFromStore(p);
}

export async function getNameBySlug(slug: string): Promise<NameWithDetail | null> {
  const fromDb = await getNameBySlugFromDb(slug);
  if (fromDb) return ensureNameDetailDisplayImage(fromDb);
  return getNameBySlugFromStore(slug);
}

export async function getNamesByLetter(letter: string, gender?: Gender, take = 12) {
  const fromDb = await getNamesByLetterFromDb(letter, gender, take);
  if (fromDb !== null) return fromDb;
  return getNamesByLetterFromStore(letter, gender, take);
}
