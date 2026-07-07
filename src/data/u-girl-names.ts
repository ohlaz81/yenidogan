import type { BabyNameSeed } from "@/types/baby-name-seed";
import type { NameStyle } from "@/types/database";

type UGirlNameInput = {
  name: string;
  meaningCore: string;
  meaningNote: string;
  introNote: string;
  origin: string;
  pronunciation?: string;
  popularity: number;
  popularScore: number;
  style: NameStyle;
  traits: string[];
  category: "spiritual" | "virtue" | "classic" | "modern" | "light" | "ideal" | "heritage" | "grace";
  inQuran?: boolean;
  quranReference?: string | null;
};

const U_GIRL_NAME_INPUTS: UGirlNameInput[] = [
  {
    name: "Ubeyde",
    meaningCore: "küçük kul, ibadet eden ve bağlılık gösteren kişi",
    meaningNote:
      "Ubeyde, Arapça kökenli Ubeyde/Ubayda kullanımından gelen nadir bir addır. Türkiye'de çok yaygın değildir; ancak kadın adı olarak da kullanılan eski ve manevi tınılı seçenekler arasında değerlendirilir. Anlam alanında kulluk, bağlılık ve alçak gönüllülük fikri öne çıkar. Bu nedenle ismi seçerken hem dini çağrışımı hem de nadir kullanımı birlikte düşünmek gerekir.",
    introNote:
      "Ubeyde ismi, farklı ama köksüz durmayan bir kız adı arayan aileler için dikkat çekici bir alternatiftir. Sade yazılır, yumuşak söylenir ve taşıdığı manevi çağrışım nedeniyle ağırbaşlı bir karakter hissi verir. Çok bilinen isimlerden uzaklaşmak isteyen ama anlamı açıklanabilir bir ad seçmek isteyen ailelere hitap eder.",
    origin: "Arapça",
    pronunciation: "U-bey-de",
    popularity: 1.8,
    popularScore: 1,
    style: "RARE",
    category: "spiritual",
    traits: ["Manevi", "Nadir", "Sakin", "Alçak gönüllü", "Köklü", "Duyarlı", "Zarif"],
  },
  {
    name: "Umay",
    meaningCore: "eski Türk kültüründe çocukları koruyan, bereket ve annelikle ilişkilendirilen kutsal varlık",
    meaningNote:
      "Umay, Türk mitolojisinde çocukları ve anneleri koruyan iyi ruh anlayışıyla bilinen güçlü bir kız ismidir. Anlamı bereket, koruyuculuk, doğurganlık ve aile sıcaklığı gibi olumlu çağrışımlar taşır. Kısa yapısına rağmen kültürel derinliği çok belirgindir. Modern dönemde hem Türkçe kökenli hem de anlamı güçlü isim arayan ailelerin sık ilgisini çeker.",
    introNote:
      "Umay ismi, kısa ama boş durmayan kız isimleri içinde özel bir yere sahiptir. Türk kültürüne yaslanan güçlü arka planı, isme yalnızca güzel bir ses değil, aynı zamanda koruyucu ve sıcak bir hikaye kazandırır. Soyadıyla kolay uyum kurması ve akılda kalıcı olması, onu çağdaş aileler için kullanışlı bir seçenek haline getirir.",
    origin: "Türkçe",
    popularity: 3.8,
    popularScore: 4,
    style: "POPULAR",
    category: "heritage",
    traits: ["Türkçe", "Koruyucu", "Güçlü", "Modern", "Kısa", "Bereketli", "Anne şefkatli"],
  },
  {
    name: "Umayra",
    meaningCore: "uzun ömür, bereket ve canlılık çağrışımıyla kullanılan zarif kız adı",
    meaningNote:
      "Umayra, Arapça kaynaklı Ümeyra/Umayra kullanımlarıyla ilişkilendirilen nadir ve yumuşak tınılı bir kız ismidir. Farklı kaynaklarda anlam açıklamaları değişebilse de isim genellikle canlılık, güzel ömür ve zarif duruş çağrışımıyla değerlendirilir. Türkiye'de yaygın bir ad değildir; bu da onu ayırt edici kılar. Anlamı seçerken kesinlikten çok yerleşik olumlu kullanım alanı dikkate alınmalıdır.",
    introNote:
      "Umayra ismi, modern duyulan ama doğrudan uydurma hissi vermeyen özel seçeneklerden biridir. Uzun olmayan yapısı, melodik sesi ve yumuşak sonu sayesinde kız bebek isimleri arasında nazik bir izlenim bırakır. Nadir isim seven aileler için anlamı açıklanabilir ve günlük hayatta kullanılabilir bir alternatiftir.",
    origin: "Arapça / modern kullanım",
    pronunciation: "U-may-ra",
    popularity: 2.1,
    popularScore: 2,
    style: "RARE",
    category: "modern",
    traits: ["Nadir", "Modern", "Zarif", "Melodik", "Yumuşak", "Pozitif", "Akılda kalıcı"],
  },
  {
    name: "Üftade",
    meaningCore: "gönül vermiş, aşkla bağlanmış ve içten seven kişi",
    meaningNote:
      "Üftade, Farsça kökenli olup gönül düşmüş, sevgiyle bağlanmış ve içtenlik taşıyan kişi anlam alanıyla açıklanır. Klasik edebiyat ve tasavvuf dilinde duygusu derin bir kelime olarak bilinir. Kız ismi olarak kullanıldığında sakin, zarif ve manevi bir hava verir. Yaygın olmayan yapısı nedeniyle seçilirken ailelerin ismin klasik tınısını sevmesi önemlidir.",
    introNote:
      "Üftade ismi, eski kelimelerin şiirsel sıcaklığını seven aileler için çok özel bir tercihtir. İçinde sevgi, bağlılık ve derinlik duygusu taşıdığı için yalnızca farklı duyulmaz; aynı zamanda anlatılabilir bir anlam sunar. Ağırbaşlı ve sanatlı isimlerden hoşlanan ailelerde güçlü bir karşılık bulabilir.",
    origin: "Farsça",
    pronunciation: "Üf-ta-de",
    popularity: 1.9,
    popularScore: 1,
    style: "RARE",
    category: "grace",
    traits: ["Edebi", "Duygusal", "Zarif", "Nadir", "Manevi", "Sanatsal", "Sakin"],
  },
  {
    name: "Ülfet",
    meaningCore: "alışma, dostluk, yakınlık ve içten kaynaşma",
    meaningNote:
      "Ülfet, Arapça kökenli bir isimdir ve yakınlık, dostluk, alışma, samimiyet gibi sıcak anlamlar taşır. Kız ismi olarak kullanıldığında aile bağı, uyum ve gönül yakınlığı hissini öne çıkarır. Eski ama anlaşılır bir kelime olduğu için kültürel hafızası güçlüdür. Fazla gösterişli olmayan, anlamı güzel ve köklü isimlerden biridir.",
    introNote:
      "Ülfet ismi, sıcak ve samimi anlamıyla kız bebek isimleri içinde yumuşak bir karakter taşır. Aileler bu adı seçerken çoğu zaman insan ilişkilerine, gönül yakınlığına ve huzurlu bir kişiliğe gönderme yapan anlamını sever. Klasik tınısı, onu modern isimlerin yanında daha olgun ve güven veren bir seçenek yapar.",
    origin: "Arapça",
    popularity: 2.4,
    popularScore: 2,
    style: "CLASSIC",
    category: "virtue",
    traits: ["Samimi", "Sıcak", "Klasik", "Dost canlısı", "Duyarlı", "Güven veren", "Sakin"],
  },
  {
    name: "Ülfetiye",
    meaningCore: "dostluk ve yakınlıkla ilgili, samimiyet taşıyan kadın",
    meaningNote:
      "Ülfetiye, Ülfet isminin daha klasik ve eski kullanımlı bir uzantısıdır. Anlam olarak dostluk, yakınlık, alışma ve içten bağ kurma fikrini taşır. Türkiye'de nadir duyulan kız isimlerinden biridir; bu yüzden daha çok aile geleneği veya klasik isim zevkiyle tercih edilir. Anlamı olumlu olduğu için veri kalitesi açısından açıklanabilir bir addır.",
    introNote:
      "Ülfetiye ismi, eski kuşakların zarif ve ağırbaşlı adlarını seven ailelere hitap eder. Uzun yapısı ona resmi ve olgun bir hava kazandırırken, anlamı samimiyet ve gönül yakınlığı üzerinden sıcak kalır. Nadir kullanımı nedeniyle ayırt edici bir isim arayanlar için değerlendirilebilir.",
    origin: "Arapça / Türkçe kullanım",
    pronunciation: "Ül-fe-ti-ye",
    popularity: 1.7,
    popularScore: 1,
    style: "RARE",
    category: "classic",
    traits: ["Klasik", "Nadir", "Samimi", "Olgun", "Köklü", "Duyarlı", "Güvenilir"],
  },
  {
    name: "Ülker",
    meaningCore: "Pleiades yıldız kümesi, gökte parlak yıldız topluluğu",
    meaningNote:
      "Ülker, Türkçede gökyüzündeki Pleiades yıldız kümesi için kullanılan köklü bir isimdir. Anlamı parlaklık, yön bulma, gece göğü ve yıldız güzelliğiyle ilişkilidir. Kız ismi olarak uzun yıllardır kullanılan tanıdık ama eskimeyen adlardan biridir. Hem doğa hem gökyüzü çağrışımı taşıdığı için anlamı güçlü ve şiirsel bir seçenek sunar.",
    introNote:
      "Ülker ismi, göksel anlamı olan kız isimleri arayan aileler için klasik ve güvenilir bir tercihtir. Kısa sayılabilecek yapısı, kolay telaffuzu ve parlak çağrışımı sayesinde günlük hayatta rahat kullanılır. Aynı zamanda kültürel olarak tanıdık olduğu için farklı kuşaklar tarafından yadırganmaz.",
    origin: "Türkçe",
    popularity: 3.1,
    popularScore: 3,
    style: "CLASSIC",
    category: "light",
    traits: ["Göksel", "Parlak", "Klasik", "Türkçe", "Zarif", "Güven veren", "Akılda kalıcı"],
  },
  {
    name: "Ülkü",
    meaningCore: "ideal, amaç, ulaşılmak istenen yüce hedef",
    meaningNote:
      "Ülkü, Türkçe kökenli güçlü bir kız ismidir ve ideal, amaç, yüce hedef anlamlarıyla açıklanır. İsmin içinde kararlılık, değer bilinci ve gelecek duygusu belirgindir. Kısa yapısı sayesinde hem sade hem de etkili durur. Türkiye'de bilinen ve kullanılan klasik isimlerden biri olduğu için anlamı kolayca anlatılır.",
    introNote:
      "Ülkü ismi, anlamında hedef ve değer taşıyan isimleri seven aileler için güçlü bir seçenektir. Kulağa net gelir, yazımı sadedir ve çocuk büyüdükçe de ciddiyetini korur. Kız bebek isimleri arasında hem düşünsel hem de karakterli bir hava isteyen ailelere hitap eder.",
    origin: "Türkçe",
    pronunciation: "Ül-kü",
    popularity: 3.3,
    popularScore: 3,
    style: "CLASSIC",
    category: "ideal",
    traits: ["İdealist", "Kararlı", "Güçlü", "Türkçe", "Kısa", "Klasik", "Lider ruhlu"],
  },
  {
    name: "Ülviye",
    meaningCore: "yüce, yüksek, soylu ve manevi değeri olan kadın",
    meaningNote:
      "Ülviye, Arapça kökenli ulvi kelimesinden gelir ve yücelik, yüksek değer, asalet ve manevi incelik anlamlarıyla açıklanır. Kız ismi olarak klasik, ağırbaşlı ve saygın bir duruş taşır. Türkiye'de bilinen eski kuşak isimleri arasında yer alır. Anlamı net ve olumlu olduğu için güçlü isim arayışlarında güvenilir bir seçenektir.",
    introNote:
      "Ülviye ismi, asaleti ve manevi derinliği olan kız isimleri arasında köklü bir yere sahiptir. Aileler bu adı seçerken çoğu zaman yumuşak ama saygın bir karakter hissi arar. Uzun yıllardır kullanılan bir isim olması, onu aile büyükleriyle bağ kurmak isteyenler için de anlamlı kılar.",
    origin: "Arapça",
    pronunciation: "Ül-vi-ye",
    popularity: 2.8,
    popularScore: 2,
    style: "CLASSIC",
    category: "classic",
    traits: ["Asil", "Klasik", "Manevi", "Saygın", "Olgun", "Zarif", "Güvenilir"],
  },
  {
    name: "Ülya",
    meaningCore: "en yüce, en yüksek ve üstün olan",
    meaningNote:
      "Ülya, Arapça kökenli yücelik bildiren bir kız ismidir. Anlamında yüksek mertebe, üstünlük ve seçkinlik fikri bulunur. Türkiye'de nadir ama bilinen kullanımlardan biridir; kısa yapısı onu modern listelerde de okunabilir kılar. Ülviye ile aynı anlam ailesine yakın durduğu için asil ve manevi çağrışımı güçlüdür.",
    introNote:
      "Ülya ismi, kısa ama anlamı ağırbaşlı bir ad arayan aileler için zarif bir alternatiftir. Söylenişi yumuşaktır, yazımı kolaydır ve taşıdığı yücelik anlamı isme güçlü bir kimlik kazandırır. Nadir isimlerden hoşlanan ailelerde sade ama seçkin bir tercih olarak öne çıkabilir.",
    origin: "Arapça",
    pronunciation: "Ül-ya",
    popularity: 2.3,
    popularScore: 2,
    style: "RARE",
    category: "grace",
    traits: ["Asil", "Nadir", "Zarif", "Kısa", "Manevi", "Seçkin", "Sakin"],
  },
  {
    name: "Ümide",
    meaningCore: "umutlu, umut taşıyan ve iyi beklentiyle yaşayan kadın",
    meaningNote:
      "Ümide, Farsça kökenli ümit kelimesiyle aynı anlam ailesindedir ve umut taşıyan kişi şeklinde açıklanır. Kız ismi olarak pozitif, yumuşak ve klasik bir hava verir. Türkiye'de çok yaygın olmasa da anlamı açık olduğu için kolay anlaşılır. Umut, beklenti ve güzel gelecek fikriyle güçlü bir duygusal değer taşır.",
    introNote:
      "Ümide ismi, umut anlamlı kız isimleri arayan ailelere sıcak bir seçenek sunar. İsmin sesi yumuşak, anlamı ise doğrudan pozitiftir. Hem aile içinde sevgiyle söylenebilecek hem de yetişkinlikte doğal durabilecek klasik bir isim etkisi bırakır.",
    origin: "Farsça / Türkçe kullanım",
    pronunciation: "Ü-mi-de",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "virtue",
    traits: ["Umutlu", "Pozitif", "Zarif", "Nadir", "Sakin", "Duygusal", "Güven veren"],
  },
  {
    name: "Ümeyme",
    meaningCore: "küçük anne, şefkatli ve koruyucu kadın",
    meaningNote:
      "Ümeyme, Arapça kökenli nadir bir kız ismidir ve küçük anne anlam alanıyla açıklanır. İsmin içinde şefkat, koruma, aile sıcaklığı ve yumuşaklık çağrışımı vardır. Türkiye'de yaygın değildir; ancak dini ve klasik kaynaklarda bilinen kadın adlarıyla bağlantılıdır. Seçilirken nadirliği ve manevi tınısı birlikte değerlendirilmelidir.",
    introNote:
      "Ümeyme ismi, şefkat ve aile duygusu taşıyan kız isimlerinden hoşlanan aileler için özel bir alternatiftir. Yumuşak heceleri sayesinde ağır anlamına rağmen nazik duyulur. Manevi kökenli ve az kullanılan bir isim arayanlar için güçlü ama sakin bir seçenek olabilir.",
    origin: "Arapça",
    pronunciation: "Ü-mey-me",
    popularity: 1.8,
    popularScore: 1,
    style: "RARE",
    category: "spiritual",
    traits: ["Şefkatli", "Manevi", "Nadir", "Koruyucu", "Zarif", "Sakin", "Aile odaklı"],
  },
  {
    name: "Ümeyra",
    meaningCore: "canlı, uzun ömürlü ve zarif kız adı olarak kullanılan nadir isim",
    meaningNote:
      "Ümeyra, Arapça kökenli Ümeyme ve Umayra kullanımlarıyla yakın tınıda olan nadir bir kız ismidir. Anlam açıklamalarında canlılık, güzel ömür ve zarif görünüş gibi olumlu yorumlar öne çıkar. Türkiye'de çok sık kullanılmadığı için ayırt edici bir etki bırakır. Kesin ve tek anlam iddiası yerine, yerleşik olumlu çağrışımlarıyla değerlendirmek daha doğru olur.",
    introNote:
      "Ümeyra ismi, modern kulağa yakın ama kökenli bir ad arayan aileler için dengeli bir tercihtir. Ü harfiyle başlaması ona yumuşak ve özel bir ses verir. Nadirliği, kız bebek isimleri arasında farklılık isteyen ailelerin ilgisini çekebilir.",
    origin: "Arapça / modern kullanım",
    pronunciation: "Ü-mey-ra",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "modern",
    traits: ["Nadir", "Modern", "Zarif", "Yumuşak", "Pozitif", "Melodik", "Seçkin"],
  },
  {
    name: "Ümniye",
    meaningCore: "dilek, arzu, istek ve gönülden beklenen şey",
    meaningNote:
      "Ümniye, Arapça kökenli olup dilek, arzu ve gönülden istenen şey anlamlarıyla açıklanır. Kız ismi olarak umut, beklenti ve içten temenni duygusunu taşır. Klasik tınılı ve nadir kullanılan bir addır. Anlamı kolay anlatılabildiği için ailelerin manevi ve duygusal bağ kurabileceği seçeneklerden biridir.",
    introNote:
      "Ümniye ismi, dilek ve güzel beklenti anlamı taşıyan kız isimlerini seven ailelere hitap eder. Söylenişi eski ama nazik bir hava verir; bu da ismi ayırt edici kılar. Çok popüler olmayan, fakat anlamı sıcak ve açıklanabilir bir isim arayanlar için değerlendirilebilir.",
    origin: "Arapça",
    pronunciation: "Üm-ni-ye",
    popularity: 1.9,
    popularScore: 1,
    style: "RARE",
    category: "virtue",
    traits: ["Umutlu", "Dilekli", "Nadir", "Klasik", "Duygusal", "Zarif", "Sakin"],
  },
  {
    name: "Ümran",
    meaningCore: "bayındırlık, gelişme, refah ve medeniyet",
    meaningNote:
      "Ümran, Arapça kökenli güçlü bir isimdir ve bayındırlık, gelişme, refah, mamurluk gibi anlamlarla açıklanır. Kız ismi olarak Türkiye'de bilinen ve kullanılan klasik adlardan biridir. Anlamı yalnızca güzel bir duygu değil, aynı zamanda üretkenlik ve düzen fikri taşır. Bu yönüyle olgun, güven veren ve kültürel arka planı güçlü bir isimdir.",
    introNote:
      "Ümran ismi, klasik ama anlamı güçlü kız isimleri arayan aileler için dengeli bir tercihtir. Refah ve gelişme çağrışımı, isme olumlu ve yapıcı bir karakter kazandırır. Kısa sayılabilecek yapısı sayesinde soyadıyla birlikte çoğu zaman akıcı durur.",
    origin: "Arapça",
    pronunciation: "Üm-ran",
    popularity: 3.0,
    popularScore: 3,
    style: "CLASSIC",
    category: "virtue",
    traits: ["Gelişim odaklı", "Klasik", "Güven veren", "Olgun", "Pozitif", "Köklü", "Kararlı"],
  },
  {
    name: "Ümmü",
    meaningCore: "anne, ana ve bir şeyin aslı anlam alanı",
    meaningNote:
      "Ümmü, Arapça kökenli ümm kelimesinden gelir ve anne, ana, kaynak anlamlarıyla ilişkilendirilir. Türkiye'de daha çok birleşik kadın isimlerinin başında görülse de tek başına da kız adı olarak kullanılabilir. Anlamı annelik, köken ve şefkat duygusunu taşır. Kısa ve manevi tınılı olduğu için sade ama güçlü bir isimdir.",
    introNote:
      "Ümmü ismi, kısa ve manevi anlamlı kız isimleri arasında özel bir yere sahiptir. İçinde annelik ve koruyuculuk çağrışımı taşıdığı için sıcak bir aile duygusu verir. Geleneksel isimleri seven aileler için yalın ama anlamı yoğun bir seçenek olabilir.",
    origin: "Arapça",
    pronunciation: "Üm-mü",
    popularity: 2.2,
    popularScore: 2,
    style: "CLASSIC",
    category: "spiritual",
    traits: ["Anne şefkatli", "Manevi", "Kısa", "Klasik", "Koruyucu", "Sıcak", "Köklü"],
  },
  {
    name: "Ümmü Gülsüm",
    meaningCore: "gül yüzlü, dolgun yanaklı ve anne şefkatiyle ilişkilendirilen klasik kadın adı",
    meaningNote:
      "Ümmü Gülsüm, Arapça kökenli iki parçalı klasik bir kız ismidir. İslam kültüründe bilinen kadın adlarından biri olduğu için manevi ve tarihi çağrışımı güçlüdür. Anlam alanında annelik ifadesiyle birlikte güzellik, zarafet ve sıcak yüzlülük fikri bulunur. Türkiye'de özellikle geleneksel ve dini hassasiyeti olan aileler tarafından tanınır.",
    introNote:
      "Ümmü Gülsüm ismi, manevi değeri ve tarihsel bağı belirgin olan kız isimleri arasında yer alır. Uzun ve klasik yapısı nedeniyle güçlü bir aile geleneği hissi verir. Bu adı seçen aileler genellikle köklü, saygın ve anlamı anlatılabilir bir isim arar.",
    origin: "Arapça",
    pronunciation: "Üm-mü Gül-süm",
    popularity: 2.9,
    popularScore: 3,
    style: "CLASSIC",
    category: "spiritual",
    traits: ["Manevi", "Klasik", "Tarihi", "Zarif", "Saygın", "Aile bağları güçlü", "Köklü"],
  },
  {
    name: "Ümmügül",
    meaningCore: "gülün annesi, gül gibi güzel ve şefkatli kadın",
    meaningNote:
      "Ümmügül, Arapça Ümmü ile Farsça gül kelimesinin Türkçedeki birleşik kullanımından oluşur. Anlamında annelik, şefkat, gül güzelliği ve zarafet çağrışımları bir araya gelir. Türkiye'de klasik kadın isimleri arasında yer alır, ancak günümüzde daha nadir duyulur. Anlamı sıcak ve kolay açıklanabilir olduğu için aile geleneğiyle uyumlu bir seçenektir.",
    introNote:
      "Ümmügül ismi, çiçek çağrışımıyla manevi sıcaklığı birleştiren klasik kız adlarından biridir. İçinde hem anne şefkati hem de gül zarafeti bulunduğu için yumuşak ve sevgi dolu bir etki bırakır. Daha geleneksel isimleri seven aileler için anlamı güçlü bir alternatif olabilir.",
    origin: "Arapça / Farsça / Türkçe kullanım",
    pronunciation: "Üm-mü-gül",
    popularity: 2.3,
    popularScore: 2,
    style: "CLASSIC",
    category: "spiritual",
    traits: ["Şefkatli", "Çiçeksi", "Klasik", "Manevi", "Zarif", "Sıcak", "Duygusal"],
  },
  {
    name: "Ümmühan",
    meaningCore: "han annesi, soylu ve saygın kadın",
    meaningNote:
      "Ümmühan, Arapça Ümmü ile Türkçe han unsurunun birleştiği köklü bir kız ismidir. Anlamında annelik, soyluluk, saygınlık ve güçlü aile büyüğü çağrışımı vardır. Türkiye'de bilinen klasik kadın isimlerinden biridir. Hem manevi hem de Türkçe tarihsel tını taşıdığı için karakterli bir seçenek sunar.",
    introNote:
      "Ümmühan ismi, güçlü ve saygın kız isimleri arayan aileler için geleneksel bir tercihtir. Söylenişi tok, anlamı ise aile ve asalet duygusuyla ilişkilidir. Kardeş isimleriyle birlikte kullanıldığında özellikle klasik ve köklü adlarla doğal uyum kurar.",
    origin: "Arapça / Türkçe",
    pronunciation: "Üm-mü-han",
    popularity: 2.7,
    popularScore: 2,
    style: "CLASSIC",
    category: "heritage",
    traits: ["Asil", "Klasik", "Güçlü", "Manevi", "Köklü", "Saygın", "Aile odaklı"],
  },
  {
    name: "Ünzile",
    meaningCore: "indirilen, gönderilen ve manevi bildirişle ilişkilendirilen ad",
    meaningNote:
      "Ünzile, Arapça kökenli olup indirilmek, gönderilmek anlam alanıyla ilişkilendirilir. Türkçede kız ismi olarak özellikle klasik ve manevi tınısıyla bilinir. Anlamı dini bir çağrışım taşısa da doğrudan Kur'an'da özel isim olarak geçtiği söylenmemelidir. Derin, sakin ve anlamı açıklanabilir bir isim arayan aileler için değerlendirilebilir.",
    introNote:
      "Ünzile ismi, manevi çağrışımı güçlü ve eski tınılı kız isimleri arasında yer alır. Sakin bir sesi vardır, fakat taşıdığı anlam nedeniyle yüzeysel durmaz. Klasik isimleri seven aileler için hem tanıdık hem de özel bir seçenek olabilir.",
    origin: "Arapça",
    pronunciation: "Ün-zi-le",
    popularity: 2.6,
    popularScore: 2,
    style: "CLASSIC",
    category: "spiritual",
    traits: ["Manevi", "Klasik", "Sakin", "Derin", "Köklü", "Duyarlı", "Güven veren"],
  },
  {
    name: "Ürkiye",
    meaningCore: "yükselme, ilerleme ve yücelme anlam alanıyla ilişkilendirilen klasik ad",
    meaningNote:
      "Ürkiye, Arapça kökenli rüku/terakki anlam ailesiyle ilişkilendirilen eski kullanımlı bir kız ismidir. Türkiye'de çok yaygın değildir; daha çok klasik ve yöresel adlar arasında görülür. Anlam açıklamalarında yükselme, ilerleme ve değer kazanma fikri öne çıkar. Nadirliği nedeniyle seçilirken telaffuzunun aileye doğal gelmesi önemlidir.",
    introNote:
      "Ürkiye ismi, eski ve köklü kız isimleriyle bağ kurmak isteyen aileler için nadir bir alternatiftir. Güncel isim listelerinde sık görünmez, bu yüzden ayırt edici bir karakter taşır. Anlamındaki yükseliş ve değer fikri, isme olumlu bir yön kazandırır.",
    origin: "Arapça / Türkçe kullanım",
    pronunciation: "Ür-ki-ye",
    popularity: 1.7,
    popularScore: 1,
    style: "RARE",
    category: "classic",
    traits: ["Nadir", "Klasik", "Köklü", "Olgun", "Kararlı", "Güvenilir", "Ağırbaşlı"],
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

function scoreSimilarity(a: UGirlNameInput, b: UGirlNameInput) {
  let score = 0;
  if (a.category === b.category) score += 8;
  if (a.style === b.style) score += 4;
  if (isShortName(a.name) === isShortName(b.name)) score += 2;
  score += Math.max(0, 4 - Math.abs(a.popularity - b.popularity));
  if (a.origin.split("/")[0].trim() === b.origin.split("/")[0].trim()) score += 2;
  if (a.name.slice(0, 2).toLocaleLowerCase("tr-TR") === b.name.slice(0, 2).toLocaleLowerCase("tr-TR")) score += 3;
  return score;
}

function similarNamesFor(input: UGirlNameInput) {
  return U_GIRL_NAME_INPUTS.filter((candidate) => candidate.name !== input.name)
    .map((candidate) => ({ candidate, score: scoreSimilarity(input, candidate) }))
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name, "tr-TR"))
    .slice(0, 10)
    .map(({ candidate }) => candidate.name);
}

export const U_GIRL_NAME_SEED: BabyNameSeed[] = U_GIRL_NAME_INPUTS.map((input, index) => ({
  id: `u-girl-${index + 1}`,
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
