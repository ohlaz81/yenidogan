import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { MediaImage } from "@/components/marketing/MediaImage";

export const metadata: Metadata = {
  title: "İsim rehberi",
  description: "Bebek ismi seçimi, anlamlar ve öneriler hakkında rehber yazıları.",
};

export default async function GuideIndexPage() {
  const articles = await prisma.guideArticle.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    include: { cover: true },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-semibold text-primary">İsim rehberi</h1>
      <p className="mt-2 max-w-2xl text-muted">İsim seçimine dair pratik rehber yazıları ve öneriler.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/isim-rehberi/${a.slug}`}
            className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative h-40 w-full">
              <MediaImage
                src={a.cover?.url ?? "/media/placeholder.svg"}
                alt={a.cover?.alt ?? a.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-accent-pink">İsim rehberi</p>
              <h2 className="mt-1 font-display text-xl font-semibold text-primary group-hover:underline">{a.title}</h2>
              {a.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted">{a.excerpt}</p>}
              <span className="mt-3 inline-block text-sm font-semibold text-accent-pink">Devamını oku →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
