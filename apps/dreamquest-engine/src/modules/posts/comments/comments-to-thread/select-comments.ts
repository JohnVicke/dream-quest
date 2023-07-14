import { alias } from "drizzle-orm/mysql-core";

import { and, db, desc, eq, isNull, schema } from "@dq/db";

export function selectComments(postId: string) {
  const topLevel = alias(schema.comment, "comment");
  const creator = alias(schema.user, "creator");
  const children = alias(schema.comment, "child");
  const childCreator = alias(schema.user, "childCreator");
  const grandChildren = alias(schema.comment, "grandChild");
  const grandChildCreator = alias(schema.user, "grandChildCreator");

  return db
    .select()
    .from(topLevel)
    .leftJoin(children, eq(schema.comment.id, children.parentId))
    .leftJoin(childCreator, eq(children.creatorId, childCreator.id))
    .leftJoin(grandChildren, eq(children.id, grandChildren.parentId))
    .leftJoin(
      grandChildCreator,
      eq(grandChildren.creatorId, grandChildCreator.id),
    )
    .innerJoin(creator, eq(topLevel.creatorId, creator.id))
    .where(and(isNull(topLevel.parentId), eq(topLevel.postId, postId)))
    .orderBy(desc(topLevel.createdAt));
}

export type CommentResponse = Awaited<ReturnType<typeof selectComments>>;
