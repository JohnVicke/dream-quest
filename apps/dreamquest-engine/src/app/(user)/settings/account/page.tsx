"use client";

import Image from "next/image";

import { useUserDetail } from "~/modules/user/user-detail-context";

export default async function UserPage() {
  const user = useUserDetail();

  return (
    <>
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
