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
    // HTML pages - NetworkFirst because we want fresh content when online
    {
      urlPattern: /\.html$/,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    // Static assets (JS, CSS) - CacheFirst because these rarely change
    {
      urlPattern: /\.(js|css)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    // Images and icons - CacheFirst with longer expiration
    {
      urlPattern: /\.(png|jpg|jpeg|svg|gif|ico)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      },
    },
    // Game data (localStorage is primary, this is backup)
    {
      urlPattern: /\/api\/.*|\/game/,
      handler: "NetworkFirst",
      options: {
        cacheName: "game-data",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
  ],
})(nextConfig);
