"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Docs } from "@ariadocs/components";
import type { NavItem } from "@ariadocs/core";

type Props = {
  items: NavItem[];
  baseHref?: string;
};

export function DocsSidebar({ items, baseHref }: Props) {
  return (
    <Docs.Nav
      items={items}
      baseHref={baseHref}
      activeHref={usePathname()}
      linkAs={Link}
    />
  );
}
