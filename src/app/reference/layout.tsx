import { Docs, OpenAPI } from "@ariadocs/components";
import { DocsSidebar } from "@/components/docs-sidebar";
import { openapi } from "@/lib/openapi";

export default async function ReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const api = await openapi.parse();
  const items = await openapi.getNavigation({
    getOperationHref: (operation) => `/reference/${operation.id}`,
  });

  return (
    <OpenAPI.Root api={api} operationBaseHref="/reference">
      <div className="bsis-docs-shell">
        <nav aria-label="API endpoints" className="border-b border-border px-4 py-3 lg:hidden">
          <DocsSidebar items={items} />
        </nav>
        <Docs.Layout>
          <Docs.Sidebar>
          <DocsSidebar items={items} />
          </Docs.Sidebar>
          <Docs.Content>{children}</Docs.Content>
        </Docs.Layout>
      </div>
    </OpenAPI.Root>
  );
}
