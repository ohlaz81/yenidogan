"use client";

import { useState } from "react";
import Link from "next/link";
import type { NameWithImage } from "@/components/marketing/NameCard";
import { genderLabels, styleLabels } from "@/lib/labels";
import {
  nameDisplayTextClass,
  nameGenderBadgeSmClass,
  nameRandomCardHeaderGradientClass,
} from "@/lib/name-gender-styles";
import { FavoriteHeart } from "@/components/marketing/FavoriteHeart";
import { MediaImage } from "@/components/marketing/MediaImage";

function pickImg(url: string | null | undefined, fallback: string) {
  if (typeof url === "string" && url.trim().length > 0) return url.trim();
  return fallback;
}

type FallbackByGender = { GIRL: string; BOY: string; UNISEX: string };

type Props = { initial: NameWithImage | null; fallbacks: FallbackByGender };

export function DiscoverRastgeleCard({ initial, fallbacks }: Props) {
  const [name, setName] = useState<NameWithImage | null>(initial);

  async function shuffle() {
    try {
      const ex = name?.slug ?? "";
      const qs = ex ? `?exclude=${encodeURIComponent(ex)}` : "";
      const r = await fetch(`/api/public/random-name${qs}`, { cache: "no-store" });
      if (!r.ok) return;
      const json: unknown = await r.json();
      if (
        json &&
        typeof json === "object" &&
        "slug" in json &&
        typeof (json as { slug: unknown }).slug === "string"
      ) {
        setName(json as NameWithImage);
      }
    } catch {
      // sessiz
    }
  }

  return (
    <div className="h-full overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm">
      <div
        className={`flex items-center justify-between px-2.5 py-2 text-white sm:px-3 sm:py-2.5 ${
          name ? nameRandomCardHeaderGradientClass(name.gender) : "bg-gradient-to-r from-primary to-accent-pink"
        }`}
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-wide sm:text-sm">
          Rastgele İsim Keşfet
        </span>
        <button
          type="button"
          onClick={shuffle}
          className="rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/20"
        >
          Yeni isim
        </button>
      </div>
      {name ? (
        <div>
          <div className="grid min-h-[10.5rem] grid-cols-2 grid-rows-1 gap-0 min-[500px]:min-h-[12.5rem]">
            <div className="flex min-w-0 flex-col justify-center gap-1 border-r border-border/50 p-2 pr-1.5 min-[420px]:gap-1.5 min-[420px]:p-2.5 min-[500px]:gap-2 min-[500px]:p-3 min-[500px]:pr-3">
              <div className="flex min-w-0 items-center gap-0.5 min-[420px]:gap-1.5">
                <h3
                  className={`font-display text-sm font-semibold leading-tight min-[420px]:text-base min-[500px]:text-lg sm:text-xl sm:leading-tight sm:text-2xl ${nameDisplayTextClass(name.gender)}`}
                >
                  {name.displayName}
                </h3>
                <FavoriteHeart slug={name.slug} />
              </div>
              <div className="flex min-w-0 flex-wrap gap-0.5 min-[420px]:gap-1 min-[500px]:gap-1.5 min-[500px]:text-sm">
                <span className={nameGenderBadgeSmClass(name.gender)}>{genderLabels[name.gender]}</span>
                <span className="rounded-full bg-violet-100 px-1.5 py-0.5 text-[0.58rem] font-medium text-violet-800 min-[420px]:px-2 min-[420px]:text-xs">
                  {styleLabels[name.style]}
                </span>
                <span className="max-w-full truncate rounded-full bg-amber-100 px-1.5 py-0.5 text-[0.58rem] font-medium text-amber-900 min-[420px]:px-2 min-[420px]:text-xs">
                  {name.origin}
                </span>
              </div>
              <p className="line-clamp-4 min-w-0 text-[0.62rem] leading-snug text-muted min-[420px]:line-clamp-5 min-[420px]:text-xs min-[500px]:text-sm min-[500px]:leading-tight">
                <span className="font-semibold text-foreground">Anlamı:</span> {name.meaning}
              </p>
            </div>
            <div className="relative min-h-[10.5rem] w-full min-w-0 min-[500px]:min-h-0 min-[500px]:self-stretch">
              <MediaImage
                src={pickImg(name.image?.url, fallbacks[name.gender])}
                alt={name.image?.alt ?? name.displayName}
                fill
                className="no-organic object-cover"
                sizes="(max-width: 500px) 50vw, 25vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/10 to-transparent to-40%"
                aria-hidden
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-border/50 p-2.5 sm:gap-2.5 sm:p-3">
            <button
              type="button"
              className="h-8 rounded-lg border border-border text-xs font-semibold text-muted min-[400px]:text-sm sm:rounded-xl"
            >
              Favorilere ekle
            </button>
            <Link
              href={`/isim/${name.slug}`}
              className="inline-flex h-8 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-white min-[400px]:text-sm sm:rounded-xl"
            >
              Detayı gör
            </Link>
          </div>
        </div>
      ) : (
        <p className="p-3 text-sm text-muted">Henüz yayınlanmış isim yok.</p>
      )}
    </div>
  );
}
