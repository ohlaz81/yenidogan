import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { ADMIN_PERMISSIONS, requirePermission } from "@/lib/admin-permissions";
import { GuideForm } from "@/components/admin/GuideForm";

export default async function NewGuidePage() {
  await requirePermission(ADMIN_PERMISSIONS.content);
  const s = getSupabase();
  const { data: mediaOptions, error } = await s
    .from("MediaAsset")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(200);
  if (error) throw postgrestToError(error, "admin/rehber/yeni:MediaAsset");
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-primary">Yeni rehber yazısı</h1>
      <GuideForm mediaOptions={mediaOptions ?? []} />
    </div>
  );
}
