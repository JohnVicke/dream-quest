import { relations } from "drizzle-orm";
import { datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { community } from "./community";
import { post } from "./post";
import { subscription } from "./subscription";

export const user = mysqlTable("user", {
  id: varchar("id", { length: 256 }).primaryKey(),
  username: varchar("username", { length: 256 }),
  profileImageUrl: varchar("profile_image_url", { length: 256 }),
  createdAt: datetime("created_at", { fsp: 3 }).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  posts: many(post),
  communities: many(community),
  subscriptions: many(subscription),
}));
