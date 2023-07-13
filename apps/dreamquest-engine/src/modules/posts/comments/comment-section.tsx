import { auth } from "@clerk/nextjs";
import { alias } from "drizzle-orm/mysql-core";

import {
  and,
  db,
  desc,
  eq,
  isNull,
  schema,
  type Comment,
  type User,
} from "@dq/db";
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

interface CommentSectionProps {
  postId: string;
}

function selectComments(postId: string) {
  const topLevel = alias(schema.comment, "comment");
  const creator = alias(schema.user, "creator");
  const children = alias(schema.comment, "child");
  const childCreator = alias(schema.user, "childCreator");

  return db
    .select()
    .from(topLevel)
    .leftJoin(children, eq(schema.comment.id, children.parentId))
    .leftJoin(childCreator, eq(children.creatorId, childCreator.id))
    .innerJoin(creator, eq(topLevel.creatorId, creator.id))
    .where(and(isNull(topLevel.parentId), eq(topLevel.postId, postId)))
    .orderBy(desc(topLevel.createdAt));
}

export type TransformedComment = Comment & {
  creator: User;
  children?: TransformedComment[];
};

function transformIntoCommentTree(
  comments: Awaited<ReturnType<typeof selectComments>>,
) {
  const commentMap = comments.reduce((acc, commentResponse) => {
    const { comment, child, childCreator, creator } = commentResponse;

    const transformedChild: TransformedComment | undefined =
      childCreator && child
        ? {
            ...child,
            creator: childCreator,
          }
        : undefined;

    if (!acc.has(comment.id)) {
      const transformedComment: TransformedComment = {
        ...comment,
        creator,
        children: [],
      };
      acc.set(comment.id, transformedComment);
    }

    if (transformedChild) {
      acc.get(comment.id)?.children!.push(transformedChild);
    }

    return acc;
  }, new Map<string, TransformedComment>());

  return Array.from(commentMap.values()).map((comment) => ({
    ...comment,
    children: (comment.children || []).sort((a, b) => {
      const timestampA = new Date(a.createdAt).getTime();
      const timestampB = new Date(b.createdAt).getTime();
      return timestampB - timestampA;
    }),
  }));
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

  const comments = transformIntoCommentTree(commentResponse);

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
