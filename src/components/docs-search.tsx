"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Command, Search, X } from "lucide-react";
import type { DocsSearchEntry } from "@/lib/docs-search-index";

const SearchContext = createContext<(() => void) | null>(null);

export function DocsSearchProvider({ entries, children }: { entries: DocsSearchEntry[]; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <SearchContext.Provider value={() => setOpen(true)}>
      {children}
      {open ? <SearchDialog entries={entries} onClose={() => setOpen(false)} /> : null}
    </SearchContext.Provider>
  );
}

export function DocsSearchButton({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const open = useContext(SearchContext);
  if (compact) {
    return (
      <button type="button" onClick={() => open?.()} aria-label="Search documentation" aria-keyshortcuts="Control+K Meta+K"
        className={"inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground " + className}>
        <Search aria-hidden="true" className="size-[18px]" />
      </button>
    );
  }
  return (
    <button type="button" onClick={() => open?.()} aria-label="Search documentation" aria-keyshortcuts="Control+K Meta+K"
      className={"inline-flex h-9 w-full items-center gap-2 rounded-lg border border-border bg-card px-2.5 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground " + className}>
      <Search aria-hidden="true" className="size-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate text-left">Search documentation</span>
      <kbd className="hidden shrink-0 items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] sm:inline-flex">
        <Command aria-hidden="true" className="size-3" /> K
      </kbd>
    </button>
  );
}

function SearchDialog({ entries, onClose }: { entries: DocsSearchEntry[]; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    inputRef.current?.focus();
    return () => { if (dialog?.open) dialog.close(); };
  }, []);

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
      .filter((item) => item.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((item) => item.entry);
  }, [entries, query]);

  function go(entry: DocsSearchEntry) {
    onClose();
    router.push(entry.href);
  }

  return (
    <dialog ref={dialogRef} aria-label="Search BSIS documentation" onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      className="fixed inset-x-4 top-[12vh] z-[100] m-auto w-[min(42rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border bg-popover p-0 text-popover-foreground shadow-2xl backdrop:bg-black/65">
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input ref={inputRef} type="search" value={query}
          onChange={(event) => { setQuery(event.target.value); setActive(0); }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") { event.preventDefault(); setActive((n) => Math.min(n + 1, results.length - 1)); }
            if (event.key === "ArrowUp") { event.preventDefault(); setActive((n) => Math.max(n - 1, 0)); }
            if (event.key === "Enter" && results[active]) { event.preventDefault(); go(results[active]); }
          }}
          placeholder="Search pages, commands, configuration..." aria-label="Search query"
          className="h-14 w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden" />
        <button type="button" onClick={onClose} aria-label="Close search"
          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"><X aria-hidden="true" className="size-4" /></button>
      </div>
      <div className="max-h-[min(65vh,30rem)] overflow-y-auto p-2">
        {results.length ? (
          <ul className="space-y-1">
            {results.map((entry, index) => (
              <li key={entry.href}>
                <button type="button" onClick={() => go(entry)} onMouseEnter={() => setActive(index)}
                  className={"block w-full rounded-md px-3 py-2.5 text-left transition-colors hover:bg-accent focus:bg-accent " + (active === index ? "bg-accent" : "")}>
                  <span className="block text-sm font-medium">{entry.title}</span>
                  {entry.description ? <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{entry.description}</span> : null}
                </button>
              </li>
            ))}
          </ul>
        ) : <p className="px-3 py-9 text-center text-sm text-muted-foreground">No matching pages.</p>}
      </div>
      <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">↑ ↓ select · Enter open · Esc close</div>
    </dialog>
  );
}
