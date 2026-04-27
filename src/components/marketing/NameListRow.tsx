import Link from "next/link";
import type { NameWithImage } from "./NameCard";
import { styleLabels } from "@/lib/labels";
import { nameDisplayTextClass, nameListRowHoverClass } from "@/lib/name-gender-styles";
import { FavoriteHeart } from "./FavoriteHeart";
import { MediaImage } from "./MediaImage";
import type { NameStyle } from "@/types/database";

function stylePillClass(s: NameStyle) {
  const map: Record<NameStyle, string> = {
    POPULAR: "bg-sky-100 text-sky-800 shadow-sm",
    MODERN: "bg-emerald-100 text-emerald-800 shadow-sm",
    CLASSIC: "bg-amber-100 text-amber-900 shadow-sm",
    RARE: "bg-violet-100 text-violet-800 shadow-sm",
  };
  return map[s] ?? "bg-zinc-100 text-zinc-800";
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-amber-200 to-amber-400 text-xs ring-1 ring-amber-500/30 sm:h-8 sm:w-8"
        aria-label={`Sıra ${rank}`}
      >
        🥇
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-slate-200 to-slate-400 text-xs ring-1 ring-slate-500/20 sm:h-8 sm:w-8"
        aria-label={`Sıra ${rank}`}
      >
        🥈
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-amber-800/30 to-amber-900/40 text-xs ring-1 ring-amber-800/25 sm:h-8 sm:w-8"
        aria-label={`Sıra ${rank}`}
      >
        🥉
      </span>
    );
  }
  return (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-primary sm:h-8 sm:w-8"
      aria-label={`Sıra ${rank}`}
    >
      {rank}
    </span>
  );
}

function NameBlock({ name }: { name: NameWithImage }) {
  return (
    <>
      <Link
        href={`/isim/${name.slug}`}
        className={`font-display text-base font-semibold hover:underline sm:text-lg ${nameDisplayTextClass(name.gender)}`}
      >
        {name.displayName}
      </Link>
      <p className="line-clamp-1 text-sm leading-relaxed text-muted sm:line-clamp-1">{name.meaning}</p>
    </>
  );
}

export function NameListRow({ name, rank }: { name: NameWithImage; rank: number }) {
  const qText = name.inQuran ? "Kur'an'da geçiyor" : "Kur'an'da geçmiyor";
  const styleT = styleLabels[name.style];
  const pill = stylePillClass(name.style);
  return (
    <li className="list-none">
      <div
        className={`border-b border-dashed border-violet-200/20 py-1 transition even:bg-slate-50/50 first:pt-0 last:border-b-0 last:pb-0 ${nameListRowHoverClass(name.gender)}`}
      >
        {/* Mobil: sıra+avatar+isim, altında tür|köken|Kur'an yan yana satır, sağda aksiyon üstte */}
        <div className="p-0.5 md:hidden">
          <div className="flex min-w-0 items-start gap-2">
            <div className="shrink-0 pt-0.5">
              <RankBadge rank={rank} />
            </div>
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
              <MediaImage
                src={name.image?.url ?? "/media/placeholder.svg"}
                alt={name.image?.alt ?? name.displayName}
                fill
                className="no-organic object-cover"
                sizes="48px"
              />
            </div>
            <div className="min-w-0 flex-1 pr-0">
              <NameBlock name={name} />
            </div>
            <div className="flex shrink-0 flex-col items-end gap-0.5 pt-0.5">
              <FavoriteHeart slug={name.slug} />
              <Link href={`/isim/${name.slug}`} className="text-xs font-semibold text-primary">
                Detay &gt;
              </Link>
            </div>
          </div>
          <p className="mt-2 pl-10 text-xs leading-relaxed text-muted/95 sm:pl-0">
            <span className={`inline-flex rounded-full px-2 py-0.5 font-medium ${pill}`}>{styleT}</span>
            <span className="px-1.5 text-muted/40" aria-hidden>
              |
            </span>
            <span className="font-medium text-foreground/80">Köken: </span>
            {name.origin}
            <span className="px-1.5 text-muted/40" aria-hidden>
              |
            </span>
            {qText}
          </p>
        </div>

        {/* Masaüstü: tüm sütunlar aynı satırda, Excel gridi gibi sert değil — yuvarlatılmış şerit */}
        <div className="hidden min-h-[3.4rem] grid-cols-[2.5rem_2.9rem_minmax(0,1.15fr)_5.5rem_6.25rem_8rem_4.5rem] items-center gap-1.5 py-0.5 sm:px-0 md:grid lg:min-h-14 lg:grid-cols-[2.6rem_3.1rem_minmax(0,1.2fr)_6rem_7.25rem_8.5rem_5.25rem] lg:gap-2">
          <div className="flex h-full items-center justify-center pl-0.5">
            <RankBadge rank={rank} />
          </div>
          <div className="relative h-[2.9rem] w-[2.9rem] justify-self-center overflow-hidden rounded-full border-2 border-white shadow-md sm:h-12 sm:w-12">
            <MediaImage
              src={name.image?.url ?? "/media/placeholder.svg"}
              alt={name.image?.alt ?? name.displayName}
              fill
              className="no-organic object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0 border-l border-violet-200/0 pl-1.5 pr-0.5 md:border-0">
            <NameBlock name={name} />
          </div>
          <div className="flex h-full w-full min-w-0 items-center justify-center pr-0.5">
            <span className={`inline-block w-full max-w-[5.5rem] rounded-full py-0.5 text-center text-xs font-semibold sm:py-1 sm:text-sm ${pill}`}>
              {styleT}
            </span>
          </div>
          <p className="w-full min-w-0 pl-0.5 text-left text-sm leading-tight text-muted/95 sm:text-sm">
            <span className="font-medium text-foreground/90">Köken: </span>
            {name.origin}
          </p>
          <p className="w-full min-w-0 pl-0.5 text-left text-sm leading-tight text-muted" title={qText}>
            {qText}
          </p>
          <div className="flex w-full min-w-0 items-center justify-end gap-1 pr-0.5 sm:gap-1.5 sm:pl-0.5">
            <FavoriteHeart slug={name.slug} />
            <Link href={`/isim/${name.slug}`} className="text-xs font-semibold text-primary hover:underline sm:text-sm">
              Detay &gt;
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
