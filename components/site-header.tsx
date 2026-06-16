"use client"

import { Bookmark, FileText } from "lucide-react"
import Link from "next/link"
import { useBookmarks } from "@/components/providers"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const { bookmarks, ready } = useBookmarks()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-base font-bold text-primary-foreground">
            a
          </span>
          <span className="text-lg font-bold tracking-tight">
            apna<span className="text-primary">.co</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <a
            href="/Task-2.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
          >
            <FileText className="size-4" />
            Task PDF
          </a>

          <Link
            href="/bookmarks"
            className="relative flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Saved jobs"
          >
            <Bookmark className="size-5" />
            {ready && bookmarks.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {bookmarks.length}
              </span>
            )}
          </Link>

          <ThemeToggle />

          <button
            type="button"
            className="ml-1 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Sign in
          </button>
        </nav>
      </div>
    </header>
  )
}
