import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik politikası",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-muted">
      <h1 className="font-display text-3xl font-semibold text-primary text-foreground">Gizlilik Politikası</h1>
      <p className="text-sm">Son Güncelleme Tarihi: 29.04.2026</p>
      <p>
        Yenidogan.net olarak ziyaretçilerimizin gizliliğine önem veriyoruz. Web sitemiz, kullanıcılarına bebek isimleri
        hakkında bilgi sunmak amacıyla hazırlanmıştır ve ziyaretçilerden doğrudan kişisel bilgi talep etmez.
      </p>
      <h2 className="font-semibold text-foreground">1. Kişisel Bilgiler</h2>
      <p>
        Yenidogan.net üzerinden üyelik sistemi, kayıt formu veya doğrudan kişisel veri talebi bulunmamaktadır.
        Kullanıcılar, isim, adres, telefon numarası gibi kişisel bilgilerini paylaşmadan sitemizi ziyaret edebilir.
      </p>
      <h2 className="font-semibold text-foreground">2. Otomatik Toplanan Veriler</h2>
      <p>
        Web sitemiz, performans analizi ve kullanıcı deneyimini geliştirmek amacıyla IP adresi, tarayıcı türü, cihaz
        bilgisi ve ziyaret edilen sayfalar gibi anonim teknik veriler toplayabilir. Bu veriler kişisel kimlik belirleme
        amacıyla kullanılmaz.
      </p>
      <h2 className="font-semibold text-foreground">3. Çerezler (Cookies)</h2>
      <p>
        Yenidogan.net, site performansını artırmak ve kullanıcı deneyimini geliştirmek amacıyla çerezler kullanabilir.
        Çerezler, kullanıcı tercihlerini hatırlamaya ve site trafiğini analiz etmeye yardımcı olur.
      </p>
      <h2 className="font-semibold text-foreground">4. Reklam ve Analiz Hizmetleri</h2>
      <p>
        Web sitemizde Google Analytics veya Google Adsense gibi üçüncü taraf hizmetler kullanılabilir. Bu hizmetler,
        kendi politikaları doğrultusunda anonim veriler toplayabilir.
      </p>
      <h2 className="font-semibold text-foreground">5. Veri Güvenliği</h2>
      <p>
        Yenidogan.net, ziyaretçi güvenliğini önemser ve teknik altyapısını korumak için gerekli güvenlik önlemlerini
        uygular.
      </p>
      <h2 className="font-semibold text-foreground">6. Dış Bağlantılar</h2>
      <p>Sitemizde yer alan üçüncü taraf bağlantıların gizlilik uygulamalarından Yenidogan.net sorumlu değildir.</p>
      <h2 className="font-semibold text-foreground">7. Politika Güncellemeleri</h2>
      <p>
        Gizlilik Politikamız gerektiğinde güncellenebilir. Güncellenen içerikler bu sayfa üzerinden yayınlandığı anda
        geçerlilik kazanır.
      </p>
      <h2 className="font-semibold text-foreground">8. İletişim</h2>
      <p>Gizlilik politikamızla ilgili sorularınız için Yenidogan.net üzerinden bizimle iletişime geçebilirsiniz.</p>
      <p>Yenidogan.net’i kullanarak bu politikayı kabul etmiş sayılırsınız.</p>
    </div>
  );
}
