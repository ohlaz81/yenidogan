import { getSupabase } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/admin-auth";
import { markMessageRead } from "@/app/admin/actions/message";

export default async function AdminInboxPage() {
  await requireAdminSession();
  const s = getSupabase();
  const { data: msgs, error } = await s
    .from("ContactMessage")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(100);
  if (error) throw error;
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-primary">İletişim kutusu</h1>
      <ul className="space-y-3">
        {(msgs ?? []).map((m) => (
          <li key={m.id} className="rounded-xl border border-zinc-200 bg-white p-4 text-sm shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold">{m.name}</span>
              <span className="text-xs text-zinc-500">{m.createdAt.toLocaleString("tr-TR")}</span>
            </div>
            <p className="text-xs text-zinc-600">{m.email}</p>
            <p className="mt-2 whitespace-pre-wrap text-zinc-800">{m.message}</p>
            {!m.read && (
              <form action={markMessageRead} className="mt-2">
                <input type="hidden" name="id" value={m.id} />
                <button type="submit" className="text-xs font-semibold text-primary hover:underline">
                  Okundu işaretle
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
