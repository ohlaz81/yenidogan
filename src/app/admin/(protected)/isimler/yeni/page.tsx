import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { NameForm } from "@/components/admin/NameForm";

export default async function NewNamePage() {
  await requireAdminSession();
  const mediaOptions = await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-primary">Yeni isim</h1>
      <NameForm mediaOptions={mediaOptions} />
    </div>
  );
}
