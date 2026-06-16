import { Globe, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-base font-bold text-primary-foreground">
                a
              </span>
              <span className="text-lg font-bold tracking-tight">
                apna<span className="text-primary">.co</span>
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Discover jobs, explore company details and apply in a few clicks — a responsive job details experience
              built for Task-2.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Browse jobs
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="transition-colors hover:text-primary">
                  Saved jobs
                </Link>
              </li>
              <li>
                <a
                  href="/Task-2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  Task-2 PDF
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Connect</h4>
            <p className="mt-3 text-sm text-muted-foreground">support@apna-clone.test</p>
            <div className="mt-3 flex gap-3 text-muted-foreground">
              <Globe className="size-5 transition-colors hover:text-primary" />
              <MessageCircle className="size-5 transition-colors hover:text-primary" />
              <Mail className="size-5 transition-colors hover:text-primary" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>© 2026 apna.co clone — built by Pratik Shelar.</span>
          <span>Responsive Job Details Page — Task-2</span>
        </div>
      </div>
    </footer>
  )
}
