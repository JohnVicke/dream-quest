"use client";

import { Plus } from "lucide-react";

import { Button } from "@dq/ui/button";

import { TipTapEditor } from "~/lib/tip-tap/editor";
import { TipTapMenuBar } from "~/lib/tip-tap/editor-menu-bar";

export function AddCommentForm() {
  return (
    <TipTapEditor>
      <TipTapMenuBar>
        <Button size="xs">
          <Plus className="h-4 w-4" />
          Add comment
        </Button>
      </TipTapMenuBar>
    </TipTapEditor>
  );
}
