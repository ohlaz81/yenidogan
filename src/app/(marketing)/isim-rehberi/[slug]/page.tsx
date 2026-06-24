import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStaticGuides, getStaticGuideBySlug } from "@/data/static-guide";
import { Breadcrumb } from "@/components/marketing/Breadcrumb";
import { MediaImage } from "@/components/marketing/MediaImage";
import { canonicalUrl } from "@/lib/site";
import {
  JsonLd,
  articleSchema,
  breadcrumbListSchema,
  schemaGraph,
  webPageSchema,
} from "@/lib/json-ld";

type Props = { params: Promise<{ slug: string }> };

const BLUE_GUIDE_SLUG = "2026-en-guzel-ve-populer-erkek-isimleri";

const guideTheme = {
  default: {
    eyebrow: "text-accent-pink",
    cover: "border-border",
    body: "[&_a]:text-accent-pink [&_h2]:text-primary",
  },
  blue: {
    eyebrow: "text-[#2563eb]",
    cover: "border-[#bfdbfe]",
    body:
      "[&_a]:text-[#2563eb] [&_a:hover]:text-[#1d4ed8] [&_a:active]:text-[#1d4ed8] [&_a:focus-visible]:rounded-sm [&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-[#2563eb] [&_h2]:text-[#2563eb] [&_strong]:text-[#2563eb] [&_thead]:bg-[#eff6ff] [&_.border-border]:border-[#bfdbfe]",
  },
} as const;

export function generateStaticParams() {
  return getStaticGuides().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getStaticGuideBySlug(slug);
  if (!a) return { title: "Yazı bulunamadı" };
  return {
    title: a.title,
    description: a.excerpt ?? undefined,
    alternates: { canonical: canonicalUrl(`/isim-rehberi/${a.slug}`) },
  };
}

export default async function GuideArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getStaticGuideBySlug(slug);
  if (!article) notFound();
  const theme = article.slug === BLUE_GUIDE_SLUG ? guideTheme.blue : guideTheme.default;
  const url = canonicalUrl(`/isim-rehberi/${article.slug}`);
  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "İsim rehberi", href: "/isim-rehberi" },
    { label: article.title },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={schemaGraph([
          webPageSchema({
            url,
            name: article.title,
            description: article.excerpt,
            breadcrumbId: `${url}#breadcrumb`,
            aboutId: `${url}#article`,
          }),
          breadcrumbListSchema(breadcrumbItems, url),
          articleSchema(article, url),
        ])}
      />
      <Breadcrumb items={breadcrumbItems} />
      <header className="mt-8">
        <p className={`text-xs font-bold uppercase tracking-wide ${theme.eyebrow}`}>İsim rehberi</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-primary">{article.title}</h1>
        {article.excerpt && <p className="mt-3 text-lg text-muted">{article.excerpt}</p>}
      </header>
      <div className={`relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border ${theme.cover}`}>
        <MediaImage
          src={article.cover?.url ?? "/media/placeholder.svg"}
          alt={article.cover?.alt ?? article.title}
          fill
          className="object-cover"
          sizes="768px"
        />
      </div>
      <div
        className={`mt-10 space-y-4 text-base leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-xl [&_li]:ml-4 [&_ul]:list-disc ${theme.body}`}
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
    </article>
  );
}
