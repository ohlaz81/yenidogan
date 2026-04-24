import Link from "next/link";
import { getSupabase } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function AdminHomePage() {
  await requireAdminSession();
  const s = getSupabase();
  const [n, a, m, u] = await Promise.all([
    s.from("Name").select("id", { count: "exact", head: true }),
    s.from("GuideArticle").select("id", { count: "exact", head: true }),
    s.from("MediaAsset").select("id", { count: "exact", head: true }),
    s.from("ContactMessage").select("id", { count: "exact", head: true }).eq("read", false),
  ]);
  const names = n.count ?? 0;
  const articles = a.count ?? 0;
  const media = m.count ?? 0;
  const messages = u.count ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-primary">Özet</h1>
        <p className="text-sm text-zinc-600">İçerik durumu</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "İsimler", value: names, href: "/admin/isimler" },
          { label: "Rehber yazıları", value: articles, href: "/admin/rehber" },
          { label: "Medya dosyası", value: media, href: "/admin/medya" },
          { label: "Okunmamış mesaj", value: messages, href: "/admin/iletisim" },
        ].map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-primary/40"
          >
            <p className="text-sm text-zinc-600">{c.label}</p>
            <p className="mt-2 text-3xl font-bold text-primary">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
