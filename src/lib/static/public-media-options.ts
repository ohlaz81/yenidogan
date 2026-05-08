import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import { postgrestToError } from "@/lib/supabase/errors";

type MediaOption = { id: string; url: string; alt: string | null };

function readDirAsMediaOptions(absDir: string, publicPrefix: string, idPrefix: string): MediaOption[] {
  if (!fs.existsSync(absDir)) return [];
  const files = fs.readdirSync(absDir, { withFileTypes: true });
  return files
    .filter((f) => f.isFile())
    .filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }))
    .map((f, idx) => {
      const url = `${publicPrefix}/${encodeURIComponent(f.name)}`;
      return {
        id: `${idPrefix}-${idx}-${f.name}`,
        url,
        alt: f.name,
      };
    });
}

export function getPublicMediaOptions(): MediaOption[] {
  const root = process.cwd();
  const fromRehber = readDirAsMediaOptions(path.join(root, "public", "rehber"), "/rehber", "public-rehber");
  const fromBabies = readDirAsMediaOptions(path.join(root, "public", "media", "babies"), "/media/babies", "public-babies");
  return [...fromRehber, ...fromBabies];
}

function stablePublicMediaId(url: string) {
  const h = createHash("sha1").update(url).digest("hex").slice(0, 20);
  return `public-${h}`;
}

export async function ensurePublicMediaAssets(
  s: SupabaseClient,
  dbOptions: { id: string; url: string; alt: string | null }[],
): Promise<{ id: string; url: string; alt: string | null }[]> {
  const publicOptions = getPublicMediaOptions();
  const dbByUrl = new Map(dbOptions.map((m) => [m.url, m]));
  const missing = publicOptions.filter((m) => !dbByUrl.has(m.url));

  if (missing.length > 0) {
    const now = new Date().toISOString();
    const rows = missing.map((m) => ({
      id: stablePublicMediaId(m.url),
      url: m.url,
      alt: m.alt,
      createdAt: now,
    }));
    await s.from("MediaAsset").upsert(rows as never[], { onConflict: "id" });
  }

  const publicUrls = [...new Set(publicOptions.map((p) => p.url))];
  const publicRows: { id: string; url: string; alt: string | null }[] = [];
  const chunkSize = 80;
  for (let i = 0; i < publicUrls.length; i += chunkSize) {
    const chunk = publicUrls.slice(i, i + chunkSize);
    if (chunk.length === 0) continue;
    const { data, error } = await s.from("MediaAsset").select("id,url,alt").in("url", chunk);
    if (error) throw postgrestToError(error, "ensurePublicMediaAssets:MediaAsset(public)");
    publicRows.push(...((data ?? []) as { id: string; url: string; alt: string | null }[]));
  }

  const byUrl = new Map(publicRows.map((r) => [r.url, r]));
  const orderedPublic = publicOptions
    .map((p) => byUrl.get(p.url))
    .filter((row): row is { id: string; url: string; alt: string | null } => row != null);

  const publicUrlSet = new Set(publicUrls);
  const { data: recent } = await s.from("MediaAsset").select("id,url,alt").order("createdAt", { ascending: false }).limit(900);
  const extras = ((recent ?? []) as { id: string; url: string; alt: string | null }[]).filter((m) => !publicUrlSet.has(m.url));

  return [...orderedPublic, ...extras];
}
