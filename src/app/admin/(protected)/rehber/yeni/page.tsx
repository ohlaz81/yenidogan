import { getSupabase } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/admin-auth";
import { GuideForm } from "@/components/admin/GuideForm";

export default async function NewGuidePage() {
  await requireAdminSession();
  const s = getSupabase();
  const { data: mediaOptions, error } = await s
    .from("MediaAsset")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(200);
  if (error) throw error;
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-primary">Yeni rehber yazısı</h1>
      <GuideForm mediaOptions={mediaOptions ?? []} />
    </div>
  );
}
