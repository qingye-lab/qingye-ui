import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { args, runDir, json, writeJSON } from './lib.mjs';
const options = args(), directory = runDir(options.run), path = resolve(directory, 'telemetry.json');
const value = existsSync(path) ? json(path) : {}, now = new Date().toISOString();
if (options.event === 'start') {
  if (value.startedAt) throw new Error('Start already recorded; preserve the original trial time');
  value.startedAt = now;
} else if (options.event === 'finish') {
  if (value.finishedAt) throw new Error('Finish already recorded');
  value.finishedAt = now;
  value.elapsedSeconds = value.startedAt ? (Date.parse(now) - Date.parse(value.startedAt)) / 1000 : null;
} else throw new Error('--event start|finish required');
for (const [flag, key] of [['tool-calls', 'toolCalls'], ['human-corrections', 'humanCorrections']]) {
  if (options[flag]) { const number = Number(options[flag]); if (!Number.isInteger(number) || number < 0) throw new Error(`Invalid ${flag}`); value[key] = number; }
}
if (options.transcript) value.transcript = options.transcript;
writeJSON(path, value); console.log(JSON.stringify(value, null, 2));
