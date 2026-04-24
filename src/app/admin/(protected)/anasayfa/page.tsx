import { getSupabase } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/admin-auth";
import { updateFeaturedSlot } from "@/app/admin/actions/home";

export default async function AdminHomeSettingsPage() {
  await requireAdminSession();
  const s = getSupabase();
  const [a, b] = await Promise.all([
    s.from("HomeFeaturedName").select("*").order("column", { ascending: true }).order("position", { ascending: true }),
    s
      .from("Name")
      .select("id, displayName")
      .eq("published", true)
      .order("displayName", { ascending: true }),
  ]);
  if (a.error) throw a.error;
  if (b.error) throw b.error;
  const slots = a.data ?? [];
  const names = b.data ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-primary">Ana sayfa — öne çıkan isimler</h1>
        <p className="text-sm text-zinc-600">Popüler kız / erkek bloklarındaki kartları buradan değiştirin.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {["girl", "boy"].map((col) => (
          <div key={col} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="font-semibold text-primary">{col === "girl" ? "Kız" : "Erkek"} sıralaması</p>
            <div className="mt-4 space-y-4">
              {slots
                .filter((s) => s.column === col)
                .map((s) => (
                  <form key={s.id} action={updateFeaturedSlot} className="flex items-center gap-2 text-sm">
                    <input type="hidden" name="slotId" value={s.id} />
                    <span className="w-6 text-zinc-500">#{s.position + 1}</span>
                    <select name="nameId" defaultValue={s.nameId ?? ""} className="flex-1 rounded-lg border border-zinc-200 px-2 py-1">
                      <option value="">(Boş)</option>
                      {names.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.displayName}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="rounded-lg bg-primary px-3 py-1 text-xs font-bold text-white">
                      Kaydet
                    </button>
                  </form>
                ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-zinc-500">
        Kahraman görseli, hızlı kısayollar ve vitrin kartları için veritabanı seed kayıtlarını kullanıyoruz; ileride ayrı
        yönetim alanları genişletilebilir.
      </p>
    </div>
  );
}
