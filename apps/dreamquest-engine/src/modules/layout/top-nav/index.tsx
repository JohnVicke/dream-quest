import dynamic from "next/dynamic";
import Link from "next/link";

import { db } from "@dq/db";

import { AuthNavContent } from "./auth-nav-content";
import { CommunityCombobox } from "./community-combobox";
import { MobileDropdown } from "./mobile-drowdown";

const ThemeToggleSelect = dynamic(() => import("./theme-toggle-select"), {
  ssr: false,
});

export async function TopNavigation() {
  const communities = await db.query.community.findMany();

  return (
    <div className="fixed top-0 z-50 flex h-16 w-full items-center justify-between space-x-4 border-b bg-background px-8">
      <nav className="flex items-center space-x-4">
        <Link
          href="/"
          className="flex items-center gap-x-2 text-sm font-medium transition-colors hover:text-primary"
        >
          Dreamquest
        </Link>
        <CommunityCombobox communities={communities} />
      </nav>
      <div className="block sm:hidden">
        <MobileDropdown />
      </div>
      <div className="hidden gap-x-2 sm:flex">
        <ThemeToggleSelect />
        <AuthNavContent />
      </div>
    </div>
  );
}
