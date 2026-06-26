"use client";

import { useEffect, useState } from "react";

type Vote = "LIKE" | "DISLIKE";

type VoteState = {
  likeCount: number;
  dislikeCount: number;
  myVote: Vote | null;
  loading: boolean;
  pending: boolean;
  error: boolean;
};

const DEVICE_KEY = "yenidogan_vote_device_key";

function createDeviceKey() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function getDeviceKey() {
  try {
    const existing = window.localStorage.getItem(DEVICE_KEY);
    if (existing && existing.length >= 16) return existing;

    const next = createDeviceKey();
    window.localStorage.setItem(DEVICE_KEY, next);
    return next;
  } catch {
    return createDeviceKey();
  }
}

function nextState(current: VoteState, vote: Vote | null): VoteState {
  let likeCount = current.likeCount;
  let dislikeCount = current.dislikeCount;

  if (current.myVote === "LIKE") likeCount = Math.max(0, likeCount - 1);
  if (current.myVote === "DISLIKE") dislikeCount = Math.max(0, dislikeCount - 1);
  if (vote === "LIKE") likeCount += 1;
  if (vote === "DISLIKE") dislikeCount += 1;

  return {
    ...current,
    likeCount,
    dislikeCount,
    myVote: vote,
    pending: true,
    error: false,
  };
}

function voteButtonClass(active: boolean) {
  return [
    "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none",
    active
      ? "border-accent-pink bg-accent-pink-soft text-accent-pink"
      : "border-border bg-white text-primary hover:border-accent-pink/40 hover:bg-accent-pink-soft/40",
  ].join(" ");
}

export function NameVote({ slug }: { slug: string }) {
  const [state, setState] = useState<VoteState>({
    likeCount: 0,
    dislikeCount: 0,
    myVote: null,
    loading: true,
    pending: false,
    error: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    const deviceKey = getDeviceKey();

    async function loadVotes() {
      try {
        const params = new URLSearchParams({ slug, deviceKey });
        const response = await fetch(`/api/public/name-votes?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Vote load failed");

        const data = (await response.json()) as {
          likeCount?: number;
          dislikeCount?: number;
          myVote?: Vote | null;
        };

        if (!controller.signal.aborted) {
          setState({
            likeCount: Number(data.likeCount) || 0,
            dislikeCount: Number(data.dislikeCount) || 0,
            myVote: data.myVote === "LIKE" || data.myVote === "DISLIKE" ? data.myVote : null,
            loading: false,
            pending: false,
            error: false,
          });
        }
      } catch {
        if (!controller.signal.aborted) {
          setState((current) => ({ ...current, loading: false, pending: false, error: true }));
        }
      }
    }

    void loadVotes();

    return () => controller.abort();
  }, [slug]);

  async function submit(vote: Vote) {
    if (state.pending) return;

    const deviceKey = getDeviceKey();
    const targetVote = state.myVote === vote ? null : vote;
    const previous = state;
    setState((current) => nextState(current, targetVote));

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch("/api/public/name-votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, vote: targetVote, deviceKey }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Vote submit failed");

      const data = (await response.json()) as {
        likeCount?: number;
        dislikeCount?: number;
        myVote?: Vote | null;
      };

      setState({
        likeCount: Number(data.likeCount) || 0,
        dislikeCount: Number(data.dislikeCount) || 0,
        myVote: data.myVote === "LIKE" || data.myVote === "DISLIKE" ? data.myVote : null,
        loading: false,
        pending: false,
        error: false,
      });
    } catch {
      setState({ ...previous, loading: false, pending: false, error: true });
    } finally {
      window.clearTimeout(timeout);
    }
  }

  const disabled = state.pending;

  return (
    <section className="mt-8 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-lg font-semibold text-primary">Bu ismi beğendiniz mi?</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void submit("LIKE")}
            aria-pressed={state.myVote === "LIKE"}
            disabled={disabled}
            className={voteButtonClass(state.myVote === "LIKE")}
          >
            <span aria-hidden="true">👍</span>
            Beğendim {state.likeCount}
          </button>
          <button
            type="button"
            onClick={() => void submit("DISLIKE")}
            aria-pressed={state.myVote === "DISLIKE"}
            disabled={disabled}
            className={voteButtonClass(state.myVote === "DISLIKE")}
          >
            <span aria-hidden="true">👎</span>
            Beğenmedim {state.dislikeCount}
          </button>
        </div>
      </div>
      {state.loading ? <p className="mt-2 text-xs text-muted">Oylar yükleniyor...</p> : null}
      {state.error ? <p className="mt-2 text-xs font-medium text-accent-pink">Tekrar deneyin.</p> : null}
    </section>
  );
}
