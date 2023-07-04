"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@dq/ui";
import { Button } from "@dq/ui/button";

export function VoteControls({
  initialVotes,
  className,
}: {
  initialVotes: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-10 flex-col items-center justify-center space-y-2 bg-muted",
        className,
      )}
    >
      <Button variant="outline" size="xs" className="group">
        <ChevronUp className="h-4 w-4 group-hover:text-green-400" />
      </Button>
      <p className="text-xs font-bold">{initialVotes}</p>
      <Button variant="ghost" size="xs" className="group">
        <ChevronDown className="h-4 w-4 group-hover:text-red-400" />
      </Button>
    </div>
  );
}
