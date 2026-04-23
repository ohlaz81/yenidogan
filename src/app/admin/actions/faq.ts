"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
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
  if (d.id) {
    await prisma.fAQ.update({ where: { id: d.id }, data: { question: d.question, answer: d.answer, sortOrder: d.sortOrder } });
  } else {
    await prisma.fAQ.create({ data: { question: d.question, answer: d.answer, sortOrder: d.sortOrder } });
  }
  revalidatePath("/");
  revalidatePath("/sss");
  redirect("/admin/sss-faq");
}

export async function deleteFaqAction(formData: FormData) {
  await requireAdminSession();
  const id = z.string().parse(formData.get("id"));
  await prisma.fAQ.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/sss");
  redirect("/admin/sss-faq");
}
