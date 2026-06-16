"use client"

import {
  Bookmark,
  Briefcase,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  IndianRupee,
  MapPin,
  Send,
  Share2,
  Sparkles,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ApplyDialog } from "@/components/apply-dialog"
import { JobCard } from "@/components/job-card"
import { useBookmarks, useToast } from "@/components/providers"
import type { Job } from "@/lib/jobs"

export function JobDetail({ job, related }: { job: Job; related: Job[] }) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { showToast } = useToast()
  const [applyOpen, setApplyOpen] = useState(false)
  const saved = isBookmarked(job.id)

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : ""
    if (navigator.share) {
      try {
        await navigator.share({ title: job.title, text: `${job.title} at ${job.company}`, url })
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        showToast("Link copied to clipboard", "success")
      } catch {
        showToast("Could not copy link", "error")
      }
    }
  }

  const stats = [
    { icon: IndianRupee, label: "Salary", value: job.salary },
    { icon: Briefcase, label: "Experience", value: job.exp },
    { icon: MapPin, label: "Location", value: `${job.location} · ${job.workMode}` },
    { icon: CalendarClock, label: "Posted", value: job.posted },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="transition-colors hover:text-primary">
          Jobs
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="truncate text-foreground">{job.title}</span>
      </nav>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-5 lg:col-span-2">
          {/* Header card */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <span className="flex size-14 flex-shrink-0 items-center justify-center rounded-2xl bg-accent text-2xl font-bold text-accent-foreground">
                  {job.logo}
                </span>
                <div>
                  <h1 className="text-balance text-xl font-bold text-card-foreground sm:text-2xl">{job.title}</h1>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Building2 className="size-4" />
                      {job.company}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-4" />
                      {job.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Share job"
                >
                  <Share2 className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleBookmark(job.id)}
                  className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                  aria-label={saved ? "Remove from saved jobs" : "Save job"}
                  aria-pressed={saved}
                >
                  <Bookmark className={`size-4 ${saved ? "fill-primary text-primary" : ""}`} />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{job.type}</span>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {job.workMode}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                <Users className="size-3.5" />
                {job.applicants} applicants
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {job.openings} opening{job.openings === 1 ? "" : "s"}
              </span>
            </div>

            {/* Stat grid */}
            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <s.icon className="size-3.5" />
                    {s.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-card-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={() => setApplyOpen(true)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto sm:px-8"
            >
              <Send className="size-4" />
              Apply now
            </button>
          </section>

          {/* Description */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-base font-bold text-card-foreground">About the role</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{job.desc}</p>

            <h3 className="mt-6 text-sm font-semibold text-card-foreground">Key responsibilities</h3>
            <ul className="mt-3 space-y-2">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 flex-shrink-0 text-primary" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 text-sm font-semibold text-card-foreground">Skills</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span key={s} className="rounded-lg bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Company info */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-card-foreground">
              <Building2 className="size-4 text-primary" />
              About {job.company}
            </h2>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-lg font-bold text-accent-foreground">
                {job.logo}
              </span>
              <div className="text-sm">
                <p className="font-medium text-card-foreground">{job.company}</p>
                <p className="text-xs text-muted-foreground">
                  Founded {job.founded} · {job.companySize}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{job.companyInfo}</p>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-card-foreground">
              <Sparkles className="size-4 text-primary" />
              Job highlights
            </h2>
            <ul className="mt-3 space-y-2">
              {job.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-xl bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
                >
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold text-card-foreground">
              <Briefcase className="size-4 text-primary" />
              Similar jobs
            </h2>
            <div className="mt-3 space-y-3">
              {related.map((rel) => (
                <JobCard key={rel.id} job={rel} compact />
              ))}
            </div>
          </section>

          <div className="sticky top-20 hidden rounded-2xl border border-border bg-card p-5 lg:block">
            <p className="text-sm font-semibold text-card-foreground">{job.salary}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{job.openings} open positions</p>
            <button
              type="button"
              onClick={() => setApplyOpen(true)}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Send className="size-4" />
              Apply now
            </button>
          </div>
        </aside>
      </div>

      {/* Sticky mobile apply bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{job.salary}</p>
            <p className="truncate text-xs text-muted-foreground">{job.title}</p>
          </div>
          <button
            type="button"
            onClick={() => setApplyOpen(true)}
            className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Send className="size-4" />
            Apply
          </button>
        </div>
      </div>

      <ApplyDialog job={job} open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  )
}
