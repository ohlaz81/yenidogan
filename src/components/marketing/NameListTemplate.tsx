import type { ReactNode } from "react";
import Link from "next/link";
import { listNames, type NameListParams } from "@/lib/queries/names";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { type NameWithImage } from "./NameCard";
import { NameListRow } from "./NameListRow";
import { AlphabetStrip } from "./AlphabetStrip";

function buildPageHref(path: string, page: number, extra?: Record<string, string>) {
  const qs = new URLSearchParams();
  if (extra) {
    for (const [k, v] of Object.entries(extra)) {
      if (v) qs.set(k, v);
    }
  }
  if (page > 1) qs.set("sayfa", String(page));
  const s = qs.toString();
  return s ? `${path}?${s}` : path;
}

function Pagination({
  page,
  pages,
  path,
  extra,
}: {
  page: number;
  pages: number;
  path: string;
  extra?: Record<string, string>;
}) {
  if (pages <= 1) return null;
  const prev = Math.max(1, page - 1);
  const next = Math.min(pages, page + 1);
  return (
    <nav className="mt-10 flex items-center justify-center gap-4 text-sm font-semibold">
      {page > 1 ? (
        <Link
          href={buildPageHref(path, prev, extra)}
          className="rounded-full border border-border bg-card px-4 py-2 hover:bg-accent-pink-soft"
        >
          ← Önceki
        </Link>
      ) : (
        <span className="text-muted">← Önceki</span>
      )}
      <span className="text-muted">
        {page} / {pages}
      </span>
      {page < pages ? (
        <Link
          href={buildPageHref(path, next, extra)}
          className="rounded-full border border-border bg-card px-4 py-2 hover:bg-accent-pink-soft"
        >
          Sonraki →
        </Link>
      ) : (
        <span className="text-muted">Sonraki →</span>
      )}
    </nav>
  );
}

export type NameListTemplateListState = {
  page: number;
  pages: number;
  items: NameWithImage[];
};

const DEFAULT_TAKE = 12;

/**
 * Sadece sayfa (default export) async olsun; bu fonksiyonu orada await edin.
 * İç içe async Server Component (E394) üretim hatasını önler.
 */
export async function loadNameListTemplateData(args: {
  searchParams: Record<string, string | string[] | undefined>;
  query: NameListParams;
  take?: number;
}): Promise<NameListTemplateListState> {
  const take = args.take ?? DEFAULT_TAKE;
  const raw = args.searchParams.sayfa;
  const sayfa = Array.isArray(raw) ? raw[0] : raw;
  const page = Math.max(1, parseInt(sayfa ?? "1", 10) || 1);
  const { items, total } = await listNames({
    ...args.query,
    skip: (page - 1) * take,
    take,
  });
  const pages = Math.max(1, Math.ceil(total / take));
  return { page, pages, items };
}

export function NameListTemplate({
  title,
  description,
  crumbs,
  path,
  paginationExtra,
  page,
  pages,
  items,
  take = DEFAULT_TAKE,
  aside,
  headerClassName,
  alphabetStrip,
}: {
  title: string;
  description: string;
  crumbs: Crumb[];
  path: string;
  paginationExtra?: Record<string, string>;
  page: number;
  pages: number;
  items: NameWithImage[];
  take?: number;
  aside?: ReactNode;
  /** Örn. erkek/kız sayfaları: gradient kutu */
  headerClassName?: string;
  /** Kız / erkek listelerinde alfabetik harf şeridi */
  alphabetStrip?: { letters: string[]; basePath: string; activeLetter: string | null; tone: "girl" | "boy" };
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={crumbs} />
      <header
        className={headerClassName ? `mt-6 ${headerClassName}` : "mt-6 space-y-3"}
      >
        {headerClassName ? (
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-bold text-primary sm:text-3xl md:text-4xl">{title}</h1>
            <p className="max-w-2xl text-sm text-muted sm:text-base">{description}</p>
          </div>
        ) : (
          <>
            <h1 className="font-display text-3xl font-semibold text-primary sm:text-4xl">{title}</h1>
            <p className="max-w-2xl text-muted">{description}</p>
          </>
        )}
      </header>
      <div
        className={
          aside
            ? "mt-6 grid grid-cols-1 gap-8 lg:mt-8 lg:grid-cols-[1fr_17.5rem] lg:items-start"
            : "contents"
        }
      >
        <div className={aside ? "min-w-0" : "mt-8 min-w-0"}>
          {alphabetStrip && (
            <div className="sticky top-14 z-10 mb-3 bg-background/95 pb-1 pt-0.5 backdrop-blur-sm sm:top-16">
              <AlphabetStrip
                letters={alphabetStrip.letters}
                basePath={alphabetStrip.basePath}
                activeLetter={alphabetStrip.activeLetter}
                tone={alphabetStrip.tone}
              />
            </div>
          )}
          <div className="mt-0 overflow-hidden rounded-2xl border border-violet-100/80 bg-gradient-to-b from-white to-slate-50/40 p-0.5 shadow-sm ring-1 ring-violet-100/50 sm:px-0.5 sm:py-0.5 lg:mt-0">
            <ul className="px-0 pb-1.5 sm:px-0 sm:pb-2">
              {items.map((n, i) => (
                <NameListRow key={n.id} name={n} rank={(page - 1) * take + i + 1} />
              ))}
            </ul>
          </div>
          {items.length === 0 && <p className="mt-10 text-center text-muted">Bu kritere uygun isim bulunamadı.</p>}
          <Pagination page={page} pages={pages} path={path} extra={paginationExtra} />
        </div>
        {aside && (
          <aside className="w-full min-w-0 space-y-4 lg:sticky lg:top-6 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
            {aside}
          </aside>
        )}
      </div>
    </div>
  );
}
