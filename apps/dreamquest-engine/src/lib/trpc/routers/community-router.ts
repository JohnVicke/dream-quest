import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";

import { db, eq, schema } from "@dq/db";

import { Timestamp } from "~/utils/timestamp";
import { protectedProcedure, t } from "../trpc";

const insertCommunitySchema = z.object({
  name: z.string().min(1).max(255),
  type: z.enum(["public", "private", "restricted"]),
});

export const communityRouter = t.router({
  create: protectedProcedure
    .input(insertCommunitySchema)
    .mutation(async ({ input, ctx }) => {
      const normalizedName = input.name.toLowerCase().trim();

      const community = await db.query.community.findFirst({
        where: eq(schema.community.normalizedName, normalizedName),
      });

      if (community) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Community already exists",
        });
      }

      await db.transaction(async (trx) => {
        const insertedCommunity = await trx.insert(schema.community).values({
          id: nanoid(),
          normalizedName,
          name: input.name,
          type: input.type,
          creatorId: ctx.user.id,
          createdAt: new Timestamp(),
          updatedAt: new Timestamp(),
        });
        await trx.insert(schema.subscription).values({
          userId: ctx.user.id,
          communityId: insertedCommunity.insertId,
          createdAt: new Timestamp(),
          updatedAt: new Timestamp(),
        });
      });

      return { name: input.name };
    }),
});
