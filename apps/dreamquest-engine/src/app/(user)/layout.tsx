import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db, eq, schema } from "@dq/db";

import { LayoutWithLeftAside } from "~/modules/layout/layout-with-left-aside";
import MainLayout from "~/modules/layout/main-layout";
import { UserSettingsAside } from "~/modules/layout/user-settings-aside";
import { UserDetailProvider } from "~/modules/user/user-detail-context";
import { ReactQueryProvider } from "~/providers/react-query-provider";

export default async function Layout({ children }: React.PropsWithChildren) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/signin");
  }

  const user = await db.query.user.findFirst({
    where: eq(schema.user.id, userId),
    with: {
      posts: true,
      comments: true,
      communities: true,
      subscriptions: true,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <UserDetailProvider user={user}>
      <ReactQueryProvider>
        <MainLayout>
          <LayoutWithLeftAside asideContent={<UserSettingsAside />}>
            {children}
          </LayoutWithLeftAside>
        </MainLayout>
      </ReactQueryProvider>
    </UserDetailProvider>
  );
}
