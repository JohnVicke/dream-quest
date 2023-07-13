import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { Image, Link as LinkIcon } from "lucide-react";

import { db, eq, schema } from "@dq/db";
import { Button } from "@dq/ui/button";
import { Input } from "@dq/ui/input";

import { UserAvatar } from "~/components/user-avatar";

interface CreatePostTriggerProps {
  communityName?: string;
}

export async function CreatePostTrigger({
  communityName,
}: CreatePostTriggerProps) {
  const { userId } = auth();

  const user = userId
    ? await db.query.user.findFirst({
        where: eq(schema.user.id, userId),
      })
    : undefined;

  const href = communityName ? `/c/${communityName}/submit` : "/submit";

  return (
    <div className="flex gap-x-2">
      <UserAvatar src={user?.profileImageUrl} />
      <Link href={href} passHref className="w-full">
        <Input placeholder="Create post" />
      </Link>
      <div className="flex items-center">
        <Button variant="ghost" className="text-muted-foreground">
          <Image />
        </Button>
        <Button variant="ghost" className="text-muted-foreground">
          <LinkIcon />
        </Button>
      </div>
    </div>
  );
}
