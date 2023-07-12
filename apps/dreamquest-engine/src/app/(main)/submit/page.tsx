import { auth } from "@clerk/nextjs";

import { db, eq, schema } from "@dq/db";

import { CreatePostForm } from "~/modules/posts/create-post-form";

export default async function SubmitPage() {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const communities = await db
    .select()
    .from(schema.community)
    .innerJoin(
      schema.subscriptionsToCommunities,
      eq(schema.subscriptionsToCommunities.communityId, schema.community.id),
    )
    .innerJoin(
      schema.subscription,
      eq(
        schema.subscription.id,
        schema.subscriptionsToCommunities.subscriptionId,
      ),
    )
    .where(eq(schema.subscription.userId, userId));

  const test = communities.map((community) => community.community);

  return <CreatePostForm communities={test} />;
}
