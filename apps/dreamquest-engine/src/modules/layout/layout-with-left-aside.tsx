import { LeftAside } from "./left-aside";

export function LayoutWithLeftAside({
  asideContent = null,
  children,
}: React.PropsWithChildren<{ asideContent?: React.ReactNode }>) {
  return (
    <div className="grid grid-cols-[auto,1fr] grid-rows-[calc(100vh-64px),auto] overflow-hidden">
      <LeftAside className="pt-16">{asideContent}</LeftAside>
      <main className="overflow-y-auto px-4 pt-16">
        <div className="mx-auto max-w-screen-lg">{children}</div>
      </main>
    </div>
  );
}
