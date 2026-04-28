import fs from "node:fs";
import path from "node:path";

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
