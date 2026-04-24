import Link from "next/link";
import { listNames, type NameListParams } from "@/lib/queries/names";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { NameCard, type NameWithImage } from "./NameCard";

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
  total: number;
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
  return { page, pages, items, total };
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
  total,
  take = DEFAULT_TAKE,
}: {
  title: string;
  description: string;
  crumbs: Crumb[];
  path: string;
  paginationExtra?: Record<string, string>;
  page: number;
  pages: number;
  items: NameWithImage[];
  total: number;
  take?: number;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb items={crumbs} />
      <header className="mt-6 space-y-3">
        <h1 className="font-display text-3xl font-semibold text-primary sm:text-4xl">{title}</h1>
        <p className="max-w-2xl text-muted">{description}</p>
        <p className="text-sm text-muted">Toplam {total} isim</p>
      </header>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {items.map((n, i) => (
          <NameCard key={n.id} name={n} index={(page - 1) * take + i} />
        ))}
      </div>
      {items.length === 0 && <p className="mt-10 text-center text-muted">Bu kritere uygun isim bulunamadı.</p>}
      <Pagination page={page} pages={pages} path={path} extra={paginationExtra} />
    </div>
  );
}
