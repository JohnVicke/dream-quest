import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs";
import format from "date-fns/format";

import { db, desc, eq, schema } from "@dq/db";

import { CreatePostTrigger } from "~/modules/posts/create-post-trigger";

export default async function Page({ params }: { params: { name: string } }) {
  const { userId } = auth();

  const community = await db.query.community.findFirst({
    where: eq(schema.community.name, params.name),
  });

  if (!community) {
    return notFound();
  }

  const posts = await db.query.post.findMany({
    where: eq(schema.post.communityName, community.name),
    orderBy: desc(schema.post.createdAt),
  });

  console.log({ posts });

  return (
    <>
      <div className="flex items-center gap-x-2 rounded-lg border p-4 shadow-lg">
        {community.avatarUrl && (
          <Image
            src={community.avatarUrl}
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
          {posts.map((post) => (
            <div key={post.id} className="rounded-lg border p-4 shadow-lg">
              <Link
                className="text-xl font-bold"
                href={`/c/${community.name}/${post.id}`}
              >
                {post.title}
              </Link>
              <div className="flex justify-between gap-x-4">
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-700">
                  <time dateTime={post.createdAt.toDateString()}>
                    {format(post.createdAt, "MMMM d, yyyy")}
                  </time>
                </dd>
                <dt className="text-gray-500">Author</dt>
                <dd className="text-gray-700">{post.creatorId}</dd>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border p-4 shadow-lg">
          {userId === community.creatorId && (
            <Link href={`/c/${community.name}/settings`}>Settings</Link>
          )}
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
