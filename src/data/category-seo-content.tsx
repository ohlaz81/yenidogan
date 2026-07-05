import Link from "next/link";
import type { ReactNode } from "react";
import type { FAQ } from "@/types/database";

export type CategorySeoKey = "girls" | "boys" | "quran" | "popular" | "modern" | "rare";

export type CategorySeoContent = {
  body: ReactNode;
  faqs: FAQ[];
};

function faq(idPrefix: string, items: Array<[string, string]>): FAQ[] {
  return items.map(([question, answer], index) => ({
    id: `${idPrefix}-${index + 1}`,
    sortOrder: index + 1,
    question,
    answer,
  }));
}

export const CATEGORY_SEO_CONTENT: Record<CategorySeoKey, CategorySeoContent> = {
  girls: {
    body: (
      <>
        <p>
          Kız isimleri seçerken kulağa hoş gelmesi kadar anlamı, yazımı ve aile içinde nasıl karşılanacağı da önemlidir.
          Bu sayfadaki listeyi yalnızca alfabetik bir dizin gibi değil, farklı zevkleri sakin biçimde karşılaştırabileceğiniz
          bir başlangıç noktası olarak düşünebilirsiniz. En güzel kız isimleri çoğu zaman tek bir kalıba sığmaz; kimi aile
          zarif ve klasik bir tını ister, kimi aile daha sade, kısa ya da güncel duran bir ad arar.
        </p>
        <p>
          Listeyi incelerken önce beğendiğiniz birkaç ismi ayırmak, sonra anlam ve köken bilgilerine bakmak iyi sonuç verir.
          Eğer isim kız kardeş, abi, soyadı ya da ikinci adla birlikte kullanılacaksa yüksek sesle birkaç kez söylemek seçim
          yapmayı kolaylaştırır. Daha geniş bir karşılaştırma için <Link href="/erkek-isimleri">erkek isimleri</Link>,
          manevi çağrışımı güçlü seçenekler için <Link href="/kuranda-gecen-isimler">Kur&apos;an&apos;da geçen isimler</Link> ve
          gündemdeki tercihler için <Link href="/populer-isimler">popüler isimler</Link> sayfalarına da bakabilirsiniz.
        </p>
        <p>
          Modern ve nadir seçenekler arasında kalıyorsanız acele etmeyin. Bazı isimler ilk duyulduğunda parlak gelir ama
          günlük kullanımda zor telaffuz edilebilir; bazı sade isimler ise zamanla daha güçlü görünür. Bu yüzden
          <Link href="/modern-isimler"> modern isimler</Link> ve <Link href="/nadir-isimler">nadir isimler</Link>
          listelerini yan yana düşünmek faydalıdır. Harf filtreleri de özellikle belirli bir sesle başlayan isim arayan
          aileler için listeyi daha okunur hale getirir.
        </p>
        <p>
          Karar aşamasında tek ölçüt trend olmamalı. İsmin anlamı, çocuğun ileride kendini tanıtırken rahat kullanabileceği
          açıklıkta olmalı. Emin olamadığınızda <Link href="/isim-bulucu">isim bulucu</Link> ile zevkinize yakın öneriler
          alabilir, seçim sürecini daha bilinçli yürütmek için <Link href="/isim-rehberi">isim rehberi</Link> yazılarını
          okuyabilirsiniz.
        </p>
      </>
    ),
    faqs: faq("girls", [
      [
        "Kız ismi seçerken ilk olarak neye bakmalıyım?",
        "Önce ismin anlamı, telaffuzu ve soyadıyla uyumuna bakmak iyi bir başlangıçtır. Ardından köken, aile geleneği ve günlük kullanım kolaylığı gibi detaylar değerlendirilebilir.",
      ],
      [
        "En güzel kız isimleri her zaman popüler olanlar mıdır?",
        "Hayır. Popüler isimler daha tanıdık gelebilir, ancak en güzel seçim ailenin zevkine, ismin anlamına ve çocuğun taşıyabileceği doğal tınıya göre değişir.",
      ],
      [
        "Kısa kız isimleri mi uzun kız isimleri mi daha kullanışlıdır?",
        "Kısa isimler günlük kullanımda pratik olabilir; uzun isimler ise daha klasik veya zarif bir etki bırakabilir. Soyadı uzunsa kısa isimler, soyadı kısaysa iki veya üç heceli isimler dengeli durabilir.",
      ],
      [
        "Kız isimlerinde anlam mı yoksa ses uyumu mu daha önemli?",
        "İkisi birlikte düşünülmelidir. Çok güzel anlamlı bir isim zor telaffuz ediliyorsa günlük hayatta yorucu olabilir; kulağa hoş gelen bir isim de anlamıyla desteklendiğinde daha güçlü bir seçim olur.",
      ],
      [
        "İkinci isimle birlikte kız ismi seçerken nelere dikkat edilir?",
        "İki ismin hece ritmi, aynı sesle bitip bitmediği ve birlikte söylendiğinde fazla uzun olup olmadığı kontrol edilebilir. Resmi kullanım ve aile içi hitap şekli de önceden düşünülmelidir.",
      ],
      [
        "Modern kız isimleri yıllar sonra eskimiş görünür mü?",
        "Bazı çok trend isimler dönemsel algılanabilir, ancak sade yazılan ve anlamı güçlü modern isimler uzun yıllar doğal kalabilir. Bu yüzden yalnızca trende değil, kalıcılığa da bakmak gerekir.",
      ],
      [
        "Nadir kız isimleri seçmek riskli midir?",
        "Nadir isimler özgünlük sağlar; ancak yazımı, telaffuzu ve anlamı net değilse sık açıklama gerektirebilir. Seçmeden önce yakın çevrede nasıl duyulduğunu test etmek faydalıdır.",
      ],
    ]),
  },
  boys: {
    body: (
      <>
        <p>
          Erkek isimleri çoğu aile için güçlü, anlaşılır ve uzun yıllar eskimeyecek bir tını taşımalı. Bu sayfadaki liste,
          klasik adlardan modern erkek isimleri seçeneklerine kadar farklı zevklere alan açar. Bir ismi değerlendirirken
          yalnızca ilk izlenime değil, anlamına, kökenine, söylenişindeki akıcılığa ve soyadıyla kurduğu ritme de bakmak
          kararınızı netleştirir.
        </p>
        <p>
          Bazı aileler geleneksel bir bağ ararken bazıları daha kısa, şehirli ve sade duyulan isimlere yönelir. Listeyi harf
          filtreleriyle daraltarak aynı ses ailesindeki seçenekleri karşılaştırabilirsiniz. Kardeş adıyla uyum arıyorsanız
          <Link href="/kiz-isimleri"> kız isimleri</Link> sayfasını da incelemek iyi olur; böylece aile içindeki adların
          birlikte nasıl duyulduğunu daha rahat görebilirsiniz.
        </p>
        <p>
          Erkek bebek ismi seçerken popülerlik bazen yol gösterir, bazen de aileyi daha özgün seçeneklere yönlendirir.
          Çok duyulan adlar tanıdık ve güvenli hissettirebilir; az rastlanan adlar ise çocuğa daha ayırt edici bir kimlik
          kazandırabilir. Bu dengeyi görmek için <Link href="/populer-isimler">popüler isimler</Link>,
          <Link href="/modern-isimler"> modern isimler</Link> ve <Link href="/nadir-isimler">nadir isimler</Link>
          listelerini karşılaştırabilirsiniz.
        </p>
        <p>
          Manevi veya kültürel bağ sizin için önemliyse <Link href="/kuranda-gecen-isimler">Kur&apos;an&apos;da geçen isimler</Link>
          ayrıca değerlendirilebilir. Son aşamada seçtiğiniz ismi farklı hitap biçimleriyle söylemek, baş harf ve kısaltma
          ihtimallerini kontrol etmek faydalıdır. Daha kişisel öneriler için <Link href="/isim-bulucu">isim bulucu</Link>,
          seçim sürecine dair daha geniş notlar için <Link href="/isim-rehberi">isim rehberi</Link> size eşlik edebilir.
        </p>
      </>
    ),
    faqs: faq("boys", [
      [
        "Erkek ismi seçerken güçlü tını ne anlama gelir?",
        "Güçlü tını genellikle net heceler, kolay telaffuz ve anlamla desteklenen bir duruş demektir. Ancak sert duyulması şart değildir; sade ve dengeli isimler de güçlü bir izlenim bırakabilir.",
      ],
      [
        "Modern erkek isimleri klasik isimlerle birlikte kullanılabilir mi?",
        "Evet. Bir modern isim, ikinci ad olarak klasik bir isimle dengelenebilir. Önemli olan iki ismin birlikte çok uzun veya zor söylenen bir yapıya dönüşmemesidir.",
      ],
      [
        "Erkek bebek isminde soyadı uyumu nasıl kontrol edilir?",
        "İsim ve soyadı birlikte yüksek sesle söylenebilir. Aynı seslerin peş peşe gelmesi, fazla uzun hece dizilimi veya zor duraklar varsa alternatifler denenebilir.",
      ],
      [
        "Popüler erkek isimleri seçmek iyi bir fikir mi?",
        "Popüler isimler tanıdık ve güvenilir hissedilebilir. Yine de aynı kuşakta çok sık kullanılmasını istemiyorsanız modern veya nadir kategorilerden benzer tınıda seçeneklere bakabilirsiniz.",
      ],
      [
        "Kur'an'da geçen erkek isimleri bu listede ayrı mı inceleniyor?",
        "Bu sayfa genel erkek isimlerini gösterir. Dini veya manevi bağ sizin için öncelikliyse Kur'an'da geçen isimler kategorisinde ayrıca filtreli bir liste bulabilirsiniz.",
      ],
      [
        "Kısa erkek isimleri neden sık tercih edilir?",
        "Kısa isimler kolay yazılır, hızlı söylenir ve uzun soyadlarıyla çoğu zaman dengeli durur. Buna rağmen anlamı ve ailede bıraktığı his mutlaka ayrıca değerlendirilmelidir.",
      ],
      [
        "Nadir erkek isimleri resmi hayatta sorun çıkarır mı?",
        "Yazımı ve telaffuzu net olan nadir isimler genellikle sorun oluşturmaz. Çok alışılmadık yazımlar ise sık düzeltme gerektirebilir; bu nedenle pratik kullanım önceden düşünülmelidir.",
      ],
    ]),
  },
  quran: {
    body: (
      <>
        <p>
          Kur&apos;an&apos;da geçen isimler, birçok aile için yalnızca güzel bir ses değil, aynı zamanda manevi bir bağ anlamına gelir.
          Bu sayfadaki liste, Kur&apos;ani kökeni veya kaynaklarda Kur&apos;an&apos;da geçtiği belirtilen adları daha düzenli inceleyebilmeniz
          için hazırlanmıştır. İsim seçerken metindeki geçiş, anlam alanı ve günlük kullanımda nasıl algılandığı birlikte
          değerlendirilmelidir.
        </p>
        <p>
          Her Kur&apos;an bağlantılı isim aynı kullanım hissini vermez. Bazıları Türkiye&apos;de çok tanıdıktır, bazıları daha nadir
          duyulur; bazıları kız veya erkek adı olarak yaygınlaşmışken bazıları unisex algılanabilir. Bu nedenle listeyi
          cinsiyet ve harf filtreleriyle daraltmak seçim sürecini sadeleştirir. Daha genel seçeneklerle kıyaslamak isterseniz
          <Link href="/kiz-isimleri"> kız isimleri</Link> ve <Link href="/erkek-isimleri">erkek isimleri</Link> sayfaları
          iyi bir tamamlayıcıdır.
        </p>
        <p>
          Kur&apos;an&apos;da geçen isimler araştırılırken yalnızca adın kaynakta yer alıp almadığına değil, anlamının isim olarak
          kullanılmaya uygun olup olmadığına da bakılmalıdır. Bazı kelimeler anlam bakımından güzel olsa bile günlük isim
          kullanımında beklenen açıklığı taşımayabilir. Bu noktada isim detay sayfalarındaki anlam, köken ve varsa referans
          notları karar vermeyi kolaylaştırır.
        </p>
        <p>
          Manevi yönü güçlü bir ad ararken çağdaş bir tınıdan vazgeçmek zorunda değilsiniz. Dilerseniz
          <Link href="/modern-isimler"> modern isimler</Link>, daha ayırt edici seçenekler için
          <Link href="/nadir-isimler"> nadir isimler</Link> ve toplumda sık tercih edilen adlar için
          <Link href="/populer-isimler"> popüler isimler</Link> listelerine de bakabilirsiniz. Kararsız kaldığınızda
          <Link href="/isim-bulucu"> isim bulucu</Link> ve <Link href="/isim-rehberi">isim rehberi</Link>, anlam ve kullanım
          dengesini birlikte düşünmenize yardımcı olur.
        </p>
      </>
    ),
    faqs: faq("quran", [
      [
        "Kur'an'da geçen isimler nasıl seçilmeli?",
        "Önce ismin anlamı, kaynaklarda nasıl açıklandığı ve günlük kullanımda isim olarak uygunluğu değerlendirilmelidir. Manevi bağ önemli olsa da telaffuz ve soyadı uyumu da gözden kaçırılmamalıdır.",
      ],
      [
        "Bir ismin Kur'an'da geçmesi anlamının güzel olduğu anlamına gelir mi?",
        "Her zaman değil. Kur'an'da geçen bir kelime veya ad, bağlamına göre farklı anlamlar taşıyabilir. Bu yüzden ismin isim olarak kullanılan anlamını ayrıca incelemek gerekir.",
      ],
      [
        "Kur'an'da geçen kız isimleri ve erkek isimleri ayrı filtrelenebilir mi?",
        "Evet. Bu kategoride cinsiyet filtresiyle kız veya erkek isimlerine odaklanabilir, harf filtresiyle de listeyi daha kısa hale getirebilirsiniz.",
      ],
      [
        "Kur'an'da geçen modern isimler bulunabilir mi?",
        "Bulunabilir. Bazı isimler hem manevi çağrışım taşır hem de güncel telaffuzuyla modern bir his verir. Bu nedenle modern isimler listesiyle birlikte değerlendirmek faydalıdır.",
      ],
      [
        "Kur'an'da geçen nadir isimler tercih edilmeli mi?",
        "Nadir bir isim özgünlük sağlayabilir, ancak anlamı ve telaffuzu net olmalıdır. Aile büyükleri ve yakın çevrede nasıl algılandığını görmek kararınızı güçlendirebilir.",
      ],
      [
        "Referans bilgisi olmayan bir isme nasıl yaklaşmalıyım?",
        "İsim detayında açık bir referans yoksa ek kaynak kontrolü yapmak iyi olur. Özellikle dini hassasiyetlerde güvenilir kaynaklarla doğrulama yapmak daha sağlıklı bir seçim sağlar.",
      ],
      [
        "Kur'an'da geçen isim seçerken ikinci isim kullanılır mı?",
        "Evet. Bazı aileler manevi anlamı güçlü bir adı ikinci isimle destekler. İki ismin birlikte anlam ve ses uyumu taşımasına dikkat etmek yeterlidir.",
      ],
    ]),
  },
  popular: {
    body: (
      <>
        <p>
          Popüler isimler, belirli bir dönemde ailelerin sıkça ilgi gösterdiği ve kulağa tanıdık gelen seçenekleri bir araya
          getirir. Bu sayfadaki liste, yalnızca çok duyulan adları göstermek için değil, güncel bebek ismi tercihlerini daha
          rahat karşılaştırmanız için tasarlandı. Popülerlik, ismin güven veren bir aşinalık taşımasını sağlayabilir; fakat
          tek başına karar ölçütü olmamalıdır.
        </p>
        <p>
          Bir ismin popüler olması onun herkes için doğru seçim olduğu anlamına gelmez. Bazı aileler çocuğunun adı kolay
          bilinsin ve yanlış yazılmasın ister; bazıları aynı sınıfta veya çevrede çok sık karşılaşılmayacak bir isim arar.
          Bu nedenle popüler listeyi incelerken anlam, köken, hece sayısı ve soyadıyla akış gibi ayrıntıları birlikte
          düşünmek daha sağlıklı olur.
        </p>
        <p>
          Cinsiyete göre arama yapmak istiyorsanız <Link href="/kiz-isimleri">kız isimleri</Link> ve
          <Link href="/erkek-isimleri"> erkek isimleri</Link> sayfaları daha odaklı bir başlangıç sağlar. Manevi çağrışım
          arayanlar <Link href="/kuranda-gecen-isimler">Kur&apos;an&apos;da geçen isimler</Link> listesini, daha çağdaş bir hava
          isteyenler <Link href="/modern-isimler">modern isimler</Link> kategorisini inceleyebilir. Popüler ve modern
          çizgiler çoğu zaman kesişir, ancak her modern ad popüler değildir.
        </p>
        <p>
          Çok duyulan seçenekler arasında kararsız kalırsanız kısa bir favori listesi oluşturup birkaç gün beklemek işe
          yarar. İsmin günlük hitapta, resmi belgede ve aile içinde nasıl durduğunu hayal edin. Daha farklı alternatifler
          için <Link href="/nadir-isimler">nadir isimler</Link>, kişisel öneri almak için <Link href="/isim-bulucu">isim
          bulucu</Link> ve seçim kriterlerini genişletmek için <Link href="/isim-rehberi">isim rehberi</Link> iyi bir
          devam noktasıdır.
        </p>
      </>
    ),
    faqs: faq("popular", [
      [
        "Popüler isimler neye göre belirlenir?",
        "Popüler isimler genellikle kullanım eğilimi, site içi ilgi ve tanınan tercih kalıpları gibi sinyallerle öne çıkar. Bu sayfada isimler okunabilirlik için alfabetik düzende sunulur.",
      ],
      [
        "Popüler bir isim seçmek çocuğumun adını sıradanlaştırır mı?",
        "Bu tamamen beklentinize bağlıdır. Popüler isimler daha tanıdık gelebilir; ancak anlamı, soyadıyla uyumu ve aile hikayesi güçlü olduğunda kişisel bir değer taşımaya devam eder.",
      ],
      [
        "Popüler kız isimleri ve erkek isimleri ayrı görülebilir mi?",
        "Evet. Cinsiyet filtresiyle listeyi kız veya erkek isimlerine daraltabilir, ardından harf filtresiyle daha hızlı tarama yapabilirsiniz.",
      ],
      [
        "Popüler isimlerle modern isimler aynı şey mi?",
        "Aynı şey değildir. Modern isimler çağdaş tınıya odaklanır; popüler isimler ise daha çok ilgi ve kullanım yoğunluğuyla öne çıkar. Bir isim hem modern hem popüler olabilir.",
      ],
      [
        "Çok popüler isimlerden kaçınmak istiyorsam ne yapmalıyım?",
        "Benzer anlam veya tınıdaki nadir isimlere bakabilirsiniz. Böylece sevdiğiniz hissi korurken daha az rastlanan bir seçenek bulma şansınız artar.",
      ],
      [
        "Popüler isim seçerken anlam kontrolü gerekli mi?",
        "Kesinlikle. Tanıdık bir isim bile farklı kökenlerde farklı açıklamalara sahip olabilir. Anlamı ve telaffuzu birlikte kontrol etmek daha bilinçli seçim sağlar.",
      ],
      [
        "Popüler isimler zamanla demode olur mu?",
        "Bazı isimler dönemsel yükselir, bazıları kuşaklar boyunca güçlü kalır. Sade yazım, net anlam ve iyi ses uyumu ismin zamana dayanmasına yardımcı olur.",
      ],
    ]),
  },
  modern: {
    body: (
      <>
        <p>
          Modern isimler, sade yazımı, akıcı telaffuzu ve güncel hissiyle öne çıkan bebek isimlerini arayan aileler için iyi
          bir başlangıç sunar. Modernlik yalnızca yeni duyulmak demek değildir; bazen eski bir kökten gelen bir ad, bugünün
          dilinde temiz ve zarif durduğu için modern algılanabilir. Bu sayfadaki liste, çağdaş tınıyı anlam ve kullanım
          kolaylığıyla birlikte düşünmenize yardımcı olur.
        </p>
        <p>
          Modern kız veya erkek ismi seçerken aşırı karmaşık yazımlardan kaçınmak çoğu zaman daha iyi sonuç verir. Çocuğun
          adını okulda, resmi işlemlerde ve sosyal çevrede rahat kullanabilmesi önemlidir. Kısa, iki heceli ya da yumuşak
          geçişli isimler modern hissi güçlendirebilir; ancak soyadı uzunluğu ve ailedeki diğer isimlerle uyum da ayrıca
          kontrol edilmelidir.
        </p>
        <p>
          Daha cinsiyete özel arama yapmak için <Link href="/kiz-isimleri">kız isimleri</Link> ve
          <Link href="/erkek-isimleri"> erkek isimleri</Link> listelerine geçebilirsiniz. Güncel tercihlerle kıyaslamak
          isterseniz <Link href="/populer-isimler">popüler isimler</Link>, manevi bağ arıyorsanız
          <Link href="/kuranda-gecen-isimler"> Kur&apos;an&apos;da geçen isimler</Link> sayfası daha farklı bir perspektif verir.
          Modern bir adın aynı zamanda anlamlı ve köklü olması mümkündür.
        </p>
        <p>
          Modern isimlerde en önemli denge, bugünün zevkine hitap ederken yarın da doğal kalabilmesidir. Çok sıra dışı
          yazımlar kısa vadede dikkat çekebilir, fakat uzun vadede açıklama gerektirebilir. Daha özgün ama sakin seçenekler
          için <Link href="/nadir-isimler">nadir isimler</Link> sayfasını, kişisel öneriler için
          <Link href="/isim-bulucu"> isim bulucu</Link> aracını, isim seçme kriterlerini derinleştirmek için
          <Link href="/isim-rehberi"> isim rehberi</Link> içeriklerini inceleyebilirsiniz.
        </p>
      </>
    ),
    faqs: faq("modern", [
      [
        "Modern isim ne demektir?",
        "Modern isim, güncel dilde sade, akıcı ve çağdaş duyulan isimdir. Yeni türetilmiş olması gerekmez; klasik kökenli bir ad da bugünün kullanımında modern hissedebilir.",
      ],
      [
        "Modern erkek isimleri seçerken nelere dikkat edilmeli?",
        "Telaffuzun net olması, soyadıyla ritminin iyi durması ve yazımının gereksiz karmaşık olmaması önemlidir. Anlamı güçlü olan modern isimler daha kalıcı bir seçim olur.",
      ],
      [
        "Modern kız isimleri kısa mı olmalı?",
        "Kısa isimler modern algıyı güçlendirebilir, ancak şart değildir. Önemli olan ismin sade yazılması, kolay söylenmesi ve anlamıyla uyumlu bir his vermesidir.",
      ],
      [
        "Modern isimler dini veya geleneksel isimlerle çelişir mi?",
        "Çelişmek zorunda değildir. Bazı Kur'an bağlantılı veya geleneksel kökenli isimler günümüzde oldukça modern duyulabilir. Kategori listelerini birlikte incelemek bu dengeyi görmeyi kolaylaştırır.",
      ],
      [
        "Çok farklı yazılan modern isimler önerilir mi?",
        "Dikkatli yaklaşmak gerekir. Farklı yazım özgünlük sağlayabilir, ancak sürekli harf harf açıklama ihtimali varsa günlük kullanımda yorucu olabilir.",
      ],
      [
        "Modern isimler popüler isimlerden nasıl ayrılır?",
        "Modern isimler tını ve kullanım hissiyle ilgilidir; popüler isimler ise daha çok tercih edilme yoğunluğuyla öne çıkar. İki kategori kesişebilir ama aynı anlama gelmez.",
      ],
      [
        "Modern isim seçerken aile büyüklerinin görüşü önemli mi?",
        "Aile görüşü seçim sürecini zenginleştirebilir, fakat son karar anne ve babanın içine sinmelidir. İsmin anlamını ve kullanım gerekçesini paylaşmak ortak zemini kolaylaştırır.",
      ],
    ]),
  },
  rare: {
    body: (
      <>
        <p>
          Nadir isimler, bebeği için daha az duyulan ama anlamı ve tınısı güçlü bir seçenek arayan ailelere hitap eder.
          Özgün bir ad seçmek çocuğa ayırt edici bir kimlik kazandırabilir; yine de nadirlik tek başına yeterli değildir.
          İsmin yazımı, telaffuzu, anlamı ve sosyal hayatta nasıl karşılanacağı birlikte düşünülmelidir.
        </p>
        <p>
          Bu sayfadaki listeyi incelerken önce kulağınıza yakın gelen isimleri ayırabilir, sonra detay sayfalarında anlam ve
          köken bilgilerini kontrol edebilirsiniz. Nadir bir isim, sade yazıldığında ve net bir anlam taşıdığında günlük
          hayatta oldukça zarif durabilir. Buna karşılık çok karmaşık veya alışılmadık yazımlar, sürekli açıklama gerektirdiği
          için uzun vadede yorucu olabilir.
        </p>
        <p>
          Daha geleneksel veya yaygın seçeneklerle karşılaştırma yapmak için <Link href="/populer-isimler">popüler
          isimler</Link> listesine bakabilirsiniz. Cinsiyete göre karar vermek istiyorsanız <Link href="/kiz-isimleri">kız
          isimleri</Link> ve <Link href="/erkek-isimleri">erkek isimleri</Link> sayfaları, çağdaş ama daha tanıdık bir çizgi
          arıyorsanız <Link href="/modern-isimler">modern isimler</Link> iyi bir denge sunar. Manevi bağ arayan aileler için
          <Link href="/kuranda-gecen-isimler"> Kur&apos;an&apos;da geçen isimler</Link> de ayrıca değerlendirilebilir.
        </p>
        <p>
          Nadir isimlerde en iyi test, ismi birkaç farklı bağlamda denemektir: bebekken sevgiyle söylenişi, okul çağında
          tanıtılması, yetişkinlikte resmi bir ortamda kullanılması. Her dönemde doğal duran bir isim bulduğunuzda özgünlük
          daha sağlam bir zemine oturur. Kararsız kaldığınızda <Link href="/isim-bulucu">isim bulucu</Link> ile benzer
          öneriler alabilir, seçim yaklaşımınızı genişletmek için <Link href="/isim-rehberi">isim rehberi</Link> yazılarını
          okuyabilirsiniz.
        </p>
      </>
    ),
    faqs: faq("rare", [
      [
        "Nadir isim seçmek iyi bir fikir mi?",
        "Evet, anlamı net ve telaffuzu kolay bir nadir isim güçlü bir seçim olabilir. Önemli olan özgünlükle günlük kullanım kolaylığı arasında denge kurmaktır.",
      ],
      [
        "Nadir isimler çocuk için zorlayıcı olur mu?",
        "Bazı nadir isimler sık açıklama gerektirebilir. Yazımı sade, söylenişi açık ve anlamı olumlu olan isimlerde bu risk daha düşüktür.",
      ],
      [
        "Nadir kız isimleri ve erkek isimleri nasıl filtrelenir?",
        "Bu kategoride cinsiyet filtresini kullanarak yalnızca kız veya erkek isimlerini görebilir, harf filtresiyle belirli başlangıç seslerine odaklanabilirsiniz.",
      ],
      [
        "Nadir isimle ikinci isim kullanmak mantıklı mı?",
        "Mantıklı olabilir. Daha tanıdık bir ikinci isim, nadir adın özgünlüğünü dengeler. İki ismin birlikte çok uzun olmamasına dikkat etmek gerekir.",
      ],
      [
        "Nadir isimler modern isimlerden farklı mı?",
        "Evet. Nadir isim daha az rastlanma durumunu, modern isim ise çağdaş tınıyı anlatır. Bir isim hem nadir hem modern olabilir.",
      ],
      [
        "Aile büyükleri nadir isme sıcak bakmazsa ne yapılabilir?",
        "İsmin anlamını, kökenini ve neden sevildiğini paylaşmak yardımcı olur. Yine de karar verirken çocuğun ileride adıyla kuracağı ilişki merkeze alınmalıdır.",
      ],
      [
        "Nadir isimlerde anlam kontrolü neden daha önemli?",
        "Az bilinen isimlerin anlamı herkes tarafından tahmin edilemez. Olumsuz veya belirsiz çağrışımlardan kaçınmak için anlam ve köken bilgisi mutlaka kontrol edilmelidir.",
      ],
    ]),
  },
};
