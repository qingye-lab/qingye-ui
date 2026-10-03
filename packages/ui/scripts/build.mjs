// Build: `tsc` has already emitted dist/. This script makes the output native
// ESM and compiles the precompiled stylesheet for projects without Tailwind.
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync, unlinkSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");

// 删除的公开组件不能借旧 dist 文件继续通过通配符入口导入；只清理可重建的组件产物。
const liveComponents = new Set(readdirSync(join(root, "src/components"))
  .filter((name) => /\.tsx?$/.test(name)).map((name) => name.replace(/\.tsx?$/, "")));
for (const name of readdirSync(join(dist, "components"))) {
  const match = name.match(/^(.*)(?:\.d\.ts|\.js)$/);
  if (match && !liveComponents.has(match[1])) unlinkSync(join(dist, "components", name));
}

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
//
// `source(none)` would otherwise emit only the classes the library's own source
// mentions, which makes the type steps a component happens not to use today
// (`text-chapter`, `text-metric`, …) invisible to consumers — they exist in
// theme.css but produce no rule. The inline list below pins the whole type
// ramp so every documented step is available in the precompiled stylesheet.
// Single source: src/text-steps.ts also feeds `cn()`'s tailwind-merge config,
// so a step cannot be known to one and missing from the other.
const stepsSource = readFileSync(join(root, "src/text-steps.ts"), "utf8");
const stepBlock = stepsSource.slice(stepsSource.indexOf("export const TEXT_STEPS"), stepsSource.indexOf("] as const;"));
const TEXT_STEPS = [...stepBlock.matchAll(/"([a-z][a-z-]*)"/g)].map((match) => match[1]);
if (TEXT_STEPS.length < 20) throw new Error(`Expected the type ramp in src/text-steps.ts, parsed ${TEXT_STEPS.length} steps`);
const TYPE_STEPS = TEXT_STEPS.map((step) => `text-${step}`);
const input = join(root, ".build-ui.css");
writeFileSync(
  input,
  `@import "tailwindcss" source(none);\n@source inline("${TYPE_STEPS.join(" ")}");\n@import "./styles.css";\n`,
);
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
