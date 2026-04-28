"use client";

import { useActionState } from "react";
import { subscribeNewsletter, type NewsletterState } from "@/app/actions/newsletter";

const initial: NewsletterState = {};

export function NewsletterBar() {
  const [state, action, pending] = useActionState(subscribeNewsletter, initial);

  return (
    <section className="border-y border-border bg-accent-pink-soft/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 lg:flex-row lg:items-center lg:gap-6">
        <div className="flex-1">
          <p className="font-semibold text-primary">Bülten</p>
          <p className="text-sm text-muted">Yeni rehber yazıları ve isim önerileri için e-posta listenize katılın.</p>
        </div>
        {state.ok ? (
          <p className="text-sm font-medium text-accent-green">Teşekkürler! Kaydınız alındı.</p>
        ) : (
          <form action={action} className="flex w-full flex-col gap-2 sm:flex-row sm:items-center lg:w-auto lg:shrink-0">
            <input
              name="email"
              type="email"
              required
              placeholder="E-posta adresiniz"
              className="h-12 w-full rounded-xl border border-border bg-white px-4 text-sm shadow-inner outline-none ring-primary focus:ring-2 sm:flex-1 lg:w-72 lg:flex-none"
            />
            <button
              type="submit"
              disabled={pending}
              className="h-12 rounded-xl bg-accent-pink px-6 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-60"
            >
              {pending ? "…" : "Abone ol"}
            </button>
          </form>
        )}
        {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      </div>
    </section>
  );
}
