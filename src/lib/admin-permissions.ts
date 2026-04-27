import { redirect } from "next/navigation";
import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { requireAdminSession } from "@/lib/admin-auth";

/** Supabase `UserPermission.permission` ile birebir aynı sabitler. */
export const ADMIN_PERMISSIONS = {
  names: "admin.names",
  contact: "admin.contact",
  homeFeatured: "admin.home_featured",
  content: "admin.content",
  about: "admin.about",
} as const;

export type AdminPermissionKey = (typeof ADMIN_PERMISSIONS)[keyof typeof ADMIN_PERMISSIONS];

export async function getUserPermissions(userId: string): Promise<Set<string>> {
  const s = getSupabase();
  const { data, error } = await s.from("UserPermission").select("permission").eq("userId", userId);
  if (error) throw postgrestToError(error, "getUserPermissions:UserPermission");
  return new Set((data ?? []).map((r: { permission: string }) => r.permission));
}

/** Oturum açık mı ve belirtilen izin var mı; yoksa `/admin/yetkisiz`. */
export async function requirePermission(permission: AdminPermissionKey | string) {
  const session = await requireAdminSession();
  const userId = session.user?.id;
  if (!userId) redirect("/admin/login");
  const perms = await getUserPermissions(userId);
  if (!perms.has(permission)) {
    redirect("/admin/yetkisiz");
  }
  return session;
}
