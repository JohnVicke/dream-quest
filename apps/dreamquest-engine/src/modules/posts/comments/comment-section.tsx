import { auth } from "@clerk/nextjs";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dq/ui/select";

import { ReactQueryProvider } from "~/providers/react-query-provider";
import { AddCommentForm } from "./add-comment-form";
import { AddCommentTrigger } from "./add-comment-trigger";
import { CommentThread } from "./comment-thread";
import { commentsToThread } from "./comments-to-thread/comments-to-thread";
import { selectComments } from "./comments-to-thread/select-comments";

interface CommentSectionProps {
  postId: string;
}

export async function CommentSection({ postId }: CommentSectionProps) {
  const { userId } = auth();

  const commentResponse = await selectComments(postId);

  if (!commentResponse) {
    return (
      <div>
        <div className="mt-4" />
        no comments
      </div>
    );
  }

  const comments = commentsToThread(commentResponse);

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
      <div className="flex flex-col gap-y-2" id="comment-section">
        {comments.map((comment) => (
          <CommentThread key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
