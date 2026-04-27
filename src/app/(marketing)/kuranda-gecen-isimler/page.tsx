import type { Metadata } from "next";
import {
  CategoryListAside,
  NAME_LIST_CATEGORY_HEADER_CLASS,
} from "@/components/marketing/CategoryListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";
import { cinsiyetPaginationExtra, genderFromCinsiyetParam } from "@/lib/category-cinsiyet";

export const metadata: Metadata = {
  title: "Kur'an'da geçen isimler",
  description: "Kur'an'da geçtiği belirtilen bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const gender = genderFromCinsiyetParam(sp.cinsiyet);
  const list = await loadNameListTemplateData({
    searchParams: sp,
    query: {
      inQuran: true,
      orderBy: "alpha",
      ...(gender ? { gender } : {}),
    },
  });
  const titleTag =
    gender === "GIRL" ? "Kur'an'da geçen isimler (kız)" : gender === "BOY" ? "Kur'an'da geçen isimler (erkek)" : "Kur'an'da geçen isimler";
  return (
    <NameListTemplate
      title={titleTag}
      description="Kur'anî kökeni veya Kur'an'da geçtiği kaynaklarda yer alan isimler; A–Z alfabetik. İsterseniz yalnız kız veya erkek isimlerini seçin."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Kur'an'da geçen isimler" }]}
      path="/kuranda-gecen-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      paginationExtra={cinsiyetPaginationExtra(gender)}
      genderFilter={{
        basePath: "/kuranda-gecen-isimler",
        active: gender === "GIRL" || gender === "BOY" ? gender : null,
      }}
      aside={<CategoryListAside variant="quran" gender={gender} />}
      {...list}
    />
  );
}
