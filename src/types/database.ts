/** Supabase/Postgres tabloları — Prisma şemasıyla aynı alan adları (camelCase). */

export type Gender = "GIRL" | "BOY" | "UNISEX";
export type NameStyle = "MODERN" | "CLASSIC" | "RARE" | "POPULAR";
export type UserRole = "ADMIN";

export type MediaAsset = {
  id: string;
  url: string;
  alt: string | null;
  createdAt: string;
};

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  name: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

/** `public."UserPermission"` — admin paneli ince yetkileri. */
export type UserPermission = {
  userId: string;
  permission: string;
  createdAt: string;
};

export type Name = {
  id: string;
  slug: string;
  displayName: string;
  gender: Gender;
  meaning: string;
  origin: string;
  pronunciation: string;
  popularity: number;
  popularScore: number;
  inQuran: boolean;
  style: NameStyle;
  isShort: boolean;
  beautifulMeaning: boolean;
  firstLetter: string;
  intro: string | null;
  traits: unknown;
  published: boolean;
  imageId: string | null;
  createdAt: string;
  updatedAt: string;
  image?: MediaAsset | null;
};

export type SimilarName = {
  id: string;
  sourceId: string;
  targetId: string;
};

export type NameWithDetail = Name & {
  image: MediaAsset | null;
  similarFrom: Array<{ target: Name & { image: MediaAsset | null } }>;
};

export type GuideArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  coverId: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  cover?: MediaAsset | null;
};

export type FAQ = { id: string; sortOrder: number; question: string; answer: string };

export type HeroSlide = {
  id: string;
  sortOrder: number;
  headline: string;
  subline: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  imageId: string;
  published: boolean;
  image?: MediaAsset | null;
};

export type HomepageQuickLink = {
  id: string;
  label: string;
  href: string;
  iconKey: string;
  sortOrder: number;
  published: boolean;
};

export type CategoryShowcase = {
  id: string;
  title: string;
  subtitle: string | null;
  href: string;
  tagLabel: string;
  tagTone: string;
  imageId: string | null;
  sortOrder: number;
  published: boolean;
  image?: MediaAsset | null;
};

export type HomeFeaturedName = {
  id: string;
  column: string;
  position: number;
  nameId: string | null;
  name?: (Name & { image: MediaAsset | null }) | null;
};

export type SiteSetting = { key: string; value: string };
export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
};
