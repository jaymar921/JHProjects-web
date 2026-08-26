import { resolve } from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      /**
       * Five entry points, one app. Each plugin page carries the Open Graph
       * tags for its own link preview, because the crawlers that build those
       * previews do not run JavaScript and would otherwise only ever see
       * index.html. vercel.json serves each one for its route.
       */
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        customenchantments3: resolve(
          import.meta.dirname,
          "customenchantments3.html",
        ),
        kumandrasEconomy: resolve(
          import.meta.dirname,
          "kumandras-economy.html",
        ),
        customWarps: resolve(import.meta.dirname, "custom-warps.html"),
        fishingContest: resolve(import.meta.dirname, "fishing-contest.html"),
      },
    },
  },
});
