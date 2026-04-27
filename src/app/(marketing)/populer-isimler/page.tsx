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
  title: "Popüler isimler",
  description:
    "Listede popüler havuz; sıra A–Z. Anasayfadaki kayan şerit aynı isim havuzundan örnekler gösterir.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const gender = genderFromCinsiyetParam(sp.cinsiyet);
  const letter = harfFromSearchParams(sp);
  const list = await loadNameListTemplateData({
    searchParams: sp,
    query: {
      orderBy: "alpha",
      ...(gender ? { gender } : {}),
      ...(letter ? { letter } : {}),
    },
  });
  const letters = getFirstLettersForNameListFilters({
    ...(gender ? { gender } : {}),
  });
  const titleTag =
    gender === "GIRL" ? "Popüler isimler (kız)" : gender === "BOY" ? "Popüler isimler (erkek)" : "Popüler isimler";
  return (
    <NameListTemplate
      title={titleTag}
      description="Popülerlik skoruna göre belirlenen isim havuzu; bu sayfada liste A–Z alfabetik. Cinsiyet ve harf ile daraltabilirsiniz. (Ana sayfa şeridi aynı havuzdan örnek isimler gösterir.)"
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Popüler isimler" }]}
      path="/populer-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      paginationExtra={categoryListPaginationExtra(gender, letter)}
      genderFilter={{
        basePath: "/populer-isimler",
        active: gender === "GIRL" || gender === "BOY" ? gender : null,
      }}
      alphabetStrip={{
        letters,
        basePath: "/populer-isimler",
        activeLetter: letter ?? null,
        tone: categoryAlphabetTone(gender),
        preserveQuery: genderPreserveQuery(gender),
      }}
      aside={<CategoryListAside variant="popular" gender={gender} />}
      {...list}
    />
  );
}
