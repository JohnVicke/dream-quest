import { db } from "@dq/db";

import { LayoutWithLeftAside } from "~/components/layout/layout-with-left-aside";
import { AsideContent } from "./aside-content";

export default async function LandingPageLayout({
  children,
}: React.PropsWithChildren) {
  const communities = await db.query.community.findMany();
  return (
    <LayoutWithLeftAside
      asideContent={<AsideContent communities={communities} />}
    >
      {children}
    </LayoutWithLeftAside>
  );
}
