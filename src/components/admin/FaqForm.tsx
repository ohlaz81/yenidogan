import { saveFaq } from "@/app/admin/actions/faq";
import type { FAQ } from "@/types/database";

export function FaqForm({ item }: { item?: FAQ }) {
  return (
    <form action={saveFaq} className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm">
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="grid gap-3 sm:grid-cols-4">
        <div>
          <label className="font-semibold">Sıra</label>
          <input
            type="number"
            name="sortOrder"
            defaultValue={item?.sortOrder ?? 0}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-2 py-1"
          />
        </div>
        <div className="sm:col-span-3">
          <label className="font-semibold">Soru</label>
          <input name="question" required defaultValue={item?.question} className="mt-1 w-full rounded-lg border border-zinc-200 px-2 py-1" />
        </div>
      </div>
      <div>
        <label className="font-semibold">Cevap</label>
        <textarea name="answer" required rows={3} defaultValue={item?.answer} className="mt-1 w-full rounded-lg border border-zinc-200 px-2 py-1" />
      </div>
      <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white">
        {item ? "Güncelle" : "Ekle"}
      </button>
    </form>
  );
}
