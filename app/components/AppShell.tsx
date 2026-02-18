"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { db } from "@/lib/db";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = db.useUser();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto px-4 h-12 flex items-center justify-between">
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium ${pathname === "/" ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--text)]"}`}
            >
              Create
            </Link>
            <Link
              href="/gallery"
              className={`text-sm font-medium ${pathname === "/gallery" ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--text)]"}`}
            >
              Gallery
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--muted)] truncate max-w-[160px]" title={user?.email ?? ""}>
              {user?.email ?? ""}
            </span>
            <button
              type="button"
              onClick={() => db.auth.signOut()}
              className="text-xs text-[var(--muted)] hover:text-[var(--text)]"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
