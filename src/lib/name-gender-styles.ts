import type { Gender } from "@/types/database";

/** İsim metni rengi (başlık / liste linki varsayılan) */
export function nameDisplayTextClass(g: Gender): string {
  if (g === "GIRL") return "text-accent-pink";
  if (g === "BOY") return "text-accent-blue";
  return "text-primary";
}

/** Küçük cinsiyet rozeti (kart, rastgele isim vb.) */
export function nameGenderBadgeSmClass(g: Gender): string {
  const base =
    "rounded-full px-1.5 py-0.5 text-[0.58rem] font-medium min-[420px]:px-2 min-[420px]:text-xs";
  if (g === "GIRL") return `${base} bg-accent-pink-soft text-accent-pink`;
  if (g === "BOY") return `${base} bg-accent-blue-soft text-accent-blue`;
  return `${base} bg-violet-100 text-violet-800`;
}

/** Orta boy cinsiyet rozeti (NameCard) */
export function nameGenderBadgeClass(g: Gender): string {
  const base = "rounded-full px-2 py-0.5 text-xs font-medium";
  if (g === "GIRL") return `${base} bg-accent-pink-soft text-accent-pink`;
  if (g === "BOY") return `${base} bg-accent-blue-soft text-accent-blue`;
  return `${base} bg-violet-100 text-violet-800`;
}

/** Detay sayfası üst cinsiyet rozeti */
export function nameGenderBadgeLgClass(g: Gender): string {
  const base = "rounded-full px-3 py-1 text-xs font-semibold";
  if (g === "GIRL") return `${base} bg-accent-pink-soft text-accent-pink`;
  if (g === "BOY") return `${base} bg-accent-blue-soft text-accent-blue`;
  return `${base} bg-violet-100 text-violet-800`;
}

/** İsim detay kahraman bölümü arka planı */
export function nameHeroSectionClass(g: Gender): string {
  if (g === "GIRL") return "bg-accent-pink-soft/25";
  if (g === "BOY") return "bg-accent-blue-soft/25";
  return "bg-violet-50/35";
}

/** “Favorilere ekle” ipucu metni */
export function nameHeartHintClass(g: Gender): string {
  if (g === "GIRL") return "text-accent-pink";
  if (g === "BOY") return "text-accent-blue";
  return "text-primary";
}

/** Özellik listesi onay işareti */
export function nameTraitCheckClass(g: Gender): string {
  if (g === "GIRL") return "text-accent-pink";
  if (g === "BOY") return "text-accent-blue";
  return "text-primary";
}

/** Benzer isimler hapı */
export function nameSimilarPillClass(g: Gender): string {
  const base = "rounded-full px-3 py-1 text-sm font-semibold hover:underline";
  if (g === "GIRL") return `${base} bg-accent-pink-soft text-accent-pink`;
  if (g === "BOY") return `${base} bg-accent-blue-soft text-accent-blue`;
  return `${base} bg-violet-100 text-violet-800`;
}

/** Alt CTA şeridi arka planı */
export function nameCtaStripClass(g: Gender): string {
  if (g === "GIRL") return "bg-accent-pink-soft/40";
  if (g === "BOY") return "bg-accent-blue-soft/40";
  return "bg-violet-50/60";
}

/** “Diğer isimler” çerçeveli düğme */
export function nameCtaOutlineButtonClass(g: Gender): string {
  const base = "rounded-2xl border px-5 py-2 text-sm font-semibold";
  if (g === "GIRL") return `${base} border-accent-pink text-accent-pink`;
  if (g === "BOY") return `${base} border-accent-blue text-accent-blue`;
  return `${base} border-primary text-primary`;
}

/** Sıralı kart üzerindeki numara rozeti */
export function nameIndexBadgeClass(g: Gender): string {
  const base = "absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold";
  if (g === "GIRL") return `${base} bg-accent-pink-soft text-accent-pink`;
  if (g === "BOY") return `${base} bg-accent-blue-soft text-accent-blue`;
  return `${base} bg-violet-100 text-violet-800`;
}

/** NameListRow satır hover zemini */
export function nameListRowHoverClass(g: Gender): string {
  if (g === "GIRL") return "hover:bg-accent-pink-soft/35";
  if (g === "BOY") return "hover:bg-accent-blue-soft/35";
  return "hover:bg-violet-50/40";
}

/** Popüler şerit: isim + hover */
export function nameMarqueeTitleClass(g: Gender): string {
  const base = "font-display text-base leading-tight transition";
  if (g === "GIRL") return `${base} text-accent-pink group-hover:text-accent-pink`;
  if (g === "BOY") return `${base} text-accent-blue group-hover:text-accent-blue`;
  return `${base} text-primary group-hover:text-primary`;
}

/** Popüler şerit alt satır (Kız / Erkek etiketi) */
export function nameMarqueeCategoryClass(cat: string): string {
  if (cat === "Kız") return "text-[0.68rem] font-semibold uppercase text-accent-pink";
  if (cat === "Erkek") return "text-[0.68rem] font-semibold uppercase text-accent-blue";
  return "text-[0.68rem] font-semibold uppercase text-muted";
}

/** Rastgele isim kutusu başlık gradyanı (üst şerit) */
export function nameRandomCardHeaderGradientClass(g: Gender): string {
  if (g === "BOY") return "bg-gradient-to-r from-primary to-accent-blue";
  if (g === "UNISEX") return "bg-gradient-to-r from-primary to-violet-500";
  return "bg-gradient-to-r from-primary to-accent-pink";
}

/** İlk “Anlamı” kutusu zemini (detay ızgarası) */
export function nameMeaningCardBgClass(g: Gender): string {
  if (g === "GIRL") return "bg-pink-50";
  if (g === "BOY") return "bg-sky-50";
  return "bg-zinc-50";
}
