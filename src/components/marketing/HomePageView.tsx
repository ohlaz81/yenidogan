import Link from "next/link";
import type { HomePageData } from "@/lib/queries/home";
import { genderLabels, styleLabels, toneClass } from "@/lib/labels";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { MediaImage } from "@/components/marketing/MediaImage";
import { NameCard } from "@/components/marketing/NameCard";
import { NewsletterBar } from "@/components/marketing/NewsletterBar";
import { RefreshButton } from "@/components/marketing/RefreshButton";
import { FavoriteHeart } from "@/components/marketing/FavoriteHeart";
import type { FAQ } from "@/types/database";

const quickIcon: Record<string, string> = {
  girl: "👧🏻",
  boy: "👦🏻",
  quran: "📖",
  star: "⭐",
  search: "⌕",
  heart: "♥",
};

const quickIconBg: Record<string, string> = {
  girl: "bg-pink-100 text-pink-600",
  boy: "bg-sky-100 text-sky-600",
  quran: "bg-emerald-100 text-emerald-700",
  star: "bg-amber-100 text-amber-700",
  search: "bg-violet-100 text-violet-700",
  heart: "bg-rose-100 text-rose-600",
};

export function HomePageView({
  data,
  faqs,
}: {
  data: HomePageData;
  faqs: FAQ[];
}) {
  const hero = data.heroSlides[0];
  const heroImg = hero?.image?.url ?? "/media/placeholder.svg";

  const defaultHead = (
    <>
      Bebeğiniz için en <span className="text-pink-200">doğru</span> ismi bulun
    </>
  );
  const defaultSub = "Anlamları, kökenleri ve özellikleriyle binlerce kız ve erkek ismi keşfedin.";

  const girlNames = data.featuredGirlSlots
    .map((s) => s.name)
    .filter((n): n is NonNullable<typeof n> => n != null);
  const boyNames = data.featuredBoySlots
    .map((s) => s.name)
    .filter((n): n is NonNullable<typeof n> => n != null);
  const noPopularNames = girlNames.length === 0 && boyNames.length === 0;

  return (
    <div>
      <section className="relative min-h-[min(520px,85dvh)] overflow-hidden bg-[#1e1240] text-white">
        <div className="absolute inset-0">
          <MediaImage src={heroImg} alt={hero?.image?.alt ?? ""} fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/20" />
        <div className="relative mx-auto flex min-h-[min(520px,85dvh)] max-w-6xl flex-col justify-center gap-6 px-4 py-12 lg:py-20">
          <div className="max-w-2xl space-y-5">
            <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-pink-100">
              Bebek isimleri
            </span>
            <h1 className="font-display text-4xl font-semibold leading-[1.15] sm:text-5xl lg:text-[2.75rem]">
              {hero?.headline ? hero.headline : defaultHead}
            </h1>
            <p className="text-lg leading-relaxed text-violet-100/95 sm:text-xl">
              {hero?.subline ? (
                hero.subline
              ) : (
                <>
                  <span className="text-pink-300/90">♥</span> {defaultSub} <span className="text-pink-300/90">♥</span>
                </>
              )}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href={hero?.ctaHref ?? "/isim-bulucu"}
                className="inline-flex min-h-12 min-w-[12rem] items-center justify-center rounded-2xl bg-primary-foreground px-6 py-3 text-sm font-bold text-primary shadow-lg transition hover:bg-white"
              >
                {hero?.ctaLabel ?? "İsim bulucuya git"} →
              </Link>
              <Link
                href="/kiz-isimleri"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Kız isimleri
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-6 px-4 sm:-mt-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 rounded-3xl border border-border/80 bg-white p-3 shadow-xl shadow-primary/5 sm:grid-cols-3 sm:p-4 lg:grid-cols-6">
          {data.quickLinks.map((q) => (
            <Link
              key={q.id}
              href={q.href}
              className="group flex flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center text-[0.7rem] font-bold uppercase leading-tight tracking-tight text-primary transition hover:bg-accent-pink-soft/50 sm:text-xs"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl shadow-sm transition group-hover:scale-105 sm:h-14 sm:w-14 ${
                  quickIconBg[q.iconKey] ?? "bg-violet-100 text-violet-700"
                }`}
              >
                {quickIcon[q.iconKey] ?? "✦"}
              </span>
              {q.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary">Popüler isimler</h2>
            <p className="text-sm text-muted">Öne çıkan kız ve erkek isimleri</p>
          </div>
          <Link href="/populer-isimler" className="text-sm font-semibold text-accent-pink hover:underline">
            Tümünü gör →
          </Link>
        </div>
        {noPopularNames ? (
          <div className="rounded-2xl border border-dashed border-border/80 bg-accent-pink-soft/20 p-6 text-center text-sm text-muted">
            Henüz öne çıkarılmış isim yok. Veritabanında yayımlanmış kız/erkek isimleri eklendikçe bu alan otomatik
            dolar. Admin’den isim yükleyebilir veya &quot;öne çıkan isimler&quot; slotlarını doldurabilirsiniz.
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <Link
                href="/kiz-isimleri"
                className="text-sm font-semibold text-primary underline underline-offset-2"
              >
                Tüm kız isimleri
              </Link>
              <span className="text-border">·</span>
              <Link
                href="/erkek-isimleri"
                className="text-sm font-semibold text-primary underline underline-offset-2"
              >
                Tüm erkek isimleri
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-accent-pink">Kız</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {girlNames.map((name) => (
                  <NameCard key={name.id} name={name} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-accent-blue">Erkek</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {boyNames.map((name) => (
                  <NameCard key={name.id} name={name} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <h2 className="font-display text-2xl font-semibold text-primary">İsim kategorileri</h2>
        <p className="mb-6 text-sm text-muted">Görsel kartlarla hızlı gezinti; anlamlı ve özenle seçilmiş listeler.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.showcases.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-md shadow-primary/5 transition hover:shadow-lg"
            >
              <div className="relative h-48 w-full sm:h-52">
                <MediaImage
                  src={c.image?.url ?? "/media/placeholder.svg"}
                  alt={c.image?.alt ?? c.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1430]/90 via-[#1a1430]/20 to-transparent" />
                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide ${toneClass(c.tagTone)}`}
                >
                  {c.tagLabel}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-display text-lg font-semibold leading-tight drop-shadow sm:text-xl">{c.title}</p>
                  {c.subtitle && <p className="mt-1 text-sm font-medium text-white/90">{c.subtitle}</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between rounded-t-3xl bg-primary px-4 py-3.5 text-primary-foreground shadow-sm">
              <span className="text-xs font-bold tracking-[0.2em] sm:text-sm">İSİM REHBERİ</span>
              <Link
                href="/isim-rehberi"
                className="rounded-full border border-white/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/15"
              >
                Tümü
              </Link>
            </div>
            <div className="divide-y divide-border/80 rounded-b-3xl border border-t-0 border-border/80 bg-card">
              {data.guideArticles.map((a) => (
                <Link
                  key={a.id}
                  href={`/isim-rehberi/${a.slug}`}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 text-sm font-medium transition hover:bg-accent-pink-soft/50"
                >
                  <span className="text-foreground/90">{a.title}</span>
                  <span className="text-primary/50">›</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-lg shadow-primary/5">
            <div className="flex items-center justify-between bg-gradient-to-r from-primary via-primary to-pink-700/90 px-4 py-3.5 text-primary-foreground">
              <span className="text-xs font-bold tracking-[0.15em] sm:text-sm">RASTGELE İSİM KEŞFET</span>
              <RefreshButton />
            </div>
            {data.randomName ? (
              <div className="space-y-4 bg-gradient-to-b from-accent-pink-soft/40 to-white p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                  <div className="min-w-0 flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-3xl font-semibold text-accent-pink sm:text-4xl">
                        {data.randomName.displayName}
                      </h3>
                      <FavoriteHeart slug={data.randomName.slug} />
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="rounded-full border border-pink-200/60 bg-white px-3 py-1 text-accent-pink shadow-sm">
                        {genderLabels[data.randomName.gender]}
                      </span>
                      <span className="rounded-full border border-violet-200/60 bg-white px-3 py-1 text-violet-800 shadow-sm">
                        {styleLabels[data.randomName.style]}
                      </span>
                      <span className="rounded-full border border-amber-200/60 bg-amber-50 px-3 py-1 text-amber-900 shadow-sm">
                        {data.randomName.origin}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">
                      <span className="font-bold text-foreground">Anlamı: </span>
                      {data.randomName.meaning}
                    </p>
                    <Link
                      href={`/isim/${data.randomName.slug}`}
                      className="inline-flex min-h-11 items-center justify-center rounded-2xl border-2 border-accent-pink/40 bg-white px-6 py-2.5 text-sm font-bold text-accent-pink shadow-sm transition hover:bg-accent-pink hover:text-white"
                    >
                      Detayı gör →
                    </Link>
                  </div>
                  <div className="mx-auto shrink-0 sm:mx-0 sm:pt-1">
                    <div className="relative h-36 w-36 overflow-hidden rounded-3xl border-4 border-white shadow-md sm:h-40 sm:w-40">
                      <MediaImage
                        src={data.randomName.image?.url ?? "/media/placeholder.svg"}
                        alt={data.randomName.image?.alt ?? data.randomName.displayName}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="p-5 text-sm text-muted">Henüz yayınlanmış isim yok. Admin panelinden ekleyin.</p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary">Sık sorulan sorular</h2>
            <p className="mt-2 text-sm text-muted">Kısa cevaplar; detaylar için rehber yazılarımıza göz atın.</p>
            <div className="mt-6">
              <FaqAccordion items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-3xl border border-border bg-accent-pink-soft/30 p-8 text-center">
            <p className="text-4xl">💬</p>
            <p className="mt-4 font-semibold text-primary">Başka sorunuz mu var?</p>
            <p className="mt-2 text-sm text-muted">İletişim formundan bize yazın; içerik önerilerinizi de paylaşabilirsiniz.</p>
            <Link
              href="/iletisim"
              className="mx-auto mt-6 inline-flex rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Bize ulaşın
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border/80 bg-gradient-to-b from-violet-50/50 to-transparent py-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: "📚", t: "Geniş arşiv", d: "Sürekli güncellenen isim listeleri ve kategoriler." },
            { i: "✨", t: "Detaylı bilgi", d: "Köken, okunuş, anlam ve özellikler bir arada." },
            { i: "🛡️", t: "Güvenilir kaynak", d: "Editoryal kontrol ve anlaşılır içerik dili." },
            { i: "📱", t: "Kolay kullanım", d: "Mobil öncelikli, sade arayüz; hızlı filtreler." },
          ].map((x) => (
            <div
              key={x.t}
              className="flex gap-3 rounded-2xl border border-border/80 bg-white/90 p-4 shadow-sm"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-xl"
                aria-hidden
              >
                {x.i}
              </span>
              <div>
                <p className="font-semibold text-primary">{x.t}</p>
                <p className="mt-1 text-sm text-muted">{x.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <NewsletterBar />
    </div>
  );
}
