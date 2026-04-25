import type { Metadata } from "next";
import {
  CategoryListAside,
  NAME_LIST_CATEGORY_HEADER_CLASS,
} from "@/components/marketing/CategoryListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Nadir isimler",
  description: "Daha az rastlanan özgün bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const list = await loadNameListTemplateData({ searchParams: sp, query: { style: "RARE" } });
  return (
    <NameListTemplate
      title="Nadir isimler"
      description="Özgünleşmek isteyen aileler için daha az duyulan anlamlı isimler."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Nadir isimler" }]}
      path="/nadir-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      aside={<CategoryListAside variant="rare" listTotal={list.total} />}
      {...list}
    />
  );
}
