import dynamic from "next/dynamic";
import Link from "next/link";
import { Crosshair, Home } from "lucide-react";

import { AuthNavContent } from "./auth-nav-content";

const ThemeToggleSelect = dynamic(() => import("./theme-toggle-select"), {
  ssr: false,
});

export function TopNavigation() {
  return (
    <div className="fixed top-0 z-10 flex h-16 w-full items-center justify-between space-x-4 border-b bg-background px-8">
      <nav className="flex items-center space-x-4">
        <Link
          href="/"
          className="flex items-center gap-x-2 text-sm font-medium transition-colors hover:text-primary"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <Link
          href="/matchmaking"
          className="flex items-center gap-x-2 text-sm font-medium transition-colors hover:text-primary"
        >
          <Crosshair className="h-4 w-4" />
          Story
        </Link>
      </nav>
      <div className="flex gap-x-2">
        <ThemeToggleSelect />
        <AuthNavContent />
      </div>
    </div>
  );
}