import { LayoutWithLeftAside } from "~/modules/layout/layout-with-left-aside";
import { SettingsAside } from "~/modules/layout/settings-aside";
import { ReactQueryProvider } from "~/providers/react-query-provider";

export default function CreateLayout({ children }: React.PropsWithChildren) {
  return (
    <LayoutWithLeftAside asideContent={<SettingsAside />}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </LayoutWithLeftAside>
  );
}
