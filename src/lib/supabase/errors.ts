import type { PostgrestError } from "@supabase/supabase-js";

/**
 * PostgREST hataları düz `{ code, message, ... }` nesnesidir; RSC bunu `throw` edince
 * Next/React istemcisinde "Server" altında anlamsız obje görünür. Daima `Error` fırlatın.
 */
export function postgrestToError(err: PostgrestError, context: string): Error {
  const code = err.code ? ` [${err.code}]` : "";
  return new Error(`${context}: ${err.message}${code}`);
}

/** PostgREST/Supabase: tablo yok / şemada tanımsız (migrasyon/şema farkı). */
export function isMissingTableError(err: unknown): boolean {
  if (err == null) return false;
  const o = err as { code?: string; message?: string; details?: string };
  if (o.code === "PGRST205" || o.code === "42P01") return true;
  const m = (o.message ?? "") + (o.details ?? "");
  if (/schema cache|could not find the table|does not exist/i.test(m) && /relation|table/i.test(m)) {
    return true;
  }
  return false;
}
