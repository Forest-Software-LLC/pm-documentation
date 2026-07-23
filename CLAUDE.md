# pm-documentation

The documentation site for **forestpm** (a Roblox package manager). Built with **Nextra 4** on Next.js 15 / React 19.

> Part of the forestpm ecosystem. Full map in `../forest-backend/CLAUDE.md`.

## Structure
- Content is **MDX**, served by a single catch-all route: [src/app/[[...mdxPath]]/page.jsx](src/app/[[...mdxPath]]/page.jsx). Layout in [src/app/layout.jsx](src/app/layout.jsx); MDX component overrides in [mdx-components.js](mdx-components.js). Nextra config in [next.config.mjs](next.config.mjs).
- Docs pages live under [src/content/](src/content/). Sidebar/order is controlled by `_meta.js` files in each folder.

Docs are grouped by **core vs platform**, mirroring the CLI's platform seam: platform-neutral ideas live under `concepts/`, and per-platform mechanics live under `platforms/<platform>/`. A concepts page must not assume a platform; anything platform-specific (require vs `using`, `Packages/` vs `ForestPackages/`, aliases, Wally mirror) belongs under `platforms/`.

```
src/content/
  index.mdx
  concepts/      intro, publishing, manifest, dependencies, private-packages   (platform-neutral)
  platforms/
    roblox/      intro, installing, anatomy, server-client, mirrored
    uefn/        intro, installing, authoring, collisions
  forest-cli/    install, commands
  studios/       intro, members, permissions
  open-source.mdx
  faq/           commonly-asked-questions
  legal/         terms, privacy-policy, dmca
```

## Commands
```bash
npm run dev     # next --turbopack -p 3003   (http://localhost:3003)
npm run build
npm run start
```

## Writing docs
- Add a page: create `src/content/<section>/<page>.mdx` and register its title/position in that section's `_meta.js` (and the parent `_meta.js` for new sections).
- This repo **describes** the CLI and package workflow. When `forest-cli` commands or `forest.json` behavior change, update `forest-cli/*.mdx` and the relevant `concepts/` or `platforms/*` pages to match. New platform behavior goes under `platforms/<platform>/`; keep `concepts/` platform-neutral.
- Public-facing content avoids dashes as punctuation (no em/en dashes or spaced hyphens); use commas, colons, semicolons, or parentheses. Hyphenated words and identifiers (`forest-lock.json`, `two-manifest`, kebab scopes) are fine.
