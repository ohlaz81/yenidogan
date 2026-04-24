import { requireAdminSession } from "@/lib/admin-auth";

/**
 * Ana sayfa öne çıkan isimler artık `src/data/baby-names.ts` + `getHomePageData` ile kodda;
 * bu ekran devre dışı bırakıldı.
 */
export default async function AdminHomeSettingsPage() {
  await requireAdminSession();

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-semibold text-primary">Ana sayfa</h1>
      <p className="text-sm text-zinc-600">
        Ana sayfa vitrini (hero, kategoriler, öne çıkan kız/erkek isimleri, rastgele isim) uygulama kodunda
        tanımlıdır. İçerik değişiklikleri için <code className="rounded bg-zinc-100 px-1">src/data/baby-names.ts</code> ve{" "}
        <code className="rounded bg-zinc-100 px-1">src/lib/queries/home-fallbacks.ts</code> dosyalarını düzenleyin; ardından
        siteyi yeniden dağıtın.
      </p>
    </div>
  );
}
