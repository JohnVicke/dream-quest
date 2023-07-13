import { JSONContent } from "@tiptap/react";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";

import { db, eq, schema } from "@dq/db";

import { Timestamp } from "~/utils/timestamp";
import { protectedProcedure, t } from "../trpc";

const contentSchema: z.ZodSchema<JSONContent> = z.lazy(() =>
  z.record(z.any()).and(
    z.object({
      type: z.string().optional(),
      attrs: z.record(z.any()).optional(),
      content: z.array(contentSchema).optional(),
      marks: z
        .array(
          z.record(z.any()).and(
            z.object({
              type: z.string(),
              attrs: z.record(z.any()).optional(),
            }),
          ),
        )
        .optional(),
      text: z.string().optional(),
    }),
  ),
);

export const commentRouter = t.router({
  createPostComment: protectedProcedure
    .input(z.object({ postId: z.string(), content: contentSchema }))
    .mutation(async ({ input, ctx }) => {
      await db.insert(schema.comment).values({
        id: nanoid(),
        postId: input.postId,
        content: input.content,
        creatorId: ctx.user.id,
        createdAt: new Timestamp(),
        updatedAt: new Timestamp(),
      });
      return true;
    }),
  replyToComment: protectedProcedure
    .input(z.object({ commentId: z.string(), content: contentSchema }))
    .mutation(async ({ input, ctx }) => {
      const parent = await db.query.comment.findFirst({
        where: eq(schema.comment.id, input.commentId),
      });

      if (!parent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Comment not found",
        });
      }

      await db.insert(schema.comment).values({
        id: nanoid(),
        postId: parent.postId,
        parentId: parent.id,
        content: input.content,
        creatorId: ctx.user.id,
        createdAt: new Timestamp(),
        updatedAt: new Timestamp(),
      });

      return true;
    }),
});
