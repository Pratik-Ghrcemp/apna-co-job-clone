# Apna.co — Job Details Clone

A pixel-inspired, fully responsive **Job Details experience** modeled on [apna.co](https://apna.co), built for **Task-2**. It features a job listings page with search & filters, a rich single-job details view, bookmarking, an apply flow, and a dark/light theme — all powered by typed mock JSON data.

> Built with the **Next.js App Router**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**.

🔗 [Continue working on v0 →](https://v0.app/chat/projects/prj_s2VU28Nfoz86RfR0kM8BXBNWXBsm)

---

## ✨ Features

- **Job listings page** (`/`) — keyword search, plus location, job-type, and work-mode filters with client-side pagination.
- **Job details page** (`/job/[id]`) — the centerpiece:
  - Header card with role, company, salary, experience, stats, and tags
  - Full job description, key responsibilities, and required skills
  - Company "About" section and job highlights
  - "Similar jobs" recommendations
  - Sticky **Apply** card on desktop and a sticky **Apply** bar on mobile
- **Apply flow** — a modal form (renders as a bottom sheet on mobile) with validation and toast confirmation.
- **Bookmarks** (`/bookmarks`) — save jobs to revisit; persisted in `localStorage`.
- **Share** — copy the job link to the clipboard with a toast.
- **Dark / light theme** — system-aware toggle via `next-themes`.
- **Responsive, accessible UI** — semantic HTML, ARIA labels, keyboard-friendly controls.
- **Loading skeletons** and a custom **404 / not-found** page.

---

## 🛠 Tech Stack

| Layer        | Choice                                  |
| ------------ | --------------------------------------- |
| Framework    | Next.js (App Router)                    |
| Language     | TypeScript                              |
| Styling      | Tailwind CSS v4                         |
| Components   | shadcn/ui + lucide-react icons          |
| Theming      | next-themes                             |
| Data         | Typed mock JSON (`lib/jobs.ts`)         |
| Deployment   | Vercel                                  |

---

## 📁 Project Structure

```
app/
  layout.tsx          # Root layout: providers, header, footer, metadata
  page.tsx            # Job listings page (search + filters + pagination)
  job/[id]/page.tsx   # Dynamic job details route
  bookmarks/page.tsx  # Saved jobs page
  not-found.tsx       # Custom 404
  globals.css         # Design tokens & theme

components/
  site-header.tsx     # Top nav + theme toggle
  site-footer.tsx     # Footer
  job-card.tsx        # Reusable job list item
  job-card-skeleton.tsx
  job-detail.tsx      # Full job details view (client component)
  apply-dialog.tsx    # Apply modal / bottom sheet
  theme-toggle.tsx    # Dark/light switch
  providers.tsx       # Theme + bookmarks context
  ui/                 # shadcn/ui primitives

lib/
  jobs.ts             # Mock job data + helper queries
  utils.ts            # cn() class helper

public/
  Task-2.pdf          # Original task brief
```

---

## 🚀 Getting Started

Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
# or: npm install && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `pnpm dev`      | Start the development server      |
| `pnpm build`    | Create a production build         |
| `pnpm start`    | Run the production build locally  |
| `pnpm lint`     | Lint the codebase                 |

---

## 🧭 Routing

| Route          | Description                          |
| -------------- | ------------------------------------ |
| `/`            | Job listings with search & filters   |
| `/job/[id]`    | Detailed view for a single job       |
| `/bookmarks`   | Jobs saved by the user               |
| `*`            | Custom not-found page                |

---

## 📊 Data Model

All data is mocked in `lib/jobs.ts`. Each job follows this shape:

```ts
type Job = {
  id: string
  title: string
  company: string
  logo: string
  location: string
  salary: string
  experience: string
  jobType: string        // Full-time, Part-time, ...
  workMode: string       // On-site, Remote, Hybrid
  postedAt: string
  applicants: number
  tags: string[]
  description: string
  responsibilities: string[]
  skills: string[]
  highlights: string[]
  about: string
}
```

Helper functions expose typed queries (`getAllJobs`, `getJobById`, `getSimilarJobs`, etc.) so the UI stays decoupled from the data source — swapping the mock layer for a real API later only touches `lib/jobs.ts`.

---

## ☁️ Deployment

This repository is linked to **Vercel**. Every merge to `main` deploys automatically. You can also deploy manually:

```bash
pnpm build
```

Then push to the connected repo, or click **Publish** in v0.

---

## 📄 License

This project was created for educational/assessment purposes (Task-2). The apna.co brand and design belong to their respective owners.
