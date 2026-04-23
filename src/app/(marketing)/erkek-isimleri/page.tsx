import type { Metadata } from "next";
import { NameListTemplate } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Erkek isimleri",
  description: "Anlamları ve kökenleriyle erkek bebek isimleri listesi.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  return (
    <NameListTemplate
      title="Erkek isimleri"
      description="Güçlü, modern ve klasik erkek isimlerini detaylı bilgilerle keşfedin."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Erkek isimleri" }]}
      query={{ gender: "BOY" }}
      path="/erkek-isimleri"
      searchParams={sp}
    />
  );
}
