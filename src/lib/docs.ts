import { createDocs } from "@ariadocs/mdx";
import {
  remarkGfm,
  rehypeSlug,
  rehypeAutolinkHeadings,
  rehypeCodeTitles,
  rehypePrism,
  rehypeCodeRaw,
} from "@ariadocs/mdx/plugins";

export const docs = createDocs({
  contentDir: "content/docs",
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    rehypeAutolinkHeadings,
    rehypeCodeTitles,
    rehypePrism,
    rehypeCodeRaw,
  ],
});
