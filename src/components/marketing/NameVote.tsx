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
    "inline-flex min-h-[84px] min-w-0 flex-1 flex-col items-center justify-center gap-1 border-0 border-r border-border px-1.5 py-2 text-center text-[11px] font-semibold leading-tight transition disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-11 sm:w-auto sm:flex-none sm:flex-row sm:gap-2 sm:rounded-2xl sm:border sm:px-4 sm:text-xs",
    active
      ? "bg-accent-pink-soft text-accent-pink sm:border-accent-pink"
      : "bg-transparent text-primary hover:bg-accent-pink-soft/40 sm:border-border sm:bg-white sm:hover:border-accent-pink/40",
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
    <div className="contents sm:flex sm:flex-wrap sm:items-center sm:gap-2">
      <button
        type="button"
        onClick={() => void submit("LIKE")}
        aria-pressed={state.myVote === "LIKE"}
        disabled={disabled}
        className={voteButtonClass(state.myVote === "LIKE")}
      >
        <span className="text-lg leading-none" aria-hidden="true">
          👍
        </span>
        <span className="max-w-full whitespace-normal leading-tight">Beğendim</span>
        <span className="text-[11px] font-bold leading-none text-accent-pink">{state.likeCount}</span>
      </button>
      <button
        type="button"
        onClick={() => void submit("DISLIKE")}
        aria-pressed={state.myVote === "DISLIKE"}
        disabled={disabled}
        className={voteButtonClass(state.myVote === "DISLIKE")}
      >
        <span className="text-lg leading-none" aria-hidden="true">
          👎
        </span>
        <span className="max-w-full whitespace-normal leading-tight">Beğenmedim</span>
        <span className="text-[11px] font-semibold leading-none text-muted">{state.dislikeCount}</span>
      </button>
      {state.loading ? <span className="hidden text-xs text-muted sm:inline">Oylar yükleniyor...</span> : null}
      {state.error ? (
        <span className="hidden text-xs font-medium text-accent-pink sm:inline">Tekrar deneyin.</span>
      ) : null}
    </div>
  );
}
