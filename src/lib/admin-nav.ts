/** Korumalı admin rotaları — `(protected)` grupları URL’de görünmez. */
export type AdminNavItem = { href: string; label: string; description?: string };

export type AdminNavGroup = { title: string; items: AdminNavItem[] };

export const adminNavGroups: AdminNavGroup[] = [
  {
    title: "Genel",
    items: [
      { href: "/admin", label: "Özet", description: "Sayılar ve kısa durum" },
      { href: "/admin/iletisim", label: "İletişim", description: "Gelen mesajlar" },
    ],
  },
  {
    title: "İçerik",
    items: [
      { href: "/admin/isimler", label: "İsimler", description: "Veritabanındaki isim kayıtları" },
      { href: "/admin/medya", label: "Medya", description: "Görsel yükleme ve varlıklar" },
      { href: "/admin/rehber", label: "İsim rehberi", description: "Rehber yazıları" },
      { href: "/admin/sss-faq", label: "SSS (FAQ)", description: "Sık sorulan sorular" },
    ],
  },
  {
    title: "Notlar",
    items: [
      {
        href: "/admin/anasayfa",
        label: "Ana sayfa (kod)",
        description: "Vitrin kodda; bu sayfa bilgilendirme",
      },
    ],
  },
];

export const adminNavFlat: AdminNavItem[] = adminNavGroups.flatMap((g) => g.items);
