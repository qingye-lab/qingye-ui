// Keep the published catalog aligned with the component files and local docs.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const content = join(root, "../../apps/docs/src/content");
const names = readdirSync(join(root, "src/components"))
  .filter((file) => /\.tsx?$/.test(file))
  .map((file) => file.replace(/\.tsx?$/, ""))
  .sort();

const components = names.map((name) => {
  const path = join(content, name, "meta.ts");
  const source = readFileSync(path, "utf8");
  const { outputText } = ts.transpileModule(source, {
    fileName: path,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  // Metadata has no runtime imports; the isolated context rejects any added ones.
  const context = { exports: {} };
  runInNewContext(outputText, context, { filename: path, timeout: 1000 });
  const meta = context.exports.default;
  if (!meta?.title || !meta.description || !Array.isArray(meta.exports) || !meta.exports.length) {
    throw new Error(`Missing component metadata: ${name}`);
  }
  return {
    name,
    title: meta.title,
    description: meta.description,
    category: meta.category,
    source: meta.source,
    import: `${pkg.name}/components/${name}`,
    exports: meta.exports,
    docs: `/docs/components/${name}`,
    ...(meta.notes?.length ? { notes: meta.notes } : {}),
    ...(meta.keywords?.length ? { keywords: meta.keywords } : {}),
  };
});

const catalog = {
  name: "Qingye UI",
  nameZh: "青野 UI",
  package: pkg.name,
  version: pkg.version,
  generatedBy: "scripts/gen-catalog.mjs",
  scope: "Published component entry points and guidance from the local documentation",
  components,
  extras: components.filter((component) => component.source === "local").map((component) => component.name),
};
writeFileSync(join(root, "catalog.json"), `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`catalog.json: ${components.length} components (${catalog.extras.length} local)`);
