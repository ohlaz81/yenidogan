"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { slugify } from "@/lib/slug";
import { firstLetterTr } from "@/lib/text";
import { Prisma } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  const data: Prisma.NameUncheckedUpdateInput = {
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
    traits: traitsArr.length ? traitsArr : Prisma.JsonNull,
    imageId: d.imageId && d.imageId.length ? d.imageId : null,
    published: d.published === "true",
  };

  let id = d.id;
  if (id) {
    await prisma.name.update({ where: { id }, data });
  } else {
    const created = await prisma.name.create({
      data: {
        ...data,
        traits: traitsArr.length ? traitsArr : undefined,
      } as Prisma.NameUncheckedCreateInput,
    });
    id = created.id;
  }

  if (id) {
    await prisma.similarName.deleteMany({ where: { sourceId: id } });
    if (d.similarSlugs?.trim()) {
      const parts = d.similarSlugs
        .split(/[\n,]+/)
        .map((s) => slugify(s.trim()))
        .filter(Boolean);
      const targets = await prisma.name.findMany({ where: { slug: { in: parts } } });
      for (const t of targets) {
        if (t.id === id) continue;
        await prisma.similarName.create({ data: { sourceId: id, targetId: t.id } }).catch(() => {});
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
  await prisma.similarName.deleteMany({ where: { OR: [{ sourceId: id }, { targetId: id }] } });
  await prisma.homeFeaturedName.updateMany({ where: { nameId: id }, data: { nameId: null } });
  await prisma.name.delete({ where: { id } });
  revalidatePath("/");
  redirect("/admin/isimler");
}
