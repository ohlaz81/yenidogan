"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createId } from "@paralleldrive/cuid2";
import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { requireAdminSession } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  body: z.string().min(1),
  coverId: z.string().optional().nullable(),
  published: z.enum(["true", "false"]),
});

export async function saveGuide(formData: FormData) {
  await requireAdminSession();
  const parsed = schema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug") || undefined,
    excerpt: formData.get("excerpt") || undefined,
    body: formData.get("body"),
    coverId: (formData.get("coverId") as string) || null,
    published: formData.get("published"),
  });
  if (!parsed.success) {
    throw new Error("Geçersiz form");
  }
  const d = parsed.data;
  const slug = (d.slug && d.slug.trim()) || slugify(d.title);
  const data = {
    slug,
    title: d.title.trim(),
    excerpt: d.excerpt?.trim() || null,
    body: d.body.trim(),
    coverId: d.coverId && d.coverId.length ? d.coverId : null,
    published: d.published === "true",
    publishedAt: d.published === "true" ? new Date() : null,
  };
  const s = getSupabase();
  if (d.id) {
    const { error } = await s
      .from("GuideArticle")
      .update({ ...data, updatedAt: new Date().toISOString() } as never)
      .eq("id", d.id);
    if (error) throw postgrestToError(error, "saveGuide:update");
  } else {
    const { error } = await s.from("GuideArticle").insert({
      id: createId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never);
    if (error) throw postgrestToError(error, "saveGuide:insert");
  }
  revalidatePath("/isim-rehberi");
  revalidatePath(`/isim-rehberi/${slug}`);
  redirect("/admin/rehber");
}

export async function deleteGuideAction(formData: FormData) {
  await requireAdminSession();
  const id = z.string().parse(formData.get("id"));
  const { error } = await getSupabase().from("GuideArticle").delete().eq("id", id);
  if (error) throw postgrestToError(error, "deleteGuideAction");
  revalidatePath("/isim-rehberi");
  redirect("/admin/rehber");
}
