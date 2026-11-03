import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Monitor, Package, Puzzle, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "BSIS — Build better Windows installers",
  description: "BSIS is an early-stage project exploring modern, customizable Windows installers, bootstrappers, updaters and uninstallers.",
};

const capabilities = [
  { title: "Design-first UI", description: "Explore custom installer interfaces using familiar web technologies.", Icon: Monitor },
  { title: "Native engine", description: "A proposed secure Windows installation core, independent of its UI.", Icon: Package },
  { title: "Terminal mode", description: "The same installation model through an interactive console.", Icon: Terminal },
  { title: "Extensible workflows", description: "A possible plugin model for steps, integrations and build tooling.", Icon: Puzzle },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-amber-500" aria-hidden="true" />
          Early design · No public installer release yet
        </span>
        <h1 className="mt-7 text-4xl font-semibold tracking-tight sm:text-6xl">
          Build installers like you build websites.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          BSIS (Better NSIS) is a proposed open-source installer framework for Windows.
          Design expressive installer experiences while a native engine handles installation,
          updates, uninstallation and system integration.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/docs" className="inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85">
            <BookOpen className="size-4" aria-hidden="true" /> Explore documentation <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href="/docs/architecture" className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium transition-colors hover:bg-muted">
            <Code2 className="size-4" aria-hidden="true" /> Architecture proposal
          </Link>
        </div>
      </div>
      <section className="mt-20 border-t border-border pt-10" aria-labelledby="explore-heading">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="explore-heading" className="text-2xl font-semibold tracking-tight">What we're exploring</h2>
            <p className="mt-2 text-sm text-muted-foreground">These are project goals, not shipped functionality.</p>
          </div>
          <Link href="/docs/roadmap" className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4">
            View roadmap <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {capabilities.map(({ title, description, Icon }) => (
            <div key={title} className="rounded-lg border border-border bg-card p-6">
              <Icon className="mb-4 size-5" aria-hidden="true" />
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
