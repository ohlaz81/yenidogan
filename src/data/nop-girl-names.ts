import type { BabyNameSeed } from "@/types/baby-name-seed";
import type { NameStyle } from "@/types/database";

type NopGirlNameInput = {
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
    | "color"
    | "place";
  inQuran?: boolean;
  quranReference?: string | null;
};

const NOP_GIRL_NAME_INPUTS: NopGirlNameInput[] = [
  { name: "Nağme", meaning: "ezgi, melodi ve kulağa hoş gelen ahenkli ses", origin: "Farsça / Türkçe kullanım", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "sound", traits: ["Melodik", "Zarif", "Sanatsal", "Duygulu", "Klasik", "Yumuşak"] },
  { name: "Nahide", meaning: "Venüs gezegeni ve parlak göksel güzellik çağrışımı", origin: "Farsça", popularity: 2.3, popularScore: 2, style: "CLASSIC", category: "light", traits: ["Parlak", "Klasik", "Zarif", "Göksel", "Dingin", "Asil"] },
  { name: "Naime", meaning: "huzurlu, nimet içinde yaşayan ve rahatlık bulan kadın", origin: "Arapça", popularity: 2.4, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Huzurlu", "Klasik", "Sakin", "Bereketli", "Güvenilir", "Olgun"] },
  { name: "Nalan", meaning: "inleyen, duygulu ve içli sesle anılan kişi", origin: "Farsça", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "classic", traits: ["Duygulu", "Klasik", "Zarif", "İçten", "Sakin", "Edebî"] },
  { name: "Narin", meaning: "ince yapılı, zarif ve hassas güzellik taşıyan kişi", origin: "Farsça / Türkçe kullanım", popularity: 3.1, popularScore: 3, style: "MODERN", category: "grace", traits: ["Zarif", "Narin", "Yumuşak", "Sakin", "Modern", "Duygusal"] },
  { name: "Naz", meaning: "hoş eda, cilve ve sevilen kişiye yakışan zarif tavır", origin: "Farsça", popularity: 3.8, popularScore: 4, style: "POPULAR", category: "grace", traits: ["Kısa", "Zarif", "Sevilen", "Canlı", "Modern", "Akılda kalıcı"] },
  { name: "Nazan", meaning: "nazlı, edalı ve zarif duruşuyla sevilen kadın", origin: "Farsça", popularity: 2.9, popularScore: 3, style: "CLASSIC", category: "grace", traits: ["Zarif", "Klasik", "Nazlı", "Duygulu", "Sıcak", "Uyumlu"] },
  { name: "Nazende", meaning: "nazlı, ince ruhlu ve özenle sevilen kişi", origin: "Farsça", popularity: 2.3, popularScore: 2, style: "RARE", category: "grace", traits: ["Nazlı", "Zarif", "Nadir", "Edebî", "Yumuşak", "Asil"] },
  { name: "Nazife", meaning: "temiz, pak ve incelikli kişiliğiyle bilinen kadın", origin: "Arapça", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Temiz", "Klasik", "Zarif", "Güvenilir", "Olgun", "Sakin"] },
  { name: "Nazlı", meaning: "naz yapan, sevimli edasıyla sevgi uyandıran kişi", origin: "Türkçe / Farsça kökenli kullanım", popularity: 3.7, popularScore: 4, style: "POPULAR", category: "grace", traits: ["Zarif", "Popüler", "Duygulu", "Canlı", "Sıcak", "Akılda kalıcı"] },
  { name: "Nazlıcan", meaning: "nazlı ve cana yakın kişilik çağrışımı taşıyan birleşik ad", origin: "Farsça / Türkçe kullanım", popularity: 2.8, popularScore: 2, style: "MODERN", category: "grace", traits: ["Cana yakın", "Zarif", "Modern", "Sıcak", "Duygulu", "Uyumlu"] },
  { name: "Nazlıgül", meaning: "nazlı duruş ile gül zarafetini birleştiren ad", origin: "Farsça / Türkçe kullanım", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "flower", traits: ["Çiçeksi", "Zarif", "Klasik", "Duygulu", "Sıcak", "Yumuşak"] },
  { name: "Nazlıhan", meaning: "nazlı ve soylu duruşu bir araya getiren ad", origin: "Farsça / Türkçe kullanım", popularity: 2.6, popularScore: 2, style: "MODERN", category: "grace", traits: ["Asil", "Zarif", "Modern", "Güçlü", "Duygulu", "Akılda kalıcı"] },
  { name: "Nazlım", meaning: "sevgiyle nazlım diye hitap edilen, sıcak ve içten ad", origin: "Türkçe kullanım", popularity: 2.4, popularScore: 2, style: "RARE", category: "grace", traits: ["Sıcak", "İçten", "Zarif", "Nadir", "Duygulu", "Yumuşak"] },
  { name: "Nazlısu", meaning: "nazlı duruş ile suyun akıcı ferahlığını birleştiren ad", origin: "Farsça / Türkçe kullanım", popularity: 2.5, popularScore: 2, style: "MODERN", category: "nature", traits: ["Ferah", "Zarif", "Modern", "Akıcı", "Yumuşak", "Doğal"] },
  { name: "Necla", meaning: "soylu nesilden gelen, güzel ve seçkin kadın", origin: "Arapça", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "classic", traits: ["Klasik", "Asil", "Seçkin", "Olgun", "Güvenilir", "Zarif"] },
  { name: "Nefes", meaning: "soluk, yaşam belirtisi ve ferahlatan canlılık", origin: "Türkçe", popularity: 3.0, popularScore: 3, style: "MODERN", category: "nature", traits: ["Ferah", "Modern", "Canlı", "Doğal", "Sakin", "Anlamı güçlü"] },
  { name: "Nehir", meaning: "ırmak, akan büyük su ve doğal akış", origin: "Arapça kökenli Türkçe kullanım", popularity: 4.0, popularScore: 4, style: "POPULAR", category: "nature", traits: ["Doğal", "Akıcı", "Ferah", "Popüler", "Güçlü", "Modern"] },
  { name: "Nehri", meaning: "nehirle ilgili, akarsuya ait ve akış çağrışımlı ad", origin: "Arapça / Türkçe kullanım", popularity: 2.1, popularScore: 1, style: "RARE", category: "nature", traits: ["Akıcı", "Doğal", "Nadir", "Ferah", "Sakin", "Özgün"] },
  { name: "Neşe", meaning: "sevinç, iç açıklığı ve canlı mutluluk hali", origin: "Farsça / Türkçe kullanım", popularity: 3.0, popularScore: 3, style: "CLASSIC", category: "virtue", traits: ["Neşeli", "Pozitif", "Klasik", "Sıcak", "Canlı", "Uyumlu"] },
  { name: "Nesibe", meaning: "soylu, temiz nesebe bağlı ve değer verilen kadın", origin: "Arapça", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "classic", traits: ["Klasik", "Asil", "Köklü", "Güvenilir", "Olgun", "Sakin"] },
  { name: "Neslihan", meaning: "soylu nesilden gelen hanım, köklü ve asil kadın", origin: "Arapça / Türkçe kullanım", popularity: 3.4, popularScore: 3, style: "POPULAR", category: "classic", traits: ["Asil", "Klasik", "Güçlü", "Köklü", "Zarif", "Güven veren"] },
  { name: "Neval", meaning: "nasip, kısmet ve elde edilen güzel pay", origin: "Arapça", popularity: 2.4, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Nasipli", "Klasik", "Sakin", "Duygulu", "Güvenilir", "Anlamı güçlü"] },
  { name: "Nevin", meaning: "yeni, taze ve yenilik duygusu taşıyan ad", origin: "Farsça", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "classic", traits: ["Taze", "Klasik", "Yumuşak", "Sakin", "Zarif", "Dengeli"] },
  { name: "Nezahat", meaning: "temizlik, arılık ve ahlaki incelik", origin: "Arapça", popularity: 2.3, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Temiz", "Olgun", "Klasik", "Güvenilir", "Zarif", "Sakin"] },
  { name: "Nezihe", meaning: "temiz, nezih ve seçkin duruşlu kadın", origin: "Arapça", popularity: 2.4, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Temiz", "Seçkin", "Klasik", "Zarif", "Olgun", "Güven veren"] },
  { name: "Nihal", meaning: "fidan, taze sürgün ve büyüyen genç dal", origin: "Farsça", popularity: 3.0, popularScore: 3, style: "CLASSIC", category: "nature", traits: ["Doğal", "Zarif", "Klasik", "Taze", "Sakin", "Duygulu"] },
  { name: "Nil", meaning: "Nil Nehri; bereket, su ve tarihî coğrafya çağrışımı", origin: "Arapça / coğrafi ad", popularity: 3.8, popularScore: 4, style: "POPULAR", category: "nature", traits: ["Kısa", "Doğal", "Popüler", "Ferah", "Güçlü", "Akılda kalıcı"] },
  { name: "Nilay", meaning: "mavi ay, ay ışığı ve su ferahlığı çağrışımı", origin: "Farsça / Türkçe kullanım", popularity: 3.5, popularScore: 3, style: "POPULAR", category: "light", traits: ["Aydınlık", "Zarif", "Popüler", "Modern", "Dingin", "Yumuşak"] },
  { name: "Nilgün", meaning: "mavi gün, aydınlık ve ferah gün çağrışımı", origin: "Farsça / Türkçe kullanım", popularity: 2.9, popularScore: 3, style: "CLASSIC", category: "light", traits: ["Aydınlık", "Klasik", "Ferah", "Zarif", "Sakin", "Renkli"] },
  { name: "Nilhan", meaning: "Nil çağrışımını hanım zarafetiyle birleştiren ad", origin: "Farsça / Türkçe kullanım", popularity: 2.7, popularScore: 2, style: "MODERN", category: "nature", traits: ["Modern", "Doğal", "Zarif", "Ferah", "Asil", "Akıcı"] },
  { name: "Nilüfer", meaning: "suda açan zarif nilüfer çiçeği", origin: "Farsça", popularity: 3.2, popularScore: 3, style: "CLASSIC", category: "flower", traits: ["Çiçeksi", "Zarif", "Klasik", "Doğal", "Sakin", "Estetik"] },
  { name: "Nimet", meaning: "iyilik, lütuf, bereket ve değerli armağan", origin: "Arapça", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Bereketli", "Manevi", "Klasik", "Şükürlü", "Güvenilir", "Olgun"] },
  { name: "Niran", meaning: "ışıklar, parıltılar ve aydınlık çağrışımı", origin: "Farsça / Arapça kullanım", popularity: 2.4, popularScore: 2, style: "RARE", category: "light", traits: ["Aydınlık", "Nadir", "Zarif", "Parlak", "Modern", "Özgün"] },
  { name: "Nur", meaning: "ışık, aydınlık ve manevi parlaklık", origin: "Arapça", pronunciation: "Nur", popularity: 4.1, popularScore: 4, style: "POPULAR", category: "spiritual", inQuran: true, quranReference: "Nur suresi (24) adını bu kelimeden alır; Kur'an'da aydınlık ve ilahi rehberlik anlam alanıyla geçer.", traits: ["Aydınlık", "Manevi", "Kısa", "Popüler", "Zarif", "Anlamı güçlü"] },
  { name: "Nuran", meaning: "aydınlık, nurlu ve ışık saçan kişi", origin: "Arapça / Türkçe kullanım", popularity: 2.9, popularScore: 3, style: "CLASSIC", category: "spiritual", traits: ["Aydınlık", "Manevi", "Klasik", "Zarif", "Güven veren", "Sakin"] },
  { name: "Nuray", meaning: "nur gibi aydınlık ay ve yumuşak ay ışığı", origin: "Arapça / Türkçe kullanım", popularity: 3.1, popularScore: 3, style: "CLASSIC", category: "light", traits: ["Aydınlık", "Klasik", "Zarif", "Dingin", "Manevi", "Parlak"] },
  { name: "Nurbanu", meaning: "nurlu hanım, aydınlık ve soylu kadın", origin: "Arapça / Farsça kullanım", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Manevi", "Asil", "Aydınlık", "Klasik", "Güçlü", "Zarif"] },
  { name: "Nurdan", meaning: "nurdan yapılmış gibi aydınlık ve temiz olan", origin: "Arapça / Türkçe kullanım", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Aydınlık", "Manevi", "Klasik", "Temiz", "Güven veren", "Sakin"] },
  { name: "Nurel", meaning: "nur ve el kelimelerinin aydınlık, yardım çağrışımlı birleşimi", origin: "Arapça / Türkçe kullanım", popularity: 2.1, popularScore: 1, style: "RARE", category: "spiritual", traits: ["Aydınlık", "Manevi", "Nadir", "Zarif", "Yardımsever", "Sakin"] },
  { name: "Nurgül", meaning: "nur gibi aydınlık gül, ışıklı ve zarif çiçek", origin: "Arapça / Türkçe kullanım", popularity: 3.0, popularScore: 3, style: "CLASSIC", category: "flower", traits: ["Çiçeksi", "Aydınlık", "Klasik", "Zarif", "Manevi", "Sıcak"] },
  { name: "Nurhan", meaning: "nurlu hanım, aydınlık ve güçlü duruşlu kişi", origin: "Arapça / Türkçe kullanım", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Aydınlık", "Güçlü", "Klasik", "Manevi", "Asil", "Güven veren"] },
  { name: "Nuriye", meaning: "nurlu, aydınlık ve ışıkla ilişkilendirilen kadın", origin: "Arapça", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Manevi", "Aydınlık", "Klasik", "Sakin", "Güvenilir", "Olgun"] },
  { name: "Nurşen", meaning: "nurun aydınlığı ile neşeyi birleştiren ad", origin: "Arapça / Türkçe kullanım", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Aydınlık", "Neşeli", "Klasik", "Manevi", "Sıcak", "Pozitif"] },
  { name: "Nurten", meaning: "nurlu ten, aydınlık yüz ve temiz güzellik çağrışımı", origin: "Arapça / Türkçe kullanım", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "spiritual", traits: ["Aydınlık", "Klasik", "Zarif", "Manevi", "Sakin", "Güven veren"] },
  { name: "Okşan", meaning: "sevgiyle okşanan, incelik ve şefkat çağrışımı taşıyan ad", origin: "Türkçe", pronunciation: "Ok-şan", popularity: 2.0, popularScore: 1, style: "RARE", category: "grace", traits: ["Şefkatli", "Nadir", "Zarif", "Duygulu", "Sıcak", "Yumuşak"] },
  { name: "Okyanus", meaning: "engin deniz, genişlik ve derinlik çağrışımı", origin: "Yunanca kökenli Türkçe kullanım", popularity: 2.4, popularScore: 2, style: "MODERN", category: "nature", traits: ["Derin", "Doğal", "Modern", "Güçlü", "Ferah", "Özgün"] },
  { name: "Orkide", meaning: "zarif ve gösterişli orkide çiçeği", origin: "Fransızca / Latince kökenli Türkçe kullanım", pronunciation: "Or-ki-de", popularity: 2.7, popularScore: 2, style: "MODERN", category: "flower", traits: ["Çiçeksi", "Zarif", "Modern", "Estetik", "Özgün", "Canlı"] },
  { name: "Oya", meaning: "ince el işi süsleme, zarif işçilik ve estetik detay", origin: "Türkçe", popularity: 3.0, popularScore: 3, style: "CLASSIC", category: "grace", traits: ["Zarif", "Kısa", "Klasik", "Estetik", "Sade", "Sanatsal"] },
  { name: "Oylum", meaning: "hacim, derinlik ve genişlik hissi taşıyan ad", origin: "Türkçe", pronunciation: "Oy-lum", popularity: 2.4, popularScore: 2, style: "CLASSIC", category: "modern", traits: ["Derin", "Sade", "Klasik", "Özgün", "Dengeli", "Güçlü"] },
  { name: "Ödül", meaning: "başarı karşılığı verilen değerli armağan", origin: "Türkçe", popularity: 2.4, popularScore: 2, style: "MODERN", category: "virtue", traits: ["Değerli", "Modern", "Kısa", "Pozitif", "Başarılı", "Anlamı güçlü"] },
  { name: "Övgü", meaning: "beğeni, takdir ve güzel sözle yüceltme", origin: "Türkçe", popularity: 2.8, popularScore: 2, style: "MODERN", category: "virtue", traits: ["Pozitif", "Modern", "Kısa", "Değerli", "Neşeli", "Anlamı güçlü"] },
  { name: "Öykü", meaning: "hikâye, anlatı ve hayal gücü taşıyan metin", origin: "Türkçe", popularity: 4.0, popularScore: 4, style: "POPULAR", category: "modern", traits: ["Modern", "Yaratıcı", "Kısa", "Popüler", "Sanatsal", "Akılda kalıcı"] },
  { name: "Öyküm", meaning: "benim hikâyem anlamı veren sıcak ve kişisel ad", origin: "Türkçe", popularity: 2.8, popularScore: 2, style: "MODERN", category: "modern", traits: ["Modern", "Yaratıcı", "Sıcak", "Duygulu", "Özgün", "Sanatsal"] },
  { name: "Özben", meaning: "kişinin kendi özü, benliği ve iç kimliği", origin: "Türkçe", popularity: 2.2, popularScore: 2, style: "RARE", category: "modern", traits: ["Özgün", "Derin", "Nadir", "Modern", "Kararlı", "Anlamı güçlü"] },
  { name: "Özde", meaning: "özde, temelde ve içten gelen değer", origin: "Türkçe", popularity: 2.7, popularScore: 2, style: "MODERN", category: "modern", traits: ["Sade", "Modern", "Kısa", "İçten", "Dengeli", "Özgün"] },
  { name: "Özden", meaning: "özden gelen, samimi ve içten olan kişi", origin: "Türkçe", popularity: 2.9, popularScore: 3, style: "CLASSIC", category: "virtue", traits: ["İçten", "Klasik", "Samimi", "Güvenilir", "Sade", "Dengeli"] },
  { name: "Özge", meaning: "başka, farklı, seçkin ve kendine özgü olan", origin: "Türkçe", popularity: 3.7, popularScore: 4, style: "POPULAR", category: "modern", traits: ["Özgün", "Popüler", "Kısa", "Modern", "Zarif", "Akılda kalıcı"] },
  { name: "Özgecan", meaning: "özgünlük ve can sıcaklığını birleştiren ad", origin: "Türkçe", popularity: 3.0, popularScore: 3, style: "MODERN", category: "modern", traits: ["İçten", "Modern", "Güçlü", "Sıcak", "Özgün", "Duygulu"] },
  { name: "Özgen", meaning: "soyu temiz, özü köklü ve kendine özgü kişi", origin: "Türkçe", popularity: 2.4, popularScore: 2, style: "RARE", category: "classic", traits: ["Köklü", "Nadir", "Sade", "Güvenilir", "Özgün", "Dengeli"] },
  { name: "Özgü", meaning: "birine veya bir şeye ait, kendine has olan", origin: "Türkçe", popularity: 2.5, popularScore: 2, style: "MODERN", category: "modern", traits: ["Özgün", "Kısa", "Modern", "Sade", "Kararlı", "Anlamı güçlü"] },
  { name: "Özgül", meaning: "kendine özgü, ayırt edici ve özel nitelikli", origin: "Türkçe", popularity: 2.6, popularScore: 2, style: "CLASSIC", category: "modern", traits: ["Özgün", "Klasik", "Sade", "Seçkin", "Kararlı", "Dengeli"] },
  { name: "Özlem", meaning: "hasret, kavuşma isteği ve içten arzu", origin: "Türkçe", popularity: 3.5, popularScore: 3, style: "CLASSIC", category: "virtue", traits: ["Duygulu", "Klasik", "İçten", "Sıcak", "Anlamı güçlü", "Güven veren"] },
  { name: "Özlen", meaning: "özlenen, hasret duyulan ve sevgiyle anılan kişi", origin: "Türkçe", popularity: 2.3, popularScore: 2, style: "RARE", category: "virtue", traits: ["Duygulu", "Nadir", "İçten", "Sıcak", "Sakin", "Anlamı güçlü"] },
  { name: "Öznur", meaning: "özü nur olan, içten gelen aydınlık", origin: "Türkçe / Arapça kullanım", popularity: 3.1, popularScore: 3, style: "CLASSIC", category: "spiritual", traits: ["Aydınlık", "Manevi", "Klasik", "İçten", "Zarif", "Güven veren"] },
  { name: "Özsu", meaning: "öz su, temel akış ve yaşam kaynağı çağrışımı", origin: "Türkçe", popularity: 2.4, popularScore: 2, style: "MODERN", category: "nature", traits: ["Doğal", "Akıcı", "Modern", "Kısa", "Ferah", "Özgün"] },
  { name: "Özüm", meaning: "benim özüm, içten sevgi ve değer çağrışımı", origin: "Türkçe", popularity: 2.7, popularScore: 2, style: "MODERN", category: "modern", traits: ["İçten", "Modern", "Kısa", "Sıcak", "Duygulu", "Özgün"] },
  { name: "Pakize", meaning: "temiz, arı, iffetli ve özenli kadın", origin: "Farsça", popularity: 2.4, popularScore: 2, style: "CLASSIC", category: "virtue", traits: ["Temiz", "Klasik", "Olgun", "Güvenilir", "Zarif", "Sakin"] },
  { name: "Papatya", meaning: "sade, beyaz ve sevimli papatya çiçeği", origin: "Türkçe", popularity: 2.8, popularScore: 2, style: "MODERN", category: "flower", traits: ["Çiçeksi", "Sade", "Neşeli", "Doğal", "Zarif", "Modern"] },
  { name: "Parla", meaning: "ışılda, parıltı saç ve aydınlık ol çağrışımı", origin: "Türkçe", popularity: 3.0, popularScore: 3, style: "MODERN", category: "light", traits: ["Parlak", "Modern", "Pozitif", "Kısa", "Canlı", "Aydınlık"] },
  { name: "Parıltı", meaning: "ışık yansıması, canlılık ve göz alıcı aydınlık", origin: "Türkçe", popularity: 2.5, popularScore: 2, style: "RARE", category: "light", traits: ["Parlak", "Canlı", "Nadir", "Modern", "Neşeli", "Aydınlık"] },
  { name: "Paye", meaning: "derece, makam, değer ve saygınlık", origin: "Farsça", popularity: 2.4, popularScore: 2, style: "RARE", category: "virtue", traits: ["Değerli", "Saygın", "Kısa", "Nadir", "Asil", "Anlamı güçlü"] },
  { name: "Pelin", meaning: "güçlü kokulu, şifalı özellikleriyle bilinen pelin otu", origin: "Türkçe / bitki adı", popularity: 3.6, popularScore: 4, style: "POPULAR", category: "nature", traits: ["Doğal", "Popüler", "Sade", "Güçlü", "Zarif", "Akılda kalıcı"] },
  { name: "Pelinay", meaning: "Pelin adı ile ayın aydınlığını birleştiren modern ad", origin: "Türkçe", popularity: 2.6, popularScore: 2, style: "MODERN", category: "light", traits: ["Aydınlık", "Modern", "Zarif", "Duygulu", "Parlak", "Akılda kalıcı"] },
  { name: "Pelinsu", meaning: "pelin bitkisi ile suyun ferahlığını birleştiren ad", origin: "Türkçe", popularity: 3.0, popularScore: 3, style: "MODERN", category: "nature", traits: ["Doğal", "Ferah", "Modern", "Akıcı", "Zarif", "Popüler"] },
  { name: "Pembe", meaning: "pembe renk, yumuşaklık ve sıcak sevinç çağrışımı", origin: "Farsça kökenli Türkçe kullanım", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "color", traits: ["Renkli", "Sıcak", "Klasik", "Yumuşak", "Neşeli", "Sevecen"] },
  { name: "Pera", meaning: "Beyoğlu'nun tarihî Pera adıyla ilişkili zarif yer adı", origin: "Rumca / tarihî yer adı", popularity: 2.8, popularScore: 2, style: "MODERN", category: "place", traits: ["Modern", "Tarihî", "Kısa", "Zarif", "Şehirli", "Özgün"] },
  { name: "Peri", meaning: "masallarda zarif ve iyi kalpli varlık", origin: "Farsça", popularity: 3.0, popularScore: 3, style: "MODERN", category: "grace", traits: ["Masalsı", "Kısa", "Zarif", "Modern", "Duygulu", "Yumuşak"] },
  { name: "Peride", meaning: "peri gibi güzel, zarif ve ince ruhlu kadın", origin: "Farsça", popularity: 2.3, popularScore: 2, style: "RARE", category: "grace", traits: ["Masalsı", "Zarif", "Nadir", "Klasik", "Duygulu", "Asil"] },
  { name: "Perihan", meaning: "peri gibi zarif hanım, masalsı ve soylu kadın", origin: "Farsça / Türkçe kullanım", popularity: 2.8, popularScore: 2, style: "CLASSIC", category: "grace", traits: ["Masalsı", "Klasik", "Zarif", "Asil", "Duygulu", "Güven veren"] },
  { name: "Perinaz", meaning: "peri zarafeti ile nazlı edayı birleştiren ad", origin: "Farsça", popularity: 2.3, popularScore: 2, style: "RARE", category: "grace", traits: ["Zarif", "Nazlı", "Masalsı", "Nadir", "Duygulu", "Yumuşak"] },
  { name: "Perisu", meaning: "peri masalsılığı ile suyun ferahlığını birleştiren ad", origin: "Farsça / Türkçe kullanım", popularity: 2.4, popularScore: 2, style: "MODERN", category: "nature", traits: ["Masalsı", "Ferah", "Modern", "Akıcı", "Zarif", "Özgün"] },
  { name: "Perizat", meaning: "peri gibi doğmuş, masalsı güzellik taşıyan kadın", origin: "Farsça", popularity: 2.1, popularScore: 1, style: "RARE", category: "grace", traits: ["Masalsı", "Nadir", "Zarif", "Klasik", "Asil", "Duygulu"] },
  { name: "Perran", meaning: "uçan, kanatlı ve hafiflik çağrışımı taşıyan ad", origin: "Farsça", popularity: 2.2, popularScore: 2, style: "RARE", category: "classic", traits: ["Hafif", "Nadir", "Klasik", "Zarif", "Özgün", "Duygulu"] },
  { name: "Peruze", meaning: "firuze taşıyla ilişkilenen mavi-yeşil değerli taş", origin: "Farsça", popularity: 2.1, popularScore: 1, style: "RARE", category: "color", traits: ["Değerli", "Renkli", "Nadir", "Zarif", "Estetik", "Klasik"] },
  { name: "Pervin", meaning: "Ülker yıldız kümesi ve göksel parlaklık çağrışımı", origin: "Farsça", popularity: 2.5, popularScore: 2, style: "CLASSIC", category: "light", traits: ["Göksel", "Klasik", "Parlak", "Zarif", "Sakin", "Asil"] },
  { name: "Petek", meaning: "arıların bal yaptığı düzenli ve bereketli yapı", origin: "Türkçe", popularity: 2.7, popularScore: 2, style: "MODERN", category: "nature", traits: ["Bereketli", "Doğal", "Modern", "Çalışkan", "Sade", "Sıcak"] },
  { name: "Peyda", meaning: "ortaya çıkan, belli olan ve görünür hâle gelen", origin: "Farsça", popularity: 2.3, popularScore: 2, style: "RARE", category: "classic", traits: ["Belirgin", "Nadir", "Klasik", "Sade", "Özgün", "Dengeli"] },
  { name: "Peyker", meaning: "yüz, çehre ve güzel görünüş çağrışımı", origin: "Farsça", popularity: 2.1, popularScore: 1, style: "RARE", category: "grace", traits: ["Zarif", "Nadir", "Klasik", "Estetik", "Asil", "Duygulu"] },
  { name: "Piraye", meaning: "süs, ziynet ve değerli güzellik", origin: "Farsça", popularity: 2.7, popularScore: 2, style: "CLASSIC", category: "grace", traits: ["Zarif", "Klasik", "Değerli", "Edebî", "Asil", "Estetik"] },
  { name: "Püren", meaning: "doğada yetişen, çiçekli ve hoş kokulu bitki", origin: "Türkçe / bitki adı", popularity: 2.4, popularScore: 2, style: "RARE", category: "flower", traits: ["Çiçeksi", "Doğal", "Nadir", "Zarif", "Ferah", "Özgün"] },
  { name: "Pürlen", meaning: "parlamak, ışıldamak ve canlı bir aydınlık kazanmak", origin: "Türkçe kullanım", popularity: 2.3, popularScore: 2, style: "RARE", category: "light", traits: ["Parlak", "Nadir", "Modern", "Canlı", "Aydınlık", "Özgün"] },
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
  if (style === "RARE") return "nadir ama anlaşılır";
  if (style === "CLASSIC") return "kökleri güçlü ve tanıdık";
  return "modern ve temiz tınılı";
}

function categoryFeeling(category: NopGirlNameInput["category"]) {
  const feelings: Record<NopGirlNameInput["category"], string> = {
    nature: "doğal ve ferah",
    light: "aydınlık ve umut veren",
    classic: "köklü ve güven veren",
    modern: "çağdaş ve sade",
    virtue: "değer odaklı ve anlamı güçlü",
    spiritual: "manevi ve aydınlık",
    flower: "çiçeksi ve zarif",
    grace: "zarif ve yumuşak",
    sound: "melodik ve sanatsal",
    color: "renkli ve sıcak",
    place: "şehirli ve tarihî",
  };
  return feelings[category];
}

function meaningText(input: NopGirlNameInput, index: number) {
  const variants = [
    `${input.name}, ${input.meaning} anlamıyla kullanılan ${input.origin} kökenli bir kız ismidir. İsmin çağrışımı hem günlük hayatta anlaşılır hem de ailelerin isim seçerken aradığı olumlu duyguya yakındır. Söylenişindeki denge, ${styleLabel(input.style)} bir ad olmasına rağmen kulağa sıcak gelmesini sağlar. Bu nedenle anlamı güzel kız isimleri arasında karakterli ve doğal bir seçenek olarak değerlendirilebilir.`,
    `${input.name} ismi, temel olarak ${input.meaning} fikrini öne çıkarır. ${input.origin} kaynaklı bu ad, kız bebek isimleri arasında anlamı açık ve kişiliği belirgin seçeneklerden biridir. Taşıdığı duygu, sade bir zarafetle birlikte güçlü bir kimlik hissi verir. Anlamı tartışmalı kullanımlarda ise isim daha çok yerleşik çağrışımı ve kültürel kullanımıyla öne çıkar.`,
    `${input.name}, ${input.meaning} anlam alanıyla bilinen gerçek ve kullanılan bir kız adıdır. Kökeni ${input.origin} çizgisine dayanır ve Türkçedeki kullanımı isme yumuşak bir tını kazandırır. Anlamındaki olumlu vurgu, ismi hem klasik hem de modern listelerde değerlendirilebilir kılar. Özellikle ${categoryFeeling(input.category)} isimleri seven aileler için dengeli bir tercihtir.`,
    `${input.name} adı, ${input.meaning} çağrışımıyla ailelerin sevdiği anlamlı seçenekler arasında yer alır. ${input.origin} kökenli yapısı, isme kültürel bir derinlik ve yerleşik bir karakter verir. Telaffuzu rahat olduğu için kardeş isimleriyle birlikte de uyumlu bir profil oluşturur. Anlamı güzel kız isimleri arayanlar için doğal, akılda kalıcı ve özenli bir alternatiftir.`,
  ];
  return variants[index % variants.length];
}

function introText(input: NopGirlNameInput, index: number) {
  const variants = [
    `${input.name} ismi, yenidoğan kız bebek isimleri içinde ${styleLabel(input.style)} bir seçenek arayan ailelere hitap eder. ${input.meaning} anlamı, ismin yalnızca kulağa hoş gelen bir ad olarak değil, hikâyesi olan bir tercih olarak öne çıkmasını sağlar. İsmin ${categoryFeeling(input.category)} havası, hem tek başına hem de kardeş isimleriyle birlikte dengeli bir bütünlük kurar.`,
    `${input.name}, kız isimleri listesinde anlamıyla dikkat çeken ve telaffuzu rahat ilerleyen adlardan biridir. ${input.origin} kökenli olması, isme hem kültürel bir arka plan hem de belirgin bir çağrışım kazandırır. Aileler bu adı seçerken genellikle sıcak, anlaşılır ve karakterli bir isim etkisi arar.`,
    `${input.name} adını düşünen aileler için ismin en güçlü tarafı, ${input.meaning} anlamını doğal bir söyleyişle taşımasıdır. Ne çok ağır ne de geçici duran bu tını, anlamı güzel ve karakterli kız bebek isimleri arayanlar için öne çıkar. İsmin ${categoryFeeling(input.category)} yönü, kardeş adı önerilerinde de uyumlu eşleşmeler üretmeye yardımcı olur.`,
    `${input.name}, kısa listesine zarif ama boş olmayan bir isim eklemek isteyen aileler için değerlendirilebilir. Söylenişi akılda kalıcıdır ve anlamı, çocuğa eşlik edecek olumlu bir kimlik hissi verir. ${styleLabel(input.style)} duruşu sayesinde hem geleneksel hem de güncel isimlerle yan yana kullanılabilir.`,
  ];
  return variants[index % variants.length];
}

function scoreSimilarity(a: NopGirlNameInput, b: NopGirlNameInput) {
  let score = 0;
  if (a.category === b.category) score += 5;
  if (a.style === b.style) score += 3;
  if (isShortName(a.name) === isShortName(b.name)) score += 2;
  score += Math.max(0, 3 - Math.abs(a.popularity - b.popularity));
  if (a.name[0]?.toLocaleUpperCase("tr-TR") === b.name[0]?.toLocaleUpperCase("tr-TR")) score += 1;
  return score;
}

function similarNamesFor(input: NopGirlNameInput) {
  return NOP_GIRL_NAME_INPUTS.filter((candidate) => candidate.name !== input.name)
    .map((candidate) => ({ candidate, score: scoreSimilarity(input, candidate) }))
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name, "tr-TR"))
    .slice(0, 10)
    .map(({ candidate }) => candidate.name);
}

export const NOP_GIRL_NAME_SEED: BabyNameSeed[] = NOP_GIRL_NAME_INPUTS.map((input, index) => ({
  id: `nop-girl-${index + 1}`,
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
