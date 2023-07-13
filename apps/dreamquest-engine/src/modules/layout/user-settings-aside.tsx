"use client";

import { AsideRoot, AsideSection } from "./aside-base";

export function UserSettingsAside() {
  return <AsideRoot sections={sections} />;
}

const sections: AsideSection[] = [
  {
    section: "User settings",
    links: [
      {
        href: "settings/account",
        name: "Account",
      },
      {
        href: "settings/profile",
        name: "Profile",
      },
      {
        href: "settings/privacy",
        name: "Saftey & Privacy",
      },
      {
        href: "settings/feed",
        name: "Feed",
      },
    ],
  },
];
