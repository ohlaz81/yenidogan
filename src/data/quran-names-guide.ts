import type { MediaAsset } from "@/types/database";

export type QuranGuideName = {
  displayName: string;
  slug: string;
  meaning: string;
  origin: string;
  reference: string;
  description: string;
};

export type QuranGuideFaq = {
  id: string;
  sortOrder: number;
  question: string;
  answer: string;
};

export const quranNamesGuide = {
  title: "Kur'an-ı Kerim'de Geçen Kız ve Erkek İsimleri ve Anlamları",
  heroTitle: "Kur'an-ı Kerim'de Geçen Kız ve Erkek İsimleri",
  metaTitle: "Kur'an-ı Kerim'de Geçen Kız ve Erkek İsimleri | Yenidoğan.net",
  description:
    "Kur'an-ı Kerim'de geçen kız ve erkek isimlerini anlamlarıyla birlikte keşfedin. Kur'an'da yer alan isimler hakkında detaylı bilgiler Yenidoğan.net'te.",
  pagePath: "/rehber/kuranda-gecen-kiz-ve-erkek-isimleri",
  coverSrc: "/rehber/kuranda-gecen-isimler.png",
  coverAlt: "Kur'an-ı Kerim'de geçen kız ve erkek isimleri ve anlamları rehberi",
  datePublished: "2026-07-25T00:00:00.000Z",
  dateModified: "2026-07-25T00:00:00.000Z",
} as const;

export const quranGirlNames: QuranGuideName[] = [
  {
    displayName: "Meryem",
    slug: "meryem",
    meaning: "İbadete adanmış, iffetli kadın; Hz. İsa'nın annesinin adı",
    origin: "İbranice / Aramice",
    reference: "Âl-i İmrân 3:36; Meryem 19:16",
    description:
      "Kur'an'da kendi adıyla anılan tek kadın Meryem'dir. Onun adı bir sureye de verilmiş; iffeti, teslimiyeti ve seçkinliği ayetlerde özellikle vurgulanmıştır.",
  },
];

export const quranBoyNames: QuranGuideName[] = [
  {
    displayName: "Âdem",
    slug: "adem",
    meaning: "İlk insanın ve ilk peygamberin adı",
    origin: "İbranice",
    reference: "Bakara 2:31",
    description: "Kur'an'da insanlığın başlangıcı, bilgi, sorumluluk ve tövbe bahislerinde adı geçen ilk peygamberdir.",
  },
  {
    displayName: "İdris",
    slug: "idris",
    meaning: "Kur'an'da doğruluğu ve peygamberliğiyle anılan peygamber",
    origin: "Arapça kullanımıyla",
    reference: "Meryem 19:56",
    description: "Meryem suresinde özü sözü doğru bir peygamber olarak tanıtılır ve yüksek bir makama yükseltildiği bildirilir.",
  },
  {
    displayName: "Nuh",
    slug: "nuh",
    meaning: "Kavmini uzun süre hakka çağıran peygamberin adı",
    origin: "İbranice",
    reference: "Nûh 71:1",
    description: "Kur'an'da tebliğde sabır, kararlılık ve tevekkülün güçlü örneklerinden biri olarak anlatılır.",
  },
  {
    displayName: "Hûd",
    slug: "hud",
    meaning: "Âd kavmine gönderilen peygamberin adı",
    origin: "Arapça",
    reference: "Hûd 11:50",
    description: "Kavmini yalnız Allah'a kulluğa ve haksızlıktan uzak durmaya çağıran peygamber olarak zikredilir.",
  },
  {
    displayName: "Salih",
    slug: "salih",
    meaning: "İyi, doğru, erdemli; Semûd kavmine gönderilen peygamberin adı",
    origin: "Arapça",
    reference: "Hûd 11:61",
    description: "Hem güzel bir nitelik bildiren kelime hem de Kur'an'da adı açıkça geçen bir peygamber ismidir.",
  },
  {
    displayName: "İbrahim",
    slug: "ibrahim",
    meaning: "Hz. İbrahim'in adı; gelenekte inançta sebat ve teslimiyetle ilişkilendirilir",
    origin: "İbranice",
    reference: "Bakara 2:124",
    description: "Kur'an'da tevhid mücadelesi, dua, misafirperverlik ve teslimiyet yönleriyle geniş biçimde anlatılır.",
  },
  {
    displayName: "Lût",
    slug: "lut",
    meaning: "Hz. İbrahim döneminde yaşayan peygamberin adı",
    origin: "İbranice",
    reference: "A'râf 7:80",
    description: "Kavmini ahlaki bozulmaya karşı uyaran peygamber olarak birçok surede adıyla anılır.",
  },
  {
    displayName: "İsmail",
    slug: "ismail",
    meaning: "Allah işitir",
    origin: "İbranice",
    reference: "Meryem 19:54",
    description: "Sözünde duran, ailesine namazı ve zekâtı emreden bir peygamber olarak Kur'an'da övülür.",
  },
  {
    displayName: "İshak",
    slug: "ishak",
    meaning: "Gülmek, sevinmek anlamıyla ilişkilendirilen peygamber adı",
    origin: "İbranice",
    reference: "Hûd 11:71",
    description: "Hz. İbrahim ile eşine ileri yaşlarında müjdelenen peygamber olarak ayetlerde yer alır.",
  },
  {
    displayName: "Yakup",
    slug: "yakup",
    meaning: "Hz. İshak'ın oğlu, İsrailoğullarının atası kabul edilen peygamberin adı",
    origin: "İbranice",
    reference: "Bakara 2:132",
    description: "Ailesine inanç mirasını vasiyet eden, sabrı ve ümidini koruyan bir baba ve peygamber olarak anlatılır.",
  },
  {
    displayName: "Yusuf",
    slug: "yusuf",
    meaning: "Allah artırır, çoğaltır",
    origin: "İbranice",
    reference: "Yûsuf 12:4",
    description: "Kendi adını taşıyan surede çocukluğundan yöneticiliğine uzanan hayatı, iffet ve sabır ekseninde anlatılır.",
  },
  {
    displayName: "Eyyub",
    slug: "eyyub",
    meaning: "Allah'a yönelen; sabrıyla tanınan peygamberin adı",
    origin: "İbranice",
    reference: "Enbiyâ 21:83",
    description: "Sıkıntı karşısındaki duası, sabrı ve Rabbine yönelişiyle Kur'an'da örnek gösterilir.",
  },
  {
    displayName: "Şuayb",
    slug: "suayb",
    meaning: "Medyen halkına gönderilen peygamberin adı",
    origin: "Arapça",
    reference: "A'râf 7:85",
    description: "Ölçü ve tartıda dürüstlük, adalet ve toplum düzeni konularındaki uyarılarıyla öne çıkar.",
  },
  {
    displayName: "Musa",
    slug: "musa",
    meaning: "Hz. Musa'nın adı",
    origin: "İbranice / Eski Mısır diliyle ilişkilendirilir",
    reference: "Tâhâ 20:9",
    description: "Kur'an'da adı en çok geçen peygamberdir; Firavun karşısındaki mücadelesi ve İsrailoğullarıyla ilişkisi anlatılır.",
  },
  {
    displayName: "Harun",
    slug: "harun",
    meaning: "Hz. Musa'nın kardeşi ve peygamber",
    origin: "İbranice",
    reference: "Tâhâ 20:30",
    description: "Hz. Musa'nın duasında yardımcı olarak istediği, güzel ve açık konuşmasıyla bilinen kardeşidir.",
  },
  {
    displayName: "Davud",
    slug: "davud",
    meaning: "Sevgili, sevilen; peygamber ve hükümdar adı",
    origin: "İbranice",
    reference: "Bakara 2:251",
    description: "Kendisine Zebur verilen, adaletli hükmü ve güçlü kulluğuyla anılan peygamberdir.",
  },
  {
    displayName: "Süleyman",
    slug: "suleyman",
    meaning: "Barış ve esenlikle ilişkilendirilen peygamber adı",
    origin: "İbranice",
    reference: "Neml 27:15",
    description: "Bilgeliği, şükrü ve kendisine verilen geniş hükümranlıkla Kur'an kıssalarında yer alır.",
  },
  {
    displayName: "İlyas",
    slug: "ilyas",
    meaning: "İlyas peygamberin adı",
    origin: "İbranice",
    reference: "Sâffât 37:123",
    description: "Kavmini Allah'a kulluğa çağıran elçilerden biri olarak açıkça adıyla zikredilir.",
  },
  {
    displayName: "Elyesa",
    slug: "elyesa",
    meaning: "Kur'an'da seçkin kullar arasında anılan peygamberin adı",
    origin: "İbranice",
    reference: "En'âm 6:86",
    description: "İsmail, Yunus ve Lût ile birlikte âlemlere üstün kılınan kişiler arasında sayılır.",
  },
  {
    displayName: "Zülkifl",
    slug: "zulkifl",
    meaning: "Nasip veya sorumluluk sahibi anlamıyla açıklanan Kur'an şahsiyeti",
    origin: "Arapça",
    reference: "Enbiyâ 21:85",
    description: "Sabredenler ve iyi kimseler arasında anılır; peygamber olup olmadığı konusunda farklı değerlendirmeler vardır.",
  },
  {
    displayName: "Yunus",
    slug: "yunus",
    meaning: "Yunus peygamberin adı",
    origin: "İbranice",
    reference: "Sâffât 37:139",
    description: "Kavmine gönderilişi, gemi yolculuğu, duası ve yeniden tebliğe dönüşüyle anlatılır.",
  },
  {
    displayName: "Zekeriyya",
    slug: "zekeriyya",
    meaning: "Allah hatırladı",
    origin: "İbranice",
    reference: "Meryem 19:2",
    description: "İleri yaşında hayırlı bir evlat isteyen samimi duası ve kendisine Yahya'nın müjdelenmesiyle anılır.",
  },
  {
    displayName: "Yahya",
    slug: "yahya",
    meaning: "Yaşar, diri olur",
    origin: "İbranice / Arapça biçimiyle",
    reference: "Meryem 19:7",
    description: "Adının Allah tarafından verildiği bildirilen; hikmet, merhamet ve temizliğiyle övülen peygamberdir.",
  },
  {
    displayName: "İsa",
    slug: "isa",
    meaning: "Hz. Meryem'in oğlu ve Allah'ın elçisi olan peygamberin adı",
    origin: "İbranice / Aramice",
    reference: "Âl-i İmrân 3:45",
    description: "Kur'an'da Mesih ve Meryem oğlu nitelemeleriyle anılır; mucizevi doğumu ve tebliği anlatılır.",
  },
  {
    displayName: "Muhammed",
    slug: "muhammed",
    meaning: "Çok övülen, övgüye layık",
    origin: "Arapça",
    reference: "Âl-i İmrân 3:144; Muhammed 47:2",
    description: "Son peygamberin adı Kur'an'da dört ayette Muhammed olarak açıkça geçer; bir sure de bu adı taşır.",
  },
  {
    displayName: "Ahmed",
    slug: "ahmed",
    meaning: "En çok öven, çok övülen",
    origin: "Arapça",
    reference: "Saff 61:6",
    description: "Hz. İsa'nın kendisinden sonra geleceğini müjdelediği elçinin adı olarak ayette yer alır.",
  },
  {
    displayName: "Lokman",
    slug: "lokman",
    meaning: "Hikmet sahibi Kur'an şahsiyetinin adı",
    origin: "Arapça kullanımıyla",
    reference: "Lokmân 31:12",
    description: "Kendisine hikmet verildiği bildirilen ve oğluna öğütleri aktarılan bilge kişidir; peygamberliği kesin değildir.",
  },
  {
    displayName: "Üzeyir",
    slug: "uzeyir",
    meaning: "Kur'an'da adı geçen İsrailoğulları bilgesinin adı",
    origin: "İbranice",
    reference: "Tevbe 9:30",
    description: "Kur'an'da adı açıkça geçer; peygamber olup olmadığı konusunda kesin bir hüküm bulunmaz.",
  },
  {
    displayName: "Tâlût",
    slug: "talut",
    meaning: "İsrailoğullarına hükümdar olarak gönderilen kişinin adı",
    origin: "İbranice kökenli kabul edilir",
    reference: "Bakara 2:247",
    description: "Bilgi ve beden gücü bakımından üstün kılınan hükümdar olarak anlatılır; peygamber adı değildir.",
  },
  {
    displayName: "İmrân",
    slug: "imran",
    meaning: "Meryem'in ailesiyle ilişkilendirilen özel ad",
    origin: "İbranice / Arapça kullanımıyla",
    reference: "Âl-i İmrân 3:33",
    description: "Kur'an'da Âl-i İmrân, yani İmrân ailesi ifadesinde özel ad olarak geçer ve bir sureye adını verir.",
  },
];

export const widespreadIslamicNames = [
  {
    name: "Fatma",
    meaning: "Sütten kesen, kötülükten uzak duran",
    note: "Hz. Muhammed'in kızı Hz. Fâtıma'nın adı olduğu için İslam dünyasında çok sevilir; Kur'an metninde özel ad olarak geçmez.",
  },
  {
    name: "Ayşe",
    meaning: "Yaşayan, hayat dolu",
    note: "Hz. Âişe'nin adı olması sebebiyle güçlü bir tarihî ve dinî çağrışım taşır; Kur'an'da özel ad olarak yer almaz.",
  },
  {
    name: "Zeynep",
    meaning: "Güzel kokulu bir bitki adı; değerli ve zarif",
    note: "İslam tarihinde birden fazla seçkin hanımın adıdır; Kur'an'da Zeynep adı doğrudan zikredilmez.",
  },
  {
    name: "Hatice",
    meaning: "Erken doğan çocuk",
    note: "Hz. Muhammed'in ilk eşi Hz. Hatice'nin adı olmasıyla özel bir yere sahiptir; Kur'an'da adıyla geçmez.",
  },
  {
    name: "Emine",
    meaning: "Güvenilir, emin, korkusuz",
    note: "Hz. Muhammed'in annesinin adı olarak benimsenmiştir; Kur'an metninde özel ad değildir.",
  },
  {
    name: "Ali",
    meaning: "Yüce, yüksek, ulu",
    note: "Hz. Ali sebebiyle İslam dünyasında yaygındır. Kur'an'da aynı kökten sıfatlar bulunur; Ali kişi adı olarak zikredilmez.",
  },
  {
    name: "Hasan",
    meaning: "Güzel, iyi",
    note: "Hz. Hasan'ın adı olduğu için sevilir. Kelimenin kökü Kur'an'da bulunmakla birlikte Hasan özel adı metinde geçmez.",
  },
  {
    name: "Hüseyin",
    meaning: "Küçük güzel, güzelcik",
    note: "Hz. Hüseyin'in hatırasıyla yaygınlaşmıştır; Kur'an'da özel ad olarak yer almaz.",
  },
] as const;

export const prophetNames = quranBoyNames.slice(0, 26);

export const quranGuideFaqs: QuranGuideFaq[] = [
  {
    id: "faq-1",
    sortOrder: 1,
    question: "Kur'an'da geçen her kelime çocuğa isim olarak verilebilir mi?",
    answer:
      "Hayır. Bir kelimenin Kur'an'da bulunması, onun anlam ve kullanım bakımından kişi adı olmaya uygun olduğu anlamına gelmez. Kelimenin ayetteki bağlamı, sözlük anlamı ve dinî açıdan sakınca taşıyıp taşımadığı birlikte incelenmelidir.",
  },
  {
    id: "faq-2",
    sortOrder: 2,
    question: "Kur'an'da adı açıkça geçen kadın kimdir?",
    answer:
      "Kur'an'da özel adı açıkça zikredilen tek kadın Hz. Meryem'dir. Diğer kadın şahsiyetler eş, anne veya kadın gibi nitelemelerle anılır; özel adları Kur'an metninde verilmez.",
  },
  {
    id: "faq-3",
    sortOrder: 3,
    question: "Fatma, Ayşe ve Zeynep Kur'an'da geçiyor mu?",
    answer:
      "Bu üç ad Kur'an'da özel isim olarak geçmez. İslam tarihindeki değerli şahsiyetlerle ilişkileri sebebiyle Müslüman toplumlarda yaygın ve saygın isimlerdir.",
  },
  {
    id: "faq-4",
    sortOrder: 4,
    question: "Kur'an'da kaç peygamberin adı geçer?",
    answer:
      "Kur'an'da 25 peygamberin adı açıkça zikredilir. Zülkifl'in bu sayı içindeki konumu geleneksel listelerde kabul edilmekle birlikte, Lokman ve Üzeyir gibi bazı şahsiyetlerin peygamberliği konusunda farklı görüşler vardır.",
  },
  {
    id: "faq-5",
    sortOrder: 5,
    question: "Muhammed adı Kur'an'da kaç kez geçer?",
    answer:
      "Muhammed adı Kur'an'da dört ayette açıkça geçer. Ahmed adı ise Saff suresinin 6. ayetinde Hz. İsa'nın müjdelediği elçi bağlamında bir kez zikredilir.",
  },
  {
    id: "faq-6",
    sortOrder: 6,
    question: "Bir ismin Kur'an'da geçmesi onu daha üstün yapar mı?",
    answer:
      "İsimlerin değeri yalnız metinde geçmesine bağlı değildir. Güzel anlam, dinî uygunluk, iyi niyet ve çocuğun hayatı boyunca rahatça kullanabileceği bir ad olması daha temel ölçütlerdir.",
  },
  {
    id: "faq-7",
    sortOrder: 7,
    question: "Kur'an'da geçen olumsuz şahıs adları çocuklara verilir mi?",
    answer:
      "Firavun bir unvan, Hâmân ve Kârûn ise olumsuz tutumlarıyla anlatılan şahsiyetlerdir. Sırf Kur'an'da geçiyor diye bu tür adları tercih etmek doğru bir yaklaşım değildir; bağlam mutlaka değerlendirilmelidir.",
  },
  {
    id: "faq-8",
    sortOrder: 8,
    question: "Peygamber isimlerinin yazılışında hangi biçim seçilmeli?",
    answer:
      "Türkçede yerleşmiş yazım ve telaffuz tercih edilebilir. Resmî kayıttaki biçim, aile içindeki söyleyiş ve soyadıyla uyum birlikte düşünülmeli; farklı alfabe aktarımlarının aynı ada işaret edebileceği unutulmamalıdır.",
  },
  {
    id: "faq-9",
    sortOrder: 9,
    question: "Meryem isminin Kur'an'daki yeri nedir?",
    answer:
      "Meryem adı hem birçok ayette geçer hem de 19. surenin adıdır. Hz. Meryem; iffeti, teslimiyeti, ibadeti ve Hz. İsa'nın annesi oluşuyla anlatılır.",
  },
  {
    id: "faq-10",
    sortOrder: 10,
    question: "İsim seçerken ayet numarasını kontrol etmek gerekir mi?",
    answer:
      "Evet. İnternette dolaşan listelerde hatalı sure ve ayet atıfları bulunabilir. Bir iddia paylaşılmadan önce güvenilir meal veya mushaf üzerinden kelimenin gerçekten geçtiği ve hangi bağlamda kullanıldığı kontrol edilmelidir.",
  },
  {
    id: "faq-11",
    sortOrder: 11,
    question: "Kur'an kökenli kelime ile Kur'an'da geçen kişi adı aynı şey midir?",
    answer:
      "Aynı şey değildir. Nur, Huda veya Rahma gibi kelimeler Kur'an'da kavram olarak bulunabilir; Meryem, Yusuf ve Musa ise metinde belirli kişileri gösteren özel adlardır. Rehberimiz bu ayrımı açıkça korur.",
  },
  {
    id: "faq-12",
    sortOrder: 12,
    question: "İslami açıdan güzel bir isim seçmenin temel ölçüsü nedir?",
    answer:
      "İsmin olumlu ve onurlu bir anlam taşıması, kötü bir inancı veya aşağılayıcı çağrışımı barındırmaması ve çocuk için hayat boyu taşınabilir olması temel ölçülerdir. Şüpheli durumlarda güvenilir bir dinî uzmana danışılabilir.",
  },
  {
    id: "faq-13",
    sortOrder: 13,
    question: "İki isimden birinin Kur'an'da geçmesi yeterli midir?",
    answer:
      "İki isimli kullanımda her ad ayrı ayrı anlam ve uygunluk bakımından değerlendirilmelidir. Bir adın Kur'an'da geçmesi, yanına getirilen diğer adın anlamını veya uyumunu kendiliğinden doğrulamaz.",
  },
];

const guideCover: MediaAsset = {
  id: "kuranda-gecen-kiz-ve-erkek-isimleri-cover",
  url: quranNamesGuide.coverSrc,
  alt: quranNamesGuide.coverAlt,
  createdAt: quranNamesGuide.datePublished,
};

export const quranGuideIndexCard = {
  id: "kuranda-gecen-kiz-ve-erkek-isimleri",
  slug: "kuranda-gecen-kiz-ve-erkek-isimleri",
  title: "Kur'an-ı Kerim'de Geçen Kız ve Erkek İsimleri",
  excerpt:
    "Kur'an-ı Kerim'de geçen kız ve erkek isimlerini, anlamlarını ve kökenlerini detaylı olarak keşfedin.",
  href: quranNamesGuide.pagePath,
  cover: guideCover,
};
