/**
 * Keep code-fence labels on the <pre> element, so our MDX code component can
 * render a single cohesive header instead of a detached .rehype-code-title.
 * This modifies the MDX syntax tree at build time; there is no browser script.
 */
type HastNode = {
  type?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  data?: { meta?: unknown };
  children?: HastNode[];
};

const TITLE = /(?:^|\s)title=(?:"([^"]*)"|'([^']*)')/;

export function rehypeCodeMeta() {
  return (tree: HastNode) => {
    function visit(node: HastNode): void {
      if (node.type === "element" && node.tagName === "pre") {
        const code = node.children?.find(
          (child) => child.type === "element" && child.tagName === "code",
        );
        if (code) {
          const classes = code.properties?.className;
          const classList = Array.isArray(classes)
            ? classes.filter((value): value is string => typeof value === "string")
            : typeof classes === "string" ? classes.split(/\s+/) : [];
          const languageClass = classList.find((value) => value.startsWith("language-"));
          const rawLanguage = languageClass?.slice("language-".length) ?? "";
          const separator = rawLanguage.indexOf(":");
          const language = separator >= 0 ? rawLanguage.slice(0, separator) : rawLanguage;
          const fileTitle = separator >= 0 ? rawLanguage.slice(separator + 1) : undefined;
          const meta = typeof code.data?.meta === "string" ? code.data.meta : "";
          const title = TITLE.exec(meta)?.slice(1).find(Boolean) ?? fileTitle;
          node.properties = {
            ...node.properties,
            ...(language ? { "data-language": language } : {}),
            ...(title ? { "data-title": title } : {}),
          };
          if (separator >= 0) {
            code.properties = {
              ...code.properties,
              className: classList.map((value) =>
                value === languageClass ? "language-" + language : value,
              ),
            };
          }
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
