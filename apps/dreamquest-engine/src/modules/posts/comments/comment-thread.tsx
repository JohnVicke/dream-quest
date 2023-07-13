import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { JSONContent } from "@tiptap/react";
import isEqual from "date-fns/isEqual";

import { getTimeSincePosted } from "~/utils/get-time-since-posted";
import { UserAvatar } from "~/components/user-avatar";
import { EditorPreview } from "~/lib/tip-tap/editor-preview";
import { CommentActions } from "./comment-actions";
import { TransformedComment } from "./comment-section";

interface CommentProps {
  comment: TransformedComment;
}

export function CommentThread({ comment }: CommentProps) {
  const { userId } = auth();
  const hasEditRights = userId === comment.creator.id;
  return (
    <div className="relative">
      <div className="absolute left-5 top-12 h-[calc(100%-3rem)] w-px bg-border" />
      <div id={comment.id} className="flex items-start gap-x-2">
        <UserAvatar src={comment.creator?.profileImageUrl} />
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
          <EditorPreview content={comment.content as JSONContent} />
        </div>
      </div>
      <CommentActions
        className="ml-8"
        commentId={comment.id}
        hasEditRights={hasEditRights}
      />
      <div className="ml-4 mt-4 flex flex-col gap-y-2">
        {comment.children?.map((child) => (
          <CommentThread comment={child} />
        ))}
      </div>
    </div>
  );
}