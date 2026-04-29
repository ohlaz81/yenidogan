import { NextRequest } from "next/server";
import { pickRandomPublishedFromDb } from "@/lib/queries/names-from-db";
import { pickRandomNameFromStoreExcluding } from "@/lib/static/names-store";

/**
 * Yayında rastgele bir isim döner (?exclude=slug — mümkünse şu ankini tekrarlama).
 */
export async function GET(req: NextRequest) {
  const excludeRaw = req.nextUrl.searchParams.get("exclude")?.trim();
  const excludeSlugs = excludeRaw ? [excludeRaw] : [];

  const fromDb = await pickRandomPublishedFromDb(excludeSlugs);
  if (fromDb) {
    return Response.json(fromDb);
  }

  const fromSeed = pickRandomNameFromStoreExcluding(excludeSlugs);
  if (fromSeed) {
    return Response.json(fromSeed);
  }

  return Response.json(null, { status: 404 });
}
