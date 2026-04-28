import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { ADMIN_PERMISSIONS, requirePermission } from "@/lib/admin-permissions";
import { NameForm } from "@/components/admin/NameForm";
import { getPublicMediaOptions, mergeMediaOptions } from "@/lib/static/public-media-options";

export default async function NewNamePage() {
  await requirePermission(ADMIN_PERMISSIONS.names);
  const s = getSupabase();
  const { data: mediaOptions, error } = await s
    .from("MediaAsset")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(200);
  if (error) throw postgrestToError(error, "admin/isimler/yeni:MediaAsset");
  const mergedMediaOptions = mergeMediaOptions(mediaOptions ?? [], getPublicMediaOptions());
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-primary">Yeni isim</h1>
      <NameForm mediaOptions={mergedMediaOptions} />
    </div>
  );
}
