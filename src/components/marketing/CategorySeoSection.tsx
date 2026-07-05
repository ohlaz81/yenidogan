import type { ReactNode } from "react";
import { FaqAccordion } from "./FaqAccordion";
import type { FAQ } from "@/types/database";

export function CategorySeoSection({ children, faqs }: { children: ReactNode; faqs: FAQ[] }) {
  return (
    <section className="mt-10 space-y-5 sm:mt-12" aria-labelledby="category-about-title">
      <div className="rounded-2xl border border-border/80 bg-white/90 p-5 shadow-sm sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-pink">Bu sayfa hakkında</p>
        <div
          id="category-about-title"
          className="mt-2 font-display text-xl font-semibold text-primary sm:text-2xl"
        >
          İsim seçerken listeyi nasıl okumalı?
        </div>
        <div className="mt-4 space-y-3 text-sm leading-7 text-muted sm:text-[0.95rem] [&_a]:font-semibold [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline">
          {children}
        </div>
      </div>

      <div className="space-y-3" aria-labelledby="category-faq-title">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-pink">Sık sorulan sorular</p>
          <h2 id="category-faq-title" className="mt-1 font-display text-xl font-semibold text-primary sm:text-2xl">
            Bu kategoriyle ilgili merak edilenler
          </h2>
        </div>
        <FaqAccordion
          items={faqs.map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer }))}
          initialOpenId={null}
        />
      </div>
    </section>
  );
}
