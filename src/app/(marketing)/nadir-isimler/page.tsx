import type { Metadata } from "next";
import {
  CategoryListAside,
  NAME_LIST_CATEGORY_HEADER_CLASS,
} from "@/components/marketing/CategoryListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";
import { cinsiyetPaginationExtra, genderFromCinsiyetParam } from "@/lib/category-cinsiyet";

export const metadata: Metadata = {
  title: "Nadir isimler",
  description: "Daha az rastlanan özgün bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const gender = genderFromCinsiyetParam(sp.cinsiyet);
  const list = await loadNameListTemplateData({
    searchParams: sp,
    query: {
      style: "RARE",
      orderBy: "alpha",
      ...(gender ? { gender } : {}),
    },
  });
  const titleTag =
    gender === "GIRL" ? "Nadir isimler (kız)" : gender === "BOY" ? "Nadir isimler (erkek)" : "Nadir isimler";
  return (
    <NameListTemplate
      title={titleTag}
      description="Nadir tarz etiketli isimler; A–Z alfabetik. Cinsiyet filtresi isteğe bağlı."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Nadir isimler" }]}
      path="/nadir-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      paginationExtra={cinsiyetPaginationExtra(gender)}
      genderFilter={{
        basePath: "/nadir-isimler",
        active: gender === "GIRL" || gender === "BOY" ? gender : null,
      }}
      aside={<CategoryListAside variant="rare" gender={gender} />}
      {...list}
    />
  );
}
