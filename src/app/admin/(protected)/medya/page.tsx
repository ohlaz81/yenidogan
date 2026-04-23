import Image from "next/image";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { MediaUpload } from "@/components/admin/MediaUpload";

export default async function AdminMediaPage() {
  await requireAdminSession();
  const items = await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-primary">Medya</h1>
        <p className="text-sm text-zinc-600">Görselleri yükleyin; isim ve ana sayfa alanlarında seçebilirsiniz.</p>
      </div>
      <MediaUpload />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((m) => (
          <div key={m.id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="relative aspect-square bg-zinc-50">
              {m.url.endsWith(".svg") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt={m.alt ?? ""} className="h-full w-full object-cover" />
              ) : (
                <Image src={m.url} alt={m.alt ?? ""} fill className="object-cover" sizes="200px" />
              )}
            </div>
            <div className="space-y-1 p-3 text-xs">
              <p className="font-mono text-[10px] text-zinc-500">{m.id}</p>
              <p className="break-all text-zinc-700">{m.url}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
