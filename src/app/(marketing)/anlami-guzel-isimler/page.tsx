import type { Metadata } from "next";
import { NameListTemplate } from "@/components/marketing/NameListTemplate";

export const metadata: Metadata = {
  title: "Anlamı güzel isimler",
  description: "Anlamı güçlü ve pozitif bebek isimleri.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  return (
    <NameListTemplate
      title="Anlamı güzel isimler"
      description="Editoryal olarak “anlamı güzel” olarak işaretlenen isimler."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Anlamı güzel isimler" }]}
      query={{ beautifulMeaning: true }}
      path="/anlami-guzel-isimler"
      searchParams={sp}
    />
  );
}
