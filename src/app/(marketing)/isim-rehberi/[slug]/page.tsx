import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStaticGuides, getStaticGuideBySlug } from "@/data/static-guide";
import { Breadcrumb } from "@/components/marketing/Breadcrumb";
import { MediaImage } from "@/components/marketing/MediaImage";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getStaticGuides().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getStaticGuideBySlug(slug);
  if (!a) return { title: "Yazı bulunamadı" };
  return { title: a.title, description: a.excerpt ?? undefined };
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getStaticGuideBySlug(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: "İsim rehberi", href: "/isim-rehberi" },
          { label: article.title },
        ]}
      />
      <header className="mt-8">
        <p className="text-xs font-bold uppercase tracking-wide text-accent-pink">İsim rehberi</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-primary">{article.title}</h1>
        {article.excerpt && <p className="mt-3 text-lg text-muted">{article.excerpt}</p>}
      </header>
      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border">
        <MediaImage
          src={article.cover?.url ?? "/media/placeholder.svg"}
          alt={article.cover?.alt ?? article.title}
          fill
          className="object-cover"
          sizes="768px"
        />
      </div>
      <div
        className="mt-10 space-y-4 text-base leading-relaxed text-muted [&_a]:text-accent-pink [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-primary [&_li]:ml-4 [&_ul]:list-disc"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
    </article>
  );
}
