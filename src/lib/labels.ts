import type { Gender, NameStyle } from "@/generated/prisma/enums";

export const genderLabels: Record<Gender, string> = {
  GIRL: "Kız ismi",
  BOY: "Erkek ismi",
  UNISEX: "Ünisex",
};

export const styleLabels: Record<NameStyle, string> = {
  MODERN: "Modern",
  CLASSIC: "Klasik",
  RARE: "Nadir",
  POPULAR: "Popüler",
};

export function toneClass(tone: string) {
  const map: Record<string, string> = {
    pink: "bg-pink-100 text-pink-800",
    blue: "bg-sky-100 text-sky-800",
    green: "bg-emerald-100 text-emerald-800",
    yellow: "bg-amber-100 text-amber-900",
    purple: "bg-violet-100 text-violet-800",
    lavender: "bg-purple-100 text-purple-800",
  };
  return map[tone] ?? "bg-zinc-100 text-zinc-800";
}
