"use client";

import { useEffect } from "react";

/**
 * RSC/ sunucu hata sınırı — üretimde 500 ekranını sadeleştirir, log için digest bırakır.
 */
export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-zinc-50 px-6 text-center text-zinc-800">
      <h1 className="font-display text-2xl font-semibold text-primary">Sayfa yüklenemedi</h1>
      <p className="mt-3 max-w-md text-sm text-zinc-600">
        Bu ekran genelde sunucu tarafında yakalanan bir hatadır. Yaygın nedenler: Vercel’de eksik{" "}
        <code className="rounded bg-zinc-200 px-1">NEXT_PUBLIC_SUPABASE_URL</code> /{" "}
        <code className="rounded bg-zinc-200 px-1">SUPABASE_SERVICE_ROLE_KEY</code> /{" "}
        <code className="rounded bg-zinc-200 px-1">AUTH_SECRET</code>, Supabase’te beklenen tablonun olmaması (PostgREST{" "}
        <code className="rounded bg-zinc-200 px-1">PGRST205</code>) veya admin/iletişim sorgularında şema uyumsuzluğu. Next.js{" "}
        <code className="rounded bg-zinc-200 px-1">E394</code> çoğu zaman asıl hatanın sarmalayıcısıdır.
      </p>
      <p className="mt-2 max-w-md text-xs text-zinc-500">
        Teşhis: önce <code className="break-all">/api/ping</code> (Next ayakta mı, env gerekmez) — açılıyorsa{" "}
        <code className="break-all">/api/health</code> JSON’unda <code className="rounded bg-zinc-200 px-1">tables</code>{" "}
        satırlarında <code className="rounded bg-zinc-200 px-1">ok: false</code> arayın.
      </p>
      {error.digest ? (
        <p className="mt-2 font-mono text-xs text-zinc-400">Ref: {error.digest}</p>
      ) : null}
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-white"
      >
        Yeniden dene
      </button>
    </div>
  );
}
