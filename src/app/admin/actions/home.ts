"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { requireAdminSession } from "@/lib/admin-auth";

export async function updateFeaturedSlot(formData: FormData) {
  await requireAdminSession();
  const id = z.string().parse(formData.get("slotId"));
  const nameIdRaw = formData.get("nameId");
  const nameId = nameIdRaw && String(nameIdRaw).length ? String(nameIdRaw) : null;
  const s = getSupabase();
  const { error } = await s.from("HomeFeaturedName").update({ nameId } as never).eq("id", id);
  if (error) throw postgrestToError(error, "updateFeaturedSlot:HomeFeaturedName");
  revalidatePath("/");
}
