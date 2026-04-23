import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik politikası",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-muted">
      <h1 className="font-display text-3xl font-semibold text-primary text-foreground">Gizlilik politikası</h1>
      <p>
        Bu sayfa örnek metindir. Yayına almadan önce hukuk danışmanınızla güncelleyin. Bülten ve iletişim formlarında
        toplanan e-postalar yalnızca iletişim ve bilgilendirme amaçlı kullanılır; üçüncü taraflara satılmaz.
      </p>
      <h2>Çerezler</h2>
      <p>Temel oturum ve güvenlik için gerekli teknik çerezler kullanılabilir.</p>
    </div>
  );
}
