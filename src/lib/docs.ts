import { createDocs } from "@ariadocs/mdx";
import { mdxComponents } from "@/components/mdx-components";
import { rehypeCodeMeta } from "@/lib/rehype-code-meta";
import {
  remarkGfm,
  rehypeSlug,
  rehypeAutolinkHeadings,
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
    rehypeCodeMeta,
    rehypePrism,
    rehypeCodeRaw,
  ],
});
