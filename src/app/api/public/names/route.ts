import { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase/admin";
import { mapByIds } from "@/lib/supabase/media-helpers";

const sel =
  "id,slug,displayName,gender,meaning,origin,pronunciation,popularity,popularScore,inQuran,style,isShort,beautifulMeaning,firstLetter,intro,traits,published,imageId,createdAt,updatedAt";

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("slugs");
  const slugs = raw?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  if (!slugs.length) {
    return Response.json([]);
  }
  const s = getSupabase();
  const { data, error } = await s
    .from("Name")
    .select(sel)
    .eq("published", true)
    .in("slug", slugs);
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  const rows = data ?? [];
  const m = await mapByIds(
    s,
    rows.map((n: { imageId: string | null }) => n.imageId).filter(Boolean) as string[],
  );
  const names = rows.map((n: (typeof rows)[0]) => ({
    ...n,
    image: n.imageId ? m.get(n.imageId) ?? null : null,
  }));
  return Response.json(names);
}
