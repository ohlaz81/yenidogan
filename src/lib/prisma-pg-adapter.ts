import { Pool, type PoolConfig } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * "self-signed certificate in certificate chain" (proxy/antivirüs) genelde
 * sadece lokalde olur. Vercel'de `VERCEL=1` vardır — TLS gevşetilmez.
 * Zorunlu sıkı mod (lokal dahil): DATABASE_SSL_STRICT=true
 */
function useRelaxedTlsForPgPool(): boolean {
  if (process.env.DATABASE_SSL_STRICT === "true") return false;
  if (process.env.VERCEL) return false;
  if (process.env.DATABASE_SSL_INSECURE === "true") return true;
  if (process.env.NODE_ENV === "development") return true;
  return false;
}

/**
 * Sadece DATABASE_URL (pool) — Next.js + seed ortak.
 */
export function createPrismaPgForDatabaseUrl(): PrismaPg {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL tanımlı değil. Supabase pool cümlesi .env içinde olmalı.",
    );
  }
  const config: PoolConfig = { connectionString };
  if (useRelaxedTlsForPgPool()) {
    config.ssl = { rejectUnauthorized: false };
  }
  return new PrismaPg(new Pool(config));
}
