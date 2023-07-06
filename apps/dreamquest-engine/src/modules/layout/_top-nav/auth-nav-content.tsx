import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@dq/ui/avatar";
import { Button, buttonVariants } from "@dq/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@dq/ui/dropdown-menu";

import { initialsFromUser } from "~/utils/initials-from-user";

export async function AuthNavContent() {
  const user = await currentUser();
  if (!user) {
    return (
      <Link href="/signin" passHref>
        <Button>Sign in</Button>
      </Link>
    );
  }

  const initials = initialsFromUser(user);

  return (
    <div className="flex gap-x-2">
      <Link href="/submit" passHref>
        <Button>Create post</Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user.profileImageUrl} />
            <AvatarFallback>{initials ? initials : <User />}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/signout" className="flex items-center gap-x-2">
              <LogOut className="h-4 w-4" />
              Sign out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
