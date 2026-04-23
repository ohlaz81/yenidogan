import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin-auth";
import { NameForm } from "@/components/admin/NameForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditNamePage({ params }: Props) {
  await requireAdminSession();
  const { id } = await params;
  const name = await prisma.name.findUnique({
    where: { id },
    include: { similarFrom: { include: { target: { select: { slug: true } } } } },
  });
  if (!name) notFound();
  const mediaOptions = await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold text-primary">İsim düzenle: {name.displayName}</h1>
      <NameForm name={name} mediaOptions={mediaOptions} />
    </div>
  );
}
