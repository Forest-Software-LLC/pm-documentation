import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs' // nextra-theme-blog or your custom theme
import { Command, Flag, Flags, PlatformBadges, Table, Td, Terminal, Th, Tr } from './src/components'

// Get the default MDX components
const themeComponents = getThemeComponents()

// Merge components. Custom docs components (Command, Flags, Terminal) are
// registered globally so content pages can use them without importing.
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    Command,
    Flag,
    Flags,
    PlatformBadges,
    Terminal,
    // Markdown table elements, restyled via .fpm-table in globals.css
    table: Table,
    th: Th,
    td: Td,
    tr: Tr,
    ...components
  }
}
