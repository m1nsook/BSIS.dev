import { Docs } from "@ariadocs/components";
import { DocsSidebar } from "@/components/docs-sidebar";
import { getDocsNavigation } from "@/lib/docs-navigation";

export default async function ReferenceLayout({ children }: { children: React.ReactNode }) {
  const items = await getDocsNavigation();
  return (
    <div className="bsis-docs-shell">
      <details className="border-b border-border lg:hidden">
        <summary className="cursor-pointer px-5 py-3 text-sm font-medium">Browse documentation</summary>
        <nav aria-label="Documentation pages" className="max-h-[55vh] overflow-y-auto border-t border-border px-4 py-3">
          <DocsSidebar items={items} baseHref="/docs" />
        </nav>
      </details>
      <Docs.Layout>
        <Docs.Sidebar>
          <div className="px-3 pt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Documentation</div>
          <DocsSidebar items={items} baseHref="/docs" />
        </Docs.Sidebar>
        <Docs.Content>{children}</Docs.Content>
        <Docs.Aside>
          <Docs.Toc
            items={[
              { href: "#available-reference-guides", value: "Available reference guides", depth: 2 },
              { href: "#public-availability", value: "Public availability", depth: 2 },
            ]}
          />
        </Docs.Aside>
      </Docs.Layout>
    </div>
  );
}
