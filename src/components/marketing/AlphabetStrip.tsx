import Link from "next/link";

type Tone = "girl" | "boy";

const toneActive: Record<Tone, string> = {
  girl: "border-accent-pink bg-accent-pink-soft text-accent-pink shadow-sm",
  boy: "border-accent-blue bg-accent-blue-soft text-accent-blue shadow-sm",
};

const toneIdle: Record<Tone, string> = {
  girl: "border-border/80 bg-white text-primary hover:border-accent-pink/40 hover:bg-accent-pink-soft/50",
  boy: "border-border/80 bg-white text-primary hover:border-accent-blue/40 hover:bg-accent-blue-soft/50",
};

export function AlphabetStrip({
  letters,
  basePath,
  activeLetter,
  tone,
  ariaLabel = "İlk harfe göre filtrele",
}: {
  letters: string[];
  basePath: string;
  activeLetter: string | null;
  tone: Tone;
  ariaLabel?: string;
}) {
  const pill = "inline-flex min-h-8 min-w-8 items-center justify-center rounded-lg border px-2 py-1 text-sm font-semibold transition sm:min-w-9";
  const allActive = !activeLetter;

  return (
    <nav
      className="rounded-2xl border border-border/70 bg-card/80 px-2 py-2 shadow-sm sm:px-3 sm:py-2.5"
      aria-label={ariaLabel}
    >
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
        <Link
          href={basePath}
          className={`${pill} ${allActive ? toneActive[tone] : toneIdle[tone]}`}
          scroll={false}
        >
          Tümü
        </Link>
        {letters.map((L) => {
          const active = activeLetter != null && activeLetter === L;
          return (
            <Link
              key={L}
              href={`${basePath}?harf=${encodeURIComponent(L)}`}
              className={`${pill} ${active ? toneActive[tone] : toneIdle[tone]}`}
              scroll={false}
            >
              {L}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
