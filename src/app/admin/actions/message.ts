"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";

export async function markMessageRead(formData: FormData) {
  await requireAdminSession();
  const id = z.string().parse(formData.get("id"));
  await prisma.contactMessage.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin");
  revalidatePath("/admin/iletisim");
}
