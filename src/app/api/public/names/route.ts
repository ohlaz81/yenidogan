import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("slugs");
  const slugs = raw?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  if (!slugs.length) {
    return Response.json([]);
  }
  const names = await prisma.name.findMany({
    where: { published: true, slug: { in: slugs } },
    include: { image: true },
  });
  return Response.json(names);
}
