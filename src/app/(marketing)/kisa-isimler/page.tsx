import type { Metadata } from "next";
import { NameListTemplate } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Kısa isimler",
  description: "Kısa ve akılda kalıcı bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  return (
    <NameListTemplate
      title="Kısa isimler"
      description="Kısa telaffuzuyla pratik ve sevimli isimler."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Kısa isimler" }]}
      query={{ isShort: true }}
      path="/kisa-isimler"
      searchParams={sp}
    />
  );
}
