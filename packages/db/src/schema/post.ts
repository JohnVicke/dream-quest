import { relations } from "drizzle-orm";
import {
  datetime,
  json,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";

import { community } from "./community";
import { vote } from "./vote";

export const post = mysqlTable("post", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  creatorId: varchar("creator_id", { length: 256 }).notNull(),
  communityName: varchar("community_name", { length: 256 }),
  content: json("content").notNull(),
  createdAt: datetime("created_at", { fsp: 3 }).notNull(),
  updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
});

export const postRelations = relations(post, ({ one, many }) => ({
  community: one(community, {
    fields: [post.communityName],
    references: [community.name],
  }),
  votes: many(vote),
}));
