import type { FAQ, GuideArticle, MediaAsset } from "@/types/database";

export const newbornGuideFaqs: FAQ[] = [
  { id: "newborn-faq-1", sortOrder: 1, question: "Yenidoğan kaç günlük bebeğe denir?", answer: "Doğumdan sonraki ilk 28 gününü tamamlamamış bebek, yenidoğan olarak adlandırılır." },
  { id: "newborn-faq-2", sortOrder: 2, question: "Yenidoğan dönemi kaç gün sürer?", answer: "Yenidoğan dönemi doğumla başlar ve yaşamın ilk 28 gününü kapsar." },
  { id: "newborn-faq-3", sortOrder: 3, question: "1 aylık bebek yenidoğan sayılır mı?", answer: "Bebek 28 günü doldurduysa tıbbi sınıflamada yenidoğan dönemi sona ermiştir; günlük dilde ‘yeni doğan’ sözü daha uzun süre kullanılabilir." },
  { id: "newborn-faq-4", sortOrder: 4, question: "Yenidoğan ile bebek arasındaki fark nedir?", answer: "Bebek daha geniş bir yaş grubunu anlatır. Yenidoğan ise yalnızca doğumdan sonraki ilk 28 günlük özel dönemin adıdır." },
  { id: "newborn-faq-5", sortOrder: 5, question: "Yenidoğan dönemi ne zaman biter?", answer: "Yenidoğan dönemi, doğumdan sonraki 28. günün tamamlanmasıyla biter." },
  { id: "newborn-faq-6", sortOrder: 6, question: "Yenidoğan bebekler neden çok uyur?", answer: "Hızlı büyüme ve dış dünyaya uyum süreci nedeniyle yenidoğanlar günün büyük bölümünü uykuda geçirebilir. Uyku süresi bebekten bebeğe değişir." },
  { id: "newborn-faq-7", sortOrder: 7, question: "Yenidoğan bebekler neden sık uyanır?", answer: "Mide kapasiteleri küçük olduğu için sık beslenme ihtiyacı, altının ıslanması ve yakınlık arayışı uykuyu kısa bölümlere ayırabilir." },
];

export const newbornGuide: GuideArticle & {
  cover: MediaAsset;
  cardTitle: string;
  seoTitle: string;
  faqs: FAQ[];
} = {
  id: "guide-yenidogan-nedir",
  slug: "yenidogan-nedir",
  title: "Yenidoğan Nedir? Yenidoğan Dönemi Hakkında Bilmeniz Gerekenler",
  cardTitle: "Yenidoğan Nedir?",
  seoTitle: "Yenidoğan Nedir? Yenidoğan Dönemi Kaç Gün Sürer? | Yenidoğan.net",
  excerpt: "Yenidoğan nedir, dönem kaç gün sürer? İlk 28 günde beslenme, uyku, bakım, sık ağlama ve sağlık desteği gerektiren belirtiler hakkında sade bilgiler.",
  body: `<p><strong>Yenidoğan</strong>, doğumdan sonraki ilk 28 günlük bebeği ifade eder. Bu kısa fakat hızlı değişimlerle dolu dönemde bebek; solunum, beslenme, vücut ısısını koruma ve uyku gibi temel işlevlerde rahim dışındaki yaşama uyum sağlar.</p>
<h2>Yenidoğan Nedir?</h2>
<p>“Yenidoğan ne demek?” sorusunun tıbbi karşılığı, yaşamın doğumla başlayıp 28. günün tamamlanmasına kadar süren evresidir. Zamanında, erken ya da geç doğmuş olması bu adlandırmayı değiştirmez; ancak bebeğin gebelik haftası, doğum ağırlığı ve sağlık durumu ihtiyaç duyduğu izlemi etkileyebilir.</p>
<p>Yeni doğan bebeğin görünümü yetişkinlerden farklıdır. Başının gövdesine oranla büyük olması, kollarını ve bacaklarını bükülü tutması, düzensiz görünen kısa solunum araları ve cildindeki geçici renk veya doku değişimleri çoğu zaman uyum sürecinin parçalarıdır. Yine de ebeveynlerin kaygılandığı bir bulgu sağlık profesyoneliyle paylaşılmalıdır.</p>
<h2>Yenidoğan Kaç Günlük Bebeğe Denir?</h2>
<p>Doğduğu andan yaşamının 28. gününün sonuna kadar olan bebeğe yenidoğan denir. İlk yedi gün “erken neonatal dönem”, 7–28. günler ise “geç neonatal dönem” olarak anılabilir. Bu ayrım sağlık izlemlerinde kullanılır; evde bakımın temel ilkeleri bebeğin bireysel gereksinimlerine göre sürdürülür.</p>
<h2>Yenidoğan Dönemi Nedir?</h2>
<p>Yenidoğan dönemi, bebeğin plasenta yoluyla desteklenen yaşamdan bağımsız solunum ve beslenmeye geçtiği uyum evresidir. İlk muayeneler, taramalar, işitme değerlendirmesi, topuk kanı ve düzenli kilo takibi gibi uygulamalar ülkenin sağlık programına ve bebeğin durumuna göre bu dönemde planlanır.</p>
<p>Kontroller yalnızca bir sorun aramak için yapılmaz. Beslenmenin değerlendirilmesi, sarılığın izlenmesi, göbek bakımının konuşulması ve ailenin sorularının yanıtlanması da yenidoğan izleminin parçalarıdır.</p>
<h2>Yenidoğan Bebeğin Genel Özellikleri</h2>
<p>Yenidoğan bebek özellikleri kişiden kişiye değişse de bazı ortak davranışlar görülebilir. Bebek günün büyük kısmını uyuyarak geçirebilir, sık beslenmek isteyebilir ve açlık, üşüme, sıcaklama ya da temas ihtiyacını ağlayarak anlatabilir. Emme, arama ve kavrama gibi doğuştan gelen refleksleri belirgindir.</p>
<p>İlk günlerde az miktarda kilo kaybı görülebilir; bunun ne kadarının beklenen sınırlar içinde olduğu bebeğin doğum ağırlığına ve klinik durumuna göre sağlık profesyonelince değerlendirilir. Ciltte soyulma, küçük beyaz noktalar veya geçici lekeler de oluşabilir. Morarma, belirgin solunum güçlüğü ya da giderek artan sarılık ise olağan kabul edilmeden değerlendirilmelidir.</p>
<h2>Yenidoğan Bebeklerde Beslenme</h2>
<p>Yenidoğan bebek beslenmesi küçük mide kapasitesi nedeniyle sık aralıklarla gerçekleşir. Dünya Sağlık Örgütü, mümkün olduğunda doğumdan sonraki ilk saat içinde emzirmeye başlanmasını, ilk altı ay yalnızca anne sütü verilmesini ve bebeğin isteğine göre emzirilmesini önerir. Bunun mümkün olmadığı veya özel bir tıbbi gereksinimin bulunduğu durumlarda beslenme planı çocuk sağlığı profesyoneliyle oluşturulmalıdır.</p>
<p>Saatten çok bebeğin açlık işaretlerini izlemek yararlıdır. Başını memeye doğru çevirme, elini ağzına götürme ve dudaklarını hareket ettirme erken işaretlerdir; ağlama daha geç bir açlık belirtisi olabilir. Etkin emme, yutkunmanın duyulması, yaşına uygun ıslak bez sayısı ve kilo izlemi yeterli alımı değerlendirmeye yardım eder.</p>
<h2>Yenidoğan Bebeklerde Uyku</h2>
<p>Yenidoğan bebek uykusu gece-gündüz düzenine henüz bağlı değildir. Uyku kısa bölümlere ayrılabilir ve beslenme için sık uyanmalar beklenebilir. Toplam süre geniş bir aralıkta değiştiğinden başka bebeklerle karşılaştırmak yerine bebeğin beslenmesini, uyanıklığını ve gelişimini birlikte izlemek daha anlamlıdır.</p>
<p>Güvenli uyku için bebek her uykuda sırtüstü, sert ve düz bir yüzeye yatırılmalıdır. Uyku alanında yastık, yorgan, oyuncak, gevşek örtü ve kenar koruyucu bulundurulmamalı; sigara dumanından uzak tutulmalıdır. Oda paylaşımı yapılabilir, ancak bebeğin kendine ait güvenli uyku yüzeyi olmalıdır.</p>
<h2>Yenidoğan Bebekler Neden Sık Ağlar?</h2>
<p>Ağlamak, yenidoğanın iletişim yollarından biridir. Açlık, gaz, ıslak bez, sıcak veya soğuk hissetme, yorgunluk ve kucaklanma ihtiyacı ağlamaya yol açabilir. Önce temel ihtiyaçları sakin biçimde kontrol etmek, bebeği ten temasıyla rahatlatmak ve aşırı uyarandan uzaklaştırmak yardımcı olabilir.</p>
<p>Ağlama alışılmadık derecede tizse, bebek avutulamıyorsa ya da ağlamaya ateş, kusma, beslenememe, solunum değişikliği veya belirgin halsizlik eşlik ediyorsa gecikmeden sağlık desteği alınmalıdır. Bebeği susturmak amacıyla asla sarsmayın.</p>
<h2>Yenidoğan Bakımında Nelere Dikkat Edilmeli?</h2>
<p>Yenidoğan bebek bakımında amaç bebeği temiz, sıcak, iyi beslenmiş ve güvenli tutarken gereksiz uygulamalardan kaçınmaktır. Günlük bakımda şu noktalar öne çıkar:</p>
<ul><li>Bebeğe dokunmadan önce elleri yıkayın ve hasta kişilerle yakın teması sınırlayın.</li><li>Göbek bağını temiz ve kuru tutun; üzerine hekim önerisi olmadan ürün sürmeyin.</li><li>Bebeği kat kat giydirmek yerine ortam koşullarına uygun, terletmeyen giysiler seçin.</li><li>Bez değişimlerinde cildi nazikçe temizleyip kurulayın; tahrişi izleyin.</li><li>Araç yolculuklarında yaşına ve ölçülerine uygun, arkaya dönük çocuk koltuğu kullanın.</li></ul>
<p>Banyo her gün gerekli değildir. Bebeğin yüzü, boyun kıvrımları ve bez bölgesi nazikçe temizlenebilir. Bakım ürünlerinde yoğun koku ve tahriş edici içeriklerden kaçınmak, özel bir cilt sorunu varsa profesyonel öneri almak uygundur.</p>
<h2>Hangi Durumlarda Sağlık Profesyoneline Başvurulmalı?</h2>
<p>Yenidoğanlarda durum hızlı değişebileceği için ebeveynin “bebeğim her zamanki gibi değil” gözlemi önemlidir. Özellikle aşağıdaki belirtilerde aynı gün tıbbi değerlendirme alınmalı; bebek nefes alamıyor, morarıyor veya tepkisiz görünüyorsa acil yardım çağrılmalıdır:</p>
<ul><li>Rektal ölçümle 38 °C veya üzeri ateş ya da belirgin derecede düşük vücut ısısı,</li><li>Hızlı veya güçlükle soluma, inleme, göğüste çekilme ya da dudaklarda morarma,</li><li>Beslenmeyi reddetme, emememe, tekrarlayan ya da yeşil kusma,</li><li>Uyandırmakta güçlük, olağandışı gevşeklik, nöbet benzeri hareketler,</li><li>Beklenenden belirgin az idrar, ağız kuruluğu veya susuzluk şüphesi,</li><li>İlk gün içinde başlayan ya da hızla artan sarılık, solukluk veya yaygın döküntü,</li><li>Göbek çevresinde yayılan kızarıklık, kötü koku, irin ya da kanamanın sürmesi.</li></ul>
<p>Bu liste tanı koymak için değildir. Belirtinin öneminden emin değilseniz bebeği izleyen aile hekimi, ebe, çocuk doktoru veya acil sağlık hizmetiyle görüşün.</p>
<h2>Yenidoğan Dönemi Ne Zaman Biter?</h2>
<p>Yenidoğan dönemi doğumdan sonraki 28. gün tamamlandığında biter. Bir aylık bebek günlük konuşmada hâlâ “yeni doğmuş” olarak anılabilse de tıbbi olarak artık yenidoğan sınıfında değildir. Bakım ve kontroller ise takvimdeki bu sınırla sona ermez; büyüme, beslenme, gelişim ve aşı izlemleri bebeklik boyunca devam eder.</p>
<p>Dönemin bitişi her bebeğin aynı uyku veya beslenme düzenine geçeceği anlamına gelmez. Düzeltilmiş yaş değerlendirmesi gereken erken doğan bebeklerin gelişim izlemi de kendi koşullarına göre yapılır.</p>
<p><strong>Bilgilendirme notu:</strong> Bu içerik genel bilgilendirme amacıyla hazırlanmıştır ve tıbbi tanı veya tedavi yerine geçmez.</p>`,
  coverId: null,
  published: true,
  publishedAt: "2026-08-14T00:00:00.000Z",
  createdAt: "2026-08-14T00:00:00.000Z",
  updatedAt: "2026-08-14T00:00:00.000Z",
  cover: { id: "guide-yenidogan-nedir-cover", url: "/rehber/yenidogannedir.png", alt: "Yenidoğan nedir ve yenidoğan dönemi rehberi", createdAt: "2026-08-14T00:00:00.000Z" },
  faqs: newbornGuideFaqs,
};
