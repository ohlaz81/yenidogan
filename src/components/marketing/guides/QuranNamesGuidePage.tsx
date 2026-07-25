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
import {
  prophetNames,
  quranBoyNames,
  quranGirlNames,
  quranGuideFaqs,
  quranNamesGuide,
  widespreadIslamicNames,
  type QuranGuideName,
} from "@/data/quran-names-guide";

const toc = [
  ["Kur'an-ı Kerim'de Geçen İsimler Neden Tercih Edilir?", "neden-tercih-edilir"],
  ["Kur'an'da Geçen Kız İsimleri", "kuranda-gecen-kiz-isimleri"],
  ["Kur'an'da Geçen Erkek İsimleri", "kuranda-gecen-erkek-isimleri"],
  ["Peygamber İsimleri", "peygamber-isimleri"],
  ["Kur'an'da Geçmeyen Ama İslami Açıdan Yaygın İsimler", "yaygin-islami-isimler"],
  ["İsim Seçerken Nelere Dikkat Edilmeli?", "isim-secerken"],
  ["Sık Sorulan Sorular", "sik-sorulan-sorular"],
] as const;

const relatedGuides = [
  { title: "Kur'an'da Geçen İsimler", href: "/kuranda-gecen-isimler", tone: "violet" },
  { title: "İslami İsim Seçerken Dikkat Edilmesi Gerekenler", href: "/isim-rehberi/islami-isim-secerken-dikkat-edilmesi-gerekenler", tone: "violet" },
  { title: "En Anlamlı 100 Kız Bebek İsmi", href: "/rehber/en-anlamli-100-kiz-bebek-ismi", tone: "pink" },
  { title: "En Anlamlı 100 Erkek Bebek İsmi", href: "/rehber/en-anlamli-100-erkek-bebek-ismi", tone: "blue" },
] as const;

export function quranNamesGuideMetadata(): Metadata {
  const pageUrl = canonicalUrl(quranNamesGuide.pagePath);
  const imageUrl = canonicalUrl(quranNamesGuide.coverSrc);

  return {
    title: { absolute: quranNamesGuide.metaTitle },
    description: quranNamesGuide.description,
    keywords: [
      "Kur'an'da geçen isimler",
      "Kur'an'da geçen kız isimleri",
      "Kur'an'da geçen erkek isimleri",
      "peygamber isimleri",
      "İslami bebek isimleri",
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: quranNamesGuide.metaTitle,
      description: quranNamesGuide.description,
      url: pageUrl,
      siteName: site.name,
      locale: "tr_TR",
      type: "article",
      images: [{ url: imageUrl, width: 1200, height: 675, alt: quranNamesGuide.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: quranNamesGuide.metaTitle,
      description: quranNamesGuide.description,
      images: [imageUrl],
    },
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

function InfoBox({
  type,
  title,
  children,
}: {
  type: "Dikkat" | "Bilgi" | "Not";
  title: string;
  children: React.ReactNode;
}) {
  const tone =
    type === "Dikkat"
      ? "border-amber-200 bg-amber-50/80"
      : type === "Bilgi"
        ? "border-sky-200 bg-sky-50/80"
        : "border-violet-200 bg-violet-50/80";

  return (
    <aside className={`rounded-xl border p-4 shadow-sm ${tone}`}>
      <p className="text-xs font-bold uppercase tracking-wide text-primary">{type}</p>
      <h3 className="mt-1 font-display text-lg font-semibold text-primary">{title}</h3>
      <div className="mt-2 text-sm leading-7 text-muted">{children}</div>
    </aside>
  );
}

function NameCard({ item, index }: { item: QuranGuideName; index: number }) {
  return (
    <article className="rounded-xl border border-violet-100 bg-violet-50/60 p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-primary">
          <span className="mr-2 text-sm text-muted">{index + 1}.</span>
          <Link href={`/isim/${item.slug}`} className="text-violet-700 transition hover:text-violet-900 hover:underline">
            {item.displayName}
          </Link>
        </h3>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-violet-700 ring-1 ring-violet-100">
          {item.reference}
        </span>
      </div>
      <div className="mt-3 grid min-w-0 gap-2 text-sm leading-7 text-muted sm:grid-cols-[minmax(0,1fr)_minmax(0,0.65fr)]">
        <p className="min-w-0 break-words">
          <strong className="font-semibold text-primary">Anlamı:</strong> {item.meaning}
        </p>
        <p className="min-w-0 break-words">
          <strong className="font-semibold text-primary">Kökeni:</strong> {item.origin}
        </p>
      </div>
      <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
      <Link href={`/isim/${item.slug}`} className="mt-3 inline-flex text-sm font-semibold text-violet-700 hover:underline">
        {item.displayName} ismi hakkında ayrıntılı bilgi
      </Link>
    </article>
  );
}

export function QuranNamesGuidePage() {
  const pageUrl = canonicalUrl(quranNamesGuide.pagePath);
  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "Rehber", href: "/isim-rehberi" },
    { label: quranNamesGuide.heroTitle },
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd
        data={schemaGraph([
          webPageSchema({
            url: pageUrl,
            name: quranNamesGuide.title,
            description: quranNamesGuide.description,
            breadcrumbId: `${pageUrl}#breadcrumb`,
            aboutId: `${pageUrl}#article`,
          }),
          breadcrumbListSchema(breadcrumbItems, pageUrl),
          {
            "@type": "Article",
            "@id": `${pageUrl}#article`,
            url: pageUrl,
            headline: quranNamesGuide.title,
            description: quranNamesGuide.description,
            image: canonicalUrl(quranNamesGuide.coverSrc),
            datePublished: quranNamesGuide.datePublished,
            dateModified: quranNamesGuide.dateModified,
            author: { "@type": "Organization", name: site.name, url: canonicalUrl("/") },
            publisher: { "@type": "Organization", name: site.name, url: canonicalUrl("/") },
            mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
            inLanguage: "tr-TR",
          },
          faqPageSchema(quranGuideFaqs, pageUrl),
        ])}
      />

      <Breadcrumb items={breadcrumbItems} />

      <header className="mt-8">
        <p className="text-xs font-bold uppercase tracking-wide text-violet-700">Bebek isimleri rehberi</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-primary sm:text-5xl">
          {quranNamesGuide.title}
        </h1>
        <div className="relative mt-6 mb-8 overflow-hidden rounded-2xl border border-border bg-white shadow-lg">
          <Image
            src={quranNamesGuide.coverSrc}
            alt={quranNamesGuide.coverAlt}
            width={1200}
            height={675}
            priority
            loading="eager"
            className="h-auto w-full"
          />
        </div>
        <div className="mt-4 max-w-3xl space-y-4 text-lg leading-8 text-muted">
          <p>
            Kur&apos;an-ı Kerim&apos;de adı geçen kız ve erkek isimlerini, anlamlarını ve öne çıkan
            özelliklerini tek rehberde keşfedin.
          </p>
          <p>
            Bir bebeğe isim vermek, aile içinde yapılan en kalıcı seçimlerden biridir. Manevi
            çağrışımı güçlü bir ad arayan anne ve babalar için Kur&apos;an&apos;da geçen isimler doğal
            bir başlangıç noktasıdır. Bununla birlikte güvenilir bir liste hazırlamak, yalnızca
            internette “Kur&apos;an ismi” etiketiyle dolaşan adları sıralamaktan daha fazla özen
            ister. Kelimenin ayette gerçekten bulunması, özel ad mı yoksa genel bir kavram mı
            olduğu ve hangi bağlamda kullanıldığı ayrı ayrı değerlendirilmelidir.
          </p>
          <p>
            Bu rehberde kişi adlarını, Kur&apos;an&apos;da geçen kavramları ve İslam tarihinde
            yaygınlaşan isimleri birbirine karıştırmıyoruz. Her kartta adın temel anlamını,
            kökenini, kısa açıklamasını ve örnek bir sure-ayet referansını bulabilirsiniz. Böylece
            yalnız kulağa hoş gelen değil, dayanağı bilinen bir seçim yapabilirsiniz.
          </p>
        </div>
      </header>

      <nav
        aria-label="Sayfa bölümleri"
        className="mt-8 grid gap-2 rounded-2xl border border-border bg-white p-4 text-sm shadow-sm sm:grid-cols-2"
      >
        {toc.map(([label, id]) => (
          <a key={id} href={`#${id}`} className="rounded-lg px-3 py-2 text-muted transition hover:bg-violet-50 hover:text-primary">
            {label}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-12">
        <Section id="neden-tercih-edilir" title="Kur'an-ı Kerim'de Geçen İsimler Neden Tercih Edilir?">
          <p>
            Kur&apos;an&apos;da adı geçen bir peygamberin veya örnek bir şahsiyetin ismini taşımak,
            birçok aile için geçmişle kurulan manevi bir bağdır. İsim, çocuğun o kişinin bütün
            özelliklerini kendiliğinden edineceği anlamına gelmez; fakat aile, adın hikâyesini
            anlatarak sabır, doğruluk, merhamet ve sorumluluk gibi değerleri canlı tutabilir.
            Yusuf adı iffeti ve affediciliği, Eyyub sabrı, İbrahim teslimiyeti, Meryem ise iffeti ve
            adanmışlığı hatırlatır. Bu çağrışımlar, isim seçimini sıradan bir beğeninin ötesine
            taşıyabilir.
          </p>
          <p>
            Bir başka neden, bu isimlerin kuşaklar boyunca tanınmasıdır. Musa, İsa, Yahya,
            Süleyman, Meryem ve Yusuf gibi adlar farklı coğrafyalarda farklı söylenişlerle yaşar.
            Türkiye&apos;de de hem geleneksel hem güncel ailelerde karşılık bulurlar. Tanıdık
            olmaları telaffuz kolaylığı sağlarken, taşıdıkları kıssa ve anlam katmanları adın
            sıradanlaşmasını önler. Yine de popülerlik tek başına ölçü değildir; soyadıyla uyum,
            günlük kullanım ve ailenin adla kurduğu sahici bağ daha önemlidir.
          </p>
          <p>
            Kur&apos;an&apos;da geçme ölçütü bazen yanlış anlaşılır. Mushaf&apos;ta yer alan her
            kelime olumlu değildir ve her kelime kişi adı değildir. Metinde iyilik kadar zulüm,
            inkâr ve kötü örnekler de anlatılır. Firavun bir unvan olarak, Kârûn ve Hâmân ise
            eleştirilen şahsiyetler olarak geçer. Bu nedenle “ayetlerde bulunuyor” bilgisi,
            “çocuğa verilmesi önerilir” sonucunu doğurmaz. İsim araştırmasında bağlamı okumak,
            listenin uzunluğundan daha değerlidir.
          </p>
          <InfoBox type="Dikkat" title="Kur'an'da geçmek ile güzel isim olmak aynı ölçüt değildir">
            <p>
              Bir adın seçime uygunluğu için olumlu anlam, iyi çağrışım ve günlük hayatta
              taşınabilirlik birlikte aranmalıdır. Yalnız arama sonuçlarında görülen listelere
              güvenmek yerine ayet bağlamı ve güvenilir sözlük bilgisi kontrol edilmelidir.
            </p>
          </InfoBox>
          <p>
            Aileler bazen manevi değeri yüksek bir ad ile modern bir söyleyişi bir arada ister.
            Kur&apos;an&apos;da geçen isimlerin önemli bir bölümü bu dengeyi doğal biçimde sunar.
            Yahya, Yunus, İdris ve İsa kısa; İbrahim, Süleyman ve Muhammed ise daha güçlü ve klasik
            ritimli seçeneklerdir. İki isim düşünülüyorsa adların birlikte söylenişi denenmeli,
            yalnız yazılı görünüm değil ses dengesi de hesaba katılmalıdır. Resmî kayıtta
            kullanılacak yazımın ömür boyu değişmeden kalacağı unutulmamalıdır.
          </p>
        </Section>

        <Section id="kuranda-gecen-kiz-isimleri" title="Kur'an'da Geçen Kız İsimleri">
          <p>
            Bu başlıkta özellikle titiz bir ayrım gerekir. Kur&apos;an&apos;da kadınlardan söz
            edilir; Hz. Âdem&apos;in eşi, Hz. Musa&apos;nın annesi, Firavun&apos;un eşi ve başka
            kadın şahsiyetler kıssalarda önemli roller üstlenir. Ancak bu kadınların özel adları
            ayet metninde verilmez. Kur&apos;an&apos;da adı açıkça zikredilen tek kadın Hz.
            Meryem&apos;dir. Bu sebeple doğrulanabilir “Kur&apos;an&apos;da geçen kız kişi adları”
            listesi sanıldığından çok daha kısadır.
          </p>
          <p>
            Nur, Huda, Rahma, Ayet, Kevser ve benzeri kelimeler Türkçede kız adı olarak
            kullanılabilir ve bunların karşılığı Kur&apos;an&apos;da kavram veya kelime olarak
            bulunabilir. Fakat ayetlerde belirli bir kadın şahsiyetin özel adı değillerdir. Bu
            rehber, “Kur&apos;an&apos;da geçen kelimeden oluşan isim” ile “Kur&apos;an&apos;da adı
            geçen kadın” ifadelerini eş anlamlı kullanmaz. Aşağıdaki kart bu sıkı ölçüte göre
            hazırlanmıştır.
          </p>
          <div className="grid gap-3">
            {quranGirlNames.map((item, index) => (
              <NameCard key={item.slug} item={item} index={index} />
            ))}
          </div>
          <InfoBox type="Bilgi" title="Meryem adı neden özel bir yerde durur?">
            <p>
              Meryem, Kur&apos;an&apos;da adıyla anılan tek kadın olmasının yanında bir surenin de
              adıdır. Âl-i İmrân ve Meryem surelerinde ailesi, adanışı, iffeti ve Hz. İsa&apos;nın
              doğumu etrafında ayrıntılı biçimde anlatılır. Bu nedenle adın manevi çağrışımı
              yalnız sözlük anlamından değil, bütün bir kıssadan beslenir.
            </p>
          </InfoBox>
          <p>
            Meryem ismini değerlendiren aileler, adın Türkiye&apos;de yerleşmiş ve kolay söylenen
            biçimini avantaj olarak görebilir. Üç heceli yapısı birçok soyadıyla dengeli duyulur.
            İkinci adla birlikte kullanılacaksa iki adın vurgu düzeni denenmelidir. Örneğin kısa
            bir ikinci ad Meryem&apos;in güçlü ritmini tamamlayabilir; ancak son karar yalnız
            estetik değil, aile için taşıdığı anlam üzerinden verilmelidir.
          </p>
          <h3 className="font-display text-xl font-semibold text-primary">Kavram, sure adı ve kişi adı nasıl ayrılır?</h3>
          <p>
            Kur&apos;an isimleri hakkında hazırlanan birçok listenin uzun görünmesinin temel
            nedeni üç farklı kategorinin aynı başlık altında toplanmasıdır. Birinci kategori,
            Meryem veya Yusuf gibi ayette belirli bir kişiyi gösteren özel adlardır. İkinci
            kategori, Nur, Rahmet ve Hidayet gibi metinde anlamlı bir kavram olarak kullanılan
            kelimelerdir. Üçüncü kategori ise Kevser, Taha veya Yasin örneklerinde görüldüğü gibi
            sure adı, harf grubu ya da özel bir Kur&apos;an terimi üzerinden zamanla kişi adına
            dönüşen kullanımlardır. Bu kategoriler kültürel bakımdan değerli olabilir; fakat aynı
            dilbilgisel ve tarihî niteliğe sahip değildir.
          </p>
          <p>
            Örneğin “nur” Kur&apos;an dilinde ışık ve aydınlık anlam alanına sahiptir. Günümüzde
            kız ve erkek adı olarak kullanılması mümkündür; ancak ayette Nur adlı bir kadın veya
            erkek şahsiyet anlatılmaz. Benzer biçimde “huda” doğru yol ve hidayet kavramını
            karşılar. Bu kelimelere dayanan isimlerin güzel anlamı ayrıca değerlendirilebilir,
            fakat kişi adı listesine eklenirken “Kur&apos;an&apos;da şu kişinin adı olarak geçer”
            denmemelidir. Doğru ifade, kelimenin Kur&apos;an&apos;da bulunduğu ve daha sonra ad
            olarak benimsendiğidir.
          </p>
          <p>
            Sure adlarında da aynı dikkat gerekir. Bir surenin başlığında görülen kelime her
            zaman o suredeki bir kişinin adı değildir. Kevser bir sure adı ve “çok hayır,
            bereket” anlamıyla açıklanan bir kavramdır. Tâhâ ve Yâsîn ise hurûf-ı mukattaa
            kapsamında değerlendirilen ifadeler arasındadır; bunlara kesin ve tartışmasız bir
            kişi adı anlamı vermek ilmî ihtiyatla bağdaşmaz. Aileler bu adları kültürel
            tercihleriyle kullanabilir, ancak anlam açıklamasında farklı yorumların bulunduğunu
            bilmelidir.
          </p>
          <p>
            Kız isimlerinde bu ayrım özellikle önemlidir; çünkü Meryem dışındaki uzun listeler
            çoğunlukla olumlu kavramlardan üretilir. Sidra, Salsabil, Tesnim veya Meva gibi
            kullanımlar ayetlerde yer, nimet ya da tasvir bildiren kelimelerle ilişkilidir.
            Bunların her biri ayrıca sözlük ve bağlam incelemesi gerektirir. “Ayetlerde geçen
            kelimelerden esinlenen kız isimleri” başlığı altında incelenmeleri mümkündür; fakat
            “Kur&apos;an&apos;da adı geçen kadınlar” listesine konmaları doğru olmaz.
          </p>
          <p>
            Bu sınıflandırma, isimleri değersizleştirmek için değil bilgiyi şeffaflaştırmak için
            yapılır. Aile, bir kavram adını manevi anlamı sebebiyle bilinçli biçimde seçebilir.
            Önemli olan kararın yanlış bir iddiaya dayanmamasıdır. “Bu kelime Kur&apos;an&apos;da
            geçer”, “bu ifade bir surenin adıdır” ve “bu kişi Kur&apos;an&apos;da özel adıyla
            anılır” cümleleri farklı bilgiler verir. Rehber boyunca kullanılan kartlar üçüncü,
            yani en dar ve doğrulanabilir ölçüyü esas alır.
          </p>
        </Section>

        <section id="kuranda-gecen-erkek-isimleri" className="scroll-mt-24 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
          <div className="mb-5 rounded-xl bg-violet-50/70 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-violet-700">Doğrulanmış özel adlar</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-primary">Kur&apos;an&apos;da Geçen Erkek İsimleri</h2>
            <p className="mt-3 text-base leading-8 text-muted">
              Erkek isimleri bakımından Kur&apos;an&apos;ın kişi adı çeşitliliği daha geniştir.
              Peygamberlerin yanı sıra Lokman, İmrân ve Tâlût gibi farklı konumdaki şahsiyetler de
              özel adlarıyla anılır. Kartlarda örnek bir ayet gösterilir; birçok isim başka
              surelerde de tekrar edilir.
            </p>
          </div>
          <div className="grid gap-3">
            {quranBoyNames.map((item, index) => (
              <NameCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </section>

        <Section id="peygamber-isimleri" title="Peygamber İsimleri">
          <p>
            Kur&apos;an&apos;da peygamberler yalnız tarihî kişiler olarak anlatılmaz; her kıssa
            insanın inanç, ahlak ve sorumluluk dünyasına bir yön gösterir. Bu yüzden peygamber
            isimleri ailelerin en uzun ömürlü tercihleri arasında yer alır. Âdem&apos;den
            Muhammed&apos;e uzanan isimler farklı dillerden gelmiş olsa da Türkçede yerleşmiş
            biçimleriyle ortak bir kültürel hafıza oluşturur.
          </p>
          <p>
            Geleneksel kabulde Kur&apos;an&apos;da adı açıkça geçen 25 peygamber sayılır: Âdem,
            İdris, Nuh, Hûd, Salih, İbrahim, Lût, İsmail, İshak, Yakup, Yusuf, Eyyub, Şuayb, Musa,
            Harun, Davud, Süleyman, İlyas, Elyesa, Zülkifl, Yunus, Zekeriyya, Yahya, İsa ve
            Muhammed. Ahmed ise Hz. Muhammed&apos;in Kur&apos;an&apos;da geçen diğer adıdır.
            Zülkifl&apos;in peygamberliği konusunda yorum farklılıkları bulunsa da klasik listede
            peygamberler arasında yer alır.
          </p>
          <div className="flex flex-wrap gap-2">
            {prophetNames.map((item) => (
              <Link
                key={item.slug}
                href={`/isim/${item.slug}`}
                className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-violet-700 ring-1 ring-violet-200 transition hover:bg-violet-50 hover:underline"
              >
                {item.displayName}
              </Link>
            ))}
          </div>
          <p>
            Peygamber adı seçerken kıssanın tamamını tanımak, çocuğa ileride anlatılabilecek
            anlamlı bir aile hikâyesi oluşturur. Nuh uzun soluklu gayreti; İbrahim sorgulayan
            inancı ve teslimiyeti; Yusuf kötülüğe iyilikle karşılık vermeyi; Musa haksızlık
            karşısında cesareti; Yunus hatayı fark edip yeniden yönelmeyi hatırlatır. Bu
            çağrışımlar bir beklenti yükü kurmak için değil, adın arkasındaki değeri bilmek için
            kullanılmalıdır.
          </p>
          <InfoBox type="Not" title="Peygamber olduğu kesin olmayan Kur'an şahsiyetleri">
            <p>
              Lokman, Üzeyir ve Zülkarneyn&apos;in konumu hakkında tefsir geleneğinde farklı
              görüşler vardır. Bu kişiler Kur&apos;an&apos;da anılsa da haklarında kesin olmayan
              “peygamberdir” hükmünü kullanmamak daha isabetlidir. Tâlût ise hükümdar olarak
              anlatılır, peygamber olarak değil.
            </p>
          </InfoBox>
          <p>
            Bir peygamber isminin farklı yazımları görülebilir. Zekeriyya/Zekeriya,
            Eyyub/Eyüp ve Davud/Davut örneklerinde Arapça aktarım ile Türkçede yerleşen biçim
            farklılaşır. Aile, nüfus kaydında tercih edeceği yazımı önceden netleştirmeli ve
            ismin günlük hayatta sürekli düzeltilmeye ihtiyaç duyup duymayacağını düşünmelidir.
            Burada “tek doğru estetik biçim” yoktur; önemli olan seçimin bilinçli ve tutarlı
            olmasıdır.
          </p>
        </Section>

        <Section id="yaygin-islami-isimler" title="Kur'an'da Geçmeyen Ancak İslam Dünyasında Yaygın Kullanılan İsimler">
          <p>
            Bir ismin Kur&apos;an&apos;da geçmemesi, onun dinî veya kültürel değer taşımadığı
            anlamına gelmez. İslam tarihinin ilk dönemlerindeki aile fertleri, sahabiler, âlimler
            ve örnek şahsiyetler birçok güzel adın kuşaktan kuşağa aktarılmasını sağlamıştır.
            Fatma, Ayşe, Zeynep, Hatice, Ali, Hasan ve Hüseyin bu grubun en bilinen
            örneklerindendir.
          </p>
          <p>
            Yanlış bilgi çoğu zaman “İslami isim” ile “Kur&apos;an&apos;da geçen isim” ifadelerinin
            aynı kabul edilmesinden doğar. Hz. Fâtıma, Hz. Âişe ve Hz. Hatice İslam tarihinde çok
            önemli kişiler olsalar da isimleri Kur&apos;an ayetlerinde özel ad olarak yazılı
            değildir. Hz. Zeyneb&apos;in hayatındaki bir olaya işaret eden ayetler bulunsa bile
            ayet metni onun adını açıkça söylemez. Doğru ifade, bu adların İslam dünyasında
            yaygın ve değerli olduğudur.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {widespreadIslamicNames.map((item) => (
              <article key={item.name} className="rounded-xl border border-border bg-white p-4 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-primary">{item.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">
                  <strong className="font-semibold text-primary">Anlamı:</strong> {item.meaning}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">{item.note}</p>
              </article>
            ))}
          </div>
          <InfoBox type="Dikkat" title="Kökün ayette bulunması, özel adın geçtiğini göstermez">
            <p>
              Ali ve Hasan gibi adların dayandığı kelime kökleri Kur&apos;an&apos;da sıfat veya
              nitelik olarak görülebilir. Fakat bu, Hz. Ali ya da Hz. Hasan&apos;ın adının ayette
              özel isim olarak zikredildiği anlamına gelmez. Arama yaparken kök, kelime ve kişi
              adı ayrımı korunmalıdır.
            </p>
          </InfoBox>
          <p>
            Bu gruptaki adlar seçilirken de aynı temel ölçüler geçerlidir: olumlu anlam,
            kolay telaffuz, soyadıyla uyum ve çocuğun hayatının farklı dönemlerinde rahatça
            taşıyabilmesi. Bir adın aile büyüğünden gelmesi veya tarihî bir şahsiyeti
            hatırlatması seçime kişisel bir katman ekleyebilir. Ancak çocuğa ağır bir rol
            yüklemek yerine ismin hikâyesini sevgiyle paylaşmak daha sağlıklı bir yaklaşımdır.
          </p>
        </Section>

        <Section id="isim-secerken" title="İsim Seçerken Nelere Dikkat Edilmeli?">
          <p>
            İsim seçimi bir doğrulama listesine indirgenemeyecek kadar kişisel, yalnız beğeniye
            bırakılamayacak kadar kalıcıdır. Manevi bir ad ararken ilk adım, anlamı güvenilir
            kaynaklardan kontrol etmektir. Aynı isim için internette birbirinden çok farklı,
            hatta çelişkili karşılıklar görülebilir. Bunun nedeni köken bilgisinin, sözlük
            anlamının ve tarih içinde oluşan çağrışımın birbirine karıştırılmasıdır. “Adın
            anlamı” ile “bu adı taşıyan kişinin kıssasından çıkarılan değer” ayrı cümlelerle
            anlatılmalıdır.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "Anlam ve bağlamı birlikte okuyun",
                text: "Kelimenin yalnız sözlük karşılığına değil, ayette kimi veya neyi anlattığına bakın. Olumsuz bir şahsiyetin adı sırf metinde geçtiği için öneri listesine alınmamalıdır.",
              },
              {
                title: "Telaffuzu günlük hayatta deneyin",
                text: "Adı soyadıyla, aile içi hitapta ve resmî bir ortamda birkaç kez yüksek sesle söyleyin. Sürekli açıklama veya düzeltme gerektirip gerektirmediğini düşünün.",
              },
              {
                title: "Yazım biçimini netleştirin",
                text: "Şapkalı harfler, yumuşama ve Türkçede yerleşmiş varyantlar konusunda nüfus kaydından önce karar verin. Seçilen biçimi aile içinde tutarlı kullanın.",
              },
              {
                title: "İki isimde ritmi gözetin",
                text: "İki uzun adı yan yana getirmek söyleyişi zorlaştırabilir. Hece sayısı, vurgu ve soyadıyla oluşan bütünlük birlikte değerlendirilmelidir.",
              },
              {
                title: "Aile hikâyesini baskıya dönüştürmeyin",
                text: "Bir peygamber veya tarihî şahsiyetin adı güzel bir ilhamdır; fakat çocuk o kişinin kopyası olmak zorunda değildir. Ad, sevgiyle aktarılan bir değer olsun.",
              },
              {
                title: "Kesin olmayan iddiayı tekrarlamayın",
                text: "Bir ismin ayette geçtiğinden emin değilseniz sure ve ayet numarasını kontrol edin. Doğrulanamayan bilgiyi kesin bir dinî hüküm gibi paylaşmayın.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-xl border border-violet-100 bg-violet-50/60 p-4 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
          <p>
            İsmin çocuğun gelecekteki mesleki ve sosyal yaşamında nasıl duyulacağını hayal etmek
            de yararlıdır. Bebeklikte sevimli gelen bir kullanım yetişkinlikte fazla çocukça
            kalabilir; çok ağır bir tamlama ise günlük hayatta kısaltmaya dönüşebilir. Zamana
            dayanıklı adlar genellikle açık bir anlama, doğal bir söyleyişe ve aşırı açıklama
            gerektirmeyen bir yazıma sahiptir.
          </p>
          <p>
            Aile büyüklerinin görüşü kıymetli olabilir, fakat son karar anne ve babanın ortak
            sorumluluğundadır. Uzun listeler arasında kaybolmak yerine beş-on aday belirleyip her
            biri için anlam, köken, söyleyiş ve kişisel bağ notu çıkarmak karar sürecini
            kolaylaştırır. Birkaç gün ara verdikten sonra isimleri yeniden okumak, ilk heyecanla
            kalıcı beğeniyi ayırt etmeye yardımcı olur.
          </p>
          <InfoBox type="Bilgi" title="Güvenilir doğrulama nasıl yapılır?">
            <p>
              Sure ve ayet kontrolü için güvenilir bir mushaf veya Diyanet İşleri
              Başkanlığı&apos;nın Kur&apos;an portalı; kelime ve köken bilgisi için akademik
              sözlükler ile TDV İslâm Ansiklopedisi kullanılabilir. Birbirini kopyalayan isim
              listeleri kaynak yerine geçmez.
            </p>
          </InfoBox>
          <p>
            Son olarak, dinî hassasiyet taşıyan özel bir terkip veya anlamı tartışmalı bir ad
            düşünülüyorsa konuyu ehil bir uzmana sormak en güvenli yoldur. İnternetteki kısa bir
            açıklama, kişisel bir fetva veya kesin hüküm değildir. Bu rehber ailelere düzenli bir
            araştırma zemini sunar; çocuğunuz için en doğru kararı ise kendi dil, kültür ve aile
            bağlamınızı gözeterek siz verirsiniz.
          </p>
        </Section>

        <section className="rounded-2xl border border-violet-200 bg-violet-50 p-5 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-primary">İsimleri karşılaştırırken küçük bir yöntem</h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-muted">
            <p>
              Aday adları bir kâğıda yazın ve her birinin yanına üç kısa not ekleyin: “anlamı
              nedir?”, “bizi neden etkiliyor?” ve “soyadıyla nasıl duyuluyor?”. Ardından aile
              içinde kullanılabilecek kısaltmaları düşünün. Bu basit çalışma, yalnız popüler
              olduğu için listede kalan isimlerle gerçekten bağ kurduğunuz isimleri ayırır.
            </p>
            <p>
              Kur&apos;an&apos;da geçen adlar arasında seçim yaparken kıssaları da okuyun. Çocuğa
              ileride anlatabileceğiniz, aile değerlerinizle örtüşen bir hikâye bulmak isme
              derinlik kazandırır. Yine de anlamı abartılı vaatlere dönüştürmeyin; isim bir dua
              ve güzel niyet olabilir, kişiliği belirleyen değişmez bir kader değildir.
            </p>
          </div>
        </section>

        <section id="sik-sorulan-sorular" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-semibold text-primary">Sık Sorulan Sorular</h2>
          <p className="mt-4 text-base leading-8 text-muted">
            Kur&apos;an&apos;da geçen isimler hakkında en çok karıştırılan noktaları kısa ve açık
            cevaplarla bir araya getirdik.
          </p>
          <div className="mt-4 space-y-3">
            {quranGuideFaqs.map((faq) => (
              <details key={faq.id} className="group rounded-xl border border-border bg-white p-4 shadow-sm">
                <summary className="cursor-pointer list-none font-semibold text-primary">{faq.question}</summary>
                <p className="mt-3 text-sm leading-7 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-violet-200 bg-violet-50 p-5 text-center shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-primary">Aradığınız ismi birlikte daraltın</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-muted">
            Daha fazla isim keşfetmek için tüm isim rehberimizi inceleyebilirsiniz.
          </p>
          <Link
            href="/isim-rehberi"
            className="mt-5 inline-flex rounded-full bg-violet-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-800"
          >
            Tüm isim rehberini incele
          </Link>
        </section>

        <Section id="sonuc" title="Sonuç: Güzel Anlamı Doğru Bilgiyle Buluşturun">
          <p>
            Kur&apos;an-ı Kerim&apos;de geçen kız ve erkek isimleri, ailelere güçlü bir kültürel
            ve manevi hafıza sunar. Bu hafızanın hakkını vermek, uzun bir isim listesi
            hazırlamaktan önce doğru sınıflandırma yapmayı gerektirir. Meryem&apos;in
            Kur&apos;an&apos;da adıyla anılan tek kadın olduğunu; peygamber isimlerinin yanı sıra
            hükümdar, bilge veya tarihî şahsiyet adlarının da metinde bulunabildiğini; Fatma,
            Ayşe ve Zeynep gibi çok değerli İslami adların ise ayetlerde özel ad olarak geçmediğini
            bilmek bu araştırmanın temelidir.
          </p>
          <p>
            İyi bir isim kararı, kaynağı doğrulanmış bilgiyle ailenin içten beğenisini bir araya
            getirir. Anlamı olumlu, söylenişi rahat ve hikâyesi aile için değerli bir ad
            bulduğunuzda onu soyadıyla birkaç kez deneyin, yazım biçimini kesinleştirin ve
            çocuğunuzun bu adı hayatının her döneminde taşıyacağını hatırlayın. Böylece seçim,
            geçici bir eğilimin değil bilinçli ve sevgi dolu bir başlangıcın parçası olur.
          </p>
          <p>
            Kararınızı verdikten sonra ismin dayandığı kıssayı aile arşiviniz için kısa bir notla
            kaydetmek güzel bir hatıra olabilir. Hangi ayetin sizi etkilediğini, adın anlamını
            nasıl doğruladığınızı ve eşinizle bu isimde neden buluştuğunuzu yazabilirsiniz.
            Çocuğunuz büyüdüğünde adının yalnızca bir listeden seçilmediğini, düşünülmüş bir
            hikâyeye dayandığını öğrenir. Böyle bir anlatı, isme yük bindirmeden aidiyet duygusu
            kazandırır.
          </p>
          <p>
            Zaman içinde yeni çeviriler, farklı yazım önerileri veya sosyal medyada yayılan
            iddialar görebilirsiniz. Temel bilgiyi yeniden kontrol etmekten çekinmeyin. Sağlam bir
            kaynak, açık bir ayet bağlamı ve tutarlı bir sözlük açıklaması; çok paylaşılan fakat
            kaynağı belirsiz bir görselden daha değerlidir. Çocuğa verilen ad değişmese de aile
            olarak o adın anlamını doğru öğrenme çabanız sürebilir.
          </p>
          <p>
            En nihayetinde güzel isim, yalnız geçmişi hatırlatan değil bugünün hayatında da
            rahatça yaşayan isimdir. Manevi çağrışım ile sade kullanım arasında kurulan denge,
            hem aileyi hem adı taşıyan çocuğu uzun yıllar memnun edecek en güçlü zemini oluşturur.
          </p>
        </Section>

        <section id="ilgili-rehberler" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-semibold text-primary">İlgili rehberler</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedGuides.map((item) => {
              const tone =
                item.tone === "pink"
                  ? "border-pink-100 bg-pink-50/60 text-accent-pink"
                  : item.tone === "blue"
                    ? "border-sky-100 bg-sky-50/70 text-accent-blue"
                    : "border-violet-100 bg-violet-50/60 text-violet-700";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl border p-4 text-sm font-semibold shadow-sm transition hover:border-primary/30 hover:bg-white ${tone}`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
}
