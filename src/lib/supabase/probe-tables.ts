import type { SupabaseClient } from "@supabase/supabase-js";

/** PostgREST `from()` tablo adı + `select()` için en az bir gerçek sütun (head sorgusu). */
/** `User` ayrıca `/api/health` içinde doğrulanır; burada yalnızca diğer uygulama tabloları. */
export const SUPABASE_TABLE_PROBES: ReadonlyArray<{ table: string; column: string }> = [
  { table: "UserPermission", column: "userId" },
  { table: "Name", column: "id" },
  { table: "SimilarName", column: "id" },
  { table: "HomeFeaturedName", column: "id" },
  { table: "ContactMessage", column: "id" },
  { table: "MediaAsset", column: "id" },
  { table: "FAQ", column: "id" },
  { table: "GuideArticle", column: "id" },
  { table: "NewsletterSubscriber", column: "id" },
];

export type TableProbeResult = {
  table: string;
  ok: boolean;
  code?: string;
  message?: string;
};

export async function probeSupabaseTables(s: SupabaseClient): Promise<TableProbeResult[]> {
  const out: TableProbeResult[] = [];
  for (const { table, column } of SUPABASE_TABLE_PROBES) {
    const { error } = await s.from(table).select(column, { head: true, count: "exact" });
    if (error) {
      out.push({ table, ok: false, code: error.code, message: error.message });
    } else {
      out.push({ table, ok: true });
    }
  }
  return out;
}
