import Link from "next/link";
import { requireAdminSession } from "@/lib/admin-auth";
import { getUserPermissions } from "@/lib/admin-permissions";
import { adminNavGroups, filterNavGroupsByPermissions } from "@/lib/admin-nav";
import { AdminSignOut } from "@/components/admin/AdminSignOut";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminSession();
  const email = session.user?.email ?? null;
  const userId = session.user!.id!;
  const perms = await getUserPermissions(userId);
  const navGroups = filterNavGroupsByPermissions(adminNavGroups, perms);
  const mobileNavItems = navGroups.flatMap((g) => g.items);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4 shadow-sm sm:px-6">
        <Link href="/admin" className="min-w-0 truncate font-display text-base font-semibold text-primary sm:text-lg">
          Yönetim paneli
        </Link>
        <AdminSignOut email={email} />
      </header>

        <AdminMobileNav items={mobileNavItems} />

      <div className="flex flex-1">
        <aside className="hidden w-56 shrink-0 border-r border-zinc-200 bg-white lg:block">
          <div className="border-b border-zinc-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Menü
          </div>
          <nav className="flex flex-col gap-4 p-3 text-sm">
            {navGroups.map((group) => (
              <div key={group.title}>
                <p className="px-2 pb-1.5 text-[0.65rem] font-bold uppercase tracking-wide text-zinc-400">{group.title}</p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-lg px-2 py-2 font-medium text-zinc-700 hover:bg-violet-50 hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link href="/" className="mt-2 rounded-lg px-2 py-2 text-zinc-500 hover:bg-zinc-50 hover:text-primary">
              ← Siteye dön
            </Link>
          </nav>
        </aside>

        <div className="min-w-0 flex-1 overflow-auto bg-zinc-50/50 p-4 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
