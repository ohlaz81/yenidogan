import path from "path";
import { config as loadEnv } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Shell'de kalmış eski DATABASE_URL (ör. Postgres) yerine proje .env öncelikli olsun
loadEnv({ path: path.resolve(process.cwd(), ".env"), override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
