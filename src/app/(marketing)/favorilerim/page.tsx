import type { Metadata } from "next";
import { FavoritesClient } from "@/components/marketing/FavoritesClient";

export const metadata: Metadata = {
  title: "Favorilerim",
};

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-semibold text-primary">Favorilerim</h1>
      <p className="mt-2 text-muted">Kalp ikonuna tıkladığınız isimler cihazınızda saklanır (hesap gerektirmez).</p>
      <FavoritesClient />
    </div>
  );
}
