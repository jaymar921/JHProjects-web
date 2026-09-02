import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "");
  const apiPort = env.PORT || "4000";

  return {
    plugins: [react(), tailwindcss()],

    server: {
      /**
       * In production the site and the API share an origin, because Vercel
       * serves /api/* from api/index.js alongside the static build. This proxy
       * reproduces that locally, so the browser code can always call /api/...
       * with no base URL and no environment specific branch.
       *
       * Run both halves together with: npm run dev:all
       */
      proxy: {
        "/api": {
          target: `http://localhost:${apiPort}`,
          changeOrigin: true,
        },
      },
    },

    build: {
      rollupOptions: {
        /**
         * Nine entry points, one app. Each plugin page carries the Open Graph
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
          graphicsUtils: resolve(import.meta.dirname, "2dgraphic-utils.html"),
          customEnchants2: resolve(
            import.meta.dirname,
            "custom-enchantments-2.html",
          ),
          moreFoods: resolve(import.meta.dirname, "more-foods-and-crops.html"),
          epicMobs: resolve(import.meta.dirname, "epic-mobs.html"),
        },
      },
    },
  };
});
