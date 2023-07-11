"use client";

import React from "react";
import { Editor } from "@tiptap/react";

import { cn } from "@dq/ui";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@dq/ui/tooltip";

import { menuBarItems } from "./editor-menu-bar-items";

interface MenuBarButtonProps {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}
const MenuBarButton = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<MenuBarButtonProps>
>(({ active, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn("rounded-md p-2 hover:bg-primary/10", {
        "font-semibold text-secondary-foreground": active,
        "text-secondary-foreground/50 hover:text-secondary-foreground": !active,
      })}
      {...props}
    />
  );
});

export function EditorMenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  return (
    <TooltipProvider>
      <div className="flex flex-wrap bg-muted">
        {menuBarItems.map((item) => (
          <Tooltip key={item.name}>
            <TooltipTrigger asChild>
              <MenuBarButton
                onClick={() => item.handleOnClick(editor)}
                disabled={item.isDisabled?.(editor)}
                active={item.isActive?.(editor)}
              >
                <item.Icon className="h-4 w-4" />
              </MenuBarButton>
            </TooltipTrigger>
            <TooltipContent>{item.tooltip}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
