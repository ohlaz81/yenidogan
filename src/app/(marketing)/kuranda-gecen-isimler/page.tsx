import type { Metadata } from "next";
import { NameListTemplate } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Kur'an'da geçen isimler",
  description: "Kur'an'da geçtiği belirtilen bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  return (
    <NameListTemplate
      title="Kur'an'da geçen isimler"
      description="Kur'anî kökeni veya Kur'an'da geçtiği kaynaklarda yer alan isimleri bir arada listeliyoruz."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Kur'an'da geçen isimler" }]}
      query={{ inQuran: true }}
      path="/kuranda-gecen-isimler"
      searchParams={sp}
    />
  );
}
