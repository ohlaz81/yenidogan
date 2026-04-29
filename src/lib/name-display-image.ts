import type { Gender, MediaAsset, Name, NameWithDetail } from "@/types/database";
import { pickMediaForName } from "@/lib/static/names-store";

function minimalNameForStock(id: string, gender: Gender): Name {
  return {
    id,
    gender,
    slug: "_",
    displayName: "—",
    meaning: "",
    origin: "",
    pronunciation: "",
    popularity: 1,
    popularScore: 0,
    inQuran: false,
    style: "MODERN",
    isShort: false,
    beautifulMeaning: false,
    firstLetter: "A",
    intro: null,
    traits: null,
    published: true,
    imageId: null,
    createdAt: "2020-01-01T00:00:00.000Z",
    updatedAt: "2020-01-01T00:00:00.000Z",
  };
}

/**
 * Ana sayfa popüler kayan şerit: kapak varsa onu, yoksa bu isim id + cinsiyet ile stok bebek görseli
 * (detay sayfasındaki `pickMediaForName` ile aynı kural — tek cinsiyet yedeği değil).
 */
export function resolveTickerBabyImageUrl(input: {
  id: string;
  gender: Gender;
  image?: MediaAsset | null;
}): string {
  const u = typeof input.image?.url === "string" ? input.image.url.trim() : "";
  if (u.length > 0) return u;
  return pickMediaForName(minimalNameForStock(input.id, input.gender)).url;
}

/** `image`/URL boşsa isme özgü bebek görseli (arka uç ile aynı kural). */
export function ensureNameDisplayImage<T extends Name & { image: MediaAsset | null }>(name: T): T {
  const url = typeof name.image?.url === "string" ? name.image.url.trim() : "";
  if (url.length > 0) return name;
  const fb = pickMediaForName(name);
  return { ...name, image: fb };
}

/** Detay + benzer isim satırlarında aynı kural (Supabase çıktısı). */
export function ensureNameDetailDisplayImage(name: NameWithDetail): NameWithDetail {
  const main = ensureNameDisplayImage(name);
  const similarFrom = name.similarFrom.map((s) => ({
    ...s,
    target: ensureNameDisplayImage(s.target),
  }));
  return { ...main, similarFrom };
}
