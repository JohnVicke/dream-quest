import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage, Button } from "@ff/ui";

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
      <Avatar>
        <AvatarImage src={user.profileImageUrl} />
        <AvatarFallback>{initials ? initials : <User />}</AvatarFallback>
      </Avatar>
    </div>
  );
}
