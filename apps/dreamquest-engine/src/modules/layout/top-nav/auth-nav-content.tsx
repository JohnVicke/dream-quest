import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { LogOut, Settings } from "lucide-react";

import { db, eq, schema } from "@dq/db";
import { Button } from "@dq/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@dq/ui/dropdown-menu";

import { UserAvatar } from "~/components/user-avatar";

export async function AuthNavContent() {
  const { userId } = auth();

  if (!userId) {
    return (
      <Link href="/signin" passHref>
        <Button>Sign in</Button>
      </Link>
    );
  }

  const user = await db.query.user.findFirst({
    where: eq(schema.user.id, userId),
  });

  if (!user) {
    return null;
  }

  return (
    <div className="flex gap-x-2">
      <Link href="/submit" passHref>
        <Button>Create post</Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar src={user.profileImageUrl} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/settings" className="flex items-center gap-x-2">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
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
