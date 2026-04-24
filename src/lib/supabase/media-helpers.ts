import type { MediaAsset } from "@/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function mapByIds(
  s: SupabaseClient,
  ids: string[],
): Promise<Map<string, MediaAsset>> {
  const m = new Map<string, MediaAsset>();
  if (!ids.length) return m;
  const { data, error } = await s
    .from("MediaAsset")
    .select("*")
    .in("id", [...new Set(ids)]);
  if (error) throw error;
  for (const r of data ?? []) m.set((r as MediaAsset).id, r as MediaAsset);
  return m;
}
