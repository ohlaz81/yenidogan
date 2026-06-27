import type { BabyNameSeed } from "@/types/baby-name-seed";
import type { NameStyle } from "@/types/database";

type KlmGirlNameInput = {
  name: string;
  meaning: string;
  origin: string;
  pronunciation?: string;
  popularity: number;
  popularScore: number;
  style: NameStyle;
  traits: string[];
  category: "nature" | "light" | "classic" | "modern" | "virtue" | "spiritual" | "flower" | "grace";
  inQuran?: boolean;
  quranReference?: string | null;
};

const KLM_GIRL_NAME_INPUTS: KlmGirlNameInput[] = [
  { name: "Kadriye", meaning: "değerli, itibarlı ve saygın kişi", origin: "Arapça", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Değerli", "Saygın", "Olgun", "Güvenilir", "Klasik", "Ağırbaşlı"] },
  { name: "Kader", meaning: "alın yazısı, nasip ve hayatın akışı", origin: "Arapça", popularity: 3.5, popularScore: 3, style: "CLASSIC", category: "spiritual", traits: ["Manevi", "Derin", "Sakin", "Güçlü", "Duygulu", "Köklü"] },
  { name: "Kadife", meaning: "yumuşak dokulu, parlak ve zarif kumaş", origin: "Arapça kökenli Türkçe kullanım", popularity: 2.4, popularScore: 2, style: "RARE", category: "grace", traits: ["Yumuşak", "Zarif", "Narin", "Özgün", "Sıcak", "Estetik"] },
  { name: "Kainat", meaning: "evren, bütün varlık âlemi ve geniş dünya", origin: "Arapça", pronunciation: "Ka-i-nat", popularity: 3.0, popularScore: 3, style: "MODERN", category: "nature", traits: ["Geniş", "Derin", "Evrensel", "Güçlü", "Modern", "Düşünceli"] },
  { name: "Kalben", meaning: "yürekten, içtenlikle ve gönülden", origin: "Türkçe", popularity: 2.6, popularScore: 2, style: "MODERN", category: "virtue", traits: ["İçten", "Samimi", "Sıcak", "Duygulu", "Özgün", "Nazik"] },
  { name: "Kamile", meaning: "olgun, eksiksiz ve erdemli kişi", origin: "Arapça", popularity: 2.9, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Olgun", "Erdemli", "Güvenilir", "Sakin", "Klasik", "Dengeli"] },
  { name: "Karanfil", meaning: "hoş kokulu, renkli ve sevilen karanfil çiçeği", origin: "Türkçe", popularity: 2.2, popularScore: 2, style: "RARE", category: "flower", traits: ["Çiçeksi", "Hoş kokulu", "Zarif", "Klasik", "Duygulu", "Özgün"] },
  { name: "Kardelen", meaning: "karda açan, direnç ve umut simgesi çiçek", origin: "Türkçe", popularity: 3.7, popularScore: 4, style: "POPULAR", category: "flower", traits: ["Dirençli", "Umutlu", "Doğal", "Zarif", "Güçlü", "Ferah"] },
  { name: "Karime", meaning: "cömert, soylu ve değerli kadın", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "RARE", category: "virtue", traits: ["Cömert", "Soylu", "Değerli", "Klasik", "Sakin", "Güvenilir"] },
  { name: "Karmen", meaning: "şarkı, ezgi ve güçlü melodik tını çağrışımı", origin: "Latince / İspanyolca kullanım", popularity: 2.6, popularScore: 2, style: "MODERN", category: "modern", traits: ["Melodik", "Güçlü", "Modern", "Özgün", "Canlı", "Akılda kalıcı"] },
  { name: "Karsu", meaning: "kar suyu, berraklık ve doğal akış", origin: "Türkçe", popularity: 3.0, popularScore: 3, style: "MODERN", category: "nature", traits: ["Berrak", "Doğal", "Akıcı", "Ferah", "Modern", "Sade"] },
  { name: "Karya", meaning: "Anadolu'nun tarihî Karya bölgesiyle ilişkilenen yer adı", origin: "Anadolu / tarihî yer adı", popularity: 3.4, popularScore: 3, style: "MODERN", category: "modern", traits: ["Modern", "Tarihî", "Zarif", "Özgün", "Güçlü", "Akılda kalıcı"] },
  { name: "Katre", meaning: "damla, özellikle yağmur veya gözyaşı damlası", origin: "Arapça", popularity: 3.2, popularScore: 3, style: "MODERN", category: "nature", traits: ["Narin", "Duygulu", "Sade", "Zarif", "Ferah", "Modern"] },
  { name: "Kayla", meaning: "modern kullanımlarda saf, zarif ve sevilen kişi çağrışımı", origin: "İngilizce / modern kullanım", popularity: 2.8, popularScore: 2, style: "MODERN", category: "modern", traits: ["Modern", "Kısa", "Yumuşak", "Canlı", "Özgün", "Akılda kalıcı"] },
  { name: "Kerime", meaning: "cömert, eli açık ve soylu kadın", origin: "Arapça", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Cömert", "Klasik", "Soylu", "Güvenilir", "Olgun", "Sıcak"] },
  { name: "Kevser", meaning: "bolluk, bereket ve cennette bir ırmak adı", origin: "Arapça", popularity: 3.8, popularScore: 4, style: "POPULAR", category: "spiritual", inQuran: true, quranReference: "Kevser suresi (108) adını bu kelimeden alır; bolluk ve ilahi ikram anlamı taşır.", traits: ["Bereketli", "Manevi", "Aydınlık", "Güçlü", "Klasik", "Umutlu"] },
  { name: "Kevsernur", meaning: "Kevser bereketi ile nurun aydınlığını birleştiren ad", origin: "Arapça / Türkçe kullanım", popularity: 3.0, popularScore: 3, style: "MODERN", category: "spiritual", traits: ["Manevi", "Aydınlık", "Bereketli", "Zarif", "Modern", "Güven veren"] },
  { name: "Kezban", meaning: "ev işlerini bilen, düzenli ve becerikli kadın", origin: "Farsça", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "classic", traits: ["Köklü", "Çalışkan", "Düzenli", "Klasik", "Güvenilir", "Sade"] },
  { name: "Keziban", meaning: "Kezban isminin yumuşak söylenişli geleneksel biçimi", origin: "Farsça / Türkçe kullanım", popularity: 2.3, popularScore: 2, style: "CLASSIC", category: "classic", traits: ["Geleneksel", "Yumuşak", "Köklü", "Sakin", "Sıcak", "Olgun"] },
  { name: "Kibar", meaning: "nazik, ince davranışlı ve görgülü kişi", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "RARE", category: "virtue", traits: ["Nazik", "İnce", "Zarif", "Klasik", "Sakin", "Güven veren"] },
  { name: "Kifayet", meaning: "yeterlilik, olgunluk ve kendine yetme", origin: "Arapça", popularity: 2.0, popularScore: 1, style: "RARE", category: "virtue", traits: ["Olgun", "Dengeli", "Güçlü", "Köklü", "Nadir", "Güvenilir"] },
  { name: "Kiraz", meaning: "kırmızı meyvesiyle bilinen canlı ve tatlı ağaç meyvesi", origin: "Türkçe", popularity: 2.6, popularScore: 2, style: "RARE", category: "nature", traits: ["Canlı", "Tatlı", "Doğal", "Renkli", "Neşeli", "Özgün"] },
  { name: "Kısmet", meaning: "nasip, pay ve hayatta kişiye düşen güzel karşılık", origin: "Arapça", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Manevi", "Umutlu", "Köklü", "Sakin", "Güven veren", "Duygulu"] },
  { name: "Kızılgül", meaning: "kırmızı gül ve sevgiyle ilişkilenen çiçek imgesi", origin: "Türkçe", popularity: 2.0, popularScore: 1, style: "RARE", category: "flower", traits: ["Çiçeksi", "Romantik", "Renkli", "Zarif", "Nadir", "Duygulu"] },
  { name: "Konca", meaning: "açılmamış gonca, taze ve narin çiçek tomurcuğu", origin: "Farsça / Türkçe kullanım", popularity: 2.1, popularScore: 2, style: "RARE", category: "flower", traits: ["Narin", "Çiçeksi", "Taze", "Zarif", "Sakin", "Özgün"] },
  { name: "Kösem", meaning: "sürüye öncülük eden, seçkin ve lider kişi", origin: "Türkçe", popularity: 2.1, popularScore: 1, style: "RARE", category: "classic", traits: ["Lider", "Güçlü", "Tarihî", "Özgün", "Köklü", "Kararlı"] },
  { name: "Kumsal", meaning: "deniz kıyısındaki kumluk alan", origin: "Türkçe", popularity: 3.1, popularScore: 3, style: "MODERN", category: "nature", traits: ["Ferah", "Doğal", "Sakin", "Modern", "Yazlık", "Yumuşak"] },
  { name: "Kumral", meaning: "açık kahverengi saç veya ten rengi", origin: "Türkçe", popularity: 2.2, popularScore: 2, style: "RARE", category: "grace", traits: ["Sıcak", "Doğal", "Sade", "Özgün", "Yumuşak", "Estetik"] },
  { name: "Kutluay", meaning: "uğurlu, kutlu ve ay gibi parlak", origin: "Türkçe", popularity: 2.0, popularScore: 1, style: "RARE", category: "light", traits: ["Uğurlu", "Aydınlık", "Nadir", "Güçlü", "Dingin", "Özgün"] },
  { name: "Kübranur", meaning: "büyüklük ve nur anlamlarını birleştiren manevi ad", origin: "Arapça / Türkçe kullanım", popularity: 3.2, popularScore: 3, style: "POPULAR", category: "spiritual", traits: ["Aydınlık", "Manevi", "Güçlü", "Zarif", "Klasik", "Güven veren"] },
  { name: "Kübrasu", meaning: "Kübra isminin güçlü tınısını suyun ferahlığıyla birleştiren ad", origin: "Arapça / Türkçe kullanım", popularity: 2.6, popularScore: 2, style: "MODERN", category: "nature", traits: ["Ferah", "Modern", "Güçlü", "Akıcı", "Zarif", "Aydınlık"] },
  { name: "Kübra Sena", meaning: "büyüklük, yücelik ve övgü anlamlarını taşıyan birleşik ad", origin: "Arapça / Türkçe kullanım", pronunciation: "Küb-ra Se-na", popularity: 3.0, popularScore: 3, style: "POPULAR", category: "spiritual", traits: ["Manevi", "Yüce", "Zarif", "Klasik", "Güçlü", "Aydınlık"] },
  { name: "Kübragül", meaning: "Kübra'nın yüceliğini gülün zarafetiyle birleştiren ad", origin: "Arapça / Türkçe kullanım", popularity: 2.3, popularScore: 2, style: "RARE", category: "flower", traits: ["Zarif", "Çiçeksi", "Manevi", "Köklü", "Duygulu", "Özgün"] },
  { name: "Lalezar", meaning: "lale bahçesi, lalelerle dolu yer", origin: "Farsça", popularity: 2.2, popularScore: 2, style: "RARE", category: "flower", traits: ["Çiçeksi", "Zarif", "Romantik", "Klasik", "Nadir", "Estetik"] },
  { name: "Lalifer", meaning: "lale ve ışık çağrışımlarını taşıyan zarif birleşik ad", origin: "Farsça / Türkçe kullanım", popularity: 2.0, popularScore: 1, style: "RARE", category: "flower", traits: ["Zarif", "Çiçeksi", "Aydınlık", "Nadir", "Duygulu", "Özgün"] },
  { name: "Lalin", meaning: "lal taşı gibi kırmızı ve değerli", origin: "Farsça", popularity: 3.4, popularScore: 3, style: "MODERN", category: "grace", traits: ["Değerli", "Modern", "Zarif", "Canlı", "Kısa", "Parlak"] },
  { name: "Lamia", meaning: "parlayan, ışıldayan ve güzel yüzlü", origin: "Arapça", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "light", traits: ["Parlak", "Zarif", "Klasik", "Yumuşak", "Dingin", "Güzel"] },
  { name: "Latife", meaning: "ince, nazik, hoş ve zarif söz", origin: "Arapça", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Nazik", "İnce", "Zarif", "Klasik", "Sıcak", "Olgun"] },
  { name: "Latika", meaning: "güzel, hoş ve zarif olan", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "RARE", category: "grace", traits: ["Zarif", "Hoş", "Nadir", "Yumuşak", "Sakin", "Estetik"] },
  { name: "Lavin", meaning: "bölgesel kullanımlarda çığ, berraklık ve güçlü doğa çağrışımı", origin: "Kürtçe / bölgesel kullanım", popularity: 3.5, popularScore: 3, style: "MODERN", category: "nature", traits: ["Modern", "Doğal", "Güçlü", "Ferah", "Özgün", "Akılda kalıcı"] },
  { name: "Lavinya", meaning: "edebî kullanımıyla zarif, romantik ve seçkin tınılı ad", origin: "Latince / edebî kullanım", popularity: 3.3, popularScore: 3, style: "MODERN", category: "grace", traits: ["Romantik", "Zarif", "Modern", "Edebî", "Özgün", "Yumuşak"] },
  { name: "Leyan", meaning: "yumuşaklık, rahatlık ve huzurlu yaşam", origin: "Arapça", popularity: 3.2, popularScore: 3, style: "MODERN", category: "grace", traits: ["Yumuşak", "Huzurlu", "Modern", "Zarif", "Sakin", "Nazik"] },
  { name: "Lerzan", meaning: "titrek, ince ve duygulu tını", origin: "Farsça", popularity: 2.3, popularScore: 2, style: "RARE", category: "classic", traits: ["Duygulu", "Klasik", "Zarif", "Nadir", "Yumuşak", "Edebî"] },
  { name: "Lidya", meaning: "Anadolu'daki tarihî Lidya uygarlığıyla ilişkilenen ad", origin: "Anadolu / tarihî yer adı", popularity: 3.8, popularScore: 4, style: "POPULAR", category: "modern", traits: ["Tarihî", "Modern", "Güçlü", "Zarif", "Akılda kalıcı", "Özgün"] },
  { name: "Lila", meaning: "morun açık ve yumuşak tonu", origin: "Farsça / Batı dilleri kullanımı", popularity: 3.0, popularScore: 3, style: "MODERN", category: "grace", traits: ["Yumuşak", "Renkli", "Kısa", "Modern", "Zarif", "Sakin"] },
  { name: "Lilas", meaning: "leylak çiçeği ve açık mor renk çağrışımı", origin: "Fransızca", popularity: 2.5, popularScore: 2, style: "RARE", category: "flower", traits: ["Çiçeksi", "Renkli", "Zarif", "Modern", "Nadir", "Yumuşak"] },
  { name: "Lina", meaning: "hurma fidanı, yumuşaklık ve zarafet çağrışımı", origin: "Arapça", popularity: 4.2, popularScore: 4, style: "POPULAR", category: "grace", inQuran: true, quranReference: "Haşr suresi 59:5'te hurma ağacı anlamındaki 'lîne' kelimesi geçer.", traits: ["Zarif", "Kısa", "Popüler", "Yumuşak", "Sade", "Modern"] },
  { name: "Linda", meaning: "güzel, hoş ve sevimli kişi", origin: "İspanyolca / Batı dilleri", popularity: 2.9, popularScore: 3, style: "MODERN", category: "grace", traits: ["Güzel", "Modern", "Yumuşak", "Canlı", "Sıcak", "Akılda kalıcı"] },
  { name: "Liva", meaning: "sancak, bayrak ve işaret", origin: "Arapça", popularity: 3.6, popularScore: 4, style: "POPULAR", category: "modern", traits: ["Güçlü", "Kısa", "Modern", "Net", "Kararlı", "Akılda kalıcı"] },
  { name: "Liya", meaning: "modern kullanımda zarif, yumuşak ve ışıklı tını", origin: "Modern ad", popularity: 3.1, popularScore: 3, style: "MODERN", category: "modern", traits: ["Kısa", "Modern", "Zarif", "Yumuşak", "Canlı", "Sade"] },
  { name: "Lizge", meaning: "temiz, seçkin ve zarif tınılı modern ad", origin: "Kürtçe / modern kullanım", popularity: 2.6, popularScore: 2, style: "MODERN", category: "modern", traits: ["Modern", "Özgün", "Kısa", "Zarif", "Canlı", "Akılda kalıcı"] },
  { name: "Lorin", meaning: "defne ağacıyla ilişkilendirilen, zafer ve zarafet çağrışımlı ad", origin: "Latince / modern kullanım", popularity: 2.7, popularScore: 2, style: "MODERN", category: "nature", traits: ["Doğal", "Modern", "Zarif", "Özgün", "Sakin", "Güçlü"] },
  { name: "Loya", meaning: "bölgesel kullanımlarda yumuşak, sıcak ve sevgi dolu tını", origin: "Kürtçe / modern kullanım", popularity: 2.3, popularScore: 2, style: "RARE", category: "modern", traits: ["Yumuşak", "Sıcak", "Özgün", "Kısa", "Modern", "Nadir"] },
  { name: "Lübeyna", meaning: "zarif, ince ve narin yapılı kişi çağrışımı", origin: "Arapça / Türkçe kullanım", popularity: 2.8, popularScore: 2, style: "MODERN", category: "grace", traits: ["Zarif", "Narin", "Yumuşak", "Modern", "Sakin", "Duygulu"] },
  { name: "Lübna", meaning: "güzel kokulu bir ağaç ve hoş rayiha", origin: "Arapça", popularity: 2.5, popularScore: 2, style: "RARE", category: "nature", traits: ["Hoş kokulu", "Doğal", "Zarif", "Nadir", "Sakin", "Klasik"] },
  { name: "Luna", meaning: "ay ve ay ışığı", origin: "Latince", popularity: 3.2, popularScore: 3, style: "MODERN", category: "light", traits: ["Aydınlık", "Kısa", "Modern", "Zarif", "Dingin", "Parlak"] },
  { name: "Mahbube", meaning: "sevilen, sevgili ve gönülde yer eden kadın", origin: "Arapça", popularity: 2.0, popularScore: 1, style: "RARE", category: "classic", traits: ["Sevilen", "Köklü", "Klasik", "Duygulu", "Sıcak", "Nadir"] },
  { name: "Mahide", meaning: "ay gibi güzel ve parlak", origin: "Farsça / Arapça kullanım", popularity: 2.1, popularScore: 1, style: "RARE", category: "light", traits: ["Aydınlık", "Klasik", "Zarif", "Nadir", "Dingin", "Parlak"] },
  { name: "Mahinur", meaning: "ayın nuru, geceyi aydınlatan yumuşak ışık", origin: "Farsça / Arapça", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "light", traits: ["Aydınlık", "Manevi", "Zarif", "Klasik", "Sakin", "Parlak"] },
  { name: "Mahperi", meaning: "ay perisi, ay kadar güzel kadın", origin: "Farsça", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "light", traits: ["Masalsı", "Zarif", "Klasik", "Parlak", "Duygulu", "Estetik"] },
  { name: "Mahpeyker", meaning: "ay yüzlü, parlak ve güzel yüzlü", origin: "Farsça", popularity: 2.4, popularScore: 2, style: "RARE", category: "light", traits: ["Tarihî", "Parlak", "Zarif", "Klasik", "Nadir", "Güçlü"] },
  { name: "Makbule", meaning: "beğenilen, kabul gören ve değer verilen", origin: "Arapça", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Değerli", "Kabul gören", "Klasik", "Güvenilir", "Olgun", "Sıcak"] },
  { name: "Masal", meaning: "hayal gücü, anlatı ve büyülü hikâye", origin: "Türkçe", popularity: 3.7, popularScore: 4, style: "POPULAR", category: "modern", traits: ["Masalsı", "Modern", "Yaratıcı", "Yumuşak", "Canlı", "Özgün"] },
  { name: "Mavi", meaning: "gökyüzü ve denizle ilişkilenen mavi renk", origin: "Türkçe", popularity: 3.2, popularScore: 3, style: "MODERN", category: "nature", traits: ["Ferah", "Sakin", "Modern", "Renkli", "Doğal", "Kısa"] },
  { name: "Maya", meaning: "öz, temel yapı ve bereketli başlangıç", origin: "Türkçe / farklı dillerde ortak kullanım", popularity: 4.0, popularScore: 4, style: "POPULAR", category: "modern", traits: ["Kısa", "Modern", "Canlı", "Sade", "Güçlü", "Akılda kalıcı"] },
  { name: "Mebrure", meaning: "iyiliği kabul edilmiş, hayırlı ve temiz kişi", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Hayırlı", "Temiz", "Klasik", "Manevi", "Olgun", "Güvenilir"] },
  { name: "Medine", meaning: "şehir; özellikle Peygamber şehri Medine ile ilişkilenen ad", origin: "Arapça / yer adı", popularity: 3.0, popularScore: 3, style: "CLASSIC", category: "spiritual", traits: ["Manevi", "Köklü", "Sakin", "Klasik", "Güven veren", "Anlamlı"] },
  { name: "Mediha", meaning: "övülen, methedilen ve güzel nitelikleriyle anılan", origin: "Arapça", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Övülen", "Klasik", "Zarif", "Olgun", "Güvenilir", "Sakin"] },
  { name: "Mehlika", meaning: "ay yüzlü, güzel ve parlak yüzlü", origin: "Farsça / Arapça kullanım", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "light", traits: ["Parlak", "Zarif", "Klasik", "Romantik", "Dingin", "Estetik"] },
  { name: "Mehtap", meaning: "ay ışığı ve ayın geceye düşen parlaklığı", origin: "Farsça", popularity: 3.0, popularScore: 3, style: "CLASSIC", category: "light", traits: ["Aydınlık", "Romantik", "Klasik", "Sakin", "Parlak", "Dingin"] },
  { name: "Melahat", meaning: "güzellik, hoşluk ve zarif çekicilik", origin: "Arapça", popularity: 2.4, popularScore: 2, style: "CLASSIC", category: "grace", traits: ["Zarif", "Hoş", "Klasik", "Olgun", "Sıcak", "Estetik"] },
  { name: "Melda", meaning: "nazik, genç ve yumuşak tınılı modern ad", origin: "Modern Türkçe kullanım", popularity: 3.0, popularScore: 3, style: "MODERN", category: "modern", traits: ["Modern", "Yumuşak", "Sade", "Zarif", "Canlı", "Akılda kalıcı"] },
  { name: "Meleknaz", meaning: "melek zarafeti ve nazlı duruşu birleştiren ad", origin: "Arapça / Farsça kullanım", popularity: 2.7, popularScore: 2, style: "MODERN", category: "spiritual", traits: ["Zarif", "Manevi", "Nazlı", "Yumuşak", "Modern", "Duygulu"] },
  { name: "Meleksima", meaning: "melek yüzlü, masum ve aydınlık yüzlü", origin: "Arapça / Farsça kullanım", popularity: 2.3, popularScore: 2, style: "RARE", category: "spiritual", traits: ["Manevi", "Aydınlık", "Masum", "Zarif", "Nadir", "Duygulu"] },
  { name: "Melekşah", meaning: "melek gibi güzel ve şahane duruşlu", origin: "Arapça / Farsça kullanım", popularity: 2.2, popularScore: 2, style: "RARE", category: "spiritual", traits: ["Manevi", "Güçlü", "Zarif", "Tarihî", "Nadir", "Klasik"] },
  { name: "Melisa", meaning: "bal arısı ve hoş kokulu melisa bitkisi", origin: "Yunanca", popularity: 4.1, popularScore: 4, style: "POPULAR", category: "flower", traits: ["Çiçeksi", "Popüler", "Zarif", "Canlı", "Yumuşak", "Modern"] },
  { name: "Melisnur", meaning: "Melis tınısını nurun aydınlığıyla birleştiren ad", origin: "Yunanca / Arapça kullanım", popularity: 2.7, popularScore: 2, style: "MODERN", category: "light", traits: ["Aydınlık", "Modern", "Zarif", "Yumuşak", "Canlı", "Manevi"] },
  { name: "Melodi", meaning: "ezgi, uyumlu ses dizisi ve müzikal akış", origin: "Fransızca / Batı dilleri", popularity: 2.9, popularScore: 3, style: "MODERN", category: "modern", traits: ["Melodik", "Modern", "Canlı", "Yaratıcı", "Yumuşak", "Akıcı"] },
  { name: "Meltem", meaning: "yazın esen hafif ve ferah rüzgâr", origin: "Türkçe", popularity: 3.6, popularScore: 4, style: "POPULAR", category: "nature", traits: ["Ferah", "Doğal", "Sakin", "Yumuşak", "Klasik", "Canlı"] },
  { name: "Menekşenur", meaning: "menekşe çiçeğinin zarafetini nurla birleştiren ad", origin: "Türkçe / Arapça kullanım", popularity: 2.4, popularScore: 2, style: "RARE", category: "flower", traits: ["Çiçeksi", "Aydınlık", "Zarif", "Manevi", "Nadir", "Yumuşak"] },
  { name: "Menşure", meaning: "yayılmış, duyurulmuş ve bilinir olmuş", origin: "Arapça", popularity: 2.0, popularScore: 1, style: "RARE", category: "classic", traits: ["Köklü", "Klasik", "Nadir", "Olgun", "Sakin", "Güvenilir"] },
  { name: "Meral", meaning: "dişi geyik, zarif ve çevik hayvan", origin: "Moğolca / Türkçe kullanım", popularity: 3.0, popularScore: 3, style: "CLASSIC", category: "nature", traits: ["Zarif", "Doğal", "Çevik", "Klasik", "Sade", "Sakin"] },
  { name: "Mercan", meaning: "denizde oluşan değerli, kırmızımsı doğal taş", origin: "Arapça", popularity: 3.1, popularScore: 3, style: "MODERN", category: "nature", traits: ["Denizli", "Değerli", "Canlı", "Modern", "Renkli", "Güçlü"] },
  { name: "Meram", meaning: "istek, niyet ve anlatılmak istenen düşünce", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "RARE", category: "classic", traits: ["Anlamlı", "Sakin", "Köklü", "Nadir", "Düşünceli", "Sade"] },
  { name: "Meriç", meaning: "Balkanlardan geçen Meriç Nehri ile ilişkilenen ad", origin: "Türkçe / coğrafi ad", popularity: 2.8, popularScore: 2, style: "MODERN", category: "nature", traits: ["Akıcı", "Doğal", "Güçlü", "Modern", "Ferah", "Özgün"] },
  { name: "Merih", meaning: "Mars gezegeni ve göksel parlaklık çağrışımı", origin: "Arapça / gök bilimi", popularity: 2.7, popularScore: 2, style: "MODERN", category: "light", traits: ["Göksel", "Modern", "Parlak", "Güçlü", "Özgün", "Sade"] },
  { name: "Merisa", meaning: "modern kullanımda zarif, melodik ve yumuşak tınılı ad", origin: "Modern ad", popularity: 2.4, popularScore: 2, style: "RARE", category: "modern", traits: ["Modern", "Melodik", "Yumuşak", "Zarif", "Nadir", "Canlı"] },
  { name: "Mervenur", meaning: "Merve isminin maneviyatını nurun aydınlığıyla birleştiren ad", origin: "Arapça / Türkçe kullanım", popularity: 3.1, popularScore: 3, style: "POPULAR", category: "spiritual", traits: ["Manevi", "Aydınlık", "Popüler", "Zarif", "Güven veren", "Klasik"] },
  { name: "Meryemnur", meaning: "Meryem isminin manevi derinliğini nurla tamamlayan ad", origin: "İbranice / Arapça kullanım", popularity: 3.2, popularScore: 3, style: "POPULAR", category: "spiritual", traits: ["Manevi", "Aydınlık", "Zarif", "Klasik", "Güven veren", "Duygulu"] },
  { name: "Mesude", meaning: "mutlu, bahtiyar ve huzurlu kadın", origin: "Arapça", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Mutlu", "Klasik", "Huzurlu", "Olgun", "Sıcak", "Güvenilir"] },
  { name: "Meva", meaning: "sığınak, varılacak güzel yer ve cennet yurdu çağrışımı", origin: "Arapça", popularity: 3.6, popularScore: 4, style: "POPULAR", category: "spiritual", inQuran: true, quranReference: "Necm suresi 53:15'te 'cennetü'l-me'vâ' ifadesi geçer.", traits: ["Manevi", "Kısa", "Huzurlu", "Popüler", "Zarif", "Sakin"] },
  { name: "Meyra", meaning: "parlayan, değerli ve zarif tınılı modern ad", origin: "Modern kullanım", popularity: 3.0, popularScore: 3, style: "MODERN", category: "light", traits: ["Parlak", "Modern", "Zarif", "Yumuşak", "Canlı", "Akılda kalıcı"] },
  { name: "Mihra", meaning: "güneş, sevgi ve aydınlık çağrışımı taşıyan ad", origin: "Farsça", popularity: 3.4, popularScore: 3, style: "MODERN", category: "light", traits: ["Aydınlık", "Modern", "Sıcak", "Zarif", "Parlak", "Duygulu"] },
  { name: "Mihriban", meaning: "şefkatli, merhametli ve sevgi dolu", origin: "Farsça", popularity: 3.0, popularScore: 3, style: "CLASSIC", category: "virtue", traits: ["Şefkatli", "Merhametli", "Klasik", "Sıcak", "Duygulu", "Güven veren"] },
  { name: "Mihrimah", meaning: "güneş ve ay anlamlarını birlikte taşıyan tarihî ad", origin: "Farsça", popularity: 3.3, popularScore: 3, style: "CLASSIC", category: "light", traits: ["Aydınlık", "Tarihî", "Zarif", "Güçlü", "Klasik", "Parlak"] },
  { name: "Mihri", meaning: "güneşle, sevgiyle ve aydınlıkla ilgili", origin: "Farsça", popularity: 2.4, popularScore: 2, style: "CLASSIC", category: "light", traits: ["Aydınlık", "Klasik", "Sıcak", "Sade", "Duygulu", "Zarif"] },
  { name: "Mila", meaning: "sevgili, zarif ve hoş tınılı kısa ad", origin: "Slav dilleri / modern kullanım", popularity: 3.8, popularScore: 4, style: "POPULAR", category: "modern", traits: ["Kısa", "Modern", "Zarif", "Popüler", "Yumuşak", "Canlı"] },
  { name: "Mimoza", meaning: "sarı çiçekleriyle bilinen narin mimoza bitkisi", origin: "Latince / Türkçe kullanım", popularity: 2.7, popularScore: 2, style: "RARE", category: "flower", traits: ["Çiçeksi", "Narin", "Canlı", "Zarif", "Özgün", "Renkli"] },
  { name: "Mina", meaning: "ince, zarif ve değerli cam işi; ayrıca kutsal bölge adı", origin: "Farsça / Arapça yer adı", popularity: 4.0, popularScore: 4, style: "POPULAR", category: "grace", traits: ["Kısa", "Zarif", "Popüler", "Sade", "Yumuşak", "Modern"] },
  { name: "Mine", meaning: "emaye süsleme, ince işçilik ve parlak yüzey", origin: "Farsça", popularity: 3.2, popularScore: 3, style: "CLASSIC", category: "grace", traits: ["Zarif", "Kısa", "Klasik", "Parlak", "Sade", "Estetik"] },
  { name: "Minel", meaning: "cennet bahçesi ve ince güzellik çağrışımıyla kullanılan modern ad", origin: "Arapça / modern kullanım", popularity: 3.4, popularScore: 3, style: "MODERN", category: "spiritual", traits: ["Manevi", "Modern", "Zarif", "Yumuşak", "Popüler", "Duygulu"] },
  { name: "Miray", meaning: "ay gibi parlak ve seçkin kişi", origin: "Farsça / Türkçe kullanım", popularity: 4.1, popularScore: 4, style: "POPULAR", category: "light", traits: ["Aydınlık", "Popüler", "Zarif", "Modern", "Parlak", "Yumuşak"] },
  { name: "Miraynur", meaning: "Miray'ın ay ışığını nur anlamıyla güçlendiren ad", origin: "Farsça / Arapça kullanım", popularity: 3.0, popularScore: 3, style: "MODERN", category: "light", traits: ["Aydınlık", "Manevi", "Modern", "Zarif", "Parlak", "Güven veren"] },
  { name: "Miranur", meaning: "seçkinlik ve nur anlamlarını bir araya getiren ad", origin: "Farsça / Arapça kullanım", popularity: 3.1, popularScore: 3, style: "MODERN", category: "spiritual", traits: ["Manevi", "Aydınlık", "Modern", "Zarif", "Yumuşak", "Güven veren"] },
  { name: "Mirhan", meaning: "seçkin, değerli ve han soyluluğu çağrışımlı ad", origin: "Farsça / Türkçe kullanım", popularity: 2.7, popularScore: 2, style: "MODERN", category: "modern", traits: ["Güçlü", "Modern", "Değerli", "Özgün", "Sade", "Kararlı"] },
  { name: "Mirna", meaning: "sakin, yumuşak ve sevilen kişi çağrışımı", origin: "Slav dilleri / modern kullanım", popularity: 2.6, popularScore: 2, style: "MODERN", category: "grace", traits: ["Sakin", "Yumuşak", "Modern", "Zarif", "Kısa", "Özgün"] },
  { name: "Mislina", meaning: "güzel kokulu, narin ve hoş tınılı modern ad", origin: "Modern Türkçe kullanım", popularity: 3.0, popularScore: 3, style: "MODERN", category: "grace", traits: ["Zarif", "Modern", "Yumuşak", "Hoş", "Duygulu", "Akılda kalıcı"] },
  { name: "Muazzez", meaning: "aziz, değerli ve saygın kişi", origin: "Arapça", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Değerli", "Saygın", "Klasik", "Güçlü", "Olgun", "Güvenilir"] },
  { name: "Mukaddes", meaning: "kutsal, saygı duyulan ve yüce", origin: "Arapça", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Manevi", "Kutsal", "Klasik", "Saygın", "Güçlü", "Olgun"] },
  { name: "Munise", meaning: "cana yakın, alışılmış ve dostluk veren kişi", origin: "Arapça", popularity: 2.3, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Cana yakın", "Sıcak", "Klasik", "Nazik", "Güven veren", "Sakin"] },
  { name: "Mübeccel", meaning: "yüceltilmiş, saygıdeğer ve değerli kişi", origin: "Arapça", popularity: 2.1, popularScore: 1, style: "RARE", category: "virtue", traits: ["Saygın", "Köklü", "Klasik", "Olgun", "Nadir", "Güçlü"] },
  { name: "Müesser", meaning: "etkili, iz bırakan ve güçlü tesir sahibi", origin: "Arapça", popularity: 2.0, popularScore: 1, style: "RARE", category: "classic", traits: ["Etkili", "Köklü", "Güçlü", "Klasik", "Nadir", "Olgun"] },
  { name: "Müfide", meaning: "faydalı, yararlı ve iyilik sağlayan", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Faydalı", "İyiliksever", "Klasik", "Olgun", "Güvenilir", "Sıcak"] },
  { name: "Müjde", meaning: "sevindirici haber ve umut veren söz", origin: "Farsça", popularity: 3.0, popularScore: 3, style: "CLASSIC", category: "virtue", traits: ["Umutlu", "Sevinçli", "Klasik", "Sıcak", "Canlı", "Güven veren"] },
  { name: "Münevver", meaning: "aydınlanmış, bilgili ve ışık saçan", origin: "Arapça", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "light", traits: ["Aydınlık", "Bilgili", "Klasik", "Olgun", "Parlak", "Güven veren"] },
  { name: "Münire", meaning: "aydınlatan, ışık veren ve parlak", origin: "Arapça", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "light", traits: ["Aydınlık", "Parlak", "Klasik", "Zarif", "Sakin", "Güven veren"] },
  { name: "Münteha", meaning: "son nokta, varılabilecek en yüce sınır", origin: "Arapça", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "spiritual", inQuran: true, quranReference: "Necm suresi 53:14'te 'Sidretü'l-Müntehâ' ifadesinde geçer.", traits: ["Manevi", "Yüce", "Derin", "Klasik", "Güçlü", "Sakin"] },
  { name: "Mürşide", meaning: "doğru yolu gösteren, rehberlik eden kadın", origin: "Arapça", popularity: 2.1, popularScore: 1, style: "RARE", category: "spiritual", traits: ["Rehber", "Manevi", "Klasik", "Bilge", "Nadir", "Güvenilir"] },
  { name: "Müşerref", meaning: "şereflendirilmiş, onurlu ve saygın", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Onurlu", "Saygın", "Klasik", "Olgun", "Güçlü", "Güvenilir"] },
  { name: "Müslime", meaning: "teslim olan, İslam'a bağlı kadın", origin: "Arapça", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Manevi", "Köklü", "Klasik", "Sakin", "Güven veren", "İnançlı"] },
  { name: "Müyesser", meaning: "kolaylaştırılmış, nasip olmuş ve erişilebilir", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Kolaylık", "Nasipli", "Klasik", "Sakin", "Olgun", "Güvenilir"] },
  { name: "Müzeyyen", meaning: "süslenmiş, bezeli ve zarif biçimde güzelleştirilmiş", origin: "Arapça", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "grace", traits: ["Zarif", "Süslü", "Klasik", "Estetik", "Olgun", "Duygulu"] },
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

function meaningText(input: KlmGirlNameInput, index: number) {
  const variants = [
    `${input.name}, ${input.meaning} anlamıyla kullanılan ${input.origin} kökenli bir kız ismidir. İsmin çağrışımı hem günlük hayatta anlaşılır hem de ailelerin isim seçerken aradığı olumlu duyguyu taşır. Söylenişindeki denge, ${input.style === "RARE" ? "nadir" : "tanıdık"} bir ad olmasına rağmen kulağa sıcak gelmesini sağlar.`,
    `${input.name} ismi, temel olarak ${input.meaning} fikrini öne çıkarır. ${input.origin} kaynaklı bu ad, kız bebek isimleri arasında anlamı açık ve karakteri belirgin seçeneklerden biridir. Taşıdığı duygu, sade bir zarafetle birlikte güçlü bir kimlik hissi verir.`,
    `${input.name}, ${input.meaning} anlam alanıyla bilinen gerçek ve kullanılan bir kız adıdır. Kökeni ${input.origin} çizgisine dayanır ve Türkçedeki kullanımı yumuşak bir tını kazanmıştır. Anlamındaki olumlu vurgu, ismi hem klasik hem de modern listelerde değerlendirilebilir kılar.`,
    `${input.name} adı, ${input.meaning} çağrışımıyla ailelerin sevdiği anlamlı seçenekler arasında yer alır. ${input.origin} kökenli yapısı, isme kültürel bir derinlik ve yerleşik bir karakter verir. Özellikle anlamı güzel kız isimleri arayanlar için doğal ve akılda kalıcı bir tercihtir.`,
  ];
  return variants[index % variants.length];
}

function introText(input: KlmGirlNameInput, index: number) {
  const variants = [
    `${input.name} ismi, yenidoğan kız bebek isimleri içinde ${input.style === "POPULAR" ? "sevilen ve güncel" : input.style === "RARE" ? "farklı ama anlaşılır" : input.style === "CLASSIC" ? "kökleri güçlü ve tanıdık" : "modern ve temiz tınılı"} bir seçenek arayan ailelere hitap eder. ${input.meaning} anlamı, ismin sayfada yalnızca kulağa hoş gelen bir ad olarak değil, hikâyesi olan bir tercih olarak öne çıkmasını sağlar.`,
    `${input.name}, kız isimleri listesinde anlamıyla dikkat çeken ve telaffuzu rahat ilerleyen adlardan biridir. ${input.origin} kökenli olması, isme hem kültürel bir arka plan hem de güçlü bir çağrışım kazandırır; bu yüzden kardeş isimleriyle eşleştirilirken de dengeli sonuçlar verir.`,
    `${input.name} adını düşünen aileler için ismin en güçlü tarafı, ${input.meaning} anlamını doğal bir söyleyişle taşımasıdır. Ne çok ağır ne de geçici duran bu tını, özellikle anlamı güzel ve karakterli kız bebek isimleri arayanlar için öne çıkar.`,
    `${input.name}, kısa listesine zarif ama boş olmayan bir isim eklemek isteyen aileler için değerlendirilebilir. İsmin ${input.category === "spiritual" ? "manevi" : input.category === "nature" ? "doğal" : input.category === "light" ? "aydınlık" : "sıcak"} çağrışımı, hem tek başına hem de kardeş isimleriyle birlikte uyumlu bir isim profili oluşturur.`,
  ];
  return variants[index % variants.length];
}

function scoreSimilarity(a: KlmGirlNameInput, b: KlmGirlNameInput) {
  let score = 0;
  if (a.category === b.category) score += 5;
  if (a.style === b.style) score += 3;
  if (isShortName(a.name) === isShortName(b.name)) score += 2;
  score += Math.max(0, 3 - Math.abs(a.popularity - b.popularity));
  if (a.name[0]?.toLocaleUpperCase("tr-TR") === b.name[0]?.toLocaleUpperCase("tr-TR")) score += 1;
  return score;
}

function similarNamesFor(input: KlmGirlNameInput) {
  return KLM_GIRL_NAME_INPUTS.filter((candidate) => candidate.name !== input.name)
    .map((candidate) => ({ candidate, score: scoreSimilarity(input, candidate) }))
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name, "tr-TR"))
    .slice(0, 10)
    .map(({ candidate }) => candidate.name);
}

export const KLM_GIRL_NAME_SEED: BabyNameSeed[] = KLM_GIRL_NAME_INPUTS.map((input, index) => ({
  id: `klm-girl-${index + 1}`,
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
