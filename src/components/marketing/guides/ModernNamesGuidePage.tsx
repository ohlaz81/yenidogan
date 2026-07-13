import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/marketing/Breadcrumb";
import {
  JsonLd,
  breadcrumbListSchema,
  faqPageSchema,
  schemaGraph,
  webPageSchema,
} from "@/lib/json-ld";
import { canonicalUrl, site } from "@/lib/site";
import type { ModernGuideName, ModernNamesGuide } from "@/data/modern-name-guides";

type Accent = ModernNamesGuide["accent"];

const styleLabel = {
  MODERN: "Modern",
  POPULAR: "Popüler",
  RARE: "Farklı",
  CLASSIC: "Zamansız",
} as const;

const relatedGuides = [
  { title: "Kız İsimleri", href: "/kiz-isimleri", tone: "pink" },
  { title: "Erkek İsimleri", href: "/erkek-isimleri", tone: "blue" },
  { title: "En Anlamlı 100 Kız Bebek İsmi", href: "/rehber/en-anlamli-100-kiz-bebek-ismi", tone: "pink" },
  { title: "En Anlamlı 100 Erkek Bebek İsmi", href: "/rehber/en-anlamli-100-erkek-bebek-ismi", tone: "blue" },
  { title: "Anlamlı Bebek İsimleri", href: "/anlami-guzel-isimler", tone: "neutral" },
  { title: "Son Dönemlerde Trend Olan Bebek İsimleri (2026)", href: "/rehber/trend-bebek-isimleri-2026", tone: "neutral" },
] as const;

export function modernGuideMetadata(guide: ModernNamesGuide): Metadata {
  const pageUrl = canonicalUrl(guide.pagePath);
  const image = {
    url: canonicalUrl(guide.coverSrc),
    width: 1200,
    height: 675,
    alt: guide.coverAlt,
  };

  return {
    title: guide.metaTitle,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: guide.metaTitle,
      description: guide.description,
      url: pageUrl,
      siteName: site.name,
      locale: "tr_TR",
      type: "article",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle,
      description: guide.description,
      images: [image.url],
    },
  };
}

function accentClasses(accent: Accent) {
  if (accent === "blue") {
    return {
      eyebrow: "text-accent-blue",
      sectionBorder: "border-sky-100",
      sectionBg: "bg-sky-50/60",
      softBg: "bg-sky-50/70",
      card: "border-sky-100 bg-sky-50/70",
      badge: "bg-white text-accent-blue ring-sky-100",
      cta: "border-sky-100 bg-sky-50 text-accent-blue",
      link: "text-accent-blue hover:text-accent-blue/80",
    };
  }

  return {
    eyebrow: "text-accent-pink",
    sectionBorder: "border-pink-100",
    sectionBg: "bg-pink-50/60",
    softBg: "bg-pink-50/70",
    card: "border-pink-100 bg-pink-50/70",
    badge: "bg-white text-accent-pink ring-pink-100",
    cta: "border-pink-100 bg-pink-50 text-accent-pink",
    link: "text-accent-pink hover:text-accent-pink/80",
  };
}

function sectionCopy(guide: ModernNamesGuide) {
  if (guide.accent === "blue") {
    return {
      databaseNote:
        "Bu erkek isimleri Yenidoğan.net veritabanındaki yayındaki kayıtlardan seçildi. Her karttan ilgili adın detay sayfasına geçebilir; anlam, köken, telaffuz ve benzer önerileri aynı yerde inceleyebilirsiniz.",
      featuredIntro:
        "Erkek isimleri içinde kısa, tok ve anlamı güçlü duran bazı seçenekler ailelerin ilk eleme listesine daha hızlı girebilir. Aşağıdaki adlar kesin bir sıralama değil; farklı karakterdeki modern erkek isimlerini hızlı karşılaştırmanız için hazırlanmış editoryal bir özet niteliğindedir.",
      widerList: "Erkek isimlerini daha geniş bir havuzda görmek için",
      meaningList: "anlamı güçlü adları ayrıca süzmek isterseniz",
    };
  }

  return {
    databaseNote:
      "Bu kız isimleri Yenidoğan.net veritabanındaki yayındaki kayıtlardan seçildi. Kartlardan isim detaylarına geçerek anlam, köken, telaffuz ve benzer önerileri ayrı ayrı kontrol edebilirsiniz.",
    featuredIntro:
      "Kız isimleri arasında zarif sesi, kısa yapısı veya olumlu anlamıyla ilk kısa listeye alınabilecek seçenekler aşağıda öne çıkarıldı. Bu alan bir popülerlik sırası değil; farklı tarzları yorulmadan karşılaştırmanız için hazırlanmış editoryal bir seçkidir.",
    widerList: "Kız isimlerini daha geniş bir havuzda görmek için",
    meaningList: "anlam odaklı seçenekleri ayrıca süzmek isterseniz",
  };
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-display text-2xl font-semibold text-primary">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-muted">{children}</div>
    </section>
  );
}

function InlineGuideLink({
  href,
  children,
  accent,
}: {
  href: string;
  children: React.ReactNode;
  accent: Accent;
}) {
  return (
    <Link href={href} className={`${accentClasses(accent).link} font-semibold hover:underline`}>
      {children}
    </Link>
  );
}

function traitText(item: ModernGuideName) {
  const traits = Array.isArray(item.traits) ? item.traits.filter((trait): trait is string => typeof trait === "string") : [];
  if (traits.length === 0) {
    return `${item.displayName}, anlamı ve sade söyleyişi birlikte değerlendirildiğinde kısa listeye alınabilecek dengeli bir isimdir.`;
  }

  return `${traits.slice(0, 3).join(", ")} çağrışımlarıyla ${item.displayName}, hem anlam hem kullanım hissi bakımından değerlendirilebilir.`;
}

function NameCards({ guide }: { guide: ModernNamesGuide }) {
  const classes = accentClasses(guide.accent);

  return (
    <div className="grid gap-3">
      {guide.names.map((item, index) => (
        <article key={item.slug} className={`rounded-xl border p-4 shadow-sm ${classes.card}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-primary">
              <span className="mr-2 text-sm font-semibold text-muted">{index + 1}.</span>
              <Link href={`/isim/${item.slug}`} className={`transition hover:underline ${classes.link}`}>
                {item.displayName}
              </Link>
            </h3>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${classes.badge}`}>
              {styleLabel[item.style]}
            </span>
          </div>
          <div className="mt-3 grid min-w-0 gap-2 text-sm leading-7 text-muted sm:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)]">
            <p className="min-w-0 break-words">
              <strong className="font-semibold text-primary">Anlamı:</strong> {item.meaning}
            </p>
            <p className="min-w-0 break-words">
              <strong className="font-semibold text-primary">Kökeni:</strong> {item.origin}
            </p>
          </div>
          <p className="mt-2 break-words text-sm leading-7 text-muted">{traitText(item)}</p>
        </article>
      ))}
    </div>
  );
}

function RelatedGuides({ accent }: { accent: Accent }) {
  return (
    <section id="benzer-rehberler" className="scroll-mt-24">
      <h2 className="font-display text-2xl font-semibold text-primary">Benzer rehberler</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {relatedGuides.map((item) => {
          const tone =
            item.tone === "pink"
              ? "border-pink-100 bg-pink-50/60 text-accent-pink"
              : item.tone === "blue"
                ? "border-sky-100 bg-sky-50/70 text-accent-blue"
                : `border-border bg-white ${accentClasses(accent).link}`;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl border p-4 text-sm font-semibold shadow-sm transition hover:border-primary/30 hover:bg-muted/10 ${tone}`}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function ModernNamesGuidePage({ guide }: { guide: ModernNamesGuide }) {
  const pageUrl = canonicalUrl(guide.pagePath);
  const classes = accentClasses(guide.accent);
  const copy = sectionCopy(guide);
  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "Rehber", href: "/isim-rehberi" },
    { label: guide.title },
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd
        data={schemaGraph([
          webPageSchema({
            url: pageUrl,
            name: guide.title,
            description: guide.description,
            breadcrumbId: `${pageUrl}#breadcrumb`,
            aboutId: `${pageUrl}#article`,
          }),
          breadcrumbListSchema(breadcrumbItems, pageUrl),
          {
            "@type": "Article",
            "@id": `${pageUrl}#article`,
            url: pageUrl,
            headline: guide.title,
            description: guide.description,
            image: canonicalUrl(guide.coverSrc),
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
            author: { "@type": "Organization", name: site.name, url: canonicalUrl("/") },
            publisher: { "@type": "Organization", name: site.name, url: canonicalUrl("/") },
            mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
            inLanguage: "tr-TR",
          },
          faqPageSchema(guide.faqs, pageUrl),
        ])}
      />

      <Breadcrumb items={breadcrumbItems} />

      <header className="mt-8">
        <p className={`text-xs font-bold uppercase tracking-wide ${classes.eyebrow}`}>Bebek isimleri rehberi</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-primary sm:text-5xl">
          {guide.title}
        </h1>
        <div className="relative mt-6 mb-8 overflow-hidden rounded-2xl border border-border bg-white shadow-lg">
          <Image
            src={guide.coverSrc}
            alt={guide.coverAlt}
            width={1200}
            height={675}
            priority
            loading="eager"
            className="h-auto w-full"
          />
        </div>
        <div className="mt-4 max-w-3xl space-y-3 text-lg leading-8 text-muted">
          {guide.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </header>

      <nav
        aria-label="Sayfa bölümleri"
        className="mt-8 grid gap-2 rounded-2xl border border-border bg-white p-4 text-sm shadow-sm sm:grid-cols-2"
      >
        {[
          ["Modern isim nedir?", "modern-isim-nedir"],
          ["Modern isimler neden tercih ediliyor?", "neden-tercih-ediliyor"],
          ["İsim seçerken dikkat edilmesi gerekenler", "isim-secerken-dikkat"],
          ["Modern isimlerin özellikleri", "modern-isimlerin-ozellikleri"],
          ["2026 isim trendleri", "2026-isim-trendleri"],
          [`150 modern ${guide.genderLabel.toLocaleLowerCase("tr-TR")} bebek ismi`, "150-isim-listesi"],
          ["Öne çıkan isim önerileri", "one-cikan-isimler"],
          ["Sık Sorulan Sorular", "sik-sorulan-sorular"],
          ["Sonuç", "sonuc"],
          ["Benzer rehberler", "benzer-rehberler"],
        ].map(([label, id]) => (
          <a key={id} href={`#${id}`} className="rounded-lg px-3 py-2 text-muted transition hover:bg-muted/10 hover:text-primary">
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-12">
        <Section id="modern-isim-nedir" title="Modern isim nedir?">
          {guide.modernDefinition.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            Daha geniş bir araştırma için{" "}
            <InlineGuideLink href="/modern-isimler" accent={guide.accent}>modern isimler</InlineGuideLink>,{" "}
            <InlineGuideLink href="/populer-isimler" accent={guide.accent}>popüler bebek isimleri</InlineGuideLink>{" "}
            ve <InlineGuideLink href="/anlami-guzel-isimler" accent={guide.accent}>anlamlı bebek isimleri</InlineGuideLink>{" "}
            sayfalarını birlikte değerlendirebilirsiniz.
          </p>
        </Section>

        <Section id="neden-tercih-ediliyor" title="Modern isimler neden tercih ediliyor?">
          {guide.preferenceReasons.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>

        <Section id="isim-secerken-dikkat" title="İsim seçerken dikkat edilmesi gerekenler">
          <div className="grid gap-3 sm:grid-cols-2">
            {guide.selectionAdvice.map((item) => (
              <div key={item} className="rounded-xl border border-border bg-white p-4 text-sm leading-7 text-muted shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </Section>

        <Section id="modern-isimlerin-ozellikleri" title="Modern isimlerin özellikleri">
          <div className="grid gap-3 sm:grid-cols-2">
            {guide.modernTraits.map((item) => (
              <div key={item} className={`rounded-xl border p-4 text-sm leading-7 shadow-sm ${classes.card}`}>
                {item}
              </div>
            ))}
          </div>
        </Section>

        <Section id="2026-isim-trendleri" title="2026 isim trendleri">
          {guide.trendParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>

        <section id="150-isim-listesi" className={`scroll-mt-24 rounded-2xl border bg-white p-5 shadow-sm ${classes.sectionBorder}`}>
          <div className={`mb-5 rounded-xl p-4 ${classes.sectionBg}`}>
            <p className={`text-xs font-bold uppercase tracking-wide ${classes.eyebrow}`}>
              {guide.genderLabel} bebek isimleri
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-primary">
              150 modern {guide.genderLabel.toLocaleLowerCase("tr-TR")} bebek ismi
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-muted">
              {copy.databaseNote}
            </p>
          </div>
          <NameCards guide={guide} />
        </section>

        <Section id="one-cikan-isimler" title="Öne çıkan isim önerileri">
          <p>
            {copy.featuredIntro}
          </p>
          <div className="flex flex-wrap gap-2">
            {guide.featuredNames.map((name) => {
              const item = guide.names.find((entry) => entry.displayName === name);
              if (!item) return null;

              return (
                <Link
                  key={item.slug}
                  href={`/isim/${item.slug}`}
                  className={`rounded-full bg-white px-3 py-2 text-sm font-semibold ring-1 transition hover:underline ${classes.badge}`}
                >
                  {item.displayName}
                </Link>
              );
            })}
          </div>
        </Section>

        <section className={`scroll-mt-24 rounded-2xl border p-5 shadow-sm ${classes.cta}`}>
          <h2 className="font-display text-2xl font-semibold text-primary">İsim seçme tavsiyeleri</h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-muted">
            {guide.finalAdvice.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              {copy.widerList}{" "}
              {guide.accent === "pink" ? (
                <InlineGuideLink href="/kiz-isimleri" accent={guide.accent}>kız isimleri</InlineGuideLink>
              ) : (
                <InlineGuideLink href="/erkek-isimleri" accent={guide.accent}>erkek isimleri</InlineGuideLink>
              )}{" "}
              sayfasına geçebilir, {copy.meaningList}{" "}
              <InlineGuideLink href="/anlami-guzel-isimler" accent={guide.accent}>anlamlı isimler</InlineGuideLink>{" "}
              listesini de kullanabilirsiniz.
            </p>
          </div>
        </section>

        <section id="sik-sorulan-sorular" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-semibold text-primary">Sık Sorulan Sorular</h2>
          <div className="mt-4 space-y-3">
            {guide.faqs.map((faq) => (
              <details key={faq.id} className="group rounded-xl border border-border bg-white p-4 shadow-sm">
                <summary className="cursor-pointer list-none font-semibold text-primary">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <Section id="sonuc" title="Sonuç">
          {guide.conclusion.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>

        <RelatedGuides accent={guide.accent} />
      </div>
    </article>
  );
}
