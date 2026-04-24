import { saveGuide } from "@/app/admin/actions/guide";
import type { GuideArticle } from "@/types/database";

type Props = {
  article?: GuideArticle;
  mediaOptions: { id: string; url: string; alt: string | null }[];
};

export function GuideForm({ article, mediaOptions }: Props) {
  return (
    <form action={saveGuide} className="max-w-3xl space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      {article && <input type="hidden" name="id" value={article.id} />}
      <div>
        <label className="text-sm font-semibold">Başlık</label>
        <input name="title" required defaultValue={article?.title} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-semibold">Slug</label>
        <input name="slug" defaultValue={article?.slug} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-semibold">Özet</label>
        <textarea name="excerpt" rows={2} defaultValue={article?.excerpt ?? ""} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-semibold">İçerik (HTML)</label>
        <textarea name="body" required rows={12} defaultValue={article?.body} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 font-mono text-sm" />
      </div>
      <div>
        <label className="text-sm font-semibold">Kapak</label>
        <select name="coverId" defaultValue={article?.coverId ?? ""} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm">
          <option value="">(Yok)</option>
          {mediaOptions.map((m) => (
            <option key={m.id} value={m.id}>
              {m.alt ?? m.url}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-semibold">Yayında</label>
        <select name="published" defaultValue={article?.published ? "true" : "false"} className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm">
          <option value="true">Evet</option>
          <option value="false">Hayır</option>
        </select>
      </div>
      <button type="submit" className="rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white">
        Kaydet
      </button>
    </form>
  );
}
