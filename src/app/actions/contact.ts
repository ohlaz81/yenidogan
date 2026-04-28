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

function esc(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function notifyContactByEmail(input: { name: string; email: string; message: string }) {
  const apiKey = (process.env.RESEND_API_KEY ?? "").trim();
  const to = (process.env.CONTACT_NOTIFY_TO ?? "").trim();
  const from = (process.env.CONTACT_NOTIFY_FROM ?? "").trim();
  if (!apiKey || !to || !from) return;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5">
      <h2>Yeni iletişim mesajı</h2>
      <p><strong>Ad:</strong> ${esc(input.name)}</p>
      <p><strong>E-posta:</strong> ${esc(input.email)}</p>
      <p><strong>Mesaj:</strong></p>
      <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${esc(input.message)}</pre>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Yeni iletişim formu mesajı",
      html,
      reply_to: input.email,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend error (${res.status}): ${detail}`);
  }
}

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

  try {
    await notifyContactByEmail(parsed.data);
  } catch (e) {
    // İletişim kaydı DB'ye başarıyla düştüyse kullanıcıyı bloklamayalım.
    console.error("contact notify email failed:", e);
  }

  return { ok: true };
}
