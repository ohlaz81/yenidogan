import {
  defaultHeroIfEmpty,
  defaultQuickLinksIfEmpty,
  defaultShowcasesIfEmpty,
} from "@/lib/queries/home-fallbacks";
import { getStaticGuides, type GuideWithCover } from "@/data/static-guide";
import { getFeaturedByGenderFromStore, pickRandomNameFromStore } from "@/lib/static/names-store";
import type {
  HomeFeaturedName,
  Name,
  MediaAsset,
  CategoryShowcase,
  HeroSlide,
} from "@/types/database";
import type { NameWithImage } from "@/components/marketing/NameCard";

type NWithImg = Name & { image: MediaAsset | null };
type Hfn = HomeFeaturedName & { name: NWithImg | null };
type Hero = HeroSlide & { image: MediaAsset | null };
type Showcase = CategoryShowcase & { image: MediaAsset | null };

function toFeaturedSlots(names: NameWithImage[], col: "girl" | "boy"): Hfn[] {
  return names.map((name, i) => ({
    id: `static-${col}-${name.id}`,
    column: col,
    position: i,
    nameId: name.id,
    name: name as NWithImg,
  }));
}

/**
 * Ana sayfa tamamen koddan: hero, kategoriler, hızlı linkler, öne çıkan isimler, rehber, rastgele isim.
 * Supabase bu sayfa için kullanılmaz.
 */
export function getHomePageData() {
  const heroSlides: Hero[] = [defaultHeroIfEmpty() as Hero];
  const showcases: Showcase[] = defaultShowcasesIfEmpty() as Showcase[];
  const quickLinks = defaultQuickLinksIfEmpty();
  const guideArticles: GuideWithCover[] = getStaticGuides();
  const randomName = pickRandomNameFromStore() as NWithImg | null;

  return {
    heroSlides,
    showcases,
    quickLinks,
    featuredGirlSlots: toFeaturedSlots(getFeaturedByGenderFromStore("GIRL", 5), "girl"),
    featuredBoySlots: toFeaturedSlots(getFeaturedByGenderFromStore("BOY", 5), "boy"),
    guideArticles,
    randomName,
  };
}

export type HomePageData = ReturnType<typeof getHomePageData>;
