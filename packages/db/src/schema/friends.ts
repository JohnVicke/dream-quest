import {
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const friends = mysqlTable("friends", {
  id: serial("id").primaryKey(),
  status: mysqlEnum("status", ["pending", "accepted", "rejected"]),
  senderId: varchar("sender_id", { length: 40 }).notNull(),
  receiverId: varchar("receiver_id", { length: 40 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
