import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs";
import format from "date-fns/format";
import { Settings } from "lucide-react";

import { and, db, eq, schema } from "@dq/db";

import { SubscribeToggleButton } from "~/modules/community/subscribe-toggle-button";
import { CreatePostTrigger } from "~/modules/posts/create-post-trigger";
import { PostCardBasic } from "~/modules/posts/post-card-basic";
import { ReactQueryProvider } from "~/providers/react-query-provider";

export default async function Page({ params }: { params: { name: string } }) {
  const { userId } = auth();

  const community = await db.query.community.findFirst({
    where: eq(schema.community.name, params.name),
    with: {
      posts: true,
      subscriptions: true,
    },
  });

  if (!community) {
    return notFound();
  }

  const isSubscribed = userId
    ? await db.query.subscription.findFirst({
        where: and(
          eq(schema.subscription.userId, userId),
          eq(schema.subscription.communityId, community.id),
        ),
      })
    : undefined;

  console.log({ community });

  return (
    <>
      {userId === community.creatorId && (
        <Link
          href={`/c/${community.name}/${community.id}/settings`}
          className="mb-4 flex items-center gap-x-2"
        >
          <Settings className="h-4 w-4" />
          Moderator settings
        </Link>
      )}
      <div className="flex items-center gap-x-2 rounded-lg border p-4 shadow-lg">
        {community.avatarUrl && (
          <Image
            className="rounded-full"
            src={community.avatarUrl}
            alt="Avatar"
            width={50}
            height={50}
          />
        )}
        <h1 className="text-2xl font-bold">{community.name}</h1>
        <ReactQueryProvider>
          <SubscribeToggleButton
            isAuthed={!!userId}
            communityId={community.id}
            initialIsSubscribed={!!isSubscribed}
          />
        </ReactQueryProvider>
      </div>
      <div className="mt-8 grid grid-cols-[1fr,20rem] gap-4">
        <div className="flex flex-col gap-y-4">
          <CreatePostTrigger communityName={params.name} />
          {community.posts?.map((post) => (
            <PostCardBasic
              hideSubreddit
              key={post.id}
              post={post}
              communityAvatarUrl={community.avatarUrl}
            />
          ))}
        </div>
        <div className="rounded-lg border p-4 shadow-lg">
          <div className="flex justify-between gap-x-4">
            <dt className="text-gray-400">Created</dt>
            <dd className="font-semibold text-gray-200">
              <time dateTime={community.createdAt.toDateString()}>
                {format(community.createdAt, "MMMM d, yyyy")}
              </time>
            </dd>
          </div>
          <div className="my-4 border border-b" />
          <div className="flex">
            <div className="flex flex-col-reverse items-center">
              <dt className="text-xs text-gray-400">Members</dt>
              <dd className="text-lg font-semibold text-gray-200">
                {community.subscriptions?.length}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
