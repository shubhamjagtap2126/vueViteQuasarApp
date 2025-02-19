// FILE: vite.config.js

import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteSingleFile } from "vite-plugin-singlefile";
import { VitePWA } from "vite-plugin-pwa";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteSingleFile(),
    vue({
      template: { transformAssetUrls },
    }),
    tailwindcss(),
    // VitePWA({
    //   registerType: "autoUpdate", // or 'prompt'
    //   injectRegister: "auto",
    //   strategies: "injectManifest",
    //   // srcDir: "src", // Path to your service worker source file
    //   // filename: "service-worker.js", // Name of the service worker file
    //   workbox: {
    //     clientsClaim: true,
    //     skipWaiting: true,
    //     globPatterns: ["**/*.{js,jsx,vue,css,html,ico,png,svg}"], // Adjust as needed
    //   },
    //   manifest: {
    //     name: "My ViteVueQuasarSheet PWA App",
    //     short_name: "My VVQS App",
    //     description: "A cool Progressive Web App",
    //     categories: ["education", "webapp"],
    //     start_url: "/",
    //     display: "standalone",
    //     orientation: "portrait",
    //     background_color: "#3740ff",
    //     theme_color: "#fff",
    //     id: "/",
    //     lang: "en",
    //     icons: [
    //       {
    //         // src: "./images/192x192.png", // Path to your icon
    //         src: new URL("./images/96x96.png", import.meta.url).href,
    //         sizes: "96x96",
    //         type: "image/png",
    //       },
    //       {
    //         // src: "./images/192x192.png", // Path to your icon
    //         src: new URL("./images/192x192.png", import.meta.url).href,
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         // src: "./images/512x512.png",
    //         src: new URL("./images/512x512.png", import.meta.url).href,
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       // ... more icons (different sizes)
    //     ],
    //     // ... more manifest options
    //     shortcuts: [{ name: "Home", url: "/" }],
    //   },
    // }),
    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      sassVariables: fileURLToPath(new URL("./src/quasar-variables.sass", import.meta.url)),
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": path.resolve(__dirname, "./"), //
    },
  },
  server: {
    proxy: {
      // Example: Proxy API requests to a backend server
      "/api": {
        target: "http://localhost:8080", // Your backend URL
        changeOrigin: true,
      },
    },
  },
});
