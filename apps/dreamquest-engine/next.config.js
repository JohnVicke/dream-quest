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
  transpilePackages: ["uploadthing", "@uploadthing/react"],
  images: {
    domains: ["uploadthing.com"],
  },
  redirects: () => [
    { source: "/settings", destination: "/settings/account", permanent: true },
  ],
};

module.exports = config;
