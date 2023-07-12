import Image from "next/image";
import Link from "next/link";

import { Post } from "@dq/db";
import { cn } from "@dq/ui";
import { buttonVariants } from "@dq/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@dq/ui/hover-card";

export function HoverSubReddit({
  post,
  communityAvatarUrl,
}: {
  post: Post;
  communityAvatarUrl?: string | null;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link
          className="flex items-end gap-x-2 text-xs font-semibold hover:underline"
          href={`/c/${post.communityName}`}
        >
          {communityAvatarUrl && (
            <Image
              className="rounded-full"
              src={communityAvatarUrl}
              alt={`${post.communityName} avatar`}
              width={20}
              height={20}
            />
          )}
          {`c/${post.communityName}`}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="flex flex-col gap-y-4">
        <h4 className="text-lg font-semibold">c/{post.communityName}</h4>
        <Link
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          href={`/c/${post.communityName}`}
        >
          View community
        </Link>
      </HoverCardContent>
    </HoverCard>
  );
}
