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
  title: "Modern isimler",
  description: "Çağdaş ve akıcı bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const gender = genderFromCinsiyetParam(sp.cinsiyet);
  const letter = harfFromSearchParams(sp);
  const list = await loadNameListTemplateData({
    searchParams: sp,
    query: {
      style: "MODERN",
      orderBy: "alpha",
      ...(gender ? { gender } : {}),
      ...(letter ? { letter } : {}),
    },
  });
  const letters = getFirstLettersForNameListFilters({
    style: "MODERN",
    ...(gender ? { gender } : {}),
  });
  const titleTag =
    gender === "GIRL" ? "Modern isimler (kız)" : gender === "BOY" ? "Modern isimler (erkek)" : "Modern isimler";
  return (
    <NameListTemplate
      title={titleTag}
      description="Modern tarz etiketli isimler; A–Z alfabetik. Cinsiyetle daraltın; üstteki harflerle ilk harfe göre süzebilirsiniz."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Modern isimler" }]}
      path="/modern-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      paginationExtra={categoryListPaginationExtra(gender, letter)}
      genderFilter={{
        basePath: "/modern-isimler",
        active: gender === "GIRL" || gender === "BOY" ? gender : null,
      }}
      alphabetStrip={{
        letters,
        basePath: "/modern-isimler",
        activeLetter: letter ?? null,
        tone: categoryAlphabetTone(gender),
        preserveQuery: genderPreserveQuery(gender),
      }}
      aside={<CategoryListAside variant="modern" gender={gender} />}
      {...list}
    />
  );
}
