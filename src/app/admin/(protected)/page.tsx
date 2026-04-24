import Link from "next/link";
import { getSupabase } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/admin-auth";
import { getStaticGuides } from "@/data/static-guide";
import { getStaticNameCount } from "@/lib/static/names-store";

export default async function AdminHomePage() {
  await requireAdminSession();
  const s = getSupabase();
  const u = await s.from("ContactMessage").select("id", { count: "exact", head: true }).eq("read", false);
  const messages = u.error ? 0 : (u.count ?? 0);
  const nameCount = getStaticNameCount();
  const guideCount = getStaticGuides().length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-primary">Özet</h1>
        <p className="text-sm text-zinc-600">
          İsim ve rehber içerikleri depodaki kod dosyalarından gelir. Veritabanı yalnızca yönetim (iletişim vb.) içindir.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Kodda tanımlı isimler", value: nameCount, href: null as string | null },
          { label: "Kodda rehber yazısı", value: guideCount, href: null as string | null },
          { label: "Okunmamış mesaj", value: messages, href: "/admin/iletisim" },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-zinc-600">{c.label}</p>
            <p className="mt-2 text-3xl font-bold text-primary">{c.value}</p>
            {c.href && (
              <Link href={c.href} className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
                Aç →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
