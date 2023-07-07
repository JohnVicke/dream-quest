"use client";

import { useTransition } from "react";
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
        disabled={isPending}
        onClick={() => handleVote("up")}
        active={initialVote?.value === "up"}
      />
      <p className="text-xs font-bold">{initialVotes}</p>
      <DownVoteButton
        disabled={isPending}
        onClick={() => handleVote("down")}
        active={initialVote?.value === "down"}
      />
    </div>
  );
}

type VoteButtonProps = {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
};

function UpVoteButton({ onClick, active, disabled }: VoteButtonProps) {
  return (
    <Button
      disabled={disabled}
      className={cn("hover:text-green-500", active && "text-green-400")}
      variant="ghost"
      size="sm"
      onClick={onClick}
    >
      <ChevronUp className="h-4 w-4" />
    </Button>
  );
}

function DownVoteButton({ onClick, active, disabled }: VoteButtonProps) {
  return (
    <Button
      className={cn("hover:text-red-500", active && "text-red-400")}
      disabled={disabled}
      variant="ghost"
      size="sm"
      onClick={onClick}
    >
      <ChevronDown className="h-4 w-4" />
    </Button>
  );
}
