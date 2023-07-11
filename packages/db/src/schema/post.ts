import { relations } from "drizzle-orm";
import { json, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

import { comment } from "./comment";
import { community } from "./community";
import { user } from "./user";
import { vote } from "./vote";

export const post = mysqlTable("post", {
  id: varchar("id", { length: 256 }).primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  creatorId: varchar("creator_id", { length: 256 }).notNull(),
  communityName: varchar("community_name", { length: 256 }).notNull(),
  content: json("content").notNull().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 }).notNull(),
  createdAt: timestamp("created_at", { fsp: 3 }).notNull(),
});

export const postRelations = relations(post, ({ one, many }) => ({
  community: one(community, {
    fields: [post.communityName],
    references: [community.name],
  }),
  votes: many(vote),
  creator: one(user, {
    fields: [post.creatorId],
    references: [user.id],
  }),
  comments: many(comment),
}));
