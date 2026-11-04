import type { NavItem } from "@ariadocs/core";
import { docs } from "@/lib/docs";

// Match AriaDocs' navigable hierarchy: a slim overview plus expandable
// topic groups. Folder entries are presentation only, not fake routes.
export async function getDocsNavigation(): Promise<NavItem[]> {
  const pages = await docs.getNavigation();
  const byHref = new Map(
    pages.map((page) => [page.href.replace(/^\/+|\/+$/g, ""), page]),
  );

  function page(slug: string): NavItem[] {
    const entry = byHref.get(slug);
    return entry ? [entry] : [];
  }

  function folder(title: string, key: string, slugs: string[]): NavItem {
    return {
      title,
      href: "/group/" + key,
      nav: true,
      props: {},
      items: slugs.flatMap(page),
    };
  }

  return [{
    title: "Documentation",
    href: "/group/documentation",
    nav: true,
    props: {},
    items: [
      ...page(""),
      folder("Getting started", "getting-started", ["getting-started", "prototype"]),
      folder("Guides", "guides", ["configuration", "packaging", "lifecycle", "uninstall", "installer-ui", "plugins"]),
      folder("Reference", "reference", ["cli", "security", "troubleshooting"]),
      folder("Project", "project", ["architecture", "vision", "roadmap", "faq"]),
    ],
  }];
}

export function flattenDocsNavigation(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => item.items.length ? flattenDocsNavigation(item.items) : [item]);
}
