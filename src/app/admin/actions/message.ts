"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { requireAdminSession } from "@/lib/admin-auth";

export async function markMessageRead(formData: FormData) {
  await requireAdminSession();
  const id = z.string().parse(formData.get("id"));
  const { error } = await getSupabase().from("ContactMessage").update({ read: true } as never).eq("id", id);
  if (error) throw postgrestToError(error, "markMessageRead:ContactMessage");
  revalidatePath("/admin");
  revalidatePath("/admin/iletisim");
}
