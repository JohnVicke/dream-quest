import { auth } from "@clerk/nextjs";

import { CreatePostForm } from "~/modules/posts/create-post-form";

export default function SubmitPage() {
  const userId = auth();
  if (!userId) {
    return null;
  }
  return <CreatePostForm />;
}
