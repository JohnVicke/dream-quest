import { auth } from "@clerk/nextjs";

import { db, eq, schema, sql } from "@dq/db";

import { CommentVoteControls } from "./comment-vote-controls";
import { PostVoteControls } from "./post-vote-controls";

interface VoteServerProps {
  direction?: "row" | "column";
}

interface PostVoteServerProps extends VoteServerProps {
  postId: string;
}

export async function PostVoteServer({
  direction,
  postId,
}: PostVoteServerProps) {
  const { userId } = auth();
  const voteReponse = await db
    .select()
    .from(schema.vote)
    .innerJoin(schema.user, eq(schema.user.id, schema.vote.creatorId))
    .innerJoin(
      schema.votesToPosts,
      eq(schema.votesToPosts.voteId, schema.vote.id),
    )
    .where(eq(schema.votesToPosts.postId, postId))
    .limit(1);

  const sessionVote = voteReponse?.[0]?.vote;

  const numberOfVotesResponse = await db
    .select({
      votes: sql<number>`sum(case 
                             when ${schema.vote.value} = 'up' then 1
                             when ${schema.vote.value} = 'down' then -1
                         else 0 end)`,
    })
    .from(schema.vote)
    .innerJoin(
      schema.votesToPosts,
      eq(schema.votesToPosts.voteId, schema.vote.id),
    )
    .where(eq(schema.votesToPosts.postId, postId));

  const votes = numberOfVotesResponse[0].votes ?? 0;

  return (
    <PostVoteControls
      postId={postId}
      isAuthed={!!userId}
      initialVotes={votes}
      initialVote={sessionVote}
      direction={direction}
    />
  );
}

interface CommentVoteServerProps extends VoteServerProps {
  commentId: string;
}

export async function CommentVoteServer({
  direction,
  commentId,
}: CommentVoteServerProps) {
  const { userId } = auth();
  const voteReponse = await db
    .select()
    .from(schema.vote)
    .innerJoin(schema.user, eq(schema.user.id, schema.vote.creatorId))
    .innerJoin(
      schema.votesToComments,
      eq(schema.votesToComments.voteId, schema.vote.id),
    )
    .where(eq(schema.votesToComments.commentId, commentId));

  console.log(voteReponse);
  const sessionVote = voteReponse?.[0]?.vote;

  const numberOfVotesResponse = await db
    .select({
      votes: sql<number>`sum(case 
                             when ${schema.vote.value} = 'up' then 1
                             when ${schema.vote.value} = 'down' then -1
                         else 0 end)`,
    })
    .from(schema.vote)
    .innerJoin(
      schema.votesToComments,
      eq(schema.votesToComments.voteId, schema.vote.id),
    )
    .where(eq(schema.votesToComments.commentId, commentId));

  const votes = numberOfVotesResponse[0].votes ?? 0;

  return (
    <CommentVoteControls
      commentId={commentId}
      isAuthed={!!userId}
      initialVotes={votes}
      initialVote={sessionVote}
      direction={direction}
    />
  );
}
