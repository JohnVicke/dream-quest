import clerkClient from "@clerk/clerk-sdk-node";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { db, eq, schema } from "@dq/db";

import { Timestamp } from "~/utils/timestamp";
import { protectedProcedure, t } from "../trpc";

export const userRouter = t.router({
  putUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const exists = await db.query.user.findFirst({
        where: eq(schema.user.username, input.username),
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already exists!",
        });
      }

      await db
        .update(schema.user)
        .set({
          username: input.username,
          updatedAt: new Timestamp(),
        })
        .where(eq(schema.user.id, ctx.user.id));

      await clerkClient.users.updateUser(ctx.user.id, {
        username: input.username,
      });

      return true;
    }),
});
