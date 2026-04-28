import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { ADMIN_PERMISSIONS, requirePermission } from "@/lib/admin-permissions";
import { updateFeaturedSlot } from "@/app/admin/actions/home";

type NameLite = { id: string; displayName: string; slug: string; gender: "GIRL" | "BOY" | "UNISEX"; popularScore: number };
type Slot = { id: string; column: "girl" | "boy"; position: number; nameId: string | null };

export default async function AdminHomeSettingsPage() {
  await requirePermission(ADMIN_PERMISSIONS.homeFeatured);
  const s = getSupabase();
  const [{ data: rows, error: slotsErr }, { data: names, error: namesErr }] = await Promise.all([
    s.from("HomeFeaturedName").select("id,column,position,nameId").order("column").order("position"),
    s.from("Name").select("id,displayName,slug,gender,popularScore").eq("published", true).order("popularScore", { ascending: false }).limit(500),
  ]);
  if (slotsErr) throw postgrestToError(slotsErr, "admin/anasayfa:HomeFeaturedName");
  if (namesErr) throw postgrestToError(namesErr, "admin/anasayfa:Name");

  const slots = (rows ?? []) as Slot[];
  const allNames = (names ?? []) as NameLite[];
  const girlNames = allNames.filter((n) => n.gender !== "BOY");
  const boyNames = allNames.filter((n) => n.gender !== "GIRL");
  const byId = new Map(allNames.map((n) => [n.id, n]));

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-display text-2xl font-semibold text-primary">Ana sayfa öne çıkan isimler</h1>
        <p className="text-sm text-zinc-600">
          Buradaki slotlar ana sayfadaki popüler isim şeridini besler. Değişiklikten sonra ana sayfayı yenileyip sonucu
          kontrol edebilirsiniz.
        </p>
      </div>

      {(["girl", "boy"] as const).map((col) => {
        const colSlots = slots.filter((x) => x.column === col).sort((a, b) => a.position - b.position);
        const options = col === "girl" ? girlNames : boyNames;
        return (
          <section key={col} className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-primary">
              {col === "girl" ? "Kız öne çıkan slotları" : "Erkek öne çıkan slotları"}
            </h2>
            {colSlots.length === 0 ? (
              <p className="text-sm text-zinc-600">Bu kolon için slot bulunamadı. Migration seed’i çalıştırılmalı.</p>
            ) : (
              <div className="space-y-3">
                {colSlots.map((slot) => {
                  const selected = slot.nameId ? byId.get(slot.nameId) : null;
                  return (
                    <form key={slot.id} action={updateFeaturedSlot} className="grid gap-2 rounded-xl border border-zinc-100 p-3 sm:grid-cols-[8rem_1fr_auto] sm:items-center">
                      <input type="hidden" name="slotId" value={slot.id} />
                      <p className="text-sm font-semibold text-zinc-700">Slot {slot.position + 1}</p>
                      <select
                        name="nameId"
                        defaultValue={slot.nameId ?? ""}
                        className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                      >
                        <option value="">— Boş bırak —</option>
                        {options.map((n) => (
                          <option key={n.id} value={n.id}>
                            {n.displayName} ({n.slug})
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
