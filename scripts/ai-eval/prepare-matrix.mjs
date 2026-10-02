import { resolve } from 'node:path';
import { args, harness, writeJSON, runCommand, runDir } from './lib.mjs';
const options = args();
if (!/^[a-z0-9-]+$/.test(options.batch ?? '')) throw new Error('--batch requires lowercase letters, numbers and hyphens');
const rows = [];
for (const replicate of [1, 2, 3]) for (const task of ['t01', 't02', 't03', 't04']) {
  const groups = (replicate + Number(task.slice(1))) % 2 ? ['baseline', 'new'] : ['new', 'baseline'];
  for (const group of groups) {
    const id = `${options.batch}-${group === 'baseline' ? 'b' : 'n'}-${task}-${replicate}`;
    const argv = [resolve(harness, 'prepare.mjs'), '--id', id, '--group', group, '--task', task, '--replicate', String(replicate)];
    for (const flag of ['budget-tokens', 'budget-seconds']) if (options[flag]) argv.push(`--${flag}`, options[flag]);
    const result = runCommand(process.execPath, argv);
    if (result.exitCode !== 0) throw new Error(`${id}: ${result.stderr}`);
    rows.push({ order: rows.length + 1, id, group, task, replicate, prompt: resolve(runDir(id), 'prompt.txt'), work: resolve(runDir(id), 'work') });
  }
}
const output = resolve(harness, 'batches', `${options.batch}.json`);
writeJSON(output, { schemaVersion: 1, batch: options.batch, model: 'gpt-6.1-sol', reasoningEffort: 'xhigh', freshContext: true, rows });
console.log(JSON.stringify({ output, count: rows.length, first: rows[0] }, null, 2));
