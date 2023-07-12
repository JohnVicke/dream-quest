import { relations } from "drizzle-orm";
import { mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core";

import { community } from "./community";
import { subscription } from "./subscription";

export const subscriptionsToCommunities = mysqlTable(
  "subscriptions_to_communities",
  {
    subscriptionId: varchar("subscription_id", { length: 256 }),
    communityId: varchar("community_id", { length: 256 }),
  },
  (table) => ({
    pk: primaryKey(table.communityId, table.subscriptionId),
  }),
);

export const subscriptionsToCommunitiesRelations = relations(
  subscriptionsToCommunities,
  ({ one }) => ({
    subscription: one(subscription, {
      fields: [subscriptionsToCommunities.subscriptionId],
      references: [subscription.id],
    }),
    community: one(community, {
      fields: [subscriptionsToCommunities.communityId],
      references: [community.id],
    }),
  }),
);
