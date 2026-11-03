# BSIS.dev

Public documentation for **BSIS (Better NSIS)**, an early-stage Windows installer framework project.

This repository contains the **documentation website only**. The BSIS engine is private while development is in progress. Documentation examples describe design ideas unless explicitly marked as implemented.

## Stack

- Next.js 16 (App Router), React 19 and TypeScript
- AriaDocs (MDX and OpenAPI reference scaffold)
- Tailwind CSS 4 and shadcn/ui
- Bun
- Static export to GitHub Pages

## Local development

```powershell
bun install --frozen-lockfile
bun run dev
```

Visit the address printed in the terminal.

## Verify the production build

```powershell
bun run lint
bunx tsc --noEmit
bun run build
```

The static site is emitted into `out/`. Local builds have no base path.

GitHub Pages builds set `NEXT_PUBLIC_BASE_PATH=/BSIS.dev`, since the repository is deployed as a project site at `https://m1nsook.github.io/BSIS.dev/`. Next.js uses this path for its router and static assets.

## Publishing

The `.github/workflows/pages.yml` workflow validates pull requests and deploys successful `main` builds using GitHub Actions. In repository **Settings → Pages**, set the source to **GitHub Actions**. Do not use a `gh-pages` branch.

If a custom domain is introduced, adjust the workflow base path and the GitHub Pages custom-domain settings together.

## Editing guides

Add or modify MDX pages under `content/docs/` and update `content/docs/_meta.json` to set sidebar order. Relative internal links work with both local development and GitHub Pages project paths.

The `openapi.yaml` file and `/reference` section are currently **examples only**, not a public BSIS service API.

Please keep planned features explicitly marked as proposals until supported by a tested release.
