import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getNameBySlug, getNamesByLetter } from "@/lib/queries/names";
import { genderLabels, styleLabels } from "@/lib/labels";
import { Breadcrumb } from "@/components/marketing/Breadcrumb";
import { FavoriteHeart } from "@/components/marketing/FavoriteHeart";
import { MediaImage } from "@/components/marketing/MediaImage";
import { NameCard } from "@/components/marketing/NameCard";
import { ShareButton } from "@/components/marketing/ShareButton";
import { Stars } from "@/components/marketing/Stars";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = await prisma.name.findFirst({ where: { slug, published: true } });
  if (!name) return { title: "İsim bulunamadı" };
  return {
    title: `${name.displayName} isminin anlamı`,
    description: `${name.displayName}: ${name.meaning} (${name.origin})`,
  };
}

export default async function NameDetailPage({ params }: Props) {
  const { slug } = await params;
  const name = await getNameBySlug(slug);
  if (!name) notFound();

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  const canonical = `${proto}://${host}/isim/${name.slug}`;

  const traits = Array.isArray(name.traits)
    ? (name.traits as unknown[]).filter((t): t is string => typeof t === "string")
    : [];

  const similar = name.similarFrom.map((s) => s.target);
  const sameLetter = await getNamesByLetter(name.firstLetter, name.gender, 8);
  const others = sameLetter.filter((n) => n.id !== name.id && !similar.some((s) => s.id === n.id)).slice(0, 6);

  const guides = await prisma.guideArticle.findMany({
    where: { published: true },
    take: 3,
    orderBy: { publishedAt: "desc" },
  });

  const genderPath = name.gender === "GIRL" ? "/kiz-isimleri" : name.gender === "BOY" ? "/erkek-isimleri" : "/tum-isimleri";
  const genderCrumb =
    name.gender === "GIRL" ? "Kız isimleri" : name.gender === "BOY" ? "Erkek isimleri" : "Tüm isimler";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb
        items={[
          { label: "Anasayfa", href: "/" },
          { label: genderCrumb, href: genderPath },
          { label: `${name.displayName} isminin anlamı` },
        ]}
      />

      <section className="mt-8 grid gap-8 overflow-hidden rounded-3xl border border-border bg-accent-pink-soft/25 p-6 lg:grid-cols-[1fr_220px] lg:items-center">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-4xl font-semibold text-accent-pink">{name.displayName}</h1>
            <FavoriteHeart slug={name.slug} />
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-accent-pink-soft px-3 py-1 text-accent-pink">{genderLabels[name.gender]}</span>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-violet-800">{styleLabels[name.style]}</span>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-800">{name.origin}</span>
          </div>
          {name.intro && <p className="text-sm leading-relaxed text-muted">{name.intro}</p>}
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2 text-xs font-semibold text-accent-pink">
              ♥ Favorilere ekle için kalbe dokunun
            </span>
            <ShareButton title={name.displayName} text={name.meaning} url={canonical} />
          </div>
        </div>
        <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-lg lg:mx-0 lg:h-56 lg:w-56">
          <MediaImage
            src={name.image?.url ?? "/media/placeholder.svg"}
            alt={name.image?.alt ?? name.displayName}
            fill
            className="object-cover"
            sizes="224px"
          />
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-pink-50 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">📖 Anlamı</p>
          <p className="mt-2 text-sm font-medium text-foreground">{name.meaning}</p>
        </div>
        <div className="rounded-2xl border border-border bg-violet-50 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">🌿 Kökeni</p>
          <p className="mt-2 text-sm font-medium text-foreground">{name.origin}</p>
        </div>
        <div className="rounded-2xl border border-border bg-amber-50 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">📒 Kur’an’da geçiyor mu?</p>
          <p className="mt-2 text-sm font-medium text-foreground">
            {name.inQuran ? "Evet" : "Hayır, geçmemektedir"}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-sky-50 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">🔤 Okunuşu</p>
          <p className="mt-2 text-sm font-medium text-foreground">{name.pronunciation}</p>
        </div>
        <div className="rounded-2xl border border-border bg-emerald-50 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">👥 Popülerlik</p>
          <div className="mt-2 text-sm font-medium text-foreground">
            <Stars value={name.popularity} />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-purple-50 p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">📅 Cinsiyeti</p>
          <p className="mt-2 text-sm font-medium text-foreground">{genderLabels[name.gender]}</p>
        </div>
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-xl font-semibold text-primary">{name.displayName} isminin özellikleri</h2>
          {traits.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {traits.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-accent-pink">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted">Özellik maddeleri yakında güncellenecek.</p>
          )}
        </section>
        <section className="space-y-6">
          {similar.length > 0 && (
            <div>
              <h2 className="font-display text-xl font-semibold text-primary">Benzer isimler</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {similar.map((s) => (
                  <Link
                    key={s.id}
                    href={`/isim/${s.slug}`}
                    className="rounded-full bg-accent-pink-soft px-3 py-1 text-sm font-semibold text-accent-pink hover:underline"
                  >
                    {s.displayName}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {others.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-primary">
            {name.firstLetter} harfi ile başlayan diğer {genderLabels[name.gender].toLowerCase()}leri
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((n) => (
              <NameCard key={n.id} name={n} />
            ))}
          </div>
        </section>
      )}

      {guides.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-primary">İlginizi çekebilir</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {guides.map((g) => (
              <li key={g.id}>
                <Link href={`/isim-rehberi/${g.slug}`} className="font-medium text-accent-pink hover:underline">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-border bg-accent-pink-soft/40 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-semibold text-primary">Bu isim hoşunuza gitti mi?</p>
          <p className="text-sm text-muted">Favorilerinize ekleyin veya diğer isimlere göz atın.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={genderPath}
            className="rounded-2xl border border-accent-pink px-5 py-2 text-sm font-semibold text-accent-pink"
          >
            Diğer isimler
          </Link>
          <Link
            href="/isim-bulucu"
            className="rounded-2xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
          >
            İsim bulucu →
          </Link>
        </div>
      </section>
    </div>
  );
}
