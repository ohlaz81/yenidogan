import type { Metadata } from "next";
import { NameListTemplate } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Kız isimleri",
  description: "Anlamları ve kökenleriyle kız bebek isimleri listesi.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  return (
    <NameListTemplate
      title="Kız isimleri"
      description="Zarif, modern ve klasik kız isimlerini anlam, köken ve popülerlik bilgileriyle inceleyin."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Kız isimleri" }]}
      query={{ gender: "GIRL" }}
      path="/kiz-isimleri"
      searchParams={sp}
    />
  );
}
