"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronsUpDown, Home, Plus } from "lucide-react";

import { Community } from "@dq/db";
import { cn } from "@dq/ui";
import { Button, buttonVariants } from "@dq/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@dq/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@dq/ui/popover";

interface CommunityComboboxProps {
  communities: Community[];
}

export function CommunityCombobox({ communities }: CommunityComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const pattern = /\/c\/(.*)/;
  const match = pathname.match(pattern);
  const rawMatch = match ? match[1] : "";
  const communityName = rawMatch.split("/")[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {match ? (
            <>{rawMatch}</>
          ) : (
            <div className="flex items-center gap-x-2 text-muted-foreground">
              <Home className="h-4 w-4" /> Home
            </div>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href="/c/create"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create community
          </Link>
          <CommandEmpty>No communities found..</CommandEmpty>
          <CommandGroup>
            {communities.map((community) => (
              <Link href={`/c/${community.name}`} key={community.id} passHref>
                <CommandItem>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      communityName === community.name
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {community.name}
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
