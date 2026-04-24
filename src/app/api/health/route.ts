import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/admin";

/**
 * Canlı ortam teşhisi: tarayıcıdan aç
 *   GET /api/health
 * Gizli değerleri döndürmez; yalnızca "tanımlı mı" ve DB ulaşımı dener.
 */
export async function GET() {
  const hasServiceKey = Boolean((process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim().length);
  const hasAnon = Boolean((process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim().length);
  const hasAuthSecret = Boolean((process.env.AUTH_SECRET ?? "").trim().length);

  const publicUrlSet = Boolean((process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim());

  if (!publicUrlSet || !hasServiceKey) {
    return NextResponse.json(
      {
        ok: false,
        step: "env",
        message: "Eksik ortam değişkeni. Vercel: Settings → Environment Variables.",
        checks: {
          NEXT_PUBLIC_SUPABASE_URL: publicUrlSet ? "set" : "missing",
          SUPABASE_SERVICE_ROLE_KEY: hasServiceKey ? "set" : "missing",
          AUTH_SECRET: hasAuthSecret ? "set" : "missing",
        },
        hint: "Her iki değeri de Production (ve gerekirse Preview) için ekleyin; kayıttan sonra Redeploy.",
      },
      { status: 503 },
    );
  }

  if (!hasAuthSecret) {
    return NextResponse.json(
      {
        ok: false,
        step: "env",
        message: "AUTH_SECRET tanımlı değil. NextAuth oturum API’si 500 verebilir.",
        checks: {
          NEXT_PUBLIC_SUPABASE_URL: "set",
          SUPABASE_SERVICE_ROLE_KEY: "set",
          AUTH_SECRET: "missing",
        },
      },
      { status: 503 },
    );
  }

  try {
    const s = getSupabase();
    const probe = await s.from("Name").select("id", { count: "exact", head: true });
    if (probe.error) {
      return NextResponse.json(
        {
          ok: false,
          step: "supabase",
          message: "Supabase bağlandı; sorgu hata verdi (tablo adı / şema farkı olabilir).",
          supabaseMessage: probe.error.message,
        },
        { status: 503 },
      );
    }
    return NextResponse.json({
      ok: true,
      step: "ready",
      checks: {
        NEXT_PUBLIC_SUPABASE_URL: "set",
        SUPABASE_SERVICE_ROLE_KEY: "set",
        AUTH_SECRET: "set",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: hasAnon ? "set" : "optional",
      },
      nameTableProbe: { count: probe.count },
    });
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      {
        ok: false,
        step: "supabase",
        message: "Supabase client veya ağ hatası.",
        detail: err,
      },
      { status: 503 },
    );
  }
}
