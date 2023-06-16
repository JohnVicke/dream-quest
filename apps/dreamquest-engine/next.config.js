/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    serverActions: true,
    mdxRs: true,
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

module.exports = config;
