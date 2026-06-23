import type { Metadata } from "next";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { STATIC_FAQS } from "@/data/static-faqs";
import { canonicalUrl } from "@/lib/site";
import { JsonLd, faqPageSchema, schemaGraph, webPageSchema } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Sık sorulan sorular",
  alternates: { canonical: canonicalUrl("/sss") },
};

export default function FaqPage() {
  const url = canonicalUrl("/sss");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={schemaGraph([
          webPageSchema({
            url,
            name: "Sık sorulan sorular",
            description: "Bebek isimleri ve platform kullanımı hakkında kısa yanıtlar.",
            aboutId: `${url}#faq`,
          }),
          faqPageSchema(STATIC_FAQS, url),
        ])}
      />
      <h1 className="font-display text-3xl font-semibold text-primary">Sık sorulan sorular</h1>
      <p className="mt-2 text-muted">Bebek isimleri ve platform kullanımı hakkında kısa yanıtlar.</p>
      <div className="mt-8">
        <FaqAccordion
          items={STATIC_FAQS.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
        />
      </div>
    </div>
  );
}
