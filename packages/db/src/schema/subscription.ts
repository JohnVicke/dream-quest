import { relations } from "drizzle-orm";
import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

import { user } from "./user";

export const subscription = mysqlTable("subscription", {
  id: varchar("id", { length: 256 }).primaryKey(),
  userId: varchar("userId", { length: 256 }).notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 }).notNull(),
  createdAt: timestamp("created_at", { fsp: 3 }).notNull(),
});

export const subscriptionRelations = relations(subscription, ({ one }) => ({
  user: one(user, {
    fields: [subscription.userId],
    references: [user.id],
  }),
}));
