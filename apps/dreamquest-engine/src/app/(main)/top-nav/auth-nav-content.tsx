import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@ff/ui/avatar";
import { Button } from "@ff/ui/button";
import { User } from "lucide-react";

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
