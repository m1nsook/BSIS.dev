import { notFound } from "next/navigation";
import { Docs } from "@ariadocs/components";
import { isMdxNotFound } from "@ariadocs/mdx";
import { DocsSidebar } from "@/components/docs-sidebar";
import { docs } from "@/lib/docs";

type Props = { params: Promise<{ slug?: string[] }> };

type Frontmatter = {
  title: string;
  description?: string;
};

export default async function DocsPage({ params }: Props) {
  const slug = (await params).slug?.join("/") ?? "";

  let page;
  try {
    page = await docs.parse<Frontmatter>({ slug });
  } catch (error) {
    if (isMdxNotFound(error)) notFound();
    throw error;
  }

  const items = await docs.getNavigation();
  const { MDX, frontmatter, toc } = page;

  return (
    <div className="bsis-docs-shell">
      <nav aria-label="Documentation pages" className="border-b border-border px-4 py-3 lg:hidden">
        <DocsSidebar items={items} baseHref="/docs" />
      </nav>
      <Docs.Layout>
        <Docs.Sidebar>
        <DocsSidebar items={items} baseHref="/docs" />
        </Docs.Sidebar>
        <Docs.Content>
        <Docs.Page>
          <Docs.Page.Title>{frontmatter.title}</Docs.Page.Title>
          {frontmatter.description ? (
            <Docs.Page.Description>{frontmatter.description}</Docs.Page.Description>
          ) : null}
          <Docs.Page.Content>{MDX}</Docs.Page.Content>
        </Docs.Page>
        </Docs.Content>
        <Docs.Aside>
        <Docs.Toc items={toc} />
        </Docs.Aside>
      </Docs.Layout>
    </div>
  );
}

export async function generateStaticParams() {
  const paths = await docs.getPagePaths();
  return paths.map((path) => ({ slug: path.split("/").filter(Boolean) }));
}
