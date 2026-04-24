import { NextRequest } from "next/server";
import { getNameBySlugFromStore } from "@/lib/static/names-store";

/**
 * Sorgu param: ?slugs=a,b,c — slug listesine göre isim yükler (kaynak: src/data/baby-names.ts).
 */
export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("slugs");
  const slugs = raw
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? [];
  if (!slugs.length) {
    return Response.json([]);
  }
  const names = slugs
    .map((slug) => getNameBySlugFromStore(slug))
    .filter((n): n is NonNullable<typeof n> => n != null);
  return Response.json(names);
}
