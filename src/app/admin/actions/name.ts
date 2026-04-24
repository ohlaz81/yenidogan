"use server";

import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabase } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";
import { firstLetterTr } from "@/lib/text";

const genderZ = z.enum(["GIRL", "BOY", "UNISEX"]);
const styleZ = z.enum(["MODERN", "CLASSIC", "RARE", "POPULAR"]);

const base = z.object({
  id: z.string().optional(),
  displayName: z.string().min(1),
  slug: z.string().optional(),
  gender: genderZ,
  meaning: z.string().min(1),
  origin: z.string().min(1),
  pronunciation: z.string().min(1),
  popularity: z.coerce.number().min(1).max(5),
  popularScore: z.coerce.number().min(0).max(1000),
  inQuran: z.enum(["true", "false"]),
  style: styleZ,
  isShort: z.enum(["true", "false"]),
  beautifulMeaning: z.enum(["true", "false"]),
  intro: z.string().optional(),
  traits: z.string().optional(),
  imageId: z.string().optional().nullable(),
  published: z.enum(["true", "false"]),
  similarSlugs: z.string().optional(),
});

export type NameSaveState = { ok?: boolean; error?: string; slug?: string };

export async function saveName(_: NameSaveState, formData: FormData): Promise<NameSaveState> {
  await requireAdminSession();
  const parsed = base.safeParse({
    id: formData.get("id") || undefined,
    displayName: formData.get("displayName"),
    slug: formData.get("slug") || undefined,
    gender: formData.get("gender"),
    meaning: formData.get("meaning"),
    origin: formData.get("origin"),
    pronunciation: formData.get("pronunciation"),
    popularity: formData.get("popularity"),
    popularScore: formData.get("popularScore"),
    inQuran: formData.get("inQuran"),
    style: formData.get("style"),
    isShort: formData.get("isShort"),
    beautifulMeaning: formData.get("beautifulMeaning"),
    intro: formData.get("intro") || undefined,
    traits: formData.get("traits") || undefined,
    imageId: (formData.get("imageId") as string) || null,
    published: formData.get("published"),
    similarSlugs: formData.get("similarSlugs") || undefined,
  });

  if (!parsed.success) {
    return { error: "Form doğrulanamadı" };
  }

  const d = parsed.data;
  const slug = (d.slug && d.slug.trim()) || slugify(d.displayName);
  const firstLetter = firstLetterTr(d.displayName);
  const traitsArr = d.traits
    ? d.traits
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const row: Record<string, unknown> = {
    slug,
    displayName: d.displayName.trim(),
    gender: d.gender,
    meaning: d.meaning.trim(),
    origin: d.origin.trim(),
    pronunciation: d.pronunciation.trim(),
    popularity: d.popularity,
    popularScore: d.popularScore,
    inQuran: d.inQuran === "true",
    style: d.style,
    isShort: d.isShort === "true",
    beautifulMeaning: d.beautifulMeaning === "true",
    firstLetter,
    intro: d.intro?.trim() || null,
    traits: traitsArr.length ? traitsArr : null,
    imageId: d.imageId && d.imageId.length ? d.imageId : null,
    published: d.published === "true",
  };

  const s = getSupabase();
  let id = d.id;
  if (id) {
    const up = await s
      .from("Name")
      .update({ ...row, updatedAt: new Date().toISOString() } as never)
      .eq("id", id);
    if (up.error) return { error: up.error.message };
  } else {
    const newId = createId();
    const ins = await s.from("Name").insert({
      id: newId,
      ...row,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never);
    if (ins.error) return { error: ins.error.message };
    id = newId;
  }

  if (id) {
    await s.from("SimilarName").delete().eq("sourceId", id);
    if (d.similarSlugs?.trim()) {
      const parts = d.similarSlugs
        .split(/[\n,]+/)
        .map((s) => slugify(s.trim()))
        .filter(Boolean);
      const { data: targets } = await s.from("Name").select("id,slug").in("slug", parts);
      for (const t of targets ?? []) {
        if ((t as { id: string }).id === id) continue;
        await s
          .from("SimilarName")
          .insert({
            id: createId(),
            sourceId: id,
            targetId: (t as { id: string }).id,
          } as never);
      }
    }
  }

  revalidatePath("/");
  revalidatePath("/kiz-isimleri");
  revalidatePath("/erkek-isimleri");
  revalidatePath(`/isim/${slug}`);

  return { ok: true, slug };
}

export async function deleteNameAction(formData: FormData) {
  await requireAdminSession();
  const id = z.string().parse(formData.get("id"));
  const s = getSupabase();
  await s.from("SimilarName").delete().eq("sourceId", id);
  await s.from("SimilarName").delete().eq("targetId", id);
  await s.from("HomeFeaturedName").update({ nameId: null } as never).eq("nameId", id);
  await s.from("Name").delete().eq("id", id);
  revalidatePath("/");
  redirect("/admin/isimler");
}
