import type { Metadata } from "next";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Kız isimleri",
  description: "Anlamları ve kökenleriyle kız bebek isimleri listesi.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const list = await loadNameListTemplateData({ searchParams: sp, query: { gender: "GIRL" } });
  return (
    <NameListTemplate
      title="Kız isimleri"
      description="Zarif, modern ve klasik kız isimlerini anlam, köken ve popülerlik bilgileriyle inceleyin."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Kız isimleri" }]}
      path="/kiz-isimleri"
      {...list}
    />
  );
}
