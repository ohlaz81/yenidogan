"use client";

import { useCallback, useSyncExternalStore } from "react";

type Vote = "like" | "dislike";

const STORAGE_KEY = "yenidogan_name_votes";
const CHANGE_EVENT = "name-votes-changed";

function readVotes(): Record<string, Vote> {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, Vote] => {
        const [slug, vote] = entry;
        return Boolean(slug) && (vote === "like" || vote === "dislike");
      }),
    );
  } catch {
    return {};
  }
}

function writeVote(slug: string, nextVote: Vote | null) {
  const votes = readVotes();

  if (nextVote) {
    votes[slug] = nextVote;
  } else {
    delete votes[slug];
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Storage can be unavailable in private browsing or strict browser settings.
  }
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onStoreChange();
  };

  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getServerSnapshot() {
  return null;
}

function voteButtonClass(active: boolean) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-2 text-xs font-semibold shadow-sm transition",
    active
      ? "border-accent-pink bg-accent-pink-soft text-accent-pink"
      : "border-border bg-white text-primary hover:border-accent-pink/40 hover:bg-accent-pink-soft/40",
  ].join(" ");
}

export function NameVote({ slug }: { slug: string }) {
  const getSnapshot = useCallback(() => readVotes()[slug] ?? null, [slug]);
  const selected = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = (vote: Vote) => {
    writeVote(slug, selected === vote ? null : vote);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => toggle("like")}
        aria-pressed={selected === "like"}
        className={voteButtonClass(selected === "like")}
      >
        <span aria-hidden="true">👍</span>
        Beğendim
      </button>
      <button
        type="button"
        onClick={() => toggle("dislike")}
        aria-pressed={selected === "dislike"}
        className={voteButtonClass(selected === "dislike")}
      >
        <span aria-hidden="true">👎</span>
        Beğenmedim
      </button>
    </>
  );
}
