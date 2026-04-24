import type { Metadata } from "next";
import Link from "next/link";
import { getStaticGuides } from "@/data/static-guide";
import { MediaImage } from "@/components/marketing/MediaImage";
import type { MediaAsset } from "@/types/database";

export const metadata: Metadata = {
  title: "İsim rehberi",
  description: "Bebek ismi seçimi, anlamlar ve öneriler hakkında rehber yazıları.",
};

export default function GuideIndexPage() {
  const articles = getStaticGuides();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-semibold text-primary">İsim rehberi</h1>
      <p className="mt-2 max-w-2xl text-muted">İsim seçimine dair pratik rehber yazıları ve öneriler.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {articles.map((a) => {
          const cover = a.cover as MediaAsset | null;
          return (
            <Link
              key={a.id}
              href={`/isim-rehberi/${a.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:border-primary/30"
            >
              <div className="relative aspect-[16/10] bg-muted/30">
                {cover && (
                  <MediaImage
                    src={cover.url}
                    alt={cover.alt || a.title}
                    className="object-cover transition group-hover:scale-105"
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="font-display text-lg font-semibold text-primary group-hover:underline">
                  {a.title}
                </h2>
                {a.excerpt && <p className="mt-1 line-clamp-2 text-sm text-muted">{a.excerpt}</p>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
