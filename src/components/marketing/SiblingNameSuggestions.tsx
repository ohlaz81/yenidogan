import Link from "next/link";
import type { Name } from "@/types/database";
import { getNameBySlug, getSiblingNameSuggestions, type SiblingNameSuggestion } from "@/lib/queries/names";

type Props =
  | {
      name: Name;
      slug?: never;
    }
  | {
      name?: never;
      slug: string;
    };

function suggestionCardClass(gender: "GIRL" | "BOY") {
  if (gender === "GIRL") return "border-accent-pink/20 bg-accent-pink-soft/35";
  return "border-accent-blue/20 bg-accent-blue-soft/35";
}

function suggestionTitleClass(gender: "GIRL" | "BOY") {
  if (gender === "GIRL") return "text-accent-pink";
  return "text-accent-blue";
}

function suggestionPillClass(gender: "GIRL" | "BOY") {
  const base =
    "inline-flex min-w-0 items-center justify-center rounded-full border bg-white/80 px-3 py-1.5 text-sm font-semibold shadow-sm transition hover:bg-white hover:shadow";
  if (gender === "GIRL") return `${base} border-accent-pink/20 text-accent-pink`;
  return `${base} border-accent-blue/20 text-accent-blue`;
}

function SuggestionGroup({
  emoji,
  title,
  gender,
  items,
}: {
  emoji: string;
  title: string;
  gender: "GIRL" | "BOY";
  items: SiblingNameSuggestion[];
}) {
  if (items.length === 0) return null;

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${suggestionCardClass(gender)}`}>
      <h3 className={`font-display text-lg font-semibold ${suggestionTitleClass(gender)}`}>
        <span aria-hidden="true">{emoji}</span> {title}
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <Link key={item.id} href={`/isim/${item.slug}`} className={suggestionPillClass(gender)}>
            {item.displayName}
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function SiblingNameSuggestions(props: Props) {
  const name = props.name ?? (await getNameBySlug(props.slug));
  if (!name) return null;

  const suggestions = await getSiblingNameSuggestions(name);
  if (suggestions.girls.length === 0 && suggestions.boys.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-semibold text-primary">
        {name.displayName} için kardeş isim önerileri
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SuggestionGroup emoji="👧" title="Kız Kardeş Seçenekleri" gender="GIRL" items={suggestions.girls} />
        <SuggestionGroup emoji="👦" title="Erkek Kardeş Seçenekleri" gender="BOY" items={suggestions.boys} />
      </div>
    </section>
  );
}
