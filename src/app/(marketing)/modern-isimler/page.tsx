import type { Metadata } from "next";
import {
  CategoryListAside,
  NAME_LIST_CATEGORY_HEADER_CLASS,
} from "@/components/marketing/CategoryListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";
import { cinsiyetPaginationExtra, genderFromCinsiyetParam } from "@/lib/category-cinsiyet";

export const metadata: Metadata = {
  title: "Modern isimler",
  description: "Çağdaş ve akıcı bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const gender = genderFromCinsiyetParam(sp.cinsiyet);
  const list = await loadNameListTemplateData({
    searchParams: sp,
    query: {
      style: "MODERN",
      orderBy: "alpha",
      ...(gender ? { gender } : {}),
    },
  });
  const titleTag =
    gender === "GIRL" ? "Modern isimler (kız)" : gender === "BOY" ? "Modern isimler (erkek)" : "Modern isimler";
  return (
    <NameListTemplate
      title={titleTag}
      description="Modern tarz etiketli isimler; A–Z alfabetik. Kız, erkek veya tümü."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Modern isimler" }]}
      path="/modern-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      paginationExtra={cinsiyetPaginationExtra(gender)}
      genderFilter={{
        basePath: "/modern-isimler",
        active: gender === "GIRL" || gender === "BOY" ? gender : null,
      }}
      aside={<CategoryListAside variant="modern" gender={gender} />}
      {...list}
    />
  );
}
