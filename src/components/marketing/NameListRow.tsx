import Link from "next/link";
import type { NameWithImage } from "./NameCard";
import { styleLabels } from "@/lib/labels";
import { FavoriteHeart } from "./FavoriteHeart";
import { MediaImage } from "./MediaImage";
import type { NameStyle } from "@/types/database";

function stylePillClass(s: NameStyle) {
  const map: Record<NameStyle, string> = {
    POPULAR: "bg-sky-100 text-sky-800",
    MODERN: "bg-emerald-100 text-emerald-800",
    CLASSIC: "bg-amber-100 text-amber-900",
    RARE: "bg-violet-100 text-violet-800",
  };
  return map[s] ?? "bg-zinc-100 text-zinc-800";
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-amber-200 to-amber-400 text-sm shadow-sm ring-1 ring-amber-500/30"
        aria-label={`Sıra ${rank}`}
      >
        🥇
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-slate-200 to-slate-400 text-sm shadow-sm ring-1 ring-slate-500/20"
        aria-label={`Sıra ${rank}`}
      >
        🥈
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-amber-700/40 to-amber-800/50 text-sm shadow-sm ring-1 ring-amber-800/30"
        aria-label={`Sıra ${rank}`}
      >
        🥉
      </span>
    );
  }
  return (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold tabular-nums text-primary"
      aria-label={`Sıra ${rank}`}
    >
      {rank}
    </span>
  );
}

/**
 * Kategori isim listeleri: satır; tıklanınca detay `/isim/[slug]`.
 */
export function NameListRow({ name, rank }: { name: NameWithImage; rank: number }) {
  return (
    <li className="border-b border-border/60 last:border-b-0">
      {/* Mobil: üstte sıra+avatar+isim+aksiyon, altta özet metalar */}
      <div className="p-1 py-3 md:hidden">
        <div className="flex min-w-0 items-start gap-2">
          <div className="shrink-0">
            <RankBadge rank={rank} />
          </div>
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border/60 bg-accent-pink-soft/30">
            <MediaImage
              src={name.image?.url ?? "/media/placeholder.svg"}
              alt={name.image?.alt ?? name.displayName}
              fill
              className="no-organic object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <Link
              href={`/isim/${name.slug}`}
              className="font-display text-base font-semibold text-primary hover:text-accent-pink"
            >
              {name.displayName}
            </Link>
            <p className="line-clamp-2 text-sm text-muted">{name.meaning}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${stylePillClass(name.style)}`}
              >
                {styleLabels[name.style]}
              </span>
              <span className="text-xs text-muted">Köken: {name.origin}</span>
              <span className="text-xs text-muted">
                {name.inQuran ? "Kur'an'da geçiyor" : "Kur'an'da geçmiyor"}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5 self-center">
            <FavoriteHeart slug={name.slug} />
            <Link
              href={`/isim/${name.slug}`}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Detay &gt;
            </Link>
          </div>
        </div>
      </div>

      {/* Masaüstü: yatay liste sütunları */}
      <div className="hidden min-h-[3.25rem] items-center gap-2 py-1 md:grid md:grid-cols-[2.5rem_3.25rem_minmax(0,1fr)_6.5rem_6rem_6.5rem_6rem] md:py-0 lg:grid-cols-[2.5rem_3.25rem_minmax(0,1fr)_6.5rem_6.5rem_7.5rem_6.5rem] lg:gap-3">
        <div className="flex justify-center">
          <RankBadge rank={rank} />
        </div>
        <div className="relative mx-auto h-12 w-12 overflow-hidden rounded-full border border-border/60 bg-accent-pink-soft/30">
          <MediaImage
            src={name.image?.url ?? "/media/placeholder.svg"}
            alt={name.image?.alt ?? name.displayName}
            fill
            className="no-organic object-cover"
            sizes="48px"
          />
        </div>
        <div className="min-w-0 pl-0.5 pr-1">
          <Link
            href={`/isim/${name.slug}`}
            className="font-display text-lg font-semibold text-primary hover:text-accent-pink"
          >
            {name.displayName}
          </Link>
          <p className="line-clamp-1 text-sm text-muted lg:line-clamp-2">{name.meaning}</p>
        </div>
        <div className="text-center">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-center text-xs font-medium ${stylePillClass(
              name.style,
            )}`}
          >
            {styleLabels[name.style]}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-muted">
          <span className="font-medium text-foreground">Köken: </span>
          {name.origin}
        </p>
        <p className="line-clamp-2 text-sm text-muted" title={name.inQuran ? "Evet" : "Hayır"}>
          <span className="mr-0.5" aria-hidden>
            {name.inQuran ? "📖" : "📄"}
          </span>
          {name.inQuran ? "Kur'an'da geçiyor" : "Kur'an'da geçmiyor"}
        </p>
        <div className="flex items-center justify-end gap-2">
          <FavoriteHeart slug={name.slug} />
          <Link href={`/isim/${name.slug}`} className="shrink-0 text-sm font-semibold text-primary hover:underline">
            Detay &gt;
          </Link>
        </div>
      </div>
    </li>
  );
}
