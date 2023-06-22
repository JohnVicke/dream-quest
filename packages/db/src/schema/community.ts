import {
  datetime,
  mysqlEnum,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";

export const community = mysqlTable("community", {
  id: serial("id").primaryKey(),
  creatorId: varchar("creator_id", { length: 256 }).notNull(),
  avatarUrl: varchar("avatar_url", { length: 256 }),
  name: varchar("name", { length: 256 }).notNull(),
  normalizedName: varchar("normalized_name", { length: 256 }).notNull(),
  type: mysqlEnum("type", ["public", "private", "restricted"]).notNull(),
  createdAt: datetime("created_at", { fsp: 3 }).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
});
