import Link from "next/link";
import type { NameWithImage } from "@/components/marketing/NameCard";
import type { Gender } from "@/types/database";
import { listNames } from "@/lib/queries/names";
import { nameDisplayTextClass } from "@/lib/name-gender-styles";

export type CategoryAsideVariant =
  | "popular"
  | "quran"
  | "modern"
  | "rare"
  | "short"
  | "beautiful"
  | "all"
  | "finder"
  | { kind: "letter"; letter: string; gender?: Gender };

async function top5ForVariant(v: CategoryAsideVariant, pageGender?: Gender): Promise<NameWithImage[]> {
  if (typeof v === "object" && v.kind === "letter") {
    return (
      await listNames({
        letter: v.letter.toLocaleUpperCase("tr-TR"),
        gender: v.gender,
        take: 5,
        orderBy: "popular",
      })
    ).items;
  }
  const g = pageGender ? { gender: pageGender } : {};
  if (v === "popular") return (await listNames({ ...g, orderBy: "popular", take: 5 })).items;
  if (v === "quran") return (await listNames({ ...g, inQuran: true, orderBy: "popular", take: 5 })).items;
  if (v === "modern") return (await listNames({ ...g, style: "MODERN", orderBy: "popular", take: 5 })).items;
  if (v === "rare") return (await listNames({ ...g, style: "RARE", orderBy: "popular", take: 5 })).items;
  if (v === "short") return (await listNames({ ...g, isShort: true, orderBy: "popular", take: 5 })).items;
  if (v === "beautiful")
    return (await listNames({ ...g, beautifulMeaning: true, orderBy: "popular", take: 5 })).items;
  if (v === "all") return (await listNames({ ...g, orderBy: "popular", take: 5 })).items;
  if (v === "finder") return (await listNames({ ...g, orderBy: "popular", take: 5 })).items;
  return [];
}

async function modernSpotlight(gender?: Gender): Promise<NameWithImage[]> {
  const g = gender ? { gender } : {};
  return (await listNames({ style: "MODERN", take: 5, orderBy: "popular", ...g })).items;
}

/**
 * Kategori listeleri için kısa yan sütun (erkek/kız sayfalarındaki GenderListAside’tan daha sade).
 */
export async function CategoryListAside({ variant, gender }: { variant: CategoryAsideVariant; gender?: Gender }) {
  const top5 = await top5ForVariant(variant, gender);
  const modern5 = await modernSpotlight(gender);

  return (
    <div className="space-y-4 text-sm">
      <div className="rounded-2xl border border-border/70 bg-white p-4 shadow-sm">
        <h2 className="font-display text-base font-semibold text-primary">Öne çıkan 5</h2>
        <p className="mt-0.5 text-xs text-muted">Bu kategoriye göre popüler skor.</p>
        <ol className="mt-2 space-y-1.5">
          {top5.map((n, i) => (
            <li key={n.id} className="flex min-w-0 items-center gap-2">
              <span className="w-5 shrink-0 text-muted tabular-nums">{i + 1}.</span>
              <Link
                href={`/isim/${n.slug}`}
                className={`min-w-0 flex-1 truncate font-medium hover:underline ${nameDisplayTextClass(n.gender)}`}
              >
                {n.displayName}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-border/70 bg-white p-4 shadow-sm">
        <h2 className="font-display text-base font-semibold text-primary">Modern örnekler</h2>
        <ol className="mt-2 space-y-1.5">
          {modern5.map((n, i) => (
            <li key={n.id} className="flex min-w-0 items-center gap-2">
              <span className="w-5 shrink-0 text-muted tabular-nums">{i + 1}.</span>
              <Link
                href={`/isim/${n.slug}`}
                className={`min-w-0 flex-1 truncate font-medium hover:underline ${nameDisplayTextClass(n.gender)}`}
              >
                {n.displayName}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-border/70 bg-white p-4 shadow-sm">
        <h2 className="font-display text-base font-semibold text-primary">Keşfet</h2>
        <ul className="mt-2 space-y-2 text-muted">
          <li>
            <Link className="font-medium text-primary hover:underline" href="/erkek-isimleri">
              Erkek isimleri
            </Link>
          </li>
          <li>
            <Link className="font-medium text-primary hover:underline" href="/kiz-isimleri">
              Kız isimleri
            </Link>
          </li>
          <li>
            <Link className="font-medium text-primary hover:underline" href="/populer-isimler">
              Popüler isimler
            </Link>
          </li>
          <li>
            <Link className="font-medium text-primary hover:underline" href="/kuranda-gecen-isimler">
              Kur’an’da geçenler
            </Link>
          </li>
          <li>
            <Link className="font-medium text-primary hover:underline" href="/tum-isimler">
              Tüm isimler
            </Link>
          </li>
        </ul>
      </div>

      <Link
        href="/isim-bulucu"
        className="block rounded-2xl border border-primary/20 bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
      >
        İsim bulucuya git →
      </Link>
    </div>
  );
}

/** Kategori listeleri: hafif gradient başlık (erkek/kız sayfaları kendi sınıfını kullanır) */
export const NAME_LIST_CATEGORY_HEADER_CLASS =
  "mt-6 rounded-2xl border border-violet-100/60 bg-gradient-to-br from-violet-50/45 via-white to-pink-50/25 p-5 shadow-sm sm:p-6";
