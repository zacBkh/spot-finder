/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'images.unsplash.com',
            'lh3.googleusercontent.com',
            'platform-lookaside.fbsbx.com',
            'res.cloudinary.com',
            'flagcdn.com',
            'www.datocms-assets.com',
        ],
    },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)
