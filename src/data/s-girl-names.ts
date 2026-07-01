import type { BabyNameSeed } from "@/types/baby-name-seed";
import type { NameStyle } from "@/types/database";

type SGirlNameInput = {
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
    | "color";
  inQuran?: boolean;
  quranReference?: string | null;
};

const S_GIRL_NAME_INPUTS: SGirlNameInput[] = [
  { name: "Saba", meaning: "sabah vakti esen hafif ve ferah rüzgar", origin: "Arapça", popularity: 2.7, popularScore: 2, style: "RARE", category: "nature", traits: ["Ferah", "Zarif", "Sakin", "Doğal", "Nadir", "Yumuşak"] },
  { name: "Sabah", meaning: "günün ilk aydınlığı, tan vakti ve yeni başlangıç", origin: "Arapça", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "light", traits: ["Aydınlık", "Köklü", "Umutlu", "Sakin", "Klasik", "Anlamı güçlü"] },
  { name: "Sabahat", meaning: "yüz güzelliği, parlaklık ve hoş görünüş", origin: "Arapça", popularity: 2.3, popularScore: 2, style: "CLASSIC", category: "grace", traits: ["Zarif", "Klasik", "Güzel", "Olgun", "Asil", "Sakin"] },
  { name: "Sabire", meaning: "sabırlı, dayanıklı ve metanetli kadın", origin: "Arapça", popularity: 2.1, popularScore: 1, style: "RARE", category: "virtue", traits: ["Sabırlı", "Güçlü", "Köklü", "Sakin", "Kararlı", "Güvenilir"] },
  { name: "Sabrin", meaning: "sabır kökünden gelen, dayanıklılık ve sebat çağrışımlı ad", origin: "Arapça / modern kullanım", popularity: 2.4, popularScore: 2, style: "MODERN", category: "virtue", traits: ["Sabırlı", "Modern", "Yumuşak", "Kararlı", "Anlamı güçlü", "Zarif"] },
  { name: "Sade", meaning: "yalın, süssüz, doğal ve gösterişten uzak", origin: "Türkçe", popularity: 2.3, popularScore: 2, style: "RARE", category: "modern", traits: ["Sade", "Doğal", "Modern", "Sakin", "Özgün", "Net"] },
  { name: "Sadenur", meaning: "sadelik ve nur aydınlığını birleştiren ad", origin: "Türkçe / Arapça kullanım", popularity: 2.8, popularScore: 2, style: "MODERN", category: "spiritual", traits: ["Aydınlık", "Sade", "Manevi", "Zarif", "Modern", "Güven veren"] },
  { name: "Sadem", meaning: "yalınlık duygusunu sevgiyle kişiselleştiren modern ad", origin: "Türkçe / modern kullanım", popularity: 2.4, popularScore: 2, style: "RARE", category: "modern", traits: ["Sade", "Sıcak", "Modern", "Kısa", "Özgün", "Yumuşak"] },
  { name: "Safanur", meaning: "saflık, iç temizliği ve nur aydınlığını taşıyan ad", origin: "Arapça / Türkçe kullanım", popularity: 2.9, popularScore: 3, style: "MODERN", category: "spiritual", traits: ["Aydınlık", "Manevi", "Temiz", "Zarif", "Modern", "Duyarlı"] },
  { name: "Safinaz", meaning: "saf, temiz ve nazlı güzellik çağrışımlı ad", origin: "Arapça / Farsça kullanım", popularity: 2.1, popularScore: 1, style: "RARE", category: "grace", traits: ["Zarif", "Nazlı", "Temiz", "Klasik", "Nadir", "Yumuşak"] },
  { name: "Sahra", meaning: "geniş çöl, açık ve engin alan", origin: "Arapça", popularity: 3.3, popularScore: 3, style: "MODERN", category: "nature", traits: ["Geniş", "Modern", "Güçlü", "Sade", "Doğal", "Akılda kalıcı"] },
  { name: "Saime", meaning: "oruç tutan veya ibadet yönü güçlü kadın", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Manevi", "Klasik", "Sakin", "Köklü", "İnançlı", "Güven veren"] },
  { name: "Sakine", meaning: "huzurlu, sakin ve dingin kimse", origin: "Arapça", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Sakin", "Huzurlu", "Klasik", "Güvenilir", "Dengeli", "Olgun"] },
  { name: "Saliha Nur", meaning: "iyi, erdemli ve nur aydınlığıyla tamamlanan birleşik ad", origin: "Arapça / Türkçe kullanım", pronunciation: "Sa-li-ha Nur", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Manevi", "Erdemli", "Aydınlık", "Klasik", "Güven veren", "Anlamı güçlü"] },
  { name: "Salime", meaning: "sağlam, esenlik içinde ve güvenli olan kadın", origin: "Arapça", popularity: 2.1, popularScore: 1, style: "RARE", category: "virtue", traits: ["Güvenli", "Köklü", "Sakin", "Dengeli", "Nadir", "Olgun"] },
  { name: "Salsabil", meaning: "Kur'an'da cennet içeceği kaynağı olarak anılan hoş akışlı pınar", origin: "Arapça", popularity: 2.8, popularScore: 2, style: "MODERN", category: "spiritual", inQuran: true, quranReference: "İnsan suresi 76:18'de 'Selsebil/Salsabil' adıyla cennetteki bir kaynak olarak geçer.", traits: ["Manevi", "Akıcı", "Ferah", "Aydınlık", "Zarif", "Anlamı güçlü"] },
  { name: "Sanem", meaning: "güzel, sevilen ve zarif yüzlü kişi çağrışımı", origin: "Farsça", popularity: 3.6, popularScore: 4, style: "POPULAR", category: "grace", traits: ["Zarif", "Popüler", "Romantik", "Yumuşak", "Estetik", "Akılda kalıcı"] },
  { name: "Sanemnur", meaning: "Sanem isminin zarafetini nur aydınlığıyla birleştiren ad", origin: "Farsça / Arapça kullanım", pronunciation: "Sa-nem-nur", popularity: 2.5, popularScore: 2, style: "MODERN", category: "spiritual", traits: ["Zarif", "Aydınlık", "Manevi", "Modern", "Yumuşak", "Duygulu"] },
  { name: "Saniye", meaning: "ikinci, ayrıca değerli ve seçkin anlam alanıyla kullanılan ad", origin: "Arapça", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "classic", traits: ["Klasik", "Köklü", "Sakin", "Olgun", "Güvenilir", "Asil"] },
  { name: "Sara", meaning: "prenses, asil kadın ve saf sevinç çağrışımlı ad", origin: "İbranice / Arapça kullanım", popularity: 3.8, popularScore: 4, style: "POPULAR", category: "grace", traits: ["Asil", "Kısa", "Zarif", "Popüler", "Sade", "Güçlü"] },
  { name: "Sare", meaning: "temiz, seçkin ve zarif kadın adı olarak kullanılan köklü ad", origin: "İbranice / Arapça kullanım", popularity: 4.0, popularScore: 4, style: "POPULAR", category: "grace", traits: ["Zarif", "Popüler", "Kısa", "Asil", "Sade", "Güven veren"] },
  { name: "Sarenur", meaning: "Sare adının zarif havasını nur aydınlığıyla tamamlayan ad", origin: "İbranice / Arapça kullanım", pronunciation: "Sa-re-nur", popularity: 3.2, popularScore: 3, style: "POPULAR", category: "spiritual", traits: ["Aydınlık", "Zarif", "Manevi", "Popüler", "Yumuşak", "Güven veren"] },
  { name: "Sarya", meaning: "gece yolculuğu, akış ve zarif hareket çağrışımı taşıyan ad", origin: "Arapça / modern kullanım", popularity: 2.6, popularScore: 2, style: "MODERN", category: "modern", traits: ["Modern", "Zarif", "Akıcı", "Özgün", "Yumuşak", "Duygulu"] },
  { name: "Saye", meaning: "gölge, koruyucu serinlik ve himaye çağrışımı", origin: "Farsça", popularity: 2.4, popularScore: 2, style: "RARE", category: "grace", traits: ["Sakin", "Koruyucu", "Zarif", "Nadir", "Yumuşak", "Şiirsel"] },
  { name: "Sebahat", meaning: "güzellik, yüz aydınlığı ve hoş görünüş", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "CLASSIC", category: "grace", traits: ["Güzel", "Klasik", "Zarif", "Olgun", "Sakin", "Asil"] },
  { name: "Sebile", meaning: "yol, hayır için sunulan su ve iyilik çağrışımı", origin: "Arapça", popularity: 2.1, popularScore: 1, style: "RARE", category: "spiritual", traits: ["İyiliksever", "Manevi", "Köklü", "Sakin", "Nadir", "Duyarlı"] },
  { name: "Sebla", meaning: "uzun kirpikli, etkileyici ve güzel gözlü", origin: "Arapça", popularity: 2.4, popularScore: 2, style: "RARE", category: "grace", traits: ["Zarif", "Estetik", "Nadir", "Yumuşak", "Asil", "Duygulu"] },
  { name: "Seden", meaning: "uyanık, dikkatli ve sezgisi güçlü kişi çağrışımı", origin: "Türkçe / modern kullanım", popularity: 2.8, popularScore: 2, style: "MODERN", category: "modern", traits: ["Dikkatli", "Modern", "Sade", "Sezgisel", "Kararlı", "Akılda kalıcı"] },
  { name: "Sedin", meaning: "yumuşak tınılı, seçkin ve sakin duruşlu modern ad", origin: "Modern Türkçe kullanım", popularity: 2.3, popularScore: 2, style: "RARE", category: "modern", traits: ["Modern", "Yumuşak", "Nadir", "Sade", "Zarif", "Özgün"] },
  { name: "Seher", meaning: "tan ağarmadan önceki vakit, sabahın ilk aydınlığı", origin: "Arapça", popularity: 3.4, popularScore: 3, style: "CLASSIC", category: "light", traits: ["Aydınlık", "Klasik", "Sakin", "Umutlu", "Zarif", "Köklü"] },
  { name: "Selcan", meaning: "coşkun, canlı ve gönle yakın kişi çağrışımlı ad", origin: "Türkçe / Farsça kullanım", popularity: 2.9, popularScore: 3, style: "CLASSIC", category: "love", traits: ["Canlı", "Sıcak", "Klasik", "Duygulu", "Güçlü", "İçten"] },
  { name: "Selda", meaning: "ses, yankı ve melodik etki çağrışımıyla kullanılan ad", origin: "Türkçe / modern kullanım", popularity: 3.0, popularScore: 3, style: "CLASSIC", category: "sound", traits: ["Melodik", "Klasik", "Sade", "Güçlü", "Duygulu", "Akılda kalıcı"] },
  { name: "Selena", meaning: "ay ve ay ışığıyla ilişkilendirilen parlak ad", origin: "Yunanca / modern kullanım", popularity: 3.0, popularScore: 3, style: "MODERN", category: "light", traits: ["Aydınlık", "Modern", "Zarif", "Parlak", "Yumuşak", "Akılda kalıcı"] },
  { name: "Selenay", meaning: "Selen'in ay ışığı çağrışımını ay imgesiyle güçlendiren ad", origin: "Yunanca / Türkçe kullanım", popularity: 2.9, popularScore: 3, style: "MODERN", category: "light", traits: ["Aydınlık", "Modern", "Zarif", "Parlak", "Duygulu", "Özgün"] },
  { name: "Selma", meaning: "esenlik, barış ve güvenlik anlamlarıyla kullanılan ad", origin: "Arapça", popularity: 3.1, popularScore: 3, style: "CLASSIC", category: "virtue", traits: ["Huzurlu", "Klasik", "Güven veren", "Sakin", "Dengeli", "Köklü"] },
  { name: "Selva", meaning: "teselli, ferahlık ve gönül rahatlığı çağrışımı", origin: "Arapça", popularity: 2.9, popularScore: 3, style: "MODERN", category: "virtue", traits: ["Ferah", "Modern", "Sakin", "Zarif", "Huzurlu", "Yumuşak"] },
  { name: "Selvi", meaning: "ince, uzun ve zarif servi ağacı", origin: "Farsça / Türkçe kullanım", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "nature", traits: ["Zarif", "Doğal", "Klasik", "Sade", "Sakin", "Estetik"] },
  { name: "Sema", meaning: "gök, gökyüzü ve yüksek alem", origin: "Arapça", popularity: 3.4, popularScore: 3, style: "CLASSIC", category: "light", traits: ["Göksel", "Klasik", "Aydınlık", "Sade", "Zarif", "Geniş"] },
  { name: "Semanur", meaning: "gökyüzü anlamını nurun aydınlığıyla birleştiren ad", origin: "Arapça / Türkçe kullanım", pronunciation: "Se-ma-nur", popularity: 3.4, popularScore: 3, style: "POPULAR", category: "spiritual", traits: ["Aydınlık", "Manevi", "Zarif", "Popüler", "Göksel", "Güven veren"] },
  { name: "Semra", meaning: "esmer güzelliği ve sıcak görünüş çağrışımı", origin: "Arapça", popularity: 3.0, popularScore: 3, style: "CLASSIC", category: "color", traits: ["Sıcak", "Klasik", "Zarif", "Sade", "Olgun", "Güvenilir"] },
  { name: "Sena", meaning: "övgü, yücelik ve güzel sözle anılma", origin: "Arapça", popularity: 4.1, popularScore: 4, style: "POPULAR", category: "spiritual", traits: ["Manevi", "Popüler", "Zarif", "Aydınlık", "Anlamı güçlü", "Sade"] },
  { name: "Senanur", meaning: "övgü anlamındaki Sena ile nur aydınlığını birleştiren ad", origin: "Arapça / Türkçe kullanım", pronunciation: "Se-na-nur", popularity: 3.5, popularScore: 4, style: "POPULAR", category: "spiritual", traits: ["Manevi", "Aydınlık", "Popüler", "Zarif", "Güven veren", "Anlamı güçlü"] },
  { name: "Senem", meaning: "sevgili, güzel ve gönülde yer eden kişi", origin: "Farsça", popularity: 3.3, popularScore: 3, style: "CLASSIC", category: "love", traits: ["Sevgi dolu", "Zarif", "Klasik", "Duygulu", "Yumuşak", "Akılda kalıcı"] },
  { name: "Sennur", meaning: "sen ve nur kelimelerinin sıcak, aydınlık çağrışımıyla kullanılan ad", origin: "Türkçe / Arapça kullanım", pronunciation: "Sen-nur", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Aydınlık", "Manevi", "Sıcak", "Klasik", "Güven veren", "Zarif"] },
  { name: "Seray", meaning: "baş köşk, güzel saray ve ay çağrışımlı zarif ad", origin: "Farsça / Türkçe kullanım", popularity: 3.1, popularScore: 3, style: "MODERN", category: "grace", traits: ["Zarif", "Modern", "Asil", "Parlak", "Yumuşak", "Akılda kalıcı"] },
  { name: "Seren", meaning: "temiz, açık ve zarif tınılı modern ad", origin: "Türkçe / modern kullanım", popularity: 3.0, popularScore: 3, style: "MODERN", category: "modern", traits: ["Modern", "Sade", "Zarif", "Akılda kalıcı", "Yumuşak", "Özgün"] },
  { name: "Serenay", meaning: "Seren'in temiz tınısını ay ışığıyla birleştiren ad", origin: "Türkçe / modern kullanım", popularity: 3.6, popularScore: 4, style: "POPULAR", category: "light", traits: ["Aydınlık", "Modern", "Popüler", "Zarif", "Parlak", "Akılda kalıcı"] },
  { name: "Sermin", meaning: "sevimli, güzel ve hoş görünüşlü kişi", origin: "Farsça", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "grace", traits: ["Zarif", "Klasik", "Sevimli", "Sıcak", "Yumuşak", "Olgun"] },
  { name: "Sernur", meaning: "başta gelen aydınlık veya güçlü nur çağrışımı", origin: "Farsça / Arapça kullanım", popularity: 2.3, popularScore: 2, style: "RARE", category: "spiritual", traits: ["Aydınlık", "Manevi", "Nadir", "Zarif", "Güçlü", "Sakin"] },
  { name: "Servet", meaning: "zenginlik, değer ve bolluk", origin: "Arapça", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Bereketli", "Klasik", "Güçlü", "Değerli", "Köklü", "Güvenilir"] },
  { name: "Setenay", meaning: "Çerkes kültüründe bilinen, zarafet ve soyluluk çağrışımlı ad", origin: "Çerkesçe", popularity: 2.8, popularScore: 2, style: "MODERN", category: "grace", traits: ["Asil", "Zarif", "Özgün", "Modern", "Güçlü", "Kültürel"] },
  { name: "Seval", meaning: "sevgiye değer, sevilen ve gönle yakın kişi", origin: "Türkçe", popularity: 2.9, popularScore: 3, style: "CLASSIC", category: "love", traits: ["Sevgi dolu", "Klasik", "Sıcak", "İçten", "Duygulu", "Güven veren"] },
  { name: "Sevanur", meaning: "sevgi sıcaklığını nur aydınlığıyla birleştiren ad", origin: "Türkçe / Arapça kullanım", pronunciation: "Se-va-nur", popularity: 3.0, popularScore: 3, style: "MODERN", category: "spiritual", traits: ["Sevgi dolu", "Aydınlık", "Manevi", "Modern", "Zarif", "Sıcak"] },
  { name: "Sevay", meaning: "sevgi ve ay ışığı çağrışımlarını birleştiren ad", origin: "Türkçe / modern kullanım", popularity: 2.2, popularScore: 2, style: "RARE", category: "love", traits: ["Sevgi dolu", "Aydınlık", "Nadir", "Zarif", "Romantik", "Yumuşak"] },
  { name: "Sevde", meaning: "sevgi, tutku ve gönülde derin yer etme çağrışımı", origin: "Arapça", popularity: 3.3, popularScore: 3, style: "POPULAR", category: "love", traits: ["Sevgi dolu", "Duygulu", "Popüler", "Zarif", "Manevi", "Sıcak"] },
  { name: "Sevdenur", meaning: "Sevde'nin sevgi çağrışımını nur aydınlığıyla tamamlayan ad", origin: "Arapça / Türkçe kullanım", pronunciation: "Sev-de-nur", popularity: 3.1, popularScore: 3, style: "POPULAR", category: "spiritual", traits: ["Sevgi dolu", "Aydınlık", "Manevi", "Popüler", "Zarif", "Duygulu"] },
  { name: "Sevim", meaning: "sevimli, sevilen ve sıcaklık veren kişi", origin: "Türkçe", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "love", traits: ["Sevimli", "Sıcak", "Klasik", "İçten", "Duygulu", "Güven veren"] },
  { name: "Seyhan", meaning: "Türkiye'deki Seyhan Nehri ile ilişkilenen coğrafi ad", origin: "Türkçe / coğrafi ad", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "water", traits: ["Akıcı", "Doğal", "Klasik", "Güçlü", "Ferah", "Köklü"] },
  { name: "Seylan", meaning: "ada, uzak diyar ve zarif coğrafi çağrışımlı ad", origin: "Coğrafi ad / Türkçe kullanım", popularity: 2.4, popularScore: 2, style: "RARE", category: "modern", traits: ["Özgün", "Zarif", "Nadir", "Modern", "Sakin", "Akılda kalıcı"] },
  { name: "Seyran", meaning: "gezinti, dolaşma ve hoşça bakıp izleme", origin: "Farsça", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "classic", traits: ["Özgür", "Klasik", "Duygulu", "Sakin", "Köklü", "Zarif"] },
  { name: "Seza", meaning: "yaraşır, uygun ve değer verilen kişi çağrışımı", origin: "Farsça", popularity: 2.3, popularScore: 2, style: "RARE", category: "virtue", traits: ["Değerli", "Nadir", "Sade", "Zarif", "Dengeli", "Asil"] },
  { name: "Sezen", meaning: "hisseden, anlayan ve sezgisi güçlü kişi", origin: "Türkçe", popularity: 3.2, popularScore: 3, style: "MODERN", category: "virtue", traits: ["Sezgisel", "Duyarlı", "Modern", "Güçlü", "Sanatsal", "Kararlı"] },
  { name: "Sıdıka", meaning: "çok doğru sözlü, sadık ve dürüst kadın", origin: "Arapça", popularity: 2.3, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Dürüst", "Sadık", "Klasik", "Manevi", "Güvenilir", "Köklü"] },
  { name: "Sıla", meaning: "özlem, kavuşma ve memleket bağı", origin: "Arapça kökenli Türkçe kullanım", popularity: 4.1, popularScore: 4, style: "POPULAR", category: "love", traits: ["Duygulu", "Popüler", "Kısa", "Sıcak", "Anlamı güçlü", "Akılda kalıcı"] },
  { name: "Sılanur", meaning: "Sıla'nın özlem ve kavuşma duygusunu nurla tamamlayan ad", origin: "Arapça / Türkçe kullanım", pronunciation: "Sı-la-nur", popularity: 3.2, popularScore: 3, style: "POPULAR", category: "spiritual", traits: ["Duygulu", "Aydınlık", "Manevi", "Popüler", "Sıcak", "Zarif"] },
  { name: "Sima", meaning: "yüz, çehre ve dış görünüşte zarif ifade", origin: "Farsça", popularity: 2.9, popularScore: 3, style: "CLASSIC", category: "grace", traits: ["Zarif", "Kısa", "Klasik", "Estetik", "Sade", "Asil"] },
  { name: "Simay", meaning: "ay yüzlü, ay gibi parlak ve güzel çehreli", origin: "Farsça / Türkçe kullanım", popularity: 3.5, popularScore: 4, style: "POPULAR", category: "light", traits: ["Aydınlık", "Zarif", "Popüler", "Parlak", "Yumuşak", "Akılda kalıcı"] },
  { name: "Sirena", meaning: "melodik ve masalsı tınısıyla kullanılan modern ad", origin: "Yunanca / modern kullanım", popularity: 2.3, popularScore: 2, style: "RARE", category: "sound", traits: ["Melodik", "Masalsı", "Modern", "Nadir", "Zarif", "Özgün"] },
  { name: "Siyam", meaning: "oruç, ibadet ve manevi disiplin anlam alanı", origin: "Arapça", popularity: 2.2, popularScore: 2, style: "RARE", category: "spiritual", traits: ["Manevi", "Sakin", "Nadir", "Disiplinli", "Anlamı güçlü", "Köklü"] },
  { name: "Solin", meaning: "güneş, ışık ve sıcaklık çağrışımıyla kullanılan modern ad", origin: "Kürtçe / modern kullanım", popularity: 3.3, popularScore: 3, style: "MODERN", category: "light", traits: ["Aydınlık", "Modern", "Sıcak", "Zarif", "Özgün", "Akılda kalıcı"] },
  { name: "Sonay", meaning: "son ay, ay ışığı ve tamamlanma çağrışımı", origin: "Türkçe", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "light", traits: ["Aydınlık", "Klasik", "Sade", "Duygulu", "Parlak", "Sakin"] },
  { name: "Sudenaz", meaning: "su berraklığı ile nazlı zarafeti birleştiren ad", origin: "Türkçe / Farsça kullanım", pronunciation: "Su-de-naz", popularity: 3.8, popularScore: 4, style: "POPULAR", category: "water", traits: ["Ferah", "Nazlı", "Popüler", "Zarif", "Modern", "Yumuşak"] },
  { name: "Sudenur", meaning: "su ferahlığını nur aydınlığıyla tamamlayan ad", origin: "Türkçe / Arapça kullanım", pronunciation: "Su-de-nur", popularity: 3.7, popularScore: 4, style: "POPULAR", category: "spiritual", traits: ["Ferah", "Aydınlık", "Manevi", "Popüler", "Zarif", "Sakin"] },
  { name: "Sude", meaning: "sürülmüş, dokunmuş veya su berraklığıyla çağrışan zarif ad", origin: "Farsça / Türkçe kullanım", popularity: 4.0, popularScore: 4, style: "POPULAR", category: "water", traits: ["Zarif", "Popüler", "Kısa", "Ferah", "Yumuşak", "Akılda kalıcı"] },
  { name: "Sueda", meaning: "sevgi, kalbin içi ve derin gönül bağı çağrışımı", origin: "Arapça", popularity: 2.9, popularScore: 3, style: "MODERN", category: "love", traits: ["Duygulu", "Sevgi dolu", "Modern", "Zarif", "Sıcak", "Anlamı güçlü"] },
  { name: "Suhendan", meaning: "söz söyleyen, hoş anlatımlı ve konuşması güzel kişi", origin: "Farsça", popularity: 2.1, popularScore: 1, style: "RARE", category: "sound", traits: ["Sanatsal", "Klasik", "Nadir", "Zarif", "Duygulu", "Edebi"] },
  { name: "Sultanay", meaning: "sultan zarafeti ile ay ışığını birleştiren ad", origin: "Arapça / Türkçe kullanım", popularity: 2.4, popularScore: 2, style: "RARE", category: "light", traits: ["Asil", "Aydınlık", "Nadir", "Klasik", "Güçlü", "Zarif"] },
  { name: "Sultanur", meaning: "sultan asaletini nur aydınlığıyla tamamlayan ad", origin: "Arapça / Türkçe kullanım", pronunciation: "Sul-ta-nur", popularity: 2.8, popularScore: 2, style: "MODERN", category: "spiritual", traits: ["Asil", "Aydınlık", "Manevi", "Zarif", "Güçlü", "Güven veren"] },
  { name: "Suna", meaning: "zarif, süslü ve güzel görünüşlü kadın", origin: "Türkçe", popularity: 2.9, popularScore: 3, style: "CLASSIC", category: "grace", traits: ["Zarif", "Klasik", "Sade", "Estetik", "Sıcak", "Kısa"] },
  { name: "Suzan", meaning: "zambak çiçeği ve zarif çiçek güzelliği", origin: "İbranice / Farsça kullanım", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "flower", traits: ["Çiçeksi", "Zarif", "Klasik", "Yumuşak", "Sıcak", "Estetik"] },
  { name: "Süheyla", meaning: "Süheyl yıldızıyla ilişkilendirilen parlak ve zarif ad", origin: "Arapça", pronunciation: "Sü-hey-la", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "light", traits: ["Parlak", "Klasik", "Zarif", "Göksel", "Sakin", "Asil"] },
  { name: "Sümeyye", meaning: "yüksek, seçkin ve İslam tarihinde bilinen köklü kadın adı", origin: "Arapça", pronunciation: "Sü-mey-ye", popularity: 4.0, popularScore: 4, style: "POPULAR", category: "spiritual", traits: ["Manevi", "Popüler", "Köklü", "Güçlü", "Zarif", "Anlamı güçlü"] },
  { name: "Sündüs", meaning: "ince ipek, cennet giysisi ve değerli kumaş", origin: "Arapça", popularity: 3.0, popularScore: 3, style: "MODERN", category: "spiritual", inQuran: true, quranReference: "Kehf 18:31, Duhan 44:53 ve İnsan 76:21 gibi ayetlerde ince ipek anlamıyla geçer.", traits: ["Manevi", "Zarif", "Değerli", "Modern", "Yumuşak", "Anlamı güçlü"] },
  { name: "Süreyya", meaning: "Ülker yıldızı, parlak yıldız kümesi ve göksel güzellik", origin: "Arapça", pronunciation: "Sü-rey-ya", popularity: 3.0, popularScore: 3, style: "CLASSIC", category: "light", traits: ["Göksel", "Parlak", "Klasik", "Zarif", "Asil", "Güçlü"] },
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
  if (style === "POPULAR") return "sevilen, tanıdık ve güncel";
  if (style === "RARE") return "nadir ama anlamı anlaşılır";
  if (style === "CLASSIC") return "kökleri güçlü ve zamana dayanıklı";
  return "modern, temiz tınılı ve akılda kalıcı";
}

function categoryFeeling(category: SGirlNameInput["category"]) {
  const feelings: Record<SGirlNameInput["category"], string> = {
    nature: "doğal ve ferah",
    light: "aydınlık ve umut veren",
    classic: "kültürel hafızası güçlü",
    modern: "çağdaş ve sade",
    virtue: "erdemli ve karakterli",
    spiritual: "manevi ve huzurlu",
    flower: "çiçeksi ve zarif",
    grace: "zarif ve yumuşak",
    sound: "melodik ve sanatsal",
    water: "akıcı ve ferah",
    love: "sıcak ve duygulu",
    color: "renkli ve estetik",
  };
  return feelings[category];
}

function meaningText(input: SGirlNameInput, index: number) {
  const variants = [
    `${input.name}, sözlüklerde ve yerleşik kullanımlarda ${input.meaning} anlam alanıyla açıklanan gerçek bir kız ismidir. ${input.origin} kökenli bu ad, Türkiye'de kullanılan isimler içinde karşılığı bilinen ve telaffuzu doğal ilerleyen seçenekler arasında yer alır. İsmin çağrışımı yalnızca kısa bir kelime anlamından ibaret değildir; ${categoryFeeling(input.category)} bir duygu da taşır. Bu yönüyle anlamı güzel kız isimleri arayan aileler için sade, güvenilir ve karakterli bir alternatif oluşturur.`,
    `${input.name} isminde ${input.meaning} vurgusu öne çıkar. Kökeni ${input.origin} olarak gösterilen bu ad, kız bebek isimleri içinde hem ses değeri hem de anlam açıklığıyla değerlendirilebilir. Farklı kaynaklarda küçük yorum farkları görülse bile ismin yerleşik olumlu çağrışımı belirgindir. Özellikle ${categoryFeeling(input.category)} isimlerden hoşlanan aileler için dengeli ve doğal bir tercih olabilir.`,
    `${input.name}, ${input.meaning} ifadesiyle tanınan ve kız ismi olarak kullanılan anlamlı bir addır. ${input.origin} çizgisinden gelen yapısı, isme kültürel bir arka plan ve kolay anlaşılır bir kimlik kazandırır. Söylenişi günlük hayatta zorlanmadan kullanılır; bu da ismin hem aile içinde hem sosyal çevrede rahat benimsenmesini sağlar. Anlamı güçlü S harfi kız isimleri arasında abartısız ama etkili bir yerde durur.`,
    `${input.name} adı, ${input.meaning} çağrışımıyla ailelerin kısa listesine girebilecek nitelikli bir kız ismidir. ${input.origin} kökenli olması, ismin tarihî veya kültürel bağını daha görünür kılar. Bu isimde ${categoryFeeling(input.category)} bir hava hissedilir ve bu hava kardeş isimleriyle uyum kurarken de avantaj sağlar. Belirsiz yorumlara yaslanmadan, bilinen anlamı ve doğal kullanımıyla güven veren bir seçenektir.`,
  ];
  return variants[index % variants.length];
}

function introText(input: SGirlNameInput, index: number) {
  const variants = [
    `${input.name} ismi, S harfiyle başlayan kız bebek isimleri içinde ${styleLabel(input.style)} bir ad arayan ailelere hitap eder. ${input.meaning} anlamı, isme kulağa hoş gelen bir sesin yanında çocukla birlikte büyüyebilecek olumlu bir hikaye de kazandırır. İsmin ${categoryFeeling(input.category)} karakteri, onu hem tek başına hem de kardeş isimleriyle yan yana dengeli kılar. Bu nedenle yeni doğan kız bebekleri için anlamı ve tınısı birlikte güçlü bir seçenek olarak düşünülebilir.`,
    `${input.name}, anlamı ile söyleyişi birbirini destekleyen kız isimlerinden biridir. ${input.origin} kökenli arka planı, isme tanınabilir bir derinlik ve güven veren bir duruş sağlar. Aileler bu adı seçerken çoğu zaman zarif, anlaşılır ve yıllar içinde eskimeyecek bir isim etkisi arar. ${categoryFeeling(input.category)} havası sayesinde isim, modern listelerde de klasik zevklerde de doğal karşılık bulabilir.`,
    `${input.name} adını düşünen aileler için en dikkat çekici nokta, ismin ${input.meaning} anlamını yumuşak bir tınıyla taşımasıdır. Ne fazla gösterişli ne de zayıf duran bu ad, yenidoğan kız isimleri arasında sakin ama belirgin bir iz bırakır. İsmin ${styleLabel(input.style)} duruşu, kardeş adı önerilerinde de uyumlu eşleşmeler üretmeye yardımcı olur. Anlamı açık ve kullanımı doğal olduğu için günlük hayata kolay yerleşir.`,
    `${input.name}, S harfi kız isimleri arasında anlamı olan ve kulağa temiz gelen bir seçenek arayanlar için güçlü bir alternatiftir. Söylenişi akılda kalıcıdır ve taşıdığı anlam, isme sıcak bir kişilik kazandırır. ${categoryFeeling(input.category)} yönü, adı yalnızca güzel duyulan değil, aynı zamanda iyi açıklanabilen bir tercih haline getirir. Aileler için bu isim hem duygusal hem de veri kalitesi açısından güvenilir bir seçim sunar.`,
  ];
  return variants[index % variants.length];
}

function scoreSimilarity(a: SGirlNameInput, b: SGirlNameInput) {
  let score = 0;
  if (a.category === b.category) score += 5;
  if (a.style === b.style) score += 3;
  if (isShortName(a.name) === isShortName(b.name)) score += 2;
  score += Math.max(0, 3 - Math.abs(a.popularity - b.popularity));
  if (a.origin.split("/")[0].trim() === b.origin.split("/")[0].trim()) score += 1;
  if (a.name.slice(0, 2).toLocaleLowerCase("tr-TR") === b.name.slice(0, 2).toLocaleLowerCase("tr-TR")) score += 1;
  return score;
}

function similarNamesFor(input: SGirlNameInput) {
  return S_GIRL_NAME_INPUTS.filter((candidate) => candidate.name !== input.name)
    .map((candidate) => ({ candidate, score: scoreSimilarity(input, candidate) }))
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name, "tr-TR"))
    .slice(0, 10)
    .map(({ candidate }) => candidate.name);
}

export const S_GIRL_NAME_SEED: BabyNameSeed[] = S_GIRL_NAME_INPUTS.map((input, index) => ({
  id: `s-girl-${index + 1}`,
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
