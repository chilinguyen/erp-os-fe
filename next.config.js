/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    publicRuntimeConfig: {
        API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
        SECRET_JWT_KEY: process.env.NEXT_PUBLIC_SECRET_JWT_KEY ?? ""
    }
};

module.exports = nextConfig;
