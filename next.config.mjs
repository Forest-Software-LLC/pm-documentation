import nextra from 'nextra'
 
// Set up Nextra with its configuration
const withNextra = nextra({
  // ... Add Nextra-specific options here
})
 
// Export the final Next.js config with Nextra included
export default withNextra({
  // Legal docs moved to the main site (forest-frontend, /legal/*); the
  // Studios section and the AI agents page moved under Features.
  async redirects() {
    return [
      { source: '/ai', destination: '/features/ai-agents', permanent: true },
      { source: '/studios/intro', destination: '/features/studios', permanent: true },
      { source: '/studios/:path*', destination: '/features/studios/:path*', permanent: true },
      { source: '/legal/terms', destination: 'https://forest.dev/legal/tos', permanent: true },
      { source: '/legal/privacy-policy', destination: 'https://forest.dev/legal/privacy', permanent: true },
      { source: '/legal/dmca', destination: 'https://forest.dev/legal/dmca', permanent: true },
      { source: '/legal/:path*', destination: 'https://forest.dev/legal', permanent: true },
    ]
  },
})