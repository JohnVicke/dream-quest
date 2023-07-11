import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, db, eq, schema } from "@dq/db";

import { Timestamp } from "~/utils/timestamp";
import { protectedProcedure, t } from "../trpc";

export const subscriptionRouter = t.router({
  subscribe: protectedProcedure
    .input(z.object({ communityId: z.number() }))
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
        updatedAt: new Timestamp(),
        createdAt: new Timestamp(),
      });

      return true;
    }),
  unsubscribe: protectedProcedure
    .input(z.object({ communityId: z.number() }))
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
