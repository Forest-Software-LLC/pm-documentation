import nextra from 'nextra'
 
// Set up Nextra with its configuration
const withNextra = nextra({
  // ... Add Nextra-specific options here
})
 
// Export the final Next.js config with Nextra included
export default withNextra({
  // Legal docs moved to the main site (forest-frontend, /legal/*).
  async redirects() {
    return [
      { source: '/legal/terms', destination: 'https://forest.dev/legal/tos', permanent: true },
      { source: '/legal/privacy-policy', destination: 'https://forest.dev/legal/privacy', permanent: true },
      { source: '/legal/dmca', destination: 'https://forest.dev/legal/dmca', permanent: true },
      { source: '/legal/:path*', destination: 'https://forest.dev/legal', permanent: true },
    ]
  },
})