import path from "path";
import { config as loadEnv } from "dotenv";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";
import { Gender, NameStyle } from "../src/generated/prisma/enums";

loadEnv({ path: path.resolve(process.cwd(), ".env"), override: true });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL gerekli (prisma/seed.ts)");
}

const authToken = process.env.LIBSQL_AUTH_TOKEN;
const prisma = new PrismaClient({
  adapter: new PrismaLibSql(
    authToken ? { url: connectionString, authToken } : { url: connectionString },
  ),
});

async function main() {
  await prisma.similarName.deleteMany();
  await prisma.homeFeaturedName.deleteMany();
  await prisma.name.deleteMany();
  await prisma.heroSlide.deleteMany();
  await prisma.categoryShowcase.deleteMany();
  await prisma.homepageQuickLink.deleteMany();
  await prisma.guideArticle.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.mediaAsset.deleteMany();
  await prisma.user.deleteMany();

  const mediaHero = await prisma.mediaAsset.create({
    data: {
      url: "/media/babies/hero.jpg",
      alt: "Yatakta sırtüstü yatan bebek — yumuşak ışık",
    },
  });
  const mediaNameThumb = await prisma.mediaAsset.create({
    data: {
      url: "/media/babies/isim-thumb.jpg",
      alt: "Yetişkin elinde bebek ayakları",
    },
  });
  const showcaseMedias = await Promise.all(
    (
      [
        ["/media/babies/showcase-kiz.jpg", "Pembe tekstilde uyuyan bebek"],
        ["/media/babies/showcase-erkek.jpg", "Çiçekli zıbında yatakta bebek"],
        ["/media/babies/showcase-kuran.jpg", "Yetişkin ve bebeğin parmak ucu teması"],
        ["/media/babies/showcase-populer.jpg", "Gülümseyen ebeveynler ve bebek"],
        ["/media/babies/showcase-modern.jpg", "Beyaz örgü şapkalı yeni doğan"],
        ["/media/babies/showcase-nadir.jpg", "Yeni doğan bebeğin minik ayağı"],
      ] as const
    ).map(([url, alt]) => prisma.mediaAsset.create({ data: { url, alt } })),
  );
  const guideCovers = await Promise.all(
    (
      [
        ["/media/babies/guide-1.jpg", "Beyaz battaniyeye sarılı bebek"],
        ["/media/babies/guide-2.jpg", "Esniyen bebek"],
        ["/media/babies/guide-3.jpg", "Kumaş üzerinde uyuyan bebek"],
        ["/media/babies/guide-4.jpg", "Beyaz tekstilde uyuyan bebek"],
      ] as const
    ).map(([url, alt]) => prisma.mediaAsset.create({ data: { url, alt } })),
  );

  const passwordHash = await bcrypt.hash("Admin123!", 10);
  await prisma.user.create({
    data: {
      email: "admin@yenidogan.local",
      passwordHash,
      name: "Yönetici",
    },
  });

  const namesData: Array<{
    slug: string;
    displayName: string;
    gender: (typeof Gender)[keyof typeof Gender];
    meaning: string;
    origin: string;
    pronunciation: string;
    popularity: number;
    popularScore: number;
    inQuran: boolean;
    style: (typeof NameStyle)[keyof typeof NameStyle];
    isShort: boolean;
    beautifulMeaning: boolean;
    intro: string;
    traits: string[];
  }> = [
    {
      slug: "asel",
      displayName: "Asel",
      gender: Gender.GIRL,
      meaning: "Bal, tatlı",
      origin: "Arapça",
      pronunciation: "A-sel",
      popularity: 4,
      popularScore: 88,
      inQuran: false,
      style: NameStyle.MODERN,
      isShort: true,
      beautifulMeaning: true,
      intro:
        "Kısa ve akılda kalıcı; modern ailelerin sık tercih ettiği tatlı bir kız ismi.",
      traits: ["Neşeli", "Zarif", "Özgüvenli", "Sıcakkanlı"],
    },
    {
      slug: "asya",
      displayName: "Asya",
      gender: Gender.GIRL,
      meaning: "Asya kıtası; geniş ufuk",
      origin: "Farsça / coğrafi",
      pronunciation: "As-ya",
      popularity: 4,
      popularScore: 72,
      inQuran: false,
      style: NameStyle.MODERN,
      isShort: true,
      beautifulMeaning: false,
      intro: "Modern ve uluslararası hissi güçlü, akıcı telaffuzu olan bir isim.",
      traits: ["Meraklı", "Cesur", "Bağımsız"],
    },
    {
      slug: "alya",
      displayName: "Alya",
      gender: Gender.GIRL,
      meaning: "Yüksek, ulvi, gökyüzü",
      origin: "Türkçe / Arapça kökenli kullanım",
      pronunciation: "Al-ya",
      popularity: 5,
      popularScore: 95,
      inQuran: false,
      style: NameStyle.MODERN,
      isShort: true,
      beautifulMeaning: true,
      intro: "Hem yumuşak hem iddialı; listelerde öne çıkan popüler bir seçenek.",
      traits: ["Zarif", "Duygusal", "Yaratıcı", "İletişimci"],
    },
    {
      slug: "elif",
      displayName: "Elif",
      gender: Gender.GIRL,
      meaning: "İlk harf; sadelik ve bütünlük",
      origin: "Arapça / Kur'anî köken",
      pronunciation: "E-lif",
      popularity: 5,
      popularScore: 98,
      inQuran: true,
      style: NameStyle.CLASSIC,
      isShort: true,
      beautifulMeaning: true,
      intro: "Köklü ve sevilen; hem klasik hem çağdaş kullanımı güçlü bir isim.",
      traits: ["Dengeli", "Sabırlı", "Merhametli"],
    },
    {
      slug: "zeynep",
      displayName: "Zeynep",
      gender: Gender.GIRL,
      meaning: "Güzel süs; değerli taş",
      origin: "Arapça",
      pronunciation: "Zey-nep",
      popularity: 5,
      popularScore: 99,
      inQuran: true,
      style: NameStyle.POPULAR,
      isShort: false,
      beautifulMeaning: true,
      intro: "Yıllardır en çok tercih edilen isimlerden; güçlü kültürel bağları var.",
      traits: ["Cömert", "Dışa dönük", "Lider"],
    },
    {
      slug: "defne",
      displayName: "Defne",
      gender: Gender.GIRL,
      meaning: "Defne ağacı; zafer ve tazelik",
      origin: "Yunanca",
      pronunciation: "Def-ne",
      popularity: 4,
      popularScore: 80,
      inQuran: false,
      style: NameStyle.MODERN,
      isShort: true,
      beautifulMeaning: true,
      intro: "Doğa esintili, modern ve feminen bir seçim.",
      traits: ["Dinamik", "Estetik", "Özgün"],
    },
    {
      slug: "yusuf",
      displayName: "Yusuf",
      gender: Gender.BOY,
      meaning: "Allah'ın çoğaltması; güzellik",
      origin: "Arapça",
      pronunciation: "Yu-suf",
      popularity: 5,
      popularScore: 97,
      inQuran: true,
      style: NameStyle.CLASSIC,
      isShort: false,
      beautifulMeaning: true,
      intro: "Kur'an'da geçen peygamber ismi; köklü ve güven veren bir tercih.",
      traits: ["Adil", "Duyarlı", "Lider"],
    },
    {
      slug: "omer",
      displayName: "Ömer",
      gender: Gender.BOY,
      meaning: "Uzun ömür; canlı",
      origin: "Arapça",
      pronunciation: "Ö-mer",
      popularity: 5,
      popularScore: 92,
      inQuran: true,
      style: NameStyle.POPULAR,
      isShort: true,
      beautifulMeaning: false,
      intro: "Kısa, net ve nesiller boyu sevilen klasik bir erkek ismi.",
      traits: ["Kararlı", "Pratik", "Güvenilir"],
    },
    {
      slug: "aras",
      displayName: "Aras",
      gender: Gender.BOY,
      meaning: "Akarsu; bağ, köprü",
      origin: "Türkçe",
      pronunciation: "A-ras",
      popularity: 4,
      popularScore: 78,
      inQuran: false,
      style: NameStyle.MODERN,
      isShort: true,
      beautifulMeaning: true,
      intro: "Modern Türkçe isimler arasında öne çıkan, güçlü sesi olan bir ad.",
      traits: ["Cesur", "Maceraperest", "Dürüst"],
    },
    {
      slug: "mirac",
      displayName: "Miraç",
      gender: Gender.BOY,
      meaning: "Gece yolculuğu; yükseliş",
      origin: "Arapça",
      pronunciation: "Mi-raç",
      popularity: 4,
      popularScore: 70,
      inQuran: false,
      style: NameStyle.MODERN,
      isShort: false,
      beautifulMeaning: true,
      intro: "Manevi derinliği ve modern kullanımı bir arada taşıyan bir isim.",
      traits: ["Hayalperest", "İçe dönük", "Sabırlı"],
    },
    {
      slug: "alparslan",
      displayName: "Alparslan",
      gender: Gender.BOY,
      meaning: "Aslan gibi yiğit",
      origin: "Türkçe",
      pronunciation: "Al-par-slan",
      popularity: 4,
      popularScore: 65,
      inQuran: false,
      style: NameStyle.CLASSIC,
      isShort: false,
      beautifulMeaning: true,
      intro: "Tarihî çağrışımı güçlü, iddialı ve anlamlı uzun bir isim.",
      traits: ["Güçlü", "Lider", "Cesur"],
    },
    {
      slug: "lina",
      displayName: "Lina",
      gender: Gender.GIRL,
      meaning: "Hassas, ince palmiye",
      origin: "Arapça / Latin kullanımı",
      pronunciation: "Li-na",
      popularity: 4,
      popularScore: 68,
      inQuran: false,
      style: NameStyle.MODERN,
      isShort: true,
      beautifulMeaning: true,
      intro: "Uluslararası da kullanılan, yumuşak ve modern bir kız ismi.",
      traits: ["Nazik", "Sanatsal", "Duygusal"],
    },
    {
      slug: "narin",
      displayName: "Narin",
      gender: Gender.GIRL,
      meaning: "İnce, zarif",
      origin: "Farsça",
      pronunciation: "Na-rin",
      popularity: 3,
      popularScore: 42,
      inQuran: false,
      style: NameStyle.RARE,
      isShort: false,
      beautifulMeaning: true,
      intro: "Daha az rastlanan, şiirsel bir feminenlik taşıyan isim.",
      traits: ["Zarif", "Sakin", "Gözlemci"],
    },
    {
      slug: "kuzey",
      displayName: "Kuzey",
      gender: Gender.BOY,
      meaning: "Kutup yıldızının bulunduğu yön",
      origin: "Türkçe",
      pronunciation: "Ku-zey",
      popularity: 4,
      popularScore: 75,
      inQuran: false,
      style: NameStyle.MODERN,
      isShort: false,
      beautifulMeaning: false,
      intro: "Coğrafi ve modern bir erkek ismi; akılda kalıcı telaffuz.",
      traits: ["Mantıklı", "Kararlı", "Meraklı"],
    },
    {
      slug: "ayaz",
      displayName: "Ayaz",
      gender: Gender.BOY,
      meaning: "Don, serin hava; ayaz",
      origin: "Türkçe",
      pronunciation: "A-yaz",
      popularity: 4,
      popularScore: 76,
      inQuran: false,
      style: NameStyle.MODERN,
      isShort: true,
      beautifulMeaning: true,
      intro: "Kısa ve güçlü; doğa ile bağlantılı modern bir seçim.",
      traits: ["Sakin", "Dirençli", "Dürüst"],
    },
  ];

  const createdNames: Record<string, string> = {};
  for (const n of namesData) {
    const row = await prisma.name.create({
      data: {
        slug: n.slug,
        displayName: n.displayName,
        gender: n.gender,
        meaning: n.meaning,
        origin: n.origin,
        pronunciation: n.pronunciation,
        popularity: n.popularity,
        popularScore: n.popularScore,
        inQuran: n.inQuran,
        style: n.style,
        isShort: n.isShort,
        beautifulMeaning: n.beautifulMeaning,
        firstLetter: n.displayName[0].toLocaleUpperCase("tr-TR"),
        intro: n.intro,
        traits: n.traits,
        published: true,
        imageId: mediaNameThumb.id,
      },
    });
    createdNames[n.slug] = row.id;
  }

  const linkSimilar = (a: string, b: string) => {
    const sa = createdNames[a];
    const sb = createdNames[b];
    if (!sa || !sb || sa === sb) return;
    return prisma.similarName.create({
      data: { sourceId: sa, targetId: sb },
    });
  };

  await Promise.all([
    linkSimilar("alya", "asya"),
    linkSimilar("alya", "asel"),
    linkSimilar("alya", "lina"),
    linkSimilar("asel", "asya"),
    linkSimilar("elif", "zeynep"),
    linkSimilar("yusuf", "omer"),
    linkSimilar("aras", "ayaz"),
  ]);

  await prisma.heroSlide.create({
    data: {
      sortOrder: 0,
      headline: "Bebeğiniz için en anlamlı ismi bulun",
      subline:
        "Anlamları, kökenleri ve özellikleriyle binlerce kız ve erkek ismi keşfedin.",
      ctaLabel: "İsim bulucuya git",
      ctaHref: "/isim-bulucu",
      imageId: mediaHero.id,
      published: true,
    },
  });

  await prisma.categoryShowcase.createMany({
    data: [
      {
        title: "En güzel kız isimleri",
        subtitle: "250+ isim",
        href: "/kiz-isimleri",
        tagLabel: "KIZ İSİMLERİ",
        tagTone: "pink",
        imageId: showcaseMedias[0]!.id,
        sortOrder: 0,
        published: true,
      },
      {
        title: "En güzel erkek isimleri",
        subtitle: "250+ isim",
        href: "/erkek-isimleri",
        tagLabel: "ERKEK İSİMLERİ",
        tagTone: "blue",
        imageId: showcaseMedias[1]!.id,
        sortOrder: 1,
        published: true,
      },
      {
        title: "Kur'an'da geçen isimler",
        subtitle: "200+ isim",
        href: "/kuranda-gecen-isimler",
        tagLabel: "KUR'AN'DA GEÇEN",
        tagTone: "green",
        imageId: showcaseMedias[2]!.id,
        sortOrder: 2,
        published: true,
      },
      {
        title: "2026'nın en popüler isimleri",
        subtitle: "Trend isimler",
        href: "/populer-isimler",
        tagLabel: "POPÜLER İSİMLER",
        tagTone: "yellow",
        imageId: showcaseMedias[3]!.id,
        sortOrder: 3,
        published: true,
      },
      {
        title: "Modern isimler",
        subtitle: "Çağdaş seçimler",
        href: "/modern-isimler",
        tagLabel: "MODERN",
        tagTone: "purple",
        imageId: showcaseMedias[4]!.id,
        sortOrder: 4,
        published: true,
      },
      {
        title: "Nadir isimler",
        subtitle: "Özgün keşif",
        href: "/nadir-isimler",
        tagLabel: "NADİR",
        tagTone: "lavender",
        imageId: showcaseMedias[5]!.id,
        sortOrder: 5,
        published: true,
      },
    ],
  });

  await prisma.homepageQuickLink.createMany({
    data: [
      { label: "Kız İsimleri", href: "/kiz-isimleri", iconKey: "girl", sortOrder: 0, published: true },
      { label: "Erkek İsimleri", href: "/erkek-isimleri", iconKey: "boy", sortOrder: 1, published: true },
      { label: "Kur'an'da Geçen", href: "/kuranda-gecen-isimler", iconKey: "quran", sortOrder: 2, published: true },
      { label: "Popüler İsimler", href: "/populer-isimler", iconKey: "star", sortOrder: 3, published: true },
      { label: "İsim Bulucu", href: "/isim-bulucu", iconKey: "search", sortOrder: 4, published: true },
      { label: "Favorilerim", href: "/favorilerim", iconKey: "heart", sortOrder: 5, published: true },
    ],
  });

  const girlOrder = ["zeynep", "defne", "asel", "elif", "alya"];
  const boyOrder = ["alparslan", "yusuf", "mirac", "aras", "omer"];
  let pos = 0;
  for (const slug of girlOrder) {
    await prisma.homeFeaturedName.create({
      data: {
        column: "girl",
        position: pos++,
        nameId: createdNames[slug],
      },
    });
  }
  pos = 0;
  for (const slug of boyOrder) {
    await prisma.homeFeaturedName.create({
      data: {
        column: "boy",
        position: pos++,
        nameId: createdNames[slug],
      },
    });
  }

  await prisma.guideArticle.createMany({
    data: [
      {
        slug: "bebek-ismi-nasil-secilir",
        title: "Bebek ismi nasıl seçilir?",
        excerpt: "Ses, anlam, uyum ve gelecekteki kullanım için pratik bir çerçeve.",
        body: `<p>İsim seçimi hem duygusal hem pratik kararlar içerir. Birkaç soru işinizi kolaylaştırır:</p>
        <ul><li>Telaffuz herkes için kolay mı?</li><li>Anlam ve köken aile değerlerinizle uyuyor mu?</li><li>İkinci isimle birlikte akıcı mı?</li></ul>`,
        published: true,
        publishedAt: new Date(),
        coverId: guideCovers[0]!.id,
      },
      {
        slug: "isimlerin-anlamlari-neden-onemlidir",
        title: "İsimlerin anlamları neden önemlidir?",
        excerpt: "Anlam, kimlik hissi ve günlük kullanımda motivasyon yaratabilir.",
        body: `<p>İsim, çocuğunuzla kuracağınız ilk hikâyelerden biridir. Anlamı güçlü bir isim, aile içinde pozitif bir çerçeve sunabilir.</p>`,
        published: true,
        publishedAt: new Date(),
        coverId: guideCovers[1]!.id,
      },
      {
        slug: "modern-ve-farkli-isim-onerileri",
        title: "Modern ve farklı isim önerileri",
        excerpt: "Kısa, akıcı ve çağdaş isimlere odaklanan bir seçki.",
        body: `<p>Modern isimlerde kısalık, uluslararası telaffuz ve yumuşak ünlüler öne çıkar. Listenizi daraltırken birkaç ismi birlikte seslendirmek faydalıdır.</p>`,
        published: true,
        publishedAt: new Date(),
        coverId: guideCovers[2]!.id,
      },
      {
        slug: "nadir-bulunan-isimler-ve-anlamlari",
        title: "Nadir bulunan isimler ve anlamları",
        excerpt: "Daha az rastlanan ama anlamlı alternatifler.",
        body: `<p>Nadir isimler özgünlük sunar; ancak telaffuz ve yazım konusunda küçük bir rehber hazırlamak işinizi kolaylaştırır.</p>`,
        published: true,
        publishedAt: new Date(),
        coverId: guideCovers[3]!.id,
      },
    ],
  });

  await prisma.fAQ.createMany({
    data: [
      {
        sortOrder: 0,
        question: "Bebek ismi seçerken nelere dikkat etmeliyim?",
        answer:
          "Telaffuz kolaylığı, anlam, aile gelenekleri, ikinci isim uyumu ve olası takma adları birlikte değerlendirin.",
      },
      {
        sortOrder: 1,
        question: "Kız isimleri neye göre popüler oluyor?",
        answer:
          "Liste sıralamaları, medya kullanımı ve telaffuz kolaylığı popülerliği etkiler; biz popülerlik skorunu içerik ekibinin güncellemesiyle tutarlı tutarız.",
      },
      {
        sortOrder: 2,
        question: "Kur'an'da geçen kız isimleri hangileridir?",
        answer:
          "Elif, Zeynep gibi birçok isim Kur'anî köken veya peygamber çevresiyle ilişkilendirilir. Detay sayfasında 'Kur'an'da geçiyor mu?' alanını kontrol edin.",
      },
      {
        sortOrder: 3,
        question: "Modern ve farklı isimler nelerdir?",
        answer:
          "Modern isimler kısa, akıcı ve çağdaş kullanıma uygundur. Modern isimler sayfamızdan güncel listeyi inceleyebilirsiniz.",
      },
      {
        sortOrder: 4,
        question: "İkiz bebeklere isim nasıl konur?",
        answer:
          "Uyumlu sesler, ortak tema (doğa, renk) veya zıtlık yaratan dengeli çiftler tercih edilebilir; telaffuzu yan yana denemek iyi bir testtir.",
      },
    ],
  });

  await prisma.siteSetting.createMany({
    data: [
      { key: "contact_email", value: "iletisim@yenidogan.local" },
      { key: "about_lead", value: "yenidoğan.net, anne-baba adaylarına isim keşfinde güvenilir ve okunabilir bir rehber sunmak için hazırlandı." },
    ],
  });

  console.log("Seed tamam. Giriş: admin@yenidogan.local / Admin123!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
