import path from "path";
import { config as loadEnv } from "dotenv";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/generated/prisma/client";

const root = process.cwd();
loadEnv({ path: path.join(root, ".env"), override: true });
loadEnv({ path: path.join(root, ".env.local"), override: true });

const connectionString = process.env.DATABASE_URL;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrisma() {
  if (!connectionString) {
    throw new Error("DATABASE_URL tanımlı değil (.env içinde file:./prisma/dev.db veya Turso libsql URL kullanın).");
  }
  const local =
    connectionString.startsWith("file:") || connectionString.startsWith(":memory:");
  const remote =
    connectionString.startsWith("libsql://") || connectionString.startsWith("https://");
  if (!local && !remote) {
    throw new Error(
      'DATABASE_URL "file:", ":memory:", "libsql://" veya "https://" (Turso / libSQL) ile başlamalı.',
    );
  }

  const authToken = process.env.LIBSQL_AUTH_TOKEN;
  const adapter = new PrismaLibSql(
    authToken ? { url: connectionString, authToken } : { url: connectionString },
  );
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
