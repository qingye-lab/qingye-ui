import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { args, tasks, root, ui, req, harness, runDir, read, json, hash, write, writeJSON, filesUnder, compile, runCommand, targetFingerprint } from './lib.mjs';
const options = args(), directory = runDir(options.run), manifest = json(resolve(directory, 'manifest.json')), task = tasks[manifest.task];
if (!task) throw new Error('Invalid task manifest');
const startedAt = new Date().toISOString(), evaluation = resolve(directory, 'evaluation');
const files = filesUnder(resolve(directory, 'work')), failures = [];
const targetUnchanged = manifest.targetSourceSHA256 === targetFingerprint();
const materialsUnchanged = JSON.stringify(manifest.materialFiles) === JSON.stringify(filesUnder(resolve(directory, 'materials')));
for (const file of files) {
  if (file.symlink) failures.push({ category: 'wrong-owner', file: file.path, message: 'Symlink submission is not accepted' });
  if (![...manifest.permittedFiles, ...manifest.fixedFiles].includes(file.path)) failures.push({ category: 'wrong-owner', file: file.path, message: 'File outside permitted output list' });
  if (manifest.fixedFiles.includes(file.path) && manifest.originalFiles.find(f => f.path === file.path)?.sha256 !== file.sha256) failures.push({ category: 'scattered-edit', file: file.path, message: 'Fixed consumer modified instead of theme owner' });
}
for (const required of [...task.files, ...task.fixed ?? []]) if (!files.find(f => f.path === required)) failures.push({ category: 'missing-file', file: required, message: 'Required source missing' });
const changedFiles = files.filter(f => f.sha256 !== manifest.originalFiles.find(o => o.path === f.path)?.sha256).map(f => f.path);
if (!changedFiles.some(f => task.files.includes(f))) failures.push({ category: 'no-implementation', file: null, message: 'No permitted implementation source changed' });
const ts = req('typescript');
for (const file of files.filter(f => /\.tsx?$/.test(f.path) && !f.symlink)) {
  const source = read(resolve(directory, 'work', file.path)), ast = ts.createSourceFile(file.path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  if (/^\s*\/\/\s*@ts-(?:nocheck|ignore|expect-error)/m.test(source)) failures.push({ category: 'test-bypass', file: file.path, message: 'Compiler suppression is outside the task contract' });
  function visit(node) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      const name = node.moduleSpecifier.text;
      if (!['react', '@qingye/ui', './state'].includes(name) && !/^@qingye\/ui\/(?:components\/[a-z0-9-]+|locales\/[a-zA-Z0-9-]+|locale|utils)$/.test(name) && !(manifest.group === 'selftest' && name.startsWith('../../../tasks/'))) failures.push({ category: 'read-boundary', file: file.path, message: `Undeclared module ${name}` });
    }
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) failures.push({ category: 'read-boundary', file: file.path, message: 'Dynamic imports are outside the fixed dependency contract' });
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
let types;
try { types = compile(directory); } catch (error) { types = { status: 'NOT_RUN', diagnostics: [], invalidImports: null, invalidProps: null, infrastructureError: error.message }; }
writeJSON(resolve(evaluation, 'types.json'), types);
const view = manifest.task === 't01' ? 'Editor.tsx' : manifest.task === 't02' ? 'Fields.tsx' : manifest.task === 't03' ? 'BulkPanel.tsx' : 'UploadPanel.tsx';
let testSource = read(resolve(harness, 'private', `${manifest.task}.test.tsx`));
const replacements = { '__STATE__': resolve(directory, 'work/state.ts'), '__VIEW__': resolve(directory, 'work', view), '__CSS__': resolve(directory, 'work/theme.css'), '__UI_PACKAGE__': resolve(ui, 'package.json'), '__TOOLING_PACKAGE__': resolve(root, 'packages/tooling/package.json') };
for (const [key, value] of Object.entries(replacements)) testSource = testSource.replaceAll(`'${key}'`, JSON.stringify(value));
write(resolve(evaluation, 'contract.test.tsx'), testSource);
const aliases = { '@qingye/ui': resolve(ui, 'src/index.ts'), 'react': req.resolve('react'), 'react-dom': req.resolve('react-dom'), 'react/jsx-runtime': req.resolve('react/jsx-runtime'), 'react/jsx-dev-runtime': req.resolve('react/jsx-dev-runtime'), '@testing-library/react': req.resolve('@testing-library/react'), 'vitest': resolve(ui, 'node_modules/vitest/dist/index.js') };
const exactAliases = Object.entries(aliases).map(([name, replacement]) => `{ find: new RegExp(${JSON.stringify('^' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$')}), replacement: ${JSON.stringify(replacement)} }`).join(',');
const config = `export default { root: ${JSON.stringify(ui)}, esbuild:{jsx:'automatic',jsxImportSource:'react'}, resolve:{alias:[${exactAliases},{find:/^@qingye\\/ui\\/(components\\/[a-z0-9-]+|locales\\/[a-zA-Z0-9-]+|locale|utils)$/,replacement:${JSON.stringify(resolve(ui, 'src') + '/$1')}}]}, test:{environment:'jsdom',setupFiles:[${JSON.stringify(resolve(ui, 'test/setup.ts'))}],include:[${JSON.stringify(resolve(evaluation, 'contract.test.tsx'))}],fileParallelism:false,maxWorkers:1,minWorkers:1,reporters:['json'],outputFile:${JSON.stringify(resolve(evaluation, 'vitest.json'))},testTimeout:6000}};\n`;
write(resolve(evaluation, 'vitest.config.mjs'), config);
const runtime = runCommand(process.execPath, [resolve(ui, 'node_modules/vitest/vitest.mjs'), 'run', '--config', resolve(evaluation, 'vitest.config.mjs')]);
write(resolve(evaluation, 'stdout.log'), runtime.stdout); write(resolve(evaluation, 'stderr.log'), runtime.stderr);
let assertions = [], runtimeStatus = 'NOT_RUN', runtimeError = null;
if (existsSync(resolve(evaluation, 'vitest.json'))) {
  const output = json(resolve(evaluation, 'vitest.json'));
  assertions = (output.testResults ?? []).flatMap(file => (file.assertionResults ?? []).map(a => ({ name: a.fullName ?? a.title, status: a.status === 'passed' ? 'PASS' : a.status === 'failed' ? 'FAIL' : 'NOT_RUN', category: /\[([^\]]+)\]/.exec(a.fullName ?? a.title)?.[1] ?? 'contract', errors: a.failureMessages ?? [] })));
  runtimeStatus = assertions.length ? assertions.every(a => a.status === 'PASS') && runtime.exitCode === 0 ? 'PASS' : 'FAIL' : 'NOT_RUN';
  if (!assertions.length || output.numRuntimeErrorTestSuites > 0) runtimeError = (output.testResults ?? []).map(f => f.message).filter(Boolean).join('\n') || 'Suite failed to load';
} else runtimeError = runtime.error ?? runtime.stderr ?? 'No runtime output';
const telemetryPath = options.telemetry ? resolve(options.telemetry) : resolve(directory, 'telemetry.json');
const telemetry = existsSync(telemetryPath) ? json(telemetryPath) : {};
for (const key of ['toolCalls', 'humanCorrections', 'elapsedSeconds']) if (telemetry[key] !== undefined && telemetry[key] !== null && (!Number.isFinite(telemetry[key]) || telemetry[key] < 0)) throw new Error(`Invalid telemetry ${key}`);
const failed = assertions.filter(a => a.status === 'FAIL');
const result = {
  schemaVersion: 1, run: manifest.id, group: manifest.group, task: manifest.task, replicate: manifest.replicate, model: manifest.model, reasoningEffort: manifest.reasoningEffort,
  status: !targetUnchanged || !materialsUnchanged ? 'UNVERIFIED' : types.status === 'FAIL' || failures.length || runtimeStatus === 'FAIL' ? 'FAIL' : types.status === 'NOT_RUN' || runtimeStatus === 'NOT_RUN' ? 'UNVERIFIED' : 'PASS',
  promptSHA256: hash(read(resolve(directory, 'prompt.txt'))), taskSHA256: manifest.taskSHA256, fixtureSHA256: manifest.fixtureSHA256, targetVersion: manifest.targetVersion,
  budget: manifest.budget, targetSourceSHA256: manifest.targetSourceSHA256, sourceFiles: files, changedFiles, materials: manifest.materialFiles, checks: { snapshot: { status: targetUnchanged && materialsUnchanged ? 'PASS' : 'FAIL', targetUnchanged, materialsUnchanged }, boundaries: { status: failures.length ? 'FAIL' : 'PASS', failures }, types, behavior: { status: runtimeStatus, assertions, infrastructureError: runtimeError, exitCode: runtime.exitCode } },
  metrics: { invalidImports: types.invalidImports, invalidProps: types.invalidProps, typeErrors: types.status === 'NOT_RUN' ? null : types.diagnostics.length,
    wrongOwnerOrScatteredEdits: failures.filter(f => ['wrong-owner', 'scattered-edit'].includes(f.category)).length,
    assertionFailures: runtimeStatus === 'NOT_RUN' ? null : failed.length, stateLossFailures: runtimeStatus === 'NOT_RUN' ? null : failed.filter(a => a.category === 'state-loss').length,
    falseSuccessFailures: runtimeStatus === 'NOT_RUN' ? null : failed.filter(a => a.category === 'false-success').length,
    humanCorrections: telemetry.humanCorrections ?? null, elapsedSeconds: telemetry.elapsedSeconds ?? null, toolCalls: telemetry.toolCalls ?? null,
    observedHarnessToolCalls: existsSync(resolve(directory, 'tool-events.json')) ? json(resolve(directory, 'tool-events.json')).length : 0 },
  observations: { externalFileEdits: telemetry.externalFileEdits ?? null, disallowedReads: telemetry.disallowedReads ?? null, transcript: telemetry.transcript ?? null },
  evaluatedAt: startedAt, evaluationElapsedSeconds: (Date.now() - Date.parse(startedAt)) / 1000,
  limitations: ['Restricted fixture and small sample; no population-level model quality claim.', 'Behavior is jsdom/pure-state evidence, not real browser, assistive technology, visual or production acceptance.', 'Read/write scope is an instruction and transcript audit boundary, not OS filesystem isolation.', 'Only wrapper calls are automatically counted; total tools/human corrections/time remain null unless supplied by the independent runner.'],
};
if (existsSync(resolve(directory, 'result.json'))) {
  const previous = read(resolve(directory, 'result.json'));
  write(resolve(directory, 'result-history', `${hash(previous)}.json`), previous);
}
writeJSON(resolve(directory, 'result.json'), result);
console.log(JSON.stringify({ run: result.run, status: result.status, metrics: result.metrics, result: resolve(directory, 'result.json') }, null, 2));
process.exitCode = result.status === 'PASS' ? 0 : result.status === 'FAIL' ? 1 : 2;
