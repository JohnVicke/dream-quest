import type { Config } from "drizzle-kit";

import { clean } from "./src/goodies/clean-db";

export default {
  schema: "./src/schema/index.ts",
  out: "./migrations",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL!,
  },
} satisfies Config;

clean();
