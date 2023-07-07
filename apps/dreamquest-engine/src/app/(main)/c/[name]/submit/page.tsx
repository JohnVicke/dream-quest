import { auth } from "@clerk/nextjs";

import { Editor } from "~/modules/posts/editor";

export default function CreatePostPage({
  params,
}: {
  params: { name: string };
}) {
  const userId = auth();
  if (!userId) {
    return null;
  }
  return <Editor communityName={params.name} />;
}
