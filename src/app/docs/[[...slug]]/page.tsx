import Link from "next/link";
import { notFound } from "next/navigation";
import { Docs } from "@ariadocs/components";
import { isMdxNotFound } from "@ariadocs/mdx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { docs } from "@/lib/docs";
import { flattenDocsNavigation, getDocsNavigation } from "@/lib/docs-navigation";

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

  const items = await getDocsNavigation();
  const leaves = flattenDocsNavigation(items);
  const currentHref = "/" + slug;
  const position = leaves.findIndex((entry) => entry.href.replace(/\/$/, "") === currentHref.replace(/\/$/, ""));
  const previous = position > 0 ? leaves[position - 1] : null;
  const next = position >= 0 ? leaves[position + 1] : null;
  const { MDX, frontmatter, toc } = page;

  // The page content and TOC stay direct grid children of Docs.Layout in docs/layout.tsx.
  return (
    <>
      <Docs.Content>
        <Docs.Page>
          <Docs.Page.Title>{frontmatter.title}</Docs.Page.Title>
          {frontmatter.description ? <Docs.Page.Description>{frontmatter.description}</Docs.Page.Description> : null}
          <Docs.Page.Content>{MDX}</Docs.Page.Content>
          {(previous || next) ? (
            <nav aria-label="Adjacent documentation pages" className="mt-14 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
              {previous ? (
                <Link href={"/docs" + previous.href} className="group rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><ChevronLeft className="size-3.5" /> Previous</span>
                  <span className="mt-1 block text-sm font-semibold group-hover:underline">{previous.title}</span>
                </Link>
              ) : <div />}
              {next ? (
                <Link href={"/docs" + next.href} className="group rounded-lg border border-border p-4 text-right transition-colors hover:bg-muted/50">
                  <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">Next <ChevronRight className="size-3.5" /></span>
                  <span className="mt-1 block text-sm font-semibold group-hover:underline">{next.title}</span>
                </Link>
              ) : null}
            </nav>
          ) : null}
        </Docs.Page>
      </Docs.Content>
      <Docs.Aside>
        {toc.length ? <Docs.Toc items={toc} /> : <span aria-hidden="true" />}
      </Docs.Aside>
    </>
  );
}

export async function generateStaticParams() {
  const paths = await docs.getPagePaths();
  return paths.map((path) => ({ slug: path.split("/").filter(Boolean) }));
}
