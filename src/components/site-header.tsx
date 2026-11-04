"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Code2 } from "lucide-react";
import { DocsSearchButton } from "@/components/docs-search";
import { ThemeToggle } from "@/components/theme-controls";

/** The marketing homepage header. Docs use their own AriaDocs-style left sidebar. */
export function SiteHeader() {
  const pathname = usePathname();
  const isDocs = pathname === "/docs" || pathname.startsWith("/docs/");
  const isReference = pathname === "/reference" || pathname.startsWith("/reference/");
  if (isDocs || isReference) return null;

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-border/80 bg-background/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <Link href="/docs" className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
        <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-lg border border-border bg-foreground text-sm font-bold tracking-tight text-background">B</span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight">BSIS</span>
          <span className="text-[11px] text-muted-foreground">Documentation</span>
        </span>
      </Link>
      <nav aria-label="Primary navigation" className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <Link href="/docs" className="inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <BookOpen aria-hidden="true" className="size-4" /><span>Guides</span>
        </Link>
        <Link href="/reference" className="inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Code2 aria-hidden="true" className="size-4" /><span className="hidden sm:inline">Reference</span>
        </Link>
        <DocsSearchButton compact />
        <ThemeToggle />
      </nav>
    </header>
  );
}
