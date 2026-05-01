import type { Gender, NameStyle } from "@/types/database";

export type BabyNameSeed = {
  id: string;
  slug: string;
  displayName: string;
  gender: Gender;
  meaning: string;
  origin: string;
  pronunciation: string;
  popularity: number;
  popularScore: number;
  inQuran: boolean;
  /** Seed/DB ile uyum; Kur'an geçiş notu (opsiyonel). */
  quranReference?: string | null;
  style: NameStyle;
  isShort: boolean;
  beautifulMeaning: boolean;
  intro: string;
  traits: string[];
  similar: string[];
};
