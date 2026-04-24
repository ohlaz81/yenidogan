import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _admin: SupabaseClient | undefined;

function cleanEnvValue(v: string | undefined): string {
  if (!v) return "";
  const t = v.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1).trim();
  }
  return t;
}

/**
 * Sadece sunucuda (RSC, Server Actions, route handler).
 * RLS'yi aşar — service role. İstemciye asla sızıntı yok.
 */
export function getSupabase(): SupabaseClient {
  if (_admin) return _admin;
  let url = cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const key = cleanEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);
  // Vercel / panellerde kopyalanan hatalı son ek (REST path client içinde zaten var)
  url = url.replace(/\/rest\/v1\/?$/, "");
  if (!url || !key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY (Settings → API) gerekli.",
    );
  }
  _admin = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
  return _admin;
}
