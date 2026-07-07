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

type Accent = "pink" | "blue";

export type MeaningfulName = {
  name: string;
  slug: string;
  meaning: string;
  origin: string;
  note: string;
};

type FAQItem = {
  id: string;
  sortOrder: number;
  question: string;
  answer: string;
};

export type MeaningfulGuide = {
  title: string;
  description: string;
  keywords: string[];
  pagePath: string;
  coverSrc: string;
  coverAlt: string;
  accent: Accent;
  genderLabel: string;
  datePublished: string;
  dateModified: string;
  intro: string[];
  names: MeaningfulName[];
  faqs: FAQItem[];
  popularNames: string[];
  attentionPoints: string[];
  strongMeaningTraits: string[];
  culturalParagraphs: string[];
};

const relatedGuides = [
  { title: "Son Dönemlerde Trend Olan Bebek İsimleri (2026)", href: "/rehber/trend-bebek-isimleri-2026" },
  { title: "2026 En Güzel ve Popüler Erkek İsimleri", href: "/isim-rehberi/2026-en-guzel-ve-populer-erkek-isimleri" },
  { title: "2026 İçin En Güzel ve Popüler Kız İsimleri", href: "/isim-rehberi/2026-guzel-populer-kiz-isimleri" },
  { title: "Bebek İsmi Nasıl Seçilir?", href: "/isim-rehberi/bebek-ismi-nasil-secilir" },
  { title: "İsimlerin Anlamları Neden Önemlidir?", href: "/isim-rehberi/isimlerin-anlamlari-neden-onemlidir" },
  { title: "Çift İsim Seçerken Gerçekten Nelere Dikkat Etmeli?", href: "/isim-rehberi/modern-ve-benzersiz-isim-onerileri" },
];

export function meaningfulGuideMetadata(guide: MeaningfulGuide): Metadata {
  const pageUrl = canonicalUrl(guide.pagePath);

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: pageUrl,
      siteName: site.name,
      locale: "tr_TR",
      type: "article",
      images: [guide.coverSrc],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: [guide.coverSrc],
    },
  };
}

function accentClasses(accent: Accent) {
  if (accent === "blue") {
    return {
      eyebrow: "text-accent-blue",
      sectionBorder: "border-sky-100",
      sectionBg: "bg-sky-50/50",
      card: "border-sky-100 bg-sky-50/70",
      badge: "bg-white text-accent-blue ring-sky-100",
      link: "text-accent-blue hover:text-accent-blue/80",
    };
  }

  return {
    eyebrow: "text-accent-pink",
    sectionBorder: "border-pink-100",
    sectionBg: "bg-pink-50/50",
    card: "border-pink-100 bg-pink-50/60",
    badge: "bg-white text-accent-pink ring-pink-100",
    link: "text-accent-pink hover:text-accent-pink/80",
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

function NameCards({ guide }: { guide: MeaningfulGuide }) {
  const classes = accentClasses(guide.accent);

  return (
    <div className="grid gap-3">
      {guide.names.map((item, index) => (
        <article key={item.slug} className={`rounded-xl border p-4 shadow-sm ${classes.card}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-primary">
              <span className="mr-2 text-sm font-semibold text-muted">{index + 1}.</span>
              <Link href={`/isim/${item.slug}`} className={`transition hover:underline ${classes.link}`}>
                {item.name}
              </Link>
            </h3>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${classes.badge}`}>
              {item.origin}
            </span>
          </div>
          <div className="mt-3 grid gap-2 text-sm leading-7 text-muted sm:grid-cols-[1fr_1fr]">
            <p>
              <strong className="font-semibold text-primary">Anlamı:</strong> {item.meaning}
            </p>
            <p>
              <strong className="font-semibold text-primary">Kökeni:</strong> {item.origin}
            </p>
          </div>
          <p className="mt-2 text-sm leading-7 text-muted">{item.note}</p>
        </article>
      ))}
    </div>
  );
}

export function MeaningfulNamesGuidePage({ guide }: { guide: MeaningfulGuide }) {
  const pageUrl = canonicalUrl(guide.pagePath);
  const classes = accentClasses(guide.accent);
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
        <Image
          src={guide.coverSrc}
          alt={guide.coverAlt}
          width={1200}
          height={630}
          priority={true}
          loading="eager"
          className="mt-6 mb-8 h-auto w-full rounded-2xl shadow-lg"
        />
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
          ["İçindekiler", "icindekiler"],
          [`En Anlamlı 100 ${guide.genderLabel} Bebek İsmi`, "en-anlamli-100-isim"],
          ["İsim seçerken nelere dikkat edilmeli?", "isim-secerken-dikkat"],
          ["Anlamı güçlü isimlerin özellikleri", "anlami-guclu-isimler"],
          ["İsimlerin kültürel önemi", "isimlerin-kulturel-onemi"],
          ["En çok tercih edilen anlamlı isimler", "en-cok-tercih-edilenler"],
          ["Sık Sorulan Sorular", "sik-sorulan-sorular"],
          ["İlgili Rehberler", "ilgili-rehberler"],
        ].map(([label, id]) => (
          <a key={id} href={`#${id}`} className="rounded-lg px-3 py-2 text-muted transition hover:bg-muted/10 hover:text-primary">
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-12">
        <Section id="icindekiler" title="İçindekiler">
          <p>
            Bu rehberde önce 100 anlamlı ismi tek tek inceleyebilir, ardından isim seçerken dikkat
            edilecek noktaları, güçlü anlamların ortak özelliklerini ve kültürel bağlamı okuyabilirsiniz.
            Liste bir yarış sıralaması değildir; amaç, karar sürecinde karşılaştırması kolay ve güven
            veren bir başlangıç noktası sunmaktır.
          </p>
        </Section>

        <section id="en-anlamli-100-isim" className={`scroll-mt-24 rounded-2xl border bg-white p-5 shadow-sm ${classes.sectionBorder}`}>
          <div className={`mb-5 rounded-xl p-4 ${classes.sectionBg}`}>
            <p className={`text-xs font-bold uppercase tracking-wide ${classes.eyebrow}`}>
              {guide.genderLabel} bebek isimleri
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-primary">
              En Anlamlı 100 {guide.genderLabel} Bebek İsmi
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-muted">
              Her kartta ismin anlamını, kökenini ve gündelik kullanımda nasıl bir izlenim bıraktığını
              bulabilirsiniz. Beğendiğiniz isimlerin detay sayfasına geçerek telaffuz, özellik ve benzer
              isim önerilerini de inceleyebilirsiniz.
            </p>
          </div>
          <NameCards guide={guide} />
        </section>

        <Section id="isim-secerken-dikkat" title="İsim seçerken nelere dikkat edilmeli?">
          <p>
            Anlamlı bir isim seçmek güzel bir başlangıçtır; fakat karar verirken ismin soyadıyla kurduğu
            ritim, yazım kolaylığı, telaffuz açıklığı ve çocuğun farklı yaşlarda bu ismi rahat taşıyıp
            taşıyamayacağı da birlikte düşünülmelidir.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {guide.attentionPoints.map((item) => (
              <div key={item} className="rounded-xl border border-border bg-white p-4 text-sm leading-7 text-muted shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </Section>

        <Section id="anlami-guclu-isimler" title="Anlamı güçlü isimlerin özellikleri">
          <p>
            Güçlü anlam, yalnızca iddialı ya da ağır bir kelimeyle kurulmaz. Bazen sade bir isim; iyilik,
            umut, zarafet, bilgelik veya güven hissini yalın biçimde taşıdığı için daha kalıcı olur.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {guide.strongMeaningTraits.map((item) => (
              <div key={item} className={`rounded-xl border p-4 text-sm leading-7 shadow-sm ${classes.card}`}>
                {item}
              </div>
            ))}
          </div>
        </Section>

        <Section id="isimlerin-kulturel-onemi" title="İsimlerin kültürel önemi">
          {guide.culturalParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>

        <Section id="en-cok-tercih-edilenler" title="En çok tercih edilen anlamlı isimler">
          <p>
            Ailelerin kısa listelerinde sık yer bulan isimler genellikle anlamı kolay anlatılan, yazımı
            sade ve farklı kuşaklar tarafından yadırganmadan kullanılan seçeneklerdir. Bu rehberde öne
            çıkan bazı isimler şunlardır:
          </p>
          <div className="flex flex-wrap gap-2">
            {guide.popularNames.map((name) => {
              const item = guide.names.find((n) => n.name === name);
              if (!item) return null;

              return (
                <Link
                  key={item.slug}
                  href={`/isim/${item.slug}`}
                  className={`rounded-full bg-white px-3 py-2 text-sm font-semibold ring-1 transition hover:underline ${classes.badge}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </Section>

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

        <section id="ilgili-rehberler" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-semibold text-primary">İlgili Rehberler</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedGuides.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-border bg-white p-4 text-sm font-semibold text-primary shadow-sm transition hover:border-primary/30 hover:bg-muted/10"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
