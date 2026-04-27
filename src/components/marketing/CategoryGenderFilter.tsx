import Link from "next/link";

const basePill =
  "inline-flex min-h-9 items-center justify-center rounded-xl border px-3 py-1.5 text-sm font-semibold transition sm:min-h-10 sm:px-4";

export function CategoryGenderFilter({
  basePath,
  active,
}: {
  basePath: string;
  active: "GIRL" | "BOY" | null;
}) {
  return (
    <nav
      className="mb-3 rounded-2xl border border-border/70 bg-card/90 px-2 py-2 shadow-sm sm:px-3"
      aria-label="Cinsiyete göre filtrele"
    >
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <Link
          href={basePath}
          scroll={false}
          className={`${basePill} ${
            active == null
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border/80 bg-white text-primary hover:border-accent-pink/30 hover:bg-accent-pink-soft/30"
          }`}
        >
          Tümü
        </Link>
        <Link
          href={`${basePath}?cinsiyet=KIZ`}
          scroll={false}
          className={`${basePill} ${
            active === "GIRL"
              ? "border-accent-pink bg-accent-pink-soft text-accent-pink shadow-sm"
              : "border-border/80 bg-white text-primary hover:border-accent-pink/40 hover:bg-accent-pink-soft/50"
          }`}
        >
          Kız
        </Link>
        <Link
          href={`${basePath}?cinsiyet=ERKEK`}
          scroll={false}
          className={`${basePill} ${
            active === "BOY"
              ? "border-accent-blue bg-accent-blue-soft text-accent-blue shadow-sm"
              : "border-border/80 bg-white text-primary hover:border-accent-blue/40 hover:bg-accent-blue-soft/50"
          }`}
        >
          Erkek
        </Link>
      </div>
    </nav>
  );
}
