import { mkdirSync, writeFileSync, existsSync, readFileSync, realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { OUT, ROOT, ts, files, recursiveFiles, read, json, parseTS, visit, exportedSymbols, metadata, tokenDefinitions, pathsForFacts, fingerprint, revision, exists } from './lib/ui-facts.mjs';

export function generateCapabilities() {
  const paths = files('packages/ui/src/components', /\.tsx?$/);
  const symbols = exportedSymbols([...paths, 'packages/ui/src/index.ts']);
  const rootExports = symbols['packages/ui/src/index.ts'];
  const pkg = json('packages/ui/package.json');
  const catalog = json('packages/ui/catalog.json');
  const components = paths.map((path) => {
    const name = path.split('/').pop().replace(/\.tsx?$/, '');
    const metaPath = `apps/docs/src/content/${name}/meta.ts`;
    const meta = metadata(metaPath);
    const valueExports = symbols[path].filter((entry) => entry.kind === 'value').map((entry) => entry.name);
    const usageResolution = meta.exports.map((raw) => {
      const kind = raw.startsWith('type ') ? 'type' : 'value';
      const name = raw.replace(/^type /, '');
      const componentEntry = symbols[path].find((entry) => entry.name === name && entry.kind === kind);
      const rootEntry = rootExports.find((entry) => entry.name === name && entry.kind === kind);
      return { name, kind, componentEntry: componentEntry?.source || null, rootEntry: rootEntry?.source || null, status: componentEntry || rootEntry ? 'PRESENT' : 'UNVERIFIED' };
    });
    const missing = usageResolution.filter((entry) => entry.status === 'UNVERIFIED').map((entry) => entry.name);
    const entry = catalog.components.find((entry) => entry.name === name);
    const authorshipMatches = meta.source === 'local';
    return {
      name, status: 'PRESENT', source: path, exports: symbols[path],
      metadata: { path: metaPath, ...meta, usageResolution },
      provenance: {
        kind: 'local', source: metaPath, designBasis: 'design.md',
        trackingStatus: authorshipMatches ? 'PRESENT' : 'UNVERIFIED',
        verificationStatus: 'NOT_RUN',
        scope: 'Current library authorship classification; this generator does not perform independent provenance comparison.',
        ...(!authorshipMatches ? { reason: 'Metadata does not match the current library authorship classification' } : {}),
      },
      catalog: { present: Boolean(entry), version: catalog.version, source: 'packages/ui/catalog.json' },
      dist: { js: exists(`packages/ui/dist/components/${name}.js`), declarations: exists(`packages/ui/dist/components/${name}.d.ts`), status: exists(`packages/ui/dist/components/${name}.js`) && exists(`packages/ui/dist/components/${name}.d.ts`) ? 'PRESENT' : 'NOT_RUN' },
      consistency: { status: missing.length || !entry || !authorshipMatches || entry.source !== 'local' ? 'UNVERIFIED' : 'PASS', missingPublicMetadataExports: missing },
    };
  });
  const metadataFields = [];
  const types = parseTS('apps/docs/src/lib/types.ts');
  visit(types, (node) => { if (ts.isInterfaceDeclaration(node) && node.name.text === 'ComponentMeta') for (const field of node.members) metadataFields.push({ name: field.name.getText(types), type: field.type.getText(types), optional: Boolean(field.questionToken), source: { path: types.fileName, line: types.getLineAndCharacterOfPosition(field.getStart(types)).line + 1 } }); });
  const componentSources = paths.map(read);
  const controlReferences = tokenDefinitions().filter((token) => /^--qy-control-/.test(token.name)).map((token) => ({ name: token.name, componentSourceOccurrences: componentSources.reduce((count, source) => count + (source.match(new RegExp(`${token.name}(?![\\w-])`, 'g')) || []).length, 0), evidenceKind: 'SOURCE_OCCURRENCES_ONLY', runtimeStatus: 'NOT_RUN' }));
  const annotationsPath = resolve(OUT, 'current-capabilities.annotations.json');
  const annotations = existsSync(annotationsPath) ? JSON.parse(readFileSync(annotationsPath, 'utf8')).annotations : [];
  for (const annotation of annotations) {
    if (!['NOT_SUPPORTED', 'UNVERIFIED'].includes(annotation.status) || !annotation.reason || !annotation.evidence?.length) throw new Error(`Invalid manual annotation: ${annotation.id}`);
  }
  return { schemaVersion: 1, generatedBy: 'scripts/gen-capabilities.mjs', generatedAt: new Date().toISOString(), revision: revision(), fingerprint: fingerprint(pathsForFacts()), scope: 'Implementation facts; PRESENT means source exists, not runtime acceptance. Internal docs are not added to package files.', package: { name: pkg.name, version: pkg.version, exports: pkg.exports, dependencies: pkg.dependencies, peerDependencies: pkg.peerDependencies, peerDependenciesMeta: pkg.peerDependenciesMeta, publishConfig: pkg.publishConfig, files: pkg.files, source: 'packages/ui/package.json' }, counts: { components: paths.length, catalog: catalog.components.length, dist: files('packages/ui/dist/components', /\.js$/).length, local: components.filter((c) => c.provenance.kind === 'local').length }, buildArtifacts: { status: exists('packages/ui/dist/components') ? 'PRESENT' : 'NOT_RUN', reason: exists('packages/ui/dist/components') ? 'File presence only; build was not executed by this generator' : 'dist is absent; source inventory remains available' }, components, tokens: tokenDefinitions(), controlReferences, styleEntries: [{ import: `${pkg.name}/styles.css`, kind: 'Tailwind source', source: 'packages/ui/styles.css', exists: exists('packages/ui/styles.css'), runtimeStatus: 'NOT_RUN' }, { import: `${pkg.name}/ui.css`, kind: 'Precompiled CSS', source: 'packages/ui/dist/ui.css', exists: exists('packages/ui/dist/ui.css'), runtimeStatus: 'NOT_RUN' }], metadataFields, commands: ['package.json', 'packages/ui/package.json', 'apps/docs/package.json'].map((source) => ({ source, scripts: json(source).scripts })), scriptFiles: [...recursiveFiles('scripts', /\.mjs$/), ...recursiveFiles('packages/ui/scripts', /\.mjs$/)], annotations: { source: 'docs/current-capabilities.annotations.json', entries: annotations } };
}
export function capabilitiesMarkdown(data) {
  const rows = data.components.map((c) => `| ${c.name} | ${c.provenance.kind} | ${c.exports.filter((e) => e.kind === 'value').map((e) => e.name).join(', ')} | ${c.exports.filter((e) => e.kind === 'type').map((e) => e.name).join(', ')} |`).join('\n');
  return `<!-- Generated by scripts/gen-capabilities.mjs; edit source facts or annotations, then rerun. -->\n# 当前实现事实\n\n包：${data.package.name} ${data.package.version}；生成时 HEAD 基线：${data.revision}；实际工作区内容以输入指纹为准。\n输入指纹：${data.fingerprint.sha256}。完整来源、定义位置、metadata 与命令见同目录 current-capabilities.json。\n\nPRESENT 只代表源码存在；PASS 仅用于静态目录一致性。源码引用数不证明运行时生效。初始 snapshot 见 current-capabilities.baseline.json，默认重生成不会覆写。\n\n组件 ${data.counts.components}；catalog ${data.counts.catalog}；dist JS ${data.counts.dist}；本库编写 ${data.counts.local}。\n\n| 组件 | 来源 | value 导出 | type 导出 |\n|---|---|---|---|\n${rows}\n\n## 样式入口\n\n${data.styleEntries.map((e) => `- ${e.import} → ${e.source}（文件${e.exists ? '存在' : '缺失'}；消费验证 ${e.runtimeStatus}）`).join('\n')}\n\n两种入口只选择一种；存在文件不证明打包后的消费夹具通过。\n\n## 控件 token 引用\n\n${data.controlReferences.map((e) => `- ${e.name}: component source occurrences=${e.componentSourceOccurrences}; runtime=${e.runtimeStatus}`).join('\n')}\n\n## 人工状态注释\n\n${data.annotations.entries.map((a) => `- ${a.id}: ${a.status} — ${a.reason}（${a.evidence.join(', ')}）`).join('\n')}\n`;
}
export function writeCapabilities({ baseline = false } = {}) {
  mkdirSync(OUT, { recursive: true });
  if (baseline && existsSync(resolve(OUT, 'current-capabilities.baseline.json'))) throw new Error('Initial snapshot already exists; it must not be overwritten.');
  const result = generateCapabilities();
  writeFileSync(resolve(OUT, 'current-capabilities.json'), `${JSON.stringify(result, null, 2)}\n`);
  writeFileSync(resolve(OUT, 'current-capabilities.md'), capabilitiesMarkdown(result));
  if (baseline) {
    const path = resolve(OUT, 'current-capabilities.baseline.json');
    if (existsSync(path)) throw new Error('Initial snapshot already exists; it must not be overwritten.');
    writeFileSync(path, `${JSON.stringify(result, null, 2)}\n`);
  }
  return result;
}
if (process.argv[1] && pathToFileURL(realpathSync(process.argv[1])).href === import.meta.url) {
  const result = writeCapabilities({ baseline: process.argv.includes('--baseline-once') });
  console.log(`current-capabilities: ${result.counts.components} components, ${result.tokens.length} tokens; ${result.fingerprint.sha256}`);
}
