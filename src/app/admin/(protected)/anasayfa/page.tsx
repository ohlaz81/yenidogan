import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { ADMIN_PERMISSIONS, requirePermission } from "@/lib/admin-permissions";
import { updateFeaturedSlot } from "@/app/admin/actions/home";
import { importSeedNamesAction } from "@/app/admin/actions/name";

type NameLite = {
  id: string;
  displayName: string;
  slug: string;
  gender: "GIRL" | "BOY" | "UNISEX";
  popularScore: number;
  published: boolean;
};
type Slot = { id: string; column: "girl" | "boy"; position: number; nameId: string | null };

export default async function AdminHomeSettingsPage() {
  await requirePermission(ADMIN_PERMISSIONS.homeFeatured);
  const s = getSupabase();
  const [{ data: rows, error: slotsErr }, { data: names, error: namesErr }] = await Promise.all([
    s.from("HomeFeaturedName").select("id,column,position,nameId").order("column").order("position"),
    s
      .from("Name")
      .select("id,displayName,slug,gender,popularScore,published")
      .order("published", { ascending: false })
      .order("popularScore", { ascending: false })
      .limit(500),
  ]);
  if (slotsErr) throw postgrestToError(slotsErr, "admin/anasayfa:HomeFeaturedName");
  if (namesErr) throw postgrestToError(namesErr, "admin/anasayfa:Name");

  const slots = (rows ?? []) as Slot[];
  const allNames = (names ?? []) as NameLite[];
  const byNameAsc = (a: NameLite, b: NameLite) =>
    a.displayName.localeCompare(b.displayName, "tr-TR", { sensitivity: "base" });
  const girlNames = allNames.filter((n) => n.gender !== "BOY").sort(byNameAsc);
  const boyNames = allNames.filter((n) => n.gender !== "GIRL").sort(byNameAsc);
  const byId = new Map(allNames.map((n) => [n.id, n]));

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-display text-2xl font-semibold text-primary">Türkiye&apos;deki popüler isim şeridi</h1>
        <p className="text-sm text-zinc-600">
          Buradaki alanlar ana sayfadaki «Türkiye&apos;de En Popüler İsimler» bölümünde görünen isimleri belirler. Şu an
          ön yüzde ilk 3 isim gösterilir; devamını bu panelden düzenleyebilirsiniz. İsimler Supabase&apos;teki yayınlı
          kayıtlardan seçilir. Kayıttan sonra ana sayfayı yenileyerek kontrol edin.
        </p>
        {allNames.length === 0 ? (
          <form action={importSeedNamesAction}>
            <button type="submit" className="mt-2 rounded-xl border border-primary px-3 py-2 text-sm font-semibold text-primary hover:bg-violet-50">
              Seçim listesi için mevcut isimleri içe aktar
            </button>
          </form>
        ) : null}
      </div>

      {(["girl", "boy"] as const).map((col) => {
        const colSlots = slots.filter((x) => x.column === col).sort((a, b) => a.position - b.position);
        const options = col === "girl" ? girlNames : boyNames;
        return (
          <section key={col} className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-primary">
              {col === "girl" ? "Kız isimleri (görünüm sırası)" : "Erkek isimleri (görünüm sırası)"}
            </h2>
            {colSlots.length === 0 ? (
              <p className="text-sm text-zinc-600">Bu kolon için kayıt bulunamadı. Migration seed&apos;i çalıştırılmalı.</p>
            ) : (
              <div className="space-y-3">
                {colSlots.map((slot) => {
                  const selected = slot.nameId ? byId.get(slot.nameId) : null;
                  return (
                    <form key={slot.id} action={updateFeaturedSlot} className="grid gap-2 rounded-xl border border-zinc-100 p-3 sm:grid-cols-[8rem_1fr_auto] sm:items-center">
                      <input type="hidden" name="slotId" value={slot.id} />
                      <p className="text-sm font-semibold text-zinc-700">Sıra {slot.position + 1}</p>
                      <select
                        name="nameId"
                        defaultValue={slot.nameId ?? ""}
                        className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                      >
                        <option value="">— Boş bırak —</option>
                        {options.map((n) => (
                          <option key={n.id} value={n.id}>
                            {n.displayName} ({n.slug}){n.published ? "" : " [Yayında değil]"}
                          </option>
                        ))}
                      </select>
                      <button type="submit" className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                        Kaydet
                      </button>
                      <p className="sm:col-span-3 text-xs text-zinc-500">
                        Mevcut: {selected ? `${selected.displayName} (${selected.slug})` : "Seçilmemiş"}
                      </p>
                    </form>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
