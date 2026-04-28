"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") ?? "/admin";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");
    const res = await signIn("credentials", { email, password, redirect: false });
    setPending(false);
    if (res?.error) {
      setError("Giriş başarısız. E-posta veya şifreyi kontrol edin.");
      return;
    }
    window.location.href = callbackUrl;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-semibold text-primary">Yönetici girişi</h1>
        <p className="mt-2 text-sm text-zinc-600">yenidogan.net içerik paneli</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-semibold">E-posta</label>
            <input name="email" type="email" required className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-semibold">Şifre</label>
            <input name="password" type="password" required className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-2xl bg-primary py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {pending ? "Giriş…" : "Giriş yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
