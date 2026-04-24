import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { requireAdminSession } from "@/lib/admin-auth";
import { NameForm } from "@/components/admin/NameForm";

export default async function NewNamePage() {
  await requireAdminSession();
  const s = getSupabase();
  const { data: mediaOptions, error } = await s
    .from("MediaAsset")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(200);
  if (error) throw postgrestToError(error, "admin/isimler/yeni:MediaAsset");
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-primary">Yeni isim</h1>
      <NameForm mediaOptions={mediaOptions ?? []} />
    </div>
  );
}
