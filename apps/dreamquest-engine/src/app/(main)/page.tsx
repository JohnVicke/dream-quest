import { db, desc, schema, sql } from "@dq/db";

import { CreatePostTrigger } from "~/modules/posts/create-post-trigger";
import { PostCardBasic } from "~/modules/posts/post-card-basic";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function LandingPage() {
  const posts = await db.query.post.findMany({
    with: {
      community: true,
    },
    orderBy: desc(schema.post.createdAt),
  });

  return (
    <>
      <CreatePostTrigger />
      <div className="py-4" />
      <div className="flex flex-col gap-y-2">
        {posts.map((post) => (
          <PostCardBasic
            key={post.id}
            post={post}
            communityAvatarUrl={post.community?.avatarUrl}
          />
        ))}
      </div>
    </>
  );
}
