# pm-documentation

The documentation site for **forestpm** (a Roblox package manager). Built with **Nextra 4** on Next.js 15 / React 19.

> Part of the forestpm ecosystem. Full map in `../forest-backend/CLAUDE.md`.

## Structure
- Content is **MDX**, served by a single catch-all route: [src/app/[[...mdxPath]]/page.jsx](src/app/[[...mdxPath]]/page.jsx). Layout in [src/app/layout.jsx](src/app/layout.jsx); MDX component overrides in [mdx-components.js](mdx-components.js). Nextra config in [next.config.mjs](next.config.mjs).
- Docs pages live under [src/content/](src/content/). Sidebar/order is controlled by `_meta.js` files in each folder.

```
src/content/
  index.mdx
  forest-cli/    commands.mdx, install.mdx
  packages/      intro.mdx, create.mdx, usage.mdx
  faq/           commonly-asked-questions.mdx
  legal/         terms.mdx, privacy-policy.mdx, dmca.mdx
```

## Commands
```bash
npm run dev     # next --turbopack -p 3003   (http://localhost:3003)
npm run build
npm run start
```

## Writing docs
- Add a page: create `src/content/<section>/<page>.mdx` and register its title/position in that section's `_meta.js` (and the parent `_meta.js` for new sections).
- This repo **describes** the CLI and package workflow — when `forest-cli` commands or `forest.json` behavior change, update `forest-cli/*.mdx` and `packages/*.mdx` here to match.
