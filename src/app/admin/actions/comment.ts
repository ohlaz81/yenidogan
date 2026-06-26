"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { ADMIN_PERMISSIONS, requirePermission } from "@/lib/admin-permissions";

const statusZ = z.enum(["APPROVED", "REJECTED"]);

export async function updateNameCommentStatus(formData: FormData) {
  await requirePermission(ADMIN_PERMISSIONS.content);

  const parsed = z
    .object({
      id: z.string().min(1),
      status: statusZ,
      slug: z.string().min(1).optional(),
    })
    .safeParse({
      id: formData.get("id"),
      status: formData.get("status"),
      slug: formData.get("slug") || undefined,
    });

  if (!parsed.success) {
    throw new Error("Geçersiz yorum işlemi.");
  }

  const { id, status, slug } = parsed.data;
  const { error } = await getSupabase()
    .from("NameComment")
    .update({ status, updatedAt: new Date().toISOString() } as never)
    .eq("id", id);

  if (error) throw postgrestToError(error, "updateNameCommentStatus:NameComment");

  revalidatePath("/admin/yorumlar");
  if (slug) revalidatePath(`/isim/${slug}`);
}
