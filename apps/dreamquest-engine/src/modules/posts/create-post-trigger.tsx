import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { Image, Link as LinkIcon, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@dq/ui/avatar";
import { Button } from "@dq/ui/button";
import { Input } from "@dq/ui/input";

import { initialsFromUser } from "~/utils/initials-from-user";

interface CreatePostTriggerProps {
  communityName?: string;
}

export async function CreatePostTrigger({
  communityName,
}: CreatePostTriggerProps) {
  const user = await currentUser();

  const href = communityName ? `/c/${communityName}/submit` : "/submit";

  return (
    <div className="flex gap-x-2">
      <Avatar>
        <AvatarImage src={user?.profileImageUrl} />
        <AvatarFallback>
          {user ? initialsFromUser(user) : <User />}
        </AvatarFallback>
      </Avatar>
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
