import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/admin";
import { probeSupabaseTables } from "@/lib/supabase/probe-tables";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Canlı teşhis — tarayıcıda açın:
 *   GET /api/health
 * Her zaman JSON döner (HTTP 200); başarı `body.ok` ile anlaşılır.
 * Önce Next’in ayakta olduğunu doğrulamak için: GET /api/ping
 */
export async function GET() {
  try {
    return await runHealth();
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      {
        ok: false,
        step: "unhandled",
        message: "Health işleyicisi beklenmeyen hatada koptu (modül veya ağ).",
        detail,
      },
      { status: 200 },
    );
  }
}

async function runHealth() {
  const hasServiceKey = Boolean((process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim().length);
  const hasAnon = Boolean((process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim().length);
  const hasAuthSecret = Boolean((process.env.AUTH_SECRET ?? "").trim().length);
  const publicUrlSet = Boolean((process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim());

  const checks = {
    NEXT_PUBLIC_SUPABASE_URL: publicUrlSet ? ("set" as const) : ("missing" as const),
    SUPABASE_SERVICE_ROLE_KEY: hasServiceKey ? ("set" as const) : ("missing" as const),
    AUTH_SECRET: hasAuthSecret ? ("set" as const) : ("missing" as const),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: hasAnon ? ("set" as const) : ("optional" as const),
  };

  if (!publicUrlSet || !hasServiceKey) {
    return NextResponse.json(
      {
        ok: false,
        step: "env",
        message:
          "Supabase URL veya service role key eksik. Vercel → Project → Settings → Environment Variables; kayıttan sonra Redeploy.",
        checks,
        hint: "Bu yanıtı görüyorsanız Next.js route çalışıyor; yalnızca ortam değişkenleri tamamlanmalı.",
      },
      { status: 200 },
    );
  }

  try {
    const s = getSupabase();
    const userProbe = await s.from("User").select("id", { head: true, count: "exact" });
    if (userProbe.error) {
      return NextResponse.json(
        {
          ok: false,
          step: "supabase_user",
          message: "User tablosu sorgusu başarısız (tablo yok, ad farklı veya API kapalı).",
          checks,
          authSecretNote: hasAuthSecret ? undefined : "AUTH_SECRET eksik; NextAuth için üretimde tanımlayın.",
          supabaseCode: userProbe.error.code,
          supabaseMessage: userProbe.error.message,
        },
        { status: 200 },
      );
    }

    const tables = await probeSupabaseTables(s);
    const failed = tables.filter((t) => !t.ok);
    const userTableRow = { table: "User" as const, ok: true as const };
    const tablesWithUser = [userTableRow, ...tables];

    return NextResponse.json(
      {
        ok: failed.length === 0,
        userOk: true,
        step: failed.length === 0 ? (hasAuthSecret ? "ready" : "ready_auth_warn") : "tables_partial",
        message:
          failed.length === 0
            ? hasAuthSecret
              ? "Ortam ve tablo sondaları tamam."
              : "Tablolar tamam; AUTH_SECRET tanımlı değil — NextAuth için ekleyin."
            : `${failed.length} tabloda hata (çoğunlukla PGRST205 = PostgREST şemasında tablo yok).`,
        checks,
        authSecretNote: hasAuthSecret ? undefined : "AUTH_SECRET eksik; üretimde tanımlayın.",
        userTableProbe: { count: userProbe.count },
        tables: tablesWithUser,
        note:
          "İsim listeleri ve ana sayfa vitrini yerel veri kaynağından gelir; Supabase ağırlıklı olarak admin, iletişim ve bülten içindir.",
      },
      { status: 200 },
    );
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      {
        ok: false,
        step: "supabase",
        message: "Supabase istemcisi veya ağ hatası (URL anahtar biçimi, DNS, firewall).",
        checks,
        detail: err,
      },
      { status: 200 },
    );
  }
}
