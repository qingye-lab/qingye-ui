import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { test } from "node:test";

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const { parse } = createRequire(join(repo, "packages/ui/package.json"))("postcss");

/**
 * The docs site once ran on Tailwind's literal size scale (262 uses of
 * `text-sm`/`text-xs`/… plus 41 arbitrary `text-[…rem]` values) beside the
 * library's own steps, so a type decision was written two ways and weight came
 * from whatever `font-*` sat nearby. Sizes are now named steps; this keeps a
 * literal from creeping back in silence.
 *
 * `em`-based sizes are included: `text-[0.6em]` on a 32px heading rendered
 * 19.2px and `0.85em` on 14px body copy rendered 11.9px — sizes no step names,
 * invisible to a search for rem values.
 */
const LITERAL_SIZE = /\btext-(?:xs|sm|base|lg|xl|2xl|3xl|4xl)\b|\btext-\[[0-9.]+(?:rem|em)\]/;

function sourceFiles(dir) {
  const files = [];
  const walk = (current) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const path = join(current, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (/\.tsx$/.test(entry.name)) files.push(path);
    }
  };
  walk(dir);
  return files;
}

/** Weights that duplicate what the step already sets. */
const REDUNDANT = [
  /\bfont-semibold\s+text-(?:display|title|heading|chapter|lead|metric)\b/,
  /\btext-(?:display|title|heading|chapter|lead|metric)\s+font-semibold\b/,
  /\bfont-normal\s+text-(?:body|caption|reading|prose)\b/,
  /\btext-(?:body|caption|reading|prose)\s+font-normal\b/,
];

const linesOf = (file) => readFileSync(file, "utf8").split("\n");

test("docs source uses named type steps, not Tailwind's literal size scale", () => {
  const offenders = [];
  for (const file of sourceFiles(join(repo, "apps/docs/src"))) {
    linesOf(file).forEach((line, index) => {
      const match = line.match(LITERAL_SIZE);
      if (match) offenders.push(`${file.replace(`${repo}/`, "")}:${index + 1}  ${match[0]}  ${line.trim().slice(0, 90)}`);
    });
  }
  assert.deepEqual(offenders, [], `literal font sizes remain:\n${offenders.join("\n")}`);
});

test("a type step carries its own weight instead of repeating it at the call site", () => {
  const offenders = [];
  for (const file of sourceFiles(join(repo, "apps/docs/src"))) {
    linesOf(file).forEach((line, index) => {
      if (REDUNDANT.some((pattern) => pattern.test(line))) {
        offenders.push(`${file.replace(`${repo}/`, "")}:${index + 1}  ${line.trim().slice(0, 90)}`);
      }
    });
  }
  assert.deepEqual(offenders, [], `weights repeat the step:\n${offenders.join("\n")}`);
});

test("every documented type step is pinned in the precompiled stylesheet", () => {
  // theme.css names the steps; src/text-steps.ts is the list `cn()` and the
  // library build both read. A step in one and not the other either loses its
  // size at runtime (tailwind-merge reads an unknown `text-*` as a colour) or
  // never reaches `@qingye_lab/ui/ui.css`. Both failures are quiet, so they are
  // checked rather than trusted.
  const theme = readFileSync(join(repo, "packages/ui/theme.css"), "utf8");
  const declared = [...theme.matchAll(/^\s*--text-([a-z][a-z-]*?):\s*var\(--qy-text-[a-z-]+-size\)/gm)].map((match) => match[1]);
  assert.ok(declared.length > 10, `expected the type ramp in theme.css, found ${declared.length} steps`);

  const steps = readFileSync(join(repo, "packages/ui/src/text-steps.ts"), "utf8");
  const missingFromMerge = declared.filter((step) => !new RegExp(`"${step}"`).test(steps));
  assert.deepEqual(missingFromMerge, [], `src/text-steps.ts is missing: ${missingFromMerge.join(", ")}`);

  // The build reads that file, so it cannot drift from it independently; this
  // guards the wiring itself.
  const build = readFileSync(join(repo, "packages/ui/scripts/build.mjs"), "utf8");
  assert.match(build, /text-steps\.ts/, "build.mjs must read the shared step list");
});

test("docs typography references tokens provided by the library stylesheet", () => {
  const declared = new Set();
  const visited = new Set();
  function collect(file) {
    if (visited.has(file)) return;
    visited.add(file);
    const css = parse(readFileSync(file, "utf8"), { from: file });
    css.walkDecls((declaration) => {
      if (declaration.prop.startsWith("--")) declared.add(declaration.prop);
    });
    css.walkAtRules("import", (rule) => {
      const specifier = rule.params.match(/^["']([^"']+)["']/)?.[1];
      if (specifier?.startsWith(".")) collect(resolve(dirname(file), specifier));
    });
  }
  collect(join(repo, "packages/ui/styles.css"));
  const docs = parse(readFileSync(join(repo, "apps/docs/src/index.css"), "utf8"));
  const missing = [];
  docs.walkDecls((declaration) => {
    if (!["font-size", "line-height"].includes(declaration.prop)) return;
    for (const [, token] of declaration.value.matchAll(/var\((--qy-text-[a-z-]+)/g)) {
      if (!declared.has(token)) missing.push(`${declaration.parent.selector}: ${token}`);
    }
  });
  assert.deepEqual(missing, [], `undefined typography tokens:\n${missing.join("\n")}`);
});
