"use client";

import { Link, Share } from "lucide-react";

import { Button } from "@dq/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@dq/ui/dropdown-menu";
import { useToast } from "@dq/ui/use-toast";

export function ShareButton() {
  const { toast } = useToast();

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Copied to clipboard",
      description: "The link has been copied to your clipboard.",
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Share className="mr-4 h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={copyToClipboard}>
          <Link className="mr-4 h-4 w-4" />
          Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
