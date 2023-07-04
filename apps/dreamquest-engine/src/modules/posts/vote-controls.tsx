"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Vote } from "@dq/db";
import { cn } from "@dq/ui";
import { Button } from "@dq/ui/button";

import { trpc } from "~/lib/trpc/client";

export function VoteControls({
  initialVotes,
  className,
  postId,
  initialVote,
  isAuthed,
}: {
  initialVotes: number;
  postId: number;
  isAuthed?: boolean;
  initialVote?: Partial<Vote> | null;
  className?: string;
}) {
  const router = useRouter();
  const [votes, setVotes] = useState(initialVotes);
  const [vote, setVote] = useState(initialVote);

  const voteMutation = trpc.vote.update.useMutation({
    onMutate: (vote) => {
      if (vote.value === vote?.value) {
        if (vote.value === "up") {
          console.log("up", votes, vote);
          return setVotes((prev) => prev - 1);
        }
        if (vote.value === "down") {
          return setVotes((prev) => prev + 1);
        }
      }

      if (vote.value === "up") {
        return setVotes((prev) => prev + 1);
      }
      if (vote.value === "down") {
        return setVotes((prev) => prev - 1);
      }
    },
  });

  function handleVote(value: "up" | "down") {
    if (!isAuthed) {
      return router.push("/sign-in");
    }
    setVote({ value: value === vote?.value ? undefined : value });
    voteMutation.mutate({
      postId,
      value,
    });
  }

  return (
    <div
      className={cn(
        "flex w-10 flex-col items-center justify-center space-y-2 bg-muted",
        className,
      )}
    >
      <UpVoteButton
        onClick={() => handleVote("up")}
        active={vote?.value === "up"}
      />
      <p className="text-xs font-bold">{votes}</p>
      <DownVoteButton
        onClick={() => handleVote("down")}
        active={vote?.value === "down"}
      />
    </div>
  );
}

function UpVoteButton({
  onClick,
  active,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      className={cn("hover:text-green-500", active && "text-green-400")}
      variant="ghost"
      size="sm"
      onClick={onClick}
    >
      <ChevronUp className="h-4 w-4" />
    </Button>
  );
}

function DownVoteButton({
  onClick,
  active,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      className={cn("hover:text-red-500", active && "text-red-400")}
      variant="ghost"
      size="sm"
      onClick={onClick}
    >
      <ChevronDown className="h-4 w-4" />
    </Button>
  );
}
