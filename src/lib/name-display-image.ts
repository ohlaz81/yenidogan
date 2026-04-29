import type { MediaAsset, Name } from "@/types/database";
import { pickMediaForName } from "@/lib/static/names-store";

/** `image`/URL boşsa isme özgü bebek görseli (arka uç ile aynı kural). */
export function ensureNameDisplayImage<T extends Name & { image: MediaAsset | null }>(name: T): T {
  const url = typeof name.image?.url === "string" ? name.image.url.trim() : "";
  if (url.length > 0) return name;
  const fb = pickMediaForName(name);
  return { ...name, image: fb };
}
