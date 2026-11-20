#!/usr/bin/env node
// 冻结 S1 评测材料：对题目、隐藏测试、参考解、固定提示、脚本、fixture 和 tgz 记 sha256。
// node freeze.mjs            生成 freeze.json
// node freeze.mjs --verify   比对，有变化退出码 1
import { existsSync, lstatSync, readdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { writeJSON, json } from '../lib.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, 'freeze.json');
const reasonIndex = process.argv.indexOf('--reason');
const reason = reasonIndex > 0 ? process.argv[reasonIndex + 1] : null;
const sha = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');

function walk(path, files) {
  const stat = lstatSync(path);
  if (stat.isSymbolicLink()) files.push([relative(here, path), 'symlink']);
  else if (stat.isDirectory()) for (const name of readdirSync(path).sort()) { if (name !== '.DS_Store') walk(resolve(path, name), files); }
  else files.push([relative(here, path), sha(path)]);
}

function collect() {
  const files = [];
  for (const entry of ['tasks', 'private', 'reference', 'wrong', 'fixture', 'conditions', 'prompt.txt', 'run.mjs', 'evaluate.mjs']) {
    const path = resolve(here, entry);
    if (existsSync(path)) walk(path, files);
  }
  const vendor = resolve(here, 'vendor');
  if (existsSync(vendor)) for (const name of readdirSync(vendor).sort()) if (name.endsWith('.tgz')) walk(resolve(vendor, name), files);
  files.sort((a, b) => a[0].localeCompare(b[0]));
  return Object.fromEntries(files);
}

function version(command) {
  const result = spawnSync(command, ['--version'], { encoding: 'utf8', timeout: 30000 });
  return result.status === 0 ? result.stdout.trim() : `UNAVAILABLE (${result.error?.message ?? result.status})`;
}

const total = (files) => createHash('sha256').update(JSON.stringify(Object.entries(files))).digest('hex');

if (process.argv.includes('--verify')) {
  if (!existsSync(out)) { console.error('FAIL freeze.json 不存在，先运行 node freeze.mjs'); process.exit(1); }
  const frozen = json(out), now = collect(), problems = [];
  for (const path of new Set([...Object.keys(frozen.files), ...Object.keys(now)])) {
    if (!(path in now)) problems.push(`删除 ${path}`);
    else if (!(path in frozen.files)) problems.push(`新增 ${path}`);
    else if (now[path] !== frozen.files[path]) problems.push(`变化 ${path}`);
  }
  for (const cli of ['claude', 'codex']) {
    const current = version(cli);
    if (current !== frozen.versions[cli]) problems.push(`版本 ${cli}: 冻结 ${frozen.versions[cli]} -> 现在 ${current}`);
  }
  if (problems.length) { console.error(`FAIL 冻结校验不一致（${problems.length} 项）\n` + problems.join('\n')); process.exit(1); }
  console.log(`PASS 冻结 v${frozen.version} 校验一致 ${frozen.fingerprint.slice(0, 12)}`);
} else {
  const files = collect(), previous = existsSync(out) ? json(out) : null;
  const next = (previous?.version ?? 0) + 1;
  if (previous && !reason) { console.error('FAIL 已有冻结 v' + previous.version + '，出新版须说明原因：node freeze.mjs --reason "..."'); process.exit(1); }
  const record = { version: next, reason: reason ?? '初始冻结', generatedAt: new Date().toISOString(), fingerprint: total(files), versions: { claude: version('claude'), codex: version('codex') }, fileCount: Object.keys(files).length, files };
  writeJSON(resolve(here, 'freezes', `v${next}.json`), record);
  writeJSON(out, record);
  console.log(`已写入冻结 v${next}（freeze.json 与 freezes/v${next}.json），${Object.keys(files).length} 个文件`);
}
