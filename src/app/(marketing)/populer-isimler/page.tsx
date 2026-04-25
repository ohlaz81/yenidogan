import type { Metadata } from "next";
import {
  CategoryListAside,
  NAME_LIST_CATEGORY_HEADER_CLASS,
} from "@/components/marketing/CategoryListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Popüler isimler",
  description:
    "Türkiye’de popülerlik skoruna göre sıralanan tüm bebek isimleri; anasayfadaki kayan listedeki isimler de bu sıralamayla aynı havuzdan gelir.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  // style: "POPULAR" sadece birkaç kayıtta; ana sayfa şeridi ise popularScore + kız/erkek
  // öne çıkarma ile çalışır. Tüm isimleri popülerlik sırasıyla listele.
  const list = await loadNameListTemplateData({ searchParams: sp, query: { orderBy: "popular" } });
  return (
    <NameListTemplate
      title="Popüler isimler"
      description="Popülerlik skoruna göre sıralanan tüm isimler. Anasayfadaki “Türkiye’de popüler isimler” bandındaki kartlar da aynı skor mantığıyla seçilir; burada tam listeyi ve sayfalamayı görebilirsiniz."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Popüler isimler" }]}
      path="/populer-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      aside={<CategoryListAside variant="popular" listTotal={list.total} />}
      {...list}
    />
  );
}
