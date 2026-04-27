import type { Metadata } from "next";
import { GenderListAside } from "@/components/marketing/GenderListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";
import { getFirstLettersForGender } from "@/lib/static/names-store";
import { normalizeTrLetter } from "@/lib/text";

export const metadata: Metadata = {
  title: "Erkek isimleri",
  description: "Anlamları ve kökenleriyle erkek bebek isimleri listesi.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const rawHarf = Array.isArray(sp.harf) ? sp.harf[0] : sp.harf;
  const letter = rawHarf?.trim() ? normalizeTrLetter(rawHarf) : undefined;
  const list = await loadNameListTemplateData({
    searchParams: sp,
    query: {
      gender: "BOY",
      orderBy: "alpha",
      ...(letter ? { letter } : {}),
    },
  });
  const letters = getFirstLettersForGender("BOY");
  const paginationExtra = letter ? { harf: letter } : undefined;

  return (
    <NameListTemplate
      title="Erkek isimleri"
      description="Güçlü, modern ve klasik erkek isimlerini A–Z sırasıyla inceleyin; üstteki harflerle ilk harfe göre süzebilirsiniz. Sağ sütunda en popüler ve öne çıkan tınılara hızlı erişin."
      crumbs={[{ label: "Anasayfa", href: "/" }, { label: "Erkek isimleri" }]}
      path="/erkek-isimleri"
      headerClassName="rounded-2xl border border-sky-200/60 bg-gradient-to-br from-sky-50 via-white to-pink-50/50 p-5 shadow-sm sm:p-7"
      aside={<GenderListAside gender="BOY" />}
      paginationExtra={paginationExtra}
      alphabetStrip={{
        letters,
        basePath: "/erkek-isimleri",
        activeLetter: letter ?? null,
        tone: "boy",
      }}
      {...list}
    />
  );
}
