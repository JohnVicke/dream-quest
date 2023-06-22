import { connect } from "@planetscale/database";
import { Logger } from "drizzle-orm";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as schema from "./schema";

export const createDatabase = (config: {
  host: string;
  username: string;
  password: string;
}) =>
  drizzle(
    connect({
      ...config,
      fetch: (url: string, init: any) => {
        (init as any)["cache"] = undefined;
        return fetch(url, init);
      },
    }),
    {
      logger: process.env.NODE_ENV === "dev" ? new DatabaseLogger() : undefined,
      schema,
    },
  );

export const db = createDatabase({
  host: process.env.DATABASE_HOST!,
  password: process.env.DATABASE_PASSWORD!,
  username: process.env.DATABASE_USERNAME!,
});

class DatabaseLogger implements Logger {
  logQuery(query: string, params: unknown[]) {
    console.log({ query, params });
  }
}
