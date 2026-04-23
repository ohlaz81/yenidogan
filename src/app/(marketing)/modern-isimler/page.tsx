import type { Metadata } from "next";
import { NameListTemplate } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Modern isimler",
  description: "Çağdaş ve akıcı bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  return (
    <NameListTemplate
      title="Modern isimler"
      description="Kısa, akıcı ve günümüzde sık duyulan modern isim seçkisi."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Modern isimler" }]}
      query={{ style: "MODERN" }}
      path="/modern-isimler"
      searchParams={sp}
    />
  );
}
