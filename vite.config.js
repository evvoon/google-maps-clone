import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      strategies: "generateSW",
      registerType: "autoUpdate",
      manifest: {
        name: "Google Maps Clone",
        short_name: "MMap",
        description: "interactive map with navigation",
        theme_color: "white",
      },
      pwaAssets: {
        image: "public/icon.jpg",
        includeHtmlHeadLinks: true,
        preset: "minimal-2023",
      },
    }),
  ],
});
