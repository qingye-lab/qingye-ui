import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { resolve, dirname, relative } from 'node:path';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, lstatSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

export const harness = dirname(fileURLToPath(import.meta.url));
export const root = resolve(harness, '../..');
// The evaluation target stays byte-identical for the whole paired batch.
// Product repairs after freezing must not silently change either trial group.
export const ui = existsSync(resolve(harness, 'target-ui/snapshot.json')) ? resolve(harness, 'target-ui') : resolve(root, 'packages/ui');
export const req = createRequire(resolve(ui, 'package.json'));
export const tasks = {
  t01: { directory: 't01-editor', files: ['state.ts', 'Editor.tsx'], subjects: ['button', 'field', 'input', 'textarea'], pattern: 'edit' },
  t02: { directory: 't02-field-spacing', files: ['theme.css'], fixed: ['Fields.tsx'], subjects: ['field', 'input'], pattern: 'edit' },
  t03: { directory: 't03-bulk', files: ['state.ts', 'BulkPanel.tsx'], subjects: ['button', 'data-table'], pattern: 'collection' },
  t04: { directory: 't04-upload', files: ['state.ts', 'UploadPanel.tsx'], subjects: ['button', 'file-upload'], pattern: 'queue' },
};
export const read = (path) => readFileSync(path, 'utf8');
export const json = (path) => JSON.parse(read(path));
export const hash = (text) => createHash('sha256').update(text).digest('hex');
export function write(path, contents) { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, contents); }
export function writeJSON(path, value) { write(path, JSON.stringify(value, null, 2) + '\n'); }
export function args(argv = process.argv.slice(2)) {
  const result = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) throw new Error(`Expected --option, received ${argv[i]}`);
    const name = argv[i].slice(2), value = argv[++i];
    if (!value || value.startsWith('--')) throw new Error(`Missing value for --${name}`);
    result[name] = value;
  }
  return result;
}
export function runDir(id) {
  if (!/^[a-z0-9][a-z0-9-]{0,100}$/.test(id ?? '')) throw new Error('Run ID requires lowercase letters, numbers and hyphens');
  return resolve(harness, 'runs', id);
}
export function runCommand(command, argv, options = {}) {
  const result = spawnSync(command, argv, { cwd: root, encoding: 'utf8', timeout: 120000, maxBuffer: 16 * 1024 * 1024, ...options });
  return { exitCode: result.status, signal: result.signal, stdout: result.stdout ?? '', stderr: result.stderr ?? '', error: result.error?.message ?? null };
}
export function filesUnder(directory) {
  const files = [];
  function visit(path) {
    for (const entry of readdirSync(path)) {
      const full = resolve(path, entry), stat = lstatSync(full);
      if (stat.isSymbolicLink()) files.push({ path: relative(directory, full), symlink: true });
      else if (stat.isDirectory()) visit(full);
      else files.push({ path: relative(directory, full), symlink: false, sha256: hash(read(full)) });
    }
  }
  if (existsSync(directory)) visit(directory);
  return files.sort((a, b) => a.path.localeCompare(b.path));
}
export function logTool(directory, command) {
  const path = resolve(directory, 'tool-events.json');
  const events = existsSync(path) ? json(path) : [];
  events.push({ timestamp: new Date().toISOString(), command });
  writeJSON(path, events);
}
export function targetFingerprint() {
  const sources = [...filesUnder(resolve(ui, 'src')).map(f => ({ path: 'src/' + f.path, sha256: f.sha256 })), ...filesUnder(resolve(ui, 'tokens')).map(f => ({ path: 'tokens/' + f.path, sha256: f.sha256 }))];
  for (const name of ['package.json', 'theme.css', 'motion.css', 'utilities.css', 'styles.css']) sources.push({ path: name, sha256: hash(read(resolve(ui, name))) });
  return hash(JSON.stringify(sources.sort((a, b) => a.path.localeCompare(b.path))));
}
export function compile(directory) {
  const ts = req('typescript');
  const work = resolve(directory, 'work');
  const sourceFiles = filesUnder(work).filter(f => /\.tsx?$/.test(f.path) && !f.symlink).map(f => resolve(work, f.path));
  const options = {
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX, strict: true, noUncheckedIndexedAccess: true, exactOptionalPropertyTypes: true,
    skipLibCheck: true, noEmit: true, allowImportingTsExtensions: true, esModuleInterop: true,
    lib: ['lib.es2022.d.ts', 'lib.dom.d.ts', 'lib.dom.iterable.d.ts'],
    baseUrl: root,
    paths: { '@qingye/ui': [resolve(ui, 'src/index.ts')], '@qingye/ui/*': [resolve(ui, 'src/*')],
      react: [resolve(ui, 'node_modules/@types/react/index.d.ts')], 'react/*': [resolve(ui, 'node_modules/@types/react/*')],
      'react-dom': [resolve(ui, 'node_modules/@types/react-dom/index.d.ts')], 'react-dom/*': [resolve(ui, 'node_modules/@types/react-dom/*')] },
    typeRoots: [resolve(ui, 'node_modules/@types')], types: ['react', 'react-dom'],
  };
  const program = ts.createProgram(sourceFiles, options);
  const diagnostics = ts.getPreEmitDiagnostics(program).map(d => {
    const filename = d.file?.fileName ?? null, position = d.file && d.start !== undefined ? d.file.getLineAndCharacterOfPosition(d.start) : null;
    let node = d.file && d.start !== undefined ? findNode(d.file, d.start, ts) : null;
    let jsx = false;
    while (node) { if (ts.isJsxAttribute(node) || ts.isJsxAttributes(node) || ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) jsx = true; node = node.parent; }
    return { code: d.code, file: filename ? relative(root, filename) : null, line: position ? position.line + 1 : null, column: position ? position.character + 1 : null,
      message: ts.flattenDiagnosticMessageText(d.messageText, '\n'), category: [2305, 2307, 2614, 2724].includes(d.code) ? 'invalid-import' : jsx && [2322, 2353, 2769].includes(d.code) ? 'invalid-prop' : 'other-type-error' };
  });
  return { status: diagnostics.length ? 'FAIL' : 'PASS', diagnostics, invalidImports: diagnostics.filter(d => d.category === 'invalid-import').length, invalidProps: diagnostics.filter(d => d.category === 'invalid-prop').length };
}
function findNode(node, position, ts) {
  for (const child of node.getChildren()) if (child.getFullStart() <= position && child.end > position) return findNode(child, position, ts);
  return node;
}
