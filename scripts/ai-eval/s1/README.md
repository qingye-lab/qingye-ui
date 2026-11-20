# S1：消费项目 AI 评测框架

评测 AI 编码代理（claude / codex）在使用 `@qingye_lab/ui@5.4.1` 的小型 React 项目里完成 UI 任务的质量。条件 D0 无任何接线；D05 带 AGENTS.md / CLAUDE.md / design.md 与 `@qingye/tooling`（`pnpm check:ui`）。DN（无指南）在 D0 基础上从包里删去 `ai/`、`design.md`、`design.en.md`、`catalog.json` 及对应 exports/files 条目，按原名重新打包，`vendor/` 与 `node_modules` 都只见删减版，不放 tooling 包；README、类型声明、`src/`、`tokens/`、`registry/` 保留。清单在 `conditions/dn/strip.json`，属预设；DN 默认根目录为 `/private/tmp/qingye-s1-dn`，与 D0 分开。

## 目录
- `tasks/<T>/`：`task.json`（`id`、`title`、`editable`、`hidden`（数组）、可选 `wrong`）、`TASK.md`、`files/`（骨架，按相对路径覆盖到项目根）
- `private/`：隐藏测试；`reference/<T>/`：参考解；`wrong/<T>/<name>/`：错解
- `fixture/`：消费项目模板；`conditions/d05/`：D05 额外文件；`conditions/dn/strip.json`：DN 删减清单；`vendor/*.tgz`：打包好的库（被 git 忽略）
- `prompt.txt`：固定提示；`results/`：结果副本（被 git 忽略）

## 约定
- 隐藏测试放置位置固定：评估时复制到 `<项目>/src/__hidden__/<文件名>`，因此测试里用 `../` 引用题目文件（如 `../Hello`）。测试名以 `[分类]` 开头（selection、api、a11y、state、static…），按分类汇总。vitest 已开 `globals`，测试可不 import describe/it。
- 测试环境补丁 `private/_env.ts`：评估时与隐藏测试一起复制，每个隐藏测试首行 `import "./_env"`。只补 jsdom 缺的浏览器构造函数（目前是 `PointerEvent`），不改变题目语义。2026-11-20 起（冻结 v11）；起因是 Codex T1 DN 把 Radio 包在原生 `<label>` 里，点击时 Base UI 构造 PointerEvent 报错，合法写法被判失败。新增补丁须说明对应的真实浏览器能力，不得借此放宽断言。
- 评估前把 `vitest.config.ts`、`src/test/setup.ts`、`package.json`、`tsconfig.json` 还原成冻结版本，被代理改过的记在结果的 `protectedFilesModifiedByAgent`。
- `task.json` 的 `wrong`：`{"<name>": ["应失败的断言名片段"]}`。只有列出的断言失败、其余全过，错解自测才算「合格」。

## 冻结
- `node freeze.mjs`：首次生成 v1；之后改题须 `node freeze.mjs --reason "原因"`，产出 v2、v3…（`freezes/vN.json`，`freeze.json` 为最新）。
- `node freeze.mjs --verify`：比对文件与两个 CLI 版本，有变化退出码 1。正式运行前会自动校验，不一致拒绝运行（自测只警告）。
- 重新打包 tgz：`pnpm --filter @qingye_lab/ui pack --pack-destination <本目录>/vendor`，同样对 `@qingye/tooling`，然后重新冻结。

## 运行
```sh
node scripts/ai-eval/s1/run.mjs --task T1 --cond D0 --agent claude --rep 1 [--root <dir>] [--timeout <分钟>]
node scripts/ai-eval/s1/evaluate.mjs <运行目录>     # 单独重评
```
隔离与模型：Codex 使用只含 `auth.json` 的临时 `CODEX_HOME`（模型 `gpt-6.2-sol`、effort `low`；2026-11-20 起由 xhigh 改为 low，此前的 Codex 记录为 xhigh），不加载全局 AGENTS.md、记忆、配置，运行后删除（删除前比对 `auth.json`，被改写则保留副本待核对）；但 Codex 仍会发现 `~/.agents/skills/` 下的用户级技能（已核实其中没有本库内容），记为残余混杂。Claude 使用 `--model claude-opus-5-5 --setting-sources project,local`；2026-11-20 对照探测证实此时不加载用户级 CLAUDE.md、用户级代理，内置与托管的插件和技能仍会加载，记为残余混杂。transcript 命中本仓库路径或代理全局记忆（`memories/MEMORY.md`、`rollout_summaries`、本项目的 Claude 记忆目录）判为污染；另外，路径进入另一运行目录或模板（`qingye-s1-runs|dn/T*|_template*`）、联网搜索或抓取本库（查询或网址含 `qingye_lab`/`qingye-lab`/`xflux`）、`npm|pnpm|yarn view|info|pack|show`、读取全局 npm/pnpm 缓存，也判为污染。只看代理的动作，不看它读到的文件内容。
运行目录默认 `/private/tmp/qingye-s1-runs/<runId>`，transcript、stderr、meta、result 在其同级（项目目录外）。依赖模板按指纹缓存为 `_template-*`，每次运行复制。

## 自测（不调用代理）
```sh
node scripts/ai-eval/s1/run.mjs --task T0 --cond D0 --selftest skeleton     # 期望 FAIL
node scripts/ai-eval/s1/run.mjs --task T0 --cond D05 --selftest reference   # 期望 PASS
node scripts/ai-eval/s1/run.mjs --task T0 --cond D0 --selftest wrong        # 每个错解各跑一次并核对 wrong 清单
```

## 结果
`results/<runId>.json`：status（PASS/FAIL/UNVERIFIED/INVALID；INVALID 指代理没有正常运行，例如 CLI 参数失效、非零退出且无改动，不计入成绩）、隐藏测试分类汇总、tsc 错误、import 说明符、改动与越界文件、新增依赖、事后 `qingye-ui check` 摘要、污染判定、冻结版本。污染（transcript 命中本仓库路径）的运行判 UNVERIFIED，汇总时无效。
