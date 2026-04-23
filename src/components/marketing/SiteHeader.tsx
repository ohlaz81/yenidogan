"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "/kiz-isimleri", label: "Kız İsimleri" },
  { href: "/erkek-isimleri", label: "Erkek İsimleri" },
  { href: "/kuranda-gecen-isimler", label: "Kur'an'da Geçen" },
  { href: "/populer-isimler", label: "Popüler" },
  { href: "/modern-isimler", label: "Modern" },
  { href: "/nadir-isimler", label: "Nadir" },
  { href: "/tum-isimler", label: "A–Z" },
  { href: "/isim-bulucu", label: "İsim Bulucu" },
  { href: "/isim-rehberi", label: "İsim Rehberi" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm lg:hidden"
          aria-expanded={open}
          aria-label="Menü"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-lg">≡</span>
        </button>

        <Link href="/" className="flex min-w-0 flex-1 items-center gap-2 lg:flex-none">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent-pink-soft text-xl font-bold text-primary">
            y
          </span>
          <span className="min-w-0">
            <span className="block font-display text-lg font-semibold leading-tight text-primary">{site.name}</span>
            <span className="hidden text-xs text-muted sm:block">{site.tagline}</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:bg-accent-pink-soft hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/isim-bulucu"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-yellow text-lg text-amber-950 shadow-sm"
          aria-label="İsim bulucu"
        >
          ⌕
        </Link>
      </div>

      {open && (
        <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-accent-pink-soft"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <Link href="/sss" className="rounded-xl px-3 py-2 text-sm hover:bg-accent-pink-soft" onClick={() => setOpen(false)}>
              Sık sorulan sorular
            </Link>
            <Link href="/favorilerim" className="rounded-xl px-3 py-2 text-sm hover:bg-accent-pink-soft" onClick={() => setOpen(false)}>
              Favorilerim
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
