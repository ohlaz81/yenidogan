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
  title: "Anlamı güzel isimler",
  description: "Anlamı güçlü ve pozitif bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const gender = genderFromCinsiyetParam(sp.cinsiyet);
  const letter = harfFromSearchParams(sp);
  const list = await loadNameListTemplateData({
    searchParams: sp,
    query: {
      beautifulMeaning: true,
      orderBy: "alpha",
      ...(gender ? { gender } : {}),
      ...(letter ? { letter } : {}),
    },
  });
  const letters = getFirstLettersForNameListFilters({
    beautifulMeaning: true,
    ...(gender ? { gender } : {}),
  });
  const titleTag =
    gender === "GIRL"
      ? "Anlamı güzel isimler (kız)"
      : gender === "BOY"
        ? "Anlamı güzel isimler (erkek)"
        : "Anlamı güzel isimler";
  return (
    <NameListTemplate
      title={titleTag}
      description="“Anlamı güzel” olarak işaretlenen isimler; A–Z. Cinsiyet ve harf ile daraltın."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Anlamı güzel isimler" }]}
      path="/anlami-guzel-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      paginationExtra={categoryListPaginationExtra(gender, letter)}
      genderFilter={{
        basePath: "/anlami-guzel-isimler",
        active: gender === "GIRL" || gender === "BOY" ? gender : null,
      }}
      alphabetStrip={{
        letters,
        basePath: "/anlami-guzel-isimler",
        activeLetter: letter ?? null,
        tone: categoryAlphabetTone(gender),
        preserveQuery: genderPreserveQuery(gender),
      }}
      aside={<CategoryListAside variant="beautiful" gender={gender} />}
      {...list}
    />
  );
}
