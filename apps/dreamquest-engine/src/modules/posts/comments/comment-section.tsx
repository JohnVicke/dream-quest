import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { JSONContent } from "@tiptap/react";
import isEqual from "date-fns/isEqual";
import { User } from "lucide-react";

import { db, desc, eq, schema } from "@dq/db";
import { Avatar, AvatarFallback, AvatarImage } from "@dq/ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dq/ui/select";

import { getTimeSincePosted } from "~/utils/get-time-since-posted";
import { TipTapEditorPreview } from "~/lib/tip-tap/editor-preview";
import { ReactQueryProvider } from "~/providers/react-query-provider";
import { AddCommentForm } from "./add-comment-form";
import { AddCommentTrigger } from "./add-comment-trigger";

interface CommentSectionProps {
  postId: string;
}

export async function CommentSection({ postId }: CommentSectionProps) {
  const { userId } = auth();
  const comments = await db.query.comment.findMany({
    with: {
      creator: true,
    },
    orderBy: desc(schema.comment.createdAt),
    where: eq(schema.comment.postId, postId),
    limit: 10,
  });

  return (
    <div>
      <div className="mt-4" />
      {userId ? (
        <ReactQueryProvider>
          <AddCommentForm postId={postId} />{" "}
        </ReactQueryProvider>
      ) : (
        <AddCommentTrigger />
      )}
      <div className="my-8" />
      <div className="flex items-center gap-x-4">
        <label className="text-xs text-muted-foreground">Sort by:</label>
        <Select>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="New" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="top">Top</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="old">Old</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <hr className="flex-1" />
        <p className="text-xs text-muted-foreground">
          {comments.length} comments
        </p>
      </div>
      <div className="my-8" />
      <div className="flex flex-col gap-y-2">
        {comments.map((comment) => (
          <div id={comment.id} className="relative flex items-start gap-x-2">
            <div className="absolute left-5 h-full w-px bg-border" />
            <div className="flex flex-col items-center">
              <Avatar>
                <AvatarImage
                  src={comment.creator?.profileImageUrl ?? undefined}
                />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-x-2">
                <Link
                  className="text-sm font-semibold"
                  href={`/u/${comment.creator?.username ?? "virren1337"}`}
                >
                  {comment.creator?.username ?? "virren1337"}
                </Link>
                <p className="flex gap-x-2 text-xs text-muted-foreground">
                  • <time>{getTimeSincePosted(comment.createdAt)}</time>
                  {isEqual(comment.createdAt, comment.updatedAt) && (
                    <>
                      • edited
                      <time>{getTimeSincePosted(comment.updatedAt)}</time>
                    </>
                  )}
                </p>
              </div>
              <TipTapEditorPreview content={comment.content as JSONContent} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
