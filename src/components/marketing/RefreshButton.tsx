"use client";

import { useRouter } from "next/navigation";

export function RefreshButton({ label = "Yeni isim" }: { label?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.refresh()}
      className="rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/20"
    >
      {label}
    </button>
  );
}
