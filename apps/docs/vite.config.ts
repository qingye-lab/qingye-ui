import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const ui = fileURLToPath(new URL("../../packages/ui/", import.meta.url));

// The docs consume the library from source so edits hot-reload without a build.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: /^@yanqing\/ui$/, replacement: `${ui}src/index.ts` },
      { find: /^@yanqing\/ui\/components\/(.*)$/, replacement: `${ui}src/components/$1` },
      { find: /^@yanqing\/ui\/hooks\/(.*)$/, replacement: `${ui}src/hooks/$1` },
      { find: /^@yanqing\/ui\/utils$/, replacement: `${ui}src/utils.ts` },
      { find: /^@yanqing\/ui\/locale$/, replacement: `${ui}src/locale.tsx` },
      { find: /^@yanqing\/ui\/locales\/(.*)$/, replacement: `${ui}src/locales/$1` },
      { find: /^@yanqing\/ui\/(.*\.css)(\?.*)?$/, replacement: `${ui}$1$2` },
      { find: /^@yanqing\/ui\/package\.json$/, replacement: `${ui}package.json` },
      { find: /^@\//, replacement: fileURLToPath(new URL("./src/", import.meta.url)) },
    ],
  },
  server: { port: 5180, strictPort: true },
  build: {
    rollupOptions: {
      output: {
        /*
         * The shell imports from the library's root entry, which re-exports
         * every component, so a single chunk would otherwise carry the whole
         * library plus its optional chart and table dependencies. Splitting the
         * heavy vendors keeps the first load to the components the shell uses;
         * each is fetched only when a page needs it.
         */
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("recharts") || id.includes("d3-") || id.includes("victory")) return "vendor-charts";
          if (id.includes("@tanstack")) return "vendor-table";
          if (id.includes("@base-ui") || id.includes("@floating-ui")) return "vendor-base-ui";
          if (id.includes("@daypicker") || id.includes("date-fns")) return "vendor-date";
          if (id.includes("react-dom") || id.includes("/react/") || id.includes("scheduler")) return "vendor-react";
          if (id.includes("react-router") || id.includes("@remix-run")) return "vendor-router";
          return "vendor";
        },
      },
    },
  },
});
