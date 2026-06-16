<div align="center">

<img src="./public/icon.svg" width="64" height="64" alt="apna.co logo" />

# apna.co — Job Details Clone

**A pixel-inspired, fully responsive job portal** modeled on [apna.co](https://apna.co).  
Listings, rich job details, bookmarks, apply flow, dark/light theme — all built with Next.js & TypeScript.

**Built by [Pratik Shelar](https://github.com/Pratik-Ghrcemp)**

![Job Listings](./public/screenshots/home-light.png)

</div>

---

## Preview

| Job Details (Light) | Job Details (Dark) |
|---|---|
| ![Job Detail Light](./public/screenshots/job-detail-top.png) | ![Job Detail Dark](./public/screenshots/job-detail-dark.png) |

| Apply Modal | Mobile View |
|---|---|
| ![Apply Modal](./public/screenshots/apply-modal.png) | ![Mobile Detail](./public/screenshots/mobile-detail.png) |

---

## Features

- **Job Listings** (`/`) — keyword search with location, job-type, and work-mode filters; client-side pagination
- **Job Details** (`/job/[id]`) — the centerpiece:
  - Header card: role, company, salary, experience, applicant count, openings
  - Full description, key responsibilities, required skills
  - Company "About" section with founding info and headcount
  - Job highlights (ESOPs, remote-friendly, health insurance, etc.)
  - Similar jobs sidebar
  - Sticky **Apply** card on desktop; sticky **Apply** bar on mobile
- **Apply Flow** — modal form (bottom sheet on mobile) with validation and toast confirmation
- **Bookmarks** (`/bookmarks`) — save and revisit roles; persisted via `localStorage`
- **Share** — copy the job link to clipboard with a one-click toast
- **Dark / Light Theme** — system-aware toggle via `next-themes`
- **Responsive & Accessible** — semantic HTML, ARIA labels, keyboard navigation
- **Loading Skeletons** and a custom **404** page

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui + lucide-react |
| Theming | next-themes |
| Data | Typed mock JSON (`lib/jobs.ts`) |
| Deployment | Vercel |

---

## Project Structure

```
apna-co-job-clone/
├── app/
│   ├── layout.tsx            # Root layout: providers, header, footer, metadata
│   ├── page.tsx              # Job listings page (search + filters + pagination)
│   ├── globals.css           # Design tokens & Tailwind theme
│   ├── not-found.tsx         # Custom 404 page
│   ├── job/
│   │   └── [id]/page.tsx     # Dynamic job details route
│   └── bookmarks/
│       └── page.tsx          # Saved jobs page
├── components/
│   ├── site-header.tsx       # Top nav + theme toggle
│   ├── site-footer.tsx       # Footer
│   ├── job-card.tsx          # Reusable job list item card
│   ├── job-card-skeleton.tsx # Loading skeleton for job cards
│   ├── job-detail.tsx        # Full job details view (client component)
│   ├── apply-dialog.tsx      # Apply modal / bottom sheet
│   ├── theme-toggle.tsx      # Dark/light switch button
│   ├── providers.tsx         # Theme + bookmarks context providers
│   └── ui/                   # shadcn/ui primitives
├── lib/
│   ├── jobs.ts               # Mock job data + typed helper queries
│   └── utils.ts              # cn() class helper
└── public/
    ├── screenshots/          # App screenshots (used in docs)
    └── Task-2.pdf            # Original task brief
```

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production build locally |
| `pnpm lint` | Lint the codebase |

---

## Routes

| Route | Description |
|---|---|
| `/` | Job listings with search & filters |
| `/job/[id]` | Detailed view for a single job |
| `/bookmarks` | Jobs saved by the user |
| `*` | Custom not-found (404) page |

---

## Data Model

All data is mocked in `lib/jobs.ts`. Each job follows this typed shape:

```ts
type Job = {
  id: string
  title: string
  company: string
  logo: string
  location: string
  salary: string
  experience: string
  jobType: string        // "Full-time" | "Part-time" | "Contract" | "Internship"
  workMode: string       // "On-site" | "Remote" | "Hybrid"
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

Helper functions (`getAllJobs`, `getJobById`, `getSimilarJobs`) keep the UI decoupled from the data source — swapping mock data for a real API only requires changes in `lib/jobs.ts`.

---

## Deployment

The repository is connected to **Vercel**. Every push to `main` triggers an automatic production deploy.

```bash
# Manual production build
pnpm build
```

---

## Author

**Pratik Shelar**  
GitHub: [@Pratik-Ghrcemp](https://github.com/Pratik-Ghrcemp)

---

## License

This project was created for educational and assessment purposes (Task-2).  
The apna.co brand and design belong to their respective owners.
