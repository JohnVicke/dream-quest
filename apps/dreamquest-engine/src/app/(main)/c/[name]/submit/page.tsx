import { auth } from "@clerk/nextjs";

import { CreatePostForm } from "~/modules/posts/create-post-form";

export default function CreatePostPage({
  params,
}: {
  params: { name: string };
}) {
  const userId = auth();
  if (!userId) {
    return null;
  }
  return <CreatePostForm communityName={params.name} />;
}
