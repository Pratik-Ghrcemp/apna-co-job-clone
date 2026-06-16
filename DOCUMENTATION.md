<div align="center">

<img src="./public/icon.svg" width="80" height="80" alt="apna.co logo" />

# apna.co Job Details Clone — Full Documentation

**Version:** 1.0.0  
**Author:** Pratik Shelar  
**GitHub:** [@Pratik-Ghrcemp](https://github.com/Pratik-Ghrcemp)  
**Repository:** [apna-co-job-clone](https://github.com/Pratik-Ghrcemp/apna-co-job-clone)  
**Task Reference:** Task-2 — Responsive Job Details Page

</div>

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Live Screenshots](#2-live-screenshots)
3. [Tech Stack](#3-tech-stack)
4. [Architecture & Project Structure](#4-architecture--project-structure)
5. [Pages & Routing](#5-pages--routing)
6. [Component Reference](#6-component-reference)
7. [Data Layer](#7-data-layer)
8. [State Management](#8-state-management)
9. [Theming & Design System](#9-theming--design-system)
10. [Responsive Design](#10-responsive-design)
11. [Getting Started](#11-getting-started)
12. [Build & Deployment](#12-build--deployment)
13. [Known Limitations](#13-known-limitations)

---

## 1. Project Overview

This project is a **pixel-inspired, production-quality clone** of the [apna.co](https://apna.co) job portal, built as a deliverable for Task-2. The primary goal was to reproduce the job details page experience — a rich, interactive single-job view — while also providing a realistic listings page, bookmarking, an apply flow, and a complete dark/light theme system.

### Goals

- Reproduce the apna.co job details UI faithfully
- Build with reusable, decoupled React components
- Use typed mock data that can be replaced by a real API without touching UI code
- Ship a fully responsive layout that works on every screen size
- Deploy to Vercel with zero-config

### What was built

| Page | Description |
|---|---|
| Job Listings (`/`) | Search, filter (location, type, work mode), paginate through 12 mock jobs |
| Job Details (`/job/[id]`) | Full-detail view — the primary deliverable |
| Bookmarks (`/bookmarks`) | Persisted saved jobs |
| Custom 404 | Friendly not-found page |

---

## 2. Live Screenshots

### Desktop — Job Listings (Light Mode)

![Home Light](./public/screenshots/home-light.png)

> The listings page shows all jobs in a responsive two-column grid. Keyword search and three dropdown filters narrow results in real time; pagination controls appear when results exceed 6 per page.

---

### Desktop — Job Details (Light Mode)

![Job Detail Top](./public/screenshots/job-detail-top.png)

> The job details header card displays the role title, company name, location, salary, experience, work mode tags, applicant count, and open positions. A prominent **Apply now** button opens the application modal.

![Job Detail Bottom](./public/screenshots/job-detail-bottom.png)

> The lower section covers the company "About" panel, required skills, job description, key responsibilities, and a sticky apply card in the right sidebar with similar job recommendations.

---

### Desktop — Job Details (Dark Mode)

![Job Detail Dark](./public/screenshots/job-detail-dark.png)

> The same page in dark mode. The theme is system-aware and can be toggled from the header. All design tokens are defined as CSS custom properties and swap automatically.

---

### Apply Modal

![Apply Modal](./public/screenshots/apply-modal.png)

> Clicking "Apply now" opens a centered modal with a full-name field, email field, and a cover-note textarea. Submitting shows a toast confirmation and closes the dialog. On mobile the same component renders as a full-width bottom sheet.

---

### Saved Jobs (Bookmarks)

![Bookmarks](./public/screenshots/bookmarks.png)

> The bookmarks page lists all jobs the user has saved via the bookmark icon. Data is persisted in `localStorage` so saves survive a page refresh. An empty-state illustration and a "Browse jobs" CTA are shown when no jobs have been saved.

---

### Mobile Views

| Mobile Listings | Mobile Job Details |
|---|---|
| ![Mobile Home](./public/screenshots/mobile-home.png) | ![Mobile Detail](./public/screenshots/mobile-detail.png) |

> On mobile the two-column grid collapses to a single column. The job details page hides the desktop sidebar and replaces the sticky apply card with a fixed bottom apply bar that floats above the viewport bottom edge.

---

## 3. Tech Stack

| Category | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 |
| Component Library | shadcn/ui | Latest |
| Icons | lucide-react | Latest |
| Theming | next-themes | Latest |
| Package Manager | pnpm | 9.x |
| Deployment | Vercel | — |

### Why Next.js App Router?

- File-based routing removes boilerplate (`/job/[id]` just works)
- React Server Components render static content (job details header, description) with zero JS
- The `layout.tsx` pattern allows a shared header/footer without prop-drilling
- First-class Vercel deployment — `pnpm build` + push is all that is needed

---

## 4. Architecture & Project Structure

```
apna-co-job-clone/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — wraps every page
│   ├── page.tsx                  # Job listings (search + filters + pagination)
│   ├── globals.css               # Tailwind v4 theme + CSS design tokens
│   ├── not-found.tsx             # Custom 404 page
│   ├── job/
│   │   └── [id]/
│   │       └── page.tsx          # Dynamic job details route
│   └── bookmarks/
│       └── page.tsx              # Saved jobs page
│
├── components/                   # Reusable React components
│   ├── site-header.tsx           # Navigation bar + theme toggle
│   ├── site-footer.tsx           # Site-wide footer
│   ├── job-card.tsx              # Job listing card (used on listings + similar jobs)
│   ├── job-card-skeleton.tsx     # Animated loading skeleton for job cards
│   ├── job-detail.tsx            # Full job details view (client component)
│   ├── apply-dialog.tsx          # Apply modal / mobile bottom sheet
│   ├── theme-toggle.tsx          # Dark / light toggle button
│   ├── providers.tsx             # ThemeProvider + BookmarksContext
│   └── ui/                       # shadcn/ui primitives (Button, Dialog, etc.)
│
├── lib/
│   ├── jobs.ts                   # Mock data + typed helper functions
│   └── utils.ts                  # cn() Tailwind class utility
│
├── public/
│   ├── screenshots/              # App screenshots embedded in docs
│   ├── icon.svg                  # Site favicon / logo
│   └── Task-2.pdf                # Original assessment brief
│
├── README.md                     # Quick-start README
├── DOCUMENTATION.md              # This file — full technical documentation
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── components.json               # shadcn/ui configuration
```

### Data flow

```
lib/jobs.ts  (mock data)
     │
     ▼
app/page.tsx              ── renders ──▶  components/job-card.tsx
app/job/[id]/page.tsx     ── renders ──▶  components/job-detail.tsx
                                               │
                                               ├── components/apply-dialog.tsx
                                               └── components/job-card.tsx (similar jobs)
```

---

## 5. Pages & Routing

### `/` — Job Listings

**File:** `app/page.tsx`  
**Type:** Server Component (filters run client-side via URL search params)

Features:
- Hero section with search input and three dropdown filters (location, job type, work mode)
- Filtered results count label
- Responsive job card grid (1 col mobile, 2 col desktop)
- Pagination: 6 cards per page, Previous/Next controls

### `/job/[id]` — Job Details

**File:** `app/job/[id]/page.tsx` → delegates to `components/job-detail.tsx`  
**Type:** Server Component (data fetched from `lib/jobs.ts`) + Client Component (interactivity)

Sections rendered:
1. Breadcrumb navigation (Jobs > Role title)
2. **Header card** — logo, title, company, location, tags (job type, work mode), stats (applicants, openings), salary grid, experience, posted date, Apply button, Share button, Bookmark button
3. **About the role** — full description prose
4. **Key responsibilities** — bulleted list
5. **Skills** — tag pills
6. **About [company]** — company logo, name, founding year, employee range, description
7. **Right sidebar (desktop only):**
   - Job highlights (benefits list)
   - Similar jobs (3 related `JobCard` components)
   - Sticky apply card (salary, openings count, Apply button)
8. **Mobile sticky apply bar** — fixed bottom bar with salary and Apply button

### `/bookmarks` — Saved Jobs

**File:** `app/bookmarks/page.tsx`  
**Type:** Client Component (reads `localStorage`)

- Reads saved job IDs from `localStorage` via `BookmarksContext`
- Renders matching jobs as `JobCard` components
- Empty state with illustration and "Browse jobs" CTA

### `*` — Not Found

**File:** `app/not-found.tsx`  
**Type:** Server Component

- Friendly 404 message with a "Back to jobs" link

---

## 6. Component Reference

### `SiteHeader`

Top navigation bar. Contains:
- Brand logo + "apna.co" wordmark (links to `/`)
- "Task PDF" link (opens `public/Task-2.pdf`)
- Bookmarks icon (links to `/bookmarks`) with saved-count badge
- `ThemeToggle` button
- "Sign in" button (UI only)

---

### `SiteFooter`

Four-column footer with brand description, an "Explore" link group (Browse jobs, Saved jobs, Task-2 PDF), a "Connect" contact group, and a copyright line.

---

### `JobCard`

**Props:**
```ts
interface JobCardProps {
  job: Job
}
```

Renders a bordered card showing:
- Company logo avatar
- Role title (links to `/job/[id]`)
- Company name · Location
- Salary, Experience, Work mode metadata row
- Job type and work mode tag pills
- "Posted X ago" timestamp
- Bookmark toggle button (filled/unfilled based on `BookmarksContext`)

---

### `JobCardSkeleton`

Animated `animate-pulse` placeholder that mirrors `JobCard` layout. Used while data is loading.

---

### `JobDetail`

**Type:** `"use client"` component  
**Props:**
```ts
interface JobDetailProps {
  job: Job
  similarJobs: Job[]
}
```

The main interactive component for the job details page. Manages:
- `ApplyDialog` open/closed state
- Share-to-clipboard logic with toast feedback
- Bookmark toggle via `BookmarksContext`
- Sticky mobile apply bar visibility via scroll position

---

### `ApplyDialog`

**Type:** `"use client"` component  
**Props:**
```ts
interface ApplyDialogProps {
  job: Job
  open: boolean
  onOpenChange: (open: boolean) => void
}
```

A shadcn/ui `Dialog` with three fields: Full name, Email, and a "Why are you a great fit?" textarea. On submit, shows a toast and closes. On mobile (viewport < `md`) it renders as a bottom-anchored sheet via CSS.

---

### `ThemeToggle`

A single icon button that calls `setTheme()` from `next-themes`. Shows a sun icon in dark mode and a moon icon in light mode.

---

### `Providers`

Wraps the app in:
1. `ThemeProvider` (from `next-themes`) — `attribute="class"`, `defaultTheme="system"`
2. `BookmarksContext.Provider` — global bookmark state with `localStorage` sync

---

## 7. Data Layer

**File:** `lib/jobs.ts`

### Type definition

```ts
export type Job = {
  id: string
  title: string
  company: string
  logo: string
  location: string
  salary: string
  experience: string
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship"
  workMode: "On-site" | "Remote" | "Hybrid"
  postedAt: string
  applicants: number
  openings: number
  tags: string[]
  description: string
  responsibilities: string[]
  skills: string[]
  highlights: string[]
  about: string
  founded: string
  employees: string
}
```

### Helper functions

| Function | Returns | Description |
|---|---|---|
| `getAllJobs()` | `Job[]` | All 12 mock jobs |
| `getJobById(id)` | `Job \| undefined` | Single job by ID |
| `getSimilarJobs(job, limit)` | `Job[]` | Jobs sharing tags or location, excluding the source job |
| `searchJobs(query, filters)` | `Job[]` | Filtered subset matching keyword + dropdown values |

Replacing mock data with a real API only requires updating these four functions — the rest of the app is unchanged.

---

## 8. State Management

The project uses **React Context** for shared client state. No external state library is needed.

### `BookmarksContext`

```ts
interface BookmarksContextValue {
  bookmarks: string[]            // Array of bookmarked job IDs
  toggle: (id: string) => void   // Add / remove a bookmark
  isBookmarked: (id: string) => boolean
}
```

- Initialises from `localStorage` on first render (client-side only)
- Syncs back to `localStorage` on every change via `useEffect`
- Provided globally in `components/providers.tsx`
- Consumed by `JobCard`, `JobDetail`, and `app/bookmarks/page.tsx`

---

## 9. Theming & Design System

**File:** `app/globals.css`

The design system uses **Tailwind CSS v4 design tokens** defined as CSS custom properties. All colors are expressed in the `oklch` color space for perceptual uniformity.

### Color palette

| Token | Light value | Purpose |
|---|---|---|
| `--primary` | `oklch(0.55 0.2 262)` | Brand blue (buttons, links, accents) |
| `--background` | `oklch(0.985 0.002 247)` | Page background |
| `--card` | `oklch(1 0 0)` | Card / panel background |
| `--foreground` | `oklch(0.21 0.02 257)` | Primary text |
| `--muted-foreground` | `oklch(0.55 0.02 257)` | Secondary / meta text |
| `--border` | `oklch(0.92 0.01 255)` | Card and input borders |

Dark mode tokens are defined under `.dark {}` and swap automatically when the `dark` class is applied to `<html>`.

### Typography

- **Body / UI:** Geist Sans (variable font loaded via `next/font/google`)
- **Code / mono:** Geist Mono

---

## 10. Responsive Design

The layout is **mobile-first**, enhanced progressively for wider viewports.

| Breakpoint | Behaviour |
|---|---|
| `< 640px` (mobile) | Single-column listings; job details sidebar hidden; sticky bottom apply bar visible |
| `640px – 1024px` (tablet) | Two-column listings grid; job details sidebar hidden; sticky bottom apply bar visible |
| `> 1024px` (desktop) | Two-column listings grid; job details two-column layout (main + sidebar); sticky sidebar apply card visible; bottom apply bar hidden |

Key responsive patterns:
- `md:grid-cols-2` for the listings grid
- `lg:grid-cols-[1fr_340px]` for the job details layout
- `hidden lg:block` / `lg:hidden` for toggling sidebar vs. mobile bar
- Apply modal: `Dialog` on desktop, bottom-pinned sheet on mobile via `max-md:` Tailwind variants

---

## 11. Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm 9 (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/Pratik-Ghrcemp/apna-co-job-clone.git
cd apna-co-job-clone

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server with HMR |
| `pnpm build` | Create an optimised production build |
| `pnpm start` | Serve the production build locally |
| `pnpm lint` | Run ESLint across the codebase |
| `pnpm type-check` | Run TypeScript type checker (no emit) |

---

## 12. Build & Deployment

### Vercel (recommended)

This repository is connected to Vercel. Every push to the `main` branch triggers an automatic production deployment. Preview deployments are created for every pull request.

Manual deploy via CLI:
```bash
pnpm build
vercel --prod
```

### Environment Variables

No environment variables are required for the base project — all data is mocked. If you replace `lib/jobs.ts` with a real API, add the necessary keys to Vercel's project settings or a local `.env.local` file.

---

## 13. Known Limitations

| Item | Detail |
|---|---|
| Mock data only | All job listings are static. No real API or database is connected. |
| No authentication | The "Sign in" button in the header is UI-only and has no auth flow behind it. |
| Bookmarks are local | Bookmarks are stored in `localStorage` — they are device-specific and cleared on browser data wipe. |
| Apply is simulated | Submitting the apply form shows a toast but does not send any data anywhere. |
| No search persistence | Search query and filters reset on page navigation (state is not stored in URL params). |

---

<div align="center">

Built by **Pratik Shelar** — Task-2 Assessment

</div>
