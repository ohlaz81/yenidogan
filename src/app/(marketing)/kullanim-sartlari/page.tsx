import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım şartları",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-muted">
      <h1 className="font-display text-3xl font-semibold text-primary text-foreground">Kullanım Şartları</h1>
      <p>
        Yenidogan.net üzerinde sunulan tüm içerikler yalnızca bilgilendirme amacı taşımaktadır. Platformda yer alan
        bebek isimleri, anlamları, köken bilgileri, kullanım oranları, popülerlik verileri ve Kur&apos;an&apos;da geçip
        geçmediğine dair bilgiler; genel kaynaklar, editoryal araştırmalar ve çeşitli bilgi derlemeleri doğrultusunda
        hazırlanmıştır.
      </p>
      <p>
        Sitemizde paylaşılan içerikler resmî nüfus kayıt işlemleri, hukuki süreçler, akademik kaynaklar veya dini
        danışmanlık yerine geçmez. Özellikle dini içerikler, isimlerin anlamları ya da kültürel yorumlar konusunda farklı
        kaynaklarda çeşitli görüşler ve bilgi farklılıkları bulunabilir. Bu nedenle kullanıcıların önemli kararlar
        öncesinde resmî kurumlar, uzman görüşleri veya güvenilir dini kaynaklardan ayrıca doğrulama yapmaları önerilir.
      </p>
      <p>
        Yenidogan.net&apos;te yer alan isim açıklamaları ve değerlendirmeler editoryal içerik niteliğindedir. Farklı
        kaynaklarda anlam, köken veya kullanım bilgileri değişiklik gösterebilir. Kullanıcı, platformu kullanarak bu
        bilgilerin genel rehberlik amacı taşıdığını kabul etmiş sayılır.
      </p>
      <p>
        Yenidogan.net, içeriklerin doğruluğu ve güncelliği için özen göstermektedir; ancak tüm bilgilerin her zaman
        eksiksiz veya kesin olduğu garanti edilmez. Siteyi kullanan ziyaretçiler, içerikleri kendi değerlendirmeleri
        doğrultusunda kullanmayı kabul eder.
      </p>
    </div>
  );
}
