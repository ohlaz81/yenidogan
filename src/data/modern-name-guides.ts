import type { BabyNameSeed } from "@/types/baby-name-seed";
import type { MediaAsset } from "@/types/database";
import { BABY_NAME_SEED } from "@/data/baby-names";

type Accent = "pink" | "blue";

export type ModernGuideName = Pick<
  BabyNameSeed,
  "slug" | "displayName" | "meaning" | "origin" | "style" | "traits"
>;

export type ModernGuideFaq = {
  id: string;
  sortOrder: number;
  question: string;
  answer: string;
};

export type ModernNamesGuide = {
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  pagePath: string;
  coverSrc: string;
  coverAlt: string;
  accent: Accent;
  genderLabel: "Kız" | "Erkek";
  datePublished: string;
  dateModified: string;
  intro: string[];
  modernDefinition: string[];
  preferenceReasons: string[];
  selectionAdvice: string[];
  modernTraits: string[];
  trendParagraphs: string[];
  featuredNames: string[];
  finalAdvice: string[];
  conclusion: string[];
  names: ModernGuideName[];
  faqs: ModernGuideFaq[];
};

export type ModernGuideIndexCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  href: string;
  cover: MediaAsset;
};

const T = "2026-07-12T00:00:00.000Z";

function guideCover(id: string, url: string, alt: string): MediaAsset {
  return { id, url, alt, createdAt: T };
}

function selectNames(gender: "GIRL" | "BOY", preferredSlugs: string[]) {
  const preferred = preferredSlugs
    .map((slug) => BABY_NAME_SEED.find((name) => name.slug === slug && name.gender === gender))
    .filter((name): name is BabyNameSeed => Boolean(name));
  const fallback = BABY_NAME_SEED.filter(
    (name) =>
      name.gender === gender &&
      !preferredSlugs.includes(name.slug) &&
      (name.style === "MODERN" || name.style === "POPULAR" || name.isShort || name.popularScore >= 3),
  );

  return [...preferred, ...fallback].slice(0, 150).map((name) => ({
    slug: name.slug,
    displayName: name.displayName,
    meaning: name.meaning,
    origin: name.origin,
    style: name.style,
    traits: name.traits,
  }));
}

const girlPreferredSlugs = [
  "asel",
  "mira",
  "duru",
  "lina",
  "masal",
  "maya",
  "mila",
  "miray",
  "mina",
  "luna",
  "lavinya",
  "lidya",
  "kumsal",
  "kardelen",
  "irmak",
  "goksu",
  "gokce",
  "hayal",
  "iklim",
  "ilayda",
  "ilay",
  "ilsu",
  "izel",
  "lila",
  "lalin",
  "mavi",
  "melodi",
  "mercan",
];

const boyPreferredSlugs = [
  "aras",
  "atlas",
  "doruk",
  "kuzey",
  "ayaz",
  "ege",
  "kaan",
  "emir",
  "goktug",
  "demir",
  "tuna",
  "ruzgar",
  "toprak",
  "yalin",
  "mert",
  "efe",
  "cinar",
  "poyraz",
  "bora",
  "batuhan",
  "ediz",
  "selim",
  "umut",
  "kivanc",
  "koray",
  "bugra",
  "egehan",
];

export const modernGirlGuide: ModernNamesGuide = {
  title: "Modern Kız Bebek İsimleri (150+ Anlamlı ve Popüler İsim Önerisi)",
  metaTitle: "Modern Kız Bebek İsimleri: 150 Anlamlı Öneri",
  description:
    "Modern kız bebek isimleri için 150 isimlik editoryal liste; anlamlar, kökenler, 2026 trendleri, isim seçme tavsiyeleri ve detay bağlantıları.",
  keywords: [
    "modern kız bebek isimleri",
    "modern isim önerileri",
    "popüler bebek isimleri",
    "anlamlı isimler",
    "farklı bebek isimleri",
    "yeni nesil isimler",
    "trend isimler",
  ],
  pagePath: "/rehber/modern-kiz-bebek-isimleri",
  coverSrc: "/rehber/modern-kiz-bebek-isimleri.png",
  coverAlt: "Modern kız bebek isimleri rehberi kapak görseli",
  accent: "pink",
  genderLabel: "Kız",
  datePublished: "2026-07-12",
  dateModified: "2026-07-12",
  intro: [
    "Modern kız bebek isimleri arayan ailelerin beklentisi son yıllarda belirgin biçimde değişti. Artık yalnızca kulağa zarif gelen bir ad yeterli görülmüyor; ismin anlamı, günlük hayattaki rahatlığı, soyadıyla uyumu, sosyal çevrede bıraktığı izlenim ve çocuğun ileride bu ismi nasıl taşıyacağı birlikte düşünülüyor. Bu yüzden modern isim önerileri, kısa ve akıcı seçeneklerle anlamı güçlü, kültürel bağını koruyan adları aynı potada buluşturuyor.",
    "Bu sayfadaki seçki, Yenidoğan.net'te yayında olan kız isimleri tek tek süzülerek hazırlandı. Buradaki amaç resmi bir nüfus sıralaması vermek değil; popüler bebek isimleri ile daha farklı bebek isimleri arasında kalan ailelere okunabilir, güven veren ve kolay karşılaştırılan bir araştırma zemini oluşturmaktır. Her isim kendi detay sayfasına bağlanır; beğendiğiniz adın anlamını, telaffuzunu ve benzer isimlerini ayrıca inceleyebilirsiniz.",
    "Modernlik burada yalnızca yeni duyulmak anlamına gelmez. Bir isim bugünün diline uyum sağlarken anlamını koruyor, gereksiz gösterişe kaçmadan akılda kalıyor ve aile içinde doğal söyleniyorsa güçlü bir aday haline gelir. Kız isimlerinde 2026 çizgisi de bu dengede şekilleniyor: sade, zarif, anlamlı, kolay telaffuz edilen ve gelecekte de değerini kaybetmeyecek isimler öne çıkıyor.",
  ],
  modernDefinition: [
    "Modern kız ismi, çağdaş bir tınıya sahip olduğu halde köksüz veya geçici durmayan isimdir. Duru, Lina, Mira, Masal, Maya, Lila, İklim ve Kumsal gibi adlar bu hissi farklı biçimlerde taşır; kimisi doğadan, kimisi ışıktan, kimisi de yalın bir ses düzeninden güç alır.",
    "Bir ismi modern yapan şey yalnızca az duyulması değildir. Çok bilinen bir isim de doğru anlam, sade yazım ve dengeli telaffuzla modern algılanabilir. Örneğin Elif ya da Zeynep gibi köklü isimler klasik çizgide dursa da kısa ve güçlü yapıları nedeniyle yeni nesil ailelerin listesinde hâlâ yer bulur.",
    "Modern isimlerde asıl mesele, ismin bugünün yaşamına uyum sağlamasıdır. Okulda, sosyal medyada, iş hayatında ve farklı şehirlerde rahat anlaşılabilen; yazıldığı gibi okunabilen; açıklaması zor olmayan isimler daha güvenli tercih edilir.",
  ],
  preferenceReasons: [
    "Aileler modern kız isimlerine çoğu zaman üç nedenle yönelir: daha sade bir söyleyiş istemek, çocuğa özgün ama zorlayıcı olmayan bir kimlik vermek ve anlamı olumlu bir başlangıç seçmek. Bu üç beklenti birleştiğinde kısa, akıcı ve anlamı açık isimler ön plana çıkar.",
    "Yeni nesil isimler, özellikle uzun soyadlarıyla daha dengeli durabildiği için de tercih edilir. Tek ya da iki heceli isimler, günlük hayatta kolay çağrılır; okul listelerinde ve resmi kayıtlarda daha az karışır; çocuğun ismini sahiplenmesini kolaylaştırır.",
    "Bir başka etken de ailelerin artık yalnızca çevreden duydukları isimlerle yetinmemesi. Ebeveynler anlamı, kökeni, benzer isimleri ve kullanım hissini araştırıyor. Bu bilinçli yaklaşım, trend isimler ile kalıcı isimler arasındaki farkı daha görünür hale getiriyor.",
  ],
  selectionAdvice: [
    "Kız ismini soyadıyla birlikte yumuşak bir akış içinde okuyun; art arda gelen sert sesler zarif duran bir adı günlük kullanımda yorabilir.",
    "Çok romantik veya masalsı bir ad seçiyorsanız yetişkinlikte de doğal durup durmadığını özellikle değerlendirin.",
    "Popüler bebek isimleri fikir verebilir; fakat kızınız için seçeceğiniz adın yalnızca çevrede sevildiği için değil, sizin aile dilinizde de sıcak durduğu için öne çıkmasına dikkat edin.",
    "Kısa listenizi birkaç gün bekletin ve isimleri farklı hitap cümlelerinde deneyin; kulağınızın tekrar döndüğü seçenekler daha güçlü adaylardır.",
    "Çift isim düşünüyorsanız iki adın birlikte fazla süslü veya uzun olmamasına, günlük hayatta hangisinin kullanılacağına baştan karar verin.",
    "Yeni nesil kız isimlerinde özgünlük güzel bir artıdır; yine de yazımı kolay, anlamı açık ve okul çağında rahat kullanılacak seçenekleri öne alın.",
  ],
  modernTraits: [
    "Zarif ama kırılgan durmaz; yumuşak bir ses taşısa bile güçlü ve net bir kimlik hissi verir.",
    "Anlamı kolay anlatılır; ışık, doğa, sevgi, iyilik, bereket veya sakinlik gibi olumlu bir duyguya bağlanır.",
    "Bebeklikte sevimli, gençlikte doğal, yetişkinlikte saygın duyulabilecek esnekliğe sahiptir.",
    "Yazımı sade olduğu için okul listelerinde, resmi belgelerde ve dijital alanlarda gereksiz karışıklık oluşturmaz.",
    "Modern görünürken aile belleğinden tamamen kopmaz; büyüklerin de rahat benimseyebileceği bir açıklık taşır.",
    "Kardeş isimleriyle yan yana geldiğinde fazla benzeşmeden uyum kurabilir.",
  ],
  trendParagraphs: [
    "2026 kız isimleri trendlerinde doğa çağrışımları güçlü biçimde hissediliyor. Irmak, Göksu, Kumsal, Mavi, Kardelen, Fidan ve Pınar gibi isimler, ferahlık ve sadelik arayan ailelerin ilgisini çekiyor. Bu tür adlar, hem anlamı kolay anlatıldığı hem de günlük hayatta yumuşak duyulduğu için modern listelerde kendine yer buluyor.",
    "Kısa ve melodik isimler de yükselişte. Mira, Lina, Lila, Mila, Mina, Maya ve Duru gibi seçenekler, az heceyle net bir kimlik kuruyor. Bu isimlerin ortak özelliği, fazla açıklama gerektirmeden zarif bir izlenim bırakmasıdır.",
    "Daha farklı bebek isimleri arayan ailelerde ise Lavinya, Karya, Lalin, İzel, İlsu, Melodi, Luna ve Lizge gibi seçenekler öne çıkıyor. Bu isimler bilinen kalıpların dışına çıkar; ancak tamamen anlaşılmaz veya günlük kullanımı zor bir çizgiye de kaymaz.",
    "Manevi veya köklü anlam taşıyan modern kız isimleri de 2026'da güçlü kalıyor. Asel, Ecrin, Hira, İkra, Meva ve Kevser gibi adlar, ailelerin anlamlı isimler arayışına cevap verirken çağdaş telaffuzlarıyla da kısa listelerde yer alıyor.",
  ],
  featuredNames: ["Asel", "Mira", "Duru", "Lina", "Masal", "Maya", "Mila", "Miray", "Luna", "İklim", "Kumsal", "Lavinya"],
  finalAdvice: [
    "Kız bebek ismi seçerken ilk listeyi geniş tutmak faydalıdır; fakat karar aşamasında üç ya da beş isimlik daha dar bir listeye inmek gerekir. Bu kısa listeyi soyadıyla birlikte yazmak, sesli okumak ve birkaç gün bekletmek çoğu aile için oldukça açıklayıcı olur.",
    "Modern bir isim seçerken çevrenin ilk tepkisini fazla büyütmemek gerekir. Bazı isimler ilk duyulduğunda yeni gelebilir; fakat anlamı güzel, söyleyişi rahat ve aileye sıcak geliyorsa zamanla doğal bir yere oturur. Buna karşılık yalnızca ilginç olduğu için seçilen isimlerde dikkatli olmak gerekir.",
    "İsmin çocuğun hayatındaki tüm yaşlara eşlik edeceğini unutmayın. Bebeklikte tatlı gelen bir ad, gençlikte ve yetişkinlikte de doğal duruyorsa daha güçlü bir tercihtir.",
  ],
  conclusion: [
    "Modern kız bebek isimleri arasında en doğru seçenek, yalnızca popüler olduğu için değil; anlamı, sesi ve kullanım kolaylığıyla ailenizin içine sinen isimdir. 2026 trendleri kısa, zarif, anlamlı ve yeni nesil isimleri öne çıkarıyor; ancak kalıcı karar her zaman aile hikayesiyle uyumlu olanda saklıdır.",
    "Bu listedeki 150 isim, araştırmaya başlamak için güçlü bir zemin sunar. Daha geniş seçenekler için kız isimleri, anlamlı bebek isimleri ve benzer rehberler arasında geçiş yaparak kendi kısa listenizi oluşturabilirsiniz.",
  ],
  names: selectNames("GIRL", girlPreferredSlugs),
  faqs: [
    {
      id: "modern-kiz-ismi-ne-demek",
      sortOrder: 1,
      question: "Bir kız isminin modern sayılması için neye bakılır?",
      answer:
        "Modern kız bebek ismi; kulağa güncel gelen, yazımı kolay olan, anlamını koruyan ve farklı yaşlarda doğal durabilen isimdir. Yalnızca yeni duyulan adlar değil, sade ve zamansız isimler de modern kabul edilebilir.",
    },
    {
      id: "2026-kiz-isim-trendleri",
      sortOrder: 2,
      question: "2026 kız isimlerinde hangi eğilimler dikkat çekiyor?",
      answer:
        "2026'da kısa, zarif, doğa çağrışımlı ve anlamı olumlu kız isimleri öne çıkıyor. Mira, Lina, Duru, Masal, İklim, Kumsal ve Asel gibi isimler bu eğilimi iyi yansıtır.",
    },
    {
      id: "populer-kiz-ismi-secimi",
      sortOrder: 3,
      question: "Çok sevilen bir kız ismini tercih etmek sakıncalı mı?",
      answer:
        "Hayır. Yaygınlaşmış bir isim anlamı, sesi ve ailede uyandırdığı duygu bakımından size iyi geliyorsa rahatlıkla değerlendirilebilir. Asıl dikkat edilmesi gereken nokta, adı sadece dönemsel ilgi gördüğü için seçmemektir.",
    },
    {
      id: "farkli-kiz-isimleri-riskli-mi",
      sortOrder: 4,
      question: "Az duyulan kız isimlerinde nerede dikkatli olunmalı?",
      answer:
        "Az duyulan bir ad seçilecekse önce anlamın güvenilir biçimde açıklanmasına, sonra yazımın günlük hayatta sorun çıkarmamasına bakılmalıdır. Özgünlük güzel bir değer katar; fakat ismin çocuğa sürekli izah yükü getirmemesi gerekir.",
    },
    {
      id: "kisa-modern-kiz-isimleri",
      sortOrder: 5,
      question: "Tek veya iki heceli kız isimleri ne avantaj sağlar?",
      answer:
        "Az heceli kız isimleri çağırırken pratiklik sağlar ve özellikle uzun soyadlarıyla daha temiz bir ritim kurabilir. Yine de tercih yalnızca kısalığa göre değil, adın anlamına ve ailede bıraktığı duyguya göre yapılmalıdır.",
    },
    {
      id: "anlamli-kiz-isim-onemi",
      sortOrder: 6,
      question: "Modern isim seçerken anlam ne kadar önemli?",
      answer:
        "Anlam, ismin kalıcılığını güçlendirir. Sadece güzel duyulan bir isim yerine olumlu, açıklanabilir ve ailede karşılığı olan bir anlam seçmek daha bilinçli bir karardır.",
    },
    {
      id: "cift-modern-kiz-ismi",
      sortOrder: 7,
      question: "Kız bebek için modern çift isim seçilebilir mi?",
      answer:
        "Evet, ancak iki ismin toplam uzunluğu, ses uyumu ve günlük kullanım kolaylığı birlikte düşünülmelidir. İki modern isim yan yana geldiğinde fazla süslü durmamasına dikkat etmek gerekir.",
    },
    {
      id: "son-karar-modern-kiz",
      sortOrder: 8,
      question: "Kız ismi için son eleme nasıl yapılmalı?",
      answer:
        "İlk üç adayınızı soyadıyla birlikte yazıp farklı hitap cümlelerinde deneyin. Birkaç gün sonra hâlâ aynı ada dönüyorsanız ve söyleyişi size doğal geliyorsa kararınız büyük ölçüde olgunlaşmış olur.",
    },
  ],
};

export const modernBoyGuide: ModernNamesGuide = {
  title: "Modern Erkek Bebek İsimleri (150+ Anlamlı ve Popüler İsim Önerisi)",
  metaTitle: "Modern Erkek Bebek İsimleri: 150 Anlamlı Öneri",
  description:
    "Modern erkek bebek isimleri için 150 isimlik editoryal liste; anlamlar, kökenler, 2026 trendleri, isim seçme tavsiyeleri ve detay bağlantıları.",
  keywords: [
    "modern erkek bebek isimleri",
    "modern isim önerileri",
    "popüler bebek isimleri",
    "anlamlı isimler",
    "farklı bebek isimleri",
    "yeni nesil isimler",
    "trend isimler",
  ],
  pagePath: "/rehber/modern-erkek-bebek-isimleri",
  coverSrc: "/rehber/modern-erkek-bebek-isimleri.png",
  coverAlt: "Modern erkek bebek isimleri rehberi kapak görseli",
  accent: "blue",
  genderLabel: "Erkek",
  datePublished: "2026-07-12",
  dateModified: "2026-07-12",
  intro: [
    "Modern erkek bebek isimleri arayan aileler için iyi bir seçenek, yalnızca güçlü duyulan bir ad değildir. İsmin anlamı, yazımı, günlük hayatta nasıl çağrıldığı, soyadıyla kurduğu ritim ve çocuğun büyüdüğünde bu ismi nasıl taşıyacağı birlikte değerlendirilmelidir. 2026'da erkek isimlerinde öne çıkan çizgi de tam olarak bu: kısa, net, anlamı güçlü ve gereksiz ağırlık taşımayan isimler.",
    "Erkek rehberindeki adlar, Yenidoğan.net'te yayında olan kayıtlar arasından anlam, kullanım rahatlığı ve çağdaş tını birlikte düşünülerek seçildi. Bu çalışma resmi bir popülerlik tablosu değildir; modern isim önerileri, popüler bebek isimleri, anlamlı isimler ve daha farklı bebek isimleri arasında ölçülü bir araştırma yapmak isteyen ailelere pratik bir yol haritası sunar. Her isim kendi detay sayfasına bağlıdır; beğendiğiniz adın geniş açıklamasına tek tıkla ulaşabilirsiniz.",
    "Erkek isimlerinde modernlik çoğu zaman sadelikle güç arasında kurulan dengede ortaya çıkar. Aras, Atlas, Doruk, Kuzey, Ayaz, Demir, Tuna ve Ege gibi isimler kısa ve çağdaş dururken; Kaan, Göktuğ, Batuhan ve Alparslan gibi adlar köklü bir karakter hissi verir. Doğru tercih, ailenin beklentisiyle çocuğun uzun vadeli kullanım rahatlığını bir araya getiren isimdir.",
  ],
  modernDefinition: [
    "Modern erkek ismi, bugünün dilinde doğal duyulan ama birkaç yıl sonra eskiyecek kadar geçici olmayan isimdir. Kimi zaman doğadan gelen bir çağrışım, kimi zaman tarihî bir kök, kimi zaman da kısa ve güçlü bir ses yapısı bu modern hissi oluşturur.",
    "Bir ismin modern olması için mutlaka yabancı tınılı ya da çok az duyulmuş olması gerekmez. Mert, Efe, Emir, Kaan ve Selim gibi tanıdık isimler de sade yapıları, güçlü anlamları ve kolay kullanımları sayesinde modern listelerde yer alabilir.",
    "Yeni nesil erkek isimlerinde en önemli ölçüt, ismin hem sosyal hayatta hem resmi ortamlarda rahat taşınmasıdır. Aşırı sert, fazla uzun veya anlamı belirsiz isimler yerine dengeli, açıklanabilir ve akıcı seçenekler daha güven verir.",
  ],
  preferenceReasons: [
    "Ailelerin modern erkek isimlerine yönelmesinde kısa ve net söyleyiş isteği önemli rol oynar. Özellikle uzun soyadlarında Aras, Ege, Alp, Emir ve Tuna gibi kısa isimler daha dengeli bir bütünlük kurabilir.",
    "Güçlü ama yorucu olmayan anlamlar da tercihleri etkiler. Demir, Doruk, Kaan, Göktuğ, Yiğit ve Mert gibi isimler karakter hissi verir; ancak günlük kullanımda anlaşılır kaldıkları için ailelerin kısa listesine kolay girer.",
    "Bir diğer neden, erkek isimlerinde tek tip beklentinin azalmasıdır. Bazı aileler tarihî ve köklü adları severken, bazıları doğa temalı ya da daha şehirli tınılı isimlere yönelir. Modern rehberin amacı bu farklı çizgileri aynı sayfada karşılaştırılabilir hale getirmektir.",
  ],
  selectionAdvice: [
    "Erkek ismini soyadıyla birlikte tok ama akıcı duyulacak şekilde okuyun; çok sert birleşimler günlük çağrıda gereğinden ağır hissedebilir.",
    "Güçlü anlam taşıyan adlarda yalnızca etkiyi değil, çocuğun okulda ve yetişkinlikte bu ismi rahat kullanıp kullanamayacağını da düşünün.",
    "Popüler bebek isimleri arasında seçim yaparken dönemsel yükselişe kapılmadan, ismin aile değerlerinizle kurduğu bağı kontrol edin.",
    "Kısa listedeki isimleri resmi bir imza, okul yoklaması ve günlük hitap gibi farklı bağlamlarda hayal edin; her ortamda doğal duran adlar daha güven verir.",
    "Çift isim planlıyorsanız iki adın toplam uzunluğu, vurgu noktası ve günlük kullanımda hangisinin öne çıkacağı konusunda net olun.",
    "Yeni nesil erkek isimlerinde farklılık ararken anlamı belirsiz veya telaffuzu zorlu seçenekler yerine karakteri açık isimlere öncelik verin.",
  ],
  modernTraits: [
    "Güçlü duyulur ama kaba veya fazla iddialı bir ağırlık taşımaz; sağlamlık hissini sade biçimde verir.",
    "Anlamı karakterle ilişkilendirilebilir; cesaret, denge, güven, ufuk, başarı veya iyilik gibi olumlu alanlara yaslanır.",
    "Kısa ya da net heceli olduğu için uzun soyadlarıyla bile dengeli bir ritim kurabilir.",
    "Resmi ortamda ciddi, sosyal çevrede sıcak durabilecek çift yönlü bir kullanım rahatlığı sunar.",
    "Tarihî veya kültürel kök taşısa bile bugünün dilinde eskimiş görünmez.",
    "Kardeş isimleriyle birlikte söylendiğinde uyum sağlar; fakat kendi başına ayrı bir kimlik bırakır.",
  ],
  trendParagraphs: [
    "2026 erkek isimleri trendlerinde doğa ve yön çağrışımları dikkat çekiyor. Aras, Kuzey, Doruk, Ayaz, Poyraz, Bora, Tuna, Toprak ve Rüzgar gibi isimler hem hareket hem ferahlık hissi verir. Bu tür adlar modern erkek bebek isimleri arasında güçlü bir yer tutuyor.",
    "Kısa ve tok isimler de popülerliğini koruyor. Efe, Alp, Kaan, Emir, Ege, Mert, Berk, Cem ve Sarp gibi adlar tek nefeste söylenir; resmi hayatta da sosyal çevrede de net duyulur.",
    "Tarihî veya karakterli isimlerde daha dengeli bir yaklaşım öne çıkıyor. Göktuğ, Metehan, Batuhan, Alparslan, Aybars ve Kıvanç gibi isimler güçlü anlam taşırken, aileler artık bu ağırlığın günlük kullanımda çocuğu zorlamamasına da dikkat ediyor.",
    "Yeni nesil isimler arasında Atlas, Miran, Ediz, Oytun, Yalın, Egehan ve Utku gibi seçenekler daha fazla araştırılıyor. Bu isimler farklı bebek isimleri arayan ailelere özgünlük sunarken anlam ve telaffuz bakımından ulaşılabilir kalıyor.",
  ],
  featuredNames: ["Aras", "Atlas", "Doruk", "Kuzey", "Ayaz", "Ege", "Kaan", "Emir", "Demir", "Tuna", "Göktuğ", "Mert"],
  finalAdvice: [
    "Erkek bebek ismi seçerken güçlü duyulan her adın iyi tercih olmayabileceğini hatırlayın. İsim sertlikten çok sağlamlık hissi vermeli; çocuğun ileride kendini tanıtırken rahat kullanabileceği bir açıklığa sahip olmalıdır.",
    "Kısa listenizi oluştururken farklı tarzlardan birkaç isim bırakmak faydalıdır. Bir doğa ismi, bir kısa isim, bir tarihî isim ve bir manevi anlamlı isim yan yana değerlendirildiğinde hangi çizginin aileye daha yakın olduğu daha kolay anlaşılır.",
    "İsim kararını aceleye getirmemek gerekir. Beğendiğiniz isimleri soyadıyla yazın, yüksek sesle okuyun ve birkaç gün sonra tekrar bakın. Hâlâ aynı isim size güçlü ve sıcak geliyorsa doğru yöne yaklaşıyorsunuz demektir.",
  ],
  conclusion: [
    "Modern erkek bebek isimleri içinde en iyi seçenek, yalnızca trend olduğu için değil; anlamı, sesi ve uzun vadeli kullanım rahatlığıyla aileye güven verdiği için seçilen isimdir. 2026 çizgisi kısa, anlamlı, güçlü ve yeni nesil isimleri öne çıkarıyor.",
    "Bu 150 isimlik liste, karar sürecinde pratik bir başlangıç sunar. Daha geniş araştırma için erkek isimleri, anlamlı bebek isimleri ve benzer rehberler üzerinden farklı kategorileri birlikte inceleyebilirsiniz.",
  ],
  names: selectNames("BOY", boyPreferredSlugs),
  faqs: [
    {
      id: "modern-erkek-ismi-ne-demek",
      sortOrder: 1,
      question: "Erkek isimlerinde modernlik nasıl anlaşılır?",
      answer:
        "Modern erkek bebek ismi; güncel duyulan, yazımı kolay olan, anlamı güçlü ve farklı yaşlarda doğal taşınabilen isimdir. Kısa, net ve açıklanabilir isimler bu grupta öne çıkar.",
    },
    {
      id: "2026-erkek-isim-trendleri",
      sortOrder: 2,
      question: "2026 erkek isimlerinde hangi çizgi güçleniyor?",
      answer:
        "2026'da kısa, doğa çağrışımlı, tarihî kökü olan ve güçlü anlam taşıyan erkek isimleri öne çıkıyor. Aras, Atlas, Doruk, Kuzey, Demir, Kaan ve Göktuğ gibi isimler bu eğilimi gösterir.",
    },
    {
      id: "populer-erkek-ismi-secimi",
      sortOrder: 3,
      question: "Yaygın erkek isimleri hâlâ iyi bir seçenek mi?",
      answer:
        "Evet, olabilir. Yaygın bir ad net anlam taşıyor, soyadıyla güçlü duruyor ve aileye yakın geliyorsa iyi bir tercih sayılabilir. Kararı verirken geçici ilgi yerine ismin yıllar sonraki kullanım hissine bakmak daha sağlıklıdır.",
    },
    {
      id: "guclu-erkek-ismi",
      sortOrder: 4,
      question: "Güçlü erkek ismi nasıl anlaşılır?",
      answer:
        "Güç hissi sadece sert seslerden gelmez. Bir erkek ismi; kararlılık, adalet, güven, çalışkanlık, merhamet veya ufuk gibi değerleri çağrıştırıyorsa daha dengeli ve kalıcı bir etki bırakabilir.",
    },
    {
      id: "farkli-erkek-isimleri-riskli-mi",
      sortOrder: 5,
      question: "Nadir erkek isimlerinde hangi sınır korunmalı?",
      answer:
        "Farklı isimler anlamı açık ve telaffuzu rahat olduğunda iyi bir seçenek olabilir. Risk, çocuğun sürekli açıklamak zorunda kalacağı veya yazımı karışık isimlerde artar.",
    },
    {
      id: "kisa-modern-erkek-isimleri",
      sortOrder: 6,
      question: "Kısa modern erkek isimleri neden seviliyor?",
      answer:
        "Kısa erkek adları tek nefeste söylenebildiği için okul, sosyal çevre ve resmi kayıtlarda pratiklik sağlar. Efe, Emir, Ege, Mert, Kaan ve Alp gibi seçenekler az heceyle belirgin bir karakter hissi verebildiği için ilgi görür.",
    },
    {
      id: "cift-modern-erkek-ismi",
      sortOrder: 7,
      question: "Erkek bebekte iki modern isim yan yana kullanılabilir mi?",
      answer:
        "Kullanılabilir; ancak iki ismin toplam uzunluğu, anlam uyumu ve günlük kullanım kolaylığı önemlidir. Çok uzun veya ritmi ağır kombinasyonlar zamanla yorucu olabilir.",
    },
    {
      id: "son-karar-modern-erkek",
      sortOrder: 8,
      question: "Erkek isminde karar netleşmeden önce nasıl test yapılır?",
      answer:
        "Aday isimleri soyadıyla birlikte okuyun, resmi bir ortamda ve ev içi hitapta nasıl duyulacağını hayal edin. Birkaç gün sonra aynı isim hâlâ güçlü, sade ve rahat geliyorsa listenizde öne çıkması doğaldır.",
    },
  ],
};

export const modernGuideIndexCards: ModernGuideIndexCard[] = [
  {
    id: "modern-kiz-bebek-isimleri",
    slug: "modern-kiz-bebek-isimleri",
    title: modernGirlGuide.title,
    excerpt: modernGirlGuide.description,
    href: modernGirlGuide.pagePath,
    cover: guideCover("modern-kiz-bebek-isimleri-cover", modernGirlGuide.coverSrc, modernGirlGuide.coverAlt),
  },
  {
    id: "modern-erkek-bebek-isimleri",
    slug: "modern-erkek-bebek-isimleri",
    title: modernBoyGuide.title,
    excerpt: modernBoyGuide.description,
    href: modernBoyGuide.pagePath,
    cover: guideCover("modern-erkek-bebek-isimleri-cover", modernBoyGuide.coverSrc, modernBoyGuide.coverAlt),
  },
];
