import Link from "next/link";
import { format } from "date-fns";

import { db } from "@dq/db";

import { CreatePostTrigger } from "~/modules/posts/create-post-trigger";

export default async function LandingPage() {
  const posts = await db.query.post.findMany();
  return (
    <div className="h-screen">
      <CreatePostTrigger />
      {posts.map((post) => (
        <div key={post.id} className="rounded-lg border p-4 shadow-lg">
          <Link
            className="text-xl font-bold"
            href={`/c/${post.communityName}/${post.id}`}
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
  );
}
