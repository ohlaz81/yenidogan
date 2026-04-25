import Link from "next/link";
import type { NameWithImage } from "@/components/marketing/NameCard";
import type { Gender } from "@/types/database";
import { listNamesFromStore } from "@/lib/static/names-store";

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

function top5ForVariant(v: CategoryAsideVariant): NameWithImage[] {
  if (v === "popular") return listNamesFromStore({ orderBy: "popular", take: 5 }).items;
  if (v === "quran") return listNamesFromStore({ inQuran: true, orderBy: "popular", take: 5 }).items;
  if (v === "modern") return listNamesFromStore({ style: "MODERN", orderBy: "popular", take: 5 }).items;
  if (v === "rare") return listNamesFromStore({ style: "RARE", orderBy: "popular", take: 5 }).items;
  if (v === "short") return listNamesFromStore({ isShort: true, orderBy: "popular", take: 5 }).items;
  if (v === "beautiful") return listNamesFromStore({ beautifulMeaning: true, orderBy: "popular", take: 5 }).items;
  if (v === "all") return listNamesFromStore({ orderBy: "popular", take: 5 }).items;
  if (v === "finder") return listNamesFromStore({ orderBy: "popular", take: 5 }).items;
  if (typeof v === "object" && v.kind === "letter") {
    return listNamesFromStore({
      letter: v.letter.toLocaleUpperCase("tr-TR"),
      gender: v.gender,
      take: 5,
      orderBy: "popular",
    }).items;
  }
  return [];
}

function modernSpotlight(): NameWithImage[] {
  return listNamesFromStore({ style: "MODERN", take: 5, orderBy: "popular" }).items;
}

/**
 * Kategori listeleri için kısa yan sütun (erkek/kız sayfalarındaki GenderListAside’tan daha sade).
 */
export function CategoryListAside({ variant }: { variant: CategoryAsideVariant }) {
  const top5 = top5ForVariant(variant);
  const modern5 = modernSpotlight();

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
                className="min-w-0 flex-1 truncate font-medium text-primary hover:text-accent-pink hover:underline"
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
                className="min-w-0 flex-1 truncate font-medium text-primary hover:text-accent-pink hover:underline"
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
