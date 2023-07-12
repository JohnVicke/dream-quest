import { relations } from "drizzle-orm";
import { json, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

import { post } from "./post";
import { user } from "./user";

export const comment = mysqlTable("comment", {
  id: varchar("id", { length: 256 }).primaryKey(),
  postId: varchar("post_id", { length: 256 }).notNull(),
  creatorId: varchar("creator_id", { length: 256 }).notNull(),
  content: json("content").notNull(),
  replyToId: varchar("reply_to_id", { length: 256 }),
  updatedAt: timestamp("updated_at", { fsp: 3 }).notNull(),
  createdAt: timestamp("created_at", { fsp: 3 }).notNull(),
});

export const commentRelations = relations(comment, ({ one }) => ({
  posts: one(post, {
    fields: [comment.postId],
    references: [post.id],
  }),
  creator: one(user, {
    fields: [comment.creatorId],
    references: [user.id],
  }),
  replyTo: one(comment, {
    fields: [comment.replyToId],
    references: [comment.creatorId],
  }),
}));
