import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CategoryListAside,
  NAME_LIST_CATEGORY_HEADER_CLASS,
} from "@/components/marketing/CategoryListAside";
import { NameListTemplate, loadNameListTemplateData } from "@/components/marketing/NameListTemplate";
import type { Gender } from "@/types/database";

type SP = Record<string, string | string[] | undefined>;

function normalizeLetter(harf: string) {
  try {
    return decodeURIComponent(harf).trim().toLocaleUpperCase("tr-TR");
  } catch {
    return harf.trim().toLocaleUpperCase("tr-TR");
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ harf: string }>;
}): Promise<Metadata> {
  const { harf } = await params;
  const L = normalizeLetter(harf);
  return {
    title: `${L} harfi ile başlayan isimler`,
    description: `${L} harfiyle başlayan bebek isimleri.`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ harf: string }>;
  searchParams: Promise<SP>;
}) {
  const { harf } = await params;
  const L = normalizeLetter(harf);
  if (!L || L.length > 3) notFound();

  const sp = await searchParams;
  const c = Array.isArray(sp.cinsiyet) ? sp.cinsiyet[0] : sp.cinsiyet;
  const gender: Gender | undefined =
    c === "KIZ" ? "GIRL" : c === "ERKEK" ? "BOY" : c === "UNISEX" ? "UNISEX" : undefined;

  const genderLabel =
    gender === "GIRL" ? "kız" : gender === "BOY" ? "erkek" : gender === "UNISEX" ? "ünisex" : "";

  const pathname = `/harf/${encodeURIComponent(harf)}`;
  const paginationExtra = c ? { cinsiyet: c } : undefined;

  const list = await loadNameListTemplateData({ searchParams: sp, query: { letter: L, gender } });
  return (
    <NameListTemplate
      title={`${L} harfi ile başlayan ${genderLabel ? `${genderLabel} ` : ""}isimler`}
      description={`${L} harfiyle başlayan isimleri anlam ve köken bilgileriyle inceleyin.`}
      crumbs={[
        { label: "Anasayfa", href: "/" },
        { label: "Harfe göre", href: "/tum-isimler" },
        { label: `${L} harfi` },
      ]}
      path={pathname}
      paginationExtra={paginationExtra}
      headerClassName={NAME_LIST_CATEGORY_HEADER_CLASS}
      aside={<CategoryListAside variant={{ kind: "letter", letter: L, gender }} listTotal={list.total} />}
      {...list}
    />
  );
}
