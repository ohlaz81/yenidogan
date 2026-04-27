import Link from "next/link";
import { requireAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminUnauthorizedPage() {
  await requireAdminSession();

  return (
    <div className="mx-auto max-w-md space-y-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-6 text-center shadow-sm">
      <h1 className="font-display text-xl font-semibold text-zinc-900">Yetki gerekli</h1>
      <p className="text-sm text-zinc-700">
        Bu bölüm veya işlem için hesabınıza tanımlı izin yok. Yöneticinizden ilgili panel yetkisini talep edebilirsiniz.
      </p>
      <Link
        href="/admin"
        className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        Özete dön
      </Link>
    </div>
  );
}
