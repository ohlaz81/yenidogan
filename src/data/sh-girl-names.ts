import type { BabyNameSeed } from "@/types/baby-name-seed";
import type { NameStyle } from "@/types/database";

type ShGirlNameInput = {
  name: string;
  meaning: string;
  intro: string;
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
    | "love";
  inQuran?: boolean;
  quranReference?: string | null;
};

const SH_GIRL_NAME_INPUTS: ShGirlNameInput[] = [
  {
    name: "Şadiye",
    meaning:
      "Şadiye, sevinçli, neşeli ve gönlü ferah kadın anlamıyla bilinen Arapça kökenli bir kız ismidir. İsim, mutluluğu yalnızca anlık bir duygu olarak değil, çevresine de sıcaklık veren bir karakter hâli olarak çağrıştırır. Türkiye'de özellikle klasik isim zevkinde karşılığı olan, anlamı açık ve olumlu bir addır. Kız bebek isimleri içinde neşe, içtenlik ve iyi dilek taşıyan seçeneklerden biri olarak değerlendirilebilir.",
    intro:
      "Şadiye ismi, eski kuşaklardan bugüne taşınan ama anlamındaki sevinç sayesinde yumuşaklığını koruyan bir seçenektir. Aileler bu adı tercih ederken genellikle sıcak, güler yüzlü ve köklü bir isim etkisi arar. Telaffuzu kolaydır; kardeş isimleriyle yan yana geldiğinde klasik ve huzurlu bir bütünlük kurar.",
    origin: "Arapça",
    popularity: 2.3,
    popularScore: 2,
    style: "CLASSIC",
    category: "virtue",
    traits: ["Neşeli", "Klasik", "İçten", "Sıcak", "Köklü", "Pozitif"],
  },
  {
    name: "Şahane",
    meaning:
      "Şahane, görkemli, çok güzel ve beğeni uyandıran şey anlamındaki Farsça kökenli kelimeyle ilişkilendirilen bir kız ismidir. Ad olarak kullanıldığında yalnızca gösterişli bir güzelliği değil, özenli ve seçkin bir duruşu da hatırlatır. Günlük Türkçede anlamı kolay kavrandığı için ismin çağrışımı nettir. Bu yönüyle anlamı güzel, dikkat çekici ama anlaşılır kız isimleri arasında yer alır.",
    intro:
      "Şahane ismi kulağa parlak, özgüvenli ve akılda kalıcı gelir. Çok yaygın olmayan ama anlamı hemen hissedilen bir ad arayan aileler için farklı bir alternatif oluşturur. İsmin zarif tarafı, güçlü tınısını yumuşatarak onu kız bebekler için dengeli bir seçenek hâline getirir.",
    origin: "Farsça / Türkçe kullanım",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "grace",
    traits: ["Zarif", "Gösterişli", "Nadir", "Özgüvenli", "Asil", "Akılda kalıcı"],
  },
  {
    name: "Şaheser",
    meaning:
      "Şaheser, üstün nitelikli eser, başyapıt ve çok değerli güzellik anlamlarıyla kullanılan Farsça kökenli bir addır. Kız ismi olarak kullanıldığında ailelerin çocuklarına yüklediği kıymet, özen ve benzersizlik duygusunu taşır. Anlamı mecazlı olsa da Türkçede yerleşik ve anlaşılırdır. Bu nedenle özel anlamlı, sanatsal çağrışımı güçlü kız isimleri içinde dikkat çeker.",
    intro:
      "Şaheser ismi, sıradanlıktan uzak ama anlamı kapalı olmayan bir ad isteyen ailelere hitap eder. İsmin içinde sanat, değer ve özen duygusu vardır; bu da ona zarif bir ağırlık kazandırır. Uzun yapısına rağmen söylenişi belirgindir ve klasik isimlerle de modern seçimlerle de uyum kurabilir.",
    origin: "Farsça",
    pronunciation: "Şa-he-ser",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "grace",
    traits: ["Sanatsal", "Değerli", "Nadir", "Asil", "Zarif", "Güçlü"],
  },
  {
    name: "Şahika",
    meaning:
      "Şahika, zirve, doruk ve yüksek tepe anlamlarıyla bilinen Arapça kökenli bir kız ismidir. İsim, yükseklik imgesi üzerinden başarı, ideallere ulaşma ve güçlü duruş çağrışımı yapar. Türkiye'de kullanılan köklü kadın adlarından biridir ve anlamı net biçimde açıklanabilir. Kız bebek isimleri arasında asil, kararlı ve hedef duygusu veren seçeneklerden biri olarak öne çıkar.",
    intro:
      "Şahika ismi güçlü karakterli ve klasik tınılı adları seven aileler için etkileyici bir tercihtir. Doruk anlamı, isme sadece güzellik değil aynı zamanda yükselme ve kendini aşma hissi kazandırır. Kardeş isimleriyle birlikte kullanıldığında özellikle asil ve köklü adlarla doğal bir uyum yakalar.",
    origin: "Arapça",
    popularity: 2.6,
    popularScore: 2,
    style: "CLASSIC",
    category: "virtue",
    traits: ["Güçlü", "Kararlı", "Asil", "Klasik", "Hedef odaklı", "Özgüvenli"],
  },
  {
    name: "Şahinde",
    meaning:
      "Şahinde, şahin kelimesiyle ilişkili olarak çevik, keskin bakışlı ve güçlü duruşlu kadın anlam alanında kullanılan bir addır. Farsça ve Türkçe kullanım çizgisinde yer alan isim, doğrudan doğa ve güç çağrışımı taşır. Kız ismi olarak seçildiğinde zarafetin yanında cesaret ve dikkat hissi verir. Anlamı belirgin olduğu için karakterli ve köklü isimler arasında değerlendirilebilir.",
    intro:
      "Şahinde ismi, yumuşak bitişine rağmen güçlü bir ses taşır. Geleneksel isimlerden hoşlanan ama adı daha ayırt edici olsun isteyen aileler için uygun bir seçenektir. İsmin doğa çağrışımı, kardeş önerilerinde hem klasik hem de güçlü tınılı adlarla iyi eşleşmesini sağlar.",
    origin: "Farsça / Türkçe kullanım",
    pronunciation: "Şa-hin-de",
    popularity: 2.1,
    popularScore: 1,
    style: "RARE",
    category: "nature",
    traits: ["Güçlü", "Dikkatli", "Köklü", "Nadir", "Cesur", "Asil"],
  },
  {
    name: "Şahnaz",
    meaning:
      "Şahnaz, hükümdara yakışır naz, seçkin incelik ve zarif eda anlam alanıyla bilinen Farsça kökenli bir kız ismidir. Klasik Türk musikisinde de karşılığı bulunan bu ad, melodik ve estetik bir çağrışım taşır. İsimde nazlı bir zarafet kadar asil bir duruş da hissedilir. Türkiye'de kadın adı olarak kullanılan, anlamı ve sesi uyumlu seçeneklerden biridir.",
    intro:
      "Şahnaz ismi, sanatla ve klasik zarafetle temas eden adları seven ailelerin kısa listesine girebilir. Kulağa melodik gelir; bu yüzden yalnızca anlamıyla değil sesiyle de hatırlanır. Aileler için hem geleneksel hem de seçkin bir isim etkisi sunar.",
    origin: "Farsça",
    pronunciation: "Şah-naz",
    popularity: 2.6,
    popularScore: 2,
    style: "CLASSIC",
    category: "sound",
    traits: ["Zarif", "Sanatsal", "Asil", "Klasik", "Nazlı", "Melodik"],
  },
  {
    name: "Şahsenem",
    meaning:
      "Şahsenem, şah ve senem unsurlarını birleştirerek seçkin güzellik, çok sevilen güzel ve değerli sevgili anlamlarını çağrıştıran Farsça kökenli bir addır. İsim, eski edebiyat ve halk anlatılarındaki romantik tınıya yakın durur. Kız ismi olarak kullanıldığında sevgi, güzellik ve asalet duygularını birlikte taşır. Anlamı açık biçimde olumlu olduğu için klasik ve şiirsel kız isimleri arasında değerlendirilebilir.",
    intro:
      "Şahsenem ismi uzun ama akıcı bir yapıya sahiptir; bu da ona masalsı bir hava verir. Romantik, köklü ve farklı duyulan isimleri seven aileler için güçlü bir alternatiftir. Kardeş isimleriyle yan yana geldiğinde özellikle Farsça kökenli ve zarif adlarla iyi bir uyum kurar.",
    origin: "Farsça",
    pronunciation: "Şah-se-nem",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "love",
    traits: ["Romantik", "Zarif", "Asil", "Nadir", "Duygulu", "Şiirsel"],
  },
  {
    name: "Şayeste",
    meaning:
      "Şayeste, layık, uygun, değer verilen ve yakışır anlamlarıyla bilinen Farsça kökenli bir kız ismidir. İsim, ölçülü bir beğeni ve hak edilmiş kıymet duygusu taşır. Gösterişli olmadan seçkin duran anlamı sayesinde güven veren bir karaktere sahiptir. Türkiye'de kullanılan eski ve zarif kadın adları içinde anlamı en temiz seçeneklerden biridir.",
    intro:
      "Şayeste ismi sakin, olgun ve asil bir etki bırakır. Aileler bu adı seçerken genellikle abartısız ama derinlikli bir anlam arar. Sesindeki yumuşaklık, ismi hem klasik kız isimleriyle hem de daha nadir seçeneklerle uyumlu hâle getirir.",
    origin: "Farsça",
    popularity: 2.2,
    popularScore: 2,
    style: "CLASSIC",
    category: "virtue",
    traits: ["Değerli", "Olgun", "Asil", "Zarif", "Klasik", "Dengeli"],
  },
  {
    name: "Şaziye",
    meaning:
      "Şaziye, sevinçli, neşeli ve mutlu kadın anlamıyla açıklanan Arapça kökenli bir addır. Şadiye ile aynı olumlu duygu alanına yakın durur; ancak daha nadir ve eski tınılı bir kullanım hissi verir. İsim, iç ferahlığı ve hayatı iyi tarafından görme çağrışımı taşır. Anlamı açık ve olumlu olduğu için veri kalitesi açısından güvenilir kız isimleri arasına alınabilir.",
    intro:
      "Şaziye ismi, klasik isimlerdeki köklü havayı seven aileler için sıcak bir seçenektir. Nadir duyulması ona özel bir karakter kazandırırken anlamındaki neşe ismi ağırlaştırmaz. Kardeş isimlerinde Şadiye, Şükriye ve Şefika gibi klasik adlarla doğal bir uyum yakalar.",
    origin: "Arapça",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "virtue",
    traits: ["Neşeli", "Nadir", "Köklü", "Sıcak", "Pozitif", "Klasik"],
  },
  {
    name: "Şebnem",
    meaning:
      "Şebnem, gece nemi, çiy ve sabahın erken saatlerinde bitkilerin üzerinde görülen su damlası anlamına gelen Farsça kökenli bir kız ismidir. İsim, tazelik, incelik ve doğanın sessiz güzelliğiyle ilişkilendirilir. Türkiye'de uzun süredir kullanılan, tanıdık ve zarif kadın adlarından biridir. Anlamı hem somut hem de şiirsel olduğu için doğa çağrışımlı kız isimleri içinde güçlü bir yere sahiptir.",
    intro:
      "Şebnem ismi, kulağa yumuşak gelen ve anlamı ferah olan adları seven aileler için çok doğal bir tercihtir. Çiy damlası imgesi, isme narin ama canlı bir karakter kazandırır. Hem klasik hem de güncel duyulabilmesi, onu kardeş isimleriyle uyumlu kılan önemli bir avantajdır.",
    origin: "Farsça",
    pronunciation: "Şeb-nem",
    popularity: 3.4,
    popularScore: 3,
    style: "CLASSIC",
    category: "nature",
    traits: ["Zarif", "Doğal", "Ferah", "Klasik", "Narin", "Şiirsel"],
  },
  {
    name: "Şefika",
    meaning:
      "Şefika, şefkatli, merhamet eden ve incelikle koruyan kadın anlamıyla bilinen Arapça kökenli bir kız ismidir. İsim, duygusal sıcaklık ve güven veren bir karakter çağrışımı taşır. Türkiye'de klasik kadın adları arasında yerleşmiş, anlamı bilinen ve kolay açıklanan bir seçenektir. Merhamet ve duyarlılık temasını öne çıkaran aileler için güçlü bir anlam sunar.",
    intro:
      "Şefika ismi, yumuşak huylu ve köklü isimleri seven ailelerin rahatlıkla değerlendirebileceği bir addır. Telaffuzunda sakin bir akış, anlamında ise koruyucu bir sıcaklık vardır. Kardeş önerilerinde özellikle Rahime, Refika ve Şükriye gibi klasik adlarla uyumlu bir çizgi oluşturur.",
    origin: "Arapça",
    pronunciation: "Şe-fi-ka",
    popularity: 2.5,
    popularScore: 2,
    style: "CLASSIC",
    category: "virtue",
    traits: ["Şefkatli", "Merhametli", "Klasik", "Sakin", "Güven veren", "Duyarlı"],
  },
  {
    name: "Şehbal",
    meaning:
      "Şehbal, büyük kanat, güçlü kanat ve kuşun geniş kanadı anlamlarıyla bilinen Farsça kökenli bir addır. Kız ismi olarak kullanıldığında özgürlük, koruyuculuk ve yükselme çağrışımı verir. Anlamı mecazlı ama anlaşılır olduğu için şiirsel isimleri seven ailelere hitap eder. Türkiye'de nadir duyulan, buna rağmen kökü ve anlamı belirgin olan bir kız ismidir.",
    intro:
      "Şehbal ismi, farklı ama ağırbaşlı bir ad arayan aileler için zarif bir seçenektir. Kanat imgesi, isme hem hareket hem de koruma duygusu kazandırır. Kardeş isimlerinde doğa, gökyüzü ve klasik Farsça tınılı adlarla güzel bir uyum yakalar.",
    origin: "Farsça",
    pronunciation: "Şeh-bal",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "nature",
    traits: ["Özgür", "Şiirsel", "Nadir", "Güçlü", "Koruyucu", "Zarif"],
  },
  {
    name: "Şehime",
    meaning:
      "Şehime, ağırbaşlı, vakur ve saygın duruşlu kadın anlam alanıyla açıklanan Arapça kökenli bir addır. İsim, ölçülü davranış, olgunluk ve karakter sağlamlığı çağrışımı taşır. Yaygınlığı düşük olsa da geleneksel isim kaynaklarında kadın adı olarak karşılığı bulunan bir seçenektir. Kız bebek isimleri içinde ciddi, köklü ve anlamı güçlü bir alternatif olarak değerlendirilebilir.",
    intro:
      "Şehime ismi, gösterişten uzak ama güçlü bir karakter taşıyan adları seven ailelere hitap eder. Sesinde eski zamanlardan gelen sakin bir zarafet vardır. Özellikle klasik kardeş isimleriyle kullanıldığında dengeli ve saygın bir bütünlük oluşturur.",
    origin: "Arapça",
    pronunciation: "Şe-hi-me",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "virtue",
    traits: ["Ağırbaşlı", "Olgun", "Köklü", "Nadir", "Saygın", "Dengeli"],
  },
  {
    name: "Şehla",
    meaning:
      "Şehla, ela gözlü, bakışı etkileyici veya hafif mahmur bakışlı kadın anlamlarıyla kullanılan Arapça kökenli bir kız ismidir. Klasik kaynaklarda göz güzelliği ve bakış ifadesiyle ilişkilendirilir; bu nedenle anlamı estetik bir çağrışım taşır. Türkiye'de bilinen kadın adlarından biridir ve özellikle zarif tınısıyla hatırlanır. Anlam yorumunda kesin güzellik iddiasından çok yerleşik bakış ve göz rengi çağrışımı öne çıkar.",
    intro:
      "Şehla ismi kısa, yumuşak ve klasik bir ses taşır. Farklı ama tanınabilir bir kız ismi arayan aileler için ölçülü bir alternatif olabilir. İsmin göz ve bakış çağrışımı, ona zarif ve biraz da şiirsel bir hava kazandırır.",
    origin: "Arapça",
    popularity: 2.4,
    popularScore: 2,
    style: "CLASSIC",
    category: "grace",
    traits: ["Zarif", "Kısa", "Klasik", "Estetik", "Sakin", "Şiirsel"],
  },
  {
    name: "Şehnaz",
    meaning:
      "Şehnaz, nazlı, seçkin ve zarif edalı kadın anlam alanıyla bilinen Farsça kökenli bir kız ismidir. Şahnaz biçimiyle yakın akraba olan bu ad, klasik musikideki makam çağrışımı sayesinde melodik bir değer de taşır. İsimde asalet, incelik ve sanatsal bir hava birlikte hissedilir. Türkiye'de kullanılan, anlamı bilinen ve kız ismi olarak doğal karşılığı olan seçeneklerden biridir.",
    intro:
      "Şehnaz ismi, klasik ama hâlâ zarif duyulan adlardan hoşlanan ailelere hitap eder. Naz ve müzik çağrışımı, isme yumuşak bir estetik kazandırır. Kardeş isimleriyle birlikte özellikle Şebnem, Şermin ve Şahnaz çizgisindeki adlarla güçlü bir uyum verir.",
    origin: "Farsça",
    pronunciation: "Şeh-naz",
    popularity: 2.8,
    popularScore: 2,
    style: "CLASSIC",
    category: "sound",
    traits: ["Zarif", "Sanatsal", "Klasik", "Nazlı", "Asil", "Melodik"],
  },
  {
    name: "Şehrazat",
    meaning:
      "Şehrazat, şehir soylusu, özgür ve anlatıcılığıyla bilinen kadın anlam alanına bağlanan Farsça kökenli bir addır. Binbir Gece Masalları'ndaki güçlü kültürel çağrışımı nedeniyle hikâye, zeka ve zarafet duygularını birlikte taşır. Türkiye'de kadın adı olarak bilinen ve kullanılan özel isimlerden biridir. Anlamı yalnızca kelime kökleriyle değil, edebî hafızadaki karakteriyle de güç kazanır.",
    intro:
      "Şehrazat ismi, masalsı ve entelektüel tınısı olan adları seven aileler için dikkat çekici bir tercihtir. Uzun bir isimdir ama akışı güçlü olduğu için kolay hatırlanır. Kardeş isimlerinde sanatsal, klasik ve özgün adlarla yan yana geldiğinde zengin bir bütünlük kurar.",
    origin: "Farsça",
    pronunciation: "Şeh-ra-zat",
    popularity: 2.7,
    popularScore: 2,
    style: "CLASSIC",
    category: "classic",
    traits: ["Sanatsal", "Zeki", "Masalsı", "Klasik", "Güçlü", "Özgün"],
  },
  {
    name: "Şehri",
    meaning:
      "Şehri, şehirle ilgili, şehirli veya yerleşik hayatla bağı olan anlam alanında kullanılan Farsça kökenli eski bir kadın adıdır. İsim, tarihî ve kültürel bir çevre duygusu taşır; modern kullanımda nadir kalmıştır. Anlamı kısa görünse de kökü anlaşılır ve Türkçedeki şehir kelimesiyle bağlantısı kolay kurulur. Bu nedenle köklü ama az duyulan kız isimleri arasında yer alabilir.",
    intro:
      "Şehri ismi kısa yapısına rağmen tarihî bir tını bırakır. Çok yaygın olmayan, sade ve eski zevkli bir ad arayan aileler için farklı bir seçenektir. Kardeş isimleriyle uyumda özellikle Şehriban, Şehrinaz ve klasik Farsça adlarla aynı aileden bir his verir.",
    origin: "Farsça / Türkçe kullanım",
    pronunciation: "Şeh-ri",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "classic",
    traits: ["Kısa", "Köklü", "Nadir", "Sade", "Tarihî", "Dengeli"],
  },
  {
    name: "Şehriban",
    meaning:
      "Şehriban, şehir hanımı, seçkin kadın veya bulunduğu yere değer katan kadın anlam alanıyla açıklanan Farsça kökenli bir kız ismidir. İsimde hem toplumsal saygınlık hem de zarif bir sahiplenme duygusu bulunur. Türkiye'de özellikle Doğu ve klasik isim geleneğinde bilinen kadın adlarından biridir. Anlamı asil, köklü ve aile bağlarıyla uyumlu bir çağrışım taşır.",
    intro:
      "Şehriban ismi güçlü, uzun ve geleneksel bir kız ismi arayan ailelere hitap eder. Söylenişindeki akış, ismi ağır olmaktan çıkarıp sıcak bir hâle getirir. Kardeş isimlerinde hem klasik kız adlarıyla hem de anlamı güçlü erkek adlarıyla dengeli durur.",
    origin: "Farsça",
    pronunciation: "Şeh-ri-ban",
    popularity: 2.7,
    popularScore: 2,
    style: "CLASSIC",
    category: "classic",
    traits: ["Asil", "Köklü", "Güçlü", "Klasik", "Sıcak", "Saygın"],
  },
  {
    name: "Şehrinaz",
    meaning:
      "Şehrinaz, şehir ve naz unsurlarının birleşimiyle şehirli zarafet, seçkin eda ve nazlı güzellik anlamlarını çağrıştıran Farsça kökenli bir addır. Kız ismi olarak kullanıldığında hem yerleşik kültür hem de ince bir estetik duygusu verir. Yaygınlığı sınırlı olsa da anlamı çözümlenebilir ve kadın adı olarak doğal bir tınıya sahiptir. Ş harfiyle başlayan zarif ve klasik isimler içinde özel bir seçenek oluşturur.",
    intro:
      "Şehrinaz ismi melodik ve süslü bir akışa sahiptir. Farklı duyulsun ama köksüz görünmesin isteyen aileler için iyi bir denge sunar. Nazlı ve asil çağrışımı, onu Şehnaz ve Şahnaz gibi isimlerle yakın bir uyum çizgisine yerleştirir.",
    origin: "Farsça",
    pronunciation: "Şeh-ri-naz",
    popularity: 2.2,
    popularScore: 2,
    style: "RARE",
    category: "grace",
    traits: ["Nazlı", "Zarif", "Asil", "Nadir", "Melodik", "Klasik"],
  },
  {
    name: "Şehvar",
    meaning:
      "Şehvar, değerli, seçkin ve güzel olan anlam alanıyla ilişkilendirilen Farsça kökenli bir kız ismidir. Eski kullanımda kıymet ve zarafet duygusunu birlikte taşıyan adlar arasında görülür. Türkiye'de çok sık duyulmasa da kadın adı olarak anlamı bilinen ve açıklanabilir bir seçenektir. Nadir kız isimleri içinde köklü, sade ve asil bir duruş sunar.",
    intro:
      "Şehvar ismi kısa sayılabilecek yapısı ve seçkin tınısıyla dikkat çeker. Aileler bu adı tercih ederken genellikle az duyulan ama anlamı zayıf olmayan bir isim arar. Kardeş isimleriyle uyumda özellikle Farsça kökenli ve zarif adlarla doğal bir bütünlük kurar.",
    origin: "Farsça",
    pronunciation: "Şeh-var",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "grace",
    traits: ["Değerli", "Nadir", "Asil", "Zarif", "Sade", "Köklü"],
  },
  {
    name: "Şekibe",
    meaning:
      "Şekibe, sabırlı, dayanıklı ve tahammül gücü olan kadın anlamıyla bilinen Farsça kökenli bir addır. İsim, zor zamanlarda metanetli kalabilme ve sakin bir güç taşıma çağrışımı yapar. Türkiye'de eski ve nadir kadın adları arasında yer alır; anlamı ise oldukça açıktır. Erdemli ve karakterli kız isimleri arayan aileler için güvenilir bir alternatif olabilir.",
    intro:
      "Şekibe ismi, gösterişli bir parlaklıktan çok iç kuvveti anlatan adları seven ailelere uygundur. Sakin ses yapısı, anlamındaki sabır duygusunu destekler. Kardeş isimleriyle birlikte kullanıldığında Sabire, Şefika ve Şükriye gibi köklü adlarla uyumlu bir çizgi verir.",
    origin: "Farsça",
    pronunciation: "Şe-ki-be",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "virtue",
    traits: ["Sabırlı", "Dayanıklı", "Sakin", "Nadir", "Köklü", "Kararlı"],
  },
  {
    name: "Şelale",
    meaning:
      "Şelale, yüksekten dökülen su, çağlayan ve güçlü su akışı anlamına gelen Türkçede yerleşik bir kelimedir. Kız ismi olarak doğa, canlılık, berraklık ve hareket duygularını taşır. Anlamı herkes tarafından kolayca anlaşılır ve olumlu bir görsel çağrışım oluşturur. Doğa temalı kız isimleri içinde ferah, güçlü ve akılda kalıcı bir seçenektir.",
    intro:
      "Şelale ismi, suyun enerjisini ve tazeliğini taşıyan adları seven aileler için canlı bir tercihtir. Hem modern hem de doğal duyulur; bu yüzden şehirli ve sade isim listelerine kolayca girer. Kardeş isimlerinde Irmak, Deniz, Pınar ve Su temalı adlarla güzel bir uyum sağlar.",
    origin: "Türkçe",
    pronunciation: "Şe-la-le",
    popularity: 2.5,
    popularScore: 2,
    style: "MODERN",
    category: "water",
    traits: ["Ferah", "Doğal", "Canlı", "Akıcı", "Güçlü", "Modern"],
  },
  {
    name: "Şemse",
    meaning:
      "Şemse, güneşle ilişkili, güneş gibi aydınlık ve parlak anlam alanıyla kullanılan Arapça kökenli bir kız ismidir. Şems kökünün kadın adı olarak yumuşayan biçimlerinden biri kabul edilir. İsim, sıcaklık, ışık ve hayat veren enerji çağrışımı taşır. Nadir duyulmasına rağmen anlamı belirgin olduğu için aydınlık temalı kız isimleri arasında değerlendirilebilir.",
    intro:
      "Şemse ismi kısa, sıcak ve manevi tınısı olan bir seçenektir. Güneş çağrışımı sayesinde hem pozitif hem de güçlü bir hava verir. Aileler için nadir ama kolay açıklanabilen bir Ş harfi ismi olarak öne çıkabilir.",
    origin: "Arapça",
    pronunciation: "Şem-se",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "light",
    traits: ["Aydınlık", "Sıcak", "Nadir", "Kısa", "Pozitif", "Manevi"],
  },
  {
    name: "Şemsinur",
    meaning:
      "Şemsinur, güneş anlamındaki şems ile nur aydınlığını birleştiren Arapça kökenli unsurlardan oluşan bir kız ismidir. İsim, parlaklık, manevi ışık ve sıcak bir aydınlanma çağrışımı taşır. Türkiye'de özellikle birleşik ve manevi anlamlı kız isimleri içinde kullanılmaktadır. Anlamı açık, olumlu ve kardeş isimleriyle uyum kurmaya elverişli bir yapıya sahiptir.",
    intro:
      "Şemsinur ismi, hem ışık hem de manevi derinlik arayan ailelere hitap eder. Uzun yapısına rağmen heceleri düzenli ilerlediği için telaffuzu zor değildir. Nur ile biten kız isimleriyle ve klasik erkek kardeş adlarıyla doğal bir uyum yakalar.",
    origin: "Arapça / Türkçe kullanım",
    pronunciation: "Şem-si-nur",
    popularity: 2.4,
    popularScore: 2,
    style: "MODERN",
    category: "spiritual",
    traits: ["Aydınlık", "Manevi", "Sıcak", "Zarif", "Modern", "Güven veren"],
  },
  {
    name: "Şenay",
    meaning:
      "Şenay, şen ve ay kelimelerinin birleşimiyle neşeli ay, aydınlık ve sevinçli güzellik çağrışımı taşıyan Türkçe bir kız ismidir. İsim, hem mutluluk hem de ay imgesi üzerinden yumuşak bir parlaklık verir. Türkiye'de bilinen ve kullanılan kadın adlarından biridir. Kısa, anlaşılır ve olumlu anlamlı kız isimleri arasında doğal bir seçenek oluşturur.",
    intro:
      "Şenay ismi sıcak, tanıdık ve akılda kalıcı bir tınıya sahiptir. Aileler bu adı seçerken çoğu zaman neşeli ama sade bir anlam ister. Kardeş isimlerinde Sonay, Aylin, Şebnem ve Şeniz gibi yumuşak tınılı adlarla uyumlu durur.",
    origin: "Türkçe",
    pronunciation: "Şe-nay",
    popularity: 3.0,
    popularScore: 3,
    style: "CLASSIC",
    category: "light",
    traits: ["Neşeli", "Aydınlık", "Kısa", "Sıcak", "Klasik", "Akılda kalıcı"],
  },
  {
    name: "Şengül",
    meaning:
      "Şengül, şen ve gül kelimelerinin birleşimiyle neşeli gül, güler yüzlü ve iç açıcı güzellik anlamlarını çağrıştıran Türkçe kökenli bir addır. İsim, çiçek zarafetini neşe duygusuyla bir araya getirir. Türkiye'de kadın adı olarak bilinen, özellikle klasik ve sıcak tınılı seçenekler arasında yer alır. Anlamı açık olduğu için ailelerin kolayca benimseyebileceği olumlu bir isimdir.",
    intro:
      "Şengül ismi, hem güler yüz hem de çiçek çağrışımı taşıdığı için samimi bir etki bırakır. Geleneksel ama ağır olmayan kız isimlerinden hoşlanan aileler için uygun bir tercihtir. Kardeş isimlerinde Gül, Songül, Gülay ve Şenay gibi adlarla aynı sıcak çizgide buluşur.",
    origin: "Türkçe",
    pronunciation: "Şen-gül",
    popularity: 2.8,
    popularScore: 2,
    style: "CLASSIC",
    category: "flower",
    traits: ["Neşeli", "Çiçeksi", "Sıcak", "Klasik", "İçten", "Pozitif"],
  },
  {
    name: "Şeniz",
    meaning:
      "Şeniz, şenlik, neşe ve canlılık çağrışımı taşıyan modern Türkçe kullanımlı bir kız ismidir. İsimde kısa, temiz ve güncel bir ses vardır; anlamı da olumlu duygu alanına dayanır. Türkiye'de kadın adı olarak kullanılan ama çok yaygın olmayan seçeneklerdendir. Neşeli ve modern kız isimleri arayan aileler için sade bir alternatif sunar.",
    intro:
      "Şeniz ismi, Ş harfiyle başlayan kısa ve çağdaş adları seven ailelere hitap eder. Fazla süslü değildir; buna rağmen sesindeki canlılık onu akılda kalıcı yapar. Kardeş isimlerinde Şenay, Deniz, Selin ve Seren gibi yumuşak adlarla iyi eşleşir.",
    origin: "Türkçe / modern kullanım",
    pronunciation: "Şe-niz",
    popularity: 2.3,
    popularScore: 2,
    style: "MODERN",
    category: "modern",
    traits: ["Modern", "Neşeli", "Kısa", "Sade", "Canlı", "Akılda kalıcı"],
  },
  {
    name: "Şevin",
    meaning:
      "Şevin, Kürtçe kullanımda sevinç, neşe ve gönül açıklığı çağrışımıyla bilinen bir kız ismidir. İsim, kısa yapısı ve sıcak anlamı sayesinde modern listelerde de karşılık bulabilir. Türkiye'de kullanılan bölgesel kökenli kadın adları arasında yer alır. Anlamı olumlu olduğu için neşeli ve sade kız isimleri arayan ailelere uygun bir seçenektir.",
    intro:
      "Şevin ismi, kısa ve özgün duyulan adlardan hoşlanan aileler için dikkat çekici bir alternatiftir. Sesindeki yumuşaklık, anlamındaki sevinç duygusunu destekler. Kardeş isimlerinde Rojin, Solin, Şilan ve Şeyda gibi modern tınılı adlarla uyumlu durur.",
    origin: "Kürtçe",
    pronunciation: "Şe-vin",
    popularity: 2.5,
    popularScore: 2,
    style: "MODERN",
    category: "virtue",
    traits: ["Neşeli", "Modern", "Kısa", "Özgün", "Sıcak", "Pozitif"],
  },
  {
    name: "Şevval",
    meaning:
      "Şevval, hicri takvimde ramazandan sonra gelen ayın adı olarak bilinen Arapça kökenli bir kız ismidir. İsim, bayram sonrası zaman, yenilenme ve manevi sevinç çağrışımları taşır. Kur'an'da doğrudan isim olarak geçmez; ancak İslam kültüründeki takvim bilgisinden dolayı anlamı tanınır. Türkiye'de kız adı olarak yaygın kullanılan, güncel ve manevi tınılı seçeneklerden biridir.",
    intro:
      "Şevval ismi, hem modern hem de kültürel arka planı olan bir ad isteyen ailelere hitap eder. Sesindeki vurgulu akış onu akılda kalıcı yapar; anlamındaki zaman ve bayram çağrışımı ise sıcaklık katar. Kardeş isimlerinde Sena, Sümeyye, Zeynep ve Şeyma gibi popüler adlarla doğal bir uyum kurar.",
    origin: "Arapça",
    pronunciation: "Şev-val",
    popularity: 4.0,
    popularScore: 4,
    style: "POPULAR",
    category: "spiritual",
    traits: ["Manevi", "Popüler", "Sıcak", "Akılda kalıcı", "Modern", "Neşeli"],
  },
  {
    name: "Şeyda",
    meaning:
      "Şeyda, tutkun, aşka düşmüş, coşkulu ve gönlü güçlü duygularla dolu kişi anlamlarıyla bilinen Farsça kökenli bir kız ismidir. İsim, romantik ve duygulu bir çağrışım taşır; bu yüzden edebî tınısı belirgindir. Türkiye'de kadın adı olarak yaygın biçimde kullanılan tanınır bir seçenektir. Anlamı güçlü duygulara dayandığı için sevgi ve içtenlik temalı kız isimleri arasında öne çıkar.",
    intro:
      "Şeyda ismi, duygusu belirgin ve kulağa yumuşak gelen adları seven aileler için etkileyici bir tercihtir. Ne çok uzun ne de fazla sade duran yapısı, onu günlük kullanımda rahat kılar. Kardeş isimlerinde Sevda, Sanem, Şevval ve Şeyma gibi sıcak tınılı adlarla güzel eşleşir.",
    origin: "Farsça",
    pronunciation: "Şey-da",
    popularity: 3.4,
    popularScore: 3,
    style: "POPULAR",
    category: "love",
    traits: ["Duygulu", "Romantik", "Popüler", "Zarif", "İçten", "Akılda kalıcı"],
  },
  {
    name: "Şeyma",
    meaning:
      "Şeyma, ben, alamet veya ayırt edici iz anlam alanıyla açıklanan Arapça kökenli bir kız ismidir. İslam tarihinde bilinen kadın adlarından biri olması, isme kültürel ve manevi bir arka plan kazandırır. Türkiye'de yaygın kullanılan, tanıdık ve güçlü bir kız ismidir. Anlamı kaynaklarda farklı ayrıntılarla açıklansa da temel çağrışımı ayırt edici özellik ve özel işaret çevresinde toplanır.",
    intro:
      "Şeyma ismi, popüler ama köksüz görünmeyen adları seven aileler için güven veren bir seçenektir. Kulağa yumuşak gelir ve günlük hayatta kolay söylenir. Kardeş önerilerinde Şevval, Sümeyye, Zeynep ve Elif gibi tanıdık adlarla güçlü bir uyum sağlar.",
    origin: "Arapça",
    pronunciation: "Şey-ma",
    popularity: 4.1,
    popularScore: 4,
    style: "POPULAR",
    category: "spiritual",
    traits: ["Manevi", "Popüler", "Zarif", "Tanıdık", "Güven veren", "Yumuşak"],
  },
  {
    name: "Şeymanur",
    meaning:
      "Şeymanur, Şeyma isminin kültürel çağrışımını nur aydınlığıyla birleştiren modern bir kız ismidir. Arapça kökenli unsurlardan oluşan bu ad, ayırt edici güzellik ve manevi ışık fikrini birlikte taşır. Türkiye'de birleşik kız isimleri içinde kullanılan güncel seçeneklerden biridir. Anlamı hem tanıdık hem de olumlu olduğu için kardeş isimleri algoritmasına güçlü veri sağlar.",
    intro:
      "Şeymanur ismi, Şeyma'yı seven ama daha manevi ve uzun bir ad arayan ailelere hitap eder. Nur eki isme yumuşak, aydınlık ve güven veren bir hava katar. Kardeş isimlerinde Semanur, Senanur, Şemsinur ve Şevval gibi adlarla uyumlu sonuçlar üretir.",
    origin: "Arapça / Türkçe kullanım",
    pronunciation: "Şey-ma-nur",
    popularity: 3.0,
    popularScore: 3,
    style: "MODERN",
    category: "spiritual",
    traits: ["Manevi", "Aydınlık", "Modern", "Zarif", "Güven veren", "Popüler"],
  },
  {
    name: "Şifa",
    meaning:
      "Şifa, iyileşme, sağlık bulma ve dertten kurtulma anlamlarına gelen Arapça kökenli bir kız ismidir. Kelime olarak Türkçede çok güçlü ve olumlu bir karşılığa sahiptir; isim olarak da umut ve ferahlık duygusu taşır. Kur'an'da şifa kavramı farklı ayetlerde geçer, ancak bu kullanım doğrudan özel ad olarak değil anlam kelimesi olarak değerlendirilmelidir. Kısa, anlamı güzel ve manevi çağrışımı yüksek kız isimleri arasında yer alır.",
    intro:
      "Şifa ismi, sade ama çok güçlü anlam taşıyan adlardan hoşlanan aileler için özel bir seçenektir. İyileşme çağrışımı, isme umut veren ve koruyucu bir sıcaklık kazandırır. Kardeş isimlerinde Nur, Sude, Sena ve Şevval gibi kısa ya da manevi adlarla doğal biçimde eşleşir.",
    origin: "Arapça",
    pronunciation: "Şi-fa",
    popularity: 2.8,
    popularScore: 2,
    style: "MODERN",
    category: "spiritual",
    inQuran: true,
    quranReference:
      "Kur'an'da şifa kelimesi İsra 17:82, Yunus 10:57 ve Nahl 16:69 gibi ayetlerde iyileşme anlamıyla geçer; özel isim olarak değil kavram olarak anılır.",
    traits: ["Umutlu", "Manevi", "Kısa", "Şefkatli", "Ferah", "Güven veren"],
  },
  {
    name: "Şilan",
    meaning:
      "Şilan, Kürtçe kullanımda dağ çiçeği, yabani gül veya doğada yetişen zarif çiçek çağrışımıyla bilinen bir kız ismidir. İsim, doğallık, özgürlük ve narin güzellik duygularını birlikte taşır. Türkiye'de özellikle bölgesel kökenli modern kız isimleri arasında kullanılır. Anlamı çiçek ve doğa temasıyla olumlu olduğu için veri kalitesine uygun bir seçenektir.",
    intro:
      "Şilan ismi, özgün ama kulağa yumuşak gelen adları seven aileler için güzel bir alternatiftir. Çiçek çağrışımı onu narin, doğal ve sıcak bir noktaya taşır. Kardeş isimlerinde Berfin, Rojin, Solin ve Şevin gibi modern kökenli adlarla uyumlu durur.",
    origin: "Kürtçe",
    pronunciation: "Şi-lan",
    popularity: 2.9,
    popularScore: 3,
    style: "MODERN",
    category: "flower",
    traits: ["Çiçeksi", "Doğal", "Modern", "Özgün", "Zarif", "Özgür"],
  },
  {
    name: "Şirin",
    meaning:
      "Şirin, tatlı, sevimli, hoş ve gönle yakın anlamlarıyla bilinen Farsça kökenli bir kız ismidir. Klasik edebiyatta ve halk kültüründe sevilen bir kadın adı olarak güçlü bir karşılığı vardır. İsim, sıcaklık ve zarafeti kısa, kolay söylenen bir yapıda taşır. Türkiye'de tanınan, anlamı herkesçe anlaşılabilen ve kız ismi olarak yerleşmiş seçeneklerden biridir.",
    intro:
      "Şirin ismi, kısa ve sevimli tınılı adları seven aileler için zamana dayanıklı bir tercihtir. Hem klasik hem de masalsı bir havası vardır; bu da onu farklı yaşlarda doğal kılar. Kardeş isimlerinde Şermin, Nazlı, Sanem ve Gül gibi zarif adlarla güzel bir uyum sağlar.",
    origin: "Farsça",
    pronunciation: "Şi-rin",
    popularity: 3.0,
    popularScore: 3,
    style: "CLASSIC",
    category: "grace",
    traits: ["Sevimli", "Zarif", "Kısa", "Klasik", "Sıcak", "Masalsı"],
  },
  {
    name: "Şirinnaz",
    meaning:
      "Şirinnaz, tatlı ve sevimli anlamındaki Şirin ile nazlı eda çağrışımını birleştiren Farsça kökenli bir kız ismidir. İsim, sevimlilik, zarafet ve ince bir estetik duygusunu birlikte taşır. Türkiye'de çok yaygın olmasa da kadın adı olarak kullanılan, anlamı çözümlenebilir bir seçenektir. Nadir ama anlamı güzel birleşik kız isimleri arayan aileler için uygun bir alternatiftir.",
    intro:
      "Şirinnaz ismi, uzun ve melodik adlardan hoşlanan ailelere hitap eder. İsmin içinde hem sıcak hem de nazlı bir karakter vardır; bu yüzden sert değil, yumuşak bir iz bırakır. Kardeş isimlerinde Şehnaz, Şahnaz, Şermin ve Şirin gibi adlarla aynı zarif çizgiyi paylaşır.",
    origin: "Farsça",
    pronunciation: "Şi-rin-naz",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "grace",
    traits: ["Zarif", "Nazlı", "Sevimli", "Nadir", "Melodik", "Yumuşak"],
  },
  {
    name: "Şüheda",
    meaning:
      "Şüheda, şehitler anlamına gelen Arapça kökenli bir kelimedir ve Türkiye'de kız ismi olarak da kullanılır. İsim, fedakârlık, manevi değer ve yüksek hatıra çağrışımı taşır. Anlamı güçlü olduğu için kullanırken dini ve kültürel ağırlığı dikkate alınmalıdır. Manevi yönü belirgin, köklü ve anlamı derin kız isimleri arasında yer alır.",
    intro:
      "Şüheda ismi, güçlü manevi anlam arayan ailelerin değerlendirebileceği özel bir addır. Tınısı yumuşak olsa da taşıdığı anlam ciddi ve derindir. Kardeş isimlerinde Sümeyye, Ravza, Şifa ve Şevval gibi manevi adlarla uyumlu bir bütünlük verir.",
    origin: "Arapça",
    pronunciation: "Şü-he-da",
    popularity: 2.7,
    popularScore: 2,
    style: "MODERN",
    category: "spiritual",
    traits: ["Manevi", "Güçlü", "Duyarlı", "Köklü", "Anlamı güçlü", "Saygın"],
  },
  {
    name: "Şükriye",
    meaning:
      "Şükriye, şükreden, minnet duyan ve verilen nimetlerin değerini bilen kadın anlamıyla bilinen Arapça kökenli bir kız ismidir. İsim, kanaat, teşekkür ve manevi olgunluk duygularını taşır. Türkiye'de klasik kadın adları arasında yerleşmiş, anlamı açık ve güvenilir bir seçenektir. Kız bebek isimleri içinde sakin, köklü ve değer odaklı bir anlam sunar.",
    intro:
      "Şükriye ismi, geleneksel isimlerdeki olgun ve manevi havayı seven ailelere hitap eder. Söylenişi yumuşak, anlamı ise güçlü bir karakter duygusu verir. Kardeş isimlerinde Şefika, Şadiye, Nimet ve Saliha gibi klasik adlarla doğal bir uyum kurar.",
    origin: "Arapça",
    pronunciation: "Şük-ri-ye",
    popularity: 2.6,
    popularScore: 2,
    style: "CLASSIC",
    category: "spiritual",
    traits: ["Şükürlü", "Manevi", "Klasik", "Olgun", "Güvenilir", "Sakin"],
  },
  {
    name: "Şükufe",
    meaning:
      "Şükufe, çiçek, tomurcuk ve açan çiçek güzelliği anlamlarıyla bilinen Farsça kökenli bir kız ismidir. İsim, bahar, tazelik ve narin büyüme çağrışımı taşır. Türkiye'de daha çok klasik ve nadir isim zevkinde karşılığı vardır. Çiçek anlamlı kız isimleri arasında şiirsel, zarif ve köklü bir alternatif olarak değerlendirilebilir.",
    intro:
      "Şükufe ismi, eski edebiyat havası taşıyan narin adları seven aileler için özel bir seçenektir. Çiçek anlamı sayesinde hem estetik hem de kolay anlatılabilir bir isimdir. Kardeş isimlerinde Lale, Nergis, Reyhan ve Şilan gibi çiçek/doğa temalı adlarla uyumlu olur.",
    origin: "Farsça",
    pronunciation: "Şü-ku-fe",
    popularity: 2.0,
    popularScore: 1,
    style: "RARE",
    category: "flower",
    traits: ["Çiçeksi", "Zarif", "Nadir", "Şiirsel", "Klasik", "Narin"],
  },
  {
    name: "Şükran",
    meaning:
      "Şükran, teşekkür, minnet ve iyiliği bilme anlamlarına gelen Arapça kökenli bir kız ismidir. İsim, insan ilişkilerinde vefa, değer bilme ve manevi olgunluk çağrışımı taşır. Türkiye'de kadın adı olarak uzun süredir kullanılan tanıdık bir seçenektir. Anlamı net, olumlu ve kültürel olarak güçlü olduğu için klasik kız isimleri arasında sağlam bir yere sahiptir.",
    intro:
      "Şükran ismi, ağırbaşlı ve anlamı güçlü adları seven aileler için güven veren bir tercihtir. Kısa sayılabilecek yapısı günlük kullanımda rahatlık sağlar. Kardeş isimlerinde Şükriye, Nimet, Saliha ve Emine gibi köklü adlarla doğal bir uyum yakalar.",
    origin: "Arapça",
    pronunciation: "Şük-ran",
    popularity: 2.8,
    popularScore: 2,
    style: "CLASSIC",
    category: "spiritual",
    traits: ["Vefalı", "Manevi", "Klasik", "Güvenilir", "Olgun", "Anlamı güçlü"],
  },
  {
    name: "Şura",
    meaning:
      "Şura, danışma, görüş alışverişi ve ortak akılla karar verme anlamına gelen Arapça kökenli bir kelimedir. Kur'an'da aynı adla bir sure bulunur ve şura kavramı danışma ilkesiyle ilişkilendirilir. Kız ismi olarak kullanıldığında bilgelik, denge ve fikir alışverişine açıklık çağrışımı taşır. Anlamı manevi ve kavramsal olduğu için kısa ama güçlü isimler arasında değerlendirilebilir.",
    intro:
      "Şura ismi, kısa ve anlamı derin adları seven ailelere hitap eder. Söylenişi sade, çağrışımı ise düşünceli ve manevi bir çizgidedir. Kardeş isimlerinde Sena, Nisa, Şifa ve Ravza gibi kısa ya da dini çağrışımlı adlarla uyumlu durur.",
    origin: "Arapça",
    pronunciation: "Şu-ra",
    popularity: 2.8,
    popularScore: 2,
    style: "MODERN",
    category: "spiritual",
    inQuran: true,
    quranReference:
      "Kur'an'da Şura adlı 42. sure bulunur; ayrıca şura kavramı danışma ve istişare anlamıyla kullanılır.",
    traits: ["Bilge", "Manevi", "Kısa", "Dengeli", "Düşünceli", "Modern"],
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

function scoreSimilarity(a: ShGirlNameInput, b: ShGirlNameInput) {
  let score = 0;
  if (a.category === b.category) score += 7;
  if (a.style === b.style) score += 4;
  if (isShortName(a.name) === isShortName(b.name)) score += 2;
  score += Math.max(0, 4 - Math.abs(a.popularity - b.popularity));
  if (a.origin.split("/")[0].trim() === b.origin.split("/")[0].trim()) score += 2;
  if (a.name.slice(0, 3).toLocaleLowerCase("tr-TR") === b.name.slice(0, 3).toLocaleLowerCase("tr-TR")) score += 2;
  if (a.name.slice(-2).toLocaleLowerCase("tr-TR") === b.name.slice(-2).toLocaleLowerCase("tr-TR")) score += 1;
  return score;
}

function similarNamesFor(input: ShGirlNameInput) {
  return SH_GIRL_NAME_INPUTS.filter((candidate) => candidate.name !== input.name)
    .map((candidate) => ({ candidate, score: scoreSimilarity(input, candidate) }))
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name, "tr-TR"))
    .slice(0, 10)
    .map(({ candidate }) => candidate.name);
}

export const SH_GIRL_NAME_SEED: BabyNameSeed[] = SH_GIRL_NAME_INPUTS.map((input, index) => ({
  id: `sh-girl-${index + 1}`,
  slug: slugifyTr(input.name),
  displayName: input.name,
  gender: "GIRL",
  meaning: input.meaning,
  origin: input.origin,
  pronunciation: input.pronunciation ?? pronunciationOf(input.name),
  popularity: input.popularity,
  popularScore: input.popularScore,
  inQuran: Boolean(input.inQuran),
  quranReference: input.quranReference ?? null,
  style: input.style,
  isShort: isShortName(input.name),
  beautifulMeaning: true,
  intro: input.intro,
  traits: input.traits,
  similar: similarNamesFor(input),
}));
