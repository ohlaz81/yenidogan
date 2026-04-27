import Link from "next/link";
import type { HomePageData } from "@/lib/queries/home";
import { genderLabels, styleLabels } from "@/lib/labels";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { MediaImage } from "@/components/marketing/MediaImage";
import { NewsletterBar } from "@/components/marketing/NewsletterBar";
import { RefreshButton } from "@/components/marketing/RefreshButton";
import { FavoriteHeart } from "@/components/marketing/FavoriteHeart";
import type { FAQ } from "@/types/database";
import { babyMediaPublicUrl } from "@/lib/static/baby-media-url";
import {
  nameDisplayTextClass,
  nameGenderBadgeSmClass,
  nameMarqueeCategoryClass,
  nameMarqueeTitleClass,
  nameRandomCardHeaderGradientClass,
} from "@/lib/name-gender-styles";

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
  const heroRotatingImages = [babyMediaPublicUrl("baby(41).jpeg"), babyMediaPublicUrl("baby(42).jpeg")];

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
    <div className="space-y-6 pb-8 sm:space-y-10">
      <section className="px-4 pt-4 sm:pt-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.8rem] shadow-md shadow-primary/10">
          <div className="absolute inset-0">
            {heroRotatingImages.map((src, i) => (
              <div
                key={src}
                className="hero-cycle-slide absolute inset-0"
                style={{ animationDelay: `${i * 6}s` }}
                aria-hidden={i > 0}
              >
                <MediaImage
                  src={src}
                  alt={hero?.image?.alt ?? "Bebek ismi görseli"}
                  fill
                  className="no-organic object-cover object-center"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/82 via-white/58 to-white/15" />
          <div className="relative min-h-[22rem] px-5 py-6 sm:min-h-[29rem] sm:px-8 sm:py-8 lg:px-10">
            <div className="max-w-xl">
              <span className="inline-flex w-fit rounded-full bg-accent-pink-soft px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-accent-pink">
                Bebek isimleri
              </span>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.1] text-primary sm:mt-4 sm:text-5xl">
                {hero?.headline ? hero.headline : defaultHead}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-muted sm:mt-4 sm:text-lg">{hero?.subline ?? defaultSub}</p>
              <div className="mt-5 sm:mt-6">
                <Link
                  href={hero?.ctaHref ?? "/isim-bulucu"}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white"
                >
                  {hero?.ctaLabel ?? "İsim bulucuya git"} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-3 px-4 sm:space-y-4">
        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border/80 bg-white p-2.5 shadow-sm sm:gap-3 sm:p-3">
          <div className="rounded-xl bg-accent-pink-soft/60 px-2 py-2 text-center">
            <p className="text-xs font-bold text-accent-pink sm:text-sm">10,000+</p>
            <p className="text-[0.68rem] text-muted sm:text-xs">İsim</p>
          </div>
          <div className="rounded-xl bg-accent-blue-soft/60 px-2 py-2 text-center">
            <p className="text-xs font-bold text-accent-blue sm:text-sm">50,000+</p>
            <p className="text-[0.68rem] text-muted sm:text-xs">Mutlu Ebeveyn</p>
          </div>
          <div className="rounded-xl bg-amber-50 px-2 py-2 text-center">
            <p className="text-xs font-bold text-amber-700 sm:text-sm">Her Gün</p>
            <p className="text-[0.68rem] leading-tight text-muted sm:text-xs">Güncellenen Veritabanı</p>
          </div>
        </div>

        <div className="grid gap-3">
          {[
            {
              href: "/kiz-isimleri",
              title: "Kız isimleri",
              count: "250+ anlamlı ve güzel isim",
              img: babyMediaPublicUrl("baby (5).jpeg"),
            },
            {
              href: "/erkek-isimleri",
              title: "Erkek isimleri",
              count: "350+ modern ve özel erkek ismi",
              img: babyMediaPublicUrl("baby (3).jpeg"),
            },
          ].map((x, i) => (
            <Link
              key={x.title}
              href={x.href}
              className={`flex items-center justify-between rounded-2xl border border-border/80 px-3.5 py-3.5 shadow-sm ${
                i === 0 ? "bg-pink-50/70" : "bg-sky-50/70"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border/50 bg-white sm:h-[4.5rem] sm:w-[4.5rem]">
                  <MediaImage
                    src={x.img}
                    alt={x.title}
                    fill
                    className={
                      i === 1
                        ? "no-organic object-cover object-[50%_4%]"
                        : "no-organic object-cover object-top"
                    }
                    sizes="72px"
                  />
                </div>
                <div>
                  <p
                    className={`font-display text-lg font-semibold leading-tight sm:text-xl ${
                      i === 0 ? "text-accent-pink" : "text-accent-blue"
                    }`}
                  >
                    {x.title}
                  </p>
                  <p className="text-[0.7rem] leading-tight text-muted sm:text-xs">{x.count}</p>
                  <span className="mt-1 inline-flex rounded-full bg-primary px-2 py-1 text-[0.62rem] font-semibold text-white sm:px-2.5 sm:text-[0.65rem]">
                    TÜMÜNÜ GÖR →
                  </span>
                </div>
              </div>
              <span
                className={`hidden h-9 w-9 items-center justify-center rounded-full text-base font-semibold text-white shadow-sm sm:flex ${
                  i === 0 ? "bg-accent-pink/70" : "bg-accent-blue/70"
                }`}
                aria-hidden
              >
                ✓
              </span>
            </Link>
          ))}
        </div>

        <div>
          <h3 className="text-center text-sm font-semibold text-primary">Kategorilere Göre İsimler</h3>
          <div className="mt-2.5 grid grid-cols-4 gap-2 sm:mt-3 sm:gap-3">
            {data.quickLinks.slice(2, 6).map((q) => (
              <Link key={q.id} href={q.href} className="rounded-xl border border-border/70 bg-white px-2 py-2.5 text-center shadow-sm sm:rounded-2xl sm:px-3 sm:py-3">
                <span
                  className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-base sm:h-10 sm:w-10 sm:text-lg ${
                    quickIconBg[q.iconKey] ?? "bg-violet-100 text-violet-700"
                  }`}
                >
                  {quickIcon[q.iconKey] ?? "✦"}
                </span>
                <p className="mt-1.5 text-[0.72rem] font-semibold leading-tight text-primary sm:mt-2 sm:text-sm">{q.label}</p>
                <p className="text-[0.65rem] text-muted sm:text-xs">Keşfet →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid items-start grid-cols-1 gap-2.5 min-[500px]:grid-cols-2 min-[500px]:gap-3 sm:gap-3">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="flex items-center justify-between bg-primary px-2.5 py-2 text-white sm:px-3 sm:py-2.5">
              <span className="text-[0.65rem] font-semibold uppercase tracking-wide sm:text-sm">İsim Rehberi</span>
              <Link href="/isim-rehberi" className="text-[0.6rem] font-semibold uppercase sm:text-xs">
                Tümü
              </Link>
            </div>
            <div className="divide-y divide-border/80">
              {data.guideArticles.slice(0, 4).map((a) => (
                <Link
                  key={a.id}
                  href={`/isim-rehberi/${a.slug}`}
                  className="flex min-h-0 items-center justify-between px-2 py-1.5 text-[0.7rem] hover:bg-accent-pink-soft/40 min-[500px]:text-xs sm:px-2.5 sm:py-2 sm:text-sm"
                >
                  <span className="line-clamp-1 pr-1">{a.title}</span>
                  <span className="shrink-0" aria-hidden>
                    ›
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm">
            <div
              className={`flex items-center justify-between px-2.5 py-2 text-white sm:px-3 sm:py-2.5 ${
                data.randomName
                  ? nameRandomCardHeaderGradientClass(data.randomName.gender)
                  : "bg-gradient-to-r from-primary to-accent-pink"
              }`}
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-wide sm:text-sm">Rastgele İsim Keşfet</span>
              <RefreshButton />
            </div>
            {data.randomName ? (
              <div>
                {/* Her zaman yarım-yarım: sol metin, sağ görsel (alt-üst değil) */}
                <div className="grid min-h-[10.5rem] grid-cols-2 grid-rows-1 gap-0 min-[500px]:min-h-[12.5rem]">
                  <div className="flex min-w-0 flex-col justify-center gap-1 border-r border-border/50 p-2 pr-1.5 min-[420px]:gap-1.5 min-[420px]:p-2.5 min-[500px]:gap-2 min-[500px]:p-3 min-[500px]:pr-3">
                    <div className="flex min-w-0 items-center gap-0.5 min-[420px]:gap-1.5">
                      <h3
                        className={`font-display text-sm font-semibold leading-tight min-[420px]:text-base min-[500px]:text-lg sm:text-xl sm:leading-tight sm:text-2xl ${nameDisplayTextClass(
                          data.randomName.gender,
                        )}`}
                      >
                        {data.randomName.displayName}
                      </h3>
                      <FavoriteHeart slug={data.randomName.slug} />
                    </div>
                    <div className="flex min-w-0 flex-wrap gap-0.5 min-[420px]:gap-1 min-[500px]:gap-1.5 min-[500px]:text-sm">
                      <span className={nameGenderBadgeSmClass(data.randomName.gender)}>
                        {genderLabels[data.randomName.gender]}
                      </span>
                      <span className="rounded-full bg-violet-100 px-1.5 py-0.5 text-[0.58rem] font-medium text-violet-800 min-[420px]:px-2 min-[420px]:text-xs">
                        {styleLabels[data.randomName.style]}
                      </span>
                      <span className="max-w-full truncate rounded-full bg-amber-100 px-1.5 py-0.5 text-[0.58rem] font-medium text-amber-900 min-[420px]:px-2 min-[420px]:text-xs">
                        {data.randomName.origin}
                      </span>
                    </div>
                    <p className="line-clamp-4 min-w-0 text-[0.62rem] leading-snug text-muted min-[420px]:line-clamp-5 min-[420px]:text-xs min-[500px]:text-sm min-[500px]:leading-tight">
                      <span className="font-semibold text-foreground">Anlamı:</span> {data.randomName.meaning}
                    </p>
                  </div>
                  <div className="relative min-h-[10.5rem] w-full min-w-0 min-[500px]:min-h-0 min-[500px]:self-stretch">
                    <MediaImage
                      src={data.randomName.image?.url ?? "/media/placeholder.svg"}
                      alt={data.randomName.image?.alt ?? data.randomName.displayName}
                      fill
                      className="no-organic object-cover"
                      sizes="(max-width: 500px) 50vw, 25vw"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/10 to-transparent to-40%"
                      aria-hidden
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 border-t border-border/50 p-2.5 sm:gap-2.5 sm:p-3">
                  <button
                    type="button"
                    className="h-8 rounded-lg border border-border text-xs font-semibold text-muted min-[400px]:text-sm sm:rounded-xl"
                  >
                    Favorilere ekle
                  </button>
                  <Link
                    href={`/isim/${data.randomName.slug}`}
                    className="inline-flex h-8 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-white min-[400px]:text-sm sm:rounded-xl"
                  >
                    Detayı gör
                  </Link>
                </div>
              </div>
            ) : (
              <p className="p-3 text-sm text-muted">Henüz yayınlanmış isim yok.</p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-2.5 px-4 sm:space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-primary">Turkiyede En Populer Isimler</h2>
          <Link href="/populer-isimler" className="text-xs font-semibold text-muted hover:text-primary">
            Tümünü Gör →
          </Link>
        </div>
        {noPopularNames ? (
          <div className="rounded-2xl border border-dashed border-border/80 bg-accent-pink-soft/20 p-5 text-center text-sm text-muted">
            Henüz öne çıkarılmış isim yok.
          </div>
        ) : (
          <div className="popular-marquee-wrapper rounded-2xl border border-border/70 bg-white p-2 shadow-sm">
            <div className="popular-marquee-track">
              {popularTickerLoop.map((name, index) => (
                <Link key={`${name.id}-${index}`} href={`/isim/${name.slug}`} className="popular-mini-card group">
                  <div className="soft-photo-frame relative h-14 w-14 shrink-0">
                    <MediaImage
                      src={name.image?.url ?? "/media/placeholder.svg"}
                      alt={name.image?.alt ?? name.displayName}
                      fill
                      className="soft-photo-image object-cover"
                      sizes="56px"
                    />
                    <span className="soft-photo-vignette" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className={`${nameMarqueeTitleClass(name.gender)}`}>{name.displayName}</p>
                    <p className={nameMarqueeCategoryClass(name.category)}>{name.category}</p>
                    <p className="line-clamp-1 text-xs text-muted">{name.shortMeaning}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl space-y-3 px-4">
        <div className="grid gap-4 rounded-2xl border border-border/80 bg-white p-3 shadow-sm lg:grid-cols-[1.1fr_1fr]">
          <div
            className={`rounded-2xl p-3 ${
              data.randomName?.gender === "BOY"
                ? "bg-gradient-to-br from-violet-50 to-sky-50"
                : data.randomName?.gender === "UNISEX"
                  ? "bg-gradient-to-br from-violet-50 to-zinc-100"
                  : "bg-gradient-to-br from-violet-50 to-pink-50"
            }`}
          >
            <p className={`text-xs font-semibold ${nameDisplayTextClass(data.randomName?.gender ?? "GIRL")}`}>
              Bugünün İsmi
            </p>
            <div className="mt-2 flex items-start gap-3">
              <div className="relative h-20 w-20 overflow-hidden rounded-xl">
                <MediaImage
                  src={data.randomName?.image?.url ?? "/media/hero-soft.svg"}
                  alt={data.randomName?.displayName ?? "Bugünün ismi"}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0">
                <p className={`font-display text-3xl ${nameDisplayTextClass(data.randomName?.gender ?? "GIRL")}`}>
                  {data.randomName?.displayName ?? "Elif"}
                </p>
                <p className="mt-1 text-xs text-muted">
                  <span className="font-semibold text-foreground">Anlam:</span> {data.randomName?.meaning ?? "Nazik, başlangıç"}
                </p>
                <Link
                  href={data.randomName ? `/isim/${data.randomName.slug}` : "/isim-bulucu"}
                  className="mt-2 inline-flex rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Detayı Gör →
                </Link>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border/70 bg-white p-3">
            <p className="font-semibold text-primary">İsim Seçim Rehberi</p>
            <div className="mt-2 space-y-2">
              {faqs.slice(0, 4).map((f) => (
                <Link key={f.id} href="/sss" className="flex items-center justify-between rounded-lg bg-violet-50/70 px-3 py-2 text-sm">
                  <span className="line-clamp-1">{f.question}</span>
                  <span>+</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto hidden max-w-6xl px-4 sm:block">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-primary">Sık sorulan sorular</h2>
            <div className="mt-4">
              <FaqAccordion items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
            </div>
          </div>
          <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-border p-8 text-center">
            <div className="absolute inset-0">
              <MediaImage
                src={babyMediaPublicUrl("baby (4).jpeg")}
                alt="Başka sorunuz mu var alanı görseli"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-white/80" />
            <p className="relative text-4xl">💬</p>
            <p className="relative mt-4 font-semibold text-primary">Başka sorunuz mu var?</p>
            <p className="relative mt-2 text-sm text-muted">Aklınıza takılanlar için bize ulaşabilirsiniz.</p>
            <Link
              href="/iletisim"
              className="relative mx-auto mt-6 inline-flex rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Bize ulaşın
            </Link>
          </div>
        </div>
      </section>

      <NewsletterBar />
    </div>
  );
}
