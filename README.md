# BSIS.dev

Public documentation for **BSIS (Better NSIS)**, an early-stage Windows installer framework.

This repository is the **documentation website only**. The Rust installer engine is private during development. Every page should distinguish experimentally implemented functionality from proposals and should never present future features as working.

## Stack

- Next.js 16 (App Router), React 19 and TypeScript
- AriaDocs components and MDX content
- Tailwind CSS 4 and shadcn/ui
- Bun
- Static export to GitHub Pages

The documentation has grouped navigation, a content search index generated from MDX at build time (`Ctrl+K`), adjacent-page navigation and a command-line reference. The previous fake OpenAPI endpoint has been retired; BSIS has no HTTP service API.

## Run locally

~~~powershell
bun install --frozen-lockfile
bun run dev
~~~

## Verify a production build

~~~powershell
bun run lint
bunx tsc --noEmit
bun run build
~~~

The static site is emitted to `out/`. Local builds have no base path.

GitHub Pages builds use `NEXT_PUBLIC_BASE_PATH=/BSIS.dev`. Next.js applies this to routing and assets for `https://m1nsook.github.io/BSIS.dev/`.

## Publishing

The GitHub Actions workflow validates pull requests and publishes successful `main` builds. In **Settings → Pages**, set the source to **GitHub Actions**. Don't select deployment from a branch.

If a custom domain is introduced, update the base path and domain settings together.

## Documentation authorship

- Pages are MDX files under `content/docs/`.
- `content/docs/_meta.json` controls displayed titles and source page ordering.
- `src/lib/docs-navigation.ts` defines the grouped sidebar (update it when adding a page).
- Search content is derived from `docs.getPagePaths()` and the MDX source automatically; there is no separate search index to maintain.
- Keep relative cross-links local to `/docs`; prefer `./page/` in MDX pages.
- Mark unimplemented capabilities as **Proposed** or **Concept only**.

The `/reference` route describes real prototype commands and manifest behavior rather than an imaginary HTTP API.

## Source of truth

Keep docs in sync with the private BSIS core repository. The implemented Rust CLI and manifest schema take precedence over older aspirational examples.


## AriaDocs presentation components

The documentation uses `MdxPre` for styled, language-labeled and copyable fenced-code blocks. The `rehypeCodeMeta` plugin attaches optional code titles to the same block, rather than rendering a detached title above it; long lines wrap instead of producing a horizontal scrollbar. Its demo-like `Tabs` / `Tab`, `Callout`, and `Cards` / `Card` MDX components are registered in `src/components/mdx-components.tsx`.

Write a language after the code fence marker for syntax highlighting, and optionally add `title="example.ps1"` to display a code-file header. Copy buttons are available on every fenced code block.

Guides and the /reference index share `src/components/docs-shell.tsx`, including a persistent sidebar search field, page navigation and appearance controls. The marketing home retains its own header; do not add a second top header inside the documentation.


### File trees

Use the `<FileTree />` MDX component for nested project structures and package diagrams rather than fenced ASCII art. Pass a `title`, optional `description`, and an `items` array. Each item has a `name`, optional `kind` (`folder`, `file`, `executable`, `archive`, or `segment`), optional `detail`, and optional nested `children`. Branches are collapsible without JavaScript and the diagram can be copied as plain-text tree notation. See `content/docs/configuration.mdx` and `content/docs/packaging.mdx` for examples.
