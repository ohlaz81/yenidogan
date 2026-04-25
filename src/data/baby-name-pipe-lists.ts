/**
 * Çekirdek (CORE) isimlere eklenen yaygın erkek / kız isimleri.
 * Gerektiğinde bu dizilere ekleme yapılabilir.
 */
const BOY = [
  "Mehmet", "Mustafa", "Ali", "Hüseyin", "Hasan", "Murat", "Yusuf", "İbrahim", "İsmail", "Ömer", "Ramazan", "Osman", "Abdullah", "Fatih", "Halil", "Süleyman", "Hakan", "Adem", "Kadir", "Furkan", "Mahmut", "Burak", "Recep", "Serkan", "Yasin", "Enes", "Metin", "Salih", "Gökhan", "Kerem", "Yiğit", "Mert", "Onur", "Tolga", "Tahir", "Orhan", "Sedat", "Uğur", "Volkan", "Tayfun", "Erhan", "Doruk", "Alparslan", "Göktuğ", "Metehan", "Aslan", "Miraç", "Eymen", "Aras", "Miran", "Atlas", "Poyraz", "Alperen", "Ayaz", "Kuzey", "Aybars", "Hamza", "Çınar", "Emir", "Berk", "Baran", "Berkay", "Bora", "Caner", "Cem", "Cihan", "Deniz", "Ege", "Eren", "Ferhat", "Koral", "Batuhan", "Doruk", "Ediz", "Efe", "Ertuğrul", "Fırat", "Güven", "Gürkan", "Erdal", "Ercan", "Erkan", "Kaan", "Okan", "Ozan", "Rüzgar", "Sarp", "Selim", "Tarık", "Umut", "Ufuk", "Yalın", "Yağız", "Yunus", "Zafer", "Ziya", "Musa", "Kazım", "Necati", "Cenk", "Timur", "Teoman", "Tunç", "Tamer", "Bekir", "Bilal", "Coşkun", "Demir", "Eren", "Gürol", "Hilmi", "Kutay", "Levent", "Nazım", "Okay", "Orçun", "Oytun", "Rıdvan", "Samet", "Tevfik", "Yakup", "Rüştü", "Kutsi", "Tunahan", "Buğra", "Kutlu", "Onat", "Sancar", "Tuna", "Tuğra", "Kutay", "Berkant", "Enver", "Mazhar", "Nail", "Orçun", "Rafet", "Suat", "Taylan", "Tunçer", "Utku", "Yekta", "Yücel", "Alp", "Batu", "Bora", "Doğan", "Egehan", "Emrehan", "Eymen", "Fikret", "Görkem", "Hıdır", "İlker", "Kıvanç", "Koray", "Kutay", "Lütfü", "Mertcan", "Nejat", "Orkun", "Payidar", "Rasim", "Serhan", "Şahin", "Tarkan", "Toprak", "Ulaş", "Uğuray", "Volkanay", "Yalınç", "Yiğit", "Zafer", "Batuhan", "Berkay", "Cihan", "Deniz", "Doruk", "Ege", "Eren", "Eymen", "Fırat", "Gökhan", "Güneş", "Hakan", "Hüseyin", "İlhan", "Kaan", "Kerem", "Kuzey", "Mert", "Miraç", "Musa", "Onur", "Ozan", "Poyraz", "Rüzgar", "Sarp", "Taha", "Taner", "Tunç", "Umut", "Utku", "Yasin", "Yiğit", "Yunus", "Batu", "Bora", "Caner", "Deniz", "Doruk", "Ege", "Emre", "Eren", "Ferit", "Güray", "Halil", "Hüseyin", "İlker", "Kaan", "Kemal", "Levent", "Mert", "Musa", "Onur", "Ozan", "Resul", "Selim", "Soner", "Tayfun", "Tolga", "Tuncay", "Uğur", "Volkan", "Yalın", "Yasin", "Yüksel",
];
const GIRL = [
  "Fatma", "Ayşe", "Emine", "Hatice", "Meryem", "Merve", "Zehra", "Esra", "Ebru", "Elçin", "Aynur", "Ayla", "Behiye", "Büşra", "Cennet", "Ceyda", "Derya", "Dilara", "Döndü", "Duygu", "Ece", "Eda", "Ekin", "Ela", "Esin", "Esra", "Fadime", "Ferah", "Feride", "Feyza", "Figen", "Filiz", "Fulya", "Gül", "Gülay", "Gülten", "Gülden", "Gülşah", "Hande", "Hülya", "İclal", "İkbal", "İnci", "İrem", "İpek", "Jale", "Kamelya", "Kübra", "Lale", "Leyla", "Melike", "Melis", "Müge", "Naciye", "Nadide", "Nazlı", "Nebahat", "Nergis", "Neslihan", "Nevin", "Nihan", "Nihal", "Nisa", "Nisanur", "Nur", "Nuray", "Nurcan", "Nurten", "Nükhet", "Özlem", "Pelin", "Pervin", "Pınar", "Rabia", "Rana", "Reyhan", "Rümeysa", "Saadet", "Sabiha", "Seda", "Sedef", "Selen", "Selin", "Semiha", "Serap", "Serpil", "Sevda", "Sevcan", "Sevgi", "Sevgi", "Sevil", "Sibel", "Simge", "Songül", "Sultan", "Şerife", "Şule", "Tuğba", "Tülin", "Ulviye", "Ümran", "Vildan", "Yasemin", "Yeliz", "Zehra", "Zeliha", "Zeynab", "Aslı", "Ahu", "Alev", "Ahsen", "Ahsun", "Aylin", "Ayten", "Beste", "Bilge", "Birgül", "Buket", "Burcu", "Büşra", "Cansu", "Çağla", "Çiğdem", "Dilara", "Dilek", "Duygu", "Duru", "Ece", "Ecrin", "Ela", "Elanur", "Elif", "Elvan", "Emel", "Esma", "Evrim", "Ezgi", "Ferda", "Feride", "Figen", "Fulya", "Gizem", "Gönül", "Gülay", "Güliz", "Gülnur", "Hacer", "Halide", "Hande", "Hazal", "Hilal", "Hülya", "Işıl", "İdil", "İlknur", "İpek", "Jale", "Kübra", "Leman", "Lale", "Leyla", "Lütfiye", "Melis", "Menekşe", "Merve", "Müberra", "Müjgan", "Nadire", "Nargül", "Nesrin", "Nezihe", "Nigâr", "Nihan", "Nilsu", "Nimet", "Nisa", "Nur", "Nura", "Nurgül", "Nursel", "Ömür", "Pelin", "Perihan", "Pervin", "Pınar", "Rabia", "Rana", "Reyhan", "Rümeysa", "Saadet", "Safiye", "Saliha", "Seda", "Sedef", "Selin", "Semiha", "Serra", "Sevcan", "Sevda", "Sinem", "Songül", "Sultan", "Sümeyra", "Şimşek", "Şule", "Tuana", "Tuğçe", "Türkan", "Umay", "Ülker", "Yaprak", "Yasemen", "Yonca", "Yosun", "Yıldız", "Zarife", "Zerrin", "Zülal", "Züleyha", "Asya", "Azra", "Bahar", "Berfin", "Betül", "Burcu", "Buse", "Cemre", "Ceren", "Dilara", "Duru", "Ece", "Efnan", "Ela", "Ela", "Eylül", "Gülce", "Gülizar", "Hilal", "Ilgın", "İdil", "Jülide", "Kumru", "Lara", "Melek", "Mürvet", "Nefise", "Nilüfer", "Nihan", "Pelin", "Rabia", "Rana", "Sevinç", "Tuğba", "Zehre",
];

function uniqueJoin(names: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const n of names) {
    const t = n.trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out.join("|");
}

export const BOY_NAME_PIPE = uniqueJoin(BOY);
export const GIRL_NAME_PIPE = uniqueJoin(GIRL);
