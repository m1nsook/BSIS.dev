import Link from "next/link";
import { Docs } from "@ariadocs/components";
import type { ReactNode } from "react";
import { DocsSearchButton } from "@/components/docs-search";
import { DocsSidebar } from "@/components/docs-sidebar";
import { ThemeToggle } from "@/components/theme-controls";
import { getDocsNavigation } from "@/lib/docs-navigation";

/** Identical grid and sidebar for all guide and reference pages. */
export async function DocsShell({ children }: { children: ReactNode }) {
  const items = await getDocsNavigation();
  const navigation = <DocsSidebar items={items} baseHref="/docs" />;
  return (
    <div className="bsis-docs-shell">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-background px-3 lg:hidden">
        <Docs.MobileNav title="BSIS documentation navigation">
          <Link href="/docs" className="mb-5 flex items-center gap-2 text-sm font-semibold">
            <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background">B</span> BSIS Documentation
          </Link>
          <div className="mb-4"><DocsSearchButton /></div>
          {navigation}
          <div className="mt-8 border-t border-border pt-4"><ThemeToggle segmented /></div>
        </Docs.MobileNav>
        <Link href="/docs" className="inline-flex items-center gap-2 text-sm font-semibold">
          <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-md bg-foreground text-background">B</span> BSIS
        </Link>
        <div className="ml-auto flex items-center gap-1"><DocsSearchButton compact /><ThemeToggle /></div>
      </header>
      <Docs.Layout>
        <Docs.Sidebar className="!overflow-hidden !p-0">
          <div className="flex h-full flex-col">
            <div className="shrink-0 space-y-4 border-b border-border/50 px-4 pb-4 pt-5">
              <Link href="/docs" aria-label="BSIS documentation home" className="flex items-center gap-3 rounded-md px-2 py-1">
                <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background">B</span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold leading-5">BSIS</span>
                  <span className="text-xs text-muted-foreground">Documentation</span>
                </span>
              </Link>
              <DocsSearchButton />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">{navigation}</div>
            <div className="flex shrink-0 items-center justify-between border-t border-border px-5 py-3">
              <Link href="/" className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">BSIS website</Link>
              <ThemeToggle segmented />
            </div>
          </div>
        </Docs.Sidebar>
        {children}
      </Docs.Layout>
    </div>
  );
}
