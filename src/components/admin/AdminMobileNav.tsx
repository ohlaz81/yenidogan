import Link from "next/link";
import { adminNavFlat } from "@/lib/admin-nav";

/** Küçük ekranda yatay kaydırmalı hızlı menü */
export function AdminMobileNav() {
  return (
    <nav
      className="flex gap-1 overflow-x-auto border-b border-zinc-200 bg-zinc-50/90 px-2 py-2 lg:hidden"
      aria-label="Admin menü"
    >
      {adminNavFlat.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="shrink-0 rounded-lg border border-transparent bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 shadow-sm hover:border-violet-200 hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
