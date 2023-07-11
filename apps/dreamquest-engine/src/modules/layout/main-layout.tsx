import { TopNavigation } from "./top-nav";

export default function MainLayout(props: React.PropsWithChildren) {
  return (
    <>
      <TopNavigation />
      <main className="pt-4">{props.children}</main>
    </>
  );
}
