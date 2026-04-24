import { getSupabase } from "@/lib/supabase/admin";
import { mapByIds } from "@/lib/supabase/media-helpers";
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

async function fetchFeatured(
  s: ReturnType<typeof getSupabase>,
  rows: HomeFeaturedName[] | null,
): Promise<Hfn[]> {
  const list = rows ?? [];
  const nameIds = [...new Set(list.map((r) => r.nameId).filter(Boolean))] as string[];
  if (!nameIds.length) return list.map((r) => ({ ...r, name: null }));
  const n = await s.from("Name").select("*").in("id", nameIds);
  if (n.error) throw n.error;
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
  for (const r of [hs, sh, qk, fg, fb, ga, countRes]) {
    if (r.error) throw r.error;
  }
  const heroList = (hs.data ?? []) as HeroSlide[];
  const mHero = await mapByIds(
    s,
    heroList.map((h) => h.imageId),
  );
  const heroSlides: Hero[] = withImages(heroList, mHero) as Hero[];

  const shList = (sh.data ?? []) as CategoryShowcase[];
  const mSh = await mapByIds(
    s,
    shList.map((x) => x.imageId).filter(Boolean) as string[],
  );
  const showcases: Showcase[] = withOptionalImage(shList, mSh) as Showcase[];

  const quickLinks = (qk.data ?? []) as HomepageQuickLink[];
  const featuredGirlSlots = await fetchFeatured(s, fg.data as HomeFeaturedName[] | null);
  const featuredBoySlots = await fetchFeatured(s, fb.data as HomeFeaturedName[] | null);

  const gList = (ga.data ?? []) as GuideArticle[];
  const mGa = await mapByIds(
    s,
    gList.map((a) => a.coverId).filter(Boolean) as string[],
  );
  const guideArticles: GArticle[] = withCovers(gList, mGa);

  const nameCount = countRes.count ?? 0;
  let randomName: NWithImg | null = null;
  if (nameCount > 0) {
    const offset = Math.floor(Math.random() * nameCount);
    const one = await s
      .from("Name")
      .select("*")
      .eq("published", true)
      .order("id", { ascending: true })
      .range(offset, offset);
    if (one.error) throw one.error;
    const row = (one.data ?? [])[0] as Name | undefined;
    if (row) {
      const mi = await mapByIds(s, row.imageId ? [row.imageId] : []);
      randomName = { ...row, image: row.imageId ? mi.get(row.imageId) ?? null : null };
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
