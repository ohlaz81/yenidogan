import { notFound } from "next/navigation";
import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { requireAdminSession } from "@/lib/admin-auth";
import { GuideForm } from "@/components/admin/GuideForm";
import type { GuideArticle } from "@/types/database";

type Props = { params: Promise<{ id: string }> };

export default async function EditGuidePage({ params }: Props) {
  await requireAdminSession();
  const { id } = await params;
  const s = getSupabase();
  const { data: article, error } = await s.from("GuideArticle").select("*").eq("id", id).maybeSingle();
  if (error) throw postgrestToError(error, "admin/rehber/[id]:GuideArticle");
  if (!article) notFound();
  const { data: mediaOptions, error: mErr } = await s
    .from("MediaAsset")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(200);
  if (mErr) throw postgrestToError(mErr, "admin/rehber/[id]:MediaAsset");
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-primary">Yazıyı düzenle</h1>
      <GuideForm article={article as GuideArticle} mediaOptions={mediaOptions ?? []} />
    </div>
  );
}
