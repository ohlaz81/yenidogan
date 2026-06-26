"use client";

import { useSyncExternalStore } from "react";

const KEY = "yenidogan_favorites";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const v = JSON.parse(raw) as unknown;
    return Array.isArray(v) ? (v as string[]).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener("favorites-changed", onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener("favorites-changed", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function FavoriteHeart({ slug, variant = "icon" }: { slug: string; variant?: "icon" | "action" }) {
  const on = useSyncExternalStore(subscribe, () => read().includes(slug), () => false);

  function toggle() {
    const list = read();
    const next = on ? list.filter((s) => s !== slug) : [...list, slug];
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("favorites-changed"));
  }

  if (variant === "action") {
    return (
      <button
        type="button"
        onClick={toggle}
        className="inline-flex min-h-[72px] w-full flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-white px-3 py-2 text-center text-xs font-semibold text-primary shadow-sm transition hover:bg-accent-pink-soft sm:min-h-11 sm:w-auto sm:flex-row sm:gap-2 sm:px-4"
        aria-pressed={on}
        aria-label={on ? "Favorilerden çıkar" : "Favorilere ekle"}
      >
        <span className="text-lg leading-none text-accent-pink" aria-hidden="true">
          {on ? "♥" : "♡"}
        </span>
        <span className="leading-tight">Favorilere ekle</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-lg text-accent-pink shadow-sm transition hover:bg-accent-pink-soft"
      aria-pressed={on}
      aria-label={on ? "Favorilerden çıkar" : "Favorilere ekle"}
    >
      {on ? "♥" : "♡"}
    </button>
  );
}
