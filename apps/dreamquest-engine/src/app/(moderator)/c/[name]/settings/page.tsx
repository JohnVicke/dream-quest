import { notFound } from "next/navigation";

import { db, eq, schema } from "@dq/db";

import { UploadAvatar } from "~/modules/settings/upload-avatar";

export default async function Page({
  params,
}: {
  params: { name: string; id: number };
}) {
  const community = await db.query.community.findFirst({
    where: eq(schema.community.name, params.name),
  });
  if (!community) {
    return notFound();
  }
  return (
    <div>
      <h1 className="text-3xl font-bold">c/{params.name}</h1>
      <UploadAvatar communityId={community.id} />
    </div>
  );
}
