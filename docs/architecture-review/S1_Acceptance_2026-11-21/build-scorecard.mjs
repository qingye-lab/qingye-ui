#!/usr/bin/env node
// 从 scripts/ai-eval/s1/results/*.json 聚合 S1 验收用的成绩表。
// 只读评分结果，不调用代理，不改评测框架。结果目录不入库，本脚本须在保有该目录的机器上运行。
//   node docs/architecture-review/S1_Acceptance_2026-11-21/build-scorecard.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const s1 = resolve(here, "../../../scripts/ai-eval/s1");
const resultsDir = join(s1, "results");

// 阶段按运行时的冻结版本划分，对应裁决文档第七节的条目。
const PHASES = [
  { id: "P1", versions: [3, 4], ruling: "2", label: "小样一（题面未去提示）" },
  { id: "P2", versions: [6], ruling: "6", label: "小样二（去提示后）" },
  { id: "P3", versions: [8], ruling: "11", label: "D0 余题" },
  { id: "P4", versions: [9], ruling: "17", label: "DN 首跑（Codex 为 xhigh）" },
  { id: "P5", versions: [10, 11], ruling: "17", label: "Codex 改 low 重跑" },
  { id: "R1", versions: [13], ruling: "19", label: "新题第一轮 T7–T18（联网，事后剔除）" },
  { id: "R2", versions: [14], ruling: "21", label: "第二轮 T19–T23 加 T7（断网）" },
  { id: "R3", versions: [16, 17], ruling: "23", label: "第三轮 T24–T29 加 T7（断网）" },
];
const phaseOf = (v) => PHASES.find((p) => p.versions.includes(v)) ?? { id: "NA", ruling: "17", label: "无运行元数据" };

// 题目备注来自裁决文档第 18、20、22、23 条。
const TASK_NOTE = {
  T13: "刷新断言在 DN 包内有明文",
  T15: "DN 包内有明文",
  T17: "DN 包内有明文",
  T18: "DN 包内有明文",
  T23: "可查性题：题面写“按本库约定”",
  T28: "可查性题：DN 源码有明文",
  T29: "题目缺陷：库内两份说明推荐冲突，不计入指南作用",
};

function configOf(r, version) {
  if (r.agent === "codex") {
    // 无冻结版本的那一次（T6 DN，07:27）排在 xhigh 补跑之后、low 重跑（07:54 起）之前，按 xhigh 计。
    const effort = r.agentRun?.effort ?? (version == null || version <= 9 ? "xhigh" : "low");
    const source = r.agentRun?.effort ? "记录" : version == null ? "按运行时间推定" : "按冻结版本推定";
    return { config: `codex-${effort}`, model: r.agentRun?.model ?? "gpt-6.2-sol", effort, source };
  }
  const model = r.agentRun?.model ?? "claude-opus-5-5";
  const sonnet = /sonnet/.test(model);
  return {
    config: sonnet ? "claude-sonnet-low" : "claude-opus",
    model,
    effort: r.agentRun?.effort ?? "cli-default",
    source: r.agentRun?.model ? "记录" : "按冻结版本推定",
  };
}

function exclusion(r) {
  if (r.freezeVersion == null) return "无运行元数据（裁决第 17 条记为 ABORTED）";
  if (r.status === "INVALID") return `INVALID：退出码 ${r.agentRun?.exitCode}`;
  if (r.contaminated) return "污染";
  if (r.status === "UNVERIFIED") return "UNVERIFIED";
  if (r.agentRun?.exitCode !== 0) return `代理进程退出码 ${r.agentRun?.exitCode}（评分为 ${r.status}）`;
  return "";
}

const rows = [];
for (const name of readdirSync(resultsDir)) {
  if (!/^T\d+-.*\.json$/.test(name) || name.includes("selftest")) continue;
  const r = JSON.parse(readFileSync(join(resultsDir, name), "utf8"));
  // 个别没有运行元数据的结果缺题号、条件、代理字段，从文件名补回。
  const [, fTask, fCond, fAgent] = name.match(/^(T\d+)-(D0|D05|DN)-(claude|codex)/) ?? [];
  r.task ??= fTask;
  r.cond ??= fCond;
  r.agent ??= fAgent;
  const phase = phaseOf(r.freezeVersion);
  const cfg = configOf(r, r.freezeVersion);
  const excluded = exclusion(r);
  const failed = (r.hiddenTests?.assertions ?? []).filter((a) => a.status === "failed");
  rows.push({
    phase: phase.id,
    ruling_item: phase.ruling,
    run_id: r.runId,
    task: r.task,
    cond: r.cond,
    config: cfg.config,
    model: cfg.model,
    effort: cfg.effort,
    config_source: cfg.source,
    network: r.agentRun?.network?.mode === "off" ? "off" : "on",
    rep: r.rep,
    freeze_run: r.freezeVersion ?? "",
    freeze_scored: r.scoredWithFreeze ?? "",
    status: r.status,
    counted: excluded ? "no" : "yes",
    exclude_reason: excluded,
    hidden_passed: r.hiddenTests?.passed ?? "",
    hidden_failed: r.hiddenTests?.failed ?? "",
    failed_categories: [...new Set(failed.map((a) => a.category))].join("+"),
    failed_assertions: failed.map((a) => a.name.replace(/^T\d+\s+\S+\s+/, "")).join("；"),
    tsc_errors: r.tsc?.errorCount ?? "",
    contaminated: r.contaminated ? "yes" : "no",
    out_of_scope_files: r.changes?.outOfScope?.length ?? "",
    deps_added: r.changes?.depsAdded?.length ?? "",
    protected_modified: r.protectedFilesModifiedByAgent?.length ?? "",
    agent_exit: r.agentRun?.exitCode ?? "",
    duration_s: r.agentRun?.durationSeconds ?? "",
    qingye_check: r.qingyeCheck?.status ?? "",
    task_note: TASK_NOTE[r.task] ?? "",
  });
}

const tnum = (t) => Number(t.slice(1));
const porder = (id) => ["P1", "P2", "P3", "P4", "P5", "NA", "R1", "R2", "R3"].indexOf(id);
rows.sort((a, b) => porder(a.phase) - porder(b.phase) || tnum(a.task) - tnum(b.task) || a.cond.localeCompare(b.cond) || a.config.localeCompare(b.config) || a.run_id.localeCompare(b.run_id));

const csv = (list) => {
  const cols = Object.keys(list[0]);
  const cell = (v) => (/[",\n]/.test(String(v)) ? `"${String(v).replaceAll('"', '""')}"` : String(v));
  return [cols.join(","), ...list.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\n") + "\n";
};
writeFileSync(join(here, "scorecard.csv"), csv(rows));

// 按格汇总：阶段 × 题 × 条件 × 配置。
const cells = new Map();
for (const r of rows) {
  const key = [r.phase, r.task, r.cond, r.config, r.network].join("|");
  const c = cells.get(key) ?? { phase: r.phase, ruling_item: r.ruling_item, task: r.task, cond: r.cond, config: r.config, network: r.network, runs: 0, counted: 0, pass: 0, fail: 0, excluded_contaminated: 0, excluded_invalid: 0, excluded_other: 0, task_note: r.task_note };
  c.runs++;
  if (r.counted === "yes") {
    c.counted++;
    if (r.status === "PASS") c.pass++;
    else c.fail++;
  } else if (r.exclude_reason === "污染") c.excluded_contaminated++;
  else if (r.exclude_reason.startsWith("INVALID")) c.excluded_invalid++;
  else c.excluded_other++;
  cells.set(key, c);
}
// 没有跑的格子也写出来，免得只看表的人以为它们不存在。
const cellRows = [...cells.values()].map((c) => ({ ...c, cell_status: "RUN", cell_note: "" }));
const notRun = (task, cond, config, note) => cellRows.push({ phase: "", ruling_item: "24", task, cond, config, network: "", runs: 0, counted: 0, pass: 0, fail: 0, excluded_contaminated: 0, excluded_invalid: 0, excluded_other: 0, task_note: TASK_NOTE[task] ?? "", cell_status: "NOT_RUN", cell_note: note });
const allTasks = Array.from({ length: 29 }, (_, i) => `T${i + 1}`);
for (const t of allTasks) notRun(t, "D05", "全部配置", "正式矩阵按用户裁决跳过");
const hasD0 = new Set(rows.filter((r) => r.cond === "D0").map((r) => r.task));
for (const t of allTasks.filter((t) => !hasD0.has(t))) notRun(t, "D0", "全部配置", "这道题只跑了 DN");
notRun("T28", "DN", "codex-low", "第三轮 Codex 线被中止；有 1 次运行被终止，没有评分结果");
notRun("T29", "DN", "codex-low", "第三轮 Codex 线被中止");
notRun("T29", "D0", "codex-low", "第三轮 Codex 线被中止");
notRun("T7", "DN", "codex-low（第三轮）", "第三轮 Codex 线被中止；第一、二轮有数据");
writeFileSync(join(here, "scorecard-cells.csv"), csv(cellRows));

// 控制台摘要，用来和裁决文档对账。
const count = (f) => rows.filter(f).length;
console.log(`运行总数 ${rows.length}；计入 ${count((r) => r.counted === "yes")}；PASS ${count((r) => r.counted === "yes" && r.status === "PASS")}；FAIL ${count((r) => r.counted === "yes" && r.status === "FAIL")}`);
console.log(`条件：D0 ${count((r) => r.cond === "D0")}，DN ${count((r) => r.cond === "DN")}，D05 ${count((r) => r.cond === "D05")}`);
for (const p of [...PHASES.map((p) => p.id), "NA"]) {
  const pr = rows.filter((r) => r.phase === p);
  if (!pr.length) continue;
  const ok = pr.filter((r) => r.counted === "yes");
  console.log(`${p}: 运行 ${pr.length}，计入 ${ok.length}，PASS ${ok.filter((r) => r.status === "PASS").length}，FAIL ${ok.filter((r) => r.status === "FAIL").length}，污染 ${pr.filter((r) => r.exclude_reason === "污染").length}，INVALID ${pr.filter((r) => r.exclude_reason.startsWith("INVALID")).length}，其他剔除 ${pr.filter((r) => r.counted === "no" && r.exclude_reason !== "污染" && !r.exclude_reason.startsWith("INVALID")).length}`);
}
console.log("\n计入的失败：");
for (const r of rows.filter((r) => r.counted === "yes" && r.status === "FAIL")) console.log(`  ${r.phase} ${r.task} ${r.cond} ${r.config} #${r.rep} [${r.failed_categories}] ${r.failed_assertions} tsc=${r.tsc_errors}`);
console.log("\n有 D0 与 DN 两侧数据的格：");
for (const c of [...cells.values()].filter((c) => c.cond === "D0")) {
  const dn = cells.get([c.phase, c.task, "DN", c.config, c.network].join("|"));
  if (dn) console.log(`  ${c.phase} ${c.task} ${c.config} net=${c.network}: D0 ${c.pass}/${c.counted}，DN ${dn.pass}/${dn.counted}`);
}
const ok = rows.filter((r) => r.counted === "yes");
console.log(`\n计入运行里：tsc 有错 ${ok.filter((r) => Number(r.tsc_errors) > 0).length}，越界文件 ${ok.filter((r) => Number(r.out_of_scope_files) > 0).length}，新增依赖 ${ok.filter((r) => Number(r.deps_added) > 0).length}，改受保护文件 ${ok.filter((r) => Number(r.protected_modified) > 0).length}`);
console.log(`qingye-ui check 状态：${[...new Set(rows.map((r) => r.qingye_check))].join("、")}`);
const med = (a) => (a.length ? a.sort((x, y) => x - y)[Math.floor(a.length / 2)] : "");
for (const cfg of [...new Set(ok.map((r) => r.config))].sort()) for (const cond of ["D0", "DN"]) {
  const d = ok.filter((r) => r.config === cfg && r.cond === cond && r.duration_s !== "").map((r) => Number(r.duration_s));
  if (d.length) console.log(`用时中位数 ${cfg} ${cond}: ${med(d)} 秒（n=${d.length}）`);
}
