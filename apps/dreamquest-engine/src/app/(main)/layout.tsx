import { Suspense } from "react";

import { db } from "@dq/db";

import { LeftAside } from "./left-aside";
import { TopNavigation } from "./top-nav";

const getCommunities = () => {
  try {
    console.log({ db });
    return db.query.community.findMany();
  } catch (e) {
    return [];
  }
};

export default async function MainLayout({
  children,
}: React.PropsWithChildren) {
  const communities = await getCommunities();
  return (
    <>
      <TopNavigation />
      <div className="grid h-screen grid-cols-[auto,1fr] overflow-hidden pt-16">
        <Suspense>
          <LeftAside communities={communities} />
        </Suspense>
        <main className="mx-auto w-full max-w-screen-xl overflow-y-auto pt-16">
          {children}
        </main>
      </div>
    </>
  );
}
