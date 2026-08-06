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
```

Legal docs (terms, privacy, DMCA) live on the main site (forest-frontend, `/legal/*`); old `/legal/*` URLs here 308-redirect there via `redirects()` in [next.config.mjs](next.config.mjs).

## Commands
```bash
npm run dev     # next --turbopack -p 3003   (http://localhost:3003)
npm run build
npm run start
```

## Theming & custom components
Forest brand tokens (light: forest green; dark: electric `#C6FF39` on near-black) live in [src/app/globals.css](src/app/globals.css) as `--fpm-*` variables, mirroring `forest-frontend/src/styles/globals.css`; keep the two in sync. Nextra's primary color + page background are set via the `<Head color backgroundColor>` props in [src/app/layout.jsx](src/app/layout.jsx).

Custom MDX components in [src/components/index.jsx](src/components/index.jsx) are registered globally in [mdx-components.js](mdx-components.js), so content pages use them without imports (see `forest-cli/commands.mdx` for all three in use):
- `<Command cmd="forest install [package-name]" aliases={['forest i']} />` — syntax card; `<angle>` tokens render as required args, `[square]` as optional.
- `<Flags><Flag flag="-v, --version" arg="<version>">desc</Flag></Flags>` — options table.
- `<Terminal title="...">{`$ cmd\n> prompt\n🌳 done`}</Terminal>` — session transcript window (template-literal child); lines are styled by leading marker: `$` command, `>`/`?` prompt, `#` comment, 🌳/✓ success, ℹ/⚠ notice. Use it for interactive transcripts; keep plain ```bash fences for copyable one-liners.

## Writing docs
- Add a page: create `src/content/<section>/<page>.mdx` and register its title/position in that section's `_meta.js` (and the parent `_meta.js` for new sections).
- This repo **describes** the CLI and package workflow. When `forest-cli` commands or `forest.json` behavior change, update `forest-cli/*.mdx` and the relevant `concepts/` or `platforms/*` pages to match. New platform behavior goes under `platforms/<platform>/`; keep `concepts/` platform-neutral.
- Public-facing content avoids dashes as punctuation (no em/en dashes or spaced hyphens); use commas, colons, semicolons, or parentheses. Hyphenated words and identifiers (`forest-lock.json`, `two-manifest`, kebab scopes) are fine.
