import { notFound } from "next/navigation";
import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { requireAdminSession } from "@/lib/admin-auth";
import { NameForm } from "@/components/admin/NameForm";
import type { Name } from "@/types/database";

type Props = { params: Promise<{ id: string }> };

export default async function EditNamePage({ params }: Props) {
  await requireAdminSession();
  const { id } = await params;
  const s = getSupabase();
  const { data: row, error } = await s.from("Name").select("*").eq("id", id).maybeSingle();
  if (error) throw postgrestToError(error, "admin/isimler/[id]:Name");
  if (!row) notFound();
  const { data: sims } = await s.from("SimilarName").select("targetId").eq("sourceId", id);
  const tids = [...new Set((sims ?? []).map((x) => (x as { targetId: string }).targetId))];
  let similarFrom: { target: { slug: string } }[] = [];
  if (tids.length) {
    const { data: targets } = await s.from("Name").select("slug").in("id", tids);
    similarFrom = (targets ?? []).map((t) => ({
      target: { slug: (t as { slug: string }).slug },
    }));
  }
  const name = { ...(row as Name), similarFrom };
  const { data: mediaOptions, error: mErr } = await s
    .from("MediaAsset")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(200);
  if (mErr) throw postgrestToError(mErr, "admin/isimler/[id]:MediaAsset");

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-primary">İsim düzenle: {name.displayName}</h1>
      <NameForm name={name} mediaOptions={mediaOptions ?? []} />
    </div>
  );
}
