import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { db, eq, schema } from "@dq/db";

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
      const post = await db.insert(schema.post).values({
        title: input.title,
        content: JSON.stringify(input.content ?? { hello: "world" }),
        communityName: input.communityName,
        creatorId: ctx.user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return { title: input.title, id: post.insertId };
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const post = await db.query.post.findFirst({
        where: eq(schema.post.id, input.id),
      });
      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }

      if (post.creatorId !== ctx.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to delete this post",
        });
      }

      await db.delete(schema.post).where(eq(schema.post.id, input.id));

      return true;
    }),
});
