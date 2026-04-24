import type { MediaAsset } from "@/types/database";

/** Tüm isimler için tekil varsayılan görsel (public’te değiştirilir). */
export const DEFAULT_NAME_MEDIA: MediaAsset = {
  id: "static-default",
  url: "/media/default-name.jpg",
  alt: "Bebek ismi örnek görseli",
  createdAt: "2020-01-01T00:00:00.000Z",
};
