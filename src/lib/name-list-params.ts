import type { Gender, NameStyle } from "@/types/database";

export type NameListParams = {
  gender?: Gender;
  inQuran?: boolean;
  inQuranFalse?: boolean;
  style?: NameStyle;
  letter?: string;
  origin?: string;
  isShort?: boolean;
  beautifulMeaning?: boolean;
  search?: string;
  orderBy?: "popular" | "alpha";
  skip?: number;
  take?: number;
};
