"use client"

import { ThemeProvider } from "next-themes"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

/* ---------------- Bookmarks ---------------- */

type BookmarkContextType = {
  bookmarks: number[]
  toggleBookmark: (id: number) => void
  isBookmarked: (id: number) => boolean
  ready: boolean
}

const BookmarkContext = createContext<BookmarkContextType | null>(null)

const STORAGE_KEY = "apna:bookmarks"

function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<number[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setBookmarks(JSON.parse(raw))
    } catch {
      /* ignore */
    }
    setReady(true)
  }, [])

  const toggleBookmark = useCallback((id: number) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const isBookmarked = useCallback((id: number) => bookmarks.includes(id), [bookmarks])

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, ready }}>
      {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext)
  if (!ctx) throw new Error("useBookmarks must be used within Providers")
  return ctx
}

/* ---------------- Toast ---------------- */

type Toast = { id: number; message: string; type: "success" | "error" }
type ToastContextType = { showToast: (message: string, type?: "success" | "error") => void }

const ToastContext = createContext<ToastContextType | null>(null)

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg animate-in slide-in-from-bottom-4 fade-in ${
              t.type === "success" ? "bg-emerald-600" : "bg-destructive"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within Providers")
  return ctx
}

/* ---------------- Root ---------------- */

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <BookmarkProvider>
        <ToastProvider>{children}</ToastProvider>
      </BookmarkProvider>
    </ThemeProvider>
  )
}
