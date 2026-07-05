import type { Metadata } from "next";
import { GenderListAside } from "@/components/marketing/GenderListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";
import { categoryListPaginationExtra, harfFromSearchParams } from "@/lib/category-cinsiyet";
import { canonicalUrl } from "@/lib/site";
import { getFirstLettersForGender } from "@/lib/static/names-store";
import { CATEGORY_SEO_CONTENT } from "@/data/category-seo-content";

export const metadata: Metadata = {
  title: "Kız isimleri",
  description: "Anlamları ve kökenleriyle kız bebek isimleri listesi.",
  alternates: { canonical: canonicalUrl("/kiz-isimleri") },
};

export const revalidate = 86400;

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const letter = harfFromSearchParams(sp);
  const list = await loadNameListTemplateData({
    searchParams: sp,
    query: {
      gender: "GIRL",
      orderBy: "alpha",
      ...(letter ? { letter } : {}),
    },
  });
  const letters = getFirstLettersForGender("GIRL");
  const paginationExtra = categoryListPaginationExtra(undefined, letter);

  return (
    <NameListTemplate
      title="Kız isimleri"
      description="Zarif, modern ve klasik kız isimlerini A–Z sırasıyla inceleyin; üstteki harflerle ilk harfe göre süzebilirsiniz. Sağ sütunda en popüler ve öne çıkan tınılara hızlı erişin."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Kız isimleri" }]}
      path="/kiz-isimleri"
      headerClassName="rounded-2xl border border-pink-200/60 bg-gradient-to-br from-pink-50 via-white to-violet-50/50 p-5 shadow-sm sm:p-7"
      aside={<GenderListAside gender="GIRL" />}
      categorySeo={CATEGORY_SEO_CONTENT.girls}
      paginationExtra={paginationExtra}
      alphabetStrip={{
        letters,
        basePath: "/kiz-isimleri",
        activeLetter: letter ?? null,
        tone: "girl",
      }}
      {...list}
    />
  );
}
