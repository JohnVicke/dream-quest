import { CommunitySettingsAside } from "~/modules/layout/community-settings-aside";
import { LayoutWithLeftAside } from "~/modules/layout/layout-with-left-aside";
import MainLayout from "~/modules/layout/main-layout";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <MainLayout>
      <LayoutWithLeftAside asideContent={<CommunitySettingsAside />}>
        {children}
      </LayoutWithLeftAside>
    </MainLayout>
  );
}
