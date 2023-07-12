import { auth } from "@clerk/nextjs";

import { db, eq, schema, sql } from "@dq/db";

import { VoteControls } from "./vote-controls";

interface VoteServerProps {
  postId: string;
  direction?: "row" | "column";
}

export async function VoteServer({ direction, postId }: VoteServerProps) {
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
    <VoteControls
      postId={postId}
      isAuthed={!!userId}
      initialVotes={votes}
      initialVote={sessionVote}
      direction={direction}
    />
  );
}
