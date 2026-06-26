import Link from "next/link";
import { getSupabase } from "@/lib/supabase/admin";
import { postgrestToError } from "@/lib/supabase/errors";
import { ADMIN_PERMISSIONS, requirePermission } from "@/lib/admin-permissions";
import { updateNameCommentStatus } from "@/app/admin/actions/comment";

type Props = {
  searchParams?: Promise<{ status?: string }>;
};

type CommentStatus = "PENDING" | "APPROVED" | "REJECTED";

type CommentRow = {
  id: string;
  displayName: string;
  fullName: string;
  comment: string;
  status: CommentStatus;
  createdAt: string;
  name: {
    id: string;
    slug: string;
    displayName: string;
  } | null;
};

const statusLabels: Record<CommentStatus, string> = {
  PENDING: "Bekleyen",
  APPROVED: "Onaylanan",
  REJECTED: "Reddedilen",
};

function parseStatus(value: string | undefined): CommentStatus {
  return value === "APPROVED" || value === "REJECTED" ? value : "PENDING";
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function statusLinkClass(active: boolean) {
  return [
    "rounded-xl border px-3 py-2 text-sm font-semibold transition",
    active ? "border-primary bg-primary text-white" : "border-zinc-200 bg-white text-zinc-700 hover:border-primary/40",
  ].join(" ");
}

function ActionButton({ id, slug, status, children }: { id: string; slug?: string; status: "APPROVED" | "REJECTED"; children: string }) {
  const isApprove = status === "APPROVED";
  return (
    <form action={updateNameCommentStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      {slug ? <input type="hidden" name="slug" value={slug} /> : null}
      <button
        type="submit"
        className={[
          "rounded-xl px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:opacity-90",
          isApprove ? "bg-emerald-600" : "bg-red-600",
        ].join(" ")}
      >
        {children}
      </button>
    </form>
  );
}

export default async function AdminNameCommentsPage({ searchParams }: Props) {
  await requirePermission(ADMIN_PERMISSIONS.content);

  const sp = (await searchParams) ?? {};
  const status = parseStatus(sp.status);
  const { data, error } = await getSupabase()
    .from("NameComment")
    .select("id,displayName,fullName,comment,status,createdAt,name:nameId(id,slug,displayName)")
    .eq("status", status)
    .order("createdAt", { ascending: false })
    .limit(200);

  if (error) throw postgrestToError(error, "admin/yorumlar:NameComment");

  const comments = (data ?? []).map((row) => {
    const rawName = (row as { name?: unknown }).name;
    const name =
      rawName && typeof rawName === "object" && !Array.isArray(rawName)
        ? (rawName as CommentRow["name"])
        : null;
    return {
      id: String(row.id),
      displayName: String(row.displayName),
      fullName: String(row.fullName),
      comment: String(row.comment),
      status: row.status as CommentStatus,
      createdAt: String(row.createdAt),
      name,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary">Yorumlar</h1>
          <p className="text-sm text-zinc-600">İsim yorumlarını onaylayın veya reddedin.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["PENDING", "APPROVED", "REJECTED"] as const).map((item) => (
            <Link
              key={item}
              href={item === "PENDING" ? "/admin/yorumlar" : `/admin/yorumlar?status=${item}`}
              className={statusLinkClass(status === item)}
            >
              {statusLabels[item]}
            </Link>
          ))}
        </div>
      </div>

      {comments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-600">
          {statusLabels[status].toLowerCase()} yorum bulunmuyor.
        </div>
      ) : null}

      <div className="space-y-4">
        {comments.map((item) => (
          <article key={item.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-bold text-primary">{item.fullName}</p>
                <p className="text-xs text-zinc-500">Public ad: {item.displayName}</p>
              </div>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                {formatDate(item.createdAt)}
              </span>
            </div>

            <div className="mt-3 rounded-xl bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
              <span className="font-semibold">İsim: </span>
              {item.name ? (
                <Link href={`/isim/${item.name.slug}`} className="font-semibold text-primary hover:underline">
                  {item.name.displayName}
                </Link>
              ) : (
                <span>Silinmiş isim</span>
              )}
            </div>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-800">{item.comment}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.status !== "APPROVED" ? (
                <ActionButton id={item.id} slug={item.name?.slug} status="APPROVED">
                  Onayla
                </ActionButton>
              ) : null}
              {item.status !== "REJECTED" ? (
                <ActionButton id={item.id} slug={item.name?.slug} status="REJECTED">
                  Reddet
                </ActionButton>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
