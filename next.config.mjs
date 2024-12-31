import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  // Ensure static files are copied to the out directory
  distDir: "out",
};

export default withPWA({
  dest: "out",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  publicExcludes: ["!icons/*"],
  buildExcludes: [/chunks\/.*$/],
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offline-cache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 1 * 60 * 60, // 1 hours
        },
      },
    },
  ],
})(nextConfig);
