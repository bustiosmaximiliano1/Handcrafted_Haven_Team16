import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",

    // Hi team, I'm Analina. This tells Prisma how to execute my seed script.
    seed: "npx tsx scripts/seed.ts",
  },
  datasource: {
    url: process.env["POSTGRES_URL"],
  },
});