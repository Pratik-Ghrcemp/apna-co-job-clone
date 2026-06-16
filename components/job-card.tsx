"use client"

import { Bookmark, Briefcase, IndianRupee, MapPin } from "lucide-react"
import Link from "next/link"
import { useBookmarks } from "@/components/providers"
import type { Job } from "@/lib/jobs"

const modeStyles: Record<Job["workMode"], string> = {
  Remote: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Hybrid: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "On-site": "bg-sky-500/10 text-sky-600 dark:text-sky-400",
}

export function JobCard({ job, compact = false }: { job: Job; compact?: boolean }) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const saved = isBookmarked(job.id)

  return (
    <Link
      href={`/job/${job.id}`}
      className="group relative block rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <span className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-lg font-bold text-accent-foreground">
          {job.logo}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="truncate pr-8 font-semibold leading-snug text-card-foreground group-hover:text-primary">
            {job.title}
          </h3>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {job.company} · {job.location}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <IndianRupee className="size-3.5" />
              {job.salary.replace("₹", "").replace(" / year", "").replace(" / month", "")}
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="size-3.5" />
              {job.exp}
            </span>
            {!compact && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" />
                {job.workMode}
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {job.type}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${modeStyles[job.workMode]}`}>
              {job.workMode}
            </span>
            <span className="ml-auto text-xs text-muted-foreground">{job.posted}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleBookmark(job.id)
        }}
        className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
        aria-label={saved ? "Remove from saved jobs" : "Save job"}
        aria-pressed={saved}
      >
        <Bookmark className={`size-4 ${saved ? "fill-primary text-primary" : ""}`} />
      </button>
    </Link>
  )
}
