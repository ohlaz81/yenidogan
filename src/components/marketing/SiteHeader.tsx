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
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid h-[4.25rem] grid-cols-[2.75rem_1fr_2.75rem] items-center gap-2 sm:h-[4.5rem]">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg text-primary-foreground shadow-md transition hover:opacity-90 lg:hidden"
            aria-expanded={open}
            aria-label="Menü"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="leading-none">≡</span>
          </button>

          <Link
            href="/"
            className="flex min-w-0 flex-col items-center justify-center text-center"
            onClick={() => setOpen(false)}
          >
            <span className="flex items-center gap-1.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-pink-soft to-violet-100 text-base font-bold text-primary shadow-inner sm:h-10 sm:w-10 sm:text-lg">
                y
              </span>
              <span className="font-display text-base font-semibold leading-tight text-primary sm:text-lg">
                {site.name}
              </span>
            </span>
            <span className="mt-0.5 max-w-[16rem] truncate text-[0.65rem] leading-tight text-muted sm:max-w-none sm:text-xs">
              {site.tagline}
            </span>
          </Link>

          <div className="flex justify-end">
            <Link
              href="/isim-bulucu"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-yellow text-lg text-amber-950 shadow-md transition hover:brightness-95"
              aria-label="İsim bulucu"
            >
              ⌕
            </Link>
          </div>
        </div>

        <nav className="hidden border-t border-border/60 py-2 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-1 lg:border-t-0 lg:pt-0">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/85 transition hover:bg-accent-pink-soft hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/favorilerim"
            className="rounded-full px-3 py-2 text-sm font-medium text-foreground/85 transition hover:bg-accent-pink-soft hover:text-primary"
          >
            Favorilerim
          </Link>
        </nav>
      </div>

      {open && (
        <div className="max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto border-t border-border bg-white px-4 py-3 shadow-inner lg:hidden">
          <nav className="flex flex-col gap-0.5">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent-pink-soft"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/sss"
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent-pink-soft"
              onClick={() => setOpen(false)}
            >
              Sık sorulan sorular
            </Link>
            <Link
              href="/favorilerim"
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent-pink-soft"
              onClick={() => setOpen(false)}
            >
              Favorilerim
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
