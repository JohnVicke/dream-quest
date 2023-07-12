import { nanoid } from "nanoid";
import { z } from "zod";

import { and, db, eq, schema } from "@dq/db";

import { Timestamp } from "~/utils/timestamp";
import { protectedProcedure, t } from "../trpc";

export const voteRouter = t.router({
  update: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        value: z.enum(["up", "down"]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const result = await db
        .select()
        .from(schema.vote)
        .innerJoin(
          schema.votesToPosts,
          eq(schema.votesToPosts.voteId, schema.vote.id),
        )
        .where(
          and(
            eq(schema.vote.creatorId, ctx.user.id),
            eq(schema.votesToPosts.postId, input.postId),
          ),
        );

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
          await trx.insert(schema.votesToPosts).values({
            postId: input.postId,
            voteId,
          });
        });
        return true;
      }

      if (input.value === vote.value) {
        console.log(vote.id);
        await db.transaction(async (trx) => {
          await trx.delete(schema.vote).where(eq(schema.vote.id, vote.id));
          await trx
            .delete(schema.votesToPosts)
            .where(eq(schema.votesToPosts.voteId, vote.id));
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
