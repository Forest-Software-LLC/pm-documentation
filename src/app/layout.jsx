import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Lexend } from 'next/font/google'
import 'nextra-theme-docs/style.css'
import './globals.css'

/* Same font setup as forest-frontend (src/app/layout.tsx); globals.css
   points Nextra's --x-font-sans at this variable. */
const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata = {
  title: {
    default: 'Forest PM Docs',
    template: '%s | Forest PM Docs'
  },
  description:
    'Documentation for Forest PM, the package manager for Roblox and UEFN.'
}

/* Brand mark copied from the main site's header (forest-frontend
   src/app/_assets): forest-green SVG in light mode, electric variant in
   dark mode, swapped via the .fpm-logo-light/-dark classes in globals.css. */
const logo = (
  <span className="fpm-logo">
    <img src="/img/logo_small.svg" alt="" className="fpm-logo-mark fpm-logo-light" />
    <img src="/img/logo_small_dark.png" alt="" className="fpm-logo-mark fpm-logo-dark" />
    <b>Forest PM</b>
    <span className="fpm-logo-docs">Docs</span>
  </span>
)

const navbar = (
  <Navbar
    logo={logo}
    logoLink="/"
    projectLink="https://github.com/Forest-Software-LLC"
  >
    <a href="https://forest.dev" className="fpm-nav-link">
      forest.dev
    </a>
  </Navbar>
)

const footer = (
  <Footer>
    <div className="fpm-footer">
      <span>© {new Date().getFullYear()} Forest Software, LLC</span>
      <span className="fpm-footer-links">
        <a href="https://forest.dev">forest.dev</a>
        <a href="https://forest.dev/legal/tos">Terms</a>
        <a href="https://forest.dev/legal/privacy">Privacy</a>
      </span>
    </div>
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      className={lexend.variable}
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
        // Brand color, mirroring the main site: forest green (#0c854b) in
        // light mode, electric green (#c6ff39) in dark mode.
        color={{
          hue: { light: 151, dark: 77 },
          saturation: { light: 83, dark: 100 },
          lightness: { light: 28, dark: 61 }
        }}
        backgroundColor={{ light: '#ffffff', dark: '#0b0d0c' }}
      />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/Forest-Software-LLC/pm-documentation/tree/main"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
