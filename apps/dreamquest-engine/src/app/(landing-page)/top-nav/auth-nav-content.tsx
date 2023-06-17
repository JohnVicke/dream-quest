import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { PlusIcon, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@dq/ui/avatar";
import { Button } from "@dq/ui/button";

export async function AuthNavContent() {
  const user = await currentUser();
  if (!user) {
    return (
      <Link href="/signin" passHref>
        <Button>Sign in</Button>
      </Link>
    );
  }

  const initials = `${user.firstName?.[0]}${user.lastName?.[0]}`;

  return (
    <div className="flex gap-x-2">
      <Link href="/submit" passHref>
        <Button>Create post</Button>
      </Link>
      <Avatar>
        <AvatarImage src={user.profileImageUrl} />
        <AvatarFallback>{initials ? initials : <User />}</AvatarFallback>
      </Avatar>
    </div>
  );
}
