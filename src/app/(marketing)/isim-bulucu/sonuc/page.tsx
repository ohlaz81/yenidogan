import type { Metadata } from "next";
import {
  CategoryListAside,
  NAME_LIST_CATEGORY_HEADER_CLASS,
} from "@/components/marketing/CategoryListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";
import type { Gender, NameStyle } from "@/types/database";
import type { NameListParams } from "@/lib/queries/names";

export const metadata: Metadata = {
  title: "İsim bulucu sonuçları",
  description: "Seçtiğiniz filtrelere uygun isimler.",
};

type SP = Record<string, string | string[] | undefined>;

function val(sp: SP, key: string) {
  const v = sp[key];
  return Array.isArray(v) ? v[0] : v;
}

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;

  const cinsiyet = val(sp, "cinsiyet");
  const gender: Gender | undefined =
    cinsiyet === "KIZ" ? "GIRL" : cinsiyet === "ERKEK" ? "BOY" : cinsiyet === "UNISEX" ? "UNISEX" : undefined;

  const harf = val(sp, "harf")?.trim();
  const letter = harf ? harf.toLocaleUpperCase("tr-TR") : undefined;

  const koken = val(sp, "koken")?.trim();
  const q = val(sp, "q")?.trim();

  const kuran = val(sp, "kuran");
  const inQuran = kuran === "evet" ? true : undefined;
  const inQuranFalse = kuran === "hayir" ? true : undefined;

  const tarz = val(sp, "tarz");
  const styleMap: Record<string, NameStyle> = {
    MODERN: "MODERN",
    KLASIK: "CLASSIC",
    NADIR: "RARE",
    POPULER: "POPULAR",
  };
  const style = tarz ? styleMap[tarz] : undefined;

  const kisa = val(sp, "kisa") === "evet";
  const guzel = val(sp, "guzel") === "evet";

  const query: NameListParams = {
    gender,
    letter,
    origin: koken,
    search: q,
    inQuran,
    inQuranFalse,
    style,
    isShort: kisa ? true : undefined,
    beautifulMeaning: guzel ? true : undefined,
  };

  const extra: Record<string, string> = {};
  for (const [k, v] of Object.entries(sp)) {
    const s = Array.isArray(v) ? v[0] : v;
    if (s && k !== "sayfa") extra[k] = s;
  }

  const list = await loadNameListTemplateData({ searchParams: sp, query });
  return (
    <NameListTemplate
      title="İsim bulucu sonuçları"
      description="Seçtiğiniz kriterlere göre eşleşen isimler aşağıda listelenir."
      crumbs={[
        { label: "Anasayfa", href: "/" },
        { label: "İsim bulucu", href: "/isim-bulucu" },
        { label: "Sonuçlar" },
      ]}
      path="/isim-bulucu/sonuc"
      paginationExtra={Object.keys(extra).length ? extra : undefined}
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      aside={<CategoryListAside variant="finder" listTotal={list.total} />}
      {...list}
    />
  );
}
