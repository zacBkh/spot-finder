/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    },
    images: {
        domains: [
            'images.unsplash.com',
            'tailwindui.com',
            'lh3.googleusercontent.com',
            'platform-lookaside.fbsbx.com',
            'res.cloudinary.com',
            'flagcdn.com',
        ],
    },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)
