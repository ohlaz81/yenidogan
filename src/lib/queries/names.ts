import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { mapByIds } from "@/lib/supabase/media-helpers";
import type { Gender, Name, NameStyle, NameWithDetail, MediaAsset } from "@/types/database";

const nameSelect =
  "id,slug,displayName,gender,meaning,origin,pronunciation,popularity,popularScore,inQuran,style,isShort,beautifulMeaning,firstLetter,intro,traits,published,imageId,createdAt,updatedAt";

export type NameListParams = {
  gender?: Gender;
  inQuran?: boolean;
  inQuranFalse?: boolean;
  style?: NameStyle;
  letter?: string;
  origin?: string;
  isShort?: boolean;
  beautifulMeaning?: boolean;
  search?: string;
  orderBy?: "popular" | "alpha";
  skip?: number;
  take?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyNameFilters(q: any, p: NameListParams) {
  if (p.gender) q = q.eq("gender", p.gender);
  if (p.inQuran === true) q = q.eq("inQuran", true);
  if (p.inQuranFalse === true) q = q.eq("inQuran", false);
  if (p.style) q = q.eq("style", p.style);
  if (p.letter) q = q.eq("firstLetter", p.letter.toLocaleUpperCase("tr-TR"));
  if (p.isShort === true) q = q.eq("isShort", true);
  if (p.beautifulMeaning === true) q = q.eq("beautifulMeaning", true);
  if (p.origin?.trim()) q = q.ilike("origin", `%${p.origin.trim()}%`);
  if (p.search?.trim()) {
    const x = p.search.trim().replace(/%/g, "\\%");
    q = q.or(
      `displayName.ilike.%${x}%,meaning.ilike.%${x}%,slug.ilike.%${x.toLowerCase()}%`,
    );
  }
  return q;
}

export async function listNames(p: NameListParams) {
  const s = getSupabase();
  const skip = p.skip ?? 0;
  const take = p.take ?? 24;
  const to = skip + take - 1;

  let countQ = s.from("Name").select("id", { count: "exact", head: true }).eq("published", true);
  countQ = applyNameFilters(countQ, p);
  let dataQ = s.from("Name").select(nameSelect).eq("published", true);
  dataQ = applyNameFilters(dataQ, p);
  if (p.orderBy === "alpha") {
    dataQ = dataQ.order("displayName", { ascending: true });
  } else {
    dataQ = dataQ.order("popularScore", { ascending: false });
    dataQ = dataQ.order("displayName", { ascending: true });
  }
  dataQ = dataQ.range(skip, to);

  const [cRes, dRes] = await Promise.all([countQ, dataQ]);
  if (cRes.error) throw postgrestToError(cRes.error, "listNames:count");
  if (dRes.error) throw postgrestToError(dRes.error, "listNames:rows");
  const itemsRaw = (dRes.data ?? []) as Name[];
  const total = cRes.count ?? 0;
  const media = await mapByIds(
    s,
    itemsRaw.map((n) => n.imageId).filter(Boolean) as string[],
  );
  const items = itemsRaw.map((n) => ({
    ...n,
    image: n.imageId ? media.get(n.imageId) ?? null : null,
  }));
  return { items, total };
}

export async function getNameBySlug(slug: string): Promise<NameWithDetail | null> {
  const s = getSupabase();
  const n = await s
    .from("Name")
    .select(nameSelect)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (n.error) throw postgrestToError(n.error, "getNameBySlug:Name");
  const name = n.data as Name | null;
  if (!name) return null;
  const imgM = await mapByIds(s, name.imageId ? [name.imageId] : []);
  const image = name.imageId ? imgM.get(name.imageId) ?? null : null;

  const { data: sims, error: sErr } = await s
    .from("SimilarName")
    .select("id,sourceId,targetId")
    .eq("sourceId", name.id);
  if (sErr) throw postgrestToError(sErr, "getNameBySlug:SimilarName");
  const tids = [...new Set((sims ?? []).map((x) => (x as { targetId: string }).targetId))];
  if (!tids.length) {
    return { ...name, image, similarFrom: [] };
  }
  const { data: tnames, error: tErr } = await s
    .from("Name")
    .select(nameSelect)
    .in("id", tids);
  if (tErr) throw postgrestToError(tErr, "getNameBySlug:Name:targets");
  const tRows = (tnames ?? []) as Name[];
  const tum = await mapByIds(
    s,
    tRows.map((r) => r.imageId).filter(Boolean) as string[],
  );
  const targetMap = new Map(
    tRows.map((r) => [
      r.id,
      { ...r, image: r.imageId ? tum.get(r.imageId) ?? null : null } as Name & {
        image: MediaAsset | null;
      },
    ]),
  );
  const similarFrom = (sims ?? [])
    .map((row) => {
      const targetId = (row as { targetId: string }).targetId;
      const t = targetMap.get(targetId);
      if (!t) return null;
      return { target: t };
    })
    .filter((x) => x !== null) as NameWithDetail["similarFrom"];

  return { ...name, image, similarFrom };
}

export async function getNamesByLetter(letter: string, gender?: Gender, take = 12) {
  const { items } = await listNames({ letter, gender, take, orderBy: "popular" });
  return items.slice(0, take);
}
