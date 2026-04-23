import type { Metadata } from "next";
import { NameListTemplate } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Tüm isimler (A–Z)",
  description: "Alfabetik sırayla tüm yayınlanmış isimler.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  return (
    <NameListTemplate
      title="Tüm isimler"
      description="A–Z alfabetik sıralı tam liste."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Tüm isimler" }]}
      query={{ orderBy: "alpha" }}
      path="/tum-isimler"
      searchParams={sp}
    />
  );
}
