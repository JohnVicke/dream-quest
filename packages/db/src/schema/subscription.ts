import { relations } from "drizzle-orm";
import {
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { community } from "./community";
import { user } from "./user";

export const subscription = mysqlTable(
  "subscription",
  {
    userId: varchar("userId", { length: 256 }).notNull(),
    communityId: varchar("community_id", { length: 256 }).notNull(),
    updatedAt: timestamp("updated_at", { fsp: 3 }).notNull(),
    createdAt: timestamp("created_at", { fsp: 3 }).notNull(),
  },
  (table) => ({
    pk: primaryKey(table.userId, table.communityId),
  }),
);

export const subscriptionRelations = relations(subscription, ({ one }) => ({
  community: one(community, {
    fields: [subscription.communityId],
    references: [community.id],
  }),
  user: one(user, {
    fields: [subscription.userId],
    references: [user.id],
  }),
}));
