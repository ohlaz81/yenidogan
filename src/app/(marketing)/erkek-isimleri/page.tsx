import type { Metadata } from "next";
import { GenderListAside } from "@/components/marketing/GenderListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";
import { countNamesByGender } from "@/lib/static/names-store";

export const metadata: Metadata = {
  title: "Erkek isimleri",
  description: "Anlamları ve kökenleriyle erkek bebek isimleri listesi.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const list = await loadNameListTemplateData({ searchParams: sp, query: { gender: "BOY" } });
  const pool = countNamesByGender("BOY");
  return (
    <NameListTemplate
      title={`Erkek isimleri (${pool} isim)`}
      description="Güçlü, modern ve klasik erkek isimlerini anlam, köken, popülerlik ve Kur’an bilgisiyle keşfedin. Sağ sütunda en popüler ve öne çıkan tınılara hızlı erişin."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Erkek isimleri" }]}
      path="/erkek-isimleri"
      headerClassName="rounded-2xl border border-sky-200/60 bg-gradient-to-br from-sky-50 via-white to-pink-50/50 p-5 shadow-sm sm:p-7"
      aside={<GenderListAside gender="BOY" />}
      {...list}
    />
  );
}
