import { resolve } from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      /**
       * Two entry points, one app. customenchantments3.html carries the Open
       * Graph tags for its own link preview, because the crawlers that build
       * those previews do not run JavaScript and would otherwise only ever see
       * index.html. vercel.json serves it for /customenchantments3.
       */
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        customenchantments3: resolve(
          import.meta.dirname,
          "customenchantments3.html",
        ),
      },
    },
  },
});
