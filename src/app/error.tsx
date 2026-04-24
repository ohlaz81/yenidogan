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
        Supabase’te uygulamanın beklediği tablolar (ör. <code className="rounded bg-zinc-200 px-1">HeroSlide</code>,{" "}
        <code className="rounded bg-zinc-200 px-1">CategoryShowcase</code>) yoksa veya adı farklıysa hata görülebilir. E394
        ref’i çoğu zaman altta yatan PGRST205/veritabanı hatasıdır. <code className="rounded bg-zinc-200 px-1">/api/health</code>{" "}
        sadece temel erişimi gösterir.
      </p>
      <p className="mt-2 max-w-md text-xs text-zinc-500">
        Teşhis: canlı sitede <code className="break-all">/api/health</code> adresini aç; hangi adımın kırmızı olduğunu gösterir.
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
