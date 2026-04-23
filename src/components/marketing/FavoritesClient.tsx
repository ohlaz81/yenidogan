"use client";

import { useEffect, useState } from "react";
import { NameCard, type NameWithImage } from "./NameCard";

const KEY = "yenidogan_favorites";

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const v = JSON.parse(raw) as unknown;
    return Array.isArray(v) ? (v as string[]).filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function FavoritesClient() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [names, setNames] = useState<NameWithImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSlugs(read());
    const onChange = () => setSlugs(read());
    window.addEventListener("favorites-changed", onChange);
    return () => window.removeEventListener("favorites-changed", onChange);
  }, []);

  useEffect(() => {
    if (!slugs.length) {
      setNames([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/public/names?slugs=${encodeURIComponent(slugs.join(","))}`)
      .then((r) => r.json())
      .then((data: NameWithImage[]) => setNames(data))
      .finally(() => setLoading(false));
  }, [slugs]);

  if (loading) return <p className="mt-8 text-muted">Yükleniyor…</p>;
  if (!slugs.length) return <p className="mt-8 text-muted">Henüz favori eklemediniz.</p>;
  if (!names.length) return <p className="mt-8 text-muted">Favori isimler bulunamadı.</p>;

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {names.map((n) => (
        <NameCard key={n.id} name={n} />
      ))}
    </div>
  );
}
