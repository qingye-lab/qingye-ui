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
      { find: /^@yanqing\/ui\/locale$/, replacement: `${ui}src/locale.tsx` },
      { find: /^@yanqing\/ui\/locales\/(.*)$/, replacement: `${ui}src/locales/$1` },
      { find: /^@yanqing\/ui\/(.*\.css)$/, replacement: `${ui}$1` },
      { find: /^@\//, replacement: fileURLToPath(new URL("./src/", import.meta.url)) },
    ],
  },
  server: { port: 5180, strictPort: true },
});
