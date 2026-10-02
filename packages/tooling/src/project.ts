import { existsSync, readFileSync, realpathSync, lstatSync, readdirSync, mkdirSync, writeFileSync, renameSync, unlinkSync } from 'node:fs';
import { resolve, dirname, relative, sep, isAbsolute, basename } from 'node:path';
import { createRequire } from 'node:module';
import { createHash, randomUUID } from 'node:crypto';
import postcss from 'postcss';
import { ToolError, type Project, type ProjectConfig } from './types.js';

export const hash = (value: string) => createHash('sha256').update(value).digest('hex');
export const read = (path: string) => readFileSync(path, 'utf8');
export function json(path: string): any { try { return JSON.parse(read(path)); } catch (error) { throw new ToolError(`Cannot read JSON ${path}: ${(error as Error).message}`); } }
export function inside(root: string, name: string): string {
  if (typeof name !== 'string' || !name || name.includes('\0')) throw new ToolError('A nonempty project-relative path is required', 'INVALID_PATH');
  const path = resolve(root, name), rel = relative(root, path);
  if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(name)) throw new ToolError(`Path escapes explicit project: ${name}`, 'INVALID_PATH');
  let parent = path;
  while (!existsSync(parent)) parent = dirname(parent);
  const real = realpathSync(parent), realRel = relative(root, real);
  if (realRel === '..' || realRel.startsWith(`..${sep}`)) throw new ToolError(`Symlink escapes project: ${name}`, 'INVALID_PATH');
  return path;
}
function pathIdentity(path: string) { const parts: string[]=[]; let parent=path; while(!existsSync(parent)){parts.unshift(basename(parent));parent=dirname(parent);} return resolve(realpathSync(parent),...parts); }
export function validateConfig(config: any): asserts config is ProjectConfig {
  const keys = ['schemaVersion','package','publicEntry','styleEntry','theme','scan','compositions','tokenSources','adapters','diagnostics','ledger','ledgerRoot'];
  if (!config || typeof config !== 'object' || Array.isArray(config) || Object.keys(config).some(k => !keys.includes(k))) throw new ToolError('Unknown or invalid config field', 'INVALID_CONFIG');
  if (config.schemaVersion !== 1 || config.package !== '@qingye/ui' || typeof config.publicEntry !== 'string' || typeof config.styleEntry !== 'string') throw new ToolError('Config requires schemaVersion 1, @qingye/ui, publicEntry and styleEntry', 'INVALID_CONFIG');
  for (const key of ['scan','compositions','tokenSources','adapters']) if (!Array.isArray(config[key]) || !config[key].every((v: unknown) => typeof v === 'string')) throw new ToolError(`Config requires ${key} paths`, 'INVALID_CONFIG');
  if (!config.scan.length) throw new ToolError('Explicit nonempty scan roots are required', 'INVALID_CONFIG');
  if (!config.theme || !['class','data-theme'].includes(config.theme.mode) || typeof config.theme.source !== 'string' || typeof config.theme.generated !== 'string' || Object.keys(config.theme).some(k => !['source','generated','mode','legacyCss'].includes(k))) throw new ToolError('Invalid theme paths or mode', 'INVALID_CONFIG');
  if (config.theme.legacyCss && (!Array.isArray(config.theme.legacyCss) || !config.theme.legacyCss.every((v: unknown) => typeof v === 'string'))) throw new ToolError('legacyCss must list paths', 'INVALID_CONFIG');
  if (!config.diagnostics || !['recommended','personal','legacy'].includes(config.diagnostics.preset) || !['report','gate'].includes(config.diagnostics.mode) || typeof config.diagnostics.report !== 'string' || Object.keys(config.diagnostics).some(k => !['preset','mode','exceptions','baseline','report'].includes(k))) throw new ToolError('Invalid diagnostics preset, mode or report path', 'INVALID_CONFIG');
  for (const key of ['exceptions','baseline']) if (config.diagnostics[key] !== undefined && typeof config.diagnostics[key] !== 'string') throw new ToolError(`Invalid ${key} path`, 'INVALID_CONFIG');
  for (const key of ['ledger','ledgerRoot']) if (config[key] !== undefined && typeof config[key] !== 'string') throw new ToolError(`Invalid ${key} path`, 'INVALID_CONFIG');
}
export function loadProject(projectPath: string): Project {
  if (!projectPath) throw new ToolError('--project must name the explicit application root', 'PROJECT_REQUIRED');
  const root = realpathSync(resolve(projectPath));
  if (!existsSync(resolve(root, 'package.json'))) throw new ToolError('Explicit project has no package.json', 'PROJECT_REQUIRED');
  const configPath = inside(root, 'ui.config.json'), config = json(configPath); validateConfig(config);
  for (const name of [config.publicEntry, config.styleEntry, config.theme.source, config.theme.generated, ...config.scan, ...config.compositions, ...config.tokenSources, ...config.adapters, ...config.theme.legacyCss ?? [], config.diagnostics.report, config.diagnostics.exceptions, config.diagnostics.baseline].filter(Boolean)) inside(root, name!);
  const sourcePath = inside(root,config.theme.source), generatedPath = inside(root,config.theme.generated);
  if (pathIdentity(sourcePath) === pathIdentity(generatedPath)) throw new ToolError('Theme source and generated CSS must be different files', 'INVALID_CONFIG');
  const {packageRoot,packageJson,catalog}=installedPackage(root);
  return { root, configPath, config, packageRoot, packageJson, catalog, configFingerprint: hash(read(configPath)) };
}
function installedPackage(root: string) {
  const req = createRequire(resolve(root, 'package.json'));
  let packagePath: string;
  try { packagePath = req.resolve('@qingye/ui/package.json'); } catch { throw new ToolError('This project cannot resolve an installed @qingye/ui. Install its actual dependency first.', 'MISSING_DEPENDENCY'); }
  const packageRoot = dirname(realpathSync(packagePath)), packageJson = json(packagePath);
  const catalog = json(resolve(packageRoot, 'catalog.json'));
  if (catalog.version !== packageJson.version) throw new ToolError(`Installed catalog ${catalog.version} does not match installed package ${packageJson.version}`, 'CATALOG_MISMATCH');
  if (!Array.isArray(catalog.components)) throw new ToolError('Installed catalog has no component entries', 'CATALOG_MISMATCH');
  return {packageRoot,packageJson,catalog};
}
export function walkFiles(root: string, paths: string[]): string[] {
  const files = new Set<string>();
  const walk = (name: string) => {
    const path = inside(root, name);
    if (!existsSync(path)) throw new ToolError(`Configured scan path missing: ${name}`, 'SCAN_FAILURE');
    const stat = lstatSync(path);
    if (stat.isSymbolicLink()) throw new ToolError(`Scanner does not follow symlink: ${name}`, 'SCAN_FAILURE');
    if (stat.isDirectory()) for (const entry of readdirSync(path).sort()) { if (!['node_modules','.git','dist'].includes(entry)) walk(relative(root, resolve(path, entry))); }
    else if (/\.(tsx?|jsx?|css)$/.test(path)) files.add(path);
  };
  paths.forEach(walk); return [...files].sort();
}
export function tokenRegistry(project: Project) {
  const sources = readdirSync(resolve(project.packageRoot, 'tokens')).filter(name => name.endsWith('.css')).map(name => resolve(project.packageRoot, 'tokens', name));
  sources.push(...project.config.tokenSources.map(name => inside(project.root, name)));
  const registry = new Map<string,{ name: string; definitions: { value: string; source: string; line: number }[] }>();
  for (const path of sources) {
    const ast = postcss.parse(read(path), { from: path });
    ast.walkDecls(/^--qy-/, decl => { const entry = registry.get(decl.prop) ?? { name: decl.prop, definitions: [] }; entry.definitions.push({ value: decl.value, source: path, line: decl.source?.start?.line ?? 1 }); registry.set(decl.prop, entry); });
  }
  return [...registry.values()].sort((a,b) => a.name.localeCompare(b.name));
}
export function writeAtomic(root: string, name: string, contents: string, expected: string | null) {
  const path = inside(root, name);
  if (existsSync(path) && lstatSync(path).isSymbolicLink()) throw new ToolError('Refusing to replace symlink', 'INVALID_PATH');
  const actual = existsSync(path) ? hash(read(path)) : null;
  if (actual !== expected) throw new ToolError(`Source changed: ${name}; read it again and review a new diff`, 'SOURCE_CONFLICT');
  mkdirSync(dirname(path), { recursive: true });
  const temp = `${path}.qy-${randomUUID()}.tmp`;
  try {
    writeFileSync(temp, contents, { flag: 'wx', mode: 0o600 });
    if ((existsSync(path) ? hash(read(path)) : null) !== expected) throw new ToolError(`Source changed: ${name}`, 'SOURCE_CONFLICT');
    renameSync(temp, path);
  } finally { if (existsSync(temp)) unlinkSync(temp); }
}
export function projectInfo(projectPath: string) {
  if(!projectPath) throw new ToolError('--project must name the explicit application root','PROJECT_REQUIRED');
  const root=realpathSync(resolve(projectPath));
  if(!existsSync(resolve(root,'package.json')))throw new ToolError('Explicit project has no package.json','PROJECT_REQUIRED');
  if(!existsSync(inside(root,'ui.config.json'))) {
    const installed=installedPackage(root);
    return {status:'UNVERIFIED',project:root,version:installed.packageJson.version,package:installed.packageJson.name,packageRoot:installed.packageRoot,exports:installed.packageJson.exports,catalogSchemaVersion:installed.catalog.schemaVersion??1,missingConfig:'ui.config.json',checks:json(resolve(root,'package.json')).scripts??{},limitations:['Installed facts are available; project theme/public entries are unconfigured. Run init dry-run explicitly if wanted. No config was created.']};
  }
  const project = loadProject(projectPath);
  const missingEntries=[project.config.publicEntry,project.config.styleEntry,...project.config.compositions].filter(name=>!existsSync(inside(project.root,name)));
  return { status: missingEntries.length?'UNVERIFIED':'PASS', missingEntries, project: project.root, version: project.packageJson.version, package: project.packageJson.name, packageRoot: project.packageRoot, exports: project.packageJson.exports, catalogSchemaVersion: project.catalog.schemaVersion ?? 1, publicEntry: project.config.publicEntry, styleEntry: project.config.styleEntry, theme: project.config.theme, compositions: project.config.compositions, checks: json(resolve(project.root,'package.json')).scripts ?? {}, configFingerprint: project.configFingerprint, limitations: ['This is the package resolved by the explicit project. It does not query a remote version.'] };
}
export function componentDocs(projectPath: string, query: string) {
  const project = loadProject(projectPath);
  const entry = project.catalog.components.find(c => c.name === query || c.exports?.includes(query) || c.actualExports?.some((e: any) => e.name === query));
  const pattern = project.catalog.patterns?.find(p => p.id === query || p.slug === query);
  if (!entry && !pattern) throw new ToolError(`No installed catalog entry for ${query}`, 'DOCS_NOT_FOUND');
  return { status: entry && (!entry.actualExports || !entry.examples) ? 'UNVERIFIED' : 'PASS', installedVersion: project.packageJson.version, catalogSchemaVersion: project.catalog.schemaVersion ?? 1, entry: entry ?? pattern, limitation: 'Only published facts of the installed version; documented provider guidance does not prove every runtime prerequisite.' };
}
