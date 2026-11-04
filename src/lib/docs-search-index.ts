import { cache } from "react";
import { docs } from "@/lib/docs";

export type DocsSearchEntry = {
  title: string;
  description: string;
  href: string;
  text: string;
};

// Build the search index from the real MDX pages, not a separately-maintained list.
// This runs on the server at static export time; the browser needs no search service.
export const getDocsSearchEntries = cache(async (): Promise<DocsSearchEntry[]> => {
  const pages = await docs.getPagePaths();
  return Promise.all(
    pages.map(async (path) => {
      const slug = path.replace(/^\/+|\/+$/g, "");
      const [meta, source] = await Promise.all([
        docs.getFrontmatter<{ title: string; description?: string }>({ slug }),
        docs.read({ slug }),
      ]);
      const text = String(source)
        .replace(/^---[\s\S]*?---\s*/, "")
        .replace(/~~~[\s\S]*?~~~/g, " ")
        .replace(/`{3}[\s\S]*?`{3}/g, " ")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[\#*_`|<>]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      return {
        title: meta.title || slug || "Overview",
        description: meta.description || "",
        href: slug ? "/docs/" + slug : "/docs",
        text: text.slice(0, 12000),
      };
    }),
  );
});
