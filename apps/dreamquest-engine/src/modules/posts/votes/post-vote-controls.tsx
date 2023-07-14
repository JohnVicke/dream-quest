"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Vote } from "@dq/db";

import { withTrpc } from "~/components/with-trpc";
import { trpc } from "~/lib/trpc/client";
import { VoteControlsLayout } from "./vote-layout";

export const PostVoteControls = withTrpc(
  ({
    initialVotes,
    className,
    postId,
    initialVote,
    isAuthed,
    direction = "column",
  }: {
    initialVotes: number;
    postId: string;
    isAuthed?: boolean;
    initialVote?: Partial<Vote> | null;
    direction?: "row" | "column";
    className?: string;
  }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const voteMutation = trpc.vote.update.useMutation({
      // TODO: add onMutation optimistic update for this one instead
      onSuccess: () => {
        startTransition(() => {
          router.refresh();
        });
      },
    });

    function handleVote(value: "up" | "down") {
      if (!isAuthed) {
        return router.push("/signin");
      }
      voteMutation.mutate({
        type: "post",
        id: postId,
        value,
      });
    }

    return (
      <VoteControlsLayout
        handleVote={handleVote}
        initialVotes={initialVotes}
        isPending={isPending}
        initialVote={initialVote}
        className={className}
        isAuthed={isAuthed}
        direction={direction}
      />
    );
  },
);
