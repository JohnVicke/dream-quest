"use client";

import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";

import { Vote } from "@dq/db";
import { cn } from "@dq/ui";
import { Button } from "@dq/ui/button";

import { withTrpc } from "~/components/with-trpc";

export const VoteControlsLayout = withTrpc(
  ({
    className,
    isPending,
    initialVotes,
    initialVote,
    direction = "column",
    handleVote,
  }: {
    handleVote: (value: "up" | "down") => void;
    initialVotes: number;
    isPending: boolean;
    isAuthed?: boolean;
    initialVote?: Partial<Vote> | null;
    direction?: "row" | "column";
    className?: string;
  }) => {
    return (
      <div
        className={cn(
          "flex items-center justify-center border-r",
          direction === "row"
            ? "w-fit flex-row space-x-4 rounded-md border"
            : "w-10 flex-col space-y-2 border-r",
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
  },
);

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
      <ArrowBigUpDash className="h-4 w-4" />
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
      <ArrowBigDownDash className="h-4 w-4" />
    </Button>
  );
}
