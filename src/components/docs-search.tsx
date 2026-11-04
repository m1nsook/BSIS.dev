"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Command, Search, X } from "lucide-react";
import type { DocsSearchEntry } from "@/lib/docs-search-index";

export function DocsSearch({ entries }: { entries: DocsSearchEntry[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return entries.slice(0, 8);
    return entries
      .map((entry) => {
        const title = entry.title.toLowerCase();
        const description = entry.description.toLowerCase();
        const body = entry.text.toLowerCase();
        if (!terms.every((term) => title.includes(term) || description.includes(term) || body.includes(term))) {
          return { entry, score: -1 };
        }
        const score = terms.reduce(
          (sum, term) => sum + (title.includes(term) ? 10 : 0) + (description.includes(term) ? 4 : 0) + (body.includes(term) ? 1 : 0),
          0,
        );
        return { entry, score };
      })
      .filter((result) => result.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((result) => result.entry);
  }, [entries, query]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setActive(0);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        aria-keyshortcuts="Control+K Meta+K"
        className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-muted/50 px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:w-48 lg:w-56"
      >
        <Search aria-hidden="true" className="size-4 shrink-0" />
        <span className="hidden flex-1 text-left sm:inline">Search docs...</span>
        <span className="hidden items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] sm:inline-flex">
          <Command className="size-3" aria-hidden="true" /> K
        </span>
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Search BSIS documentation"
        onClose={close}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
        className="fixed inset-x-4 top-[12vh] z-[100] m-auto w-[min(42rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border bg-popover p-0 text-popover-foreground shadow-2xl backdrop:bg-black/65"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => { setQuery(event.target.value); setActive(0); }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") { event.preventDefault(); setActive((index) => Math.min(index + 1, results.length - 1)); }
              if (event.key === "ArrowUp") { event.preventDefault(); setActive((index) => Math.max(index - 1, 0)); }
              if (event.key === "Enter" && results[active]) { event.preventDefault(); router.push(results[active].href); close(); }
            }}
            placeholder="Search pages, commands, configuration..."
            aria-label="Search query"
            aria-controls="bsis-search-results"
            className="h-14 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
          />
          <button type="button" onClick={close} aria-label="Close search" className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>
        <div id="bsis-search-results" className="max-h-[min(65vh,30rem)] overflow-y-auto p-2">
          {results.length ? (
            <ul className="space-y-1">
              {results.map((entry, index) => (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    onClick={close}
                    onMouseEnter={() => setActive(index)}
                    className={"block rounded-md px-3 py-2.5 outline-none transition-colors hover:bg-accent focus:bg-accent " + (index === active ? "bg-accent" : "")}
                  >
                    <span className="block text-sm font-medium">{entry.title}</span>
                    {entry.description ? <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{entry.description}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-9 text-center text-sm text-muted-foreground">No documentation matches that search.</p>
          )}
        </div>
        <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">Use ↑ ↓ to select, Enter to open, Esc to close</div>
      </dialog>
    </>
  );
}
