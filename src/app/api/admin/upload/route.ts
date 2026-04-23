import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const fd = await req.formData();
  const file = fd.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "Dosya gerekli" }, { status: 400 });
  }

  const max = 6 * 1024 * 1024;
  if (file.size > max) {
    return Response.json({ error: "Dosya çok büyük (max 6MB)" }, { status: 400 });
  }

  const original = file.name.replace(/[^\w.\-]/g, "_");
  const ext = path.extname(original) || ".bin";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  const url = `/uploads/${filename}`;
  const asset = await prisma.mediaAsset.create({
    data: { url, alt: original },
  });

  return Response.json(asset);
}
