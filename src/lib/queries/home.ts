import {
  defaultHeroIfEmpty,
  defaultQuickLinksIfEmpty,
  defaultShowcasesIfEmpty,
} from "@/lib/queries/home-fallbacks";
import { getStaticGuides, type GuideWithCover } from "@/data/static-guide";
import {
  getFeaturedByGenderFromStore,
  pickDailyNameFromStore,
  pickRandomNameFromStore,
} from "@/lib/static/names-store";
import { pickDailyNameFromPublishedDb, pickRandomPublishedFromDb } from "@/lib/queries/names-from-db";
import { getSupabase } from "@/lib/supabase/admin";
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

const IST = "Europe/Istanbul";

async function resolveDailyName(): Promise<NWithImg | null> {
  const db = await pickDailyNameFromPublishedDb({ timeZone: IST });
  if (db) return db as NWithImg;
  return pickDailyNameFromStore({ timeZone: IST }) as NWithImg | null;
}

/** Üst kart: ilk yüklemede rastgele (buton ile yenilenecek). */
async function resolveDiscoverSeed(): Promise<NWithImg | null> {
  const db = await pickRandomPublishedFromDb([]);
  if (db) return db as NWithImg;
  return pickRandomNameFromStore() as NWithImg | null;
}

/**
 * Ana sayfa tamamen koddan: hero, kategoriler, hızlı linkler, öne çıkan isimler, rehber.
 * Günlük isim İstanbul’a göre tarih kullanır (gece 00:00’da başka “gün” sayılır).
 * Öne çıkan slotlar için Supabase; hata olursa statik fallback kullanılır.
 */
export async function getHomePageData() {
  const heroSlides: Hero[] = [defaultHeroIfEmpty() as Hero];
  const showcases: Showcase[] = defaultShowcasesIfEmpty() as Showcase[];
  const quickLinks = defaultQuickLinksIfEmpty();
  const guideArticles: GuideWithCover[] = getStaticGuides();
  const [dailyName, discoverName] = await Promise.all([resolveDailyName(), resolveDiscoverSeed()]);
  let featuredGirlSlots = toFeaturedSlots(getFeaturedByGenderFromStore("GIRL", 5), "girl");
  let featuredBoySlots = toFeaturedSlots(getFeaturedByGenderFromStore("BOY", 5), "boy");

  try {
    const s = getSupabase();
    const { data, error } = await s
      .from("HomeFeaturedName")
      .select(
        `id,column,position,nameId,name:Name!HomeFeaturedName_nameId_fkey(id,slug,displayName,meaning,gender,image:imageId(id,url,alt,createdAt))`,
      )
      .order("column", { ascending: true })
      .order("position", { ascending: true });

    if (!error && data) {
      const rows = data as unknown as Hfn[];
      const girls = rows.filter((r) => r.column === "girl");
      const boys = rows.filter((r) => r.column === "boy");
      if (girls.length > 0) featuredGirlSlots = girls;
      if (boys.length > 0) featuredBoySlots = boys;
    }
  } catch {
    // Supabase erişimi yoksa veya ilişki şeması farklıysa statik veriyle devam eder.
  }

  return {
    heroSlides,
    showcases,
    quickLinks,
    featuredGirlSlots,
    featuredBoySlots,
    guideArticles,
    dailyName,
    discoverName,
  };
}

export type HomePageData = Awaited<ReturnType<typeof getHomePageData>>;
