import type { Metadata } from "next";
import {
  CategoryListAside,
  NAME_LIST_CATEGORY_HEADER_CLASS,
} from "@/components/marketing/CategoryListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Tüm isimler (A–Z)",
  description: "Alfabetik sırayla tüm yayınlanmış isimler.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const list = await loadNameListTemplateData({ searchParams: sp, query: { orderBy: "alpha" } });
  return (
    <NameListTemplate
      title="Tüm isimler"
      description="A–Z alfabetik sıralı tam liste."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Tüm isimler" }]}
      path="/tum-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      aside={<CategoryListAside variant="all" />}
      {...list}
    />
  );
}
