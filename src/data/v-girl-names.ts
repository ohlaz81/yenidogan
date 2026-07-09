import type { BabyNameSeed } from "@/types/baby-name-seed";
import type { NameStyle } from "@/types/database";

type VGirlNameInput = {
  name: string;
  meaningNote: string;
  introNote: string;
  origin: string;
  pronunciation?: string;
  popularity: number;
  popularScore: number;
  style: NameStyle;
  traits: string[];
  category: "virtue" | "classic" | "modern" | "spiritual" | "nature" | "grace" | "heritage";
  inQuran?: boolean;
  quranReference?: string | null;
};

const V_GIRL_NAME_INPUTS: VGirlNameInput[] = [
  {
    name: "Vahide",
    meaningNote:
      "Vahide, Arapça kökenli olup tek, eşsiz ve biricik anlamlarıyla açıklanan klasik bir kız ismidir. İsmin anlamında kalabalıktan ayrılan özel bir duruş ve kendine haslık fikri öne çıkar. Türkiye'de özellikle geleneksel isimler arasında bilinir ve kadın adı olarak uzun yıllardır kullanılır. Kısa olmayan ama akıcı yapısı, ona ağırbaşlı ve saygın bir hava verir.",
    introNote:
      "Vahide ismi, köklü ve anlamı net kız isimleri arayan aileler için güçlü bir seçenektir. Biriciklik çağrışımı, bebeğine özel ve değerli bir anlam yüklemek isteyen ailelerin ilgisini çekebilir. Klasik tınısı sayesinde hem aile büyükleriyle bağ kurar hem de günlük hayatta anlaşılır bir kullanım sunar.",
    origin: "Arapça",
    pronunciation: "Va-hi-de",
    popularity: 2.7,
    popularScore: 2,
    style: "CLASSIC",
    category: "classic",
    traits: ["Biricik", "Klasik", "Asil", "Sakin", "Güven veren", "Köklü", "Zarif"],
  },
  {
    name: "Valide",
    meaningNote:
      "Valide, Arapça kökenli olup anne, doğuran ve saygı duyulan ana anlam alanıyla bilinir. Osmanlı ve geleneksel Türkçede hürmet bildiren güçlü bir kelime olarak yerleşmiştir. Kız ismi olarak kullanıldığında annelik, şefkat, olgunluk ve aile sıcaklığı çağrışımı taşır. Günümüzde çok yaygın değildir; ancak anlamı açık ve kültürel arka planı belirgin bir addır.",
    introNote:
      "Valide ismi, geleneksel ve saygın tınılı kız isimlerinden hoşlanan ailelere hitap eder. İsmin içinde anne şefkati ve aileyi bir arada tutan sıcak bir karakter hissi vardır. Nadir duyulması, onu köklü ama ayırt edici bir seçenek haline getirir.",
    origin: "Arapça",
    pronunciation: "Va-li-de",
    popularity: 1.9,
    popularScore: 1,
    style: "RARE",
    category: "heritage",
    traits: ["Şefkatli", "Köklü", "Saygın", "Klasik", "Nadir", "Aile odaklı", "Olgun"],
  },
  {
    name: "Vasfiye",
    meaningNote:
      "Vasfiye, Arapça kökenli vasıf kelimesiyle ilişkili olup nitelikli, özellik sahibi ve övgüye değer kadın anlam alanında kullanılır. Klasik kaynaklarda ve eski kuşak adlarında rastlanan yerleşik bir kız ismidir. Anlamı kişilik, değer ve güzel özellikler etrafında şekillenir. Bu nedenle gösterişli olmadan güçlü bir karakter hissi veren isimlerden biridir.",
    introNote:
      "Vasfiye ismi, eski ama anlamı anlaşılır kız isimleri arayan aileler için sıcak bir alternatiftir. İsmin olgun tınısı, aile geleneğiyle bağ kurmak isteyenlerde güçlü bir karşılık bulabilir. Değer ve iyi nitelik çağrışımı, adı yalnızca farklı değil aynı zamanda anlamlı kılar.",
    origin: "Arapça",
    pronunciation: "Vas-fi-ye",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "classic",
    traits: ["Nitelikli", "Klasik", "Olgun", "Güvenilir", "Köklü", "Ağırbaşlı", "Saygın"],
  },
  {
    name: "Vecihe",
    meaningNote:
      "Vecihe, Arapça kökenli olup yüzü güzel, itibarlı, seçkin ve değer verilen kadın anlamlarıyla açıklanır. Klasik kadın adları arasında yer alır ve Türkiye'de özellikle eski kuşaklarda bilinen bir kullanıma sahiptir. İsmin anlamında hem zarafet hem de saygınlık fikri bulunur. Bu yönüyle sakin, ağırbaşlı ve köklü bir isim etkisi bırakır.",
    introNote:
      "Vecihe ismi, klasik ve asil tınılı kız isimlerini seven aileler için değerlendirilebilir. Yüz güzelliği ve itibar çağrışımı, isme hem estetik hem de karakterli bir anlam kazandırır. Çok popüler olmaması, geleneksel çizgiyi korurken daha özel bir tercih yapmak isteyen ailelere uygun düşer.",
    origin: "Arapça",
    pronunciation: "Ve-ci-he",
    popularity: 2.1,
    popularScore: 1,
    style: "RARE",
    category: "grace",
    traits: ["Asil", "Zarif", "Klasik", "Saygın", "Nadir", "Olgun", "Güven veren"],
  },
  {
    name: "Veda",
    meaningNote:
      "Veda, ayrılış, uğurlama ve bir dönemi geride bırakma anlamlarıyla bilinen Türkçede yerleşik bir kelimedir. Kız ismi olarak kullanıldığında hüzünlü ama şiirsel bir derinlik taşır. Anlamı duygusal olduğu için ailelerin bu ismi seçerken ismin sakin ve içli karakterini sevmesi önemlidir. Kısa yapısı, onu akılda kalıcı ve sade bir seçenek haline getirir.",
    introNote:
      "Veda ismi, kısa ve edebi çağrışımlı kız isimlerinden hoşlanan ailelere hitap eder. İsmin içinde zarif bir hüzün, hatıra ve duygusal derinlik hissi vardır. Sıradan olmayan ama Türkçede anlamı kolayca anlaşılan bir ad arayanlar için özel bir alternatif olabilir.",
    origin: "Arapça / Türkçe kullanım",
    pronunciation: "Ve-da",
    popularity: 2.3,
    popularScore: 2,
    style: "RARE",
    category: "grace",
    traits: ["Duygusal", "Şiirsel", "Kısa", "Sakin", "Nadir", "İçten", "Zarif"],
  },
  {
    name: "Vedia",
    meaningNote:
      "Vedia, Arapça kökenli olup emanet, korunmak üzere bırakılan değerli şey anlamlarıyla açıklanır. Kız ismi olarak güven, değer verme ve özenle saklama çağrışımı taşır. Türkiye'de klasik kadın adları arasında bilinen ama günümüzde daha nadir duyulan bir isimdir. Anlamı açık ve olumlu olduğu için veri kalitesi açısından güçlü bir seçenektir.",
    introNote:
      "Vedia ismi, yumuşak söylenişi ve güven veren anlamıyla kız bebek isimleri arasında zarif bir yer tutar. Aileler bu adı seçerken çoğu zaman bebeğin kıymetli bir emanet olduğu duygusuyla bağ kurabilir. Klasik ama çok yaygın olmayan bir isim isteyenler için dengeli bir tercihtir.",
    origin: "Arapça",
    pronunciation: "Ve-di-a",
    popularity: 2.2,
    popularScore: 2,
    style: "CLASSIC",
    category: "virtue",
    traits: ["Güvenilir", "Kıymetli", "Klasik", "Zarif", "Sakin", "Duyarlı", "Koruyucu"],
  },
  {
    name: "Vefika",
    meaningNote:
      "Vefika, Arapça kökenli olup başarılı, uygun, uyumlu ve vefalı kişi anlam alanıyla ilişkilendirilen klasik bir kız ismidir. Türkiye'de eski kuşaklarda kullanılan kadın adları arasında yer alır. İsmin içinde uyum, iyi niyet ve güvenilir karakter fikri öne çıkar. Günümüzde nadir duyulması, ona ayırt edici bir klasik hava kazandırır.",
    introNote:
      "Vefika ismi, köklü ve sakin tınılı kız isimlerinden hoşlanan aileler için anlamlı bir alternatiftir. Uyum ve vefa çağrışımı, ismi hem yumuşak hem de karakterli kılar. Çok popüler olmayan fakat açıklanabilir bir ad arayan aileler için güçlü bir seçenek olabilir.",
    origin: "Arapça",
    pronunciation: "Ve-fi-ka",
    popularity: 1.9,
    popularScore: 1,
    style: "RARE",
    category: "virtue",
    traits: ["Uyumlu", "Vefalı", "Klasik", "Nadir", "Sakin", "Güven veren", "İyi niyetli"],
  },
  {
    name: "Vefiye",
    meaningNote:
      "Vefiye, vefa kökünden gelen ve bağlı, sadık, sözünü tutan kadın anlam alanıyla kullanılan klasik bir isimdir. Arapça kökenli bu ad, Türkiye'de nadir de olsa kadın adı olarak bilinir. Anlamı doğrudan güzel bir ahlaki değere yaslandığı için sıcak ve güvenilir bir izlenim bırakır. Eski tınısı, ismi aile geleneğiyle uyumlu hale getirir.",
    introNote:
      "Vefiye ismi, sadakat ve içtenlik anlamı taşıyan kız isimlerini seven ailelere hitap eder. Söylenişi yumuşaktır, anlamı ise güçlü ve anlaşılırdır. Nadir kullanımı sayesinde klasik çizgiden ayrılmadan özel bir isim arayanlar için değerlendirilebilir.",
    origin: "Arapça",
    pronunciation: "Ve-fi-ye",
    popularity: 1.8,
    popularScore: 1,
    style: "RARE",
    category: "virtue",
    traits: ["Sadık", "Vefalı", "Nadir", "Klasik", "İçten", "Duyarlı", "Güvenilir"],
  },
  {
    name: "Vehbiye",
    meaningNote:
      "Vehbiye, Arapça kökenli vehbi kelimesinden gelir ve Allah vergisi, bağışlanmış, doğuştan gelen lütuf anlamlarıyla açıklanır. Kız ismi olarak manevi, sakin ve klasik bir hava taşır. Türkiye'de yaygın değildir; ancak eski kadın adları arasında yerleşik bir kullanımı vardır. Anlamındaki lütuf ve armağan fikri, isme değerli bir çağrışım kazandırır.",
    introNote:
      "Vehbiye ismi, manevi anlamı olan nadir kız isimleri arayan aileler için dikkat çekici bir alternatiftir. İsmin içinde bebeği bir armağan gibi görme duygusu doğal biçimde hissedilir. Klasik tınısını seven ailelerde hem saygın hem de anlamlı bir tercih olabilir.",
    origin: "Arapça",
    pronunciation: "Veh-bi-ye",
    popularity: 1.7,
    popularScore: 1,
    style: "RARE",
    category: "spiritual",
    traits: ["Manevi", "Armağan", "Nadir", "Klasik", "Sakin", "Kıymetli", "Olgun"],
  },
  {
    name: "Vekayi",
    meaningNote:
      "Vekayi, Arapça vak'a köküyle ilişkili olup olaylar, yaşananlar ve hadiseler anlam alanında bilinen eski bir kelimedir. Kadın adı olarak çok nadir kullanılır ve daha çok klasik-yöresel isim zevkiyle karşılaşılır. Anlamı doğrudan bir erdemden çok hayatın akışı ve hatıra fikrine yakındır. Bu nedenle farklı ama gerçek kullanımı olan eski adlar arasında değerlendirilmelidir.",
    introNote:
      "Vekayi ismi, sıra dışı ve tarihî tınılı kız isimlerinden hoşlanan aileler için özel bir seçenektir. Güncel listelerde sık görünmez; bu da isme belirgin bir nadirlik kazandırır. Aile geleneğinde yer alan veya eski isimleri yaşatmak isteyenler için anlamı açıklanabilir bir alternatif sunar.",
    origin: "Arapça / Osmanlı Türkçesi kullanımı",
    pronunciation: "Ve-ka-yi",
    popularity: 1.4,
    popularScore: 1,
    style: "RARE",
    category: "heritage",
    traits: ["Nadir", "Tarihi", "Köklü", "Farklı", "Olgun", "Ağırbaşlı", "Hatıralı"],
  },
  {
    name: "Velide",
    meaningNote:
      "Velide, Arapça kökenli olup doğmuş çocuk, yeni doğan ve doğumla ilgili anlam alanıyla ilişkilendirilir. Kız ismi olarak Türkiye'de nadir görülen eski kullanımlardan biridir. Anlamı doğum, hayatın başlangıcı ve aileye katılan yeni can fikrini taşır. Bu yüzden yenidoğan çağrışımı belirgin, köklü ve sakin bir isimdir.",
    introNote:
      "Velide ismi, doğum ve yeni başlangıç anlamı taşıyan nadir kız isimlerini seven ailelere hitap eder. Eski tınısı ona ağırbaşlı bir hava verirken anlamı sıcak ve aileye yakındır. Çok yaygın olmayan ama gerçek kullanımı bulunan bir isim arayanlar için değerlendirilebilir.",
    origin: "Arapça",
    pronunciation: "Ve-li-de",
    popularity: 1.6,
    popularScore: 1,
    style: "RARE",
    category: "classic",
    traits: ["Nadir", "Köklü", "Yeni başlangıçlı", "Sakin", "Klasik", "Aile odaklı", "Olgun"],
  },
  {
    name: "Veliye",
    meaningNote:
      "Veliye, Arapça kökenli olup dost, yakın, koruyucu ve manevi bakımdan değerli kadın anlam alanıyla açıklanır. Veli kelimesinin kadın adı olarak kullanılan biçimlerinden biridir. Türkiye'de klasik ve manevi tınılı kadın adları arasında bilinir. Anlamında yakınlık, himaye ve güven fikri bulunduğu için sıcak bir karakter taşır.",
    introNote:
      "Veliye ismi, manevi çağrışımı olan klasik kız isimleri arayan aileler için dengeli bir tercihtir. Söylenişi yumuşaktır ve anlamı koruyuculuk ile gönül yakınlığı etrafında şekillenir. Hem aile geleneğiyle uyumlu hem de açıklanabilir bir isim isteyenler için uygun olabilir.",
    origin: "Arapça",
    pronunciation: "Ve-li-ye",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "spiritual",
    traits: ["Manevi", "Koruyucu", "Yakın", "Klasik", "Nadir", "Güven veren", "Sakin"],
  },
  {
    name: "Venüs",
    meaningNote:
      "Venüs, Roma mitolojisinde güzellik ve sevgiyle ilişkilendirilen tanrıça adı, aynı zamanda gökyüzündeki parlak gezegenin adıdır. Türkiye'de kız ismi olarak kullanılan modern ve dikkat çekici seçeneklerden biridir. Anlam alanında güzellik, parıltı, estetik ve göksel zarafet öne çıkar. Mitolojik kökenli olduğu için seçilirken ismin güçlü ve farklı tınısı da dikkate alınmalıdır.",
    introNote:
      "Venüs ismi, göksel ve modern kız isimleri arayan aileler için parlak bir alternatiftir. Kısa sayılabilecek yapısı ve akılda kalıcı sesi sayesinde sıradan isimlerden ayrılır. Güzellik ve yıldız çağrışımı, bebeğine zarif ama dikkat çekici bir ad vermek isteyen aileleri cezbedebilir.",
    origin: "Latince / mitolojik ad",
    pronunciation: "Ve-nüs",
    popularity: 2.8,
    popularScore: 3,
    style: "MODERN",
    category: "nature",
    traits: ["Göksel", "Parlak", "Modern", "Zarif", "Akılda kalıcı", "Estetik", "Dikkat çekici"],
  },
  {
    name: "Vera",
    meaningNote:
      "Vera, farklı dillerde doğru, gerçek, inanç ve sadakat gibi anlamlarla ilişkilendirilen zarif bir kız ismidir. Türkiye'de son yıllarda daha fazla duyulan kısa ve modern adlardan biridir. Anlamı net, olumlu ve uluslararası kullanıma açık olduğu için ailelerin ilgisini çeker. Sade yazılışı ve yumuşak sesi, ismi çağdaş ama abartısız kılar.",
    introNote:
      "Vera ismi, kısa, modern ve anlamı güçlü kız isimleri arayan aileler için çok dengeli bir seçenektir. Hem Türkiye'de kullanılabilir hem de farklı dillerde kolay telaffuz edilebilir. Doğruluk ve içtenlik çağrışımı, isme sade ama karakterli bir güzellik kazandırır.",
    origin: "Latince / Slav dilleri",
    pronunciation: "Ve-ra",
    popularity: 4.0,
    popularScore: 4,
    style: "POPULAR",
    category: "modern",
    traits: ["Modern", "Kısa", "Zarif", "Gerçek", "İçten", "Uluslararası", "Akılda kalıcı"],
  },
  {
    name: "Verda",
    meaningNote:
      "Verda, gül, taze bitki ve yeşillik çağrışımlarıyla açıklanan zarif bir kız ismidir. Farsça ve farklı doğu dillerindeki kullanımlarla ilişkilendirilen bu ad, Türkiye'de de kız ismi olarak bilinir. Anlam alanında doğallık, tazelik, bahar ve narin güzellik öne çıkar. Modern duyulmasına rağmen uydurma hissi vermeyen yumuşak bir seçenektir.",
    introNote:
      "Verda ismi, doğa çağrışımı taşıyan modern kız isimleri arayan ailelere hitap eder. Kulağa yumuşak gelir, yazımı kolaydır ve Vera gibi kısa isimlerle aynı çağdaş çizgide durur. Tazelik ve zarafet anlamı, yeni doğan bir bebek için ferah bir duygu oluşturur.",
    origin: "Farsça / modern kullanım",
    pronunciation: "Ver-da",
    popularity: 3.2,
    popularScore: 3,
    style: "MODERN",
    category: "nature",
    traits: ["Doğal", "Taze", "Zarif", "Modern", "Ferah", "Narin", "Akıcı"],
  },
  {
    name: "Veride",
    meaningNote:
      "Veride, Arapça kökenli olup gelen, ulaşan veya kaynaklarda nadir kadın adı olarak geçen klasik bir kullanımdır. Türkiye'de çok yaygın değildir; ancak eski ve anlamı açıklanabilir kız isimleri arasında yer alır. İsmin sesi Vedia ve Velide gibi adlara yakın, yumuşak ve gelenekseldir. Nadirliği nedeniyle seçilirken ailelerin klasik tınıyı sevmesi önemlidir.",
    introNote:
      "Veride ismi, az duyulan ama kök hissi olan kız isimlerini seven aileler için sakin bir alternatiftir. İsmin yumuşak akışı, onu sert olmayan ve zarif duran seçenekler arasına taşır. Klasik çizgiden ayrılmadan farklı bir ad arayan aileler için değerlendirilebilir.",
    origin: "Arapça",
    pronunciation: "Ve-ri-de",
    popularity: 1.6,
    popularScore: 1,
    style: "RARE",
    category: "classic",
    traits: ["Nadir", "Klasik", "Yumuşak", "Zarif", "Sakin", "Köklü", "Ağırbaşlı"],
  },
  {
    name: "Vesile",
    meaningNote:
      "Vesile, Arapça kökenli olup araç, sebep, yakınlaşmaya vesile olan şey ve bağ kurma anlamlarıyla bilinir. Türkçede hem kelime hem de kadın adı olarak yerleşik bir kullanıma sahiptir. İsmin anlamında iyiliğe aracılık etme, bağlantı kurma ve hayırlı sebep olma fikri öne çıkar. Klasik ama anlaşılır yapısı, onu sıcak ve güvenilir bir kız ismi yapar.",
    introNote:
      "Vesile ismi, anlamı güzel ve manevi çağrışımı olan kız isimleri arayan aileler için güçlü bir seçenektir. Aileler bu adı çoğu zaman hayra aracılık eden, güzel kapılar açan bir anlamla sever. Tanıdık tınısı sayesinde geleneksel isimler içinde doğal ve içten durur.",
    origin: "Arapça",
    pronunciation: "Ve-si-le",
    popularity: 3.0,
    popularScore: 3,
    style: "CLASSIC",
    category: "spiritual",
    traits: ["Manevi", "Klasik", "Hayırlı", "İçten", "Güven veren", "Sakin", "Bağ kuran"],
  },
  {
    name: "Vildan",
    meaningNote:
      "Vildan, Arapça kökenli olup çocuklar, yeni doğanlar ve cennet çocukları anlam alanıyla ilişkilendirilir. Kur'an'da kelime olarak geçen bir ifade olduğundan manevi çağrışımı güçlüdür; ancak Türkçede kadın adı olarak ayrıca yerleşmiştir. İsmin anlamında saflık, tazelik, masumiyet ve yeni başlangıç hissi bulunur. Türkiye'de bilinen klasik kız isimleri arasında yer alır.",
    introNote:
      "Vildan ismi, manevi anlamlı ve tanıdık kız isimleri arayan aileler için güçlü bir tercihtir. Sesi yumuşak, anlamı ise yeni doğan bir bebek için oldukça sıcak ve uygun bir çağrışım taşır. Hem klasik çizgiyi seven hem de anlamı anlatılabilir bir ad isteyen ailelere hitap eder.",
    origin: "Arapça",
    pronunciation: "Vil-dan",
    popularity: 3.4,
    popularScore: 3,
    style: "CLASSIC",
    category: "spiritual",
    inQuran: true,
    quranReference: "Kur'an'da vildan kelimesi çocuklar/cennet gençleri anlamıyla geçer; özel isim olarak değil kelime olarak yer alır.",
    traits: ["Manevi", "Masum", "Klasik", "Yumuşak", "Köklü", "Saf", "Güven veren"],
  },
  {
    name: "Vuslat",
    meaningNote:
      "Vuslat, Arapça kökenli olup kavuşma, ulaşma ve hasretin sona ermesi anlamlarıyla bilinen şiirsel bir kız ismidir. Tasavvuf ve edebiyat dilinde derin bir duygu alanına sahiptir. İsmin anlamında özlemden sonra gelen huzur, tamamlanma ve yakınlık fikri bulunur. Türkiye'de kadın adı olarak kullanılan klasik ama etkileyici seçeneklerden biridir.",
    introNote:
      "Vuslat ismi, duygusu güçlü ve edebi tınılı kız isimleri arayan aileler için özel bir alternatiftir. Kavuşma anlamı, bebeğin aileye gelişini anlatmak için sıcak ve anlamlı bir zemin sunar. Tok söylenişi ve derin çağrışımı sayesinde sıradan olmayan ama köklü bir ad etkisi bırakır.",
    origin: "Arapça",
    pronunciation: "Vus-lat",
    popularity: 2.9,
    popularScore: 3,
    style: "CLASSIC",
    category: "grace",
    traits: ["Şiirsel", "Duygusal", "Kavuşmalı", "Klasik", "Derin", "İçten", "Huzurlu"],
  },
];

function slugifyTr(text: string) {
  return text
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

function pronunciationOf(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part.replace(/([aeıioöuü])/gi, "$1-").replace(/-$/g, ""))
    .join(" ");
}

function isShortName(name: string) {
  return name.replaceAll(/\s+/g, "").length <= 5;
}

function scoreSimilarity(a: VGirlNameInput, b: VGirlNameInput) {
  let score = 0;
  if (a.category === b.category) score += 8;
  if (a.style === b.style) score += 4;
  if (isShortName(a.name) === isShortName(b.name)) score += 2;
  score += Math.max(0, 4 - Math.abs(a.popularity - b.popularity));
  if (a.origin.split("/")[0].trim() === b.origin.split("/")[0].trim()) score += 2;
  if (a.name.slice(0, 2).toLocaleLowerCase("tr-TR") === b.name.slice(0, 2).toLocaleLowerCase("tr-TR")) score += 3;
  return score;
}

function similarNamesFor(input: VGirlNameInput) {
  return V_GIRL_NAME_INPUTS.filter((candidate) => candidate.name !== input.name)
    .map((candidate) => ({ candidate, score: scoreSimilarity(input, candidate) }))
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name, "tr-TR"))
    .slice(0, 10)
    .map(({ candidate }) => candidate.name);
}

export const V_GIRL_NAME_SEED: BabyNameSeed[] = V_GIRL_NAME_INPUTS.map((input, index) => ({
  id: `v-girl-${index + 1}`,
  slug: slugifyTr(input.name),
  displayName: input.name,
  gender: "GIRL",
  meaning: input.meaningNote,
  origin: input.origin,
  pronunciation: input.pronunciation ?? pronunciationOf(input.name),
  popularity: input.popularity,
  popularScore: input.popularScore,
  inQuran: Boolean(input.inQuran),
  quranReference: input.quranReference ?? null,
  style: input.style,
  isShort: isShortName(input.name),
  beautifulMeaning: true,
  intro: input.introNote,
  traits: input.traits,
  similar: similarNamesFor(input),
}));
