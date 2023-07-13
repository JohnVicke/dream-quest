import { Suspense } from "react";

import { db, desc, schema } from "@dq/db";

import { CreatePostTrigger } from "~/modules/posts/create-post-trigger";
import { PostCardBasic } from "~/modules/posts/post-card-basic";

export default async function LandingPage() {
  const posts = await db.query.post.findMany({
    with: {
      creator: true,
      community: true,
    },
    orderBy: desc(schema.post.createdAt),
    limit: 10,
  });

  return (
    <>
      <Suspense>
        <CreatePostTrigger />
      </Suspense>
      <div className="py-4" />
      <div className="flex flex-col gap-y-2">
        <Suspense>
          {posts.map((post) => (
            <PostCardBasic
              key={post.id}
              post={post}
              communityAvatarUrl={post.community?.avatarUrl}
            />
          ))}
        </Suspense>
      </div>
    </>
  );
}
