import { auth } from "@clerk/nextjs";

import { db, eq, schema } from "@dq/db";

import { CreatePostForm } from "~/modules/posts/create-post-form";

export default async function SubmitPage() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const communities = await db.query.community.findMany({
    with: {
      subscriptions: {
        where: eq(schema.subscription.userId, userId),
      },
    },
  });

  return <CreatePostForm communities={communities} />;
}
