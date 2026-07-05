import type { BabyNameSeed } from "@/types/baby-name-seed";
import type { NameStyle } from "@/types/database";

type TGirlNameInput = {
  name: string;
  meaning: string;
  origin: string;
  pronunciation?: string;
  popularity: number;
  popularScore: number;
  style: NameStyle;
  traits: string[];
  category:
    | "nature"
    | "light"
    | "classic"
    | "modern"
    | "virtue"
    | "spiritual"
    | "flower"
    | "grace"
    | "sound"
    | "water"
    | "love"
    | "history";
  inQuran?: boolean;
  quranReference?: string | null;
};

const T_GIRL_NAME_INPUTS: TGirlNameInput[] = [
  { name: "Tacide", meaning: "taçlı, değerli ve saygın kadın", origin: "Arapça / Türkçe kullanımı", popularity: 2.0, popularScore: 1, style: "RARE", category: "classic", traits: ["Saygın", "Köklü", "Asil", "Nadir", "Klasik", "Güvenilir"] },
  { name: "Taciser", meaning: "taç sahibi, baş tacı edilen ve değer verilen kişi", origin: "Farsça / Türkçe kullanımı", popularity: 2.2, popularScore: 2, style: "RARE", category: "grace", traits: ["Asil", "Zarif", "Klasik", "Değerli", "Nadir", "Seçkin"] },
  { name: "Taçnur", meaning: "taç gibi değerli nur, aydınlık ve seçkin ad", origin: "Türkçe / Arapça kullanımı", pronunciation: "Taç-nur", popularity: 2.5, popularScore: 2, style: "MODERN", category: "spiritual", traits: ["Aydınlık", "Manevi", "Zarif", "Seçkin", "Modern", "Güven veren"] },
  { name: "Tahire", meaning: "temiz, pak, arınmış ve saf kadın", origin: "Arapça", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Temiz", "Klasik", "Manevi", "Sakin", "Güvenilir", "Olgun"] },
  { name: "Talia", meaning: "talih, bereket ve yumuşak modern tını çağrışımı", origin: "İbranice / Batı dilleri kullanımı", popularity: 3.0, popularScore: 3, style: "MODERN", category: "modern", traits: ["Modern", "Zarif", "Yumuşak", "Pozitif", "Akılda kalıcı", "Canlı"] },
  { name: "Talin", meaning: "ince, zarif ve melodik tınılı kız adı", origin: "Ermenice / modern kullanım", popularity: 3.0, popularScore: 3, style: "MODERN", category: "grace", traits: ["Zarif", "Modern", "Melodik", "Yumuşak", "Özgün", "Sakin"] },
  { name: "Talya", meaning: "çiğ tanesi, bereket ve taze başlangıç çağrışımı", origin: "İbranice / modern kullanım", popularity: 3.5, popularScore: 4, style: "POPULAR", category: "nature", traits: ["Taze", "Modern", "Zarif", "Ferah", "Popüler", "Yumuşak"] },
  { name: "Tamara", meaning: "hurma ağacı, verimlilik ve sıcak iklim çağrışımı", origin: "İbranice / Rusça kullanımı", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "nature", traits: ["Köklü", "Doğal", "Zarif", "Sıcak", "Klasik", "Güçlü"] },
  { name: "Tamay", meaning: "tam ay, dolunay ve tamamlanmış parlaklık", origin: "Türkçe", popularity: 2.8, popularScore: 2, style: "MODERN", category: "light", traits: ["Aydınlık", "Modern", "Sade", "Parlak", "Dengeli", "Özgün"] },
  { name: "Tansu", meaning: "tan vaktinin su berraklığıyla birleşen ferah çağrışımı", origin: "Türkçe", popularity: 3.2, popularScore: 3, style: "CLASSIC", category: "water", traits: ["Ferah", "Akıcı", "Klasik", "Sade", "Doğal", "Güçlü"] },
  { name: "Tanay", meaning: "tan vakti ve ay aydınlığını birleştiren ad", origin: "Türkçe", popularity: 2.7, popularScore: 2, style: "MODERN", category: "light", traits: ["Aydınlık", "Modern", "Sakin", "Parlak", "Özgün", "Yumuşak"] },
  { name: "Tanem", meaning: "biricik tanem, çok sevilen ve değer verilen kişi", origin: "Türkçe", popularity: 3.4, popularScore: 3, style: "MODERN", category: "love", traits: ["Sevgi dolu", "Sıcak", "Modern", "Yumuşak", "İçten", "Akılda kalıcı"] },
  { name: "Taneli", meaning: "tane tane, bereketli ve incelikli yapıda olan", origin: "Türkçe", popularity: 2.1, popularScore: 1, style: "RARE", category: "nature", traits: ["Doğal", "Narin", "Nadir", "Sade", "Bereketli", "Yumuşak"] },
  { name: "Tanenur", meaning: "sevgiyle değer verilen tane ile nur aydınlığını birleştiren ad", origin: "Türkçe / Arapça kullanımı", popularity: 2.6, popularScore: 2, style: "MODERN", category: "spiritual", traits: ["Aydınlık", "Sevgi dolu", "Manevi", "Modern", "Zarif", "Sıcak"] },
  { name: "Tanyel", meaning: "tan vaktinde esen hafif rüzgar", origin: "Türkçe", popularity: 2.7, popularScore: 2, style: "MODERN", category: "nature", traits: ["Ferah", "Doğal", "Modern", "Özgür", "Sakin", "Akıcı"] },
  { name: "Tanyeli", meaning: "şafak vaktinin hafif ve ferah rüzgarı", origin: "Türkçe", popularity: 3.1, popularScore: 3, style: "MODERN", category: "nature", traits: ["Ferah", "Aydınlık", "Doğal", "Modern", "Yumuşak", "Özgür"] },
  { name: "Tanyıldız", meaning: "tan vaktinde parlayan yıldız", origin: "Türkçe", pronunciation: "Tan-yıl-dız", popularity: 2.2, popularScore: 2, style: "RARE", category: "light", traits: ["Parlak", "Nadir", "Aydınlık", "Göksel", "Özgün", "Sakin"] },
  { name: "Tara", meaning: "yıldız, parlaklık ve akılda kalıcı kısa ad çağrışımı", origin: "Sanskritçe / Batı dilleri kullanımı", popularity: 2.9, popularScore: 3, style: "MODERN", category: "light", traits: ["Kısa", "Modern", "Parlak", "Zarif", "Özgün", "Akılda kalıcı"] },
  { name: "Taravet", meaning: "tazelik, canlılık ve ferah güzellik", origin: "Arapça", popularity: 2.0, popularScore: 1, style: "RARE", category: "grace", traits: ["Taze", "Ferah", "Klasik", "Nadir", "Zarif", "Canlı"] },
  { name: "Tayyibe", meaning: "temiz, iyi, hoş ve güzel huylu kadın", origin: "Arapça", pronunciation: "Tay-yi-be", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Temiz", "İyi huylu", "Manevi", "Klasik", "Güvenilir", "Sakin"] },
  { name: "Tebessüm", meaning: "gülümseme, içten sevinç ve yüz aydınlığı", origin: "Arapça", popularity: 2.9, popularScore: 3, style: "CLASSIC", category: "virtue", traits: ["Neşeli", "İçten", "Pozitif", "Sıcak", "Klasik", "Duygulu"] },
  { name: "Tekmile", meaning: "tamamlama, olgunlaştırma ve eksiksiz hale getirme", origin: "Arapça", popularity: 2.0, popularScore: 1, style: "RARE", category: "classic", traits: ["Olgun", "Köklü", "Nadir", "Dengeli", "Klasik", "Güvenilir"] },
  { name: "Tennur", meaning: "parlaklık, ışık ve aydınlık çağrışımı taşıyan klasik ad", origin: "Arapça / Türkçe kullanımı", pronunciation: "Ten-nur", popularity: 2.3, popularScore: 2, style: "CLASSIC", category: "light", traits: ["Aydınlık", "Klasik", "Zarif", "Sakin", "Parlak", "Güven veren"] },
  { name: "Tenzile", meaning: "indirme, gönderme ve manevi bildiriş çağrışımı", origin: "Arapça", popularity: 2.4, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Manevi", "Köklü", "Klasik", "Sakin", "Derin", "Güvenilir"] },
  { name: "Terane", meaning: "ezgi, nağme ve melodik söz", origin: "Farsça", popularity: 2.2, popularScore: 2, style: "RARE", category: "sound", traits: ["Melodik", "Sanatsal", "Zarif", "Nadir", "Edebi", "Yumuşak"] },
  { name: "Terennüm", meaning: "mırıldanma, ezgili söyleyiş ve içten nağme", origin: "Arapça", popularity: 2.1, popularScore: 1, style: "RARE", category: "sound", traits: ["Melodik", "Sanatsal", "Duygulu", "Nadir", "Zarif", "Edebi"] },
  { name: "Terken", meaning: "tarihi Türk kültüründe soylu kadın unvanı", origin: "Türkçe / tarihi unvan", popularity: 2.0, popularScore: 1, style: "RARE", category: "history", traits: ["Tarihi", "Asil", "Güçlü", "Nadir", "Köklü", "Kararlı"] },
  { name: "Teslime", meaning: "teslim olan, güvenle bağlanan ve huzur bulan kadın", origin: "Arapça", popularity: 2.4, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Manevi", "Sakin", "Klasik", "Güven veren", "Dengeli", "Olgun"] },
  { name: "Tesnim", meaning: "cennette yüksek bir kaynaktan gelen içecek adı", origin: "Arapça", popularity: 3.0, popularScore: 3, style: "MODERN", category: "spiritual", inQuran: true, quranReference: "Mutaffifin suresi 83:27'de cennet içeceğiyle ilişkilendirilen Tesnim adı geçer.", traits: ["Manevi", "Ferah", "Aydınlık", "Modern", "Zarif", "Anlamı güçlü"] },
  { name: "Tevhide", meaning: "birleme, birliğe inanma ve tevhid inancıyla bağlantılı ad", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Manevi", "Köklü", "Klasik", "İnançlı", "Sakin", "Güvenilir"] },
  { name: "Tijen", meaning: "keskin, parlak ve dikkat çekici tınılı ad", origin: "Farsça / Türkçe kullanımı", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "grace", traits: ["Zarif", "Klasik", "Güçlü", "Akılda kalıcı", "Özgün", "Sade"] },
  { name: "Tilbe", meaning: "ince, hoş ve melodik tınılı kız adı", origin: "Türkçe / modern kullanım", popularity: 2.9, popularScore: 3, style: "MODERN", category: "sound", traits: ["Melodik", "Modern", "Zarif", "Özgün", "Sanatsal", "Yumuşak"] },
  { name: "Tiraje", meaning: "gökkuşağı ve renkli ışık çağrışımıyla kullanılan zarif ad", origin: "Farsça / Kürtçe kullanımı", popularity: 2.2, popularScore: 2, style: "RARE", category: "light", traits: ["Renkli", "Aydınlık", "Nadir", "Zarif", "Modern", "Özgün"] },
  { name: "Tomris", meaning: "tarihi kadın hükümdar Tomris Hatun ile anılan güçlü ad", origin: "Türkçe / tarihi ad", popularity: 3.3, popularScore: 3, style: "CLASSIC", category: "history", traits: ["Güçlü", "Tarihi", "Lider ruhlu", "Kararlı", "Asil", "Akılda kalıcı"] },
  { name: "Tuba", meaning: "güzellik, iyilik, hoşluk ve cennet nimeti çağrışımı", origin: "Arapça", popularity: 3.9, popularScore: 4, style: "POPULAR", category: "spiritual", inQuran: true, quranReference: "Ra'd suresi 13:29'da geçen 'tuba' kelimesi güzel sonuç ve mutluluk anlamıyla yorumlanır.", traits: ["Manevi", "Popüler", "Sade", "Zarif", "Aydınlık", "Anlamı güçlü"] },
  { name: "Tuana", meaning: "cennet bahçesine düşen ilk yağmur damlası şeklinde sevilen modern yorum", origin: "Farsça / modern kullanım", popularity: 4.1, popularScore: 4, style: "POPULAR", category: "nature", traits: ["Popüler", "Modern", "Ferah", "Zarif", "Yumuşak", "Akılda kalıcı"] },
  { name: "Tuğba", meaning: "güzellik, iyilik ve cennetle ilişkilendirilen kutlu anlam", origin: "Arapça / Türkçe kullanımı", pronunciation: "Tuğ-ba", popularity: 3.8, popularScore: 4, style: "POPULAR", category: "spiritual", inQuran: true, quranReference: "Ra'd suresi 13:29'daki 'tuba' kelimesinin Türkçede Tuğba biçimiyle isimleşmiş kullanımıdır.", traits: ["Manevi", "Popüler", "Köklü", "Zarif", "Aydınlık", "Güven veren"] },
  { name: "Tuğçe", meaning: "küçük tuğ, zarif süs ve seçkinlik çağrışımı", origin: "Türkçe", pronunciation: "Tuğ-çe", popularity: 3.9, popularScore: 4, style: "POPULAR", category: "history", traits: ["Zarif", "Popüler", "Türkçe", "Seçkin", "Güçlü", "Akılda kalıcı"] },
  { name: "Tuğsem", meaning: "tuğ seçkinliğiyle sevgi ve sıcaklık çağrışımını birleştiren ad", origin: "Türkçe / modern kullanım", pronunciation: "Tuğ-sem", popularity: 2.8, popularScore: 2, style: "MODERN", category: "modern", traits: ["Modern", "Zarif", "Özgün", "Sıcak", "Güçlü", "Akılda kalıcı"] },
  { name: "Tuğsen", meaning: "tuğ asaleti ve sen sıcaklığını birleştiren modern ad", origin: "Türkçe / modern kullanım", pronunciation: "Tuğ-sen", popularity: 2.4, popularScore: 2, style: "RARE", category: "modern", traits: ["Modern", "Nadir", "Güçlü", "Sade", "Zarif", "Özgün"] },
  { name: "Tuğsu", meaning: "tuğ seçkinliği ile suyun ferahlığını birleştiren ad", origin: "Türkçe", pronunciation: "Tuğ-su", popularity: 2.5, popularScore: 2, style: "MODERN", category: "water", traits: ["Ferah", "Modern", "Türkçe", "Akıcı", "Zarif", "Özgün"] },
  { name: "Turna", meaning: "zarif göçmen kuş turna ve uzak yol çağrışımı", origin: "Türkçe", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "nature", traits: ["Doğal", "Zarif", "Özgür", "Klasik", "Duygulu", "Sakin"] },
  { name: "Tusem", meaning: "modern kullanımda sevgi, sıcaklık ve zarif tını taşıyan ad", origin: "Türkçe / modern kullanım", pronunciation: "Tu-sem", popularity: 3.0, popularScore: 3, style: "MODERN", category: "modern", traits: ["Modern", "Yumuşak", "Zarif", "Sıcak", "Akılda kalıcı", "Canlı"] },
  { name: "Tuvana", meaning: "güçlü, kuvvetli ve sağlam duruşlu kadın", origin: "Farsça", popularity: 3.4, popularScore: 3, style: "MODERN", category: "virtue", traits: ["Güçlü", "Modern", "Kararlı", "Asil", "Akılda kalıcı", "Özgün"] },
  { name: "Tülay", meaning: "tül gibi ince, ay gibi parlak ve zarif", origin: "Türkçe", pronunciation: "Tü-lay", popularity: 3.2, popularScore: 3, style: "CLASSIC", category: "light", traits: ["Aydınlık", "Zarif", "Klasik", "Yumuşak", "Parlak", "Sakin"] },
  { name: "Tülin", meaning: "ayna, duru görüntü ve zarif parlaklık çağrışımı", origin: "Farsça / Türkçe kullanımı", pronunciation: "Tü-lin", popularity: 3.4, popularScore: 3, style: "CLASSIC", category: "grace", traits: ["Zarif", "Klasik", "Sade", "Parlak", "Yumuşak", "Güven veren"] },
  { name: "Tülinay", meaning: "Tülin zarafetini ay aydınlığıyla birleştiren ad", origin: "Farsça / Türkçe kullanımı", pronunciation: "Tü-li-nay", popularity: 2.5, popularScore: 2, style: "RARE", category: "light", traits: ["Aydınlık", "Zarif", "Nadir", "Parlak", "Yumuşak", "Özgün"] },
  { name: "Tülün", meaning: "dolunay, tamamlanmış ay ve parlak gece güzelliği", origin: "Türkçe", pronunciation: "Tü-lün", popularity: 2.1, popularScore: 1, style: "RARE", category: "light", traits: ["Aydınlık", "Nadir", "Göksel", "Zarif", "Sakin", "Parlak"] },
  { name: "Tümay", meaning: "tüm ay, dolunay ve bütünlenmiş aydınlık", origin: "Türkçe", pronunciation: "Tü-may", popularity: 2.8, popularScore: 2, style: "MODERN", category: "light", traits: ["Aydınlık", "Modern", "Sade", "Parlak", "Dengeli", "Özgün"] },
  { name: "Türkan", meaning: "Türk hakan soyundan gelen kadın, kraliçe ve soylu kişi", origin: "Türkçe / Farsça kullanımı", pronunciation: "Tür-kan", popularity: 3.1, popularScore: 3, style: "CLASSIC", category: "history", traits: ["Asil", "Klasik", "Güçlü", "Tarihi", "Güvenilir", "Kararlı"] },
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

function styleLabel(style: NameStyle) {
  if (style === "POPULAR") return "tanıdık, sevilen ve güçlü kullanım alanı olan";
  if (style === "RARE") return "nadir, ayırt edici ve anlamı korunabilen";
  if (style === "CLASSIC") return "köklü, zamana dayanıklı ve güven veren";
  return "modern, sade ve güncel tınılı";
}

function categoryFeeling(category: TGirlNameInput["category"]) {
  const feelings: Record<TGirlNameInput["category"], string> = {
    nature: "doğal, ferah ve canlı",
    light: "aydınlık, parlak ve umut veren",
    classic: "kültürel hafızası güçlü",
    modern: "çağdaş, temiz ve akılda kalıcı",
    virtue: "karakterli, olumlu ve güven veren",
    spiritual: "manevi, huzurlu ve derin",
    flower: "çiçeksi, narin ve zarif",
    grace: "zarif, yumuşak ve estetik",
    sound: "melodik, sanatsal ve duygulu",
    water: "akıcı, ferah ve duru",
    love: "sıcak, sevgi dolu ve içten",
    history: "tarihi, asil ve güçlü",
  };
  return feelings[category];
}

function sentenceStart(text: string) {
  return text.charAt(0).toLocaleUpperCase("tr-TR") + text.slice(1);
}

function meaningText(input: TGirlNameInput, index: number) {
  const variants = [
    `${input.name}, ${input.meaning} bilgisiyle açıklanan ve Türkiye'de kız ismi olarak kullanılan gerçek bir addır. ${input.origin} kökenli bu isim, yalnızca kulağa hoş gelen bir tını taşımakla kalmaz; anlamı da ailelerin isim seçerken aradığı olumlu duyguyu destekler. T harfiyle başlayan kız isimleri içinde ${categoryFeeling(input.category)} bir hava verir. Günlük kullanımda anlaşılır kalması, ismi hem modern listelerde hem de anlamı güzel isim arayışlarında güçlü bir seçenek haline getirir.`,
    `${input.name} isminde ${input.meaning} vurgusu öne çıkar. Kökeni ${input.origin} olarak gösterilen bu ad, kız bebek isimleri arasında anlamı açıklanabilen ve telaffuzu doğal ilerleyen seçeneklerden biridir. Farklı kaynaklarda küçük yorum ayrılıkları görülse bile ismin yerleşik olumlu çağrışımı belirgindir. Özellikle ${categoryFeeling(input.category)} isimlerden hoşlanan aileler için dengeli ve güvenilir bir tercih olabilir.`,
    `${input.name}, yerleşik kullanımlarda ${input.meaning} fikriyle açıklanan anlamlı bir kız adıdır. ${input.origin} çizgisinden gelen yapısı, isme kültürel bir arka plan ve kolay anlatılabilir bir kimlik kazandırır. Söylenişi günlük hayatta zorlanmadan kullanılabildiği için aile içinde ve sosyal çevrede rahat benimsenir. Anlamı güçlü T harfi kız isimleri arasında abartısız ama karakterli bir yerde durur.`,
    `${input.name} adı, ${input.meaning} çağrışımıyla ailelerin kısa listesine girebilecek nitelikli bir kız ismidir. ${input.origin} kökenli olması, ismin tarihi, kültürel veya modern bağını daha görünür kılar. Bu isimde ${categoryFeeling(input.category)} bir etki hissedilir ve bu etki kardeş isimleriyle uyum kurarken de avantaj sağlar. Bilinen anlamı ve doğal kullanımıyla güven veren bir seçenek olarak değerlendirilebilir.`,
  ];
  return variants[index % variants.length];
}

function introText(input: TGirlNameInput, index: number) {
  const feeling = categoryFeeling(input.category);
  const feelingSentence = sentenceStart(feeling);
  const variants = [
    `${input.name} ismi, T harfiyle başlayan kız bebek isimleri içinde ${styleLabel(input.style)} bir ad arayan ailelere hitap eder. ${input.meaning} ifadesi, isme kulağa hoş gelen bir sesin yanında çocukla birlikte büyüyebilecek olumlu bir hikaye kazandırır. İsmin ${feeling} karakteri, onu hem tek başına hem de kardeş isimleriyle yan yana dengeli kılar. Bu nedenle yeni doğan kız bebekleri için anlamı ve tınısı birlikte güçlü bir seçenek olarak düşünülebilir.`,
    `${input.name}, anlamı ile söyleyişi birbirini destekleyen kız isimlerinden biridir. ${input.origin} kökenli arka planı, isme tanınabilir bir derinlik ve güven veren bir duruş sağlar. Aileler bu adı seçerken çoğu zaman zarif, anlaşılır ve yıllar içinde eskimeyecek bir isim etkisi arar. ${feelingSentence} havası sayesinde isim, modern listelerde de klasik zevklerde de doğal karşılık bulabilir.`,
    `${input.name} adını düşünen aileler için en dikkat çekici nokta, ismin ${input.meaning} çağrışımını yumuşak ve anlaşılır bir tınıyla taşımasıdır. Ne fazla gösterişli ne de zayıf duran bu ad, yenidoğan kız isimleri arasında sakin ama belirgin bir iz bırakır. İsmin ${styleLabel(input.style)} duruşu, kardeş adı önerilerinde de uyumlu eşleşmeler üretmeye yardımcı olur. Anlamı açık ve kullanımı doğal olduğu için günlük hayata kolay yerleşir.`,
    `${input.name}, T harfi kız isimleri arasında anlamı olan ve kulağa temiz gelen bir seçenek arayanlar için güçlü bir alternatiftir. Söylenişi akılda kalıcıdır ve taşıdığı anlam, isme sıcak bir kişilik kazandırır. ${feelingSentence} yönü, adı yalnızca güzel duyulan değil, aynı zamanda iyi açıklanabilen bir tercih haline getirir. Aileler için bu isim hem duygusal hem de veri kalitesi açısından güvenilir bir seçim sunar.`,
  ];
  return variants[index % variants.length];
}

function scoreSimilarity(a: TGirlNameInput, b: TGirlNameInput) {
  let score = 0;
  if (a.category === b.category) score += 6;
  if (a.style === b.style) score += 3;
  if (isShortName(a.name) === isShortName(b.name)) score += 2;
  score += Math.max(0, 3 - Math.abs(a.popularity - b.popularity));
  if (a.origin.split("/")[0].trim() === b.origin.split("/")[0].trim()) score += 1;
  if (a.name.slice(0, 2).toLocaleLowerCase("tr-TR") === b.name.slice(0, 2).toLocaleLowerCase("tr-TR")) score += 2;
  return score;
}

function similarNamesFor(input: TGirlNameInput) {
  return T_GIRL_NAME_INPUTS.filter((candidate) => candidate.name !== input.name)
    .map((candidate) => ({ candidate, score: scoreSimilarity(input, candidate) }))
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name, "tr-TR"))
    .slice(0, 10)
    .map(({ candidate }) => candidate.name);
}

export const T_GIRL_NAME_SEED: BabyNameSeed[] = T_GIRL_NAME_INPUTS.map((input, index) => ({
  id: `t-girl-${index + 1}`,
  slug: slugifyTr(input.name),
  displayName: input.name,
  gender: "GIRL",
  meaning: meaningText(input, index),
  origin: input.origin,
  pronunciation: input.pronunciation ?? pronunciationOf(input.name),
  popularity: input.popularity,
  popularScore: input.popularScore,
  inQuran: Boolean(input.inQuran),
  quranReference: input.quranReference ?? null,
  style: input.style,
  isShort: isShortName(input.name),
  beautifulMeaning: true,
  intro: introText(input, index),
  traits: input.traits,
  similar: similarNamesFor(input),
}));
