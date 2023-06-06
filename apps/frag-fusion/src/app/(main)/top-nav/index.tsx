import Link from "next/link";
import { Crosshair, Home, Newspaper, Trophy } from "lucide-react";

import { Button } from "@ff/ui";

import { ThemeToggleSelect } from "./theme-toggle-select";

export function TopNavigation() {
  return (
    <div className="fixed top-0 flex h-16 w-full items-center justify-between space-x-4 border-b px-8">
      <nav className="flex items-center space-x-4">
        <Link
          href="/home"
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
          Matchmaking
        </Link>
        <Link
          href="/"
          className="flex items-center gap-x-2 text-sm font-medium transition-colors hover:text-primary"
        >
          <Trophy className="h-4 w-4" />
          Ranking
        </Link>
        <Link
          href="/"
          className="flex items-center gap-x-2 text-sm font-medium transition-colors hover:text-primary"
        >
          <Newspaper className="h-4 w-4" />
          News
        </Link>
      </nav>
      <div className="flex gap-x-2">
        <ThemeToggleSelect />
        <Link href="/signin" passHref>
          <Button>Sign in</Button>
        </Link>
      </div>
    </div>
  );
}
