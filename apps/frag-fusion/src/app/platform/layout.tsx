import Link from "next/link";

import { ThemeToggleSelect } from "./theme-toggle-select";

export default function PlatformLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <nav className="flex h-16 items-center gap-x-4">
        <Link href="/">Home</Link>
        <ul className="flex items-center gap-x-4">
          <li>
            <Link href="/">Matchmaking</Link>
          </li>
        </ul>
        <ThemeToggleSelect />
      </nav>
      {children}
    </>
  );
}
