import { prisma } from "@/lib/db";

export async function getHomePageData() {
  const [
    heroSlides,
    showcases,
    quickLinks,
    featuredGirlSlots,
    featuredBoySlots,
    guideArticles,
    nameCount,
  ] = await Promise.all([
    prisma.heroSlide.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      include: { image: true },
    }),
    prisma.categoryShowcase.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
      include: { image: true },
    }),
    prisma.homepageQuickLink.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.homeFeaturedName.findMany({
      where: { column: "girl" },
      orderBy: { position: "asc" },
      include: { name: { include: { image: true } } },
    }),
    prisma.homeFeaturedName.findMany({
      where: { column: "boy" },
      orderBy: { position: "asc" },
      include: { name: { include: { image: true } } },
    }),
    prisma.guideArticle.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 4,
      include: { cover: true },
    }),
    prisma.name.count({ where: { published: true } }),
  ]);

  let randomName = null as Awaited<ReturnType<typeof prisma.name.findFirst>>;
  if (nameCount > 0) {
    const skip = Math.floor(Math.random() * nameCount);
    randomName = await prisma.name.findFirst({
      where: { published: true },
      skip,
      take: 1,
      include: { image: true },
    });
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
