import { relations } from "drizzle-orm";
import {
  datetime,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

import { community } from "./community";

export const subscription = mysqlTable(
  "subscription",
  {
    userId: varchar("userId", { length: 256 }).notNull(),
    communityId: int("community_id"),
    createdAt: datetime("created_at", { fsp: 3 }).notNull(),
    updatedAt: datetime("updated_at", { fsp: 3 }).notNull(),
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
}));
