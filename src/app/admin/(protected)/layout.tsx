import Link from "next/link";
import { requireAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "Özet" },
  { href: "/admin/iletisim", label: "İletişim" },
];

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  await requireAdminSession();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-56 shrink-0 border-r border-zinc-200 bg-white lg:block">
        <div className="border-b border-zinc-100 px-4 py-4 font-semibold text-primary">Admin</div>
        <nav className="flex flex-col p-2 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 font-medium text-zinc-700 hover:bg-violet-50 hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <p className="mt-4 px-3 text-xs leading-relaxed text-zinc-500">
            İsim listesi ve rehber yazıları sitede koddan gelir. Diğer yönetim ekranları (eski URL’ler) varsa doğrudan
            adresle açılabilir; menüde gösterilmez.
          </p>
          <Link href="/" className="mt-4 rounded-lg px-3 py-2 text-zinc-500 hover:bg-zinc-50">
            Siteye dön →
          </Link>
        </nav>
      </aside>
      <div className="flex-1 overflow-auto p-4 lg:p-8">{children}</div>
    </div>
  );
}
