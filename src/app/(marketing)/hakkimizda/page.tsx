import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-semibold text-primary">Hakkımızda</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        yenidoğan.net, bebek isimlerini anlam, köken ve kategori bazında keşfetmeniz için tasarlanmıştır. İçerik,
        sitede gösterilen sayfalarda yayımlanır; düzenlemeler kod deposu veya içerik ekipleri tarafından
        sürümlerle yönetilebilir.
      </p>
      <p className="mt-4 text-muted">
        Amacımız; anne-baba adaylarına sade, mobil uyumlu ve anlaşılır bir arayüzle bilgi sunmak, isim seçimini
        rehber yazıları ve listelerle kolaylaştırmaktır. İletişim ve bülten kayıtları yalnızca yönetim
        (admin) amaçlı; isim arşivinin kendisi veritabanı dışı, kod veya depo tabanlı kurgudur.
      </p>
    </div>
  );
}
