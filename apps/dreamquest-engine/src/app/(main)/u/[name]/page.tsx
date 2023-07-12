import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { Settings } from "lucide-react";

import { db, eq, schema } from "@dq/db";

export default async function UserPage({
  params,
}: {
  params: { name: string };
}) {
  const { userId } = auth();

  const user = await db.query.user.findFirst({
    where: eq(schema.user.username, params.name),
    with: {
      posts: true,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <>
      {userId === user.id && (
        <Link
          href={`/u/${user.username}/settings`}
          className="mb-4 flex items-center gap-x-2"
        >
          <Settings className="h-4 w-4" />
          Moderator settings
        </Link>
      )}
      <div className="flex items-center justify-between border p-4">
        <div className="flex items-center gap-x-2">
          {user.profileImageUrl && (
            <Image
              className="rounded-full"
              src={user.profileImageUrl}
              alt="Avatar"
              width={50}
              height={50}
            />
          )}
          <h1 className="text-2xl font-bold">{user.username}</h1>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-7 gap-4">
        <div className="col-span-full md:col-span-5"></div>
        <aside className="sticky top-16 hidden self-start md:col-span-2 md:block"></aside>
      </div>
    </>
  );
}
