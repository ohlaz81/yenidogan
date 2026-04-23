import type { Metadata } from "next";
import { NameListTemplate } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Nadir isimler",
  description: "Daha az rastlanan özgün bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  return (
    <NameListTemplate
      title="Nadir isimler"
      description="Özgünleşmek isteyen aileler için daha az duyulan anlamlı isimler."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Nadir isimler" }]}
      query={{ style: "RARE" }}
      path="/nadir-isimler"
      searchParams={sp}
    />
  );
}
