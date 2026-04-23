import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım şartları",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 text-muted">
      <h1 className="font-display text-3xl font-semibold text-primary text-foreground">Kullanım şartları</h1>
      <p>
        Platformdaki içerikler bilgilendirme amaçlıdır; resmî kayıt veya dini danışmanlık yerine geçmez. İsim anlamları
        editoryal derlemedir; farklı kaynaklarda varyasyonlar olabilir.
      </p>
    </div>
  );
}
