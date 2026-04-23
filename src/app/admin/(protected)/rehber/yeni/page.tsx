import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { GuideForm } from "@/components/admin/GuideForm";

export default async function NewGuidePage() {
  await requireAdminSession();
  const mediaOptions = await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-primary">Yeni rehber yazısı</h1>
      <GuideForm mediaOptions={mediaOptions} />
    </div>
  );
}
