import { db } from "@dq/db";

import { TopNavigation } from "~/components/layout/top-nav";

export default async function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <TopNavigation />
      <div className="pt-16">{children}</div>
    </>
  );
}
