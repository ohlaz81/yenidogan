import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { FaqForm } from "@/components/admin/FaqForm";
import { deleteFaqAction } from "@/app/admin/actions/faq";

export default async function AdminFaqPage() {
  await requireAdminSession();
  const faqs = await prisma.fAQ.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div className="space-y-8">
      <h1 className="font-display text-2xl font-semibold text-primary">Sık sorulan sorular</h1>
      <div>
        <h2 className="mb-3 text-sm font-semibold text-zinc-600">Yeni soru</h2>
        <FaqForm />
      </div>
      <div className="space-y-6">
        {faqs.map((f) => (
          <div key={f.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <FaqForm item={f} />
            <form action={deleteFaqAction} className="mt-2">
              <input type="hidden" name="id" value={f.id} />
              <button type="submit" className="text-xs text-red-600 hover:underline">
                Sil
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
