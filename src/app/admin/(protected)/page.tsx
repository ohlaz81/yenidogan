import Link from "next/link";
import { getSupabase } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/admin-auth";
import { ADMIN_PERMISSIONS, getUserPermissions } from "@/lib/admin-permissions";
import { getStaticGuides } from "@/data/static-guide";
import { getStaticNameCount } from "@/lib/static/names-store";
import { adminNavGroups, filterNavGroupsByPermissions } from "@/lib/admin-nav";

export default async function AdminHomePage() {
  const session = await requireAdminSession();
  const userId = session.user!.id!;
  const perms = await getUserPermissions(userId);
  const navFiltered = filterNavGroupsByPermissions(adminNavGroups, perms);
  const navFlatFiltered = navFiltered.flatMap((g) => g.items);
  const s = getSupabase();
  let messages = 0;
  if (perms.has(ADMIN_PERMISSIONS.contact)) {
    const u = await s.from("ContactMessage").select("id", { count: "exact", head: true }).eq("read", false);
    messages = u.error ? 0 : (u.count ?? 0);
  }
  const nameCount = getStaticNameCount();
  const guideCount = getStaticGuides().length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-primary">Özet</h1>
        <p className="text-sm text-zinc-600">
          Pazarlama sitesindeki isim listeleri çoğunlukla kod verisinden gelir. Bu panelde veritabanı kayıtları (isimler,
          SSS, rehber, medya), iletişim mesajları ve çıkış yönetilir.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Kodda tanımlı isim (yaklaşık)", value: nameCount, href: null as string | null },
          {
            label: "Kodda rehber yazısı",
            value: guideCount,
            href: perms.has(ADMIN_PERMISSIONS.content) ? "/admin/rehber" : null,
          },
          {
            label: "Okunmamış mesaj",
            value: messages,
            href: perms.has(ADMIN_PERMISSIONS.contact) ? "/admin/iletisim" : null,
          },
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

      <section>
        <h2 className="font-display text-lg font-semibold text-primary">Bölümler</h2>
        <p className="mt-1 text-sm text-zinc-600">Sol menü veya aşağıdaki kısayollar.</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {navFlatFiltered
            .filter((x) => x.href !== "/admin")
            .map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-violet-200 hover:shadow"
                >
                  <span className="font-semibold text-primary">{item.label}</span>
                  {item.description ? <p className="mt-1 text-xs text-zinc-500">{item.description}</p> : null}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
