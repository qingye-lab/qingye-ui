// Publish check: pack the already-built package and lint the tarball itself.
//
//   pnpm --filter @qingye_lab/ui build && pnpm --filter @qingye_lab/ui check:pack
//
// Packs with --ignore-scripts so it never rebuilds (and never regenerates the
// catalog) behind your back; run the build first. Checks, in order:
//   1. the tarball holds the built output and no historical ai/v<x> folders;
//   2. every .d.ts.map points at a source file that is also in the tarball;
//   3. publint (strict: warnings fail);
//   4. attw with the esm-only profile.
//
// Why `esm-only`: the package is "type": "module" with no CJS build, so it does
// not claim CommonJS support. `exports` still carries a `default` condition so
// bundlers, TS `moduleResolution: bundler|node16` and Node's require(esm) all
// resolve; attw's strict profile would flag that require() lands on ESM
// ("CJSResolvesToESM") and that `node10` cannot see subpath exports — both are
// the normal state of an ESM-only, exports-only package, so the profile ignores
// them. Entries that are plain asset paths (css, md, json) are excluded from
// attw because it demands type declarations for every entry.
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const failures = [];
const fail = (message) => { failures.push(message); console.log(`FAIL  ${message}`); };
const pass = (message) => console.log(`PASS  ${message}`);

if (!existsSync(join(root, "dist/index.js"))) {
  console.log("NOT_RUN  dist/ is missing; run `pnpm --filter @qingye_lab/ui build` first.");
  process.exit(1);
}

const work = mkdtempSync(join(tmpdir(), "qy-check-pack-"));
try {
  const packed = JSON.parse(
    execFileSync("npm", ["pack", "--ignore-scripts", "--json", "--pack-destination", work], {
      cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
    }),
  )[0];
  const tarball = join(work, packed.filename);
  const inPack = new Set(packed.files.map((file) => file.path));
  console.log(`tarball ${packed.filename}: ${packed.entryCount} files, ${(packed.size / 1024).toFixed(0)} KB packed, ${(packed.unpackedSize / 1024).toFixed(0)} KB unpacked`);

  // 1. contents
  const history = [...inPack].filter((path) => /^ai\/v[^/]+\//.test(path) && !path.startsWith(`ai/v${pkg.version}/`));
  const folders = [...new Set(history.map((path) => path.split("/").slice(0, 2).join("/")))];
  if (folders.length) fail(`historical ai folders are published: ${folders.join(", ")} (exclude them in package.json "files")`);
  else pass(`ai/ holds only v${pkg.version}`);
  for (const required of ["dist/index.js", "dist/index.d.ts", "dist/ui.css", "catalog.json"]) {
    if (!inPack.has(required)) fail(`${required} is missing from the tarball`);
  }

  // 2. declaration maps reach their sources
  const maps = [...inPack].filter((path) => path.endsWith(".d.ts.map"));
  const dangling = [];
  for (const mapPath of maps) {
    const map = JSON.parse(readFileSync(join(root, mapPath), "utf8"));
    for (const source of map.sources ?? []) {
      const target = posix.normalize(posix.join(posix.dirname(mapPath), map.sourceRoot ?? "", source));
      if (!inPack.has(target)) dangling.push(`${mapPath} -> ${target}`);
    }
  }
  if (!maps.length) fail("no .d.ts.map files in the tarball (declarationMap is off or the build was skipped)");
  else if (dangling.length) fail(`${dangling.length} declaration map(s) point outside the tarball, e.g. ${dangling[0]}`);
  else pass(`${maps.length} declaration maps all reach a packed source`);

  // 3. publint
  const lint = spawnSync("pnpm", ["exec", "publint", "run", tarball, "--strict"], { cwd: root, encoding: "utf8" });
  process.stdout.write(lint.stdout ?? "");
  process.stderr.write(lint.stderr ?? "");
  if (lint.status === 0) pass("publint (strict)"); else fail("publint reported problems");

  // 4. attw
  const assets = Object.entries(pkg.exports)
    .filter(([, value]) => typeof value === "string")
    .map(([key]) => key);
  const attw = spawnSync(
    "pnpm",
    ["exec", "attw", tarball, "--profile", "esm-only", "--no-emoji", "--no-color", "--format", "ascii",
      ...(assets.length ? ["--exclude-entrypoints", ...assets] : [])],
    { cwd: root, encoding: "utf8" },
  );
  process.stdout.write(attw.stdout ?? "");
  process.stderr.write(attw.stderr ?? "");
  if (attw.status === 0) pass("attw (esm-only)"); else fail("attw reported problems");
} finally {
  rmSync(work, { recursive: true, force: true });
}

console.log(failures.length ? `\nFAIL  ${failures.length} problem(s)` : "\nPASS  package checks");
process.exit(failures.length ? 1 : 0);
