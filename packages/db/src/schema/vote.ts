import { relations } from "drizzle-orm";
import {
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { user } from "./user";
import { votesToPosts } from "./votes-to-posts";

export const vote = mysqlTable("vote", {
  id: varchar("id", { length: 256 }).primaryKey(),
  creatorId: varchar("creator_id", { length: 256 }).notNull(),
  value: mysqlEnum("value", ["up", "down"]).notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 }).notNull(),
  createdAt: timestamp("created_at", { fsp: 3 }).notNull(),
});

export const voteRelations = relations(vote, ({ one, many }) => ({
  creator: one(user, {
    fields: [vote.creatorId],
    references: [user.id],
  }),
  votesToPost: many(votesToPosts),
}));
