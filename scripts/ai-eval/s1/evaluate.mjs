#!/usr/bin/env node
// 评估一个运行目录：node evaluate.mjs <运行目录>
// 结果写到 <运行目录>.result.json，并复制到 s1/results/<runId>.json。
import { existsSync, readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { read, json, write, writeJSON } from '../lib.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../../..');
const runDir = resolve(process.argv[2] ?? '');
if (!process.argv[2] || !existsSync(resolve(runDir, 'package.json'))) { console.error('用法：node evaluate.mjs <运行目录>'); process.exit(1); }
const runId = basename(runDir), outer = dirname(runDir);
const side = (suffix) => resolve(outer, `${runId}.${suffix}`);
const sh = (command, argv, opts = {}) => spawnSync(command, argv, { cwd: runDir, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...opts });

const meta = existsSync(side('meta.json')) ? json(side('meta.json')) : {};
const taskId = meta.task ?? runId.match(/^(T\d+)-/)?.[1];
const taskInfo = json(resolve(here, 'tasks', taskId, 'task.json'));
const reasons = [];
const result = { runId, task: taskId, cond: meta.cond ?? null, agent: meta.agent ?? null, selftest: meta.selftest ?? null, rep: meta.rep ?? null, agentRun: { exitCode: meta.exitCode ?? null, signal: meta.signal ?? null, timedOut: meta.timedOut ?? false, durationSeconds: meta.durationSeconds ?? null, version: meta.version ?? null, model: meta.isolation?.model ?? null, effort: meta.isolation?.effort ?? null, profile: meta.agentProfile ?? null, network: meta.isolation?.network ?? null }, evaluatedAt: new Date().toISOString() };

// v18：评估期间把受保护文件换成冻结版本，结束后放回代理的版本，重评时证据不丢。
// 上次评估中途退出时，代理的版本还在暂存里，先放回。
const stashPath = side('agent-protected.json');
function restoreAgentFiles() {
  if (!existsSync(stashPath)) return;
  for (const [f, b64] of Object.entries(json(stashPath))) {
    const current = resolve(runDir, f);
    if (b64 === null) rmSync(current, { force: true }); else writeFileSync(current, Buffer.from(b64, 'base64'));
  }
  rmSync(stashPath, { force: true });
}
restoreAgentFiles();
// v17 及以前的评估把受保护文件永久还原，代理改动已不在目录里；沿用那次（或其后沿用下来的）记录。
const previous = existsSync(side('result.json')) ? json(side('result.json')) : null;
const carried = !previous ? null : previous.evidence === 'restore-after' ? previous.evidenceCarried ?? null
  : { from: previous.evaluatedAt, files: previous.changes?.files ?? [], outOfScope: previous.changes?.outOfScope ?? [], depsAdded: previous.changes?.depsAdded ?? [], depsChanged: previous.changes?.depsChanged ?? [], depsRemoved: previous.changes?.depsRemoved ?? [], protectedFilesModifiedByAgent: previous.protectedFilesModifiedByAgent ?? [] };
const union = (a, b) => [...new Set([...(a ?? []), ...(b ?? [])])];

// 1. 先取 git 变更（此时还没放入隐藏测试）
const porcelain = sh('git', ['status', '--porcelain', '-uall']).stdout.split('\n').filter(Boolean).map(l => l.slice(3).replace(/^"|"$/g, ''));
const stat = sh('git', ['diff', '--stat', 'HEAD']).stdout.trim().split('\n').pop() ?? '';
const baseDeps = (() => { try { const p = JSON.parse(sh('git', ['show', 'HEAD:package.json']).stdout); return { ...p.dependencies, ...p.devDependencies }; } catch { return {}; } })();
const nowDeps = (() => { try { const p = json(resolve(runDir, 'package.json')); return { ...p.dependencies, ...p.devDependencies }; } catch { return {}; } })();
const depsAdded = Object.keys(nowDeps).filter(k => !(k in baseDeps)), depsChanged = Object.keys(nowDeps).filter(k => k in baseDeps && baseDeps[k] !== nowDeps[k]), depsRemoved = Object.keys(baseDeps).filter(k => !(k in nowDeps));
// 题面允许在 src/ 下新增文件（src/test/、src/__hidden__/ 除外）；改动已有的非可编辑文件才算越界。
const untracked = new Set(sh('git', ['ls-files', '--others', '--exclude-standard']).stdout.split('\n').filter(Boolean));
const outOfScope = porcelain.filter(f => !taskInfo.editable.includes(f) && f !== 'report.md'
  && !(untracked.has(f) && f.startsWith('src/') && !f.startsWith('src/test/') && !f.startsWith('src/__hidden__/')));
result.changes = { files: union(porcelain, carried?.files), diffStat: stat, outOfScope: union(outOfScope, carried?.outOfScope), depsAdded: union(depsAdded, carried?.depsAdded), depsChanged: union(depsChanged, carried?.depsChanged), depsRemoved: union(depsRemoved, carried?.depsRemoved), reportPresent: existsSync(resolve(runDir, 'report.md')) };
result.evidence = 'restore-after';
if (carried) result.evidenceCarried = carried;

// 2. 受保护文件换成冻结版本（代理可能改过），记录被改动者；再放入隐藏测试。
// 冻结版本取模板；模板已删时取运行目录的 git HEAD（运行开始时的快照），不再静默跳过。
const protectedFiles = ['vitest.config.ts', 'src/test/setup.ts', 'package.json', 'tsconfig.json'];
const protectedChanged = [], stash = {};
const useTemplate = Boolean(meta.templateDir && existsSync(meta.templateDir));
result.protectedSource = useTemplate ? 'template' : 'git HEAD';
for (const f of protectedFiles) {
  let frozen = null;
  if (useTemplate) { const p = resolve(meta.templateDir, f); if (existsSync(p)) frozen = readFileSync(p); }
  else { const g = sh('git', ['show', `HEAD:${f}`], { encoding: 'buffer' }); if (g.status === 0) frozen = g.stdout; }
  if (!frozen) continue;
  const current = resolve(runDir, f), now = existsSync(current) ? readFileSync(current) : null;
  if (!now || !now.equals(frozen)) { protectedChanged.push(f); stash[f] = now ? now.toString('base64') : null; mkdirSync(dirname(current), { recursive: true }); writeFileSync(current, frozen); }
}
if (Object.keys(stash).length) writeJSON(stashPath, stash);
result.protectedFilesModifiedByAgent = union(protectedChanged, carried?.protectedFilesModifiedByAgent);
result.freezeVersion = meta.freezeVersion ?? null;
try { result.scoredWithFreeze = JSON.parse(readFileSync(resolve(here, 'freeze.json'), 'utf8')).version; } catch { result.scoredWithFreeze = null; }
const hiddenDir = resolve(runDir, 'src/__hidden__');
rmSync(hiddenDir, { recursive: true, force: true });
for (const name of ['_env.ts', ...taskInfo.hidden]) { const from = resolve(here, 'private', name); mkdirSync(hiddenDir, { recursive: true }); cpSync(from, resolve(hiddenDir, name)); }
const vitestOut = side('vitest.json');
rmSync(vitestOut, { force: true });
const vitest = sh('pnpm', ['exec', 'vitest', 'run', 'src/__hidden__', '--reporter=json', `--outputFile=${vitestOut}`], { timeout: 600000 });
const tests = { ran: false, exitCode: vitest.status, passed: 0, failed: 0, failedSuites: 0, byCategory: {}, assertions: [] };
if (existsSync(vitestOut)) {
  try {
    const report = json(vitestOut);
    tests.ran = true;
    for (const suite of report.testResults ?? []) {
      if (suite.status === 'failed' && !(suite.assertionResults ?? []).length) { tests.failedSuites++; tests.suiteError = (suite.message ?? '').slice(0, 400); }
      for (const a of suite.assertionResults ?? []) {
        const name = a.title ?? a.fullName, category = (name.match(/^\[([\w-]+)\]/) ?? (a.fullName ?? '').match(/\[([\w-]+)\]/))?.[1] ?? 'uncategorized';
        const ok = a.status === 'passed';
        tests.assertions.push({ name: a.fullName ?? name, category, status: a.status, ...(ok ? {} : { message: (a.failureMessages?.[0] ?? '').slice(0, 300) }) });
        const c = tests.byCategory[category] ??= { passed: 0, failed: 0 };
        if (ok) { tests.passed++; c.passed++; } else if (a.status === 'failed') { tests.failed++; c.failed++; }
      }
    }
  } catch (e) { tests.parseError = String(e); }
}
result.hiddenTests = tests;

// 3. tsc（排除 src/__hidden__）；另记含隐藏测试的错误数，仅供参考
function tsc(extra) {
  const file = resolve(runDir, 'tsconfig.eval.json');
  writeJSON(file, { extends: './tsconfig.json', ...extra });
  const run = sh('pnpm', ['exec', 'tsc', '--noEmit', '-p', 'tsconfig.eval.json', '--pretty', 'false'], { timeout: 300000 });
  rmSync(file, { force: true });
  const errors = (run.stdout + run.stderr).split('\n').map(l => l.match(/^(.+?)\(\d+,\d+\): error (TS\d+): (.*)$/)).filter(Boolean).map(m => ({ file: m[1], code: m[2], message: m[3].slice(0, 160) }));
  return { ran: run.status !== null, exitCode: run.status, errorCount: errors.length, first20: errors.slice(0, 20) };
}
result.tsc = tsc({ include: ['src'], exclude: ['src/__hidden__'] });
result.tscWithHidden = { errorCount: tsc({ include: ['src'] }).errorCount };

// 4. editable 文件的 import 说明符
const imports = {};
try {
  const ts = createRequire(resolve(runDir, 'package.json'))('typescript');
  for (const file of taskInfo.editable) {
    const path = resolve(runDir, file);
    if (!existsSync(path)) { imports[file] = null; continue; }
    const source = ts.createSourceFile(file, read(path), ts.ScriptTarget.Latest, true, file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    const specs = new Set();
    (function visit(node) {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) specs.add(node.moduleSpecifier.text);
      else if (ts.isCallExpression(node) && node.arguments[0] && ts.isStringLiteralLike(node.arguments[0]) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === 'require'))) specs.add(node.arguments[0].text);
      ts.forEachChild(node, visit);
    })(source);
    imports[file] = [...specs].sort();
  }
} catch (e) { imports._error = String(e); }
result.imports = imports;

// 5. 事后度量：qingye-ui check（不回馈代理）。D0 没有配置时临时放入 D05 的 ui.config.json，用完删除
const configPath = resolve(runDir, 'ui.config.json'), hadConfig = existsSync(configPath);
if (!hadConfig) cpSync(resolve(here, 'conditions/d05/ui.config.json'), configPath);
const checkRun = sh('node', [resolve(repoRoot, 'packages/tooling/bin/qingye-ui.mjs'), 'check', '--project', runDir, '--json'], { cwd: repoRoot, timeout: 300000 });
if (!hadConfig) rmSync(configPath, { force: true });
try {
  const c = JSON.parse(checkRun.stdout), groups = {};
  for (const d of c.diagnostics ?? []) { const k = `${d.rule}|${d.status}`; groups[k] = (groups[k] ?? 0) + 1; }
  result.qingyeCheck = { exitCode: checkRun.status, status: c.status, completed: c.completed, counts: c.counts ?? null, byRuleStatus: groups, first10: (c.diagnostics ?? []).slice(0, 10).map(d => ({ rule: d.rule, status: d.status, file: d.file, line: d.line, evidence: String(d.evidence ?? '').slice(0, 80) })), error: c.error ?? null };
} catch { result.qingyeCheck = { exitCode: checkRun.status, status: 'NOT_RUN', error: (checkRun.stderr || checkRun.stdout).slice(0, 300) }; }
rmSync(resolve(runDir, '.qingye'), { recursive: true, force: true });
// check 工具来自本仓库而不是冻结材料，记下它的提交与是否有未提交改动
result.qingyeCheck.tooling = { commit: sh('git', ['log', '-1', '--format=%h', '--', 'packages/tooling'], { cwd: repoRoot }).stdout.trim() || null, dirty: sh('git', ['status', '--porcelain', '--', 'packages/tooling'], { cwd: repoRoot }).stdout.trim().length > 0 };
restoreAgentFiles();

// 6. 污染判定
// 本仓库、评测框架、示范项目，以及代理的全局记忆（Codex 记忆与摘要、本项目在 Claude 下的记忆目录）
const markers = ['/Volumes/SUNSANG 1/Codex/qingye-ui', 'scripts/ai-eval', 'demo/qingye', 'memories/MEMORY.md', 'rollout_summaries', '-Volumes-SUNSANG-1-Codex-qingye-ui'];
const transcriptPath = side('transcript.jsonl');
const transcript = existsSync(transcriptPath) ? read(transcriptPath) : null;
const hits = transcript ? markers.filter(m => transcript.includes(m)) : [];
if (transcript) {
  // 同级运行目录（其他格的答案、带完整指南的模板、自测目录）：路径进入另一运行目录或模板。
  // v15：运行根目录名按 qingye-s1-<名> 推导（含 n0-dn 等新根）；逐个 JSON 字符串、逐行判定。
  // v18：根目录下可再嵌两层（第三轮 qingye-s1-r3/<cond>/<lane>-<T>-<n>/）；自己的目录按完整路径判定，
  // 截断的前缀（进度摘要里的 …、通配符 *）只在后面紧跟截断记号或字符串结束时才算自己的。
  // 只出现在沙箱拒绝行（Operation not permitted / Permission denied）的路径没有读到内容，记入 blockedSiblingAttempts，不算污染；其余出现（代理动作、正常工具结果、文本）照旧算污染。
  const siblingRe = /qingye-s1-[a-z0-9-]+\/(?:[^\/\s"'`\\]+\/){0,2}?(?:T\d|_template|_strip)[A-Za-z0-9_.\/-]*/g;
  const ownRel = runDir.includes('qingye-s1-') ? runDir.slice(runDir.indexOf('qingye-s1-')) : null;
  const isOwn = (p, next) => ownRel !== null && (p === ownRel || p.startsWith(ownRel + '/') || p.startsWith(ownRel + '.') || (/^(?:[*…?{[]|$)/.test(next) && ownRel.startsWith(p)));
  const othersIn = (l) => [...l.matchAll(siblingRe)].filter(m => !isOwn(m[0], l[m.index + m[0].length] ?? '')).map(m => m[0]);
  const denied = /Operation not permitted|Permission denied/;
  const siblingSet = new Set(), blockedSet = new Set();
  for (const line of transcript.split('\n')) {
    let event; try { event = JSON.parse(line); } catch { event = line; }
    (function walk(v) {
      if (typeof v === 'string') { for (const l of v.split('\n')) for (const p of othersIn(l)) (denied.test(l) ? blockedSet : siblingSet).add(p); }
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === 'object') Object.values(v).forEach(walk);
    })(event);
  }
  const siblings = [...siblingSet];
  result.blockedSiblingAttempts = [...blockedSet].filter(p => !siblingSet.has(p)).slice(0, 10);
  hits.push(...siblings.slice(0, 5).map(p => 'sibling:' + p));
  // 从网络或本机全局缓存取本库的包或文档。只看代理的动作（命令、搜索、抓取），不看它读到的文件内容
  const library = /qingye[_-]lab|xflux/i; // 运行根目录名也含 qingye，不能只匹配 qingye
  for (const line of transcript.split('\n')) {
    let event; try { event = JSON.parse(line); } catch { continue; }
    const actions = [];
    if (event.item?.type === 'web_search') actions.push(['web', JSON.stringify(event.item.query ?? '') + JSON.stringify(event.item.action ?? '')]);
    if (event.item?.type === 'command_execution') actions.push(['cmd', String(event.item.command ?? '')]);
    // v15：Codex 托管连接器（如 codex_apps 的 search_service.web_run）不受 web_search 开关约束，按联网动作检查
    if (event.item?.type === 'mcp_tool_call') actions.push(['web', JSON.stringify({ server: event.item.server, tool: event.item.tool, arguments: event.item.arguments })]);
    for (const block of event.message?.content ?? []) {
      if (block?.type !== 'tool_use') continue;
      if (/^Web(?:Fetch|Search)$/.test(block.name)) actions.push(['web', JSON.stringify(block.input ?? {})]);
      if (block.name === 'Bash') actions.push(['cmd', String(block.input?.command ?? '')]);
    }
    for (const [kind, text] of actions) {
      if (kind === 'web' && library.test(text)) hits.push('remote:web ' + text.slice(0, 80));
      if (kind === 'cmd' && (/\b(?:npm|pnpm|yarn) (?:view|info|pack|show)\b/.test(text) || /\b(?:curl|wget)\b[^|;&\n]*(?:qingye[_-]lab|xflux)/i.test(text) || /\.npm\/_cacache|pnpm\/store|\.pnpm-store/.test(text))) hits.push('remote:cmd ' + text.slice(0, 80));
    }
  }
}
result.contaminated = hits.length > 0;
result.contaminationHits = hits;
result.transcript = transcript === null ? null : transcriptPath;

// 6b. 错解自测：与 task.json 的 wrong 清单比对
if (meta.selftest?.startsWith('wrong:')) {
  const name = meta.selftest.slice(6), expected = taskInfo.wrong?.[name];
  const failedNames = tests.assertions.filter(a => a.status === 'failed').map(a => a.name);
  let verdict, detail = '';
  if (!expected) { verdict = '无期望清单'; detail = `task.json 未列 wrong.${name}，实际失败 ${failedNames.length} 条`; }
  else {
    const unexpected = failedNames.filter(n => !expected.some(f => n.includes(f)));
    const missed = expected.filter(f => !failedNames.some(n => n.includes(f)));
    const ok = tests.ran && tests.failedSuites === 0 && !unexpected.length && !missed.length;
    verdict = ok ? '合格' : '不合格';
    if (!ok) detail = `意外失败 ${JSON.stringify(unexpected)}；应失败而通过 ${JSON.stringify(missed)}${tests.failedSuites ? '；有套件整体失败' : ''}`;
  }
  result.wrongCheck = { name, verdict, expected: expected ?? null, failed: failedNames, detail };
  console.log(`错解 ${name}：${verdict}${detail ? ' ' + detail : ''}`);
}

// 7. 状态
let status;
// v18：超时先于“非零退出且无改动”（被杀时退出码为 null）；污染先于测试与 tsc 的结论，污染的运行一律不计分。
const invalid = (detail) => { status = 'INVALID'; reasons.push(`代理未正常运行（${detail}），不计入成绩`); };
if (!meta.selftest && meta.spawnError) invalid(`退出码 ${meta.exitCode}，${meta.spawnError}`);
else if (meta.timedOut) { status = 'UNVERIFIED'; reasons.push('代理超时'); }
else if (!meta.selftest && meta.exitCode !== 0 && !porcelain.length) invalid(`退出码 ${meta.exitCode}`);
else if (result.contaminated) { status = 'UNVERIFIED'; reasons.push('污染，结果无效：' + hits.join(', ')); }
else if (!tests.ran || tests.parseError) { status = 'UNVERIFIED'; reasons.push('隐藏测试没有产出结果'); }
else if (tests.failed > 0 || tests.failedSuites > 0 || tests.passed === 0) { status = 'FAIL'; reasons.push(`隐藏测试失败 ${tests.failed}，套件失败 ${tests.failedSuites}`); }
else if (!result.tsc.ran) { status = 'UNVERIFIED'; reasons.push('tsc 没有运行'); }
else if (result.tsc.errorCount > 0) { status = 'FAIL'; reasons.push(`tsc 错误 ${result.tsc.errorCount}`); }
else status = 'PASS';
result.status = status;
result.statusReasons = reasons;

rmSync(hiddenDir, { recursive: true, force: true });
writeJSON(side('result.json'), result);
writeJSON(resolve(here, 'results', `${runId}.json`), result);
console.log(`${status} ${runId} 测试 ${tests.passed}过/${tests.failed}败 tsc ${result.tsc.errorCount} 错 check ${result.qingyeCheck.status}${reasons.length ? ' · ' + reasons.join('；') : ''}`);
