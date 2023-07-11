import { relations } from "drizzle-orm";
import {
  datetime,
  int,
  json,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { post } from "./post";
import { user } from "./user";

export const comment = mysqlTable(
  "comment",
  {
    postId: int("post_id").notNull(),
    creatorId: varchar("creator_id", { length: 256 }).notNull(),
    content: json("content").notNull(),
    updatedAt: timestamp("updated_at", { fsp: 3 }).notNull(),
    createdAt: timestamp("created_at", { fsp: 3 }).notNull(),
  },
  (table) => ({
    pk: primaryKey(table.creatorId, table.postId),
  }),
);

export const commentRelations = relations(comment, ({ one }) => ({
  posts: one(post, {
    fields: [comment.postId],
    references: [post.id],
  }),
  creator: one(user, {
    fields: [comment.creatorId],
    references: [user.id],
  }),
}));
