"use client";

import { usePathname } from "next/navigation";

import { LeftAside } from "./left-aside";
import { SettingsAside } from "./settings-aside";

export function LayoutWithLeftAside({
  asideContent = null,
  children,
}: React.PropsWithChildren<{ asideContent?: React.ReactNode }>) {
  const pathname = usePathname();
  const isSettings =
    pathname.startsWith("/c/") && pathname.endsWith("/settings");
  return (
    <div className="grid grid-cols-[auto,1fr] grid-rows-[calc(100vh-64px),auto] overflow-hidden">
      <LeftAside>{isSettings ? <SettingsAside /> : asideContent}</LeftAside>
      <main className="overflow-y-auto px-4 pt-16">
        <div className="mx-auto max-w-screen-lg">{children}</div>
      </main>
    </div>
  );
}
