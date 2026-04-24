import Link from "next/link";
import type { Name, MediaAsset } from "@/types/database";
import { genderLabels, styleLabels } from "@/lib/labels";
import { FavoriteHeart } from "./FavoriteHeart";
import { MediaImage } from "./MediaImage";
import { Stars } from "./Stars";

export type NameWithImage = Name & { image: MediaAsset | null };

export function NameCard({ name, index }: { name: NameWithImage; index?: number }) {
  return (
    <article className="relative flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
      {typeof index === "number" && (
        <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent-pink-soft text-xs font-bold text-accent-pink">
          {index + 1}
        </div>
      )}
      <div className={`min-w-0 flex-1 space-y-2 ${typeof index === "number" ? "pt-6" : ""}`}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/isim/${name.slug}`} className="font-display text-xl font-semibold text-primary hover:underline">
              {name.displayName}
            </Link>
            <div className="mt-1 flex flex-wrap gap-1">
              <span className="rounded-full bg-accent-pink-soft px-2 py-0.5 text-xs font-medium text-accent-pink">
                {genderLabels[name.gender]}
              </span>
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-800">
                {styleLabels[name.style]}
              </span>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">
                {name.origin}
              </span>
            </div>
          </div>
          <FavoriteHeart slug={name.slug} />
        </div>
        <p className="text-sm text-muted">
          <span className="font-semibold text-foreground">Anlamı:</span> {name.meaning}
        </p>
        <p className="text-sm text-muted">
          <span className="font-semibold text-foreground">Kökeni:</span> {name.origin}
        </p>
        <p className="text-sm text-muted">
          <span className="font-semibold text-foreground">Okunuşu:</span> {name.pronunciation}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted">
          <span className="font-semibold text-foreground">Popülerlik:</span>
          <Stars value={name.popularity} />
        </p>
        <Link
          href={`/isim/${name.slug}`}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          Detayını gör
        </Link>
      </div>
      <div className="hidden shrink-0 sm:block">
        <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-md">
          <MediaImage
            src={name.image?.url ?? "/media/placeholder.svg"}
            alt={name.image?.alt ?? name.displayName}
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>
      </div>
    </article>
  );
}
