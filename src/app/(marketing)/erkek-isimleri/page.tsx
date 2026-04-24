import type { Metadata } from "next";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Erkek isimleri",
  description: "Anlamları ve kökenleriyle erkek bebek isimleri listesi.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const list = await loadNameListTemplateData({ searchParams: sp, query: { gender: "BOY" } });
  return (
    <NameListTemplate
      title="Erkek isimleri"
      description="Güçlü, modern ve klasik erkek isimlerini detaylı bilgilerle keşfedin."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Erkek isimleri" }]}
      path="/erkek-isimleri"
      {...list}
    />
  );
}
