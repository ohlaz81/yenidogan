"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createId } from "@paralleldrive/cuid2";
import { getSupabase } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/admin-auth";

const schema = z.object({
  id: z.string().optional(),
  question: z.string().min(2),
  answer: z.string().min(2),
  sortOrder: z.coerce.number().int().min(0),
});

export async function saveFaq(formData: FormData) {
  await requireAdminSession();
  const parsed = schema.safeParse({
    id: formData.get("id") || undefined,
    question: formData.get("question"),
    answer: formData.get("answer"),
    sortOrder: formData.get("sortOrder"),
  });
  if (!parsed.success) {
    throw new Error("Geçersiz form");
  }
  const d = parsed.data;
  const s = getSupabase();
  if (d.id) {
    const { error } = await s
      .from("FAQ")
      .update({ question: d.question, answer: d.answer, sortOrder: d.sortOrder } as never)
      .eq("id", d.id);
    if (error) throw error;
  } else {
    const { error } = await s.from("FAQ").insert({
      id: createId(),
      question: d.question,
      answer: d.answer,
      sortOrder: d.sortOrder,
    } as never);
    if (error) throw error;
  }
  revalidatePath("/");
  revalidatePath("/sss");
  redirect("/admin/sss-faq");
}

export async function deleteFaqAction(formData: FormData) {
  await requireAdminSession();
  const id = z.string().parse(formData.get("id"));
  const { error } = await getSupabase().from("FAQ").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/");
  revalidatePath("/sss");
  redirect("/admin/sss-faq");
}
