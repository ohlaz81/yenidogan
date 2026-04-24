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
