import type { Metadata } from "next";
import {
  CategoryListAside,
  NAME_LIST_CATEGORY_HEADER_CLASS,
} from "@/components/marketing/CategoryListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";
import {
  categoryAlphabetTone,
  categoryListPaginationExtra,
  genderFromCinsiyetParam,
  genderPreserveQuery,
  harfFromSearchParams,
} from "@/lib/category-cinsiyet";
import { getFirstLettersForNameListFilters } from "@/lib/static/names-store";

export const metadata: Metadata = {
  title: "Kur'an'da geçen isimler",
  description: "Kur'an'da geçtiği belirtilen bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const gender = genderFromCinsiyetParam(sp.cinsiyet);
  const letter = harfFromSearchParams(sp);
  const list = await loadNameListTemplateData({
    searchParams: sp,
    query: {
      inQuran: true,
      orderBy: "alpha",
      ...(gender ? { gender } : {}),
      ...(letter ? { letter } : {}),
    },
  });
  const letters = getFirstLettersForNameListFilters({
    inQuran: true,
    ...(gender ? { gender } : {}),
  });
  const titleTag =
    gender === "GIRL" ? "Kur'an'da geçen isimler (kız)" : gender === "BOY" ? "Kur'an'da geçen isimler (erkek)" : "Kur'an'da geçen isimler";
  return (
    <NameListTemplate
      title={titleTag}
      description="Kur'anî kökeni veya Kur'an'da geçtiği kaynaklarda yer alan isimler; A–Z alfabetik. Cinsiyet ve harf ile daraltın."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Kur'an'da geçen isimler" }]}
      path="/kuranda-gecen-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      paginationExtra={categoryListPaginationExtra(gender, letter)}
      genderFilter={{
        basePath: "/kuranda-gecen-isimler",
        active: gender === "GIRL" || gender === "BOY" ? gender : null,
      }}
      alphabetStrip={{
        letters,
        basePath: "/kuranda-gecen-isimler",
        activeLetter: letter ?? null,
        tone: categoryAlphabetTone(gender),
        preserveQuery: genderPreserveQuery(gender),
      }}
      aside={<CategoryListAside variant="quran" gender={gender} />}
      {...list}
    />
  );
}
