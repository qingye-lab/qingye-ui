import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { tasks, harness, root, read, write, writeJSON, json, runDir, runCommand, compile } from './lib.mjs';
const batch = `self-${randomUUID().slice(0, 8)}`, results = [];
for (const [id, task] of Object.entries(tasks)) {
  const good = `${batch}-${id}-good`, bad = `${batch}-${id}-bad`;
  for (const run of [good, bad]) {
    const prep = runCommand(process.execPath, [resolve(harness, 'prepare.mjs'), '--id', run, '--group', 'selftest', '--task', id, '--replicate', '1']);
    if (prep.exitCode !== 0) throw new Error(prep.stderr);
    for (const file of task.files) write(resolve(runDir(run), 'work', file), read(resolve(harness, 'private/reference', id, file)));
  }
  const badDir = runDir(bad);
  if (id === 't01') write(resolve(badDir, 'work/state.ts'), read(resolve(badDir, 'work/state.ts')).replace('draft, phase: same(draft, base)', 'draft: { title: base.title, body: base.body }, phase: same(draft, base)'));
  if (id === 't02') write(resolve(badDir, 'work/theme.css'), ':root { --qy-field-group-gap: 12px; --qy-control-md: 12px; }\n');
  if (id === 't03') write(resolve(badDir, 'work/state.ts'), read(resolve(badDir, 'work/state.ts')).replace('r.kind === "failure"', 'r.kind !== "success"'));
  if (id === 't04') write(resolve(badDir, 'work/state.ts'), read(resolve(badDir, 'work/state.ts')).replace('phase: event.confirmed ? "cancelled" : "unknown"', 'phase: "cancelled"'));
  for (const run of [good, bad]) {
    const evaluation = runCommand(process.execPath, [resolve(harness, 'evaluate.mjs'), '--run', run]);
    if (!existsSync(resolve(runDir(run), 'result.json'))) throw new Error(evaluation.stderr || evaluation.stdout);
    const result = json(resolve(runDir(run), 'result.json'));
    results.push({ run, expected: run === good ? 'PASS' : 'FAIL', actual: result.status, metrics: result.metrics });
    if (result.status !== (run === good ? 'PASS' : 'FAIL')) { console.error(evaluation.stderr || evaluation.stdout); console.error(JSON.stringify(result.checks, null, 2)); }
  }
}
// Public package subpaths are as valid as the root barrel. Private paths remain invalid.
for (const kind of ['public-subpath', 'private-subpath']) {
  const id = `${batch}-${kind}`;
  const prep = runCommand(process.execPath, [resolve(harness, 'prepare.mjs'), '--id', id, '--group', 'selftest', '--task', 't01', '--replicate', '1']);
  if (prep.exitCode !== 0) throw new Error(prep.stderr);
  for (const file of tasks.t01.files) write(resolve(runDir(id), 'work', file), read(resolve(harness, 'private/reference/t01', file)));
  const path = resolve(runDir(id), 'work/Editor.tsx');
  const imports = 'import { Button } from "@qingye/ui/components/button";\nimport { Field, FieldGroup, FieldLabel } from "@qingye/ui/components/field";\nimport { Input } from "@qingye/ui/components/input";\nimport { Textarea } from "@qingye/ui/components/textarea";';
  write(path, read(path).replace('import { Button, Field, FieldGroup, FieldLabel, Input, Textarea } from "@qingye/ui";', kind === 'public-subpath' ? imports : imports.replace('@qingye/ui/components/button', '@qingye/ui/src/components/button')));
  const evaluation = runCommand(process.execPath, [resolve(harness, 'evaluate.mjs'), '--run', id]);
  const result = json(resolve(runDir(id), 'result.json'));
  results.push({ run:id, expected:kind === 'public-subpath' ? 'PASS' : 'FAIL', actual:result.status, metrics:result.metrics });
}
const status = results.every(r => r.expected === r.actual) ? 'PASS' : 'FAIL';
// Separate diagnostic probes demonstrate that compilation metrics come from
// the TypeScript checker, not string matching or a model's own claim.
const diagnosticProbes = [];
for (const kind of ['invalid-import', 'invalid-prop']) {
  const id = `${batch}-${kind}`;
  const prepared = runCommand(process.execPath, [resolve(harness, 'prepare.mjs'), '--id', id, '--group', 'selftest', '--task', 't01', '--replicate', '1']);
  if (prepared.exitCode !== 0) throw new Error(prepared.stderr);
  for (const file of tasks.t01.files) write(resolve(runDir(id), 'work', file), read(resolve(harness, 'private/reference/t01', file)));
  const path = resolve(runDir(id), 'work/Editor.tsx');
  write(path, kind === 'invalid-import' ? 'import { NonexistentQingyeWidget } from "@qingye/ui";\n' + read(path) : read(path).replace('<Button type="submit"', '<Button inventedAppearance="fake" type="submit"'));
  const check = compile(runDir(id)), count = kind === 'invalid-import' ? check.invalidImports : check.invalidProps;
  diagnosticProbes.push({ kind, status: count > 0 ? 'PASS' : 'FAIL', count, diagnostics: check.diagnostics });
}
const finalStatus = status === 'PASS' && diagnosticProbes.every(p => p.status === 'PASS') ? 'PASS' : 'FAIL';
writeJSON(resolve(harness, 'selftest-results', `${batch}.json`), { schemaVersion: 1, batch, status: finalStatus, results, diagnosticProbes });
console.log(JSON.stringify({ batch, status: finalStatus, results, diagnosticProbes }, null, 2));
process.exitCode = finalStatus === 'PASS' ? 0 : 1;
