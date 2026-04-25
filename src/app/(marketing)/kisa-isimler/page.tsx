import type { Metadata } from "next";
import {
  CategoryListAside,
  NAME_LIST_CATEGORY_HEADER_CLASS,
} from "@/components/marketing/CategoryListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Kısa isimler",
  description: "Kısa ve akılda kalıcı bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const list = await loadNameListTemplateData({ searchParams: sp, query: { isShort: true } });
  return (
    <NameListTemplate
      title="Kısa isimler"
      description="Kısa telaffuzuyla pratik ve sevimli isimler."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Kısa isimler" }]}
      path="/kisa-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      aside={<CategoryListAside variant="short" listTotal={list.total} />}
      {...list}
    />
  );
}
