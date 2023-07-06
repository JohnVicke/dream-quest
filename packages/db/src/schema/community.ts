import { relations } from "drizzle-orm";
import {
  datetime,
  mysqlEnum,
  mysqlTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

import { post } from "./post";
import { subscription } from "./subscription";
import { user } from "./user";

export const community = mysqlTable(
  "community",
  {
    id: serial("id").primaryKey(),
    creatorId: varchar("creator_id", { length: 256 }).notNull(),
    avatarUrl: varchar("avatar_url", { length: 256 }),
    name: varchar("name", { length: 256 }).notNull(),
    normalizedName: varchar("normalized_name", { length: 256 }).notNull(),
    type: mysqlEnum("type", ["public", "private", "restricted"]).notNull(),
    createdAt: datetime("created_at", { fsp: 3 }).notNull(),
    updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
  },
  (table) => ({
    nameIdx: uniqueIndex("name_idx").on(table.name),
  }),
);

export const communityRelations = relations(community, ({ many, one }) => ({
  posts: many(post),
  subscriptions: many(subscription),
  creator: one(user, {
    fields: [community.creatorId],
    references: [user.id],
  }),
}));
