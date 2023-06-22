import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs";
import format from "date-fns/format";

import { db, eq, schema } from "@dq/db";

export default async function CommunityLayout({
  params,
  children,
}: React.PropsWithChildren<{ params: { name: string } }>) {
  const { userId } = auth();

  const community = await db.query.community.findFirst({
    where: eq(schema.community.name, params.name),
  });

  if (!community) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-[1fr,20rem] gap-4">
      <div className="rounded-lg border p-4 shadow-lg">
        {community.avatarUrl && (
          <Image
            src={community.avatarUrl}
            alt="Avatar"
            width={200}
            height={200}
          />
        )}
        <h1 className="text-2xl font-bold">{children}</h1>
      </div>
      <div className="rounded-lg border p-4 shadow-lg">
        {userId === community.creatorId && (
          <Link href={`/c/${community.name}/settings`}>Settings</Link>
        )}
        <div className="flex justify-between gap-x-4">
          <dt className="text-gray-500">Created</dt>
          <dd className="text-gray-700">
            <time dateTime={community.createdAt.toDateString()}>
              {format(community.createdAt, "MMMM d, yyyy")}
            </time>
          </dd>
        </div>
      </div>
    </div>
  );
}
