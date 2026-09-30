import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
// Keep source imports friendly to the workspace, while shipping native ESM.
function visit(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) visit(path);
    else if (/\.(?:js|d\.ts)$/.test(path)) {
      const source = readFileSync(path, "utf8").replace(/(\bfrom\s*["']|\bimport\s*["'])(\.{1,2}\/[^"']+)(["'])/g,
        (match, start, target, end) => /\.[a-z]+$/i.test(target) ? match : `${start}${target}.js${end}`);
      writeFileSync(path, source);
    }
  }
}
visit(join(root, "dist"));
const foundation = readFileSync(join(root, "styles.css"), "utf8").replace(/^@source[^\n]*\n/gm, "");
// Match the semantic base treatment normally supplied by the host's Tailwind setup.
const defaults = "\n@layer base { *, ::before, ::after { border-color: var(--border); } body { background-color: var(--background); color: var(--foreground); font-family: var(--font-family-sans); } }\n";
const input = join(root, ".build-ui.css");
try {
  writeFileSync(input, '@import "tailwindcss" source(none);\n@import "tw-animate-css";\n@custom-variant dark (&:where(.dark, .dark *));\n@source "./src/**/*.{ts,tsx}";\n' + foundation + defaults + readFileSync(join(root, "motion.css"), "utf8") + readFileSync(join(root, "catalog-motion.css"), "utf8"));
  execFileSync("pnpm", ["exec", "tailwindcss", "-i", input, "-o", join(root, "dist/ui.css"), "--minify"], { cwd: root, stdio: "inherit" });
} finally { unlinkSync(input); }
