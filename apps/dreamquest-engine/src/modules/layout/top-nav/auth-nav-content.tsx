import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@dq/ui/avatar";
import { Button } from "@dq/ui/button";

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
      <Avatar>
        <AvatarImage src={user.profileImageUrl} />
        <AvatarFallback>{initials ? initials : <User />}</AvatarFallback>
      </Avatar>
    </div>
  );
}
