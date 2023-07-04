import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs";
import format from "date-fns/format";
import { Settings } from "lucide-react";

import { db, desc, eq, schema } from "@dq/db";

import { CreatePostTrigger } from "~/modules/posts/create-post-trigger";
import { PostCardBasic } from "~/modules/posts/post-card-basic";

export default async function Page({ params }: { params: { name: string } }) {
  const { userId } = auth();

  const res = await db
    .select({
      id: schema.community.id,
      name: schema.community.name,
      creatorId: schema.community.creatorId,
      communityAvatarUrl: schema.community.avatarUrl,
      communityName: schema.community.name,
      posts: schema.post,
    })
    .from(schema.community)
    .where(eq(schema.community.name, params.name))
    .leftJoin(schema.post, eq(schema.community.name, schema.post.communityName))
    .orderBy(desc(schema.post.createdAt));

  if (!res?.[0]) {
    return notFound();
  }

  const community = res[0];
  const posts = res.map((r) => r.posts).filter((p) => p !== null);

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
      <div className="flex items-center gap-x-2 rounded-lg border p-4 shadow-lg">
        {community.communityAvatarUrl && (
          <Image
            src={community.communityAvatarUrl}
            alt="Avatar"
            width={50}
            height={50}
          />
        )}
        <h1 className="text-2xl font-bold">{community.name}</h1>
      </div>
      <div className="mt-8 grid grid-cols-[1fr,20rem] gap-4">
        <div className="flex flex-col gap-y-4">
          <CreatePostTrigger communityName={params.name} />
          {posts?.map((post) => (
            <PostCardBasic key={post.id} post={post} />
          ))}
        </div>
        <div className="rounded-lg border p-4 shadow-lg">
          <div className="flex justify-between gap-x-4">
            <dt className="text-gray-500">Created</dt>
            <dd className="text-gray-700">
              <time dateTime={community.createdAt.toDateString()}>
                {format(community.createdAt, "MMMM d, yyyy")}
              </time>
            </dd>
          </div>
        </div>
      </div>
    </>
  );
}
