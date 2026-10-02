import { resolve } from 'node:path';
import { readdirSync, existsSync } from 'node:fs';
import { args, harness, json, writeJSON, write } from './lib.mjs';
const options = args(), results = [];
for (const entry of readdirSync(resolve(harness, 'runs'))) {
  const path = resolve(harness, 'runs', entry, 'result.json');
  if (existsSync(path)) { const result = json(path); if (['baseline', 'new'].includes(result.group)) results.push(result); }
}
const cells = [];
for (const task of ['t01', 't02', 't03', 't04']) for (const group of ['baseline', 'new']) for (const replicate of [1, 2, 3]) {
  const matches = results.filter(r => r.task === task && r.group === group && r.replicate === replicate);
  cells.push({ task, group, replicate, status: matches.length === 0 ? 'NOT_RUN' : matches.length > 1 ? 'DUPLICATE' : matches[0].status, runs: matches.map(r => r.run) });
}
const output = resolve(options.output ?? resolve(harness, 'summary.json'));
writeJSON(output, { schemaVersion: 1, expectedTrials: 24, completedTrials: cells.filter(c => ['PASS', 'FAIL', 'UNVERIFIED'].includes(c.status)).length, cells, results, limitations: 'Limited fixed fixtures, 3 repetitions per cell. No statistical generalization. Keep all failures and invalid/incomplete trials.' });
console.log(JSON.stringify({ expected: 24, recorded: results.length, missing: cells.filter(c => c.status === 'NOT_RUN').length, duplicate: cells.filter(c => c.status === 'DUPLICATE').length, output }, null, 2));
