import { revalidatePath } from "next/cache";

/** İsim listesi kullanan ön yüz rotaları (kaydet/sil sonrası önbellek). */
export const MARKETING_NAME_LIST_PATHS = [
  "/",
  "/kiz-isimleri",
  "/erkek-isimleri",
  "/tum-isimler",
  "/populer-isimler",
  "/modern-isimler",
  "/nadir-isimler",
  "/kisa-isimler",
  "/kuranda-gecen-isimler",
  "/anlami-guzel-isimler",
] as const;

export function revalidatePublicNamePages(opts?: { slug?: string; previousSlug?: string }) {
  for (const p of MARKETING_NAME_LIST_PATHS) {
    revalidatePath(p);
  }
  if (opts?.slug) revalidatePath(`/isim/${opts.slug}`);
  if (opts?.previousSlug && opts.previousSlug !== opts.slug) {
    revalidatePath(`/isim/${opts.previousSlug}`);
  }
}
