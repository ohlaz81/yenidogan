import path from "path";
import { config as loadEnv } from "dotenv";
import { PrismaClient } from "@/generated/prisma/client";
import { createPrismaPgForDatabaseUrl } from "./prisma-pg-adapter";

const root = process.cwd();
loadEnv({ path: path.join(root, ".env"), override: true });
loadEnv({ path: path.join(root, ".env.local"), override: true });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrisma() {
  return new PrismaClient({ adapter: createPrismaPgForDatabaseUrl() });
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
