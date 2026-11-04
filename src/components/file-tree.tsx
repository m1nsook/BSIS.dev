import type { ReactNode } from "react";
import {
  ChevronRight,
  FileArchive,
  FileJson2,
  FileText,
  Folder,
  Layers,
  ListTree,
} from "lucide-react";
import { CopyButton } from "@ariadocs/components";

/**
 * Reusable, dependency-free MDX file tree.
 *
 * Folder-like items with children expand and collapse using native <details>.
 * The same structure is also available as text via the header copy button.
 */
export type FileTreeItem = {
  name: string;
  kind?: "folder" | "file" | "executable" | "archive" | "segment";
  detail?: string;
  children?: FileTreeItem[];
};

type FileTreeProps = {
  title?: string;
  description?: string;
  items: FileTreeItem[];
};

function formatTree(items: FileTreeItem[]): string {
  const lines: string[] = [];

  function visit(nodes: FileTreeItem[], prefix = "") {
    nodes.forEach((node, index) => {
      const last = index === nodes.length - 1;
      const suffix = node.kind === "folder" ? "/" : "";
      const detail = node.detail ? ` — ${node.detail}` : "";
      lines.push(`${prefix}${last ? "└── " : "├── "}${node.name}${suffix}${detail}`);
      if (node.children?.length) {
        visit(node.children, prefix + (last ? "    " : "│   "));
      }
    });
  }

  if (items.length === 1) {
    const root = items[0];
    const suffix = root.kind === "folder" ? "/" : "";
    lines.push(root.name + suffix);
    if (root.children?.length) visit(root.children);
  } else {
    visit(items);
  }

  return lines.join("\n");
}

function NodeIcon({ kind }: { kind: NonNullable<FileTreeItem["kind"]> }) {
  switch (kind) {
    case "folder":
      return <Folder aria-hidden="true" className="size-4 shrink-0 text-amber-500 dark:text-amber-400" />;
    case "executable":
      return <FileArchive aria-hidden="true" className="size-4 shrink-0 text-violet-500 dark:text-violet-400" />;
    case "archive":
      return <Layers aria-hidden="true" className="size-4 shrink-0 text-sky-600 dark:text-sky-400" />;
    case "segment":
      return <FileText aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />;
    default:
      return <FileJson2 aria-hidden="true" className="size-4 shrink-0 text-blue-600 dark:text-blue-400" />;
  }
}

function NodeLabel({ node }: { node: FileTreeItem }) {
  return (
    <>
      <NodeIcon kind={node.kind ?? "file"} />
      <span className="min-w-0 break-words text-foreground">{node.name}</span>
      {node.detail ? (
        <span className="min-w-0 break-words text-xs text-muted-foreground">{node.detail}</span>
      ) : null}
    </>
  );
}

function NodeList({ items }: { items: FileTreeItem[] }) {
  return (
    <ul className="m-0 list-none space-y-0.5 p-0">
      {items.map((item, index) => {
        const key = item.name + "-" + index;
        const hasChildren = Boolean(item.children?.length);
        return (
          <li key={key} className="m-0 list-none p-0">
            {hasChildren ? (
              <details open className="group/branch">
                <summary className="flex min-h-8 cursor-pointer list-none items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                  <ChevronRight
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-muted-foreground transition-transform group-open/branch:rotate-90"
                  />
                  <NodeLabel node={item} />
                </summary>
                <div className="ml-[15px] border-l border-border/80 pl-4">
                  <NodeList items={item.children ?? []} />
                </div>
              </details>
            ) : (
              <div className="flex min-h-8 items-center gap-2 rounded-md px-2 py-1 pl-[30px] text-sm">
                <NodeLabel node={item} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function FileTree({ title = "File structure", description, items }: FileTreeProps): ReactNode {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-[var(--aria-code-background)]">
      <figcaption className="flex min-h-11 items-center gap-2 border-b border-border px-3 py-2 sm:px-4">
        <ListTree aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
        <span className="min-w-0 flex-1 text-sm font-medium text-foreground">{title}</span>
        <CopyButton value={formatTree(items)} className="shrink-0 border border-border bg-background/60" />
      </figcaption>
      <div className="px-2 py-3 font-mono sm:px-3">
        <NodeList items={items} />
      </div>
      {description ? (
        <div className="border-t border-border px-4 py-2.5 text-xs leading-relaxed text-muted-foreground">
          {description}
        </div>
      ) : null}
    </figure>
  );
}
