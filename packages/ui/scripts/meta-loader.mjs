// Load a TypeScript data module (a meta.ts, or the small docs libs it imports) without a bundler:
// transpile to CommonJS and run it in a fresh VM context. Only relative imports are allowed, so a
// data module cannot reach the network, the file system or a package.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const cache = new Map();

export function localPath(from, specifier) {
  const base = resolve(dirname(from), specifier);
  return [`${base}.tsx`, `${base}.ts`, join(base, "index.ts")].find((path) => existsSync(path));
}

export function loadData(path) {
  if (cache.has(path)) return cache.get(path);
  const { outputText } = ts.transpileModule(readFileSync(path, "utf8"), { fileName: path, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  const context = { exports: {}, require(specifier) {
    const target = specifier.startsWith(".") && localPath(path, specifier);
    if (!target) throw new Error(`Data module ${path} has an unsupported import: ${specifier}`);
    return loadData(target);
  } };
  cache.set(path, context.exports);
  try {
    runInNewContext(outputText, context, { filename: path, timeout: 1000 });
  } catch (error) {
    cache.delete(path);
    throw error;
  }
  return context.exports;
}
