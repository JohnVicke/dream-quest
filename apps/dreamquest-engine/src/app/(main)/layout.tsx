import { RightAside } from "./right-aside";
import { TopNavigation } from "./top-nav";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <TopNavigation />
      <div className="grid h-screen grid-cols-[1fr,auto] overflow-hidden pt-16">
        <main className="mx-auto w-full max-w-screen-xl overflow-y-auto pt-16">
          {children}
        </main>
        <RightAside />
      </div>
    </>
  );
}
