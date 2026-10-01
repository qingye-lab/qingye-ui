import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { runInNewContext } from 'node:vm';

// Internal override permits checking prepared tools against a read-only checkout.
export const ROOT = process.env.QY_UI_ROOT || resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const OUT = process.env.QY_UI_FACTS_OUT || resolve(ROOT, 'docs');
export const ts = createRequire(resolve(ROOT, 'packages/ui/package.json'))('typescript');
export const read = (path) => readFileSync(resolve(ROOT, path), 'utf8');
export const json = (path) => JSON.parse(read(path));
export const files = (path, pattern) => existsSync(resolve(ROOT, path)) ? readdirSync(resolve(ROOT, path)).filter((name) => pattern.test(name)).sort().map((name) => `${path}/${name}`) : [];
export function recursiveFiles(path, pattern) {
  if (!existsSync(resolve(ROOT, path))) return [];
  return readdirSync(resolve(ROOT, path), { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).flatMap((entry) => entry.isDirectory() ? recursiveFiles(`${path}/${entry.name}`, pattern) : pattern.test(entry.name) ? [`${path}/${entry.name}`] : []);
}
export const hash = (text) => createHash('sha256').update(text).digest('hex');
export const parseTS = (path) => ts.createSourceFile(path, read(path), ts.ScriptTarget.Latest, true, path.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
export function visit(node, callback) { callback(node); ts.forEachChild(node, (child) => visit(child, callback)); }
export const location = (source, node) => ({ path: source.fileName, line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1 });
export function fingerprint(paths, extraInputs = []) {
  const inputs = [...[...new Set(paths)].sort().map((path) => ({ path, sha256: hash(read(path)) })), ...extraInputs].sort((a, b) => a.path.localeCompare(b.path));
  return { sha256: hash(JSON.stringify(inputs)), inputs };
}
export function revision() { return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim(); }
export function metadata(path) {
  const { outputText } = ts.transpileModule(read(path), { fileName: path, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  const sandbox = { exports: {} };
  runInNewContext(outputText, sandbox, { filename: path, timeout: 1000 });
  return sandbox.exports.default;
}
export function exportedSymbols(paths) {
  const program = ts.createProgram(paths.map((path) => resolve(ROOT, path)), { target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler, skipLibCheck: true });
  const checker = program.getTypeChecker();
  return Object.fromEntries(paths.map((path) => {
    const source = program.getSourceFile(resolve(ROOT, path));
    const moduleSymbol = checker.getSymbolAtLocation(source);
    const exports = checker.getExportsOfModule(moduleSymbol).map((symbol) => {
      const declaration = symbol.declarations?.[0];
      const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
      const typeOnly = (declaration && ts.isExportSpecifier(declaration) && (declaration.isTypeOnly || declaration.parent.parent.isTypeOnly)) || !(target.flags & ts.SymbolFlags.Value);
      const declarationSource = declaration?.getSourceFile() || source;
      return { name: symbol.name, kind: typeOnly ? 'type' : 'value', ...(symbol.flags & ts.SymbolFlags.Alias ? { target: target.name } : {}), source: { path: relative(ROOT, declarationSource.fileName), line: declaration ? declarationSource.getLineAndCharacterOfPosition(declaration.getStart(declarationSource)).line + 1 : 1 } };
    }).sort((a, b) => a.name.localeCompare(b.name));
    return [path, exports];
  }));
}

// Bounded CSS declaration scanner, not a general CSS parser. Comments/strings and
// parentheses are balanced; only custom-property declarations are collected.
// Selector conditions are retained as source context, never treated as cascade proof.
export function cssDeclarations(text, path, { customOnly = true } = {}) {
  const clean = text.replace(/\/\*[\s\S]*?\*\//g, (s) => s.replace(/[^\n]/g, ' '));
  const result = [];
  const expression = customOnly ? /(--[a-zA-Z0-9_-]+)\s*:/g : /(?:^|[;{])\s*(--[a-zA-Z0-9_-]+|[a-zA-Z][a-zA-Z0-9-]*)\s*:/g;
  let match;
  while ((match = expression.exec(clean))) {
    let end = expression.lastIndex, depth = 0, quote = '';
    for (; end < clean.length; end++) {
      const char = clean[end];
      if (quote) { if (char === quote && clean[end - 1] !== '\\') quote = ''; continue; }
      if (char === '"' || char === "'") { quote = char; continue; }
      if (char === '(' || char === '[') depth++;
      if (char === ')' || char === ']') depth--;
      if (depth === 0 && (char === ';' || char === '}')) break;
    }
    const value = clean.slice(expression.lastIndex, end).trim();
    const nameIndex = match.index + match[0].indexOf(match[1]);
    const before = clean.slice(0, nameIndex);
    const brace = before.lastIndexOf('{');
    const boundary = Math.max(before.lastIndexOf('}', brace), before.lastIndexOf(';', brace));
    result.push({ name: match[1], value, references: [...new Set(value.match(/--[a-zA-Z0-9_-]+/g) || [])], source: { path, line: text.slice(0, nameIndex).split('\n').length }, context: clean.slice(boundary + 1, brace).trim(), complete: end < clean.length && depth === 0 && !quote });
    expression.lastIndex = customOnly ? end + 1 : end;
  }
  return result;
}
export const tokenPaths = () => files('packages/ui/tokens', /\.css$/);
export const stylePaths = () => [...tokenPaths(), 'packages/ui/theme.css', 'packages/ui/motion.css', 'packages/ui/utilities.css', 'packages/ui/styles.css'];
export const declarations = () => stylePaths().flatMap((path) => cssDeclarations(read(path), path));
export function tokenDefinitions() {
  const map = new Map();
  for (const item of declarations().filter((d) => d.name.startsWith('--qy-'))) {
    if (!map.has(item.name)) map.set(item.name, []);
    map.get(item.name).push(item);
  }
  return [...map].sort(([a], [b]) => a.localeCompare(b)).map(([name, definitions]) => ({ name, definitions }));
}
export function pathsForFacts() {
  const components = files('packages/ui/src/components', /\.tsx?$/);
  const metadataPaths = components.map((path) => `apps/docs/src/content/${path.split('/').pop().replace(/\.tsx?$/, '')}/meta.ts`);
  return [...components, ...metadataPaths, ...stylePaths(), 'packages/ui/package.json', 'package.json', 'apps/docs/package.json', 'apps/docs/src/lib/types.ts', 'packages/ui/catalog.json', 'packages/ui/coss-source.json', 'packages/ui/src/index.ts'];
}
export const exists = (path) => existsSync(resolve(ROOT, path));
export const relativePath = (path) => relative(ROOT, path);
