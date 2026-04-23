import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { GuideForm } from "@/components/admin/GuideForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditGuidePage({ params }: Props) {
  await requireAdminSession();
  const { id } = await params;
  const article = await prisma.guideArticle.findUnique({ where: { id } });
  if (!article) notFound();
  const mediaOptions = await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-primary">Yazıyı düzenle</h1>
      <GuideForm article={article} mediaOptions={mediaOptions} />
    </div>
  );
}
