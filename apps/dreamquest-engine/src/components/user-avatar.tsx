import { User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@dq/ui/avatar";

export function UserAvatar({ src }: { src?: string | null }) {
  if (!src) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        <User />
      </div>
    );
  }

  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>{<User />}</AvatarFallback>
    </Avatar>
  );
}
