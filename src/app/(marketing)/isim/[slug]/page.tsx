import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStaticGuides } from "@/data/static-guide";
import { getNameBySlug, getNamesByLetter, getPublishedNameSlugs, getSecondNameSuggestions } from "@/lib/queries/names";
import { genderLabels, styleLabels } from "@/lib/labels";
import { canonicalUrl } from "@/lib/site";
import {
  nameCtaOutlineButtonClass,
  nameCtaStripClass,
  nameDisplayTextClass,
  nameGenderBadgeLgClass,
  nameHeroSectionClass,
  nameMeaningCardBgClass,
  nameSimilarPillClass,
  nameTraitCheckClass,
} from "@/lib/name-gender-styles";
import { Breadcrumb } from "@/components/marketing/Breadcrumb";
import { FavoriteHeart } from "@/components/marketing/FavoriteHeart";
import { InstagramFollowCard } from "@/components/marketing/InstagramFollowCard";
import { MediaImage } from "@/components/marketing/MediaImage";
import { NameCard } from "@/components/marketing/NameCard";
import { NameComments } from "@/components/marketing/NameComments";
import { NameVote } from "@/components/marketing/NameVote";
import { ShareButton } from "@/components/marketing/ShareButton";
import { SiblingNameSuggestions } from "@/components/marketing/SiblingNameSuggestions";
import { Stars } from "@/components/marketing/Stars";
import { NAME_OG_IMAGE_SIZE } from "@/lib/name-og-image-config";
import { normalizeNameSlug } from "@/lib/slug";
import {
  JsonLd,
  breadcrumbListSchema,
  nameEntitySchema,
  schemaGraph,
  webPageSchema,
} from "@/lib/json-ld";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPublishedNameSlugs();
  return Array.from(new Set(slugs.map(normalizeNameSlug).filter(Boolean))).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = normalizeNameSlug((await params).slug);
  const n = await getNameBySlug(slug);
  if (!n) return { title: "İsim bulunamadı" };
  const title = `${n.displayName} isminin anlamı`;
  const description = `${n.displayName}: ${n.meaning} (${n.origin})`;
  const url = canonicalUrl(`/isim/${n.slug}`);
  const ogImage = canonicalUrl(`/isim/${n.slug}/opengraph-image`);
  const twitterImage = canonicalUrl(`/isim/${n.slug}/twitter-image`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: ogImage,
          width: NAME_OG_IMAGE_SIZE.width,
          height: NAME_OG_IMAGE_SIZE.height,
          alt: `${n.displayName} isminin anlamı - Yenidoğan.net`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: twitterImage,
          width: NAME_OG_IMAGE_SIZE.width,
          height: NAME_OG_IMAGE_SIZE.height,
          alt: `${n.displayName} isminin anlamı - Yenidoğan.net`,
        },
      ],
    },
  };
}

export default async function NameDetailPage({ params }: Props) {
  const slug = normalizeNameSlug((await params).slug);
  const name = await getNameBySlug(slug);
  if (!name) notFound();

  const canonical = canonicalUrl(`/isim/${name.slug}`);

  const traits = Array.isArray(name.traits)
    ? (name.traits as unknown[]).filter((t): t is string => typeof t === "string")
    : [];

  const similar = name.similarFrom.map((s) => s.target);
  const [sameLetter, secondNameSuggestions] = await Promise.all([
    getNamesByLetter(name.firstLetter, name.gender, 8),
    getSecondNameSuggestions(name, 10),
  ]);
  const others = sameLetter.filter((n) => n.id !== name.id && !similar.some((s) => s.id === n.id)).slice(0, 6);

  const guides = getStaticGuides().slice(0, 3);

  const genderPath = name.gender === "GIRL" ? "/kiz-isimleri" : name.gender === "BOY" ? "/erkek-isimleri" : "/tum-isimleri";
  const genderCrumb =
    name.gender === "GIRL" ? "Kız isimleri" : name.gender === "BOY" ? "Erkek isimleri" : "Tüm isimler";
  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: genderCrumb, href: genderPath },
    { label: `${name.displayName} isminin anlamı` },
  ];
  const breadcrumb = breadcrumbListSchema(breadcrumbItems, canonical);
  const entity = nameEntitySchema({ name, url: canonical, traits });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd
        data={schemaGraph([
          webPageSchema({
            url: canonical,
            name: `${name.displayName} isminin anlamı`,
            description: `${name.displayName}: ${name.meaning} (${name.origin})`,
            breadcrumbId: `${canonical}#breadcrumb`,
            aboutId: `${canonical}#defined-term`,
          }),
          breadcrumb,
          entity,
        ])}
      />
      <Breadcrumb items={breadcrumbItems} />

      <section
        className={`mt-8 grid gap-8 overflow-hidden rounded-3xl border border-border p-6 lg:grid-cols-[1fr_220px] lg:items-center ${nameHeroSectionClass(name.gender)}`}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className={`font-display text-4xl font-semibold ${nameDisplayTextClass(name.gender)}`}>{name.displayName}</h1>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className={nameGenderBadgeLgClass(name.gender)}>{genderLabels[name.gender]}</span>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-violet-800">{styleLabels[name.style]}</span>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-800">{name.origin}</span>
          </div>
          {name.intro && <p className="text-sm leading-relaxed text-muted">{name.intro}</p>}
          <div className="grid min-h-[84px] grid-cols-4 overflow-hidden rounded-2xl border border-border bg-white shadow-sm sm:min-h-0 sm:w-fit sm:flex sm:flex-wrap sm:items-center sm:gap-3 sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent sm:shadow-none">
            <FavoriteHeart slug={name.slug} variant="action" />
            <NameVote slug={name.slug} />
            <ShareButton title={name.displayName} text={name.meaning} url={canonical} variant="action" />
          </div>
        </div>
        <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-lg lg:mx-0 lg:h-56 lg:w-56">
          <MediaImage
            src={name.image?.url ?? "/media/placeholder.svg"}
            alt={name.image?.alt ?? name.displayName}
            fill
            className="object-cover"
            sizes="224px"
          />
        </div>
      </section>

      <section className="mt-8 space-y-4 sm:hidden">
        <div className="rounded-3xl border border-pink-100 bg-pink-50/70 p-6 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-pink-soft text-accent-pink"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
                <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" />
              </svg>
            </span>
            <p className="text-xs font-semibold tracking-wide text-accent-pink">Anlamı</p>
          </div>
          <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">{name.meaning}</p>
        </div>

        <div className="grid grid-cols-4 overflow-hidden rounded-3xl border border-violet-100 bg-white px-1 py-5 shadow-sm">
          <div className="flex min-w-0 flex-col items-center px-1 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M19.5 4.5C12 4.6 7.2 8.1 6.4 13.2c-.5 3.1 1.6 5.5 4.7 5.1 5.2-.7 8.3-6.1 8.4-13.8Z" />
                <path d="M5 20c2.7-4.4 6.1-7.6 10.4-9.8" />
              </svg>
            </span>
            <p className="mt-2.5 text-[0.8rem] font-semibold leading-tight text-emerald-700">Köken</p>
            <p className="mt-1.5 w-full break-words text-sm font-semibold leading-tight text-foreground">
              {name.origin}
            </p>
          </div>
          <div className="flex min-w-0 flex-col items-center border-l border-border px-1 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-sky-100 text-sky-700" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M4 18 8.5 6 13 18M5.5 14h6" />
                <path d="M15 10h5M17.5 7.5v5" />
              </svg>
            </span>
            <p className="mt-2.5 text-[0.8rem] font-semibold leading-tight text-sky-700">Okunuş</p>
            <p className="mt-1.5 w-full break-words text-sm font-semibold leading-tight text-foreground">
              {name.pronunciation}
            </p>
          </div>
          <div className="flex min-w-0 flex-col items-center border-l border-border px-0.5 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-violet-100 text-violet-700" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="m12 3 2.2 4.5 5 .7-3.6 3.5.8 5-4.4-2.3-4.4 2.3.8-5-3.6-3.5 5-.7L12 3Z" />
              </svg>
            </span>
            <p className="mt-2.5 text-[0.75rem] font-semibold leading-tight text-violet-700">Popülerlik</p>
            <div className="mt-1.5 scale-[0.82] whitespace-nowrap text-sm font-medium leading-none text-foreground min-[360px]:scale-90">
              <Stars value={name.popularity} />
            </div>
          </div>
          <div className="flex min-w-0 flex-col items-center border-l border-border px-1 text-center">
            <span
              className={`flex size-14 items-center justify-center rounded-full ${nameDisplayTextClass(name.gender)} ${
                name.gender === "GIRL"
                  ? "bg-accent-pink-soft"
                  : name.gender === "BOY"
                    ? "bg-accent-blue-soft"
                    : "bg-purple-100"
              }`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="12" cy="8" r="3" />
                <path d="M6.5 19c.5-3.3 2.4-5 5.5-5s5 1.7 5.5 5" />
              </svg>
            </span>
            <p className={`mt-2.5 text-[0.8rem] font-semibold leading-tight ${nameDisplayTextClass(name.gender)}`}>
              Cinsiyet
            </p>
            <p
              className={`mt-1.5 w-full break-words text-sm font-semibold leading-tight ${nameDisplayTextClass(name.gender)}`}
            >
              {genderLabels[name.gender]}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-amber-200/70 bg-amber-50/80 p-6 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 4h11a3 3 0 0 1 3 3v13H7a2 2 0 0 1-2-2V4Z" />
                <path d="M5 17.5A2.5 2.5 0 0 1 7.5 15H19M9 7h6" />
              </svg>
            </span>
            <p className="text-xs font-semibold tracking-wide text-amber-700">Kur’an’da geçiyor mu?</p>
          </div>
          <p className="mt-2 text-sm font-medium text-foreground">
            {name.inQuran ? "Evet" : "Hayır, geçmemektedir"}
          </p>
          {name.inQuran ? (
            <>
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted">Nerede / kısa not</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                {name.quranReference?.trim() ? name.quranReference.trim() : "—"}
              </p>
            </>
          ) : null}
        </div>
      </section>

      <section className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        <div className={`rounded-2xl border border-border p-4 shadow-sm ${nameMeaningCardBgClass(name.gender)}`}>
          <p className="text-xs font-bold uppercase tracking-wide text-muted">📖 Anlamı</p>
          <p className="mt-2 text-sm font-medium text-foreground">{name.meaning}</p>
        </div>
        <div className="rounded-2xl border border-border bg-violet-50 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">🌿 Kökeni</p>
          <p className="mt-2 text-sm font-medium text-foreground">{name.origin}</p>
        </div>
        <div className="rounded-2xl border border-border bg-amber-50 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">📒 Kur’an’da geçiyor mu?</p>
          <p className="mt-2 text-sm font-medium text-foreground">
            {name.inQuran ? "Evet" : "Hayır, geçmemektedir"}
          </p>
          {name.inQuran ? (
            <>
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted">Nerede / kısa not</p>
              <p className="mt-1 text-sm text-foreground/90">
                {name.quranReference?.trim() ? name.quranReference.trim() : "—"}
              </p>
            </>
          ) : null}
        </div>
        <div className="rounded-2xl border border-border bg-sky-50 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">🔤 Okunuşu</p>
          <p className="mt-2 text-sm font-medium text-foreground">{name.pronunciation}</p>
        </div>
        <div className="rounded-2xl border border-border bg-emerald-50 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">👥 Popülerlik</p>
          <div className="mt-2 text-sm font-medium text-foreground">
            <Stars value={name.popularity} gender={name.gender} />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-purple-50 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">📅 Cinsiyeti</p>
          <p className={`mt-2 text-sm font-medium ${nameDisplayTextClass(name.gender)}`}>{genderLabels[name.gender]}</p>
        </div>
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-xl font-semibold text-primary">
            <span className={nameDisplayTextClass(name.gender)}>{name.displayName}</span> isminin özellikleri
          </h2>
          <span className={`mt-2 block h-0.5 w-14 rounded-full ${name.gender === "BOY" ? "bg-accent-blue" : "bg-accent-pink"}`} />
          {traits.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2.5 text-[0.9375rem] text-muted">
              {traits.map((t) => (
                <li key={t} className="flex min-h-10 w-fit max-w-full items-center gap-2 rounded-full border border-pink-100 bg-white px-4 py-2 shadow-sm sm:min-h-0 sm:px-3 sm:py-1.5">
                  <span className={`text-xs ${nameTraitCheckClass(name.gender)}`}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted">Özellik maddeleri yakında güncellenecek.</p>
          )}
        </section>
        <section className="space-y-6">
          {similar.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-semibold text-primary">Benzer isimler</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {similar.map((s) => (
                  <Link key={s.id} href={`/isim/${s.slug}`} className={nameSimilarPillClass(s.gender)}>
                    {s.displayName}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      <SiblingNameSuggestions name={name} />

      {secondNameSuggestions.length > 0 ? (
        <section className="mt-8 sm:mt-10">
          <h2 className="font-display text-xl font-semibold text-primary">
            {name.displayName} için ikinci isim önerileri
          </h2>
          <span className="mt-2 block h-0.5 w-12 rounded-full bg-violet-400" />
          <div className="mt-3 flex flex-wrap gap-2">
            {secondNameSuggestions.map((suggestion) => (
              <Link
                key={suggestion.id}
                href={`/isim/${suggestion.slug}`}
                className="rounded-full border border-violet-100 bg-violet-50/60 px-3 py-1.5 text-sm shadow-sm transition hover:bg-violet-50 hover:underline active:bg-violet-100/70"
              >
                <span className={`font-bold ${nameDisplayTextClass(name.gender)}`}>{name.displayName}</span>{" "}
                <span className="font-semibold text-slate-800">{suggestion.displayName}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <NameComments slug={name.slug} />

      <InstagramFollowCard />

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-primary">
            {name.firstLetter} harfi ile başlayan diğer {genderLabels[name.gender].toLowerCase()}leri
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((n) => (
              <NameCard key={n.id} name={n} />
            ))}
          </div>
        </section>
      )}

      {guides.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-primary">İlginizi çekebilir</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {guides.map((g) => (
              <li key={g.id}>
                <Link href={`/isim-rehberi/${g.slug}`} className="font-medium text-accent-pink hover:underline">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section
        className={`mt-12 flex flex-col items-center gap-4 rounded-3xl border border-border p-8 text-center sm:flex-row sm:justify-between sm:text-left ${nameCtaStripClass(name.gender)}`}
      >
        <div>
          <p className="font-semibold text-primary">Bu isim hoşunuza gitti mi?</p>
          <p className="text-sm text-muted">Favorilerinize ekleyin veya diğer isimlere göz atın.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={genderPath}
            className={nameCtaOutlineButtonClass(name.gender)}
          >
            Diğer isimler
          </Link>
          <Link
            href="/isim-bulucu"
            className="rounded-2xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
          >
            İsim bulucu →
          </Link>
        </div>
      </section>
    </div>
  );
}
