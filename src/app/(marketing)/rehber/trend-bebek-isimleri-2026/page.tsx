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

const title = "Son Dönemlerde Trend Olan Bebek İsimleri (2026)";
const description =
  "2026 yılında öne çıkan kız ve erkek bebek isimlerini, kısa anlamları, modern isim trendleri ve seçim önerileriyle keşfedin.";
const pagePath = "/rehber/trend-bebek-isimleri-2026";
const pageUrl = canonicalUrl(pagePath);
const coverSrc = "/rehber/yenidoganblog.png";
const coverAlt = "2026 trend bebek isimleri rehberi için yenidoğan kapak görseli";

type NameCard = {
  name: string;
  slug?: string;
  meaning: string;
  note: string;
};

const girlNames: NameCard[] = [
  {
    name: "Asel",
    slug: "asel",
    meaning: "Bal, tatlılık ve bereket çağrışımı taşır.",
    note: "Kısa yapısı ve yumuşak sesiyle modern kız isimleri arasında güçlü durur.",
  },
  {
    name: "Asya",
    slug: "asya",
    meaning: "Geniş coğrafya, zarafet ve güçlü duruş hissi verir.",
    note: "Hem tanıdık hem de çağdaş duyulduğu için 2026 listelerinde öne çıkar.",
  },
  {
    name: "Alina",
    meaning: "Aydınlık, zarif ve modern bir tınıyla anılır.",
    note: "Uluslararası duyulan ama Türkçede de akıcı duran seçeneklerden biridir.",
  },
  {
    name: "Arya",
    meaning: "Melodi, soyluluk ve estetik çağrışımı taşır.",
    note: "Sanatsal ve kısa isim seven ailelerin sık değerlendirdiği adlardandır.",
  },
  {
    name: "Lina",
    slug: "lina",
    meaning: "Yumuşaklık, zarafet ve sade güzellik hissi verir.",
    note: "Kısa ve akıcı olduğu için uzun soyadlarıyla da dengeli görünür.",
  },
  {
    name: "Elisa",
    meaning: "Zarif, melodik ve modern kullanımı olan bir isimdir.",
    note: "Kulağa hafif gelmesi, onu şehirli ve güncel listelerde görünür kılar.",
  },
  {
    name: "Eflin",
    meaning: "Yumuşak tınılı, zarif ve modern bir ad olarak kullanılır.",
    note: "Daha nadir ama anlaşılır isim arayan ailelerin ilgisini çeker.",
  },
  {
    name: "Nehir",
    slug: "nehir",
    meaning: "Akarsu, canlılık ve doğal akış anlamı taşır.",
    note: "Doğa temalı kız isimleri içinde hem güçlü hem de ferah bir seçenektir.",
  },
  {
    name: "Defne",
    meaning: "Defne ağacı, başarı ve zarafetle ilişkilendirilir.",
    note: "Klasikleşmeye başlayan modern isimlerden biri olarak dengeli durur.",
  },
  {
    name: "Alin",
    meaning: "Aydınlık, güzel ve sade çağrışımlı modern bir isimdir.",
    note: "Kısa, net ve kolay telaffuz edilen kız isimleri arasında değerlendirilir.",
  },
];

const boyNames: NameCard[] = [
  {
    name: "Aslan",
    slug: "aslan",
    meaning: "Cesaret, güç ve koruyucu duruş çağrışımı taşır.",
    note: "Net karakteriyle son yılların güçlü erkek isimleri arasında yer alır.",
  },
  {
    name: "Alparslan",
    slug: "alparslan",
    meaning: "Yiğit, cesur ve tarihi ağırlığı olan bir isimdir.",
    note: "Köklü ve güçlü isim arayan aileler için 2026'da da dikkat çeker.",
  },
  {
    name: "Göktuğ",
    slug: "goktug",
    meaning: "Gök ve tuğ imgeleriyle güçlü, tarihî bir duruş verir.",
    note: "Türkçe kökenli ve liderlik hissi taşıyan isimleri sevenlere uygundur.",
  },
  {
    name: "Aras",
    slug: "aras",
    meaning: "Akıcılık, doğa ve güçlü nehir çağrışımıyla bilinir.",
    note: "Kısa, modern ve enerjik yapısıyla erkek isimlerinde öne çıkar.",
  },
  {
    name: "Atlas",
    slug: "atlas",
    meaning: "Geniş ufuk, taşıyıcılık ve sağlamlık hissi verir.",
    note: "Modern ama boş durmayan isim isteyen aileler için güçlü bir alternatiftir.",
  },
  {
    name: "Kaan",
    slug: "kaan",
    meaning: "Hükümdar, lider ve otorite anlam alanıyla kullanılır.",
    note: "Kısa yapısına rağmen güçlü bir karakter etkisi bırakır.",
  },
  {
    name: "Kerem",
    slug: "kerem",
    meaning: "Cömertlik, iyilik ve asil davranış çağrışımı taşır.",
    note: "Klasik çizgisini korurken modern listelerde de rahat yer bulur.",
  },
  {
    name: "Ayaz",
    slug: "ayaz",
    meaning: "Serin, açık ve berrak hava anlamıyla bilinir.",
    note: "Doğal, kısa ve güçlü erkek isimleri arasında dengeli bir seçenektir.",
  },
  {
    name: "Kuzey",
    slug: "kuzey",
    meaning: "Yön, serinlik ve modern bir kimlik hissi verir.",
    note: "Çağdaş tınısı ve net söylenişiyle son yıllarda sık değerlendirilir.",
  },
  {
    name: "Pars",
    meaning: "Güçlü, çevik ve asil yaban kedisi çağrışımı taşır.",
    note: "Kısa ve karakterli erkek isimleri arayan ailelerin radarındadır.",
  },
];

const faqs = [
  {
    id: "trend-isim-ne-demek",
    sortOrder: 1,
    question: "Trend bebek ismi ne demektir?",
    answer:
      "Trend bebek ismi, son yıllarda ailelerin daha sık araştırdığı, kulağa güncel gelen ve sosyal hayatta daha görünür hale gelen isimleri anlatır. Bu her zaman en çok konulan isim anlamına gelmez; bazen yeni yükselen, kısa ya da modern tınılı isimler de trend kabul edilir.",
  },
  {
    id: "2026-kiz-isimleri",
    sortOrder: 2,
    question: "2026'da kız bebek isimlerinde hangi tarzlar öne çıkıyor?",
    answer:
      "Kız bebek isimlerinde kısa, zarif, kolay telaffuz edilen ve anlamı olumlu isimler öne çıkıyor. Asel, Asya, Lina, Nehir ve Defne gibi hem tanıdık hem modern duran isimler bu eğilimi iyi yansıtıyor.",
  },
  {
    id: "2026-erkek-isimleri",
    sortOrder: 3,
    question: "2026'da erkek bebek isimlerinde hangi tarzlar popüler?",
    answer:
      "Erkek bebek isimlerinde güçlü anlam, kısa söyleyiş ve tarihî çağrışım birlikte öne çıkıyor. Aslan, Alparslan, Göktuğ, Aras, Atlas, Kaan ve Kuzey gibi isimler bu yüzden sık araştırılan seçenekler arasında yer alıyor.",
  },
  {
    id: "isim-secerken-neye-bakmali",
    sortOrder: 4,
    question: "Bebek ismi seçerken sadece popülerliğe bakmak yeterli mi?",
    answer:
      "Hayır. Popülerlik fikir verebilir, fakat anlam, telaffuz, soyadıyla uyum, kardeş isimleriyle denge ve çocuğun ileriki yaşlarda ismi rahat taşıyabilmesi de birlikte düşünülmelidir.",
  },
];

const breadcrumbItems = [
  { label: "Anasayfa", href: "/" },
  { label: "Rehber", href: "/isim-rehberi" },
  { label: title },
];

export const metadata: Metadata = {
  title: "Son Dönemlerde Trend Olan Bebek İsimleri (2026)",
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: site.name,
    locale: "tr_TR",
    type: "article",
    images: [{ url: canonicalUrl(coverSrc), width: 1200, height: 675, alt: coverAlt }],
  },
};

function NameLink({ item, accent }: { item: NameCard; accent: "pink" | "blue" }) {
  const classes =
    accent === "pink"
      ? "text-accent-pink hover:text-accent-pink/80"
      : "text-accent-blue hover:text-accent-blue/80";

  if (!item.slug) return <span>{item.name}</span>;

  return (
    <Link href={`/isim/${item.slug}`} className={`transition hover:underline ${classes}`}>
      {item.name}
    </Link>
  );
}

function NameCards({
  items,
  accent,
}: {
  items: NameCard[];
  accent: "pink" | "blue";
}) {
  const cardClass =
    accent === "pink"
      ? "border-pink-100 bg-pink-50/60"
      : "border-sky-100 bg-sky-50/70";
  const badgeClass =
    accent === "pink"
      ? "bg-white text-accent-pink ring-pink-100"
      : "bg-white text-accent-blue ring-sky-100";

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <article key={item.name} className={`rounded-xl border p-4 ${cardClass}`}>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-primary">
              <NameLink item={item} accent={accent} />
            </h3>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${badgeClass}`}>
              2026
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-primary/85">{item.meaning}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
        </article>
      ))}
    </div>
  );
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

export default function TrendBabyNames2026Page() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd
        data={schemaGraph([
          webPageSchema({
            url: pageUrl,
            name: title,
            description,
            breadcrumbId: `${pageUrl}#breadcrumb`,
            aboutId: `${pageUrl}#article`,
          }),
          breadcrumbListSchema(breadcrumbItems, pageUrl),
          {
            "@type": "Article",
            "@id": `${pageUrl}#article`,
            url: pageUrl,
            headline: title,
            description,
            image: canonicalUrl(coverSrc),
            datePublished: "2026-06-30",
            dateModified: "2026-06-30",
            author: { "@type": "Organization", name: site.name, url: canonicalUrl("/") },
            publisher: { "@type": "Organization", name: site.name, url: canonicalUrl("/") },
            mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
            inLanguage: "tr-TR",
          },
          faqPageSchema(faqs, pageUrl),
        ])}
      />

      <Breadcrumb items={breadcrumbItems} />

      <header className="mt-8">
        <p className="text-xs font-bold uppercase tracking-wide text-accent-pink">Bebek isimleri rehberi</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-primary sm:text-5xl">
          Son Dönemlerde Trend Olan Bebek İsimleri (2026)
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
          2026 için bebek ismi arayan aileler, artık yalnızca kulağa hoş gelen bir adla yetinmiyor.
          Anlamı güçlü, yazılışı sade, sosyal hayatta rahat kullanılan ve çocuğun ileriki yaşlarına da
          yakışacak isimler daha fazla öne çıkıyor.
        </p>
      </header>

      <div className="relative mt-8 overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={coverSrc}
            alt={coverAlt}
            fill
            priority
            sizes="(min-width: 896px) 896px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <nav
        aria-label="Sayfa bölümleri"
        className="mt-8 grid gap-2 rounded-2xl border border-border bg-white p-4 text-sm shadow-sm sm:grid-cols-2"
      >
        {[
          ["Giriş", "giris"],
          ["Son yıllarda isim tercihleri nasıl değişti?", "isim-tercihleri"],
          ["Trend kız bebek isimleri", "trend-kiz-bebek-isimleri"],
          ["Trend erkek bebek isimleri", "trend-erkek-bebek-isimleri"],
          ["Modern ve kısa isimlerin yükselişi", "modern-kisa-isimler"],
          ["İsim seçerken dikkat edilmesi gerekenler", "isim-secerken-dikkat"],
          ["Sık sorulan sorular", "sik-sorulan-sorular"],
          ["Sonuç", "sonuc"],
        ].map(([label, id]) => (
          <a key={id} href={`#${id}`} className="rounded-lg px-3 py-2 text-muted transition hover:bg-muted/10 hover:text-primary">
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-12">
        <Section id="giris" title="Giriş">
          <p>
            Bebek ismi seçimi, ailelerin en keyifli ama en dikkatli ilerlediği kararlardan biri. Son
            dönemlerde trend olan bebek isimleri incelendiğinde, kısa ve modern isimlerle anlamı köklü
            isimlerin birlikte yükseldiği görülüyor.
          </p>
          <p>
            Bu rehber kesin bir resmi sıralama iddiası taşımaz; ailelerin son yıllarda daha sık
            araştırdığı, kulağa güncel gelen ve Yenidogan.net isim evreniyle uyumlu seçenekleri doğal
            bir editoryal bakışla bir araya getirir.
          </p>
        </Section>

        <Section id="isim-tercihleri" title="Son yıllarda isim tercihleri nasıl değişti?">
          <p>
            Aileler artık isim seçerken yalnızca geleneğe ya da popülerliğe bakmıyor. İsmin anlamı,
            telaffuzu, sosyal hayatta kolay kullanılması, dijital ortamlarda sade yazılması ve soyadıyla
            kurduğu ritim daha çok önem kazanıyor.
          </p>
          <p>
            Bir yanda Alparslan, Göktuğ ve Kaan gibi güçlü ve tarihî çağrışımlı erkek isimleri; diğer
            yanda Asel, Lina ve Nehir gibi kısa, yumuşak ve modern kız isimleri ilgi görüyor. Bu tablo,
            2026 isim tercihlerinde tek bir çizginin değil, dengeli bir çeşitliliğin yükseldiğini
            gösteriyor.
          </p>
        </Section>

        <section id="trend-kiz-bebek-isimleri" className="scroll-mt-24 rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wide text-accent-pink">Kız bebek isimleri</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-primary">Trend kız bebek isimleri</h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-muted">
              2026&apos;da kız isimlerinde zarif sesler, kısa heceler ve olumlu anlamlar öne çıkıyor.
              Pembe tonlu bu listede hem modern hem de kullanımı rahat seçenekler yer alıyor.
            </p>
          </div>
          <NameCards items={girlNames} accent="pink" />
        </section>

        <section id="trend-erkek-bebek-isimleri" className="scroll-mt-24 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wide text-accent-blue">Erkek bebek isimleri</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-primary">Trend erkek bebek isimleri</h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-muted">
              Erkek isimlerinde güçlü anlam, kısa söyleyiş ve tarihî derinlik bir arada yükseliyor.
              Mavi tonlu bu kartlar, 2026 için sık değerlendirilen seçenekleri okunabilir biçimde toplar.
            </p>
          </div>
          <NameCards items={boyNames} accent="blue" />
        </section>

        <Section id="modern-kisa-isimler" title="Modern ve kısa isimlerin yükselişi">
          <p>
            Kısa isimler, özellikle uzun soyadlarıyla birlikte daha dengeli bir ritim kurduğu için
            ailelerin listesinde güçleniyor. Asel, Lina, Alin, Aras, Kaan ve Pars gibi isimler az heceyle
            belirgin bir kimlik hissi verir.
          </p>
          <p>
            Modern isimlerin yükselişinde yalnızca yeni duyulmaları etkili değil. Kolay okunmaları,
            farklı yaşlarda doğal durmaları ve kardeş isimleriyle uyumlu eşleşebilmeleri de bu
            tercihleri güçlendiriyor.
          </p>
        </Section>

        <Section id="isim-secerken-dikkat" title="İsim seçerken dikkat edilmesi gerekenler">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Anlamı güvenilir kaynaklarda karşılığı olan isimlere öncelik verin.",
              "İsmi soyadıyla birlikte birkaç kez sesli okuyun.",
              "Çok moda olan bir ismin uzun vadede de size iyi gelip gelmediğini düşünün.",
              "Yazımı ve telaffuzu çocuğu sürekli düzeltme yapmak zorunda bırakmasın.",
              "Kardeş isimleriyle uyuma bakın ama isimleri fazla benzetmeyin.",
              "Kısa listeyi birkaç gün bekletip kulağınızın hangisine döndüğünü gözlemleyin.",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-border bg-white p-4 text-sm leading-7 text-muted shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </Section>

        <section id="sik-sorulan-sorular" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-semibold text-primary">Sık sorulan sorular</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((faq) => (
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
          <p>
            2026 bebek isimleri arasında öne çıkan ortak çizgi, anlamı güçlü ama günlük kullanımı rahat
            isimlere yönelmek. Kız isimlerinde zarafet ve yumuşaklık; erkek isimlerinde güç, sadelik ve
            tarihî çağrışım daha görünür hale geliyor.
          </p>
          <p>
            En iyi seçim, yalnızca trend olduğu için değil, ailenizin diline, değerlerine ve çocuğun
            hayat boyu taşıyacağı kimliğe doğal biçimde uyduğu için içinize sinen isimdir. Daha fazla
            seçenek için <Link href="/kiz-isimleri" className="text-accent-pink hover:underline">kız isimleri</Link>,{" "}
            <Link href="/erkek-isimleri" className="text-accent-blue hover:underline">erkek isimleri</Link> ve{" "}
            <Link href="/isim-bulucu" className="text-primary hover:underline">isim bulucu</Link> sayfalarını
            birlikte inceleyebilirsiniz.
          </p>
        </Section>
      </div>
    </article>
  );
}
