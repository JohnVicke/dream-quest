"use client";

import React from "react";

import { cn } from "@dq/ui";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@dq/ui/tooltip";

import { useTipTapEditor } from "./editor";
import { menuBarItems } from "./editor-menu-bar-items";

interface MenuBarButtonProps {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}
const MenuBarButton = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<MenuBarButtonProps>
>(({ active, disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn("rounded-md p-2 hover:bg-primary/10", {
        "bg-primary/5 text-secondary-foreground": active,
        "text-secondary-foreground/50 hover:text-secondary-foreground": !active,
        "text-secondary-foreground/20": disabled,
      })}
      {...props}
      disabled={disabled}
    />
  );
});

export function TipTapMenuBar({ children }: React.PropsWithChildren) {
  const editor = useTipTapEditor();
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
        {children}
      </div>
    </TooltipProvider>
  );
}
