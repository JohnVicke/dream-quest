import { relations } from "drizzle-orm";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

import { community } from "./community";
import { post } from "./post";
import { subscription } from "./subscription";

export const user = mysqlTable("user", {
  id: varchar("id", { length: 256 }).notNull(),
  username: varchar("username", { length: 256 }).notNull(),
  profileImageUrl: varchar("profile_image_url", { length: 256 }),
});

export const userRelations = relations(user, ({ many }) => ({
  posts: many(post),
  communities: many(community),
  subscriptions: many(subscription),
}));
