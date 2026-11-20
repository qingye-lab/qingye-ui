#!/usr/bin/env node
// S1 评测入口。
//   node run.mjs --task T1 --cond D0|D05|DN --agent claude|codex --rep 1 [--root <dir>] [--timeout <分钟>]
//   node run.mjs --task T0 --cond D0|D05|DN --selftest skeleton|reference|wrong:<name> [--root <dir>]
import { existsSync, mkdirSync, openSync, closeSync, readdirSync, lstatSync, readFileSync, cpSync, rmSync, realpathSync, copyFileSync, chmodSync, writeFileSync } from 'node:fs';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { hash, read, json, write, writeJSON, args } from '../lib.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const options = args();
const { task, cond, agent, selftest } = options;
const rep = options.rep ?? '1';
// DN 用独立根目录，代理在同级目录里找不到带完整指南的 D0 模板与以往答案
const root = resolve(options.root ?? (cond === 'DN' ? '/private/tmp/qingye-s1-dn' : '/private/tmp/qingye-s1-runs'));
const timeoutMinutes = Number(options.timeout ?? 40);

const fail = (message) => { console.error('FAIL ' + message); process.exit(1); };
const sh = (command, argv, opts = {}) => spawnSync(command, argv, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...opts });

if (!/^T\d+$/.test(task ?? '')) fail('需要 --task T<数字>');
if (!['D0', 'D05', 'DN'].includes(cond)) fail('--cond 只能是 D0、D05 或 DN');
if (selftest) {
  if (!/^(skeleton|reference|wrong|wrong:[\w.-]+)$/.test(selftest)) fail('--selftest 只能是 skeleton|reference|wrong|wrong:<name>');
} else if (!['claude', 'codex'].includes(agent)) fail('--agent 只能是 claude 或 codex（或使用 --selftest）');
if (!/^\d+$/.test(rep)) fail('--rep 需要整数');

// 1. 冻结校验
const freeze = sh('node', [resolve(here, 'freeze.mjs'), '--verify']);
if (freeze.status !== 0) {
  const text = (freeze.stderr || freeze.stdout).trim();
  if (selftest) console.warn('警告（自测模式，继续）：\n' + text);
  else fail('冻结校验不一致，拒绝运行：\n' + text);
}

const taskDir = resolve(here, 'tasks', task);
if (!existsSync(resolve(taskDir, 'task.json'))) fail(`找不到 tasks/${task}/task.json`);
const taskInfo = json(resolve(taskDir, 'task.json'));

// 对 wrong/<T>/ 下每个错解各跑一次
if (selftest === 'wrong') {
  const dir = resolve(here, 'wrong', task);
  const names = existsSync(dir) ? readdirSync(dir).filter(n => lstatSync(resolve(dir, n)).isDirectory()).sort() : [];
  if (!names.length) fail(`wrong/${task}/ 下没有错解`);
  let bad = 0;
  for (const name of names) {
    const child = spawnSync('node', [fileURLToPath(import.meta.url), '--task', task, '--cond', cond, '--selftest', 'wrong:' + name, '--rep', rep, '--root', root], { encoding: 'utf8' });
    const line = child.stdout.trim().split('\n').filter(l => l.startsWith('错解')).pop() ?? `错解 ${name}：未得到结论 ${child.stderr.slice(0, 200)}`;
    console.log(line);
    if (!line.startsWith(`错解 ${name}：合格`)) bad++;
  }
  console.log(bad ? `FAIL ${bad}/${names.length} 个错解自测不合格` : `PASS ${names.length} 个错解自测全部合格`);
  process.exit(bad ? 1 : 0);
}

// 2. 运行目录必须在仓库外，且各级父目录没有 CLAUDE.md / AGENTS.md
const repoRoot = resolve(here, '../../..');
mkdirSync(root, { recursive: true });
const realRoot = realpathSync(root);
if (realRoot === repoRoot || realRoot.startsWith(repoRoot + '/')) fail(`运行根目录必须在仓库之外：${realRoot}`);
for (let dir = realRoot; ; dir = dirname(dir)) {
  for (const name of ['CLAUDE.md', 'AGENTS.md']) if (existsSync(resolve(dir, name))) fail(`父目录含 ${name}：${dir}`);
  if (dirname(dir) === dir) break;
}

const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
const who = selftest ? 'selftest-' + selftest.replace(':', '-') : agent;
const runId = `${task}-${cond}-${who}-${rep}-${stamp}`;
const runDir = resolve(root, runId);
const side = (suffix) => resolve(root, `${runId}.${suffix}`);

// 3. 依赖模板：fixture + 条件 + tgz 的指纹
function listFiles(dir) {
  const files = [];
  (function visit(path) {
    for (const name of readdirSync(path).sort()) {
      const full = resolve(path, name), stat = lstatSync(full);
      if (name === '.DS_Store') continue;
      if (stat.isDirectory()) visit(full); else files.push(relative(dir, full));
    }
  })(dir);
  return files;
}
const conditionDir = resolve(here, cond === 'DN' ? 'conditions/dn' : 'conditions/d05');
const strip = cond === 'DN' ? json(resolve(conditionDir, 'strip.json')) : null;
const parts = [];
for (const base of cond === 'D0' ? [resolve(here, 'fixture')] : [resolve(here, 'fixture'), conditionDir])
  for (const file of listFiles(base)) parts.push([relative(here, resolve(base, file)), hash(read(resolve(base, file)))]);
const tgzs = existsSync(resolve(here, 'vendor')) ? readdirSync(resolve(here, 'vendor')).filter(n => n.endsWith('.tgz')).sort() : [];
if (!tgzs.length) fail('vendor/ 下没有 tgz');
for (const name of tgzs) parts.push(['vendor/' + name, hash(readFileSync(resolve(here, 'vendor', name)).toString('latin1'))]);
const fingerprint = hash(JSON.stringify(parts)).slice(0, 12);
const template = resolve(root, `_template-${fingerprint}-${cond}`);

function copyTree(from, to) {
  mkdirSync(to, { recursive: true });
  const clone = sh('cp', ['-cR', from + '/.', to]);
  if (clone.status !== 0) {
    const plain = sh('cp', ['-R', from + '/.', to]);
    if (plain.status !== 0) fail('复制失败：' + plain.stderr);
  }
}
// DN：解包、删去指南及其 exports/files 条目、按原名重新打包。node_modules 与 vendor/ 都只见删减版
function buildStripped(source, target) {
  const work = resolve(root, `_strip-${fingerprint}`);
  rmSync(work, { recursive: true, force: true });
  mkdirSync(work, { recursive: true });
  if (sh('tar', ['xzf', source, '-C', work]).status !== 0) fail('解包失败：' + source);
  const pkgDir = resolve(work, 'package');
  for (const entry of strip.remove) rmSync(resolve(pkgDir, entry), { recursive: true, force: true });
  const pkg = json(resolve(pkgDir, 'package.json'));
  for (const key of strip.removeExports) delete pkg.exports[key];
  pkg.files = pkg.files.filter(entry => !strip.remove.some(r => entry.replace(/^!/, '') === r || entry.replace(/^!/, '').startsWith(r + '/')));
  writeJSON(resolve(pkgDir, 'package.json'), pkg);
  if (sh('tar', ['czf', target, '-C', work, 'package'], { env: { ...process.env, COPYFILE_DISABLE: '1' } }).status !== 0) fail('打包失败：' + target);
  rmSync(work, { recursive: true, force: true });
}
function overlay(from, to) { if (existsSync(from)) cpSync(from, to, { recursive: true, force: true, verbatimSymlinks: true }); }

if (!existsSync(resolve(template, '.template-ok'))) {
  console.log(`构建依赖模板 ${template}`);
  rmSync(template, { recursive: true, force: true });
  overlay(resolve(here, 'fixture'), template);
  mkdirSync(resolve(template, 'vendor'), { recursive: true });
  for (const name of tgzs) {
    if (strip?.omitVendor.includes(name)) continue;
    if (strip && name === strip.package) buildStripped(resolve(here, 'vendor', name), resolve(template, 'vendor', name));
    else cpSync(resolve(here, 'vendor', name), resolve(template, 'vendor', name));
  }
  if (cond === 'D05') {
    for (const name of ['AGENTS.md', 'CLAUDE.md', 'design.md', 'ui.config.json']) cpSync(resolve(conditionDir, name), resolve(template, name));
    const pkg = json(resolve(template, 'package.json')), extra = json(resolve(conditionDir, 'package.overlay.json'));
    for (const key of ['dependencies', 'devDependencies', 'scripts']) if (extra[key]) pkg[key] = { ...pkg[key], ...extra[key] };
    writeJSON(resolve(template, 'package.json'), pkg);
  }
  const log = resolve(root, `_template-${fingerprint}-${cond}.install.log`);
  const fd = openSync(log, 'w');
  const install = spawnSync('pnpm', ['install'], { cwd: template, stdio: ['ignore', fd, fd] });
  closeSync(fd);
  if (install.status !== 0) fail(`pnpm install 失败，见 ${log}`);
  if (strip) {
    const installed = resolve(template, 'node_modules/@qingye_lab/ui');
    const left = strip.remove.filter(entry => existsSync(resolve(installed, entry)));
    if (left.length) fail('DN 模板里仍有指南：' + left.join(', '));
    const leak = sh('grep', ['-rlF', '--', strip.sentinel, template]);
    if (leak.stdout.trim()) fail('DN 模板里仍有指南原句：' + leak.stdout.trim().split('\n').slice(0, 3).join(', '));
  }
  write(resolve(template, '.template-ok'), '');
}

// 4. 复制模板并叠加题目
copyTree(template, runDir);
rmSync(resolve(runDir, '.template-ok'), { force: true });
copyTree(resolve(taskDir, 'files'), runDir);
cpSync(resolve(taskDir, 'TASK.md'), resolve(runDir, 'TASK.md'));
if (selftest === 'reference') overlay(resolve(here, 'reference', task), runDir);
else if (selftest?.startsWith('wrong:')) {
  const dir = resolve(here, 'wrong', task, selftest.slice(6));
  if (!existsSync(dir)) fail(`找不到 ${dir}`);
  overlay(dir, runDir);
}

// 5. git 初始提交（假身份；node_modules 与 vendor 不入库）
const git = (...a) => sh('git', ['-c', 'user.name=eval', '-c', 'user.email=eval@localhost', '-c', 'commit.gpgsign=false', ...a], { cwd: runDir });
git('init', '-q');
write(resolve(runDir, '.git/info/exclude'), 'node_modules\nvendor\n');
git('add', '-A');
const commit = git('commit', '-q', '-m', 'initial state');
if (commit.status !== 0) fail('初始提交失败：' + commit.stderr);

// 6. 调用代理
const prompt = read(resolve(here, 'prompt.txt')).trim();
const meta = { runId, task, cond, agent: selftest ? null : agent, selftest: selftest ?? null, rep: Number(rep), templateFingerprint: fingerprint, templateDir: template, freezeVersion: (() => { try { return json(resolve(here, 'freeze.json')).version; } catch { return null; } })(), startedAt: new Date().toISOString() };
if (!selftest) {
  // 隔离与固定模型：Codex 用只含认证文件的临时 CODEX_HOME（不带全局 AGENTS.md、记忆、技能、插件），用完删除；
  // Claude 只加载 project/local 设置（不带用户级 hooks、插件），用户级 CLAUDE.md 仍会加载，记为混杂因素。
  const MODELS = { claude: 'claude-opus-5-5', codex: 'gpt-6.2-sol', codexEffort: 'low' };
  let env = process.env, isolatedHome = null;
  if (agent === 'codex') {
    const realHome = process.env.CODEX_HOME || resolve(process.env.HOME, '.codex');
    isolatedHome = side('codex-home');
    rmSync(isolatedHome, { recursive: true, force: true });
    mkdirSync(isolatedHome, { recursive: true, mode: 0o700 });
    copyFileSync(resolve(realHome, 'auth.json'), resolve(isolatedHome, 'auth.json'));
    chmodSync(resolve(isolatedHome, 'auth.json'), 0o600);
    writeFileSync(resolve(isolatedHome, 'config.toml'), `cli_auth_credentials_store = "file"\nmodel = "${MODELS.codex}"\nmodel_reasoning_effort = "${MODELS.codexEffort}"\n`);
    env = { ...process.env, CODEX_HOME: isolatedHome };
  }
  const cli = agent === 'claude'
    ? ['claude', ['-p', prompt, '--model', MODELS.claude, '--setting-sources', 'project,local', '--permission-mode', 'bypassPermissions', '--output-format', 'stream-json', '--verbose']]
    : ['codex', ['exec', '--json', '--skip-git-repo-check', '--sandbox', 'workspace-write', '-c', 'sandbox_workspace_write.network_access=true', '-C', runDir, prompt]];
  meta.version = sh(cli[0], ['--version']).stdout.trim();
  meta.isolation = agent === 'codex' ? { codexHome: 'temporary, auth.json only', residual: '~/.agents/skills still discoverable', model: MODELS.codex, effort: MODELS.codexEffort } : { settingSources: 'project,local', model: MODELS.claude, userClaudeMd: 'not loaded (probe 2026-11-20)', residual: 'built-in/managed plugins and skills still load' };
  const out = openSync(side('transcript.jsonl'), 'w'), err = openSync(side('stderr.log'), 'w');
  const began = Date.now();
  console.log(`运行 ${agent}：${runId}（超时 ${timeoutMinutes} 分钟）`);
  const result = spawnSync(cli[0], cli[1], { cwd: runDir, env, stdio: ['ignore', out, err], timeout: timeoutMinutes * 60000, killSignal: 'SIGKILL' });
  closeSync(out); closeSync(err);
  if (isolatedHome) {
    // Codex 可能在副本里刷新了令牌：副本与原件不同就不删，留给人工核对后再同步，避免真实登录失效
    const realAuth = resolve(process.env.CODEX_HOME || resolve(process.env.HOME, '.codex'), 'auth.json');
    const copyAuth = resolve(isolatedHome, 'auth.json');
    meta.authChanged = existsSync(copyAuth) && readFileSync(copyAuth, 'utf8') !== readFileSync(realAuth, 'utf8');
    if (meta.authChanged) console.log(`警告：Codex 在隔离目录里改写了 auth.json，保留 ${isolatedHome} 供核对，未删除`);
    else rmSync(isolatedHome, { recursive: true, force: true });
  }
  Object.assign(meta, { exitCode: result.status, signal: result.signal, timedOut: result.error?.code === 'ETIMEDOUT', spawnError: result.error?.message ?? null, durationSeconds: Math.round((Date.now() - began) / 1000) });
}
writeJSON(side('meta.json'), meta);

// 7. 评估
const evaluation = spawnSync('node', [resolve(here, 'evaluate.mjs'), runDir], { stdio: 'inherit' });
process.exit(evaluation.status ?? 1);
