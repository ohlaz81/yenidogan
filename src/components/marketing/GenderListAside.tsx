import Link from "next/link";
import { getFeaturedByGenderFromStore, getModernOrPopularTopByGenderFromStore } from "@/lib/static/names-store";
import { nameDisplayTextClass } from "@/lib/name-gender-styles";

export function GenderListAside({ gender }: { gender: "BOY" | "GIRL" }) {
  const isBoy = gender === "BOY";
  const pop5 = getFeaturedByGenderFromStore(gender, 5);
  const rising5 = getModernOrPopularTopByGenderFromStore(gender, 5);
  const gLabel = isBoy ? "erkek" : "kız";
  const gLabelCap = isBoy ? "Erkek" : "Kız";

  return (
    <div className="space-y-4 text-sm">
      <div className="rounded-2xl border border-border/70 bg-white p-4 shadow-sm">
        <h2 className="font-display text-base font-semibold text-primary">En popüler {gLabel} isimleri</h2>
        <ol className="mt-2 space-y-1.5">
          {pop5.map((n, i) => (
            <li key={n.id} className="flex min-w-0 items-center justify-between gap-2 text-sm">
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
        <h2 className="font-display text-base font-semibold text-primary">2026 öne çıkan tınılar</h2>
        <p className="mt-0.5 text-xs text-muted">Modern türe ve popülerlik skoruna göre örnek seçim.</p>
        <ol className="mt-2 space-y-1.5">
          {rising5.map((n, i) => (
            <li key={n.id} className="flex min-w-0 items-center justify-between gap-2 text-sm">
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
        <h2 className="font-display text-base font-semibold text-primary">
          {gLabelCap} isimleri için bilmeniz gerekenler
        </h2>
        <ul className="mt-2 space-y-2 text-muted">
          <li>
            <Link className="font-medium text-primary hover:underline" href="/isim-bulucu">
              İsim bulucu
            </Link>{" "}
            ile filtreleyin.
          </li>
          <li>
            <Link className="font-medium text-primary hover:underline" href="/kisa-isimler">
              Kısa isimler
            </Link>{" "}
            listesine göz atın.
          </li>
          <li>
            <Link className="font-medium text-primary hover:underline" href="/kuranda-gecen-isimler">
              Kur’an’da geçen isimler
            </Link>{" "}
            bölümünü inceleyin.
          </li>
          <li>
            <Link className="font-medium text-primary hover:underline" href="/isim-rehberi">
              İsim rehberi
            </Link>{" "}
            yazılarıyla seçim yapın.
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
