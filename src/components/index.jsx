/*
  Custom MDX components for the docs. Registered globally in
  ../../mdx-components.js, so content pages can use them without imports.
  All of these are server-safe (no hooks, no browser APIs); styles live in
  src/app/globals.css under the .fpm-* classes.
*/

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
