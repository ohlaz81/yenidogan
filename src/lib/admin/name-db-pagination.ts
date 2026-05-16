import type { SupabaseClient } from "@supabase/supabase-js";

/** PostgREST varsayılan üst sınırı; sayfalı okuma bu boyutta yapılır. */
const PAGE_SIZE = 1000;
const IN_CHUNK = 200;
const UPSERT_CHUNK = 200;

export type NameSlugRow = { id: string; slug: string; createdAt: string };

export async function fetchAllNameSlugs(
  s: SupabaseClient,
): Promise<{ slugs: Set<string>; error?: string }> {
  const slugs = new Set<string>();
  let from = 0;

  while (true) {
    const { data, error } = await s
      .from("Name")
      .select("slug")
      .order("slug", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);

    if (error) return { slugs, error: error.message };

    const batch = data ?? [];
    for (const r of batch) {
      slugs.add(String((r as { slug: string }).slug));
    }
    if (batch.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return { slugs };
}

export async function fetchAllNamesForBackup(
  s: SupabaseClient,
): Promise<{ rows: Record<string, unknown>[]; error?: string }> {
  const rows: Record<string, unknown>[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await s
      .from("Name")
      .select("*")
      .order("slug", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);

    if (error) return { rows, error: error.message };

    const batch = data ?? [];
    rows.push(...(batch as Record<string, unknown>[]));
    if (batch.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return { rows };
}

export async function fetchExistingNamesBySlugs(
  s: SupabaseClient,
  slugs: string[],
): Promise<{ rows: NameSlugRow[]; error?: string }> {
  const rows: NameSlugRow[] = [];
  const unique = [...new Set(slugs)];

  for (let i = 0; i < unique.length; i += IN_CHUNK) {
    const chunk = unique.slice(i, i + IN_CHUNK);
    const { data, error } = await s.from("Name").select("id,slug,createdAt").in("slug", chunk);
    if (error) return { rows, error: error.message };
    rows.push(...((data ?? []) as NameSlugRow[]));
  }

  return { rows };
}

export async function upsertNamesInChunks(
  s: SupabaseClient,
  dbRows: Record<string, unknown>[],
): Promise<{ error?: string }> {
  for (let i = 0; i < dbRows.length; i += UPSERT_CHUNK) {
    const batch = dbRows.slice(i, i + UPSERT_CHUNK);
    const { error } = await s.from("Name").upsert(batch as never[], { onConflict: "slug" });
    if (error) return { error: error.message };
  }
  return {};
}
