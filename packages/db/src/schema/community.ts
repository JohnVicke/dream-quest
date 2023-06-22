import {
  datetime,
  mysqlEnum,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";

export const community = mysqlTable("community", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  normalizedName: varchar("normalized_name", { length: 256 }).notNull(),
  type: mysqlEnum("type", ["public", "private", "restricted"]).notNull(),
  createdAt: datetime("created_at", { fsp: 3 }).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
});
