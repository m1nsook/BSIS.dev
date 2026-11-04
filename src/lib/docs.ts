import { createDocs } from "@ariadocs/mdx";
import { mdxComponents } from "@/components/mdx-components";
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
  components: mdxComponents,
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    rehypeAutolinkHeadings,
    rehypeCodeTitles,
    rehypePrism,
    rehypeCodeRaw,
  ],
});
