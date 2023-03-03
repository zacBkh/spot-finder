/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
}

module.exports = {
    images: {
        domains: [
            'images.unsplash.com',
            'tailwindui.com',
            'lh3.googleusercontent.com',
            'platform-lookaside.fbsbx.com',
        ],
    },
}
