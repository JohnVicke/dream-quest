"use client";

import { AsideRoot, AsideSection } from "./aside-base";

export function CommunitySettingsAside() {
  return <AsideRoot sections={sections} />;
}

const sections: AsideSection[] = [
  {
    section: "Appearance",
    links: [
      {
        href: "appearance",
        name: "Appearance",
      },
    ],
  },
];
