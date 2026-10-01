// Build: `tsc` has already emitted dist/. This script makes the output native
// ESM and compiles the precompiled stylesheet for projects without Tailwind.
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync, unlinkSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");

// Node and browsers require explicit extensions on relative ESM specifiers.
const relativeSpecifier = /(\bfrom\s*["']|\bimport\s*\(?\s*["'])(\.{1,2}\/[^"']+)(["'])/g;
function addExtensions(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) addExtensions(path);
    else if (/\.(?:js|d\.ts)$/.test(path)) {
      const source = readFileSync(path, "utf8");
      const next = source.replace(relativeSpecifier, (match, start, target, end) =>
        /\.[a-z]+$/i.test(target) ? match : `${start}${target}.js${end}`,
      );
      if (next !== source) writeFileSync(path, next);
    }
  }
}
addExtensions(dist);

// Precompiled CSS: theme, utilities, motion and every class the components use.
const input = join(root, ".build-ui.css");
writeFileSync(input, '@import "tailwindcss" source(none);\n@import "./styles.css";\n');
try {
  execFileSync("pnpm", ["exec", "tailwindcss", "-i", input, "-o", join(dist, "ui.css"), "--minify"], {
    cwd: root,
    stdio: "inherit",
  });
} finally {
  unlinkSync(input);
}
const kb = (statSync(join(dist, "ui.css")).size / 1024).toFixed(1);
console.log(`dist/ui.css ${kb} KB`);
