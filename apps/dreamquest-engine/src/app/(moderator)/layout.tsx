import { LayoutWithLeftAside } from "~/modules/layout/layout-with-left-aside";
import MainLayout from "~/modules/layout/main-layout";
import { SettingsAside } from "~/modules/layout/settings-aside";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <MainLayout>
      <LayoutWithLeftAside asideContent={<SettingsAside />}>
        <div className="mx-auto max-w-screen-lg pt-16">{children}</div>
      </LayoutWithLeftAside>
    </MainLayout>
  );
}
