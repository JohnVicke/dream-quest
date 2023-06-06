import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

import { Button } from "@ff/ui";

export async function AuthNavContent() {
  const user = await currentUser();
  if (!user) {
    return (
      <Link href="/signin" passHref>
        <Button>Sign in</Button>
      </Link>
    );
  }

  return (
    <div className="flex gap-x-2">
      <Link href="/profile" passHref>
        <Button>Profile</Button>
      </Link>
      <Link href="/signout" passHref>
        <Button>Sign out</Button>
      </Link>
    </div>
  );
}
