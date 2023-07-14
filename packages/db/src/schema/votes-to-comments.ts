import { relations } from "drizzle-orm";
import { mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core";

import { comment } from "./comment";
import { vote } from "./vote";

export const votesToComments = mysqlTable(
  "votes_to_comments",
  {
    voteId: varchar("vote_id", { length: 256 }),
    commentId: varchar("comment_id", { length: 256 }),
  },
  (table) => ({
    pk: primaryKey(table.voteId, table.commentId),
  }),
);

export const votesToCommentsRelations = relations(
  votesToComments,
  ({ one }) => ({
    vote: one(vote, {
      fields: [votesToComments.voteId],
      references: [vote.id],
    }),
    post: one(comment, {
      fields: [votesToComments.commentId],
      references: [comment.id],
    }),
  }),
);
