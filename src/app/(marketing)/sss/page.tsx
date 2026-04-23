import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";

export const metadata: Metadata = {
  title: "Sık sorulan sorular",
};

export default async function FaqPage() {
  const faqs = await prisma.fAQ.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-semibold text-primary">Sık sorulan sorular</h1>
      <p className="mt-2 text-muted">Bebek isimleri ve platform kullanımı hakkında kısa yanıtlar.</p>
      <div className="mt-8">
        <FaqAccordion items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
      </div>
    </div>
  );
}
