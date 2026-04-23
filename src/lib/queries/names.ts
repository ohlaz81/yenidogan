import { prisma } from "@/lib/db";
import type { Prisma } from "@/generated/prisma/client";
import type { Gender, NameStyle } from "@/generated/prisma/enums";

const nameInclude = { image: true } as const;

export type NameListParams = {
  gender?: Gender;
  inQuran?: boolean;
  inQuranFalse?: boolean;
  style?: NameStyle;
  letter?: string;
  origin?: string;
  isShort?: boolean;
  beautifulMeaning?: boolean;
  search?: string;
  orderBy?: "popular" | "alpha";
  skip?: number;
  take?: number;
};

export function buildNameWhere(p: NameListParams): Prisma.NameWhereInput {
  const where: Prisma.NameWhereInput = { published: true };
  if (p.gender) where.gender = p.gender;
  if (p.inQuran === true) where.inQuran = true;
  if (p.inQuranFalse === true) where.inQuran = false;
  if (p.origin?.trim()) {
    where.origin = { contains: p.origin.trim() };
  }
  if (p.style) where.style = p.style;
  if (p.letter) {
    where.firstLetter = p.letter.toLocaleUpperCase("tr-TR");
  }
  if (p.isShort === true) where.isShort = true;
  if (p.beautifulMeaning === true) where.beautifulMeaning = true;
  if (p.search?.trim()) {
    const q = p.search.trim();
    where.OR = [
      { displayName: { contains: q } },
      { meaning: { contains: q } },
      { slug: { contains: q.toLowerCase() } },
    ];
  }
  return where;
}

export async function listNames(p: NameListParams) {
  const skip = p.skip ?? 0;
  const take = p.take ?? 24;
  const where = buildNameWhere(p);
  const orderBy: Prisma.NameOrderByWithRelationInput[] =
    p.orderBy === "alpha"
      ? [{ displayName: "asc" }]
      : [{ popularScore: "desc" }, { displayName: "asc" }];

  const [items, total] = await Promise.all([
    prisma.name.findMany({
      where,
      orderBy,
      skip,
      take,
      include: nameInclude,
    }),
    prisma.name.count({ where }),
  ]);
  return { items, total };
}

export async function getNameBySlug(slug: string) {
  return prisma.name.findFirst({
    where: { slug, published: true },
    include: {
      image: true,
      similarFrom: {
        include: { target: { include: nameInclude } },
      },
    },
  });
}

export async function getNamesByLetter(letter: string, gender?: Gender, take = 12) {
  const where = buildNameWhere({
    letter,
    gender,
  });
  return prisma.name.findMany({
    where,
    orderBy: [{ popularScore: "desc" }],
    take,
    include: nameInclude,
  });
}
