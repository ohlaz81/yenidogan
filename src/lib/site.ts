export const site = {
  name: "Yenidogan.net",
  url: "https://yenidogan.net",
  tagline: "En güzel başlangıç en özel isimle...",
  defaultTitle: "Bebek İsimleri, Anlamları ve En Güzel İsim Rehberi",
  description:
    "Kız ve erkek bebek isimleri, anlamları, kökenleri ve isim rehberi içerikleriyle modern bir isim keşif platformu.",
  ogImage: "https://yenidogan.net/rehber/rehber1.jpeg",
} as const;

const CANONICAL_BASE_URL = "https://www.yenidogan.net";

export function canonicalUrl(path = "/") {
  const cleanPath = path.split("?")[0]?.split("#")[0] || "/";
  const normalizedPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
  return `${CANONICAL_BASE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
}
