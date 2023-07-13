import { cache, Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs";
import type { JSONContent } from "@tiptap/react";
import { Share } from "lucide-react";

import { db, eq, schema } from "@dq/db";
import { Button } from "@dq/ui/button";

import { getTimeSincePosted } from "~/utils/get-time-since-posted";
import { CommentSection } from "~/modules/posts/comments/comment-section";
import { PostDisplay } from "~/modules/posts/post-display";
import { RemovePostButton } from "~/modules/posts/remove-post-button";
import { ShareButton } from "~/modules/posts/share-button";
import { VoteServer } from "~/modules/posts/votes/vote-server";
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

// TODO: add field meta description to the post when creating it
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
              <Link href={`/c/${post.community.name}`}>
                c/{post.community?.name} •{" "}
              </Link>
              <time className="text-xs font-normal">
                {getTimeSincePosted(post.createdAt)}
              </time>
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
      <div className="my-2" />
      <div className="rounded-md p-4">
        <PostDisplay title={post.title} content={post.content as JSONContent} />
        <div className="my-4" />
        <div className="flex items-center gap-x-4">
          <Suspense>
            <VoteServer direction="row" postId={post.id} />
          </Suspense>
          <ShareButton currentRoute>
            <Button>
              <Share className="mr-4 h-4 w-4" />
              Share
            </Button>
          </ShareButton>
        </div>
        <div className="my-8" />
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}
