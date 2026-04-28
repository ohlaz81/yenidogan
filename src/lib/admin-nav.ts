/** Korumalı admin rotaları — `(protected)` grupları URL’de görünmez. */
import { ADMIN_PERMISSIONS, type AdminPermissionKey } from "@/lib/admin-permissions";

export type AdminNavItem = {
  href: string;
  label: string;
  description?: string;
  /** null = giriş yeterli (ör. özet, bilgilendirme sayfaları) */
  permission: AdminPermissionKey | null;
};

export type AdminNavGroup = { title: string; items: AdminNavItem[] };

export const adminNavGroups: AdminNavGroup[] = [
  {
    title: "Genel",
    items: [
      { href: "/admin", label: "Özet", description: "Sayılar ve kısa durum", permission: null },
      {
        href: "/admin/iletisim",
        label: "İletişim",
        description: "Gelen mesajlar",
        permission: ADMIN_PERMISSIONS.contact,
      },
    ],
  },
  {
    title: "İçerik",
    items: [
      {
        href: "/admin/isimler",
        label: "İsimler",
        description: "Veritabanındaki isim kayıtları",
        permission: ADMIN_PERMISSIONS.names,
      },
      {
        href: "/admin/medya",
        label: "Medya",
        description: "Görsel yükleme ve varlıklar",
        permission: ADMIN_PERMISSIONS.content,
      },
      {
        href: "/admin/rehber",
        label: "İsim rehberi",
        description: "Rehber yazıları",
        permission: ADMIN_PERMISSIONS.content,
      },
      {
        href: "/admin/sss-faq",
        label: "SSS (FAQ)",
        description: "Sık sorulan sorular",
        permission: ADMIN_PERMISSIONS.content,
      },
    ],
  },
  {
    title: "Ana sayfa",
    items: [
      {
        href: "/admin/anasayfa",
        label: "Türkiye popüler şeridi",
        description:
          "Ana sayfadaki «Türkiye'de En Popüler İsimler» kayan alanı — kız ve erkek slotlarından seçim",
        permission: ADMIN_PERMISSIONS.homeFeatured,
      },
    ],
  },
];

export const adminNavFlat: AdminNavItem[] = adminNavGroups.flatMap((g) => g.items);

/** Menüde yalnızca kullanıcının izinleriyle uyumlu öğeleri bırakır; boş grupları siler. */
export function filterNavGroupsByPermissions(
  groups: readonly AdminNavGroup[],
  perms: ReadonlySet<string>,
): AdminNavGroup[] {
  return groups
    .map((g) => ({
      ...g,
      items: g.items.filter((item) => item.permission === null || perms.has(item.permission)),
    }))
    .filter((g) => g.items.length > 0);
}
