import { alias } from "drizzle-orm/mysql-core";
import { nanoid } from "nanoid";
import { z } from "zod";

import { and, db, eq, schema } from "@dq/db";

import { Timestamp } from "~/utils/timestamp";
import { protectedProcedure, t } from "../trpc";

export const voteRouter = t.router({
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        type: z.enum(["post", "comment"]),
        value: z.enum(["up", "down"]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const postAlias = alias(schema.votesToPosts, "votesToPosts");
      const commentAlias = alias(schema.votesToComments, "votesToComments");
      const currentAlias = input.type === "post" ? postAlias : commentAlias;
      const currentIdAlias =
        input.type === "post" ? postAlias.postId : commentAlias.voteId;

      const result = await db
        .select()
        .from(schema.vote)
        .innerJoin(currentAlias, eq(currentAlias.voteId, schema.vote.id))
        .where(
          and(
            eq(schema.vote.creatorId, ctx.user.id),
            eq(currentIdAlias, input.id),
          ),
        );
      console.log(result);

      const vote = result?.[0]?.vote;

      if (!vote) {
        await db.transaction(async (trx) => {
          const voteId = nanoid();
          await trx.insert(schema.vote).values({
            id: voteId,
            creatorId: ctx.user.id,
            value: input.value,
            updatedAt: new Timestamp(),
            createdAt: new Timestamp(),
          });
          if (input.type === "post") {
            await trx.insert(schema.votesToPosts).values({
              postId: input.id,
              voteId,
            });
            return true;
          }
          await trx.insert(schema.votesToComments).values({
            voteId,
            commentId: input.id,
          });
        });
        return true;
      }

      if (input.value === vote.value) {
        console.log(vote.id);
        await db.transaction(async (trx) => {
          await trx.delete(schema.vote).where(eq(schema.vote.id, vote.id));
          if (input.type === "post") {
            await trx
              .delete(schema.votesToPosts)
              .where(eq(schema.votesToPosts.voteId, vote.id));
            return true;
          }
          await trx
            .delete(schema.votesToComments)
            .where(eq(schema.votesToComments.voteId, vote.id));
        });
        return true;
      }

      await db
        .update(schema.vote)
        .set({ value: input.value })
        .where(eq(schema.vote.id, vote.id));

      return true;
    }),
});
