import Link from "next/link";
import { site } from "@/lib/site";

const discover = [
  { href: "/kiz-isimleri", label: "Kız İsimleri" },
  { href: "/erkek-isimleri", label: "Erkek İsimleri" },
  { href: "/kuranda-gecen-isimler", label: "Kur'an'da Geçen İsimler" },
  { href: "/populer-isimler", label: "Popüler İsimler" },
  { href: "/modern-isimler", label: "Modern İsimler" },
  { href: "/nadir-isimler", label: "Nadir İsimler" },
  { href: "/kisa-isimler", label: "Kısa İsimler" },
  { href: "/anlami-guzel-isimler", label: "Anlamı Güzel İsimler" },
  { href: "/isim-bulucu", label: "İsim Bulucu" },
];

const guide = [
  { href: "/isim-rehberi", label: "İsim Rehberi" },
  { href: "/sss", label: "Sık Sorulan Sorular" },
];

const about = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
  { href: "/kullanim-sartlari", label: "Kullanım Şartları" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#1a1430] text-zinc-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold text-white">{site.name}</p>
          <p className="mt-2 text-sm text-zinc-400">{site.tagline}</p>
          <p className="mt-3 text-sm text-zinc-400">{site.description}</p>
        </div>
        <div className="hidden sm:block">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Keşfet</p>
          <ul className="mt-3 space-y-2 text-sm">
            {discover.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Rehber</p>
          <ul className="mt-3 space-y-2 text-sm">
            {guide.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Kurumsal</p>
          <ul className="mt-3 space-y-2 text-sm">
            {about.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Tüm hakları saklıdır.</span>
        </div>
      </div>
    </footer>
  );
}
