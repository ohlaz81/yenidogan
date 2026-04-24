import Link from "next/link";
import { getSupabase } from "@/lib/supabase/admin";
import { getHomePageData } from "@/lib/queries/home";
import { genderLabels, styleLabels, toneClass } from "@/lib/labels";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { MediaImage } from "@/components/marketing/MediaImage";
import { NameCard } from "@/components/marketing/NameCard";
import { NewsletterBar } from "@/components/marketing/NewsletterBar";
import { RefreshButton } from "@/components/marketing/RefreshButton";
import { FavoriteHeart } from "@/components/marketing/FavoriteHeart";

const quickIcon: Record<string, string> = {
  girl: "👧🏻",
  boy: "👦🏻",
  quran: "📖",
  star: "⭐",
  search: "⌕",
  heart: "♥",
};

export default async function HomePage() {
  const s = getSupabase();
  const [data, fr] = await Promise.all([
    getHomePageData(),
    s.from("FAQ").select("*").order("sortOrder", { ascending: true }),
  ]);
  if (fr.error) throw fr.error;
  const faqs = fr.data ?? [];

  const hero = data.heroSlides[0];
  const heroImg = hero?.image?.url ?? "/media/placeholder.svg";

  return (
    <div>
      <section className="relative min-h-[420px] overflow-hidden bg-[#2d1b4e] text-white">
        <div className="absolute inset-0 opacity-40">
          <MediaImage src={heroImg} alt={hero?.image?.alt ?? ""} fill className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d1b4e] via-[#2d1b4e]/85 to-transparent" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 lg:flex-row lg:items-center lg:py-24">
          <div className="max-w-xl space-y-4">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-pink-100">
              Bebek isimleri
            </span>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {hero?.headline ?? "Bebeğiniz için en doğru ismi bulun"}
            </h1>
            <p className="text-lg text-violet-100">
              {hero?.subline ??
                "Anlamları, kökenleri ve özellikleriyle kız ve erkek isimlerini keşfedin; rehber yazılarıyla seçiminizi kolaylaştırın."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={hero?.ctaHref ?? "/isim-bulucu"}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-bold text-primary shadow-lg transition hover:bg-accent-pink-soft"
              >
                {hero?.ctaLabel ?? "İsim bulucuya git"} →
              </Link>
              <Link
                href="/kiz-isimleri"
                className="inline-flex items-center justify-center rounded-2xl border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Kız isimleri
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-8 px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 rounded-3xl border border-border bg-card p-4 shadow-lg sm:grid-cols-3 lg:grid-cols-6">
          {data.quickLinks.map((q) => (
            <Link
              key={q.id}
              href={q.href}
              className="flex flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center text-xs font-semibold text-primary transition hover:bg-accent-pink-soft"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-2xl">
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
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-accent-pink">Kız</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.featuredGirlSlots
                .map((s) => s.name)
                .filter(Boolean)
                .map((name) => (
                  <NameCard key={name!.id} name={name!} />
                ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-accent-blue">Erkek</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.featuredBoySlots
                .map((s) => s.name)
                .filter(Boolean)
                .map((name) => (
                  <NameCard key={name!.id} name={name!} />
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <h2 className="font-display text-2xl font-semibold text-primary">İsim kategorileri</h2>
        <p className="mb-6 text-sm text-muted">Görsel kartlarla hızlı gezinti</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.showcases.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
            >
              <div className="relative h-44 w-full">
                <MediaImage
                  src={c.image?.url ?? "/media/placeholder.svg"}
                  alt={c.image?.alt ?? c.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${toneClass(c.tagTone)}`}
                >
                  {c.tagLabel}
                </span>
              </div>
              <div className="space-y-1 p-4">
                <p className="font-display text-lg font-semibold text-primary">{c.title}</p>
                {c.subtitle && <p className="text-sm text-muted">{c.subtitle}</p>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between rounded-t-2xl bg-primary px-4 py-3 text-primary-foreground">
              <span className="text-sm font-bold tracking-wide">İsim rehberi</span>
              <Link href="/isim-rehberi" className="text-xs font-semibold hover:underline">
                Tümü →
              </Link>
            </div>
            <div className="divide-y divide-border rounded-b-2xl border border-t-0 border-border bg-card">
              {data.guideArticles.map((a) => (
                <Link
                  key={a.id}
                  href={`/isim-rehberi/${a.slug}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium hover:bg-accent-pink-soft/40"
                >
                  <span>{a.title}</span>
                  <span className="text-muted">›</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
              <span className="text-sm font-bold tracking-wide">Rastgele isim keşfet</span>
              <RefreshButton />
            </div>
            {data.randomName ? (
              <div className="space-y-4 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-3xl font-semibold text-accent-pink">{data.randomName.displayName}</h3>
                  <FavoriteHeart slug={data.randomName.slug} />
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-accent-pink-soft px-3 py-1 text-accent-pink">
                    {genderLabels[data.randomName.gender]}
                  </span>
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-violet-800">
                    {styleLabels[data.randomName.style]}
                  </span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-900">{data.randomName.origin}</span>
                </div>
                <p className="text-sm text-muted">
                  <span className="font-semibold text-foreground">Anlamı:</span> {data.randomName.meaning}
                </p>
                <Link
                  href={`/isim/${data.randomName.slug}`}
                  className="inline-flex rounded-xl bg-accent-pink px-5 py-2 text-sm font-semibold text-white shadow-sm"
                >
                  Detayı gör →
                </Link>
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

      <section className="border-t border-border bg-violet-50/40 py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Geniş arşiv", d: "Anlamlı isimler sürekli güncellenir." },
            { t: "Detaylı bilgi", d: "Köken, okunuş ve özellikler tek sayfada." },
            { t: "Güvenilir içerik", d: "Editoryal kontrol ve şeffaf kaynaklar." },
            { t: "Mobil uyumlu", d: "Hızlı filtreler ve okunaklı kartlar." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <p className="font-semibold text-primary">{x.t}</p>
              <p className="mt-2 text-sm text-muted">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <NewsletterBar />
    </div>
  );
}
