/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['nl', 'en'],
    defaultLocale: 'nl',
    localeDetection: false, // This will prevent automatic locale detection
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
