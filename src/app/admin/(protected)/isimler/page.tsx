import Link from "next/link";
import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { ADMIN_PERMISSIONS, requirePermission } from "@/lib/admin-permissions";
import { deleteNameAction, importSeedNamesAction } from "@/app/admin/actions/name";

type Props = {
  searchParams?: Promise<{ q?: string }>;
};

export default async function AdminNamesPage({ searchParams }: Props) {
  await requirePermission(ADMIN_PERMISSIONS.names);
  const sp = (await searchParams) ?? {};
  const q = (sp.q ?? "").trim();
  const s = getSupabase();
  let query = s.from("Name").select("*").order("displayName", { ascending: true }).limit(200);
  if (q.length > 0) {
    query = query.or(`displayName.ilike.%${q}%,slug.ilike.%${q}%`);
  }
  const { data: names, error } = await query;
  if (error) throw postgrestToError(error, "admin/isimler:Name");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary">İsimler</h1>
          <p className="text-sm text-zinc-600">Alfabetik liste</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <form action={importSeedNamesAction}>
            <button type="submit" className="rounded-2xl border border-primary px-4 py-2 text-sm font-bold text-primary hover:bg-violet-50">
              Mevcut isimleri içe aktar
            </button>
          </form>
          <Link href="/admin/isimler/yeni" className="rounded-2xl bg-primary px-4 py-2 text-sm font-bold text-white">
            Yeni isim
          </Link>
        </div>
      </div>
      <form action="/admin/isimler" className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="İsim veya slug ile ara"
          className="h-10 w-full max-w-sm rounded-xl border border-zinc-300 bg-white px-3 text-sm outline-none ring-primary focus:ring-2"
        />
        <button type="submit" className="h-10 rounded-xl bg-primary px-4 text-sm font-semibold text-white">
          Ara
        </button>
        {q ? (
          <Link href="/admin/isimler" className="text-sm font-medium text-zinc-600 hover:text-primary">
            Temizle
          </Link>
        ) : null}
      </form>
      {(names ?? []).length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-600">
          Henüz veritabanında isim yok. Yukarıdaki <strong>Mevcut isimleri içe aktar</strong> butonuna basarak önyüzdeki
          isimleri admin düzenlemeye açabilirsiniz.
        </div>
      ) : null}
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-zinc-100 bg-zinc-50 text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-3">İsim</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Cinsiyet</th>
              <th className="px-4 py-3">Yayın</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {(names ?? []).map((n) => (
              <tr key={n.id} className="border-b border-zinc-50">
                <td className="px-4 py-3 font-medium">{n.displayName}</td>
                <td className="px-4 py-3 text-zinc-600">{n.slug}</td>
                <td className="px-4 py-3">{n.gender}</td>
                <td className="px-4 py-3">{n.published ? "Evet" : "Hayır"}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/isimler/${n.id}`} className="font-semibold text-primary hover:underline">
                    Düzenle
                  </Link>
                  <form className="mt-1 block" action={deleteNameAction}>
                    <input type="hidden" name="id" value={n.id} />
                    <button type="submit" className="text-xs text-red-600 hover:underline">
                      Sil
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
