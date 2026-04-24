import type { CategoryShowcase, HeroSlide, HomepageQuickLink, MediaAsset } from "@/types/database";

/** Veritabanı boş/eksik olsa da ana sayfanın “tasarım gibi” dolu görünmesi için. */

export function syntheticMedia(suffix: string, url: string, alt: string): MediaAsset {
  return {
    id: `fallback-${suffix}`,
    url,
    alt,
    createdAt: new Date(0).toISOString(),
  };
}

/** Tekil yerel görsel: `public/media/default-name.jpg` (isteğe göre değiştirilebilir). */
const HERO = "/media/default-name.jpg";

export function defaultHeroIfEmpty(): (HeroSlide & { image: MediaAsset }) {
  return {
    id: "fallback-hero",
    sortOrder: 0,
    headline: "Bebeğiniz için en doğru ismi bulun",
    subline: "Anlamları, kökenleri ve özellikleriyle kız ve erkek isimlerini keşfedin.",
    ctaLabel: "İsim bulucuya git",
    ctaHref: "/isim-bulucu",
    imageId: "fallback-hero-img",
    published: true,
    image: syntheticMedia("hero", HERO, "Ana sayfa görseli — public/media altında değiştirilebilir"),
  };
}

export function defaultShowcasesIfEmpty(): Array<CategoryShowcase & { image: MediaAsset }> {
  return [
    {
      id: "fb-showcase-girl",
      title: "En güzel kız isimleri",
      subtitle: "Yüzlerce anlamlı isim",
      href: "/kiz-isimleri",
      tagLabel: "Kız isimleri",
      tagTone: "pink",
      imageId: "fallback-cat-1",
      sortOrder: 0,
      published: true,
      image: syntheticMedia("cat1", HERO, "Kız isimleri kategorisi"),
    },
    {
      id: "fb-showcase-boy",
      title: "En güzel erkek isimleri",
      subtitle: "Klasikten moderne",
      href: "/erkek-isimleri",
      tagLabel: "Erkek isimleri",
      tagTone: "blue",
      imageId: "fallback-cat-2",
      sortOrder: 1,
      published: true,
      image: syntheticMedia("cat2", HERO, "Erkek isimleri kategorisi"),
    },
    {
      id: "fb-showcase-quran",
      title: "Kur'an'da geçen isimler",
      subtitle: "Anlamlı seçenekler",
      href: "/kuranda-gecen-isimler",
      tagLabel: "Kur'an",
      tagTone: "green",
      imageId: "fallback-cat-3",
      sortOrder: 2,
      published: true,
      image: syntheticMedia("cat3", HERO, "Kur'an isimleri kategorisi"),
    },
    {
      id: "fb-showcase-pop",
      title: "Popüler isimler",
      subtitle: "Trend isim listesi",
      href: "/populer-isimler",
      tagLabel: "Popüler",
      tagTone: "yellow",
      imageId: "fallback-cat-4",
      sortOrder: 3,
      published: true,
      image: syntheticMedia("cat4", HERO, "Popüler isimler"),
    },
  ];
}

export function defaultQuickLinksIfEmpty(): HomepageQuickLink[] {
  return [
    {
      id: "fb-qk-0",
      label: "Kız isimleri",
      href: "/kiz-isimleri",
      iconKey: "girl",
      sortOrder: 0,
      published: true,
    },
    {
      id: "fb-qk-1",
      label: "Erkek isimleri",
      href: "/erkek-isimleri",
      iconKey: "boy",
      sortOrder: 1,
      published: true,
    },
    {
      id: "fb-qk-2",
      label: "Kur'an'da geçen",
      href: "/kuranda-gecen-isimler",
      iconKey: "quran",
      sortOrder: 2,
      published: true,
    },
    {
      id: "fb-qk-3",
      label: "Popüler isimler",
      href: "/populer-isimler",
      iconKey: "star",
      sortOrder: 3,
      published: true,
    },
    {
      id: "fb-qk-4",
      label: "İsim bulucu",
      href: "/isim-bulucu",
      iconKey: "search",
      sortOrder: 4,
      published: true,
    },
    {
      id: "fb-qk-5",
      label: "Favorilerim",
      href: "/favorilerim",
      iconKey: "heart",
      sortOrder: 5,
      published: true,
    },
  ];
}
