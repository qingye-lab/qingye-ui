import { resolve } from 'node:path';
import { existsSync, symlinkSync, mkdirSync } from 'node:fs';
import { args, tasks, harness, root, ui, read, json, hash, write, writeJSON, runCommand, targetFingerprint } from './lib.mjs';

const options = args(), group = options.group;
if (!['baseline', 'new'].includes(group)) throw new Error('--group baseline|new required');
const output = resolve(options.output ?? resolve(harness, 'materials', group));
if (existsSync(resolve(output, 'manifest.json'))) throw new Error('Materials already frozen; choose another --output directory');
const baseline = 'f0de47747040dfe98d58598c0b5039bf2baed0ba';
function gitShow(path) { const result = runCommand('git', ['show', `${baseline}:${path}`]); if (result.exitCode !== 0) throw new Error(result.stderr); return result.stdout; }
const guide = group === 'baseline' ? gitShow('README.md') : read(resolve(root, 'design.md'));
const catalogText = group === 'baseline' ? gitShow('packages/ui/catalog.json') : read(resolve(ui, 'catalog.json'));
const catalog = JSON.parse(catalogText);
if (group === 'new' && (!catalog.schemaVersion || !catalog.components.every(c => c.actualExports && c.examples))) throw new Error('New catalog facts not ready: regenerate/build final catalog before freezing new materials');
const hashes = { guide: hash(guide), catalog: hash(catalogText), targetPackage: hash(read(resolve(ui, 'package.json'))), targetSource: targetFingerprint() };
const sourceFacts = catalog.components.map(c => ({ name: c.name, fingerprint: c.sourceFingerprint ?? c.sourceHash ?? null }));
let cliProject;
if (group === 'new') {
  if (!existsSync(resolve(root, 'packages/tooling/dist/cli.js'))) throw new Error('Build @qingye/tooling before freezing new materials');
  cliProject = resolve(output, '_cli-project');
  writeJSON(resolve(cliProject, 'package.json'), { name: 'ai-eval-materials', private: true, type: 'module' });
  writeJSON(resolve(cliProject, 'ui.config.json'), {
    schemaVersion: 1, package: '@qingye/ui', publicEntry: 'src/ui.ts', styleEntry: 'src/theme.css',
    theme: { mode: 'class', source: 'theme.json', generated: 'src/theme.generated.css' }, scan: ['src'], compositions: [], tokenSources: [], adapters: [],
    diagnostics: { preset: 'recommended', mode: 'report', report: '.qingye/report.json' },
  });
  write(resolve(cliProject, 'src/ui.ts'), 'export * from "@qingye/ui";\n');
  write(resolve(cliProject, 'src/theme.css'), '');
  writeJSON(resolve(cliProject, 'theme.json'), { schemaVersion: 1 });
  mkdirSync(resolve(cliProject, 'node_modules/@qingye'), { recursive: true });
  symlinkSync(ui, resolve(cliProject, 'node_modules/@qingye/ui'), 'dir');
}
for (const [id, task] of Object.entries(tasks)) {
  const target = resolve(output, id);
  write(resolve(target, 'guide.md'), guide);
  const entries = task.subjects.map(name => { const found = catalog.components.find(c => c.name === name); if (!found) throw new Error(`Missing catalog ${name}`); return found; });
  const patterns = group === 'new' ? (catalog.patterns ?? []).filter(p => p.id === task.pattern || p.slug === task.pattern) : [];
  writeJSON(resolve(target, 'catalog.json'), { package: catalog.package, version: catalog.version, schemaVersion: catalog.schemaVersion ?? 1, components: entries, patterns });
  if (group === 'new') for (const subject of task.subjects) {
    const result = runCommand(process.execPath, [resolve(root, 'packages/tooling/bin/qingye-ui.mjs'), 'docs', subject, '--project', cliProject, '--json']);
    if (result.exitCode !== 0) throw new Error(`CLI docs ${subject}: ${result.stderr || result.stdout}`);
    const value = JSON.parse(result.stdout);
    if (value.status !== 'PASS') throw new Error(`CLI docs ${subject} status=${value.status}`);
    writeJSON(resolve(target, `cli-docs-${subject}.json`), value);
  }
  writeJSON(resolve(target, 'manifest.json'), { schemaVersion: 1, group, task: id, sources: group === 'baseline' ? { commit: baseline, guide: 'README.md', catalog: 'packages/ui/catalog.json' } : { guide: 'design.md', catalog: 'packages/ui/catalog.json', cli: 'packages/tooling/dist/cli.js' }, cliProject: cliProject ?? null, hashes, targetVersion: json(resolve(ui, 'package.json')).version, sourceFacts: sourceFacts.filter(c => task.subjects.includes(c.name)), extractedAt: new Date().toISOString() });
}
writeJSON(resolve(output, 'manifest.json'), { schemaVersion: 1, group, hashes, extractedAt: new Date().toISOString() });
console.log(output);
