import Image from "next/image";
import Link from "next/link";
import { auth, clerkClient } from "@clerk/nextjs";

import { and, db, eq, Post, schema, sql } from "@dq/db";
import { cn } from "@dq/ui";
import { buttonVariants } from "@dq/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@dq/ui/hover-card";

import { getTimeSincePosted } from "~/utils/get-time-since-posted";
import { ReactQueryProvider } from "~/providers/react-query-provider";
import { VoteControls } from "./vote-controls";

interface PostCardBasicProps {
  post: Post;
  communityAvatarUrl?: string | null;
  hideSubreddit?: boolean;
}

export async function PostCardBasic({
  hideSubreddit = false,
  post,
  communityAvatarUrl,
}: PostCardBasicProps) {
  const sessionUser = auth();
  const postUser = await clerkClient.users.getUser(post.creatorId);
  const votes = await db
    .select({
      votes: sql<number>`sum(case 
                             when ${schema.vote.value} = 'up' then 1
                             when ${schema.vote.value} = 'down' then -1
                         else 0 end)`,
    })
    .from(schema.vote)
    .where(eq(schema.vote.postId, post.id));

  const sessionVote = sessionUser.userId
    ? await db.query.vote.findFirst({
        where: and(
          eq(schema.vote.postId, post.id),
          eq(schema.vote.creatorId, sessionUser.userId),
        ),
      })
    : null;

  return (
    <div
      key={post.id}
      className="relative flex gap-x-4 rounded-lg border shadow-lg"
    >
      <ReactQueryProvider>
        <VoteControls
          className="z-10"
          initialVotes={votes[0].votes ?? 0}
          initialVote={sessionVote}
          isAuthed={!!sessionUser.userId}
          postId={post.id}
        />
      </ReactQueryProvider>
      <div className="flex flex-col p-4">
        <div className="flex items-end gap-x-2 [&>a]:z-10">
          {!hideSubreddit && (
            <HoverCard>
              <HoverCardTrigger>
                <Link
                  className="flex items-end gap-x-2 text-xs font-semibold"
                  href={`/c/${post.communityName}`}
                >
                  {communityAvatarUrl && (
                    <Image
                      className="rounded-full"
                      src={communityAvatarUrl}
                      alt={`${post.communityName} avatar`}
                      width={20}
                      height={20}
                    />
                  )}
                  {`c/${post.communityName}`}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col gap-y-4">
                <h4 className="text-lg font-semibold text-white">
                  c/{post.communityName}
                </h4>
                <Link
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full",
                  )}
                  href={`/c/${post.communityName}`}
                >
                  View community
                </Link>
              </HoverCardContent>
            </HoverCard>
          )}
          <p className="flex items-center text-xs">
            {!hideSubreddit && <span className="mr-1">•</span>}
            posted by {postUser.firstName} {getTimeSincePosted(post.createdAt)}
          </p>
        </div>
        <h3 className="my-2 text-xl font-bold">{post.title}</h3>
      </div>
      <Link
        className="absolute inset-0"
        href={`/c/${post.communityName}/${post.id}`}
      >
        <span className="hidden">{post.title}</span>
      </Link>
    </div>
  );
}
