import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, db, eq, schema } from "@dq/db";

import { protectedProcedure, t } from "../trpc";

const voteInputSchema = z.object({
  communityId: z.number(),
});

export const subscriptionRouter = t.router({
  subscribe: protectedProcedure
    .input(voteInputSchema)
    .mutation(async ({ input, ctx }) => {
      const subscription = await db.query.subscription.findFirst({
        where: and(
          eq(schema.subscription.communityId, input.communityId),
          eq(schema.subscription.userId, ctx.user.id),
        ),
      });

      if (subscription) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You are already subscribed to this community",
        });
      }

      await db.insert(schema.subscription).values({
        communityId: input.communityId,
        userId: ctx.user.id,
        updatedAt: new Date(),
        createdAt: new Date(),
      });

      return true;
    }),
  unsubscribe: protectedProcedure
    .input(voteInputSchema)
    .mutation(async ({ input, ctx }) => {
      await db
        .delete(schema.subscription)
        .where(
          and(
            eq(schema.subscription.communityId, input.communityId),
            eq(schema.subscription.userId, ctx.user.id),
          ),
        );
      return true;
    }),
});
