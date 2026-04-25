import type { Metadata } from "next";
import {
  CategoryListAside,
  NAME_LIST_CATEGORY_HEADER_CLASS,
} from "@/components/marketing/CategoryListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Modern isimler",
  description: "Çağdaş ve akıcı bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const list = await loadNameListTemplateData({ searchParams: sp, query: { style: "MODERN" } });
  return (
    <NameListTemplate
      title="Modern isimler"
      description="Kısa, akıcı ve günümüzde sık duyulan modern isim seçkisi."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Modern isimler" }]}
      path="/modern-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      aside={<CategoryListAside variant="modern" listTotal={list.total} />}
      {...list}
    />
  );
}
