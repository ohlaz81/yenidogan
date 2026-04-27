"use client";

import { signOut } from "next-auth/react";

export function AdminSignOut({ email }: { email?: string | null }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {email ? (
        <span className="hidden max-w-[14rem] truncate text-xs text-zinc-500 sm:inline" title={email}>
          {email}
        </span>
      ) : null}
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50"
      >
        Çıkış
      </button>
    </div>
  );
}
