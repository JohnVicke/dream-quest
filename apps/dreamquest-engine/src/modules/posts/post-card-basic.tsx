import Image from "next/image";
import Link from "next/link";
import { clerkClient } from "@clerk/nextjs";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Community, Post } from "@dq/db";
import { cn } from "@dq/ui";
import { Button } from "@dq/ui/button";

interface PostCardBasicProps {
  post: Post & {
    communityAvatarUrl: string | null;
  };
}

export async function PostCardBasic({ post }: PostCardBasicProps) {
  const user = await clerkClient.users.getUser(post.creatorId);

  return (
    <div
      key={post.id}
      className="relative flex gap-x-4 rounded-lg border shadow-lg"
    >
      <VoteControls className="z-10" />
      <div className="flex flex-col p-4">
        <div className="flex items-end gap-x-2 [&>a]:z-10">
          <Link
            className="flex items-end gap-x-2 text-xs font-semibold"
            href={`/c/${post.communityName}`}
          >
            {post.communityAvatarUrl && (
              <Image
                className="rounded-full"
                src={post.communityAvatarUrl}
                alt={`${post.communityName} avatar`}
                width={20}
                height={20}
              />
            )}
            {`c/${post.communityName}`}
          </Link>
          <p className="text-xs">
            • posted by {user.firstName} {getTimeSincePosted(post.createdAt)}{" "}
          </p>
        </div>
        <h3 className="my-2 text-xl font-bold">{post.title}</h3>
      </div>
      <Link
        className="absolute inset-0"
        href={`/c/${post.communityName}/${post.id}`}
      >
        <span className="hidden">{post.title}</span>
      </Link>
    </div>
  );
}

function VoteControls({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-10 flex-col items-center justify-center space-y-2 bg-muted",
        className,
      )}
    >
      <Button variant="outline" size="xs" className="group">
        <ChevronUp className="h-4 w-4 group-hover:text-green-400" />
      </Button>
      <p className="text-xs font-bold">214</p>
      <Button variant="ghost" size="xs" className="group">
        <ChevronDown className="h-4 w-4 group-hover:text-red-400" />
      </Button>
    </div>
  );
}

function getTimeSincePosted(createdAt: Date, now = new Date()) {
  if (now.getTime() - createdAt.getTime() < 1000 * 60) {
    return "just now";
  }

  if (now.getTime() - createdAt.getTime() < 1000 * 60 * 60) {
    const minutes = Math.floor(
      (now.getTime() - createdAt.getTime()) / (1000 * 60),
    );
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  if (now.getTime() - createdAt.getTime() < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(
      (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60),
    );
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  if (now.getTime() - createdAt.getTime() < 1000 * 60 * 60 * 24 * 30) {
    const days = Math.floor(
      (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24),
    );
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  if (now.getTime() - createdAt.getTime() < 1000 * 60 * 60 * 24 * 365) {
    const months = Math.floor(
      (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30),
    );
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }

  const years = Math.floor(
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 365),
  );
  return `${years} year${years === 1 ? "" : "s"} ago`;
}
