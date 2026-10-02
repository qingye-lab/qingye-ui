# Working in this repository

`@qingye/ui` is a React component library (Base UI + Tailwind CSS 4) adapted from coss ui (MIT), plus locally authored components, and its documentation site.

**建设纲领：** `/Volumes/SUNSANG 1/Codex/demo/qingye/docs/ui-component-system-plan.md`（v3.0 定稿）。本文件是它的库侧执行摘要；涉及方向、优先级、验收标准时以纲领为准。纲领只读，不在本仓库内。

**本次改造：** `design.md` 提供设计方法，`docs/plans/2026-10-02-design-system-renovation.md` 提供已授权范围与最新用户裁决，`docs/implementation/2026-10-02-execution.md` 记录执行证据。2026-10-02 用户已明确：三张视觉提案均不采用，视觉定稿后置；先遵守新理念、规范和定义，由主 agent 下发/审核、多 GPT-6.1 sol / xhigh 子 agent 按独立边界并行执行。该裁决优先于旧纲领的线性调度及选图前置；完整范围、真实契约和验收标准仍有效。同日后续用户要求重做官网、完整复用本库组件，并明确反对说明书式 UI；当前官网视觉与跨项目接入决定见 `docs/decisions/website-as-consumer.md`，该新裁决不再把首页视觉后置。

**后续裁决：** 首页参考 coss UI 的简短介绍与组件目录布局；反对说明书式 UI。全部组件按真实语义、状态、关系和情境认真设计，必要时重构，不以保留 coss 实现为目标。官网作为公共组件的第一方消费端，具体边界见 `docs/decisions/website-as-consumer.md`。

## Layout

- `packages/ui/src/components/<name>.tsx` — one component per file.
- `packages/ui/tokens/*.css`, `theme.css`, `motion.css`, `utilities.css`, `styles.css` — tokens and global CSS.
- `packages/ui/upstream/` — unmodified coss sources, the baseline for diffs. Never edit.
- `packages/ui/coss-source.json` — upstream SHA and the list of local adaptations per coss file.
- `packages/ui/test/*.test.tsx` — Vitest + Testing Library.
- `apps/docs/src/content/<name>/meta.ts` and `demos/NN-<id>.tsx` — documentation per component (see `apps/docs/src/lib/types.ts`).
- `scripts/audit.mjs` — 跨主题跨断点的浏览器扫描；CI/Release 通过 `scripts/run-browser-audit.mjs` 使用构建后的 docs preview。

## Rules

- **器用为本，关系为法，合宜为度。** 界面变更依据 `design.md` 的相关方法作出任务、语义、结构和状态判断；六种方法不要求逐处贴标签，也不能用文化装饰代替可用性。
- `apps/docs` 是第一方消费项目，交互控件复用 `@qingye/ui` 及其公共组合；原生页面结构、表单语义、链接和组件 `render` 组合合法。必要的共享缺口回到库中解决，不在官网另造基础控件。
- 根 `design.md` 是公开设计指南唯一源；`packages/ui/scripts/gen-catalog.mjs` 生成包内 `design.md`、网站 `/design.md`，并将其项目接入段投影到 `ai/SKILL.md`。不手工维护生成副本。
- 消费项目接入需在自家 `AGENTS.md` 与 `design.md` 留下包内指南、当前 API 和项目主题/组合入口的持久引用，使用根指南中的可复制片段合并既有规则；本仓库不自动改写其他仓库的指导文件或权限。
- Follow `STANDARDS.md` for every component change.
- 网站界面避免说明书式文案：用真实内容与可操作状态表达能力，删除重复标签、显然的操作说明和设计自述；仅保留识别、决策、错误恢复所需的文字。完整方法放在指南中。
- Treat coss as a replaceable implementation source. Reuse, adapt, or rebuild according to verified task, semantic, state, and maintenance needs under `design.md` and `STANDARDS.md`; record derived changes in `coss-source.json` and preserve truthful provenance. Evaluate accessibility primitives separately. Never edit the upstream baseline or relabel copied source as original.
- New built-in strings go through `useUILocale()`; add keys to both `src/locale.tsx` and `src/locales/en-US.ts`.
- Run `pnpm --filter @qingye/ui gen:index` after adding or removing a component file. Run `pnpm --filter @qingye/ui gen:catalog` after changing component documentation metadata; library builds also refresh the published catalog.

### 主题三轴（不得混用）

品牌、明暗、密度是三个独立维度，明暗默认使用 class，也可显式使用属性模式：

| 轴 | 属性 | 写入方 | 约束 |
|---|---|---|---|
| 明暗 | `.light` / `.dark`（默认）；`attribute="data-theme"` 时为 `data-theme` | `ThemeProvider` 运行时 JS | 所选明暗标记保留给 `light`/`dark`，不得复用为品牌；见 `theme-provider.tsx` |
| 密度 | `data-density` | 组件或容器 | 已有 `components.css` 的 `[data-density="compact"]` |
| 品牌 | `data-brand` | 项目静态配置 | 项目视觉身份只写这里；当前约定为文档级 `html[data-brand]`，见 `docs/decisions/theme-axes.md` |

**禁止**把品牌写进 `data-theme`：

```css
/* 禁止：显式 data-theme 模式会被 ThemeProvider 覆盖 */
[data-theme="sentinel"] { --qy-primary: ...; }

/* 正确 */
html[data-brand="sentinel"] { --qy-primary: ...; }
```

### token 必须真实接管组件

- **新增或修改 token 时，必须让组件实际消费它。** `--qy-control-*` 已接通 Button、Input、Select 的响应式尺寸；初始零引用只保留在 `docs/current-capabilities.baseline.json`，不能当作当前待办（见 `docs/decisions/control-dimensions.md`）。
- 改完重生成 `node scripts/gen-capabilities.mjs` 与 `node scripts/token-ledger.mjs`，核对实际部位和转发链，再验证受影响的 computed 值；源码引用数不代表运行时生效，旧指纹观测失效后须重测。
- 组件固定几何尺寸不要依赖"调大全局 spacing 后顺便变大"，要有自己的尺寸角色（见 `STANDARDS.md` 第 2 节）。
- 间距优先复用 `layout.tsx` 已有的 `gap-(--qy-space-N)` 写法，不要新造一套。
- **不得为通过检查把散落值机械改名成新 token**。新增 token 须说明角色、作用范围、修改入口。
- 默认主题的外观预设与硬要求分开：组件语义、状态真实性、可访问性和主题轴约束必须满足；具体配色、表面、轮廓和密度可由集中主题定义。视觉后置不允许牺牲这些硬要求。

### 控件尺寸关系

改动尺寸时区分三个概念，不要混用同一个数值（见 `STANDARDS.md` 第 2 节）：

| 概念 | 含义 |
|---|---|
| 控件外部尺寸 | 组件占位高度，由 `--qy-control-*` 控制 |
| 内部可用尺寸 | 边框内可交互区域。Input 外层有边框，其内部高度与外层总高度相关 |
| 触摸目标 | 粗指针下的最小命中区，由 `--qy-touch-target` 控制 |

移动端比桌面端高 4px，`sm:` 回到桌面尺寸——这是既有约定，不要"统一"掉。

### 检查器与诊断

- **禁止只用正则扫整份 TSX 决定规则。** `packages/ui/test/conventions.test.ts` 的颜色检查已调用 `color-check.ts`，用 TypeScript AST 从原始 TSX 提取 class/style，并识别 arbitrary paint value；消费端规则同样须用 AST。
- `bg-[#191919]`、`bg-[rgb(25,25,25)]` 等漏报已修，正反例见 `packages/ui/test/color-check.test.ts`；不得重新引入先删除含 hex 方括号再检查颜色的逻辑。静态无法求值的表达式保留 unresolved，不能宣称运行时已验证。
- 诊断结果区分 `PASS` / `FAIL` / `UNVERIFIED` / `NOT_RUN`，后两者不得当通过。

### 视觉与重构

- 本仓库允许大幅调整与重构，包括破坏性变更；**不得因为 TS 没报错就当作无影响**。破坏外观约定须在提交说明中显式写出。
- 视觉基线变化须单独列出，不能藏在 refactor 名义下。
- 截图差异用于**发现变化**，不自动判定变化好坏。**不得为让测试通过而更新全部截图。**
- 无障碍与对比度：普通大小的文字（包括辅助文字）≥ 4.5:1，大文本及必要非文本按适用要求检查；必要控件边界与图形信息一般 ≥ 3:1。浅色与深色都要测真实组合，不能把所有辅助文字套用 3:1。44px 是本库触屏目标，**不得声称它是 WCAG 2.2 AA 的统一最小值**（2.5.8 基础要求为 24×24px）。

## 已完成，不要重复实施

| 项 | 说明 |
|---|---|
| 包名迁移 | 已完成。`@yanqing/ui` → `@qingye/ui`。**命名统一用 Qingye** |
| catalog 重建 | 已完成。生成器 `packages/ui/scripts/gen-catalog.mjs` 已接入 `build` 链 |
| `audit.mjs` 增强及门禁 | 首批几何/动画误报已修正；CI 与 Release 已接入构建后审计，见 `docs/browser-audit.md` |

`docs/decisions/branding-and-examples.md` 中残留的 `@yanqing/ui` 是**历史叙述，保留原样**，不是待修问题。

## Commands

- `pnpm dev` — docs site at http://localhost:5180 (`/playground/<name>` shows one component's demos bare).
- `node scripts/shot.mjs <name>` — light/dark × desktop/mobile screenshots of the playground into /tmp/yq-shots.
- `node scripts/audit.mjs [slug…] [--only light-desktop,dark-mobile]` — 扫描 playground，报告页面错误、控制台错误、水平溢出、空 demo、子元素溢出。直接运行需 docs server；`scripts/run-browser-audit.mjs` 管理构建后的 preview。发现问题或执行/清理失败时退出码非 0。
- `pnpm --filter @qingye/ui typecheck` / `test` / `build`; `pnpm --filter docs typecheck`.

## 开工前必查

```bash
cd "/Volumes/SUNSANG 1/Codex/qingye-ui"
git log --oneline -3
git status --short
```

- 若 HEAD 与纲领所述基线不同，先重跑受影响条目的核实，**不盲目按纲领行号修改**。
- 若工作区非干净，先说明如何处理未提交改动，再开工。
- 本仓库基线在一日内移动过三次，务必先查再动。

## `audit.mjs` 的当前验证边界

- 已补偿负边距、边框/padding、设备像素舍入及 `display:contents` / 0×0 包装层；孤立纯旋转动画按受限规则归一化，Slider 文字只允许明确声明的有限溢出预算。保留 2px 阈值，不跳过整个 SVG 或组件，详见 `docs/browser-audit.md`。
- `.github/workflows/ci.yml` 与 `release.yml` 已在 Pack/发布之前接入审计；真实 GitHub 注入溢出验证过失败会阻断 Pack，不能沿用旧“不得接入 CI”的待办。后续真实 DateRangePicker 窄屏发现与修复证据见 `docs/baseline/2026-10-01-ci-date-range-failure/` 和 `2026-10-01-date-range-ci-followup/`。
- 已保存的 352 页扫描、fixtures 与台账观测只证明对应源码/构建和所测状态，不保证未来零误报或全部交互无问题。新的报告须核对实际几何及声明预算，不能直接按旧误报分类豁免；Release 工作流的接入不等于 tag 发布执行已验证。
