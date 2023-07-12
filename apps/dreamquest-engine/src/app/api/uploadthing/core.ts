import { getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";

import { db, eq, schema } from "@dq/db";

const f = createUploadthing();

export const fileRouter = {
  communityAvatar: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ communityId: z.string() }))
    .middleware(async ({ req, input: { communityId } }) => {
      const { userId } = getAuth(req);
      if (!userId) throw new Error("Unauthorized");
      return { userId, communityId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db
        .update(schema.community)
        .set({ avatarUrl: file.url })
        .where(eq(schema.community.id, metadata.communityId));
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof fileRouter;
