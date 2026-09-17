# pm-documentation

The documentation site for **forestpm** (a Roblox package manager). Built with **Nextra 4** on Next.js 15 / React 19, exported to static HTML and served by a Cloudflare Worker at **docs.forest.dev** (see Hosting).

> Part of the forestpm ecosystem. Full map in `../forest-backend/CLAUDE.md`.

## Structure
- Content is **MDX**, served by a single catch-all route: [src/app/[[...mdxPath]]/page.jsx](src/app/[[...mdxPath]]/page.jsx). Layout in [src/app/layout.jsx](src/app/layout.jsx); MDX component overrides in [mdx-components.js](mdx-components.js). Nextra config in [next.config.mjs](next.config.mjs).
- Docs pages live under [src/content/](src/content/). Sidebar/order is controlled by `_meta.js` files in each folder.

Docs are grouped by **core vs platform**, mirroring the CLI's platform seam: platform-neutral ideas live under `concepts/`, and per-platform mechanics live under `platforms/<platform>/`. A concepts page must not assume a platform; anything platform-specific (require vs `using`, `Packages/` vs `ForestPackages/`, aliases, Wally mirror) belongs under `platforms/`.

```
src/content/
  index.mdx
  features/      intro, installing, publishing, auditing, local-linking, private-packages, models, studios (+ studios/members, studios/permissions), mirrored-packages, ai-agents   (one overview page per feature, badged per platform, links into the deep docs)
  concepts/      intro, publishing, manifest, dependencies, private-packages   (platform-neutral)
  platforms/
    roblox/      intro, installing, anatomy, server-client, mirrored
    uefn/        intro, installing, authoring, collisions
  forest-cli/    install, commands
  open-source.mdx
  faq/           commonly-asked-questions
```

Legal docs (terms, privacy, DMCA) live on the main site (forest-frontend, `/legal/*`); old `/legal/*` URLs here 301-redirect there via [public/_redirects](public/_redirects) (Next's `redirects()` does not apply to a static export).

## Commands
```bash
npm run dev      # next --turbopack -p 3003   (http://localhost:3003)
npm run build    # static export into out/, then the pagefind index into out/_pagefind
npm run preview  # build, then serve out/ through wrangler dev (checks redirects + 404 page)
npm run deploy   # build, then wrangler deploy (the forest-docs Worker)
```

## Hosting
The site is a static export (`output: 'export'` in [next.config.mjs](next.config.mjs)): `npm run build` writes plain HTML into `out/` and the pagefind postbuild drops the search index into `out/_pagefind` (not `public/_pagefind`: Next copies `public/` into `out/` before postbuild runs). An assets-only Cloudflare Worker, `forest-docs` in [wrangler.jsonc](wrangler.jsonc) on the same account as forest-api, serves `out/` at **docs.forest.dev**; there is no server code, KV or R2, and nothing needs env vars or secrets. `out/404.html` is the not-found page and `auto-trailing-slash` maps `/quickstart` to `quickstart.html`. Redirects live in [public/_redirects](public/_redirects) (exact rules before splats, all 301) and cache headers in [public/_headers](public/_headers) (`_next/static/*` immutable; everything else is `max-age=0, must-revalidate` by default). Run `npm run preview` before deploying a redirect or 404 change; it serves the export through wrangler exactly as production does. Deploys run through Workers Builds on every push to `main` (build `npm run build`, deploy `npx wrangler deploy`, Node pinned to 22 by `.node-version`); `npm run deploy` from a laptop still works. `docs.forestpm.dev` is a zone redirect rule to this site.

## Theming & custom components
Forest brand tokens (light: forest green; dark: electric `#C6FF39` on near-black) live in [src/app/globals.css](src/app/globals.css) as `--fpm-*` variables, mirroring `forest-frontend/src/styles/globals.css`; keep the two in sync. Nextra's primary color + page background are set via the `<Head color backgroundColor>` props in [src/app/layout.jsx](src/app/layout.jsx).

Custom MDX components in [src/components/index.jsx](src/components/index.jsx) are registered globally in [mdx-components.js](mdx-components.js), so content pages use them without imports (see `forest-cli/commands.mdx` for all three in use):
- `<Command cmd="forest install [package-name]" aliases={['forest i']} />` — syntax card; `<angle>` tokens render as required args, `[square]` as optional.
- `<Flags><Flag flag="-v, --version" arg="<version>">desc</Flag></Flags>` — options table.
- `<Terminal title="...">{`$ cmd\n> prompt\n🌳 done`}</Terminal>` — session transcript window (template-literal child); lines are styled by leading marker: `$` command, `>`/`?` prompt, `#` comment, 🌳/✓ success, ℹ/⚠ notice. Use it for interactive transcripts; keep plain ```bash fences for copyable one-liners.
- `<PlatformBadges roblox uefn />` — platform compatibility pills, placed directly under the H1 of every `features/` page; pass only the platforms the feature supports (each badge links to that platform's intro). Badge icons are generic glyphs, never platform logos (trademarks).
- `<TileGrid><Tile href="/x" icon="bolt" title="...">desc</Tile></TileGrid>` — big landing-page navigation tiles with a faded corner icon (icons: `bolt`, `package`, `download`, `terminal`, `layers`, `sparkles`, `book`, `rocket`, `users`, `lock`, `leaf`; add new ones to `TILE_ICONS`, generic glyphs only). Used on the introduction page under the wordmark hero (`.fpm-hero`, `public/img/wordmark_{light,dark}.svg` swapped via the `.fpm-logo-light/-dark` classes).
- Plain GFM tables are automatically restyled: mdx-components.js maps `table`/`th`/`td`/`tr` to the `Table` override in [src/components/index.jsx](src/components/index.jsx), styled by `.fpm-table` in globals.css (rounded container, uppercase header, zebra rows). Just write normal markdown tables. For a before/after comparison table, wrap it in `<div className="fpm-compare">` (blank lines around the table) to tint column 2 red and column 3 green (see `concepts/intro.mdx`).

## Writing docs
- Add a page: create `src/content/<section>/<page>.mdx` and register its title/position in that section's `_meta.js` (and the parent `_meta.js` for new sections).
- This repo **describes** the CLI and package workflow. When `forest-cli` commands or `forest.json` behavior change, update `forest-cli/*.mdx` and the relevant `concepts/` or `platforms/*` pages to match. New platform behavior goes under `platforms/<platform>/`; keep `concepts/` platform-neutral.
- Public-facing content avoids dashes as punctuation (no em/en dashes or spaced hyphens); use commas, colons, semicolons, or parentheses. Hyphenated words and identifiers (`forest-lock.json`, `two-manifest`, kebab scopes) are fine.
