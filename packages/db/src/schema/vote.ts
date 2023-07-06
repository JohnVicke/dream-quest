import { relations } from "drizzle-orm";
import {
  datetime,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

import { post } from "./post";
import { user } from "./user";

export const vote = mysqlTable(
  "vote",
  {
    postId: int("post_id"),
    creatorId: varchar("creator_id", { length: 256 }).notNull(),
    value: mysqlEnum("value", ["up", "down"]).notNull(),
    updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
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
