import { db } from "@dq/db";

import { CommunityAside } from "~/modules/layout/community-aside";
import { LayoutWithLeftAside } from "~/modules/layout/layout-with-left-aside";
import { TopNavigation } from "~/modules/layout/top-nav";

export default async function Layout({ children }: React.PropsWithChildren) {
  const communities = await db.query.community.findMany();
  return (
    <>
      <TopNavigation />
      <div className="pt-16">
        <LayoutWithLeftAside
          asideContent={<CommunityAside communities={communities} />}
        >
          {children}
        </LayoutWithLeftAside>
      </div>
    </>
  );
}
