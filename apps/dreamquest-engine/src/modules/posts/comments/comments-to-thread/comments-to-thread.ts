import { type Comment, type User } from "@dq/db";

import { CommentResponse } from "./select-comments";

export type TransformedComment = Comment & {
  creator: User;
  children?: TransformedComment[];
};
function transformComment(comment: Comment, creator: User) {
  return {
    ...comment,
    creator,
    children: [] as TransformedComment[],
  };
}

export function commentsToThread(response: CommentResponse) {
  const commentMap = response.reduce(
    (commentMap: Map<string, TransformedComment>, entry) => {
      const {
        comment,
        child,
        childCreator,
        grandChild,
        grandChildCreator,
        creator,
      } = entry;

      const transformedComment = transformComment(comment, creator);
      commentMap.set(comment.id, transformedComment);

      if (child && childCreator) {
        const transformedChild = transformComment(child, childCreator);
        commentMap.set(child.id, transformedChild);
      }

      if (grandChild && grandChildCreator) {
        const transformedGrandChild = transformComment(
          grandChild,
          grandChildCreator,
        );
        commentMap.set(grandChild.id, transformedGrandChild);
      }

      return commentMap;
    },
    new Map<string, TransformedComment>(),
  );

  return Array.from(commentMap.values()).reduce(
    (acc: TransformedComment[], comment) => {
      if (!comment.parentId) {
        return [...acc, comment];
      }
      const parentComment = commentMap.get(comment.parentId);
      if (parentComment?.children) {
        parentComment.children.push(comment);
      }
      return acc;
    },
    [],
  );
}
