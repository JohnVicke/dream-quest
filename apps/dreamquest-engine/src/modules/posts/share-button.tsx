"use client";

import { Link } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@dq/ui/dropdown-menu";
import { useToast } from "@dq/ui/use-toast";

type ShareButtonProps =
  | {
      href: string;
      currentRoute?: never;
    }
  | {
      href?: never;
      currentRoute: boolean;
    };

export function ShareButton({
  children,
  href,
}: React.PropsWithChildren<ShareButtonProps>) {
  if (!children) {
    throw new Error("ShareButton must have a menu trigger as children");
  }
  const { toast } = useToast();

  function copyToClipboard() {
    navigator.clipboard.writeText(
      `${window.location.origin}${href}` ?? window.location.href,
    );
    toast({
      title: "Copied to clipboard",
      description: "The link has been copied to your clipboard.",
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={copyToClipboard}>
          <Link className="mr-4 h-4 w-4" />
          Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
