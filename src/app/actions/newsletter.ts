"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  email: z.string().email(),
});

export type NewsletterState = { ok?: boolean; error?: string };

export async function subscribeNewsletter(_: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { error: "Geçerli bir e-posta girin." };
  }
  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      create: { email: parsed.data.email },
      update: {},
    });
    return { ok: true };
  } catch {
    return { error: "Kayıt sırasında bir sorun oluştu." };
  }
}
