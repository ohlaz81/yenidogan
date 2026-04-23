import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "İsim bulucu",
  description: "Cinsiyet, harf, köken ve daha fazlasına göre isim filtreleyin.",
};

const letters = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split("");

export default function IsimBulucuPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-primary">İsim bulucu</h1>
      <p className="mt-2 text-muted">Kriterleri seçin; iki tıkla sonuç listesine gidin.</p>

      <form action="/isim-bulucu/sonuc" method="get" className="mt-8 space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div>
          <label className="text-sm font-semibold text-foreground">Cinsiyet</label>
          <select
            name="cinsiyet"
            className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm"
            defaultValue=""
          >
            <option value="">Tümü</option>
            <option value="KIZ">Kız</option>
            <option value="ERKEK">Erkek</option>
            <option value="UNISEX">Ünisex</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground">Baş harf (isteğe bağlı)</label>
          <select name="harf" className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm" defaultValue="">
            <option value="">Tüm harfler</option>
            {letters.map((L) => (
              <option key={L} value={L}>
                {L}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground">Köken içerir (isteğe bağlı)</label>
          <input
            name="koken"
            placeholder="Örn. Arapça, Türkçe"
            className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground">Kur’an’da geçme</label>
          <select name="kuran" className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm" defaultValue="">
            <option value="">Farketmez</option>
            <option value="evet">Evet</option>
            <option value="hayir">Hayır</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground">Anlam / isim içinde ara</label>
          <input
            name="q"
            placeholder="Kelime yazın"
            className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground">Tarz</label>
          <select name="tarz" className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm" defaultValue="">
            <option value="">Tümü</option>
            <option value="MODERN">Modern</option>
            <option value="KLASIK">Klasik</option>
            <option value="NADIR">Nadir</option>
            <option value="POPULER">Popüler</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground">Kısa isim</label>
          <select name="kisa" className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm" defaultValue="">
            <option value="">Farketmez</option>
            <option value="evet">Evet</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground">Anlamı güzel işaretli</label>
          <select name="guzel" className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm" defaultValue="">
            <option value="">Farketmez</option>
            <option value="evet">Evet</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-md transition hover:opacity-90"
        >
          İsim bul →
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Harf listeleri için <Link href="/tum-isimler" className="font-semibold text-accent-pink hover:underline">A–Z tüm isimler</Link> sayfasına da göz atın.
      </p>
    </div>
  );
}
