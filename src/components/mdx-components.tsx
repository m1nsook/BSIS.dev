import type { MDXComponents } from "@ariadocs/mdx";
import { CodeBlock } from "@ariadocs/components";
import { MdxPre } from "@/components/mdx-pre";
import { Callout, Card, Cards } from "@/components/mdx-blocks";
import { Tab, Tabs } from "@/components/mdx-tabs";
import { FileTree } from "@/components/file-tree";

export const mdxComponents = {
  pre: MdxPre,
  table: (props: React.ComponentProps<"table">) => (
    <div className="my-6 w-full overflow-x-auto">
      <table {...props} />
    </div>
  ),
  Callout,
  Tab,
  Tabs,
  Card,
  Cards,
  CodeBlock,
  FileTree,
} as MDXComponents;
