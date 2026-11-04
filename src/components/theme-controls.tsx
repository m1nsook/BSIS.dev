"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

function isDark(): boolean {
  const saved = window.localStorage.getItem("bsis-theme");
  return saved === "dark" || (saved !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

function subscribe(callback: () => void): () => void {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener("storage", callback);
  window.addEventListener("bsis-theme-change", callback);
  media.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("bsis-theme-change", callback);
    media.removeEventListener("change", callback);
  };
}

/** Keeps theme persistence alive when the site header is not rendered on docs pages. */
export function ThemeSync() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return null;
}

export function ThemeToggle({ segmented = false }: { segmented?: boolean }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  function change(next: "light" | "dark") {
    window.localStorage.setItem("bsis-theme", next);
    window.dispatchEvent(new Event("bsis-theme-change"));
  }

  if (segmented) {
    return (
      <div role="group" aria-label="Appearance" className="flex items-center gap-0.5 rounded-full border border-border bg-background p-0.5">
        <button type="button" aria-label="Use light theme" aria-pressed={!dark} onClick={() => change("light")}
          className={"inline-flex size-7 items-center justify-center rounded-full transition-colors " + (!dark ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}>
          <Sun aria-hidden="true" className="size-3.5" />
        </button>
        <button type="button" aria-label="Use dark theme" aria-pressed={dark} onClick={() => change("dark")}
          className={"inline-flex size-7 items-center justify-center rounded-full transition-colors " + (dark ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}>
          <Moon aria-hidden="true" className="size-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => change(dark ? "light" : "dark")}
      aria-label={dark ? "Use light theme" : "Use dark theme"}
      title={dark ? "Use light theme" : "Use dark theme"}
      className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
      {dark ? <Sun aria-hidden="true" className="size-4" /> : <Moon aria-hidden="true" className="size-4" />}
    </button>
  );
}
