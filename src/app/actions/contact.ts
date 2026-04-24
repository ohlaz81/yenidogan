"use server";

import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { getSupabase } from "@/lib/supabase/admin";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export type ContactState = { ok?: boolean; error?: string };

export async function sendContact(_: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    return { error: "Lütfen tüm alanları doğru doldurun." };
  }
  const { error } = await getSupabase().from("ContactMessage").insert({
    id: createId(),
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
    read: false,
    createdAt: new Date().toISOString(),
  } as never);
  if (error) return { error: "Gönderilemedi." };
  return { ok: true };
}
