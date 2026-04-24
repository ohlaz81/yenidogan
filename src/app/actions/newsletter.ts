"use server";

import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { getSupabase } from "@/lib/supabase/admin";

const schema = z.object({
  email: z.string().email(),
});

export type NewsletterState = { ok?: boolean; error?: string };

export async function subscribeNewsletter(_: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { error: "Geçerli bir e-posta girin." };
  }
  const s = getSupabase();
  const { error } = await s.from("NewsletterSubscriber").insert({
    id: createId(),
    email: parsed.data.email,
    createdAt: new Date().toISOString(),
  } as never);
  if (error) {
    if (error.code === "23505" || /duplicate|unique/i.test(error.message)) {
      return { ok: true };
    }
    return { error: "Kayıt sırasında bir sorun oluştu." };
  }
  return { ok: true };
}
