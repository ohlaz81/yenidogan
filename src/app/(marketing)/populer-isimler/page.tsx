import type { Metadata } from "next";
import {
  CategoryListAside,
  NAME_LIST_CATEGORY_HEADER_CLASS,
} from "@/components/marketing/CategoryListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";
import { cinsiyetPaginationExtra, genderFromCinsiyetParam } from "@/lib/category-cinsiyet";

export const metadata: Metadata = {
  title: "Popüler isimler",
  description:
    "Listede popüler havuz; sıra A–Z. Anasayfadaki kayan şerit aynı isim havuzundan örnekler gösterir.",
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
    gender === "GIRL" ? "Popüler isimler (kız)" : gender === "BOY" ? "Popüler isimler (erkek)" : "Popüler isimler";
  return (
    <NameListTemplate
      title={titleTag}
      description="Popülerlik skoruna göre belirlenen isim havuzu; bu sayfada liste A–Z alfabetik. Cinsiyetle daraltabilirsiniz. (Ana sayfa şeridi aynı havuzdan örnek isimler gösterir.)"
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Popüler isimler" }]}
      path="/populer-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      paginationExtra={cinsiyetPaginationExtra(gender)}
      genderFilter={{
        basePath: "/populer-isimler",
        active: gender === "GIRL" || gender === "BOY" ? gender : null,
      }}
      aside={<CategoryListAside variant="popular" gender={gender} />}
      {...list}
    />
  );
}
