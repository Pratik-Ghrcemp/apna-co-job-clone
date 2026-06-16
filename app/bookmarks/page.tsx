"use client"

import { Bookmark } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"
import { JobCard } from "@/components/job-card"
import { JobCardSkeleton } from "@/components/job-card-skeleton"
import { useBookmarks } from "@/components/providers"
import { JOBS } from "@/lib/jobs"

export default function BookmarksPage() {
  const { bookmarks, ready } = useBookmarks()

  const saved = useMemo(() => JOBS.filter((j) => bookmarks.includes(j.id)), [bookmarks])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-foreground">
        <Bookmark className="size-6 text-primary" />
        Saved jobs
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">Jobs you&apos;ve bookmarked, stored on this device.</p>

      {!ready ? (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : saved.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border py-16 text-center">
          <Bookmark className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No saved jobs yet. Tap the bookmark icon to save roles.</p>
          <Link
            href="/"
            className="mt-5 inline-flex items-center rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Browse jobs
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {saved.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
