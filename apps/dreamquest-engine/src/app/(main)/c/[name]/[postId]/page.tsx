import { notFound } from "next/navigation";

import { db, eq, schema } from "@dq/db";

interface CommunityPostPageProps {
  params: {
    postId: string;
  };
}

export default async function CommunityPostPage({
  params,
}: CommunityPostPageProps) {
  const post = await db.query.post.findFirst({
    where: eq(schema.post.id, parseInt(params.postId, 10)),
  });

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{JSON.stringify(JSON.parse(post.content as string), null, 2)}</p>
    </div>
  );
}
