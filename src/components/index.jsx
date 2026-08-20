/*
  Custom MDX components for the docs. Registered globally in
  ../../mdx-components.js, so content pages can use them without imports.
  All of these are server-safe (no hooks, no browser APIs); styles live in
  src/app/globals.css under the .fpm-* classes.
*/

/* Platform registry for <PlatformBadges>. Colors live in globals.css under
   .fpm-platform-*; icons are inline so badges stay dependency-free. Icons are
   generic glyphs, not platform logos (trademarks). */
const PLATFORMS = {
  roblox: {
    label: 'Roblox',
    href: '/platforms/roblox/intro',
    className: 'fpm-platform-roblox',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
  },
  uefn: {
    label: 'UEFN',
    href: '/platforms/uefn/intro',
    className: 'fpm-platform-uefn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13 0 2 14h7l-2 10 11-14h-7L13 0Z" />
      </svg>
    ),
  },
}

/**
 * Platform compatibility badges, shown under a page's title. Each badge
 * links to that platform's intro page.
 *
 * <PlatformBadges roblox uefn />   // works on both
 * <PlatformBadges roblox />        // Roblox only
 */
export function PlatformBadges({ roblox, uefn }) {
  const keys = [roblox && 'roblox', uefn && 'uefn'].filter(Boolean)
  return (
    <div className="fpm-platforms">
      {keys.map(key => {
        const platform = PLATFORMS[key]
        return (
          <a
            key={key}
            href={platform.href}
            className={`fpm-platform-badge ${platform.className}`}
            title={`Available on ${platform.label}`}
          >
            {platform.icon}
            <span>{platform.label}</span>
          </a>
        )
      })}
    </div>
  )
}

/* Icon registry for <Tile>. Generic stroke glyphs, same rule as the platform
   badges: never third-party logos. */
const TILE_ICONS = {
  bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />,
  package: (
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5M12 15V3" />
    </>
  ),
  terminal: (
    <>
      <path d="m4 17 6-6-6-6" />
      <path d="M12 19h8" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
    </>
  ),
  sparkles: (
    <>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0Z" />
      <path d="M20 3v4M22 5h-4" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </>
  ),
}

/**
 * Big navigation tiles for landing pages, with a faded icon bleeding out of
 * the corner. Icons come from TILE_ICONS above.
 *
 * <TileGrid>
 *   <Tile href="/quickstart" icon="bolt" title="Quick Start">One-line description.</Tile>
 * </TileGrid>
 */
export function TileGrid({ children }) {
  return <div className="fpm-tiles">{children}</div>
}

export function Tile({ href, title, icon, children }) {
  return (
    <a href={href} className="fpm-tile">
      {icon && TILE_ICONS[icon] && (
        <svg
          className="fpm-tile-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {TILE_ICONS[icon]}
        </svg>
      )}
      <span className="fpm-tile-title">
        {title}
        <span className="fpm-tile-arrow" aria-hidden="true">
          →
        </span>
      </span>
      {/* div, not span: MDX wraps text children in a <p> */}
      {children && <div className="fpm-tile-desc">{children}</div>}
    </a>
  )
}

/**
 * Branded replacement for markdown tables. Registered over the default
 * `table` element in mdx-components.js, so every GFM table in the docs picks
 * it up automatically. The th/td/tr passthroughs below unhook Nextra's own
 * table styling so .fpm-table css owns the look.
 */
export function Table(props) {
  return (
    <div className="fpm-table-wrap">
      <table className="fpm-table" {...props} />
    </div>
  )
}

export const Th = props => <th {...props} />
export const Td = props => <td {...props} />
export const Tr = props => <tr {...props} />

/* Splits a command string into styled tokens: plain words are the command
   itself, <angle> tokens are required arguments, [square] tokens are
   optional ones. */
function renderCommandTokens(cmd) {
  return cmd.split(/(\s+)/).map((token, i) => {
    if (/^\s*$/.test(token)) return token
    if (token.startsWith('<')) {
      return (
        <span key={i} className="fpm-cmd-arg">
          {token}
        </span>
      )
    }
    if (token.startsWith('[')) {
      return (
        <span key={i} className="fpm-cmd-opt">
          {token}
        </span>
      )
    }
    return (
      <span key={i} className="fpm-cmd-word">
        {token}
      </span>
    )
  })
}

/**
 * Syntax card for a CLI command.
 *
 * <Command cmd="forest install [package-name]" aliases={['forest i', 'forest grow']} />
 */
export function Command({ cmd, aliases = [] }) {
  return (
    <div className="fpm-command">
      <code className="fpm-command-line">
        <span className="fpm-command-prompt">$</span>
        {renderCommandTokens(cmd)}
      </code>
      {aliases.length > 0 && (
        <span className="fpm-command-aliases">
          <span className="fpm-aliases-label">
            {aliases.length === 1 ? 'alias' : 'aliases'}
          </span>
          {aliases.map(alias => (
            <code key={alias} className="fpm-chip">
              {alias}
            </code>
          ))}
        </span>
      )}
    </div>
  )
}

/**
 * Options table for a command.
 *
 * <Flags>
 *   <Flag flag="-v, --version" arg="<version>">Install a specific version.</Flag>
 * </Flags>
 */
export function Flags({ title = 'Options', children }) {
  return (
    <div className="fpm-flags">
      <div className="fpm-flags-title">{title}</div>
      <dl className="fpm-flags-grid">{children}</dl>
    </div>
  )
}

export function Flag({ flag, arg, children }) {
  return (
    <div className="fpm-flag">
      <dt className="fpm-flag-term">
        {flag.split(',').map(name => (
          <code key={name} className="fpm-flag-name">
            {name.trim()}
          </code>
        ))}
        {arg && <span className="fpm-flag-arg">{arg}</span>}
      </dt>
      <dd className="fpm-flag-desc">{children}</dd>
    </div>
  )
}

/* Line classification for Terminal transcripts, keyed off the markers the
   CLI actually prints. */
function classifyLine(line) {
  if (line.startsWith('$')) return 'cmd'
  if (/^[>?] /.test(line)) return 'prompt'
  if (line.startsWith('#')) return 'comment'
  if (/^(🌳|✓|✔)/u.test(line)) return 'success'
  if (/^(ℹ|⚠)/u.test(line)) return 'info'
  return 'out'
}

/**
 * Terminal window for interactive session transcripts. Pass the transcript
 * as a template-literal child; lines are styled by their leading marker:
 * `$ ` commands, `> `/`? ` prompts, `#` comments, 🌳/✓ success, ℹ/⚠ notices.
 *
 * <Terminal title="forest init">
 * {`$ forest init
 * > Package name: my-package
 * 🌳 Initialized package "my-package"`}
 * </Terminal>
 */
export function Terminal({ title, children }) {
  const text = (Array.isArray(children) ? children.join('') : String(children ?? ''))
    .replace(/^\n+/, '')
    .replace(/\s+$/, '')

  return (
    <div className="fpm-terminal">
      <div className="fpm-terminal-bar">
        <span className="fpm-terminal-dot" />
        <span className="fpm-terminal-dot" />
        <span className="fpm-terminal-dot" />
        {title && <span className="fpm-terminal-title">{title}</span>}
      </div>
      <pre className="fpm-terminal-body">
        {text.split('\n').map((line, i) => {
          const kind = classifyLine(line)
          /* Pull the leading marker ($, >, ?) into its own span so it can
             carry the accent color. */
          const markerMatch = kind === 'cmd' || kind === 'prompt' ? /^[$>?] ?/.exec(line) : null
          return (
            <div key={i} className={`fpm-t-line fpm-t-${kind}`}>
              {markerMatch ? (
                <>
                  <span className="fpm-t-marker">{markerMatch[0]}</span>
                  {line.slice(markerMatch[0].length)}
                </>
              ) : (
                line || ' '
              )}
            </div>
          )
        })}
      </pre>
    </div>
  )
}
