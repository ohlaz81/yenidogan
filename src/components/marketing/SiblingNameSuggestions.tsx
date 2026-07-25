import Link from "next/link";
import type { Name } from "@/types/database";
import { getNameBySlug, getSiblingNameSuggestions, type SiblingNameSuggestion } from "@/lib/queries/names";
import { nameDisplayTextClass } from "@/lib/name-gender-styles";

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
    <div className={`rounded-2xl border p-3 shadow-sm sm:p-4 ${suggestionCardClass(gender)}`}>
      <h3 className={`flex items-center gap-2 font-display text-lg font-semibold leading-tight sm:text-base ${suggestionTitleClass(gender)}`}>
        <span
          className={`flex size-7 items-center justify-center rounded-full text-xs ${
            gender === "GIRL" ? "bg-accent-pink-soft" : "bg-accent-blue-soft"
          }`}
          aria-hidden="true"
        >
          {gender === "GIRL" ? "♀" : "♂"}
        </span>
        {title}
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
    <section className="mt-10 rounded-3xl border border-border bg-white p-4 shadow-sm md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none">
      <h2 className="font-display text-xl font-semibold text-primary">
        <span className={nameDisplayTextClass(name.gender)}>{name.displayName}</span> ile uyumlu kardeş isimleri
      </h2>
      <span className={`mt-2 block h-0.5 w-12 rounded-full ${name.gender === "BOY" ? "bg-accent-blue" : "bg-accent-pink"}`} />
      <div className="mt-3 grid gap-3 md:mt-4 md:grid-cols-2 md:gap-4">
        <SuggestionGroup title="Kız kardeş isimleri" gender="GIRL" items={suggestions.girls} />
        <SuggestionGroup title="Erkek kardeş isimleri" gender="BOY" items={suggestions.boys} />
      </div>
    </section>
  );
}
