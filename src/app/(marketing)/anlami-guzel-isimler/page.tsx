import type { Metadata } from "next";
import {
  CategoryListAside,
  NAME_LIST_CATEGORY_HEADER_CLASS,
} from "@/components/marketing/CategoryListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Anlamı güzel isimler",
  description: "Anlamı güçlü ve pozitif bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const list = await loadNameListTemplateData({ searchParams: sp, query: { beautifulMeaning: true } });
  return (
    <NameListTemplate
      title="Anlamı güzel isimler"
      description="Editoryal olarak “anlamı güzel” olarak işaretlenen isimler."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Anlamı güzel isimler" }]}
      path="/anlami-guzel-isimler"
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      aside={<CategoryListAside variant="beautiful" />}
      {...list}
    />
  );
}
