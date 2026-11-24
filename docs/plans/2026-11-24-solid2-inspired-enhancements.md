# 借鉴 Solid 2.0 工程范式的 Qingye UI 改造记录

> 状态：**已实施（2026-11-24），发布前待版本裁决**；ColorPicker 弹层内滑条拖动一项为 `UNVERIFIED`，见第三节。
> 基线：`HEAD = 6aa631b7`（`@qingye_lab/ui@5.6.0`、`@qingye/tooling@0.5.0`）。
> 用户裁决：「有价值就不要推迟 一起做，没有价值的就丢弃」。下文仅保留真实落地项与明确丢弃清单，不留悬而未决的“推迟项”。

---

## 一、明确丢弃项（不再建设）

以下方案在事实核对与复审中被证明无净收益或与既有架构裁决冲突，直接丢弃：

| 丢弃项 | 丢弃理由 |
|---|---|
| `Diagnostic.code` | `rule`（配 `ruleVersion`）已是稳定规则标识；CLI 错误包已用 `code` 放 `ToolError.code` |
| 独立 `CHEATSHEET.md` 与 `ai/agent-loops.md` | 与 `SKILL.md`、`llms.txt`、`design.md`「人和 AI 的交付检查」重复，违背单一事实源 |
| `@qingye/tooling/vitest` 匹配器 | `qingye-ui check --mode gate` 退出码 `0/1/2` 已直接满足 CI 门禁 |
| jsdom 常驻渲染次数预算测试 | jsdom 无真实布局，且绑死 Base UI 内部提交次数，违背 2026-10-10「测试要有价值」裁决 |
| 往 `STANDARDS.md` 加无 lint 保障的派生/effect 规则 | 仓库无 ESLint 规则保障执行，避免写纸面条款 |
| 组件 demo 内编排多步模拟后端乐观流程 | 违背 2026-10-03「组件示例不编业务场景」裁决（`design.md` 第 109 行） |
| 非 React / Solid 2.0 夹具验证与 `@qingye_lab/tokens` 拆包 | 当前无真实非 React 消费方，不提前建设无需求的包与夹具 |
| 迁移 `@qingye_lab/ui`、`apps/docs` 或 `apps/studio` 到 Solid 2.0 | 93/114 组件耦合 `@base-ui/react`；本库不含业务逻辑，不吃 Solid 2.0 应用层异步图红利 |

---

## 二、已实施的三项改动

### 1. 乐观更新契约与异步状态边界补全
- `design.md`（「变化与恢复」及对应英文块，已同步更新 `source-sha256`）：补写低风险可逆写入的乐观反馈边界——确认前不得宣称“已保存”，失败时回退到真实状态、保留用户输入意图并明确提示；高风险或不可逆动作不得以乐观反馈冒充完成。
- `apps/docs/src/content/async-content/meta.ts` 与 `pending-value/meta.ts`（中英双语）：写清 `AsyncContent`（读/刷新保旧）、低风险乐观写入（应用状态呈现，确认前不宣称已保存）与 `PendingValue`（写入结果未知，保留原值并核实）三者的语义边界。

### 2. `@qingye/tooling` 单一规则表与随包诊断修复指南
- 新增 `packages/tooling/src/rules.ts`：统一管理 9 条静态规则的 `rule`、`layer`（`token/*`、`visual/*`、`theme/*` 归 `P`；`imports/*` 归 `A`）、`anchor`（由 `rule` 派生，`rule.replace('/', '-')`）、`repairGuide`（`@qingye/tooling/diagnostics.md#<anchor>`）与默认 `decision`。
- 更新 `packages/tooling/src/types.ts`、`check.ts`、`cli.ts`、`index.ts`、`README.md` 与 `package.json`：
  - 修正 `check.ts:58` 原本全量硬编码 `layer: 'P'` 的问题；
  - `Diagnostic` 追加 `repairGuide`，**未改 `id` 哈希公式**（`baseline` / `exceptions` 100% 兼容），不新增重名 `code` 字段；
  - 随 `@qingye/tooling` 发布 `packages/tooling/diagnostics.md` 并导出 `"./diagnostics.md"`，消除与 `@qingye_lab/ui` 的跨包版本漂移。
- `packages/tooling/test/core.test.mjs` 新增回归测试：校验 9 条规则在 `diagnostics.md` 中均有对应标题锚点与逐字一致的「诊断建议」、诊断的 `layer` / `decision` 来自规则表，且 CLI 人类可读输出附带 `[layer]` 与 `repairGuide`；另测 `exceptions.json` 使用未知规则名时配置校验失败。

### 3. 组件元数据纠偏字段 → `ai/SKILL.md` / `ai/SKILL.en.md` 自动投影
- `apps/docs/src/lib/types.ts`：`ComponentMeta` 新增可选结构化 `confusions?: ComponentConfusion[]`（明确仅作消费方从其他 React 库转入时的常见名称/用法纠偏，不表述为本库历史旧名）。
- 为 8 个高频混淆组件补录 `confusions`：`async-content`、`button`、`dialog`、`drawer`、`menu`、`pending-value`、`tabs`、`toast`（修正为真实导出 `ToastProvider` / `toastManager`）。
- `packages/ui/scripts/gen-catalog.mjs`：生成时强校验每条 `confusion.use` 必须存在于真实公开导出中（写错立即抛错），自动投影为 `ai/SKILL.md` 与 `ai/SKILL.en.md` 中的「常见名称与用法纠偏」一节，并在 Task workflow 第 6 步补充 `@qingye/tooling` 的 `qingye-ui check` 与 `repairGuide` 查阅提示。
- `packages/ui/test/public-guidance.test.ts` 新增断言校验中英文 `SKILL.md` 与官网副本一致且每条纠偏引用均为真实导出。

### 4. 一次性真实浏览器与源码渲染排查（5 个高频复杂组件）
- **源码排查**：检查 `combobox.tsx`（无 `useEffect`/`useLayoutEffect`）、`virtual-list.tsx`、`data-table.tsx`、`resizable.tsx`、`color-picker.tsx` 的全部 effect 与状态更新，确认几何/测量型 `useLayoutEffect` 均已有值相等短路保护，未发现反馈环或多余级联缺陷；`color-picker.tsx:163` 的受控色相缓存同步仅在外部受控值切换时单次执行、拖拽期不触发，属有意设计。
- **真实浏览器排查**（Google Chrome `158.0.8127.88` 对构建后的 `apps/docs` preview）：
  - `run-browser-audit.mjs` 扫描 5 个 playground（`light-desktop`）：**5 measured，0 错误、0 溢出**。
  - 交互实测（排序、行勾选、翻页、虚拟滚动 + 方向键、ColorPicker 打开/Esc 关闭、Resizable 键盘 + 指针拖拽 60px、Combobox 输入过滤 + 方向键）：全部 11 项动作均为 **0 `pageerror`、0 `console.error`、0 `console.warn`、0 `lateMutations`（稳定后无持续抖动）、0 `cls`**。
  - **结论**：未发现真实渲染缺陷，零源码改动结案，不新增常驻渲染次数测试。

---

## 三、验证证据汇总

| 检查项 | 命令 | 结果 |
|---|---|---|
| `@qingye/tooling` 构建、类型与单测 | `pnpm --filter @qingye/tooling build && pnpm --filter @qingye/tooling typecheck && pnpm --filter @qingye/tooling test` | **PASS**（32/32） |
| `@qingye_lab/ui` 生成、构建、类型、打包与 API 漂移 | `pnpm --filter @qingye_lab/ui build && pnpm --filter @qingye_lab/ui typecheck && pnpm --filter @qingye_lab/ui check:pack && pnpm --filter @qingye_lab/ui check:api` | **PASS**（114 组件、`publint` strict、`attw` esm-only 全过） |
| `@qingye_lab/ui` 公开指南与风格契约单测 | `pnpm --filter @qingye_lab/ui test -- test/public-guidance.test.ts test/style-contract.test.ts` | **PASS** |
| `apps/docs` 类型、单测与生产构建 | `pnpm --filter docs typecheck && pnpm --filter docs test && pnpm --filter docs build` | **PASS**（61/61 单测 + 生产构建通过） |
| 5 个复杂组件真实浏览器几何审计 | `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=... node scripts/run-browser-audit.mjs data-table virtual-list color-picker resizable combobox --only light-desktop` | **PASS**（5 measured，no problems） |
| 5 个复杂组件真实浏览器交互稳定性实测 | 构建后 preview + Chrome 158 交互脚本（排序、勾选、翻页、滚动、键盘、拖拽、过滤） | **PASS**（0 error/warn、0 lateMutations、0 CLS）；注：`ColorPicker` 弹层内部滑条拖动未命中选择器，该单项记 **UNVERIFIED** |
| 全量 114 页跨主题跨断点扫描与全套 `packages/ui` 其余组件单测 | 未动组件运行时源码，未重跑无关全量 | **NOT_RUN**（组件运行时代码未改动） |

注：交互稳定性实测脚本未入库，该项证据目前不可由他人复现。

---

## 四、复审修复（2026-11-24）

深度审查后修正：

1. **规则表成为 `decision` 唯一来源**：`check.ts` 各调用点不再各自传入建议文案（原有 7 处与规则表不一致），`add()` 只取 `DIAGNOSTIC_RULES[rule].defaultDecision`；`imports/unresolved` 的“模块已解析但导出表不可检查”改记入 `limitation`。诊断 `id` 哈希不含 `decision`，baseline / exceptions 不受影响。`diagnostics.md` 的「诊断建议」与输出逐字一致并有测试守护。
2. **`Diagnostic.rule` 收窄为 `RuleId`**；`exceptions.json` 中未知规则名改为 `INVALID_EXCEPTIONS`，不再静默永不匹配（行为收紧）。
3. **纠偏条目校验与渲染一致**：`use` 只允许所在组件模块自身的导出（原先接受全库导出，却以所在组件路径渲染，可能写出错误导入路径）。
4. **SKILL 生成健壮性**：表格单元格转义 `|` 与换行；英文替换改用函数替换，避免译文中的 `$&` / `$'` 被解释；纠偏为空时不做替换。测试校验每行恰好三列。
5. **文案修正**：Task workflow 第 6 步锚点写为 `#<rule-slug>` 并给出示例；纠偏导语改为“常见误写与误用”，Button 条目改为真实误用描述；Drawer 条目写明 `DrawerContent` 只是可滚动内容区，不能代替 `DrawerPopup`。

**待裁决（未处理）**：`@qingye_lab/ui@5.6.0` 已发布到 npm，本次改动了 `ai/SKILL.md`、`ai/v5.6.0/*` 与 `catalog.json`，与已发布包不再一致；`@qingye/tooling` 的 `Diagnostic` 新增必填 `repairGuide`、`imports/*` 层由 `P` 改为 `A`、`decision` 文案统一、exceptions 校验收紧。发布前须决定 ui（5.6.1 / 5.7.0）与 tooling（0.6.0）的版本号并在提交说明中列出上述输出变化。另：`@qingye/tooling` 未发布到 npm，`@qingye/tooling/diagnostics.md` 目前只在本仓库内可解析。
