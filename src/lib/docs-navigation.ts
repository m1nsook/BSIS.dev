import type { NavItem } from "@ariadocs/core";
import { docs } from "@/lib/docs";

// Keep URLs stable while giving the documentation a deliberate information architecture.
const sections: { title: string; pages: string[] }[] = [
  { title: "Start here", pages: ["", "getting-started", "prototype"] },
  { title: "Guides", pages: ["configuration", "packaging", "installer-ui", "plugins"] },
  { title: "Reference", pages: ["cli", "security", "troubleshooting"] },
  { title: "Project", pages: ["architecture", "vision", "roadmap", "faq"] },
];

export async function getDocsNavigation(): Promise<NavItem[]> {
  const pages = await docs.getNavigation();
  const byHref = new Map(pages.map((page) => [page.href.replace(/^\/+|\/+$/g, ""), page]));
  return sections.map(({ title, pages: slugs }) => ({
    title,
    href: "",
    nav: true,
    props: {},
    items: slugs.flatMap((slug) => {
      const entry = byHref.get(slug);
      return entry ? [entry] : [];
    }),
  }));
}

export function flattenDocsNavigation(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => item.items.length ? flattenDocsNavigation(item.items) : [item]);
}
