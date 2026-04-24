import { getSupabase } from "@/lib/supabase/admin";
import { isMissingTableError } from "@/lib/supabase/errors";
import { mapByIds } from "@/lib/supabase/media-helpers";
import type { PostgrestError } from "@supabase/supabase-js";
import type {
  CategoryShowcase,
  GuideArticle,
  HeroSlide,
  HomeFeaturedName,
  HomepageQuickLink,
  Name,
  MediaAsset,
} from "@/types/database";

type Hero = HeroSlide & { image: MediaAsset | null };
type Showcase = CategoryShowcase & { image: MediaAsset | null };
type GArticle = GuideArticle & { cover: MediaAsset | null };
type NWithImg = Name & { image: MediaAsset | null };
type Hfn = HomeFeaturedName & { name: NWithImg | null };

function withImages<T extends { imageId: string }>(
  rows: T[] | null,
  m: Map<string, MediaAsset>,
): (T & { image: MediaAsset | null })[] {
  return (rows ?? []).map((r) => ({ ...r, image: m.get(r.imageId) ?? null }));
}

function withOptionalImage<T extends { imageId: string | null }>(
  rows: T[] | null,
  m: Map<string, MediaAsset>,
): (T & { image: MediaAsset | null })[] {
  return (rows ?? []).map((r) => ({ ...r, image: r.imageId ? m.get(r.imageId) ?? null : null }));
}

function withCovers(
  rows: GuideArticle[] | null,
  m: Map<string, MediaAsset>,
): (GuideArticle & { cover: MediaAsset | null })[] {
  return (rows ?? []).map((a) => ({ ...a, cover: a.coverId ? m.get(a.coverId) ?? null : null }));
}

function takeRows<T>(
  res: { data: T[] | null; error: PostgrestError | null },
  tableName: string,
): T[] {
  if (res.error) {
    if (isMissingTableError(res.error)) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[getHomePageData] ${tableName}:`, res.error.message);
      }
      return [];
    }
    throw res.error;
  }
  return (res.data ?? []) as T[];
}

function takeCount(res: { count: number | null; error: PostgrestError | null }): number {
  if (res.error) {
    if (isMissingTableError(res.error)) return 0;
    throw res.error;
  }
  return res.count ?? 0;
}

async function fetchFeatured(
  s: ReturnType<typeof getSupabase>,
  rows: HomeFeaturedName[] | null,
): Promise<Hfn[]> {
  const list = rows ?? [];
  const nameIds = [...new Set(list.map((r) => r.nameId).filter(Boolean))] as string[];
  if (!nameIds.length) return list.map((r) => ({ ...r, name: null }));
  const n = await s.from("Name").select("*").in("id", nameIds);
  if (n.error) {
    if (isMissingTableError(n.error)) return list.map((r) => ({ ...r, name: null }));
    throw n.error;
  }
  const nameRows = (n.data ?? []) as Name[];
  const media = await mapByIds(
    s,
    nameRows.map((x) => x.imageId).filter(Boolean) as string[],
  );
  const nMap = new Map(
    nameRows.map((r) => [
      r.id,
      { ...r, image: r.imageId ? media.get(r.imageId) ?? null : null } as NWithImg,
    ]),
  );
  return list.map((r) => ({
    ...r,
    name: r.nameId ? nMap.get(r.nameId) ?? null : null,
  }));
}

export async function getHomePageData() {
  const s = getSupabase();
  const [hs, sh, qk, fg, fb, ga, countRes] = await Promise.all([
    s.from("HeroSlide").select("*").eq("published", true).order("sortOrder", { ascending: true }),
    s.from("CategoryShowcase").select("*").eq("published", true).order("sortOrder", { ascending: true }),
    s.from("HomepageQuickLink").select("*").eq("published", true).order("sortOrder", { ascending: true }),
    s.from("HomeFeaturedName").select("*").eq("column", "girl").order("position", { ascending: true }),
    s.from("HomeFeaturedName").select("*").eq("column", "boy").order("position", { ascending: true }),
    s
      .from("GuideArticle")
      .select("*")
      .eq("published", true)
      .order("publishedAt", { ascending: false, nullsFirst: false })
      .limit(4),
    s.from("Name").select("id", { count: "exact", head: true }).eq("published", true),
  ]);
  const heroList = takeRows(hs, "HeroSlide") as HeroSlide[];
  const mHero = await mapByIds(
    s,
    heroList.map((h) => h.imageId),
  );
  const heroSlides: Hero[] = withImages(heroList, mHero) as Hero[];

  const shList = takeRows(sh, "CategoryShowcase") as CategoryShowcase[];
  const mSh = await mapByIds(
    s,
    shList.map((x) => x.imageId).filter(Boolean) as string[],
  );
  const showcases: Showcase[] = withOptionalImage(shList, mSh) as Showcase[];

  const quickLinks = takeRows(qk, "HomepageQuickLink") as HomepageQuickLink[];
  const featuredGirlSlots = await fetchFeatured(s, takeRows(fg, "HomeFeaturedName") as HomeFeaturedName[] | null);
  const featuredBoySlots = await fetchFeatured(s, takeRows(fb, "HomeFeaturedName") as HomeFeaturedName[] | null);

  const gList = takeRows(ga, "GuideArticle") as GuideArticle[];
  const mGa = await mapByIds(
    s,
    gList.map((a) => a.coverId).filter(Boolean) as string[],
  );
  const guideArticles: GArticle[] = withCovers(gList, mGa);

  const nameCount = takeCount(countRes);
  let randomName: NWithImg | null = null;
  if (nameCount > 0) {
    const offset = Math.floor(Math.random() * nameCount);
    const one = await s
      .from("Name")
      .select("*")
      .eq("published", true)
      .order("id", { ascending: true })
      .range(offset, offset);
    if (one.error) {
      if (isMissingTableError(one.error)) {
        /* random isim atlanır */
      } else {
        throw one.error;
      }
    } else {
      const row = (one.data ?? [])[0] as Name | undefined;
      if (row) {
        const mi = await mapByIds(s, row.imageId ? [row.imageId] : []);
        randomName = { ...row, image: row.imageId ? mi.get(row.imageId) ?? null : null };
      }
    }
  }

  return {
    heroSlides,
    showcases,
    quickLinks,
    featuredGirlSlots,
    featuredBoySlots,
    guideArticles,
    randomName,
  };
}

export type HomePageData = Awaited<ReturnType<typeof getHomePageData>>;
