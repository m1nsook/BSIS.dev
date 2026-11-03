"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Code2, Moon, Sun } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("bsis-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved === "dark" || (saved !== "light" && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    document.documentElement.classList.toggle("dark", nextDark);
    window.localStorage.setItem("bsis-theme", nextDark ? "dark" : "light");
    setDark(nextDark);
  }

  const isDocs = pathname === "/docs" || pathname.startsWith("/docs/");
  const isApi = pathname === "/reference" || pathname.startsWith("/reference/");

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center border-b border-border/80 bg-background/90 px-4 backdrop-blur-xl sm:px-6 lg:px-10">
      <Link href="/docs" className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
        <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-lg border border-border bg-foreground text-sm font-bold tracking-tight text-background">B</span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight">BSIS</span>
          <span className="text-[11px] text-muted-foreground">Documentation</span>
        </span>
      </Link>
      <nav aria-label="Primary navigation" className="ml-auto flex items-center gap-1 sm:gap-2">
        <Link href="/docs" aria-current={isDocs ? "page" : undefined} className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-xs font-medium transition-colors sm:text-sm ${isDocs ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"}`}>
          <BookOpen aria-hidden="true" className="size-4" />
          <span>Guides</span>
        </Link>
        <Link href="/reference" aria-current={isApi ? "page" : undefined} className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-xs font-medium transition-colors sm:text-sm ${isApi ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"}`}>
          <Code2 aria-hidden="true" className="size-4" />
          <span>API</span>
        </Link>
        <span className="mx-1 h-5 w-px bg-border sm:mx-2" aria-hidden="true" />
        <button type="button" onClick={toggleTheme} aria-label={dark ? "Use light theme" : "Use dark theme"} title={dark ? "Use light theme" : "Use dark theme"} className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          {dark ? <Sun aria-hidden="true" className="size-4" /> : <Moon aria-hidden="true" className="size-4" />}
        </button>
      </nav>
    </header>
  );
}
