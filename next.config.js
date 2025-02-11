/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['nl', 'en'],
    defaultLocale: 'nl',
    localeDetection: false, // This will prevent automatic locale detection
  },
  images: {
    domains: ['your-domain.com'],
  },
}

module.exports = nextConfig
