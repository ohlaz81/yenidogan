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
  title: "Nadir isimler",
  description: "Daha az rastlanan özgün bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const gender = genderFromCinsiyetParam(sp.cinsiyet);
  const letter = harfFromSearchParams(sp);
  const list = await loadNameListTemplateData({
    searchParams: sp,
    query: {
      style: "RARE",
      orderBy: "alpha",
      ...(gender ? { gender } : {}),
      ...(letter ? { letter } : {}),
    },
  });
  const letters = getFirstLettersForNameListFilters({
    style: "RARE",
    ...(gender ? { gender } : {}),
  });
  const titleTag =
    gender === "GIRL" ? "Nadir isimler (kız)" : gender === "BOY" ? "Nadir isimler (erkek)" : "Nadir isimler";
  return (
    <NameListTemplate
      title={titleTag}
      description="Nadir tarz etiketli isimler; A–Z alfabetik. Cinsiyet filtresi isteğe bağlı; harf şeridiyle ilk harfe göre daraltın."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Nadir isimler" }]}
      path="/nadir-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      paginationExtra={categoryListPaginationExtra(gender, letter)}
      genderFilter={{
        basePath: "/nadir-isimler",
        active: gender === "GIRL" || gender === "BOY" ? gender : null,
      }}
      alphabetStrip={{
        letters,
        basePath: "/nadir-isimler",
        activeLetter: letter ?? null,
        tone: categoryAlphabetTone(gender),
        preserveQuery: genderPreserveQuery(gender),
      }}
      aside={<CategoryListAside variant="rare" gender={gender} />}
      {...list}
    />
  );
}
