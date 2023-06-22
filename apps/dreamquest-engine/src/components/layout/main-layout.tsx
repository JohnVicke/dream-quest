import { TopNavigation } from "./top-nav";

export default function MainLayout(
  props: React.PropsWithChildren<{ asideContent: React.ReactNode }>,
) {
  return (
    <>
      <TopNavigation />
      {props.children}
    </>
  );
}
