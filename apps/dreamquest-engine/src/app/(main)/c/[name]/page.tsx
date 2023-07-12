import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs";
import format from "date-fns/format";
import { Settings } from "lucide-react";

import { db, eq, Post, schema, User } from "@dq/db";

import { SubscribeToggleButton } from "~/modules/community/subscribe-toggle-button";
import { CreatePostTrigger } from "~/modules/posts/create-post-trigger";
import { PostCardBasic } from "~/modules/posts/post-card-basic";
import { ReactQueryProvider } from "~/providers/react-query-provider";

export default async function Page({ params }: { params: { name: string } }) {
  const { userId } = auth();

  const community = await db.query.community.findFirst({
    where: eq(schema.community.name, params.name),
    with: {
      posts: {
        with: {
          creator: true,
        },
      },
      subscriptions: true,
    },
  });

  if (!community) {
    return notFound();
  }

  const subscribedResponse = userId
    ? await db
        .select()
        .from(schema.subscription)
        .innerJoin(
          schema.subscriptionsToCommunities,
          eq(
            schema.subscriptionsToCommunities.subscriptionId,
            schema.subscription.id,
          ),
        )
        .where(eq(schema.subscription.userId, userId))
    : undefined;

  const isSubscribed = (subscribedResponse ?? []).length > 0;

  return (
    <>
      {userId === community.creatorId && (
        <Link
          href={`/c/${community.name}/settings`}
          className="mb-4 flex items-center gap-x-2"
        >
          <Settings className="h-4 w-4" />
          Moderator settings
        </Link>
      )}
      <div className="flex items-center justify-between border p-4">
        <div className="flex items-center gap-x-2">
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
        </div>
        <ReactQueryProvider>
          <SubscribeToggleButton
            isAuthed={!!userId}
            communityId={community.id}
            initialIsSubscribed={!!isSubscribed}
          />
        </ReactQueryProvider>
      </div>
      <div className="mt-8 grid grid-cols-7 gap-4">
        <div className="col-span-full md:col-span-5">
          <CommunityFeed
            posts={community.posts}
            avatarUrl={community.avatarUrl}
            name={community.name}
          />
        </div>
        <aside className="sticky top-16 hidden self-start md:col-span-2 md:block">
          <AboutCommunity
            createdAt={community.createdAt}
            nrSubscriptions={community.subscriptions.length}
          />
        </aside>
      </div>
    </>
  );
}

interface CommunityFeedProps {
  posts: Array<Post & { creator: User }>;
  name: string;
  avatarUrl?: string | null;
}

function CommunityFeed({ posts, avatarUrl, name }: CommunityFeedProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <CreatePostTrigger communityName={name} />
      <div className="flex flex-col gap-y-4">
        {posts?.map((post) => (
          <PostCardBasic
            hideSubreddit
            key={post.id}
            post={post}
            communityAvatarUrl={avatarUrl}
          />
        ))}
      </div>
    </div>
  );
}

interface AboutCommunityProps {
  createdAt: Date;
  nrSubscriptions: number;
}

function AboutCommunity({ createdAt, nrSubscriptions }: AboutCommunityProps) {
  return (
    <div className="rounded-md border p-4">
      <div className="flex justify-between gap-x-4">
        <dt className="text-muted-foreground">Created</dt>
        <dd className="font-semibold text-muted-foreground">
          <time dateTime={createdAt.toDateString()}>
            {format(createdAt, "MMMM d, yyyy")}
          </time>
        </dd>
      </div>
      <div className="my-4 border border-b" />
      <div className="flex">
        <div className="flex flex-col-reverse items-center">
          <dt className="text-xs text-muted-foreground">Members</dt>
          <dd className="text-lg font-semibold">{nrSubscriptions}</dd>
        </div>
      </div>
    </div>
  );
}
