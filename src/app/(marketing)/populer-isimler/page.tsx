import type { Metadata } from "next";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Popüler isimler",
  description: "Öne çıkan ve sık tercih edilen bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const list = await loadNameListTemplateData({ searchParams: sp, query: { style: "POPULAR" } });
  return (
    <NameListTemplate
      title="Popüler isimler"
      description="Popülerlik skoruna göre sıralanan güncel isim listesi."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Popüler isimler" }]}
      path="/populer-isimler"
      {...list}
    />
  );
}
