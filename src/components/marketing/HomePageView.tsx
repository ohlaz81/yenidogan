import Link from "next/link";
import type { HomePageData } from "@/lib/queries/home";
import { genderLabels, styleLabels, toneClass } from "@/lib/labels";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { MediaImage } from "@/components/marketing/MediaImage";
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
      Bebeğiniz için en <span className="text-accent-pink">doğru</span> ismi bulun
    </>
  );
  const defaultSub = "Anlamları, kökenleri ve özellikleriyle binlerce kız ve erkek ismi keşfedin.";

  const girlNames = data.featuredGirlSlots
    .map((s) => s.name)
    .filter((n): n is NonNullable<typeof n> => n != null);
  const boyNames = data.featuredBoySlots
    .map((s) => s.name)
    .filter((n): n is NonNullable<typeof n> => n != null);
  const popularNames = [...girlNames, ...boyNames].slice(0, 10);
  const noPopularNames = girlNames.length === 0 && boyNames.length === 0;
  const popularTickerSeed =
    popularNames.length > 0
      ? popularNames
      : [
          {
            id: "fallback-asel",
            slug: "asel",
            displayName: "Asel",
            meaning: "Bal gibi tatlı ve zarif bir isim.",
            image: { url: "/media/hero-soft.svg", alt: "Asel" },
            gender: "GIRL" as const,
          },
          {
            id: "fallback-yusuf",
            slug: "yusuf",
            displayName: "Yusuf",
            meaning: "Güzelliği ve ahlakı simgeleyen güçlü bir isim.",
            image: { url: "/media/cat-boy.svg", alt: "Yusuf" },
            gender: "BOY" as const,
          },
          {
            id: "fallback-lina",
            slug: "lina",
            displayName: "Lina",
            meaning: "Işık saçan, nazik ve sevgi dolu bir isim.",
            image: { url: "/media/cat-girl.svg", alt: "Lina" },
            gender: "GIRL" as const,
          },
        ];
  const popularTickerItems = popularTickerSeed.map((n, index) => ({
    ...n,
    category: index % 3 === 0 ? "Karışık" : n.gender === "GIRL" ? "Kız" : "Erkek",
    shortMeaning: n.meaning.length > 72 ? `${n.meaning.slice(0, 72).trim()}...` : n.meaning,
  }));
  const popularTickerLoop = [...popularTickerItems, ...popularTickerItems];

  return (
    <div className="space-y-8 pb-8 sm:space-y-10">
      <section className="px-4 pt-4 sm:pt-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.8rem] border border-border bg-white shadow-md shadow-primary/5">
          <div className="grid min-h-[26rem] gap-0 lg:grid-cols-[1.05fr_1fr]">
            <div className="order-2 flex flex-col justify-center p-6 sm:p-8 lg:order-1 lg:pr-10">
              <span className="inline-flex w-fit rounded-full bg-accent-pink-soft px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-accent-pink">
                Bebek isimleri
              </span>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-primary sm:text-5xl">
                {hero?.headline ? hero.headline : defaultHead}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{hero?.subline ?? defaultSub}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={hero?.ctaHref ?? "/isim-bulucu"}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white"
                >
                  {hero?.ctaLabel ?? "İsim bulucuya git"} →
                </Link>
              </div>
            </div>
            <div className="relative order-1 min-h-[15rem] lg:order-2 lg:min-h-full">
              <MediaImage
                src={heroImg}
                alt={hero?.image?.alt ?? "Bebek ismi görseli"}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-4 grid max-w-6xl gap-2 rounded-2xl border border-border bg-white p-2 shadow-sm sm:grid-cols-2 lg:grid-cols-6">
          {["Cinsiyet", "Köken", "Harf", "Anlam", "Kur'an'da Geçen"].map((label) => (
            <button
              key={label}
              type="button"
              className="h-12 rounded-xl border border-border/80 px-3 text-left text-sm font-medium text-muted transition hover:bg-accent-pink-soft/40"
            >
              {label}
            </button>
          ))}
          <Link
            href="/isim-bulucu"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white"
          >
            İsim bul →
          </Link>
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-3 rounded-2xl bg-white p-4 shadow-sm sm:grid-cols-6">
          {data.quickLinks.map((q) => (
            <Link key={q.id} href={q.href} className="group flex flex-col items-center gap-2 text-center">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${
                  quickIconBg[q.iconKey] ?? "bg-violet-100 text-violet-700"
                }`}
              >
                {quickIcon[q.iconKey] ?? "✦"}
              </span>
              <span className="text-xs font-semibold text-primary/90 transition group-hover:text-primary">{q.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-4 px-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-primary">Popüler isimler</h2>
          <Link href="/populer-isimler" className="text-xs font-semibold uppercase tracking-wide text-muted hover:text-primary">
            Tümünü gör
          </Link>
        </div>
        {noPopularNames ? (
          <div className="rounded-2xl border border-dashed border-border/80 bg-accent-pink-soft/20 p-6 text-center text-sm text-muted">
            Henüz öne çıkarılmış isim yok.
          </div>
        ) : (
          <div className="popular-marquee-wrapper rounded-3xl border border-border/80 bg-white/90 p-3 shadow-sm sm:p-4">
            <div className="popular-marquee-track">
              {popularTickerLoop.map((name, index) => (
                <Link
                  key={`${name.id}-${index}`}
                  href={`/isim/${name.slug}`}
                  className="popular-mini-card group"
                  aria-label={`${name.displayName} ismini incele`}
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border/80 bg-accent-pink-soft/20">
                    <MediaImage
                      src={name.image?.url ?? "/media/placeholder.svg"}
                      alt={name.image?.alt ?? name.displayName}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-lg leading-tight text-primary transition group-hover:text-accent-pink">
                      {name.displayName}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent-pink">{name.category}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted">{name.shortMeaning}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl space-y-4 px-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-primary">İsim kategorileri</h2>
          <Link href="/tum-isimler" className="text-xs font-semibold uppercase tracking-wide text-muted hover:text-primary">
            Tümünü gör
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {data.showcases.slice(0, 5).map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm"
            >
              <div className="relative h-44 w-full">
                <MediaImage
                  src={c.image?.url ?? "/media/placeholder.svg"}
                  alt={c.image?.alt ?? c.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:1024px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1430]/75 via-transparent to-transparent" />
                <span
                  className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase ${toneClass(c.tagTone)}`}
                >
                  {c.tagLabel}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <p className="font-display text-lg leading-tight">{c.title}</p>
                  <p className="text-xs text-white/90">{c.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
              <span className="text-sm font-semibold uppercase tracking-wide">İsim Rehberi</span>
              <Link href="/isim-rehberi" className="text-xs font-semibold uppercase">
                Tümü
              </Link>
            </div>
            <div className="divide-y divide-border/80">
              {data.guideArticles.slice(0, 4).map((a) => (
                <Link
                  key={a.id}
                  href={`/isim-rehberi/${a.slug}`}
                  className="flex items-center justify-between px-4 py-3 text-sm hover:bg-accent-pink-soft/40"
                >
                  <span>{a.title}</span>
                  <span>›</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm">
            <div className="flex items-center justify-between bg-gradient-to-r from-primary to-accent-pink px-4 py-3 text-white">
              <span className="text-sm font-semibold uppercase tracking-wide">Rastgele İsim Keşfet</span>
              <RefreshButton />
            </div>
            {data.randomName ? (
              <div className="space-y-3 p-4">
                <div className="flex gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-4xl font-semibold text-accent-pink">{data.randomName.displayName}</h3>
                      <FavoriteHeart slug={data.randomName.slug} />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                      <span className="rounded-full bg-accent-pink-soft px-2 py-1 text-accent-pink">
                        {genderLabels[data.randomName.gender]}
                      </span>
                      <span className="rounded-full bg-violet-100 px-2 py-1 text-violet-800">
                        {styleLabels[data.randomName.style]}
                      </span>
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-amber-900">{data.randomName.origin}</span>
                    </div>
                    <p className="mt-3 text-sm text-muted">
                      <span className="font-semibold text-foreground">Anlamı:</span> {data.randomName.meaning}
                    </p>
                  </div>
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                    <MediaImage
                      src={data.randomName.image?.url ?? "/media/placeholder.svg"}
                      alt={data.randomName.image?.alt ?? data.randomName.displayName}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" className="h-10 rounded-xl border border-border text-sm font-semibold text-muted">
                    Favorilere ekle
                  </button>
                  <Link
                    href={`/isim/${data.randomName.slug}`}
                    className="inline-flex h-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white"
                  >
                    Detayı gör
                  </Link>
                </div>
              </div>
            ) : (
              <p className="p-5 text-sm text-muted">Henüz yayınlanmış isim yok.</p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-4 px-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-primary">İlginizi çekebilecek içerikler</h2>
          <Link href="/isim-rehberi" className="text-xs font-semibold uppercase tracking-wide text-muted hover:text-primary">
            Tüm yazıları gör
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.guideArticles.slice(0, 4).map((a) => (
            <Link key={a.id} href={`/isim-rehberi/${a.slug}`} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              <div className="relative h-36">
                <MediaImage
                  src={a.cover?.url ?? "/media/placeholder.svg"}
                  alt={a.cover?.alt ?? a.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 50vw, 25vw"
                />
              </div>
              <div className="space-y-2 p-3">
                <p className="text-[0.65rem] font-semibold uppercase text-accent-pink">İsim rehberi</p>
                <p className="line-clamp-2 text-base font-semibold text-primary">{a.title}</p>
                <p className="text-sm text-muted">Devamını oku →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary">Sık sorulan sorular</h2>
            <div className="mt-4">
              <FaqAccordion items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-3xl border border-border bg-accent-pink-soft/30 p-8 text-center">
            <p className="text-4xl">💬</p>
            <p className="mt-4 font-semibold text-primary">Başka sorunuz mu var?</p>
            <p className="mt-2 text-sm text-muted">Aklınıza takılanlar için bize ulaşabilirsiniz.</p>
            <Link
              href="/iletisim"
              className="mx-auto mt-6 inline-flex rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Bize ulaşın
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border/80 bg-gradient-to-b from-violet-50/50 to-transparent py-8">
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
