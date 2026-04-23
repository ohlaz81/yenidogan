"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MediaUpload() {
  const router = useRouter();
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setMsg(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    setPending(false);
    if (!res.ok) {
      setMsg("Yükleme başarısız.");
      return;
    }
    setMsg("Yüklendi.");
    router.refresh();
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-wrap items-end gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
      <div>
        <label className="text-sm font-semibold">Dosya</label>
        <input name="file" type="file" required className="mt-1 block text-sm" />
      </div>
      <button type="submit" disabled={pending} className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
        {pending ? "…" : "Yükle"}
      </button>
      {msg && <span className="text-sm text-zinc-600">{msg}</span>}
    </form>
  );
}
