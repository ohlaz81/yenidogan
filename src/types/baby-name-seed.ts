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
  style: NameStyle;
  isShort: boolean;
  beautifulMeaning: boolean;
  intro: string;
  traits: string[];
  similar: string[];
};
