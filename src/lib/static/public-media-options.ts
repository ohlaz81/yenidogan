import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

type MediaOption = { id: string; url: string; alt: string | null };

function readDirAsMediaOptions(absDir: string, publicPrefix: string, idPrefix: string): MediaOption[] {
  if (!fs.existsSync(absDir)) return [];
  const files = fs.readdirSync(absDir, { withFileTypes: true });
  return files
    .filter((f) => f.isFile())
    .filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f.name))
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

export function mergeMediaOptions(
  dbOptions: { id: string; url: string; alt: string | null }[],
  publicOptions: { id: string; url: string; alt: string | null }[],
): { id: string; url: string; alt: string | null }[] {
  const byUrl = new Map<string, { id: string; url: string; alt: string | null }>();
  for (const m of dbOptions) byUrl.set(m.url, m);
  for (const m of publicOptions) {
    if (!byUrl.has(m.url)) byUrl.set(m.url, m);
  }
  return Array.from(byUrl.values());
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

  const { data: refreshed } = await s.from("MediaAsset").select("id,url,alt").order("createdAt", { ascending: false }).limit(600);
  return mergeMediaOptions((refreshed ?? []) as { id: string; url: string; alt: string | null }[], publicOptions);
}
