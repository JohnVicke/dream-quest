import { cache } from "react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { and, db, eq, schema, sql } from "@dq/db";

import { getTimeSincePosted } from "~/utils/get-time-since-posted";
import { PostDisplay } from "~/modules/posts/post-display";
import { RemovePostButton } from "~/modules/posts/remove-post-button";
import { ShareButton } from "~/modules/posts/share-button";
import { VoteControls } from "~/modules/posts/vote-controls";
import { ReactQueryProvider } from "~/providers/react-query-provider";

interface CommunityPostPageProps {
  params: {
    postId: string;
  };
}

const selectPost = cache(async (id: string) => {
  return db.query.post.findFirst({
    where: eq(schema.post.id, id),
    with: {
      creator: true,
      community: true,
    },
  });
});

export async function generateMetadata(
  { params }: CommunityPostPageProps,
  _parent?: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.postId;
  const post = await selectPost(id);

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
  const post = await selectPost(params.postId);

  if (!post) {
    return notFound();
  }

  const sessionVote = userId
    ? await db.query.vote.findFirst({
        where: and(
          eq(schema.vote.postId, post.id),
          eq(schema.vote.creatorId, userId),
        ),
      })
    : null;

  const votes = await db
    .select({
      votes: sql<number>`sum(case 
                             when ${schema.vote.value} = 'up' then 1
                             when ${schema.vote.value} = 'down' then -1
                         else 0 end)`,
    })
    .from(schema.vote)
    .where(eq(schema.vote.postId, post.id));

  return (
    <div>
      <div className="flex justify-between rounded-md border p-4">
        <div>
          <div className="flex items-center gap-x-2">
            {post.community?.avatarUrl && (
              <Image
                className="rounded-full"
                src={post.community.avatarUrl}
                alt="Avatar"
                width={50}
                height={50}
              />
            )}
            <h4 className="text-sm font-semibold text-muted-foreground">
              c/{post.community?.name} •{" "}
              <time>{getTimeSincePosted(post.createdAt)}</time>
            </h4>
          </div>
          <p className="flex items-center text-xs">
            Posted by {post.creator?.username}
          </p>
        </div>
        {userId === post.creatorId && (
          <ReactQueryProvider>
            <RemovePostButton id={post.id} />
          </ReactQueryProvider>
        )}
      </div>
      <div className="my-4" />
      <div className="rounded-md bg-muted p-4">
        <PostDisplay title={post.title} content={post.content as any} />
        <div className="flex items-center gap-x-4">
          <VoteControls
            direction="row"
            initialVotes={votes[0].votes ?? 0}
            postId={post.id}
            isAuthed={!!userId}
            initialVote={sessionVote}
          />
          <ShareButton />
        </div>
      </div>
    </div>
  );
}
