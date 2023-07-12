import { relations } from "drizzle-orm";
import { mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core";

import { post } from "./post";
import { vote } from "./vote";

export const votesToPosts = mysqlTable(
  "votes_to_posts",
  {
    voteId: varchar("vote_id", { length: 256 }),
    postId: varchar("post_id", { length: 256 }),
  },
  (table) => ({
    pk: primaryKey(table.voteId, table.postId),
  }),
);

export const votesToPostsRelation = relations(votesToPosts, ({ one }) => ({
  vote: one(vote, {
    fields: [votesToPosts.voteId],
    references: [vote.id],
  }),
  post: one(post, {
    fields: [votesToPosts.postId],
    references: [post.id],
  }),
}));
