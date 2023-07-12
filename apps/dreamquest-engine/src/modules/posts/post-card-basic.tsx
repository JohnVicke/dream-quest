import Link from "next/link";
import { MessageSquare, Share } from "lucide-react";

import { db, eq, Post, schema, sql, User } from "@dq/db";

import { getTimeSincePosted } from "~/utils/get-time-since-posted";
import { HoverSubReddit } from "./hover-subredit";
import { ShareButton } from "./share-button";
import { VoteServer } from "./votes/vote-server";

interface PostCardBasicProps {
  post: Post & { creator: User };
  communityAvatarUrl?: string | null;
  hideSubreddit?: boolean;
}

export async function PostCardBasic({
  hideSubreddit = false,
  post,
  communityAvatarUrl,
}: PostCardBasicProps) {
  const nrComments = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(schema.comment)
    .where(eq(schema.comment.postId, post.id));

  return (
    <div
      key={post.id}
      className="relative flex items-start rounded-lg border hover:shadow-md"
    >
      <Link
        className="absolute inset-0"
        href={`/c/${post.communityName}/${post.id}`}
      >
        <span className="hidden">{post.title}</span>
      </Link>
      <VoteServer postId={post.id} direction="column" />
      <div className="flex flex-col p-4 [&>div>a]:z-10">
        <div className="flex items-end gap-x-2 ">
          {!hideSubreddit && (
            <HoverSubReddit
              post={post}
              communityAvatarUrl={communityAvatarUrl}
            />
          )}
          <p className="flex items-center text-xs">
            {!hideSubreddit && <span className="mr-1">•</span>}
            posted by {post?.creator?.username}
            <span className="mx-1">•</span>
            {getTimeSincePosted(post.createdAt)}
          </p>
        </div>
        <h3 className="my-2 text-xl font-bold">{post.title}</h3>
        <div className="flex gap-x-1">
          <Link
            href={`/c/${post.communityName}/${post.id}#comment-section`}
            className="z-10 flex w-fit items-center gap-x-1 rounded-md p-2 text-xs hover:bg-muted"
          >
            <MessageSquare className="h-4 w-4" />
            {nrComments[0].count ?? 0} comments
          </Link>
          <ShareButton href={`/c/${post.communityName}/${post.id}`}>
            <button className="z-10 flex w-fit items-center gap-x-1 rounded-md p-2 text-xs hover:bg-muted">
              <Share className="h-4 w-4" />
              Share
            </button>
          </ShareButton>
        </div>
      </div>
    </div>
  );
}
