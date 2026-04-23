import type { Metadata } from "next";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Hakkımızda",
};

export default async function AboutPage() {
  const lead = await prisma.siteSetting.findUnique({ where: { key: "about_lead" } });
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-semibold text-primary">Hakkımızda</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        {lead?.value ??
          "yenidoğan.net, bebek isimlerini anlam, köken ve kategori bazında keşfetmeniz için tasarlanmış bir içerik platformudur."}
      </p>
      <p className="mt-4 text-muted">
        Amacımız; anne-baba adaylarına sade, mobil uyumlu ve güven veren bir arayüzle doğru bilgiyi sunmak, isim seçimini
        destekleyen rehber yazılarıyla süreci kolaylaştırmaktır.
      </p>
    </div>
  );
}
