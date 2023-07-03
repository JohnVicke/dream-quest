import { z } from "zod";

import { db, schema } from "@dq/db";

import { protectedProcedure, t } from "../trpc";

const insertCommunitySchema = z.object({
  title: z.string().min(1).max(255),
  communityName: z.string(),
  content: z.any(),
});

export const postRouter = t.router({
  create: protectedProcedure
    .input(insertCommunitySchema)
    .mutation(async ({ input, ctx }) => {
      await db.insert(schema.post).values({
        title: input.title,
        content: JSON.stringify(input.content ?? { hello: "world" }),
        communityName: input.communityName,
        creatorId: ctx.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { title: input.title };
    }),
});
