import { NextRequest } from "next/server";
import { getNameBySlug } from "@/lib/queries/names";

/**
 * Sorgu param: ?slugs=a,b,c — slug listesine göre isim yükler (canlı içerik: Supabase, yoksa seed).
 */
export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("slugs");
  const slugs = raw?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  if (!slugs.length) {
    return Response.json([]);
  }
  const names = [];
  for (const slug of slugs) {
    const n = await getNameBySlug(slug);
    if (n) names.push(n);
  }
  return Response.json(names);
}
