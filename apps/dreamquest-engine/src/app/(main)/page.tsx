import { db, desc, eq, schema } from "@dq/db";

import { CreatePostTrigger } from "~/modules/posts/create-post-trigger";
import { PostCardBasic } from "~/modules/posts/post-card-basic";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function LandingPage() {
  const posts = await db
    .select({
      id: schema.post.id,
      title: schema.post.title,
      content: schema.post.content,
      createdAt: schema.post.createdAt,
      updatedAt: schema.post.updatedAt,
      creatorId: schema.post.creatorId,
      communityAvatarUrl: schema.community.avatarUrl,
      communityName: schema.community.name,
    })
    .from(schema.post)
    .innerJoin(
      schema.community,
      eq(schema.post.communityName, schema.community.name),
    )
    .orderBy(desc(schema.post.createdAt));

  return (
    <div className="h-screen">
      <CreatePostTrigger />
      <div className="py-4" />
      <div className="flex flex-col gap-y-2">
        {posts.map((post) => (
          <PostCardBasic key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
