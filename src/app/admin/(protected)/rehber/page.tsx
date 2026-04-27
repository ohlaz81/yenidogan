import Link from "next/link";
import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { ADMIN_PERMISSIONS, requirePermission } from "@/lib/admin-permissions";
import { deleteGuideAction } from "@/app/admin/actions/guide";

export default async function AdminGuideListPage() {
  await requirePermission(ADMIN_PERMISSIONS.content);
  const s = getSupabase();
  const { data: items, error } = await s.from("GuideArticle").select("*").order("updatedAt", { ascending: false });
  if (error) throw postgrestToError(error, "admin/rehber:GuideArticle");
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold text-primary">Rehber yazıları</h1>
        <Link href="/admin/rehber/yeni" className="rounded-2xl bg-primary px-4 py-2 text-sm font-bold text-white">
          Yeni yazı
        </Link>
      </div>
      <ul className="space-y-2">
        {(items ?? []).map((a) => (
          <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm">
            <span className="font-medium">{a.title}</span>
            <div className="flex items-center gap-3">
              <Link href={`/admin/rehber/${a.id}`} className="font-semibold text-primary hover:underline">
                Düzenle
              </Link>
              <form action={deleteGuideAction}>
                <input type="hidden" name="id" value={a.id} />
                <button type="submit" className="text-xs text-red-600 hover:underline">
                  Sil
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
