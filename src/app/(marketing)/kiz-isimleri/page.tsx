import type { Metadata } from "next";
import { GenderListAside } from "@/components/marketing/GenderListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";
import { getFirstLettersForGender } from "@/lib/static/names-store";
import { normalizeTrLetter } from "@/lib/text";

export const metadata: Metadata = {
  title: "Kız isimleri",
  description: "Anlamları ve kökenleriyle kız bebek isimleri listesi.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const rawHarf = Array.isArray(sp.harf) ? sp.harf[0] : sp.harf;
  const letter = rawHarf?.trim() ? normalizeTrLetter(rawHarf) : undefined;
  const list = await loadNameListTemplateData({
    searchParams: sp,
    query: {
      gender: "GIRL",
      orderBy: "alpha",
      ...(letter ? { letter } : {}),
    },
  });
  const letters = getFirstLettersForGender("GIRL");
  const paginationExtra = letter ? { harf: letter } : undefined;

  return (
    <NameListTemplate
      title="Kız isimleri"
      description="Zarif, modern ve klasik kız isimlerini A–Z sırasıyla inceleyin; üstteki harflerle ilk harfe göre süzebilirsiniz. Sağ sütunda en popüler ve öne çıkan tınılara hızlı erişin."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Kız isimleri" }]}
      path="/kiz-isimleri"
      headerClassName="rounded-2xl border border-pink-200/60 bg-gradient-to-br from-pink-50 via-white to-violet-50/50 p-5 shadow-sm sm:p-7"
      aside={<GenderListAside gender="GIRL" />}
      paginationExtra={paginationExtra}
      alphabetStrip={{
        letters,
        basePath: "/kiz-isimleri",
        activeLetter: letter ?? null,
        tone: "girl",
      }}
      {...list}
    />
  );
}
