import { auth } from "@clerk/nextjs";

import { db, eq, schema } from "@dq/db";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dq/ui/select";

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
    where: eq(schema.comment.postId, postId),
    limit: 10,
  });

  return (
    <div>
      <div className="flex items-center gap-x-4">
        <label className="text-xs text-muted-foreground">Sort by:</label>
        <Select>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Top" />
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
      <div className="mt-4" />
      {userId ? <AddCommentForm /> : <AddCommentTrigger />}
    </div>
  );
}
