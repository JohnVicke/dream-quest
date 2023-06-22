import { LeftAside } from "./left-aside";

export function LayoutWithLeftAside(
  props: React.PropsWithChildren<{ asideContent: React.ReactNode }>,
) {
  return (
    <div className="grid grid-cols-[auto,1fr] grid-rows-[calc(100vh-64px),auto] overflow-hidden">
      <LeftAside>{props.asideContent}</LeftAside>
      <main className="overflow-y-auto px-4 pt-16">
        <div className="mx-auto max-w-screen-lg">{props.children}</div>
      </main>
    </div>
  );
}
