"use client";

import { useEffect, useState } from "react";

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

export function FavoriteHeart({ slug }: { slug: string }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(read().includes(slug));
  }, [slug]);

  function toggle() {
    const list = read();
    const next = on ? list.filter((s) => s !== slug) : [...list, slug];
    localStorage.setItem(KEY, JSON.stringify(next));
    setOn(!on);
    window.dispatchEvent(new Event("favorites-changed"));
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
