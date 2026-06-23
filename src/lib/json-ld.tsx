import { canonicalUrl, site } from "@/lib/site";
import type { FAQ, GuideArticle, Name } from "@/types/database";

type JsonLdPrimitive = string | number | boolean | null;
export type JsonLdValue =
  | JsonLdPrimitive
  | JsonLdValue[]
  | {
      [key: string]: JsonLdValue | undefined;
    };

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type NameSummary = Pick<Name, "slug" | "displayName" | "meaning">;

export function JsonLd({ data }: { data: JsonLdValue }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function schemaGraph(items: JsonLdValue[]) {
  return {
    "@context": "https://schema.org",
    "@graph": items,
  };
}

export function absoluteSchemaUrl(url: string | null | undefined) {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return canonicalUrl(url);
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${canonicalUrl("/")}#website`,
    url: canonicalUrl("/"),
    name: site.name,
    description: site.description,
    inLanguage: "tr-TR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${canonicalUrl("/isim-bulucu/sonuc")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageSchema({
  url,
  name,
  description,
  breadcrumbId,
  aboutId,
}: {
  url: string;
  name: string;
  description?: string | null;
  breadcrumbId?: string;
  aboutId?: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description: description || undefined,
    isPartOf: { "@id": `${canonicalUrl("/")}#website` },
    breadcrumb: breadcrumbId ? { "@id": breadcrumbId } : undefined,
    about: aboutId ? { "@id": aboutId } : undefined,
    inLanguage: "tr-TR",
  };
}

export function breadcrumbListSchema(items: BreadcrumbItem[], currentUrl: string) {
  const id = `${currentUrl}#breadcrumb`;
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? canonicalUrl(item.href) : currentUrl,
    })),
  };
}

export function nameEntitySchema({
  name,
  url,
  traits,
}: {
  name: Name;
  url: string;
  traits: string[];
}) {
  const entityId = `${url}#defined-term`;
  return {
    "@type": "DefinedTerm",
    "@id": entityId,
    name: name.displayName,
    description: name.meaning,
    termCode: name.slug,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": `${canonicalUrl("/tum-isimler")}#defined-term-set`,
      name: "Bebek isimleri",
      url: canonicalUrl("/tum-isimler"),
    },
    url,
    alternateName: name.pronunciation,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Köken", value: name.origin },
      { "@type": "PropertyValue", name: "Cinsiyet", value: name.gender },
      { "@type": "PropertyValue", name: "Kur'an'da geçer", value: name.inQuran ? "Evet" : "Hayır" },
      name.quranReference
        ? { "@type": "PropertyValue", name: "Kur'an referansı", value: name.quranReference }
        : undefined,
      { "@type": "PropertyValue", name: "Popülerlik", value: String(name.popularity) },
      traits.length > 0 ? { "@type": "PropertyValue", name: "Özellikler", value: traits.join(", ") } : undefined,
    ].filter(Boolean) as JsonLdValue[],
  };
}

export function articleSchema(article: GuideArticle, url: string) {
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    headline: article.title,
    description: article.excerpt || undefined,
    image: absoluteSchemaUrl(article.cover?.url),
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt || article.publishedAt || article.createdAt,
    author: {
      "@type": "Organization",
      name: site.name,
      url: canonicalUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: canonicalUrl("/"),
    },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    inLanguage: "tr-TR",
  };
}

export function faqPageSchema(items: FAQ[], url: string) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function collectionPageSchema({
  url,
  name,
  description,
  items,
}: {
  url: string;
  name: string;
  description: string;
  items: NameSummary[];
}) {
  const listId = `${url}#item-list`;
  return schemaGraph([
    {
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": `${canonicalUrl("/")}#website` },
      mainEntity: { "@id": listId },
      inLanguage: "tr-TR",
    },
    {
      "@type": "ItemList",
      "@id": listId,
      name,
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: canonicalUrl(`/isim/${item.slug}`),
        name: item.displayName,
        description: item.meaning,
      })),
    },
  ]);
}

