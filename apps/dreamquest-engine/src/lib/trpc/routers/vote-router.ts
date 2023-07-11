import { z } from "zod";

import { and, db, eq, schema } from "@dq/db";

import { Timestamp } from "~/utils/timestamp";
import { protectedProcedure, t } from "../trpc";

const voteInputSchema = z.object({
  postId: z.number(),
  value: z.enum(["up", "down"]),
});

export const voteRouter = t.router({
  update: protectedProcedure
    .input(voteInputSchema)
    .mutation(async ({ input, ctx }) => {
      const vote = await db.query.vote.findFirst({
        where: and(
          eq(schema.vote.postId, input.postId),
          eq(schema.vote.creatorId, ctx.user.id),
        ),
      });

      if (!vote) {
        await db.insert(schema.vote).values({
          creatorId: ctx.user.id,
          postId: input.postId,
          value: input.value,
          updatedAt: new Timestamp(),
          createdAt: new Timestamp(),
        });
        return true;
      }

      if (input.value === vote.value) {
        await db
          .delete(schema.vote)
          .where(
            and(
              eq(schema.vote.creatorId, ctx.user.id),
              eq(schema.vote.postId, input.postId),
            ),
          );
        return true;
      }

      await db
        .update(schema.vote)
        .set({ value: input.value })
        .where(
          and(
            eq(schema.vote.postId, input.postId),
            eq(schema.vote.creatorId, ctx.user.id),
          ),
        );

      return true;
    }),
});
