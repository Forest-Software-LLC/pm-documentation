import nextra from 'nextra'

// Set up Nextra with its configuration
const withNextra = nextra({
  // ... Add Nextra-specific options here
})

// Export the final Next.js config with Nextra included.
// The site is a static export served by a Cloudflare Worker (see
// wrangler.jsonc): `next build` writes plain HTML into out/, and redirects
// live in public/_redirects because Next's redirects() is ignored under
// `output: 'export'`.
export default withNextra({
  output: 'export',
  images: {
    unoptimized: true
  }
})
