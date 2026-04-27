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
  title: "Kısa isimler",
  description: "Kısa ve akılda kalıcı bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const gender = genderFromCinsiyetParam(sp.cinsiyet);
  const letter = harfFromSearchParams(sp);
  const list = await loadNameListTemplateData({
    searchParams: sp,
    query: {
      isShort: true,
      orderBy: "alpha",
      ...(gender ? { gender } : {}),
      ...(letter ? { letter } : {}),
    },
  });
  const letters = getFirstLettersForNameListFilters({
    isShort: true,
    ...(gender ? { gender } : {}),
  });
  const titleTag =
    gender === "GIRL" ? "Kısa isimler (kız)" : gender === "BOY" ? "Kısa isimler (erkek)" : "Kısa isimler";
  return (
    <NameListTemplate
      title={titleTag}
      description="Kısa telaffuzuyla pratik isimler; A–Z. Cinsiyet ve harf ile daraltın."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Kısa isimler" }]}
      path="/kisa-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      paginationExtra={categoryListPaginationExtra(gender, letter)}
      genderFilter={{
        basePath: "/kisa-isimler",
        active: gender === "GIRL" || gender === "BOY" ? gender : null,
      }}
      alphabetStrip={{
        letters,
        basePath: "/kisa-isimler",
        activeLetter: letter ?? null,
        tone: categoryAlphabetTone(gender),
        preserveQuery: genderPreserveQuery(gender),
      }}
      aside={<CategoryListAside variant="short" gender={gender} />}
      {...list}
    />
  );
}
