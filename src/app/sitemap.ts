import { MetadataRoute } from "next";
import { modernGuideIndexCards } from "@/data/modern-name-guides";
import { getStaticGuides } from "@/data/static-guide";
import { listNames } from "@/lib/queries/names";
import { normalizeNameSlug } from "@/lib/slug";
import type { Name } from "@/types/database";

const SITE_URL = "https://yenidogan.net";
const FALLBACK_LAST_MODIFIED = new Date("2020-01-01T00:00:00.000Z");

export const revalidate = 86400;

type SitemapEntry = MetadataRoute.Sitemap[number];
type NameLike = Pick<
  Name,
  "slug" | "gender" | "inQuran" | "style" | "isShort" | "beautifulMeaning" | "firstLetter" | "updatedAt" | "createdAt"
>;

function absoluteUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

function toDate(value: string | null | undefined) {
  if (!value) return FALLBACK_LAST_MODIFIED;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? FALLBACK_LAST_MODIFIED : date;
}

function newestDate(values: Array<string | null | undefined>) {
  return values.reduce((latest, value) => {
    const date = toDate(value);
    return date > latest ? date : latest;
  }, FALLBACK_LAST_MODIFIED);
}

function newestNameDate(names: readonly NameLike[]) {
  return newestDate(names.map((name) => name.updatedAt ?? name.createdAt));
}

function entry(
  path: string,
  lastModified: Date,
  changeFrequency: SitemapEntry["changeFrequency"],
  priority: number,
): SitemapEntry {
  return {
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  };
}

function categoryLastModified(names: readonly NameLike[], predicate: (name: NameLike) => boolean) {
  const matching = names.filter(predicate);
  return matching.length > 0 ? newestNameDate(matching) : newestNameDate(names);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { items: names } = await listNames({ take: 100000, orderBy: "alpha" });
  const guides = getStaticGuides().filter((guide) => guide.published);
  const allNamesLastModified = newestNameDate(names);
  const guidesLastModified = newestDate(guides.map((guide) => guide.updatedAt ?? guide.publishedAt ?? guide.createdAt));

  const categories: SitemapEntry[] = [
    {
      url: SITE_URL,
      lastModified:
        allNamesLastModified > guidesLastModified ? allNamesLastModified : guidesLastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    entry("/kiz-isimleri", categoryLastModified(names, (name) => name.gender === "GIRL"), "daily", 0.9),
    entry("/erkek-isimleri", categoryLastModified(names, (name) => name.gender === "BOY"), "daily", 0.9),
    entry("/tum-isimler", allNamesLastModified, "daily", 0.9),
    entry("/isim-bulucu", allNamesLastModified, "weekly", 0.7),
    entry("/kuranda-gecen-isimler", categoryLastModified(names, (name) => name.inQuran), "weekly", 0.8),
    entry("/populer-isimler", allNamesLastModified, "weekly", 0.8),
    entry("/modern-isimler", categoryLastModified(names, (name) => name.style === "MODERN"), "weekly", 0.8),
    entry("/nadir-isimler", categoryLastModified(names, (name) => name.style === "RARE"), "weekly", 0.8),
    entry("/kisa-isimler", categoryLastModified(names, (name) => name.isShort), "weekly", 0.8),
    entry(
      "/anlami-guzel-isimler",
      categoryLastModified(names, (name) => name.beautifulMeaning),
      "weekly",
      0.8,
    ),
    entry("/isim-rehberi", guidesLastModified, "weekly", 0.7),
  ];

  const letterEntries = Array.from(
    names.reduce((letters, name) => {
      if (!name.firstLetter) return letters;
      const previous = letters.get(name.firstLetter);
      const nextDate = toDate(name.updatedAt ?? name.createdAt);
      letters.set(name.firstLetter, previous && previous > nextDate ? previous : nextDate);
      return letters;
    }, new Map<string, Date>()),
  )
    .sort(([a], [b]) => a.localeCompare(b, "tr-TR"))
    .map(([letter, lastModified]) =>
      entry(`/harf/${encodeURIComponent(letter.toLocaleLowerCase("tr-TR"))}`, lastModified, "weekly", 0.6),
    );

  const nameEntries = Array.from(
    new Map(
      names
        .map((name) => ({ name, slug: normalizeNameSlug(name.slug) }))
        .filter(({ slug }) => Boolean(slug))
        .map(({ name, slug }) => [slug, entry(`/isim/${slug}`, toDate(name.updatedAt ?? name.createdAt), "weekly", 0.7)]),
    ).values(),
  );

  const guideEntries = guides.map((guide) =>
    entry(
      `/isim-rehberi/${guide.slug}`,
      toDate(guide.updatedAt ?? guide.publishedAt ?? guide.createdAt),
      "monthly",
      0.6,
    ),
  );
  const modernGuideEntries = modernGuideIndexCards.map((guide) =>
    entry(guide.href, toDate(guide.cover.createdAt), "monthly", 0.7),
  );

  return [...categories, ...letterEntries, ...nameEntries, ...guideEntries, ...modernGuideEntries];
}
