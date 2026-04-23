"use client";

import { useState } from "react";

export type FaqItem = { id: string; question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-card">
      {items.map((f) => {
        const isOpen = open === f.id;
        return (
          <div key={f.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-semibold text-foreground hover:bg-accent-pink-soft/30"
              onClick={() => setOpen(isOpen ? null : f.id)}
              aria-expanded={isOpen}
            >
              {f.question}
              <span className="text-muted">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && <div className="px-4 pb-4 text-sm leading-relaxed text-muted">{f.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}
