import Link from "next/link";
import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { requireAdminSession } from "@/lib/admin-auth";
import { deleteNameAction } from "@/app/admin/actions/name";

export default async function AdminNamesPage() {
  await requireAdminSession();
  const s = getSupabase();
  const { data: names, error } = await s
    .from("Name")
    .select("*")
    .order("updatedAt", { ascending: false })
    .limit(200);
  if (error) throw postgrestToError(error, "admin/isimler:Name");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary">İsimler</h1>
          <p className="text-sm text-zinc-600">Son güncellenen kayıtlar</p>
        </div>
        <Link href="/admin/isimler/yeni" className="rounded-2xl bg-primary px-4 py-2 text-sm font-bold text-white">
          Yeni isim
        </Link>
      </div>
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
