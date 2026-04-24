import { Pool, type PoolConfig } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Sadece DATABASE_URL (pool) — Next.js + seed ortak.
 * "self-signed certificate in certificate chain" (kurumsal ağ / antivirüs) için
 * lokalde .env: DATABASE_SSL_INSECURE=true
 * Vercel üretim: bu değişkeni EKLEMEYİN; güvenli TLS kullanılır.
 */
export function createPrismaPgForDatabaseUrl(): PrismaPg {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL tanımlı değil. Supabase pool cümlesi .env içinde olmalı.",
    );
  }
  const config: PoolConfig = { connectionString };
  if (process.env.DATABASE_SSL_INSECURE === "true") {
    config.ssl = { rejectUnauthorized: false };
  }
  return new PrismaPg(new Pool(config));
}
