import { notFound } from "next/navigation";
import { getNameBySlug } from "@/lib/queries/names";
import { NAME_OG_IMAGE_SIZE } from "@/lib/name-og-image-config";
import { renderNameOgImage } from "@/lib/name-og-image";

type Props = { params: Promise<{ slug: string }> };

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const alt = "Yenidoğan.net isim anlamı kartı";
export const size = NAME_OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const name = await getNameBySlug(slug);
  if (!name) notFound();

  return renderNameOgImage(name);
}

