import { cache } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db, eq, schema } from "@dq/db";

import { PostDisplay } from "~/modules/posts/post-display";
import { RemovePostButton } from "~/modules/posts/remove-post-button";
import { ReactQueryProvider } from "~/providers/react-query-provider";

interface CommunityPostPageProps {
  params: {
    postId: string;
  };
}

const selectPost = cache(async (id: number) => {
  return db.query.post.findFirst({
    where: eq(schema.post.id, id),
    with: {
      votes: true,
      creator: true,
    },
  });
});

export async function generateMetadata(
  { params }: CommunityPostPageProps,
  _parent?: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.postId;
  const post = await selectPost(parseInt(id, 10));

  if (!post) {
    return notFound();
  }

  return {
    title: post.title,
  };
}

export default async function CommunityPostPage({
  params,
}: CommunityPostPageProps) {
  const { userId } = auth();
  const post = await selectPost(parseInt(params.postId, 10));

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <PostDisplay title={post.title} content={post.content as any} />
      {userId === post.creatorId && (
        <ReactQueryProvider>
          <RemovePostButton id={post.id} />
        </ReactQueryProvider>
      )}
    </div>
  );
}
