import { LeftAside } from "./left-aside";
import { TopNavigation } from "./top-nav";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <TopNavigation />
      <div className="grid h-screen grid-cols-[auto,1fr] overflow-hidden pt-16">
        <LeftAside />
        <main className="mx-auto w-full max-w-screen-xl overflow-y-auto pt-16">
          {children}
        </main>
      </div>
    </>
  );
}
