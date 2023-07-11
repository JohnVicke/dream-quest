import { relations } from "drizzle-orm";
import {
  mysqlEnum,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { post } from "./post";
import { user } from "./user";

export const vote = mysqlTable(
  "vote",
  {
    postId: varchar("post_id", { length: 256 }).notNull(),
    creatorId: varchar("creator_id", { length: 256 }).notNull(),
    value: mysqlEnum("value", ["up", "down"]).notNull(),
    updatedAt: timestamp("updated_at", { fsp: 3 }).notNull(),
    createdAt: timestamp("created_at", { fsp: 3 }).notNull(),
  },
  (table) => ({
    pk: primaryKey(table.postId, table.creatorId),
  }),
);

export const voteRelations = relations(vote, ({ one }) => ({
  post: one(post, {
    fields: [vote.postId],
    references: [post.id],
  }),
  creator: one(user, {
    fields: [vote.creatorId],
    references: [user.id],
  }),
}));
