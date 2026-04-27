import type { Metadata } from "next";
import {
  CategoryListAside,
  NAME_LIST_CATEGORY_HEADER_CLASS,
} from "@/components/marketing/CategoryListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";
import { cinsiyetPaginationExtra, genderFromCinsiyetParam } from "@/lib/category-cinsiyet";

export const metadata: Metadata = {
  title: "Tüm isimler (A–Z)",
  description: "Alfabetik sırayla tüm yayınlanmış isimler; isteğe kız veya erkek.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const gender = genderFromCinsiyetParam(sp.cinsiyet);
  const list = await loadNameListTemplateData({
    searchParams: sp,
    query: {
      orderBy: "alpha",
      ...(gender ? { gender } : {}),
    },
  });
  const titleTag =
    gender === "GIRL" ? "Tüm isimler (kız, A–Z)" : gender === "BOY" ? "Tüm isimler (erkek, A–Z)" : "Tüm isimler (A–Z)";
  return (
    <NameListTemplate
      title={titleTag}
      description="Tam liste A–Z. Yalnız kız veya yalnız erkek isimlerini görmek için cinsiyet sekmesini kullanın."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Tüm isimler" }]}
      path="/tum-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      paginationExtra={cinsiyetPaginationExtra(gender)}
      genderFilter={{
        basePath: "/tum-isimler",
        active: gender === "GIRL" || gender === "BOY" ? gender : null,
      }}
      aside={<CategoryListAside variant="all" gender={gender} />}
      {...list}
    />
  );
}
