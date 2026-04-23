"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState = {};

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);

  if (state.ok) {
    return <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-900">Mesajınız alındı. Teşekkür ederiz.</p>;
  }

  return (
    <form action={action} className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div>
        <label className="text-sm font-semibold">Adınız</label>
        <input name="name" required className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-semibold">E-posta</label>
        <input name="email" type="email" required className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-semibold">Mesaj</label>
        <textarea name="message" required rows={5} className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm" />
      </div>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
      >
        {pending ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
}
