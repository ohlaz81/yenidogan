import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function AdminHomePage() {
  await requireAdminSession();
  const [names, articles, media, messages] = await Promise.all([
    prisma.name.count(),
    prisma.guideArticle.count(),
    prisma.mediaAsset.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-primary">Özet</h1>
        <p className="text-sm text-zinc-600">İçerik durumu</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "İsimler", value: names, href: "/admin/isimler" },
          { label: "Rehber yazıları", value: articles, href: "/admin/rehber" },
          { label: "Medya dosyası", value: media, href: "/admin/medya" },
          { label: "Okunmamış mesaj", value: messages, href: "/admin/iletisim" },
        ].map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-primary/40"
          >
            <p className="text-sm text-zinc-600">{c.label}</p>
            <p className="mt-2 text-3xl font-bold text-primary">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
