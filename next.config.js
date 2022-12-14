/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.pokemon.com', 'raw.githubusercontent.com']
  },
  swcMinify: true,
  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'en',
    localeDetection: false
  }
}

module.exports = nextConfig
