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
  if (gender === "GIRL") return "border-accent-pink/15 bg-pink-50/35";
  return "border-accent-blue/15 bg-sky-50/35";
}

function suggestionTitleClass(gender: "GIRL" | "BOY") {
  if (gender === "GIRL") return "text-accent-pink/90";
  return "text-accent-blue/90";
}

function suggestionPillClass(gender: "GIRL" | "BOY") {
  const base = "rounded-full px-3 py-1 text-sm font-semibold transition hover:underline";
  if (gender === "GIRL") return `${base} bg-accent-pink-soft/70 text-accent-pink`;
  return `${base} bg-accent-blue-soft/70 text-accent-blue`;
}

function SuggestionGroup({
  title,
  gender,
  items,
}: {
  title: string;
  gender: "GIRL" | "BOY";
  items: SiblingNameSuggestion[];
}) {
  if (items.length === 0) return null;

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${suggestionCardClass(gender)}`}>
      <h3 className={`font-display text-base font-semibold ${suggestionTitleClass(gender)}`}>{title}</h3>
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
        {name.displayName} ile uyumlu kardeş isimleri
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SuggestionGroup title="Kız kardeş isimleri" gender="GIRL" items={suggestions.girls} />
        <SuggestionGroup title="Erkek kardeş isimleri" gender="BOY" items={suggestions.boys} />
      </div>
    </section>
  );
}
