"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";

export async function updateFeaturedSlot(formData: FormData) {
  await requireAdminSession();
  const id = z.string().parse(formData.get("slotId"));
  const nameIdRaw = formData.get("nameId");
  const nameId = nameIdRaw && String(nameIdRaw).length ? String(nameIdRaw) : null;
  await prisma.homeFeaturedName.update({
    where: { id },
    data: { nameId },
  });
  revalidatePath("/");
}
