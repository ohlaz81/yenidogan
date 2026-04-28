import { NextResponse } from "next/server";

/** Bağımlılıksız “Next çalışıyor mu?” — Supabase/env gerekmez. */
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "next",
      t: new Date().toISOString(),
      hint: "Supabase teşhisi için /api/health adresini kullanın.",
    },
    { status: 200 },
  );
}
