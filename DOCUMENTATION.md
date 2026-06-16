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

This project is a **pixel-faithful, production-quality clone** of the [apna.co](https://apna.co) job portal, built as a deliverable for Task-2. The primary goal was to reproduce the job details page experience — a rich, interactive single-job view — while also providing a realistic listings page, bookmarking, an apply flow, and a complete dark/light theme system.

### Goals

- Reproduce the apna.co job details UI faithfully
- Build with reusable, decoupled React components
- Use typed mock data that can be replaced by a real API without touching UI code
- Ship a fully responsive layout that works on every screen size
- Deploy to Vercel with zero-config

### What was built

| Page | Route | Description |
|---|---|---|
| Job Listings | `/` | Search, filter (location, type, work mode), paginate through mock jobs |
| Job Details | `/job/[id]` | Full-detail view — the primary deliverable |
| Bookmarks | `/bookmarks` | Persisted saved jobs |
| Not Found | `*` | Custom 404 page |

---

## 2. Live Screenshots

### Desktop — Job Listings (Light Mode)

![Home Light](./public/screenshots/home-light.png)

> The listings page shows all jobs in a responsive grid. Keyword search and three dropdown filters narrow results in real time; pagination controls appear when results exceed 6 per page.

---

### Desktop — Job Detail Page (Top)

![Job Detail Top](./public/screenshots/job-detail-top.png)

> The header card shows the role title, company name, location, salary, experience, work-mode tags, applicant count, and open positions. A prominent **Apply now** button opens the application modal.

---

### Desktop — Job Detail Page (Description, Skills & Company)

![Job Detail Bottom](./public/screenshots/job-detail-bottom.png)

> The lower section covers the full job description, key responsibilities, required skills, job highlights (benefits/perks), and the company "About" panel. The right sidebar shows a sticky apply card and similar job recommendations.

---

### Dark Mode

![Dark Mode](./public/screenshots/job-detail-dark.png)

> The same page in dark mode. The theme is system-aware and can be toggled at any time from the header. All color tokens are defined as CSS custom properties and swap automatically.

---

### Apply Now Modal

![Apply Modal](./public/screenshots/apply-modal.png)

> Clicking "Apply now" opens a centered modal. On mobile the same component renders as a full-width bottom sheet that slides up from the screen edge.

---

### Saved Jobs (Bookmarks)

![Bookmarks](./public/screenshots/bookmarks.png)

> The bookmarks page lists all jobs the user has saved via the bookmark icon. Data is persisted in `localStorage` so saves survive a page refresh.

---

### Mobile Views

| Mobile Listings | Mobile Job Detail |
|---|---|
| ![Mobile Home](./public/screenshots/mobile-home.png) | ![Mobile Detail](./public/screenshots/mobile-detail.png) |

> On mobile the layout collapses to a single column. The job detail page hides the desktop sidebar and replaces the sticky apply card with a fixed bottom apply bar that floats above the viewport edge.

---

## 3. Tech Stack

| Category | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 |
| Component Library | shadcn/ui + Radix UI | Latest |
| Icons | lucide-react | Latest |
| Theming | next-themes | Latest |
| Package Manager | pnpm | 9.x |
| Deployment | Vercel | — |

**Why Next.js App Router?**

- File-based routing removes boilerplate — `/job/[id]` just works with a folder
- React Server Components render static content (job header, description) with zero client JS
- `layout.tsx` provides a shared header/footer shell without prop-drilling
- First-class Vercel deployment — push to `main` and it is live

---

## 4. Architecture & Project Structure

```
apna-co-job-clone/
│
├── app/                             # Next.js App Router
│   ├── layout.tsx                   # Root layout — providers, header, footer, metadata
│   ├── page.tsx                     # "/" — Job listings (search + filters + pagination)
│   ├── globals.css                  # Tailwind v4 @theme tokens + dark-mode overrides
│   ├── not-found.tsx                # Custom 404 page
│   ├── job/
│   │   └── [id]/
│   │       └── page.tsx             # "/job/:id" — Dynamic job detail route
│   └── bookmarks/
│       └── page.tsx                 # "/bookmarks" — Saved jobs page
│
├── components/
│   ├── site-header.tsx              # Global navigation bar
│   ├── site-footer.tsx              # Global footer — author: Pratik Shelar
│   ├── theme-toggle.tsx             # Dark / light icon button
│   ├── providers.tsx                # ThemeProvider + BookmarkContext + ToastContext
│   ├── job-card.tsx                 # Reusable listing card
│   ├── job-card-skeleton.tsx        # Animated loading placeholder
│   ├── job-detail.tsx               # Full interactive job detail view (client component)
│   ├── apply-dialog.tsx             # Apply modal / mobile bottom sheet
│   └── ui/
│       └── button.tsx               # shadcn/ui Button primitive
│
├── lib/
│   ├── jobs.ts                      # Job type definition + mock JOBS array + helpers
│   └── utils.ts                     # cn() Tailwind class merge utility
│
└── public/
    ├── screenshots/                 # PNG screenshots embedded in README & docs
    │   ├── home-light.png
    │   ├── job-detail-top.png
    │   ├── job-detail-bottom.png
    │   ├── job-detail-dark.png
    │   ├── apply-modal.png
    │   ├── bookmarks.png
    │   ├── mobile-home.png
    │   └── mobile-detail.png
    ├── Task-2.pdf                   # Original assignment brief
    └── icon.svg                     # Favicon / site logo
```

### Data flow

```
lib/jobs.ts  (JOBS array + query helpers)
      │
      ├──▶  app/page.tsx            renders ▶  <JobCard>  (listings grid)
      │
      └──▶  app/job/[id]/page.tsx   renders ▶  <JobDetail>
                                                    ├── <ApplyDialog>
                                                    └── <JobCard>  (similar jobs)
```

The outer shell (`app/layout.tsx`) is a Server Component. It wraps all pages in a `<Providers>` client boundary so theme and bookmark state is available everywhere without making individual pages client components.

---

## 5. Pages & Routing

### `/` — Job Listings

**File:** `app/page.tsx`

- Full-width hero with keyword search input and three dropdown filters: location, job type, work mode
- Filtered results rendered as a responsive `<JobCard>` grid
- Client-side pagination (6 cards per page)
- "No results" empty state when filters match nothing

### `/job/[id]` — Job Detail

**File:** `app/job/[id]/page.tsx` (Server) → `components/job-detail.tsx` (Client)

Awaits `params` (required in Next.js 16), calls `getJobById(id)`, then hands the job object to the interactive `<JobDetail>` client component. Calls `notFound()` if the ID does not exist.

**Sections on the page:**

| # | Section | Content |
|---|---|---|
| 1 | Breadcrumb | Jobs › Role title |
| 2 | Header card | Logo, title, company, location, salary, experience, work mode, job type, applicants, openings, tags, Apply / Save / Share buttons |
| 3 | Description | Full `desc` prose |
| 4 | Responsibilities | Bulleted list |
| 5 | Skills | Tag pills |
| 6 | Job Highlights | Perks / benefits (from `highlights[]`) |
| 7 | About company | `companyInfo`, `companySize`, `founded` |
| 8 | Similar Jobs | Up to 3 `<JobCard>` components |
| 9 | Desktop sidebar | Sticky apply card with salary, openings, Apply button |
| 10 | Mobile bar | Fixed bottom apply bar with salary and Apply button |

### `/bookmarks` — Saved Jobs

**File:** `app/bookmarks/page.tsx`

Reads the `bookmarks` array from `BookmarkContext`, maps it to `Job` objects via `getJobById`, and renders them as `<JobCard>` components. Shows an empty state with a "Browse jobs" CTA when nothing is saved.

### `*` — Not Found

**File:** `app/not-found.tsx`

Rendered automatically by Next.js for any route that does not match a file. Shows a friendly message and a link back to the listings.

---

## 6. Component Reference

### `<SiteHeader />`

Global navigation bar, server-rendered. Contains the brand logo, a link to `/bookmarks` with a live saved-count badge (from `BookmarkContext`), the `<ThemeToggle>` button, and a "Sign in" button (UI only).

---

### `<SiteFooter />`

Four-column footer with brand description, Explore links (Browse jobs, Saved jobs, Task-2 PDF), an Author section crediting **Pratik Shelar**, and a copyright line:
`© 2026 apna.co clone — built by Pratik Shelar.`

---

### `<ThemeToggle />`

Icon button. Reads the current theme from `next-themes` and shows a Sun (dark mode) or Moon (light mode) icon. ARIA label updates with the current action.

---

### `<JobCard job={job} />`

**Props:**

| Prop | Type | Required |
|---|---|---|
| `job` | `Job` | Yes |

Renders a bordered card with the company logo avatar, role title (link to `/job/[id]`), company name, location, salary, experience, work-mode and job-type badges, applicant/opening count, relative posted time, and a bookmark toggle button.

---

### `<JobCardSkeleton />`

Zero-props. Renders an `animate-pulse` grey-block placeholder that exactly mirrors the `<JobCard>` dimensions to prevent layout shift while data loads.

---

### `<JobDetail job={job} allJobs={allJobs} />`

`"use client"` component — the most complex in the project.

**Props:**

| Prop | Type | Required |
|---|---|---|
| `job` | `Job` | Yes |
| `allJobs` | `Job[]` | Yes |

Manages:
- `applyOpen` state — opens/closes `<ApplyDialog>`
- Share-to-clipboard via `navigator.clipboard.writeText()` + `showToast()`
- Bookmark toggle via `useBookmarks()`
- Derives `similarJobs` from `allJobs` by excluding the current job

---

### `<ApplyDialog open={open} onOpenChange={fn} job={job} />`

`"use client"` Radix `Dialog` wrapping an application form.

**Props:**

| Prop | Type | Required |
|---|---|---|
| `open` | `boolean` | Yes |
| `onOpenChange` | `(open: boolean) => void` | Yes |
| `job` | `Job` | Yes |

**Form fields:** Full name, Email address, Phone number, Years of experience, Cover note (optional textarea).

On submit: runs basic HTML5 validation, shows a success toast via `useToast()`, resets the form, and closes the dialog. On mobile the dialog renders as a bottom-anchored sheet. Fully keyboard-accessible — focus is trapped inside the dialog; Escape closes it.

---

### `<Providers children={...} />`

Root client boundary (`"use client"`). Nests:
1. `ThemeProvider` from `next-themes` — `attribute="class"`, `defaultTheme="system"`, `enableSystem`
2. `BookmarkProvider` — custom Context backed by `localStorage`
3. `ToastProvider` — lightweight custom toast stack

---

## 7. Data Layer

**File:** `lib/jobs.ts`

### `Job` type

```ts
export type Job = {
  id: number
  title: string
  company: string
  logo: string             // Single-letter avatar, e.g. "A"
  location: string
  workMode: "Remote" | "Hybrid" | "On-site"
  salary: string           // e.g. "₹18L – ₹25L / year"
  exp: string              // e.g. "3 - 6 years"
  posted: string           // e.g. "2 days ago"
  type: "Full-time" | "Internship" | "Part-time" | "Contract"
  openings: number
  applicants: number
  desc: string
  responsibilities: string[]
  skills: string[]
  highlights: string[]     // Benefits / perks
  companyInfo: string
  companySize: string
  founded: string
}
```

### Query helpers

| Function | Signature | Purpose |
|---|---|---|
| `getAllJobs` | `() => Job[]` | Returns all jobs in the array |
| `getJobById` | `(id: number) => Job \| undefined` | Finds a single job by its numeric ID |
| `getSimilarJobs` | `(exclude: Job, n?: number) => Job[]` | Returns up to `n` jobs that are not the given job |
| `searchJobs` | `(q: string, filters) => Job[]` | Keyword + filter search used by the listings page |

To connect a real API, replace the bodies of these four functions with `fetch` calls. No other files need to change.

---

## 8. State Management

No external state library is used. All shared state is managed through React Context.

### `BookmarkContext`

```ts
type BookmarkContextType = {
  bookmarks: number[]
  toggleBookmark: (id: number) => void
  isBookmarked: (id: number) => boolean
  ready: boolean             // false until localStorage is read (hydration guard)
}
```

**localStorage key:** `apna:bookmarks`

The `ready` flag prevents hydration mismatches — components check `ready` before rendering bookmark state.

**Consuming:**
```tsx
import { useBookmarks } from "@/components/providers"
const { isBookmarked, toggleBookmark } = useBookmarks()
```

---

### `ToastContext`

```ts
type ToastContextType = {
  showToast: (message: string, type?: "success" | "error") => void
}
```

Toasts auto-dismiss after 3 seconds and stack in the bottom-right corner of the viewport. No external dependency.

**Consuming:**
```tsx
import { useToast } from "@/components/providers"
const { showToast } = useToast()
showToast("Link copied!", "success")
```

---

## 9. Theming & Design System

**File:** `app/globals.css`

Tailwind v4 tokens are declared with `@theme inline` and use the `oklch` color space for perceptual uniformity.

### Color tokens

| Token | Light value | Dark value | Usage |
|---|---|---|---|
| `--primary` | `oklch(0.55 0.2 262)` | `oklch(0.65 0.18 262)` | Brand blue — buttons, links, badges |
| `--background` | `oklch(0.985 0.002 247)` | `oklch(0.18 0.02 257)` | Page background |
| `--card` | `oklch(1 0 0)` | `oklch(0.23 0.02 257)` | Card / panel background |
| `--foreground` | `oklch(0.21 0.02 257)` | `oklch(0.97 0.01 255)` | Primary text |
| `--muted-foreground` | `oklch(0.55 0.02 257)` | `oklch(0.7 0.02 257)` | Secondary / meta text |
| `--border` | `oklch(0.92 0.01 255)` | `oklch(1 0 0 / 12%)` | Borders |

Dark-mode tokens live under `.dark {}` and are applied automatically when `next-themes` adds the `dark` class to `<html>`.

### Typography

| Variable | Font | How it is loaded |
|---|---|---|
| `--font-sans` | Geist | `next/font/google` in `app/layout.tsx` |
| `--font-mono` | Geist Mono | `next/font/google` in `app/layout.tsx` |

---

## 10. Responsive Design

The layout is **mobile-first**. Base styles target small screens; Tailwind responsive prefixes enhance them for wider viewports.

| Breakpoint | Width | Key behaviour |
|---|---|---|
| base | < 640 px | Single-column grid; mobile sticky apply bar shown; sidebar hidden |
| `sm` | 640 px+ | Wider container padding; filter bar wraps neatly |
| `md` | 768 px+ | Two-column listings grid; job detail two-column layout; desktop apply card shown |
| `lg` | 1024 px+ | Max-width container centred; relaxed gutter spacing |

### Job detail two-column layout (md+)

```
┌─────────────────────────────────┬────────────────┐
│  Header card (full width)       │                │
├─────────────────────────────────┤  Sticky apply  │
│  Description                    │  card          │
│  Responsibilities               │                │
│  Skills                         │  Job           │
│  Highlights                     │  highlights    │
│  About company                  │                │
│  Similar jobs                   │  Similar jobs  │
└─────────────────────────────────┴────────────────┘
```

On mobile the right column is hidden and replaced by a fixed bottom apply bar.

---

## 11. Getting Started

### Prerequisites

- Node.js 20 or later
- pnpm (`npm install -g pnpm`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Pratik-Ghrcemp/apna-co-job-clone.git
cd apna-co-job-clone

# 2. Install dependencies
pnpm install

# 3. Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the Turbopack dev server with HMR |
| `pnpm build` | Create an optimised production build in `.next/` |
| `pnpm start` | Serve the production build locally on port 3000 |
| `pnpm lint` | Run ESLint across all `.ts` / `.tsx` files |

---

## 12. Build & Deployment

### Vercel (recommended)

The repository is connected to **Vercel**. Every push to `main` triggers an automatic production deployment. Pull requests receive isolated Preview Deployments.

**To deploy your own fork:**

1. Fork the repo on GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the fork.
3. Vercel auto-detects Next.js — no configuration required.
4. No environment variables are needed (all data is static).
5. Click **Deploy**.

### Manual production build

```bash
pnpm build    # outputs to .next/
pnpm start    # serves on http://localhost:3000
```

---

## 13. Known Limitations

| Area | Detail |
|---|---|
| Data source | All job listings are static mock data in `lib/jobs.ts`. No live API is connected. |
| Authentication | "Sign in" is UI-only. There is no auth flow behind it. |
| Bookmarks | Stored in `localStorage` — device-specific and cleared on browser data wipe. |
| Apply form | Submitting shows a toast but sends no data anywhere. |
| Search | Runs entirely client-side over the mock data set. |
| Images | Company logos are rendered as single-letter text avatars, not real images. |

---

<div align="center">

Developed by **Pratik Shelar**

</div>
