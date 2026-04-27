import { babyMediaPublicUrl } from "@/lib/static/baby-media-url";

export const site = {
  name: "yenidoğan.net",
  url: "https://yenidogan.net",
  tagline: "En güzel başlangıç, en özel isimle…",
  defaultTitle: "En güzel bebek isimleri, anlamları ve isim rehberi",
  description:
    "Kız ve erkek bebek isimleri, anlamları, kökenleri ve isim rehberi içerikleriyle modern bir isim keşif platformu.",
  ogImage: babyMediaPublicUrl("baby (5).jpeg"),
} as const;
