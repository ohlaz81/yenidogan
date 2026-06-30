import type { BabyNameSeed } from "@/types/baby-name-seed";
import type { NameStyle } from "@/types/database";

type RGirlNameInput = {
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
    | "color";
  inQuran?: boolean;
  quranReference?: string | null;
};

const R_GIRL_NAME_INPUTS: RGirlNameInput[] = [
  { name: "Rabia", meaning: "dördüncü, baharla ve huzurlu dengeyle ilişkilendirilen köklü ad", origin: "Arapça", popularity: 4.0, popularScore: 4, style: "POPULAR", category: "classic", traits: ["Köklü", "Zarif", "Dengeli", "Manevi", "Güven veren", "Sakin"] },
  { name: "Rabianur", meaning: "Rabia isminin köklü havasını nurun aydınlığıyla birleştiren ad", origin: "Arapça / Türkçe kullanım", pronunciation: "Ra-bi-a-nur", popularity: 3.3, popularScore: 3, style: "POPULAR", category: "spiritual", traits: ["Aydınlık", "Manevi", "Köklü", "Zarif", "Güven veren", "Sıcak"] },
  { name: "Rabiye", meaning: "Rabia adının Türkçede yerleşmiş yumuşak söyleyişli biçimi", origin: "Arapça / Türkçe kullanım", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "classic", traits: ["Klasik", "Yumuşak", "Köklü", "Sakin", "Zarif", "Güvenilir"] },
  { name: "Rahime", meaning: "merhametli, şefkatli ve acıma duygusu güçlü kadın", origin: "Arapça", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Merhametli", "Şefkatli", "Klasik", "Sakin", "Güvenilir", "Olgun"] },
  { name: "Rahmiye", meaning: "rahmet, merhamet ve şefkat anlam alanıyla ilişkili kadın adı", origin: "Arapça", popularity: 2.3, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Şefkatli", "Köklü", "Klasik", "Duyarlı", "Sakin", "Güven veren"] },
  { name: "Rahşan", meaning: "parlak, ışıklı ve dikkat çeken aydınlık duruş", origin: "Farsça", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "light", traits: ["Parlak", "Klasik", "Güçlü", "Zarif", "Aydınlık", "Kararlı"] },
  { name: "Raife", meaning: "şefkat eden, esirgeyen ve ince merhamet gösteren kişi", origin: "Arapça", popularity: 2.1, popularScore: 1, style: "RARE", category: "virtue", traits: ["Şefkatli", "Nadir", "Nazik", "Duyarlı", "Sakin", "Olgun"] },
  { name: "Raika", meaning: "üstün, seçkin, hoş ve zarif güzellik taşıyan kadın", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "RARE", category: "grace", traits: ["Seçkin", "Zarif", "Nadir", "Estetik", "Asil", "Yumuşak"] },
  { name: "Rakibe", meaning: "gözeten, dikkat eden ve sorumluluk duygusu taşıyan kadın", origin: "Arapça", popularity: 2.0, popularScore: 1, style: "RARE", category: "classic", traits: ["Dikkatli", "Köklü", "Sorumlu", "Klasik", "Güvenilir", "Sakin"] },
  { name: "Ramize", meaning: "işaret eden, anlamlı sembol taşıyan ve ima gücü bulunan kadın", origin: "Arapça", popularity: 2.1, popularScore: 1, style: "RARE", category: "classic", traits: ["Anlamlı", "Köklü", "Düşünceli", "Nadir", "Zarif", "Sakin"] },
  { name: "Rana", meaning: "güzel, hoş görünen ve zarif duruşuyla beğenilen kişi", origin: "Farsça", popularity: 3.8, popularScore: 4, style: "POPULAR", category: "grace", traits: ["Zarif", "Popüler", "Kısa", "Estetik", "Yumuşak", "Akılda kalıcı"] },
  { name: "Ravza", meaning: "bahçe, yeşil alan ve cennet bahçesi çağrışımı taşıyan ad", origin: "Arapça", popularity: 3.7, popularScore: 4, style: "POPULAR", category: "spiritual", traits: ["Manevi", "Ferah", "Doğal", "Popüler", "Huzurlu", "Zarif"] },
  { name: "Ravzanur", meaning: "Ravza'nın huzurlu bahçe anlamını nurun aydınlığıyla tamamlayan ad", origin: "Arapça / Türkçe kullanım", pronunciation: "Rav-za-nur", popularity: 3.2, popularScore: 3, style: "POPULAR", category: "spiritual", traits: ["Manevi", "Aydınlık", "Ferah", "Zarif", "Popüler", "Güven veren"] },
  { name: "Raziye", meaning: "razı olan, hoşnutluk ve gönül huzuru taşıyan kadın", origin: "Arapça", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Huzurlu", "Klasik", "Olgun", "Dengeli", "Güvenilir", "Sakin"] },
  { name: "Refia", meaning: "yüce, yüksek dereceli ve itibarlı kadın", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "RARE", category: "virtue", traits: ["Yüce", "Asil", "Nadir", "Klasik", "Güçlü", "Zarif"] },
  { name: "Refika", meaning: "arkadaş, yoldaş ve yakınlık duygusu veren kadın", origin: "Arapça", popularity: 2.4, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Dost canlısı", "Klasik", "Sıcak", "Güvenilir", "Uyumlu", "İçten"] },
  { name: "Refiye", meaning: "yüksek, değerli ve itibarlı anlamlarıyla anılan kadın adı", origin: "Arapça", popularity: 2.1, popularScore: 1, style: "RARE", category: "classic", traits: ["Değerli", "Köklü", "Nadir", "Asil", "Sakin", "Olgun"] },
  { name: "Remziye", meaning: "sembol, işaret ve derin anlam taşıyan kadın adı", origin: "Arapça", popularity: 2.3, popularScore: 2, style: "CLASSIC", category: "classic", traits: ["Anlamlı", "Klasik", "Düşünceli", "Köklü", "Güvenilir", "Sakin"] },
  { name: "Rengin", meaning: "renkli, canlı ve estetik çeşitlilik çağrışımı taşıyan ad", origin: "Farsça", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "color", traits: ["Renkli", "Sanatsal", "Zarif", "Canlı", "Klasik", "Özgün"] },
  { name: "Renginar", meaning: "renkli, süslü ve canlı güzellik duygusu taşıyan zarif ad", origin: "Farsça", popularity: 2.0, popularScore: 1, style: "RARE", category: "color", traits: ["Renkli", "Nadir", "Estetik", "Zarif", "Sanatsal", "Duygulu"] },
  { name: "Renan", meaning: "tınlayan, yankı veren ve melodik duygu taşıyan ad", origin: "Farsça", popularity: 2.3, popularScore: 2, style: "RARE", category: "sound", traits: ["Melodik", "Nadir", "Zarif", "Duygulu", "Sakin", "Sanatsal"] },
  { name: "Reşide", meaning: "olgun, doğru yolu bulan ve aklıselim sahibi kadın", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Olgun", "Bilge", "Klasik", "Güvenilir", "Dengeli", "Kararlı"] },
  { name: "Reyhan", meaning: "güzel kokulu reyhan bitkisi, ferahlık ve hoş koku", origin: "Arapça / bitki adı", popularity: 3.4, popularScore: 3, style: "CLASSIC", category: "nature", traits: ["Hoş kokulu", "Doğal", "Klasik", "Ferah", "Zarif", "Sakin"] },
  { name: "Reyhane", meaning: "reyhan bitkisiyle ilişkili, güzel kokulu ve ferah kadın adı", origin: "Arapça", popularity: 2.4, popularScore: 2, style: "CLASSIC", category: "nature", traits: ["Hoş kokulu", "Klasik", "Zarif", "Doğal", "Ferah", "Yumuşak"] },
  { name: "Reyhanur", meaning: "reyhanın ferah kokusunu nurun aydınlığıyla birleştiren ad", origin: "Arapça / Türkçe kullanım", popularity: 2.8, popularScore: 2, style: "MODERN", category: "spiritual", traits: ["Aydınlık", "Doğal", "Manevi", "Zarif", "Ferah", "Modern"] },
  { name: "Reyyan", meaning: "cennet kapılarından biri olarak bilinen, suya kanmış ve ferah anlamlı ad", origin: "Arapça", popularity: 3.8, popularScore: 4, style: "POPULAR", category: "spiritual", traits: ["Manevi", "Ferah", "Popüler", "Zarif", "Güçlü", "Akılda kalıcı"] },
  { name: "Rezzan", meaning: "ağırbaşlı, vakur ve ölçülü duruş sahibi kadın", origin: "Arapça", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Ağırbaşlı", "Klasik", "Güçlü", "Olgun", "Dengeli", "Güven veren"] },
  { name: "Rikkat", meaning: "incelik, duyarlılık ve şefkatli hassasiyet", origin: "Arapça", popularity: 2.1, popularScore: 1, style: "RARE", category: "virtue", traits: ["İnce", "Duyarlı", "Şefkatli", "Nadir", "Zarif", "Sakin"] },
  { name: "Rojbin", meaning: "gün ışığını gören, aydınlık güne bakan kişi", origin: "Kürtçe", popularity: 2.7, popularScore: 2, style: "MODERN", category: "light", traits: ["Aydınlık", "Modern", "Özgün", "Umutlu", "Canlı", "Güçlü"] },
  { name: "Rojda", meaning: "gün doğumu, güneşin doğuşu ve yeni başlangıç çağrışımı", origin: "Kürtçe", popularity: 3.1, popularScore: 3, style: "MODERN", category: "light", traits: ["Aydınlık", "Modern", "Umutlu", "Doğal", "Canlı", "Özgün"] },
  { name: "Rojin", meaning: "gün ışığı, güneş aydınlığı ve parlak zaman çağrışımı", origin: "Kürtçe", popularity: 3.2, popularScore: 3, style: "MODERN", category: "light", traits: ["Parlak", "Modern", "Aydınlık", "Özgün", "Sıcak", "Akılda kalıcı"] },
  { name: "Ronahi", meaning: "aydınlık, ışık ve berraklık anlamlarıyla kullanılan ad", origin: "Kürtçe", popularity: 2.8, popularScore: 2, style: "MODERN", category: "light", traits: ["Aydınlık", "Özgün", "Modern", "Ferah", "Umutlu", "Sakin"] },
  { name: "Rozerin", meaning: "altın renkli gün veya güneş ışığı çağrışımı taşıyan ad", origin: "Kürtçe", popularity: 2.6, popularScore: 2, style: "MODERN", category: "light", traits: ["Parlak", "Özgün", "Modern", "Sıcak", "Renkli", "Zarif"] },
  { name: "Rozalin", meaning: "gül çağrışımı taşıyan, zarif ve çiçeksi tınılı ad", origin: "Kürtçe / Batı dilleri kullanımı", popularity: 2.5, popularScore: 2, style: "MODERN", category: "flower", traits: ["Çiçeksi", "Modern", "Zarif", "Özgün", "Yumuşak", "Estetik"] },
  { name: "Ruken", meaning: "güler yüzlü, neşeli ve içten duruş çağrışımı taşıyan ad", origin: "Kürtçe", popularity: 2.6, popularScore: 2, style: "MODERN", category: "grace", traits: ["Neşeli", "İçten", "Modern", "Özgün", "Sıcak", "Canlı"] },
  { name: "Ruhengiz", meaning: "ruhu etkileyen, duyguları harekete geçiren ve canlılık veren ad", origin: "Farsça", pronunciation: "Ru-hen-giz", popularity: 2.0, popularScore: 1, style: "RARE", category: "classic", traits: ["Duygulu", "Edebî", "Nadir", "Canlı", "Klasik", "Sanatsal"] },
  { name: "Ruhsar", meaning: "yanak, yüz güzelliği ve zarif çehre çağrışımı", origin: "Farsça", popularity: 2.3, popularScore: 2, style: "CLASSIC", category: "grace", traits: ["Zarif", "Klasik", "Estetik", "Yumuşak", "Duygulu", "Asil"] },
  { name: "Ruhşen", meaning: "ruhu neşeli, gönlü aydın ve içten sevinç taşıyan ad", origin: "Farsça / Türkçe kullanım", pronunciation: "Ruh-şen", popularity: 2.1, popularScore: 1, style: "RARE", category: "virtue", traits: ["Neşeli", "Nadir", "İçten", "Sıcak", "Duygulu", "Aydınlık"] },
  { name: "Ruşen", meaning: "aydın, parlak ve ışıklı anlamlarıyla kullanılan ad", origin: "Farsça", pronunciation: "Ru-şen", popularity: 2.2, popularScore: 2, style: "RARE", category: "light", traits: ["Aydınlık", "Parlak", "Nadir", "Sade", "Güçlü", "Dengeli"] },
  { name: "Rüçhan", meaning: "üstünlük, öncelik ve tercih edilme değeri", origin: "Arapça", pronunciation: "Rüç-han", popularity: 2.1, popularScore: 1, style: "RARE", category: "virtue", traits: ["Seçkin", "Güçlü", "Nadir", "Kararlı", "Asil", "Dengeli"] },
  { name: "Rukiye", meaning: "yükselme, ilerleme ve değerli manevi duruş çağrışımı", origin: "Arapça", popularity: 3.0, popularScore: 3, style: "CLASSIC", category: "spiritual", traits: ["Manevi", "Klasik", "Güven veren", "Zarif", "Köklü", "Sakin"] },
  { name: "Rümeysa", meaning: "gökteki küçük yıldız ve zarif parlaklık çağrışımıyla bilinen ad", origin: "Arapça", popularity: 4.0, popularScore: 4, style: "POPULAR", category: "light", traits: ["Parlak", "Popüler", "Zarif", "Manevi", "Yumuşak", "Akılda kalıcı"] },
  { name: "Rümeysanur", meaning: "Rümeysa'nın yıldız çağrışımını nurun aydınlığıyla güçlendiren ad", origin: "Arapça / Türkçe kullanım", pronunciation: "Rü-mey-sa-nur", popularity: 3.2, popularScore: 3, style: "POPULAR", category: "spiritual", traits: ["Aydınlık", "Manevi", "Popüler", "Zarif", "Parlak", "Güven veren"] },
  { name: "Rüveyda", meaning: "yavaşça, incelikle ve sakin bir ölçüyle hareket etme anlamı", origin: "Arapça", popularity: 3.5, popularScore: 3, style: "POPULAR", category: "grace", inQuran: true, quranReference: "Tarık suresi 86:17'de geçen 'ruveyda' ifadesi yavaşça ve mühlet vererek anlam alanıyla ilişkilendirilir.", traits: ["Sakin", "Zarif", "Manevi", "Popüler", "Yumuşak", "Dengeli"] },
  { name: "Rüveyde", meaning: "Rüveyda adının yumuşak söyleyişli biçimi; sakinlik ve incelik çağrışımı", origin: "Arapça / Türkçe kullanım", popularity: 2.4, popularScore: 2, style: "RARE", category: "grace", traits: ["Sakin", "Zarif", "Nadir", "Yumuşak", "Dengeli", "Manevi"] },
  { name: "Rüya", meaning: "düş, hayal ve uyku sırasında görülen anlamlı görüntü", origin: "Arapça", popularity: 3.4, popularScore: 3, style: "MODERN", category: "modern", traits: ["Hayalci", "Modern", "Kısa", "Sanatsal", "Yumuşak", "Akılda kalıcı"] },
  { name: "Rüyam", meaning: "benim rüyam anlamı veren, sevgi ve hayal çağrışımlı ad", origin: "Arapça / Türkçe kullanım", popularity: 2.8, popularScore: 2, style: "MODERN", category: "modern", traits: ["Hayalci", "Sıcak", "Modern", "Duygulu", "Özgün", "Yumuşak"] },
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
  if (style === "POPULAR") return "sevilen ve güncel";
  if (style === "RARE") return "nadir ama anlamı belirgin";
  if (style === "CLASSIC") return "kökleri güçlü ve tanıdık";
  return "modern ve temiz tınılı";
}

function categoryFeeling(category: RGirlNameInput["category"]) {
  const feelings: Record<RGirlNameInput["category"], string> = {
    nature: "doğal ve ferah",
    light: "aydınlık ve umut veren",
    classic: "köklü ve güven veren",
    modern: "çağdaş ve akılda kalıcı",
    virtue: "erdemli ve anlamı güçlü",
    spiritual: "manevi ve huzurlu",
    flower: "çiçeksi ve zarif",
    grace: "zarif ve yumuşak",
    sound: "melodik ve sanatsal",
    color: "renkli ve estetik",
  };
  return feelings[category];
}

function meaningText(input: RGirlNameInput, index: number) {
  const variants = [
    `${input.name}, sözlüklerde ve yerleşik kullanımda ${input.meaning} ile ilişkilendirilen gerçek bir kız ismidir. ${input.origin} kökenli bu ad, Türkiye'de isim sözlüklerinde ve günlük kullanımda karşılığı olan seçenekler arasında değerlendirilir. İsmin çağrışımı, hem kulağa gelen tınısı hem de taşıdığı kültürel anlam bakımından güçlüdür. Bu nedenle anlamı güzel kız isimleri arayan aileler için özenli ve dengeli bir alternatif sunar.`,
    `${input.name} isminde ${input.meaning} vurgusu öne çıkar. ${input.origin} çizgisinden gelen bu ad, kız bebek isimleri içinde anlamı anlaşılır ve karakteri belirgin bir seçenek olarak durur. İsmin havasında ${categoryFeeling(input.category)} bir yön bulunur ve bu yön onu kardeş isimleriyle de uyumlu kılar. Anlamı farklı kaynaklarda küçük nüanslarla açıklansa bile yerleşik kullanımındaki olumlu çağrışım nettir.`,
    `${input.name}, ${input.meaning} ile ailelerin sevdiği anlamlı R harfi kız isimleri arasında yer alır. Kökeni ${input.origin} olarak gösterilen isim, Türkçedeki söyleyişiyle yumuşak ve akılda kalıcı bir kimlik kazanır. Anlamı sadece kısa bir sözlük karşılığına indirgenmez; isimde kültürel hafıza, zarafet ve kişilik duygusu birlikte hissedilir. Özellikle ${categoryFeeling(input.category)} adları seven aileler için doğal bir tercih olabilir.`,
    `${input.name} adı, kaynaklarda ${input.meaning} ifadesiyle açıklanan bir kız ismidir. ${input.origin} kökenli yapısı, isme köklü bir arka plan ve güven veren bir duruş kazandırır. Telaffuzu rahat ilerlediği için günlük kullanımda sertleşmeden, sade bir akışla duyulur. Anlamı güzel ve kullanılabilir isimler içinde, abartısız ama karakterli bir seçenek olarak öne çıkar.`,
  ];
  return variants[index % variants.length];
}

function introText(input: RGirlNameInput, index: number) {
  const variants = [
    `${input.name} ismi, R harfiyle başlayan kız bebek isimleri içinde ${styleLabel(input.style)} bir seçenek arayan ailelere hitap eder. ${input.meaning} anlamı, isme yalnızca hoş bir ses değil, çocuğa eşlik edecek olumlu bir hikaye de kazandırır. ${categoryFeeling(input.category)} havası sayesinde hem tek başına hem de kardeş isimleriyle yan yana dengeli durur.`,
    `${input.name}, anlamı ve söyleyişi birlikte güçlü olan kız isimlerinden biridir. İsmin ${input.origin} kökenli arka planı, ona kültürel bir derinlik ve tanınabilir bir karakter verir. Aileler bu adı seçerken genellikle zarif, anlaşılır ve uzun yıllar eskimeyecek bir isim etkisi arar.`,
    `${input.name} adını düşünen aileler için ismin en dikkat çekici yanı, ${input.meaning} anlamını doğal bir tınıyla taşımasıdır. Ne fazla gösterişli ne de zayıf duran bu ad, yenidoğan kız bebek isimleri arasında sakin ama belirgin bir iz bırakır. İsmin ${categoryFeeling(input.category)} yönü, kardeş adı önerilerinde de uyumlu eşleşmeler üretmeye yardımcı olur.`,
    `${input.name}, kısa listeye anlamı olan ve kulağa temiz gelen bir R ismi eklemek isteyenler için güçlü bir alternatiftir. Söylenişi akılda kalıcıdır ve taşıdığı anlam, isme sıcak bir kişilik kazandırır. ${styleLabel(input.style)} duruşu sayesinde hem klasik hem de modern isimlerle birlikte kullanılabilir.`,
  ];
  return variants[index % variants.length];
}

function scoreSimilarity(a: RGirlNameInput, b: RGirlNameInput) {
  let score = 0;
  if (a.category === b.category) score += 5;
  if (a.style === b.style) score += 3;
  if (isShortName(a.name) === isShortName(b.name)) score += 2;
  score += Math.max(0, 3 - Math.abs(a.popularity - b.popularity));
  if (a.origin.split("/")[0].trim() === b.origin.split("/")[0].trim()) score += 1;
  if (a.name.slice(0, 2).toLocaleLowerCase("tr-TR") === b.name.slice(0, 2).toLocaleLowerCase("tr-TR")) score += 1;
  return score;
}

function similarNamesFor(input: RGirlNameInput) {
  return R_GIRL_NAME_INPUTS.filter((candidate) => candidate.name !== input.name)
    .map((candidate) => ({ candidate, score: scoreSimilarity(input, candidate) }))
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name, "tr-TR"))
    .slice(0, 10)
    .map(({ candidate }) => candidate.name);
}

export const R_GIRL_NAME_SEED: BabyNameSeed[] = R_GIRL_NAME_INPUTS.map((input, index) => ({
  id: `r-girl-${index + 1}`,
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
