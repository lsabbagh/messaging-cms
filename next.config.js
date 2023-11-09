/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",
    distDir: process.env.NODE_ENV === 'production' ? "build" : null,
    trailingSlash: true,
}

module.exports = nextConfig
