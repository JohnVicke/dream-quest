import { relations } from "drizzle-orm";
import {
  datetime,
  int,
  mysqlEnum,
  mysqlTable,
  serial,
} from "drizzle-orm/mysql-core";

import { post } from "./post";

export const vote = mysqlTable("vote", {
  id: serial("id").primaryKey(),
  postId: int("post_id"),
  value: mysqlEnum("value", ["up", "down"]).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
});

export const voteRelations = relations(vote, ({ one }) => ({
  post: one(post, {
    fields: [vote.postId],
    references: [post.id],
  }),
}));
