import type { Metadata } from "next";
import { ContactForm } from "@/components/marketing/ContactForm";

export const metadata: Metadata = {
  title: "İletişim",
};

export default function ContactPage() {
  const email = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "").trim();
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-2">
      <div>
        <h1 className="font-display text-3xl font-semibold text-primary">İletişim</h1>
        <p className="mt-3 text-muted">
          İçerik önerileri, düzeltme talepleri veya iş birliği için bize yazabilirsiniz.
        </p>
        {email ? (
          <p className="mt-6 text-sm">
            <span className="font-semibold text-foreground">E-posta:</span>{" "}
            <a className="text-accent-pink hover:underline" href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        ) : null}
      </div>
      <ContactForm />
    </div>
  );
}
