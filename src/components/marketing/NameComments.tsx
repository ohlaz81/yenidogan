"use client";

import { FormEvent, useEffect, useState } from "react";

type NameComment = {
  displayName: string;
  comment: string;
  createdAt: string;
};

type FormState = {
  fullName: string;
  comment: string;
};

const initialForm: FormState = {
  fullName: "",
  comment: "",
};

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function validateForm(form: FormState) {
  const fullName = normalizeText(form.fullName);
  const comment = form.comment.trim();

  if (fullName.length < 3 || fullName.length > 60) {
    return "Ad Soyad 3 ile 60 karakter arasında olmalıdır.";
  }

  if (comment.length < 10 || comment.length > 1000) {
    return "Yorum 10 ile 1000 karakter arasında olmalıdır.";
  }

  return null;
}

export function NameComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<NameComment[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadComments() {
      try {
        const params = new URLSearchParams({ slug });
        const response = await fetch(`/api/public/name-comments?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Comment load failed");

        const data = (await response.json()) as NameComment[];
        if (!controller.signal.aborted) {
          setComments(
            Array.isArray(data)
              ? data.filter(
                  (item) =>
                    typeof item.displayName === "string" &&
                    typeof item.comment === "string" &&
                    typeof item.createdAt === "string",
                )
              : [],
          );
          setLoading(false);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError("Yorumlar şu anda yüklenemedi.");
          setLoading(false);
        }
      }
    }

    void loadComments();

    return () => controller.abort();
  }, [slug]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    setError(null);
    setSuccess(null);

    const validationError = validateForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setPending(true);

    try {
      const response = await fetch("/api/public/name-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          fullName: normalizeText(form.fullName),
          comment: form.comment.trim(),
        }),
      });

      if (!response.ok) throw new Error("Comment submit failed");

      const data = (await response.json()) as { success?: boolean; message?: string };
      if (!data.success) throw new Error("Comment submit failed");

      setForm(initialForm);
      setSuccess("Yorumunuz başarıyla alındı. Onaylandıktan sonra yayınlanacaktır.");
    } catch {
      setError("Yorum gönderilemedi. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="mt-12 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="max-w-3xl">
        <h2 className="font-display text-2xl font-semibold text-primary">Yorumlar</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Bu isim hakkındaki düşüncenizi paylaşabilirsiniz. Yorumlar onaylandıktan sonra yayınlanır.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        <div className="space-y-3">
          {loading ? <p className="text-sm text-muted">Yorumlar yükleniyor...</p> : null}

          {!loading && comments.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border bg-white/70 p-4 text-sm text-muted">
              Bu isim için henüz yorum yapılmamış.
            </p>
          ) : null}

          {comments.map((item, index) => {
            const dateLabel = formatDate(item.createdAt);
            return (
              <article key={`${item.createdAt}-${index}`} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-primary">{item.displayName}</p>
                  {dateLabel ? <time className="text-xs text-muted">{dateLabel}</time> : null}
                </div>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/85">{item.comment}</p>
              </article>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div>
            <label htmlFor="name-comment-full-name" className="text-sm font-semibold text-primary">
              Adınız Soyadınız
            </label>
            <input
              id="name-comment-full-name"
              value={form.fullName}
              onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
              minLength={3}
              maxLength={60}
              required
              className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none transition focus:border-accent-pink"
            />
          </div>

          <div>
            <label htmlFor="name-comment-comment" className="text-sm font-semibold text-primary">
              Yorumunuz
            </label>
            <textarea
              id="name-comment-comment"
              value={form.comment}
              onChange={(event) => setForm((current) => ({ ...current, comment: event.target.value }))}
              minLength={10}
              maxLength={1000}
              required
              rows={5}
              className="mt-1 w-full resize-y rounded-xl border border-border px-3 py-2 text-sm outline-none transition focus:border-accent-pink"
            />
            <p className="mt-1 text-right text-xs text-muted">{form.comment.length}/1000</p>
          </div>

          {error ? <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p> : null}
          {success ? (
            <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">{success}</p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Gönderiliyor..." : "Yorumu Gönder"}
          </button>
        </form>
      </div>
    </section>
  );
}
