import type { MDXComponents } from "@ariadocs/mdx";
import { CodeBlock, Pre } from "@ariadocs/components";
import { Callout, Card, Cards } from "@/components/mdx-blocks";
import { Tab, Tabs } from "@/components/mdx-tabs";

export const mdxComponents = {
  pre: Pre,
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
} as MDXComponents;
