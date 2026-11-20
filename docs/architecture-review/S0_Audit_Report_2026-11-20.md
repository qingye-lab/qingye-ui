> 来源：Antigravity 会话 `c62a8e1b-ccf0-4bd4-90a6-97da6db0f2f8`（Gemini 执行，标题 “Agent Native UI S0 Audit”）的最终报告，取自 `~/.gemini/antigravity/brain/c62a8e1b-ccf0-4bd4-90a6-97da6db0f2f8/.system_generated/logs/transcript_full.jsonl`。原样保存，供裁决引用；更正见同目录 `S0_Ruling_2026-11-20.md`。

# S0 只读盘点报告｜`@qingye_lab/ui` Agent-Native UI 架构取证（基于 S0 Prompt v0.3 & 架构修订稿 v0.2.1）

**先行结论（Executive Summary）**

1. **最终裁决：`READY_FOR_S1` + `NEED_MORE_EVIDENCE`（针对 S2 真实业务产品收益）**。工作区保持完全只读干净状态（仅存在未跟踪的 `docs/architecture-review/`）。
2. **Dev Plane 关键颠覆发现（`FACT`）**：架构稿 v0.2.1 假设仓库尚处于仅有基础指南的 `D0` 阶段，但真实源码显示本仓**已建成并随包分发完整的静态 AI 目录、每组件契约文档、shadcn 兼容 Registry 以及基于 TS/PostCSS AST 的本地 CLI 诊断工具 `@qingye/tooling`（`qingye-ui`）**，且已完成过 24 次受控 AI 编码试验（`24/24 PASS` 天花板）。因此**无需重复造 `component-catalog.md` 生成器或新建 CLI/MCP**；S1 的真实高价值点在于针对消费端真实误用痛点（语义/组合错配、高歧义组件选型、少量缺手写 `whenToUse/avoid` 的组件），在 Claude Code 与 Codex 上对“未接线基线 vs 既有 `ai/SKILL.md` + `llms.txt` + `qingye-ui check` 组合”做高区分度对照评测。
3. **Vercel UI SDK 技术门槛判断（`FACT` + `INFERENCE`）**：本仓全部包已锁定 **React `19.2.1`**（`@qingye_lab/ui` `peerDependencies` 要求 `^19.2.0`，且全库使用 React 19 原生 `ref` prop、零 `forwardRef`），仓内环境满足 UI SDK React 19+ 版本门槛；但**外部真实业务消费仓的 React 版本在本仓不可见（`UNKNOWN`）**。更关键的是，组件库重度构建于 **`@base-ui/react@1.9.0`**（接管 Portal、焦点陷阱、键盘导航、`details.cancel()` 只读拦截与隐藏表单输入）及自研状态机（`Tree`/`Cascader`/`DatePicker`/`DataTable`）之上——若强行用 UI SDK `definePrimitive`/Behavior 接管内部交互，存在极高的**双焦点/双状态机冲突风险（`INFERENCE`）**，仅可在仓外/独立 worktree 做外层受控包装隔离验证。
4. **Runtime Plane 与安全边界关键发现（`FACT` + `UNKNOWN`）**：本仓是纯组件库、文档展示站（`apps/docs`）与本地主题工作台（`apps/studio`）仓库，**不含外部生产业务 SaaS 代码，也无任何证明终端业务用户需要运行期 UI Agent 的需求记录（`UNKNOWN`）**。仓内唯一带真实写盘后端的应用 `apps/studio` 恰好静态证实了 v0.2.1 第 2.3/6.3 节警告的**跨通道 R2 绕过风险**：同源脚本可通过 `GET /api/session` 直接读取会话 `nonce`，且点击「应用主题」按钮会跳过二次确认直接触发 `POST /api/theme`（`apply: true`）落盘。

---

## D1. 项目快照与证据可信度

### 1.1 Git 工作区概况
- **当前状态（`FACT`）**：`git status --short` 仅输出 `?? docs/architecture-review/`，无已跟踪文件修改、无暂存更改；盘点前后状态完全一致。
- **当前基线（`FACT`）**：`HEAD` 指向 `main` 分支提交 `e5122c52`（标签 `v5.4.0`：`fix(ui): finish the design-defect review — failed loads, form submit, long lists and accessible names`）。
- **仓库定位与脱敏说明（`FACT`）**：本仓库为 MIT 许可的公开/准公开组件库单仓 `@qingye_lab/ui`（[packages/ui/package.json:2-5,156-165](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/package.json#L2-L165)），无 `.env*` 被读取，报告不含任何密钥、客户隐私或内部生产业务数据。

### 1.2 技术栈与版本矩阵（声明版本 vs 锁文件版本）

すべて来自 `package.json` 与 `pnpm-lock.yaml`（`FACT`）：

| 维度 | 根工作区 (`.`) | `@qingye_lab/ui` (`packages/ui`) | `@qingye/tooling` (`packages/tooling`) | 文档站 (`apps/docs`) | 主题工作台 (`apps/studio`) | 证据路径 |
|---|---|---|---|---|---|---|
| 包管理器 / Node | `pnpm@10.12.1` | 继承根工作区 | `engines.node >= 22`；CI 用 Node `24` | 继承根工作区 | 继承根工作区 | [package.json:4](file:///Volumes/SUNSANG%201/Codex/qingye-ui/package.json#L4), [packages/tooling/package.json:14](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/tooling/package.json#L14), [.github/workflows/ci.yml:21](file:///Volumes/SUNSANG%201/Codex/qingye-ui/.github/workflows/ci.yml#L21) |
| `react` | — | peer `^19.2.0` / dev 锁定 `19.2.1` | 不依赖 React | 锁定 `19.2.1` | 锁定 `19.2.1` | [packages/ui/package.json:108,142](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/package.json#L108-L142), [pnpm-lock.yaml:29-31,81-83,186-188](file:///Volumes/SUNSANG%201/Codex/qingye-ui/pnpm-lock.yaml#L29-L188) |
| `react-dom` | — | peer `^19.2.0` / dev 锁定 `19.2.1` | 不依赖 React | 锁定 `19.2.1` | 锁定 `19.2.1` | [packages/ui/package.json:109,143](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/package.json#L109-L143), [pnpm-lock.yaml:32-34,84-86,189-191](file:///Volumes/SUNSANG%201/Codex/qingye-ui/pnpm-lock.yaml#L32-L191) |
| `typescript` | — | 锁定 `5.9.3` | 锁定 `5.9.3`（运行时 AST 依赖） | 锁定 `5.9.3` | 锁定 `5.9.3` | [pnpm-lock.yaml:63-65,106-108,118-120,198-200](file:///Volumes/SUNSANG%201/Codex/qingye-ui/pnpm-lock.yaml#L63-L200) |
| 构建 / CSS | — | `tsc` + 自研构建脚本 + Tailwind CSS `4.3.3` | `tsc` + `postcss@8.5.28` | `vite@7.3.0` + `@tailwindcss/vite@4.3.3` | `vite@7.3.0` + `@tailwindcss/vite@4.3.3` | [packages/ui/package.json:97,131,145](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/package.json#L97-L145), [apps/docs/package.json:24-31](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/docs/package.json#L24-L31) |
| 测试 / 审计工具 | `playwright-core@1.63.0`, `axe-core@4.14.0` | `vitest@4.0.16`, `@testing-library/react@16.3.1`, `jsdom@27.4.0`, `publint@0.3.25`, `attw@0.18.5` | `node --test` | `node --test` | `node --test` + `vitest` | [package.json:18-20](file:///Volumes/SUNSANG%201/Codex/qingye-ui/package.json#L18-L20), [packages/ui/package.json:130-147](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/package.json#L130-L147) |
| 外部消费项目版本 | `UNKNOWN` | 历史文档提及某外部项目曾基于 `4.1.0` 迁移，当前实际版本不在本仓 | `UNKNOWN` | — | 夹具 `amber`/`azure` 链接 `workspace:*` | [docs/decisions/2026-10-23-consumer-migration-feedback.md:3,39](file:///Volumes/SUNSANG%201/Codex/qingye-ui/docs/decisions/2026-10-23-consumer-migration-feedback.md#L3-L39), [apps/studio/fixtures/azure/package.json:1](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/studio/fixtures/azure/package.json#L1) |

### 1.3 SSR / RSC / Hydration / 应用数量与底层 Headless 依赖
- **仓内应用数量与渲染形态（`FACT`）**：共 2 个前端应用（`apps/docs`、`apps/studio`），**全部为纯客户端 Vite SPA（`createRoot`），无 Next.js、无服务端 RSC 运行时、无生产 `hydrateRoot`**（[apps/docs/src/main.tsx:31-39](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/docs/src/main.tsx#L31-L39), [apps/studio/src/main.tsx:54](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/studio/src/main.tsx#L54)）。
- **RSC / SSR 兼容性边界（`FACT`）**：`packages/ui/src/` 组件文件首行标注 `"use client";`（如 [packages/ui/src/components/input.tsx:1](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/input.tsx#L1)），且 `FloatingLayerScope` 为 SSR 确定性渲染保留静态初始层序（[packages/ui/src/floating-layer.tsx:9-10,59](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/floating-layer.tsx#L9-L59)）；`renderToString` / `hydrateRoot` 仅存在于单测中（如 `packages/ui/test/theme-provider.test.tsx:173-180`）。外部业务消费方是否开启 Next.js App Router / SSR / 微前端为 `UNKNOWN`。
- **多文档 / iframe / Portal 形态（`FACT`）**：无 Shadow DOM（全仓 `attachShadow` 为 0）；但 `apps/studio`（双 `<iframe src="/preview.html">`，[apps/studio/src/main.tsx:48](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/studio/src/main.tsx#L48)）与 `apps/docs` 首页示例窗（[apps/docs/src/pages/home-window.tsx:74-76](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/docs/src/pages/home-window.tsx#L74-L76)）均使用同源 `<iframe>` + `postMessage` 隔离独立 React Root 与独立 Portal/Toast 宿主。
- **底层 Headless 依赖（`FACT`）**：核心交互原语统一基于 **`@base-ui/react@1.9.0`**（非 Radix、非 React Aria、非 Headless UI），辅以 `@daypicker/react@10.0.2`（日历）、`@tanstack/react-table@8.21.3`（可选 peer，表格）、`@tanstack/react-virtual@3.14.22`（虚拟列表/表格）、`recharts@3.10.1`（可选 peer，图表）（[packages/ui/package.json:106-128](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/package.json#L106-L128)）。

### 1.4 证据标签覆盖概况
- **`FACT`（38 项核心结论）**：全部来自 `package.json`、`pnpm-lock.yaml`、组件/应用/工具链源码、测试文件、CI 配置与本地 Git 提交历史。
- **`INFERENCE`（9 项工程推论）**：基于 `@base-ui/react` 焦点/状态归属推断 UI SDK 重叠冲突、基于源码 ARIA 属性推断候选 C 静态就绪度、基于 `service.mjs` 会话机制推断跨通道 R2 绕过路径。
- **`UNKNOWN`（8 项关键未知）**：外部生产业务消费仓的真实代码与 React 版本、业务表单状态库、真实终端用户对 Runtime UI Agent 的需求与频次、生产后端鉴权/幂等网关、本地测试与远端 CI 当前实时执行通过率（因遵守 S0 禁令未运行测试或联网查远端日志）。
- **`EXTERNAL`（3 项公开规范依据）**：Vercel UI SDK 官方文档（React 19+ 要求、自定义 Primitive 范围、`allow` 权限边界）。

---

## D2. 组件能力盘点

### 2.1 对外导出组件大类及数量（`FACT`）
- **权威统计**：`packages/ui/src/components/*.tsx` 共 **114 个组件模块**，在 [packages/ui/src/index.ts:9-122](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/index.ts#L9-L122) 全量导出，并支持 `@qingye_lab/ui/components/*` 子路径按需导入（[packages/ui/package.json:24-28](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/package.json#L24-L28)）；与 [packages/ui/catalog.json](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/catalog.json) 中 `components` 数组长度 **114** 完全一致。（注：[PRODUCT.md:30](file:///Volumes/SUNSANG%201/Codex/qingye-ui/PRODUCT.md#L30) 写的“87 个组件”为早期文档残留数字，真实导出以源码与 `catalog.json` 的 **114** 为准。）
- **10 大分类分布**（按 `packages/ui/catalog.json` `components[].category` 汇总，`FACT`）：
  - 表单 `33` ｜ 数据展示 `20` ｜ 浮层 `10` ｜ 布局 `10` ｜ 导航 `10` ｜ 反馈 `10` ｜ 日期与时间 `8` ｜ 工具 `6` ｜ 通用 `4` ｜ 排版 `3`（合计 `114`）。
- **非组件公共辅助导出（不计入组件数，`FACT`）**：`cn`、`UILocaleProvider`/`useUILocale`/`useUIDirection`/`zhCN`、`FloatingLayerScope`/`useFloatingLayer`/`popupOffset`、`type Tone`、`useCopyToClipboard`、`useMediaQuery`（[packages/ui/src/index.ts:3-8](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/index.ts#L3-L8)）。

### 2.2 代表组件（`Input` / `Select` / `Dialog`）事实表（`FACT` + 静态 `INFERENCE`）

> 严谨性边界：以下 A11y 证据仅证明源码实现了对应原语绑定与属性透传，以及存在单测/审计脚本文件；由于 S0 严禁运行测试和真实浏览器，**不直接宣称当前构建在真实浏览器辅助技术树（Accessibility Tree）下已本次运行验证**。

| Component | Public export | Controlled? | Headless base | A11y evidence (静态源码) | Story/types/tests | React API risk |
|---|---|---|---|---|---|---|
| **Input** | [packages/ui/src/index.ts:57](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/index.ts#L57), [input.tsx:95-171](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/input.tsx#L95-L171)（导出 `Input`, `InputPrimitive`, `type InputProps`） | 同时支持受控与非受控（透传 `value`/`defaultValue`/`onChange`/`onValueChange`）；`nativeInput` 分支监听宿主 `form` `reset` 同步内部观察值（[input.tsx:36-81](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/input.tsx#L36-L81)） | `@base-ui/react/input` + `@base-ui/react/use-render` & `mergeProps`（[input.tsx:3-5,164](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/input.tsx#L3-L164)） | 原生 `<input>` 语义；`<Field>` 自动关联 Label/Description/Error；仅响应显式 `aria-invalid`（[input.tsx:59,153](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/input.tsx#L59-L153)）；只读徽标与分段日期空提示标 `aria-hidden="true"`（[input.tsx:165-166](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/input.tsx#L165-L166)） | 类型：[input.tsx:12-21](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/input.tsx#L12-L21)；文档/示例：`apps/docs/src/content/input/meta.ts:1-56` + 5 个 Demo；单测：`packages/ui/test/input.test.tsx:1-232` | **React 19 强绑定**：直接解构 `ref` prop 并依赖 React 19 ref cleanup（[input.tsx:103](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/input.tsx#L103), `input-facts.ts:9-19`），无 `forwardRef`，不可降级至 React 18 |
| **Select** | [packages/ui/src/index.ts:90](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/index.ts#L90), [select.tsx:118-291](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/select.tsx#L118-L291)（导出 `Select`, `SelectTrigger`, `SelectValue`, `SelectPopup`, `SelectItem`, `SelectGroup`, `SelectGroupLabel`, `SelectPrimitive` 及 Props 类型） | 同时支持受控与非受控（`value`/`defaultValue`/`onValueChange`、`open`/`defaultOpen`/`onOpenChange`、`multiple`）；`readOnly` 在 `onOpenChange` 调用 `details.cancel()` 拦截打开（[select.tsx:142-143](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/select.tsx#L142-L143)）；支持异步状态事实 `loading`/`error`（[select.tsx:20-23,262-264](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/select.tsx#L20-L264)） | `@base-ui/react/select` + `FloatingLayer` 动态层序（[select.tsx:3,14,242,251-268](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/select.tsx#L3-L268)） | Base UI 负责 `combobox`/`listbox`/`option` ARIA、键盘方向键/Home/End/Typeahead 及隐藏表单 `<input>`；触发器与列表支持 `aria-busy`（[select.tsx:157,265](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/select.tsx#L157-L265)），显式 `aria-label` 时设 `aria-labelledby=""` 覆盖自动关联（[select.tsx:158-160](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/select.tsx#L158-L160)），失败区 `role="alert"`、加载区 `role="status"`；隐形量宽节点标 `aria-hidden="true"`（[select.tsx:235-236](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/select.tsx#L235-L236)） | 类型：[select.tsx:19-37](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/select.tsx#L19-L37)；文档/示例：`apps/docs/src/content/select/meta.ts:1-66` + 4 个 Demo；单测：`packages/ui/test/select.test.tsx:1-405` | **React 19 + Base UI 耦合**：使用 React 19 `ComponentPropsWithRef` 解构 `ref`（[select.tsx:107-115](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/select.tsx#L107-L115)）；另有空字符串 `""` 占位修正与 `items` 映射表契约（未传 `items` 时触发器回退显示原始 value，[select.tsx:128-132](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/select.tsx#L128-L132)） |
| **Dialog** | [packages/ui/src/index.ts:45](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/index.ts#L45), [dialog.tsx:14-100](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/dialog.tsx#L14-L100)（导出 `Dialog`, `DialogCreateHandle`, `DialogTrigger`, `DialogPopup`, `DialogTitle`, `DialogDescription`, `DialogClose`, `DialogHeader`, `DialogPanel`, `DialogFooter`, `DialogPrimitive`） | 同时支持受控与非受控（`open`/`defaultOpen`/`onOpenChange` 及 `handle` 共享触发句柄）；内部 `useState` 同步 `<FloatingLayerScope active={props.open ?? open}>`（[dialog.tsx:15-20](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/dialog.tsx#L15-L20)）；表单草稿状态完全归调用方持有 | `@base-ui/react/dialog`（强制 `modal`）+ `FloatingLayerScope` 嵌套栈序（[dialog.tsx:3,7,17,43-52](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/dialog.tsx#L3-L52)） | `Popup` 显式声明 `aria-modal="true"`（[dialog.tsx:52](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/dialog.tsx#L52)）；强制 `keepMounted={false}` 规避兄弟模态 ARIA 隔离缺陷（[dialog.tsx:36-37,45](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/dialog.tsx#L36-L45)）；`DialogFocusTarget` 类型层面禁止 `initialFocus`/`finalFocus` 传 `false`/`undefined`（[dialog.tsx:29-35](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/dialog.tsx#L29-L35)）；焦点陷阱与 Esc 关闭由 Base UI 承担 | 类型：[dialog.tsx:12,30-40,81](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/dialog.tsx#L12-L81)；文档/示例：`apps/docs/src/content/dialog/meta.ts:1-44` + 2 个 Demo；单测：`packages/ui/test/dialog.test.tsx:1-208` | **React 19 + Portal/焦点耦合**：`DialogHeader`/`Panel`/`Footer` 直接接收 `ref` prop（[dialog.tsx:83-98](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/dialog.tsx#L83-L98)）；全 `packages/ui/src/` 检索 `forwardRef` 为 0 处；Base UI 独占模态焦点陷阱与背景 `inert` 阻断 |

**其他复杂交互组件的底座分布（`FACT`）**：
- **直接构建于 `@base-ui/react`**：`Combobox`（`combobox.tsx:3`）、`Autocomplete`（`autocomplete.tsx:3`）、`Popover`（`popover.tsx:3`）、`Menu`（`menu.tsx:2`）、`Tabs`（`tabs.tsx:2`）、`AlertDialog`（`alert-dialog.tsx:3`）、`Drawer`（`drawer.tsx:3`）。
- **混合自研状态机 / 专用引擎**：`Tree`（自研 `role="treeitem"` 键盘/勾选/懒加载状态机，`tree.tsx:81-84,199-203`）、`Cascader`（复用 `Popover` + 自研多列级联状态机，`cascader.tsx:128-136,360`）、`DatePicker`（组合 `Input` + `Popover` + `@daypicker/react` + 自研分段键入校验，`date-picker.tsx:7-19,54-70`）、`DataTable`（`@tanstack/react-table` + `@tanstack/react-virtual` + 自研 roving tabindex 与列宽比例算法，`data-table.tsx:332-370,708-722`）。

### 2.3 Tokens / Docs / AI 资产 / Tests / CI 现状（`FACT`）
- **设计 Tokens**：分层位于 `packages/ui/tokens/{primitives,semantic,components,contrast}.css` 与 [packages/ui/theme.css:1-387](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/theme.css#L1-L387)，几何由 `--qy-cai`（`1.25rem`）与 `--qy-fen`（`4px`）推导，主题严格分离明暗（`.light`/`.dark` 或 `data-theme`）、密度（`data-density="compact"`）、品牌（`html[data-brand]`）三轴（[STANDARDS.md:21-36,136](file:///Volumes/SUNSANG%201/Codex/qingye-ui/STANDARDS.md#L21-L136)）。
- **文档与自动生成目录（替代了 Storybook）**：本仓不使用 Storybook，而是以 `apps/docs/src/content/<name>/meta.ts` + `demos/*.tsx` 为源，由 [packages/ui/scripts/gen-catalog.mjs:1-444](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/scripts/gen-catalog.mjs#L1-L444) 结合 TypeScript AST 与 TypeChecker 自动生成：
  1. [packages/ui/catalog.json](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/catalog.json)（机器可读组件/导出/类型/依赖全表）；
  2. [packages/ui/ai/v5.4.0/llms.txt:1-126](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/ai/v5.4.0/llms.txt#L1-L126) 及中英各 114 份 `components/<name>.md`；
  3. [packages/ui/ai/SKILL.md:1-70](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/ai/SKILL.md#L1-L70) 与 `ai/style.md`；
  4. [packages/ui/registry/registry.json:1-61](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/registry/registry.json#L1-L61)（3 个 shadcn registry 模板）。
- **测试与静态门禁文件规模**：`packages/ui/test/` 下共 **145 个测试相关文件**，其中 [packages/ui/test/conventions.test.ts:1-209](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/test/conventions.test.ts#L1-L209) 对全部 114 个组件执行 TS AST 颜色检查、禁用裸焦点圈、强制逻辑属性、禁硬编码中文、`data-slot` 完整性与动效时长检查；[packages/ui/scripts/check-api-drift.mjs:1-36](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/scripts/check-api-drift.mjs#L1-L36) 校验手写文档 API 与 TS 真实类型漂移；[apps/docs/scripts/check-library-controls.mjs:8-116](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/docs/scripts/check-library-controls.mjs#L8-L116) 用 TS AST 阻断文档站私造原生交互控件。
- **CI 流水线（配置 `FACT`，最近远端运行状态 `UNKNOWN`）**：[.github/workflows/ci.yml:13-150](file:///Volumes/SUNSANG%201/Codex/qingye-ui/.github/workflows/ci.yml#L13-L150) 定义 `unit`、`audit`（Playwright 跨主题跨断点扫描）、`compositions`（任务模式/基础层/消费迁移/Studio 浏览器验证）、`package`（`check:api` + `check:pack` + `publint` + `attw` + 隔离 tarball 消费验证）4 个并行作业。`scripts/align-audit.mjs` 未接入 `ci.yml`，`release.yml` 未单独调用 `check:api`。

### 2.4 现有公共 API 的高风险兼容点（`FACT`）
1. **React 19 专属 `ref` 契约**：全库不包 `forwardRef`，若消费应用停留在 React 18，传 `ref` 与类型声明均不兼容。
2. **Base UI `render` 组合契约（无 Radix `asChild`）**：所有元素替换统一走 `render={<Element />}` 或渲染函数（[STANDARDS.md:16](file:///Volumes/SUNSANG%201/Codex/qingye-ui/STANDARDS.md#L16)）；习惯 Radix/shadcn 的编码模型极易幻觉写出 `asChild`（若未先读本库 `SKILL.md` / 组件 `.md`）。
3. **填值控件无 `size` prop**：`Input`、`Select` 等填值控件不提供高度分档 `size`（`Input.size` 仅为 HTML 原生字符数宽度 `number`），紧凑化必须走容器 `data-density="compact"`（[STANDARDS.md:33](file:///Volumes/SUNSANG%201/Codex/qingye-ui/STANDARDS.md#L33), [input.tsx:13-14](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/input.tsx#L13-L14)）。
4. **“功能纯粹”职责拆分**：`Button` 仅有 `neutral | danger` 两种 `tone` 与单一 `loading` 状态，不含确认拦截；确认弹窗无 `ConfirmDialog` 命名，而是拆分为 `AlertDialog`、`Confirm`、`ConfirmAction` 三种不同抽象（[STANDARDS.md:18-19](file:///Volumes/SUNSANG%201/Codex/qingye-ui/STANDARDS.md#L18-L19)）。
5. **分发渠道约束**：[PRODUCT.md:33](file:///Volumes/SUNSANG%201/Codex/qingye-ui/PRODUCT.md#L33) 提示通过 GitHub Release tarball 分发（尽管 `release.yml:94-106` 与历史记录也包含 npm 发布配置，但消费项目常以 tarball 或显式版本锁接入，`@qingye/tooling` 尚未公开发布 npm）。

---

## D3. Dev Plane 问题分类

### 3.1 现状检索能力与 10 个高频组件链路核验（`FACT`）
对 `Button`、`Input`、`Field`、`Select`、`Combobox`、`Dialog`、确认弹窗家族（`AlertDialog`/`Confirm`/`ConfirmAction`）、`DataTable`、`DatePicker`、`Toast` 共 10 组真实高频组件逐一核查，**10/10 均已在随包分发的 `packages/ui/catalog.json` 与 `packages/ui/ai/v5.4.0/components/<name>.md` 中具备自动提取的真实导出表（`actualExports`）、TS 类型解析表（`typeApi`）与真实 Demo 源码路径**：
- 其中 `Button`、`Input`、`Field`、`Select`、`Dialog`、`AlertDialog`、`Confirm`、`DataTable`、`Toast` 在 `apps/docs/src/content/<name>/meta.ts` 中均有**手写专属 `whenToUse` / `avoid` 说明**；
- **发现的真实小缺口（`FACT`）**：`Combobox`（`combobox/meta.ts:24`）、`DatePicker`（`date-picker/meta.ts:22`）、`ConfirmAction`（`confirm-action/meta.ts:22`）**未手写专属 `whenToUse` / `avoid`**，而是由 `apps/docs/src/lib/design-guidance.ts:44-49` 按所属大类模板合成通用文案——这在相近组件选型（如 `Select` vs `Combobox` vs `Autocomplete`、`AlertDialog` vs `Confirm` vs `ConfirmAction`、`DatePicker` vs `Input type="date"`）上容易降低 Agent 消歧精度。

### 3.2 既有 AI 试验、消费端迁移与近 10 次提交的真实问题根因分布（`FACT`）
仓库内已有三组极其宝贵的真实记录（无需猜测）：
1. **W12 受控 AI 编码试验（24 次独立运行，`FACT`）**：[docs/implementation/ai-eval-results.md:5-12](file:///Volumes/SUNSANG%201/Codex/qingye-ui/docs/implementation/ai-eval-results.md#L5-L12) 记录 4 个任务 × `baseline`/`new` × 3 次重复全部 `24/24 PASS`，在基础导入/类型/状态断言上已触及天花板，**未能拉开新旧文档差异**，且当时仅评测 GPT 模型、未覆盖 Claude Code 与 Codex 同题对照，也未接线 `qingye-ui check` 门禁。
2. **外部消费项目迁移反馈（`FACT`）**：[docs/decisions/2026-10-23-consumer-migration-feedback.md:5-22](file:///Volumes/SUNSANG%201/Codex/qingye-ui/docs/decisions/2026-10-23-consumer-migration-feedback.md#L5-L22) 揭示消费侧最真实的错误并非“找不到 Button”，而是**组件契约细节误用**：
   - 把左侧 `Drawer` 写成默认右侧 + CSS 强改几何（漏传 `swipeDirection="left"`）；
   - 用 `animate-pulse` 自造不确定进度条（不知 `Progress` `value={null}`）；
   - 把 `Select` 的 `""` 与 `null` 混为一谈，或漏传 `items` 导致触发器裸露内部枚举值；
   - 误以为 `Alert` 会自动读屏播报（未显式传 `role="alert"`）；
   - 卡片内嵌表格未传 `TableContainer framed={false}` 导致双层边框（违反 NG4）；
   - 在 `<Field>` 之外裸用 `FieldLabel`/`FieldDescription`。
3. **最近 10 个非 merge UI 提交（`e5122c52` 回溯至 `9d6da1c3`）根因统计（`FACT`）**：
   - **受控 / 异步 / 边界交互状态缺陷（5/10，最高频）**：如 `e5122c52`（Composer 失败态误作空结果、TagInput 空草稿吞 Enter 阻断表单提交、ColorPicker Esc 未回退草稿）、`8cc4bb90`（`Tree`/`Cascader` 把未加载分支当成已知全选）、`8cc0095d`（重复点击已选日期意外清空）、`bd67239d`（图表负值静默错画）。
   - **布局 / 尺寸 / 虚拟化入口缺口（5/10，并列最高频）**：如 `9bab64f8`（此前缺少宽度/布局入口迫使消费端猜像素或绕过组件）、`c460060d`、`0c49cb2b`、`7d0ed83d`（`DataTable` 列宽比例与可选虚拟化高度）。
   - **A11y 命名与焦点细节（2/10）**：`e5122c52`（`ScrollArea` 缺命名可聚焦区域、`Combobox` 多选移除芯片缺可访问名）。
   - **组件发现失败 / Token 硬编码违规（0/10）**：在库内已被 `conventions.test.ts` 与 `gen-catalog.mjs` 挡住。

### 3.3 哪些问题可用 `AGENTS + 既有 AI 目录 + 精准 lint`（D0.5）解决？哪些才需要新 D1？（`INFERENCE`）
- **D0.5 即可解决的问题**：
  1. 在消费项目正确接线 `@qingye_lab/ui/ai/SKILL.md` 给出的 `AGENTS.md` / `CLAUDE.md` 查找顺序（先读已安装 `ai/v5.4.0/llms.txt` → 对应 `ai/v5.4.0/components/<name>.md` & `catalog.json` → Demo 源码 → 运行检查）；
  2. 为相近易混组件（`Select`/`Combobox`/`Autocomplete`/`NativeSelect`、`AlertDialog`/`Confirm`/`ConfirmAction`、`DatePicker`/`DateTimePicker`/`TimeField`）补齐手写 `whenToUse` / `avoid` 反例（自动进入 `gen-catalog.mjs` 产物，无需新建第二份手工 `docs/ai/component-catalog.md`）；
  3. 直接启用已存在的 `@qingye/tooling`（`qingye-ui check`）与消费端 scoped AST 原生控件检查（参考 `check-library-controls.mjs`，仅在业务表单/视图目录按需启用，不全仓一刀切禁用原生语义标签）。
- **真正需要新建 D1（新 Registry 服务 / 新 CLI / MCP）的问题**：**尚无必要性证据（`FACT`）**。本地 CLI（`@qingye/tooling`）与包内静态索引（`catalog.json` + `ai/v5.4.0/`）均已就绪；既不存在跨语言非本地 Agent 远程查询需求，也未出现静态检索无法承载的组件规模瓶颈，符合 v0.2.1 第 4.3 节“不建新 CLI/MCP”的冻结条件。

### 3.4 S1 Benchmark 任务草案（6 个，全部取自真实组件契约，仅设计不执行）

1. **S1-T1｜相近选择器与确认模型消歧**：实现“工作区设置与危险变更确认”页——含固定 3 个数据区域的单选（应选 `Select` 并传 `items`）、支持远程关键字筛选的负责人选择（应选 `Combobox` 而非 `Select`/`Autocomplete`）、以及变更数据区域前展示具体对象与版本快照的二次确认（应选 `ConfirmAction` 或 `AlertDialog`，**严禁**虚构 `ConfirmDialog` 或给 `Button` 写不存在的确认 prop）。
2. **S1-T2｜复合/泛型 Props 与空字符串边界**：使用泛型 `<Select<string>>` 渲染含 `{ value: "", label: "全部来源" }` 的筛选器，配合 `DataTablePattern` 声明按比例增长且带最小宽度下限的列配置（考察 `Select` `null` vs `""` + `items` 映射表契约，以及 `DataTable` 最新列宽 API，防旧版顶层 prop 幻觉）。
3. **S1-T3｜三轴主题与紧凑密度 Token 合规**：在不写任何硬编码 HEX/RGB/Tailwind 色板类的前提下，为一个名为 `atlas` 的业务模块配置局部紧凑表单与工作面板（考察 `html[data-brand="atlas"]` 禁写入 `data-theme`、填值控件禁传高度 `size="sm"` 而改用 `data-density="compact"`、卡片内嵌表格传 `TableContainer framed={false}`）。
4. **S1-T4｜防重复造轮子与 `render` 多态组合**：实现带快捷键提示的顶部搜索触发器、路由跳转动作按钮、不确定态后台同步进度条及左侧滑出抽屉（考察 `TooltipTrigger render={...}` 必填、`RouterLink` + `buttonVariants` 而非 `<Button render={<a/>}>`、`Progress value={null}` 而非手写脉冲动画、`Drawer swipeDirection="left"`）。
5. **S1-T5｜组件不存在时的诚实反馈与组合边界**：需求包含“富文本 Markdown 所见即所得块编辑器 + 带清空按钮的搜索框 + @提及评论框”（考察复用 `SearchInput` 与 `Composer`，并对组件库**不存在**富文本 WYSIWYG 编辑器的事实诚实声明用 `Textarea` + `Prose` 预览或外部适配器边界，不得捏造 `@qingye_lab/ui/components/rich-text-editor`）。
6. **S1-T6｜无障碍与异步失败真实状态表达**：实现带异步校验和提交失败恢复的表单（考察 `<Field>` 内外 `FieldLabel` vs `Label` 正确用法、仅用 `aria-invalid` 表达错误、纯图标分页/操作按钮提供可访问名称、`Button loading` 不自称成功、静态错误提示与动态 `Alert role="alert"` 区分）。

---

## D4. Runtime Plane 业务抽象判断

### 4.1 真实业务场景盘点（严格区分 `UNKNOWN` 与仓内工具/示例场景）
- **外部生产业务应用（SaaS / 核心产品）的 Agent 场景：`UNKNOWN`**
  - 依据（`FACT`）：全仓仅包含 `@qingye_lab/ui`、`@qingye/tooling`、`apps/docs`、`apps/studio`（[pnpm-workspace.yaml:1-3](file:///Volumes/SUNSANG%201/Codex/qingye-ui/pnpm-workspace.yaml#L1-L3), [PRODUCT.md:30](file:///Volumes/SUNSANG%201/Codex/qingye-ui/PRODUCT.md#L30)），且全仓不存在任何关于“运行期浏览器 Agent 操作业务产品 UI”的产品文档或用户需求证据。按 S0 规范，**绝不凭空捏造“终端业务用户需要 Agent 点表单”的业务前提**。
- **仓内唯一真实有状态应用（本地研发工具场景，`FACT`）**：
  - **`@qingye/studio` 主题工作台**（[apps/studio/src/main.tsx:14-54](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/studio/src/main.tsx#L14-L54)）：支持读取已登记项目主题 → 修改品牌标识与浅/深/紧凑轴 `--qy-*` token 候选草稿 → 150ms 防抖生成候选 CSS 并在右侧 iframe 实时对比预览 → 查看结构化 `diff` 与 `impact` 影响报告 → 点击「应用主题」原子写盘。这是一个真实的 `Read → Patch Draft → Validate/Preview → Diff → Commit` 闭环，但它的目标用户是本地开发者/设计师（且已有等价 CLI `qingye-ui theme get/validate/update`），**不等同于终端客户的线上 SaaS 业务场景**。
- **仓内可作为隔离技术试验场的合成业务页面（仅技术 PoC 候选，无真实后端，`FACT`）**：
  - **S2-BIZ 技术模拟候选**：`apps/docs/src/examples/workspace/settings.tsx`（工作区常规设置/成员角色/默认权限树/通知开关）或 `apps/docs/src/examples/booking.tsx`（多步会议室预约草稿 + 校验 + 撤销）。
  - **S2-OPEN 技术模拟候选**：`apps/docs/src/examples/workspace/collections.tsx` + `apps/docs/src/content/workspace/demos/03-records.tsx`（含多条件筛选、排序/分页/多选表格、动态详情抽屉/侧栏、Portal 顶栏动作与浮层菜单）。

### 4.2 代表性页面状态分层盘点与同源草稿可观测性（`FACT` + `INFERENCE`）

全仓检索 `react-hook-form`、`zustand`、`redux`、`@tanstack/react-query`、`useReducer` 均为 **0 匹配**（`FACT`）。仓内页面全部采用 `useSyncExternalStore`（仅 `apps/studio`）或页面顶层 React `useState`：

| 代表性页面 | 共享的页面级草稿/核心状态（同源事实） | 封闭在组件内部的局部状态 | Portal / 异步列表纯展示态 | 服务端 / 本地持久化持有状态 | D / C / A 能否共享同一权威草稿？（静态推断） |
|---|---|---|---|---|---|
| **`apps/studio` 主题工作台**<br>([main.tsx:15-20](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/studio/src/main.tsx#L15-L20), `project-state.ts:8-29`) | `StudioProjectState` 单例持有 `candidate`（品牌与四轴 token 覆盖表）、`candidateRevision`、`diff`、`previewPending`、`error` | `<details>` 折叠开关；**注意**：左右预览 `<iframe>` 内的示例表单草稿（`preview.tsx:28-29`）封闭在 iframe 自身 React Root 中 | 预览 `candidateCss` 注入、元素 `[data-slot]` 高亮测量 | 磁盘 `ui.theme.json`、`ui.theme.generated.css`、`.qingye/report.json` 及 SHA-256 指纹（经 `/api/*` 读写） | **主编辑器可同源（`INFERENCE`）**：D 直接读写 `StudioProjectState.setCandidate/getSnapshot`，C/A 操作受控 `Input`/`NativeSelect` 亦触发同一 `setCandidate`；但跨 iframe 预览需跨文档隔离处理 |
| **工作区设置示例 `/examples/workspace/settings`**<br>([settings.tsx:48-54](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/docs/src/examples/workspace/settings.tsx#L48-L54)) | 顶层 `useState` 持有 `name`、`region`、`saved`、`roles`、`checked`（权限树 ID 数组）、`notify`（3 个开关） | `Select` 下拉开关与高亮项、`Tree` 展开节点 `expandedIds`（使用 `defaultExpandedIds` 非受控，[settings.tsx:101](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/docs/src/examples/workspace/settings.tsx#L101)） | `SelectPopup` Portal、`WorkspaceHeaderPortal`（顶栏「邀请」按钮）、`toastManager` 提示 | **无后端**（`saved` 仅内存 `useState`；注意角色 `Select` 在 `onValueChange` 立即弹“已改为…”而无草稿缓冲，[settings.tsx:90](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/docs/src/examples/workspace/settings.tsx#L90)） | **仅在提取页面草稿层后可同源（`INFERENCE`）**：当前状态在组件闭包 `useState` 内，若接入 D 需先将 `useState` 提升为页面草稿 hook/store，之后 D 与 C/A 修改受控控件可收敛到同一状态源 |
| **会议室预约示例 `/examples/booking`**<br>(`booking.tsx:73-79`) | 顶层 `useState` 持有分步表单 `draft`、`step`、`errors`、`booked` | `DatePicker` 输入框键入缓冲 `useTypingText` 与日历弹层开关、`Select` 开关 | `Popover`/`Select` Portal 弹层 | **无后端**（纯内存） | **大部分可同源，但分段键入有中间态风险（`INFERENCE`）**：`DatePicker` 未失焦/未确认合法日期前持有局部键入缓冲，直接读 `draft` 与读输入框 DOM 文本在键入中途可能短暂不一致 |

> **覆盖率诚实声明**：由于真实外部业务应用不在本仓，业务页面的统一 Form/Store 覆盖率分子与分母均为 `UNKNOWN`（仓内 2 个应用共核查上述核心交互面，不编造业务覆盖百分比）。

### 4.3 是否必须做细粒度 UI 操作？受控/异步/Portal 风险与候选 C（ARIA）静态评估
1. **领域级 Tool（D） vs 细粒度 UI 操作（C/A）（`INFERENCE`）**：
   - 对于设置编辑、主题配置、预约填表等结构化草稿修改任务，所有业务有效值均保存在受控状态（如 `StudioProjectState.candidate` 或表单 `draft`）中，**路线 D（领域/表单级 Tool）无需打开弹层、无需处理多列级联滚动或 Portal 定位即可精确读写限定字段并生成结构化 diff**。
   - 仅当目标页面未预定义领域 Tool、需要跨未知弹窗导航，或需要向人类用户做“可视化逐步示教”时，才需要 C 或 A。
2. **受控状态、异步回填与 Portal 的真实源码风险（`FACT` + `INFERENCE`）**：
   - **受控取消（印证 v0.2.1 §1.3 & §5.2）**：`Select` 在 `readOnly` 时通过 Base UI `onOpenChange` 的 `details.cancel()` 显式拒绝打开（[select.tsx:143](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/select.tsx#L143)）；`Input` 原生出口亦向 `onValueChange` 暴露 `cancel()`（[input.tsx:76](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/input.tsx#L76)）——证明任何 UI Action 执行后**必须重读状态源确认收敛**，不能信 `act.ok`。
   - **懒加载未知分支与异步候选**：`Tree` 与 `Cascader` 支持 `loadChildren` 异步拉取子节点（`tree.tsx:43`，提交 `8cc4bb90` 刚修复未加载分支被误判为已知全选的缺陷）；`Select`/`Combobox`/`AsyncContent` 的 `loading` 与 `error` 由外部异步回填驱动，回填完成前选项 DOM 尚不存在。
   - **Portal 与动态挂载**：`DialogPopup` 强制 `keepMounted={false}`（[dialog.tsx:45](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/dialog.tsx#L45)），未打开的弹窗与下拉列表在 DOM 中不存在；`WorkspaceHeaderPortal` 将按钮跨树挂载到顶栏（[settings.tsx:81](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/docs/src/examples/workspace/settings.tsx#L81)）；`apps/studio` 预览隔离在同源 `<iframe>` 内。
3. **可访问性语义树对候选 C（ARIA/Playwright）的静态支持度（`INFERENCE`）**：
   - **静态有利证据**：`@base-ui/react` 原生输出标准 ARIA role/state；`Field` 自动绑定 `FieldLabel`；库内 `conventions.test.ts`、Playwright `axe-audit.mjs` 以及近期提交 `e5122c52` 持续修复可访问名称（如表格内每行角色选择器均带 `aria-label="${member.name}的角色"`，[settings.tsx:91](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/docs/src/examples/workspace/settings.tsx#L91)）。静态推断**本库组件对候选 C（ARIA 语义定位）友好度较高**。
   - **静态风险点**：多实例同名按钮（如 `apps/studio/src/main.tsx:35` 每个 token 行都有同名 quiet 按钮「影响」，仅靠邻近 DOM 区分，而「移除」按钮则写了唯一定位 `aria-label="移除覆盖 ${token}"`）在未消歧时会造成 ARIA 定位歧义；最终 ARIA Tree 仍须在 S2 浏览器实测确认。

---

## D5. 安全与隐私

### 5.1 可能读取/修改的字段类别（脱敏类型级，`FACT` / `UNKNOWN`）
- **仓内真实可读写字段类别（`apps/studio`，`FACT`）**：本地已登记项目目录列表与绝对路径（`GET /api/session`，敏感度：本地主机路径暴露）、主题品牌名与 CSS Token 键值、诊断报告路径与代码片段证据。
- **仓内模拟示例字段类别（`apps/docs/src/examples/*`，合成假数据，`FACT`）**：模拟成员姓名/邮箱/角色枚举、权限树节点 ID、工作区名称与区域、会议室预约时间与备注。
- **外部生产业务应用字段类别：`UNKNOWN`**（需待接入真实业务仓时按字段级 R0 白名单单独盘点）。

### 5.2 现有授权、确认、幂等与审计能力证据（`FACT`）
- **组件库层**：提供纯展示与交互契约组件 `ConfirmAction`（支持绑定具体对象快照与版本，内容变化后要求重新阅读确认，`packages/ui/src/components/confirm-action.tsx:10-37`），但组件库本身明确声明**不持有权限、请求或幂等逻辑**（[packages/ui/ai/SKILL.md:64,68](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/ai/SKILL.md#L64-L68)）。
- **本地服务层（`apps/studio/server/service.mjs`，`FACT`）**：
  - **具备的能力**：`127.0.0.1`/`localhost` `Host` 校验（35-36 行）、同源 `Origin` 强制校验（38, 47 行）、启动期显式项目白名单 ID 映射与 `inside()` 防目录穿越/符号链接逃逸（26, 42-43 行，`packages/tooling/src/project.ts:11-20`）、512 KiB 请求体上限（28, 60 行）、启动随机 32 字节 `nonce`（`X-Qingye-Session` `timingSafeEqual` 校验，27, 48-49 行）、**基于三组 SHA-256 指纹的乐观并发锁**（`fingerprint`/`generatedFingerprint`/`configFingerprint` 不一致返回 `409 SOURCE_CONFLICT`，`packages/tooling/src/theme.ts:68-69`）与原子写盘回滚。
  - **缺失的能力**：无用户身份区分、无独立 Agent 受限会话/权限作用域、无服务端独立二次确认令牌、无持久化操作审计日志。
- **外部生产业务服务端鉴权/幂等/审计：`UNKNOWN`**。

### 5.3 潜在用户生成内容（UGC）Prompt Injection 入口（`INFERENCE`）
1. **`apps/studio` 本地项目输入面**：被扫描消费项目中的 `legacyCss` 注释/选择器字符串、代码诊断报告中的源码字面量证据（直接通过 `<pre>{JSON.stringify(...)}</pre>` 渲染在页面 DOM 中，[apps/studio/src/main.tsx:47,51](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/studio/src/main.tsx#L47-L51)），若 C/A 读取全页快照，恶意代码注释可进入 Agent 上下文。
2. **通用组件承载面（未来接入业务应用时）**：`DataTable`/`Table` 单元格、备注/工单 `Textarea`/`Prose`、`Composer` 消息流、`Select`/`Combobox` 动态远程候选项文本、`Toast`/`Alert` 服务端错误消息。若不实施 R0 字段白名单投影而直接抓取整棵 ARIA/DOM 快照，所有可见 UGC 均构成 Prompt Injection 入口。

### 5.4 开弹层 / 查选项 / 聚焦是否隐含请求副作用（`FACT`）
- **组件库自身：零隐式网络请求（`FACT`）**。全 `packages/ui/src/` 检索 `fetch` / `XMLHttpRequest` / `WebSocket` / `sendBeacon` 均为 **0 处**；`Select`、`Autocomplete`、`Command`、`AsyncContent` 均不主动发请求。
- **需标记副作用注意的回调与页面逻辑（`FACT`）**：
  1. `Tree`（`tree.tsx:161-166`）与 `Cascader`（`cascader.tsx:241-249`）在展开未加载节点时调用消费端传入的 `loadChildren()` Promise——若消费端在该回调里绑了计费查询或审计日志，则“展开节点”具有外部请求副作用。
  2. `apps/studio` 在修改任意候选 token 后，经过 **150ms 防抖自动触发 `POST /api/theme`（`apply: false`）** 向本地服务请求校验与生成预览 CSS（[apps/studio/src/main.tsx:23](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/studio/src/main.tsx#L23), `project-state.ts:47`）——虽未落盘（R1 草稿校验请求），但会产生持续服务端调用。
  3. 在示例页 [apps/docs/src/examples/workspace/settings.tsx:90](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/docs/src/examples/workspace/settings.tsx#L90)（成员角色 `Select`）与 `settings.tsx:111`（通知 `Switch`）中，**没有「保存」按钮缓冲，`onValueChange`/`onCheckedChange` 直接执行立即保存模式**！这静态证明：**在真实业务应用中，部分 `Select`/`Switch` 变更本身就是 R2 立即持久化动作而非 R1 草稿修改**，绝不能默认把所有表单控件交互都归为无副作用的 R1！

### 5.5 跨通道 R2 绕过路径清单（静态分析，未触发写入）

| 场景 / 目标动作（R2） | 主通道（D：领域 Tool）假设限制 | 备用绕过路径（C：ARIA/DOM 自动化 或 A：UI SDK Bridge / 同源脚本） | 服务端最终门禁现状（源码证据） | 风险判定与 S2 阻断要求 |
|---|---|---|---|---|
| **路径 1：`apps/studio` 覆写目标项目主题文件**<br>(`POST /api/theme` with `apply: true`) | 假设在 Tool 层禁止 Agent 执行 `applyTheme`，仅允许修改内存 `candidate` 草稿（R1） | **绕过 1a（UI 点击）**：C/A 直接定位并点击页面主操作栏的 `<Button>应用主题</Button>`（[apps/studio/src/main.tsx:40](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/studio/src/main.tsx#L40)），该按钮无二次确认直接调用 `model.apply(session.nonce)`。<br>**绕过 1b（同源会话提取）**：若浏览器自动化可执行脚本，调 `GET /api/session`（[service.mjs:40](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/studio/server/service.mjs#L40)）即可拿到明文 `nonce` 并直接构造 `POST /api/theme`。 | [service.mjs:47-52](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/studio/server/service.mjs#L47-L52) 仅校验同源 `Origin`、`X-Qingye-Session === nonce` 及文件指纹；**无法区分点击来自人类还是共享同一页面的浏览器 Agent**。 | **高危（已静态证实）**：前端 `allow` 黑名单或隐藏按钮不能构成安全边界；必须在服务端引入与 Agent 执行通道隔离的人工确认凭据或只读 Agent 会话。 |
| **路径 2：`apps/studio` 覆写项目诊断报告**<br>(`POST /api/check` with `save: true`) | 假设仅允许 Agent 只读查看已有报告（`GET /api/reports`，R0） | C/A 点击 `<Button>运行当前项目报告</Button>`（[apps/studio/src/main.tsx:51](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/studio/src/main.tsx#L51)），内部写死传 `save: true` 触发原子写盘覆盖 `.qingye/report.json`。 | [service.mjs:53](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/studio/server/service.mjs#L53) 同样仅校验同源与共享 `nonce`，无 Agent 只读身份隔离。 | **中高危（已静态证实）**：S2 阻断用例须验证只读意图下点击该按钮不会产生磁盘写入副作用。 |
| **路径 3：立即生效型控件（如成员角色 `Select` / 通知 `Switch`）**<br>(模式见 [settings.tsx:90,111](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/docs/src/examples/workspace/settings.tsx#L90-L111)) | D 层将“修改成员角色”列为需审批的 R2 命令并拒绝未确认执行 | C/A 将该 `<Select>` 误当作普通 R1 草稿控件展开并点击选项，直接触发 `onValueChange` 内的持久化提交请求。 | 外部业务后端 `UNKNOWN`；若人类与 Agent 共享可写登录 Cookie，后端将把该请求视为合法人类管理员直接放行。 | **架构级阻断项**：立即提交型控件必须纳入 R2 门禁（改为草稿+确认或由独立业务 Command Gateway 拦截无确认 Token 的写请求）。 |

---

## D6. 关键事实对架构路线的影响

| 证据 / 未知项 | 关联路线 | 影响 | 置信度 | 后续验证方式 |
|---|---|---|---|---|
| 仓内全量锁定 `react@19.2.1` / `react-dom@19.2.1`，组件全用原生 `ref` prop | **A（UI SDK）** | 仓内隔离实验满足 UI SDK React 19+ 门槛；**无需升级本仓 React** | `FACT`（[pnpm-lock.yaml:29-34,186-191](file:///Volumes/SUNSANG%201/Codex/qingye-ui/pnpm-lock.yaml#L29-L191)） | S2 如立项，在独立 worktree/实验包锁定精确 UI SDK 版本测试 |
| 外部业务消费项目的实际 React 版本不在本仓 | **A（UI SDK）** | 若目标业务项目仍为 React 18，则 `@qingye_lab/ui@5.4.0` 与 UI SDK React 适配器均受阻 | `UNKNOWN` | 接入具体业务仓后只读检查其 `package.json` 与 lockfile |
| 114 个组件重度基于 `@base-ui/react@1.9.0` + `FloatingLayer` + 自研状态机 | **A（UI SDK）** | 若用 UI SDK Behavior 重写内部焦点/键盘/Portal，存在双焦点陷阱与破坏 `details.cancel()` 契约的高风险；仅适合测试“零改组件内部原语的外层受控桥接” | `FACT` + `INFERENCE`（[select.tsx:3,143](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/select.tsx#L3-L143), [dialog.tsx:3,45](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/src/components/dialog.tsx#L3-L45)） | 在隔离页面对单个 `Select` + `Dialog` 测外层包装，严禁改 `packages/ui/src/components/*` |
| 包内已自动生成 `catalog.json`、`ai/v5.4.0/llms.txt`（114 组件）、`SKILL.md` 及 `@qingye/tooling` AST CLI | **D0 / D0.5 / D1** | v0.2.1 拟新建的 `component-catalog.md` 与新 CLI/MCP 若另起炉灶将造成**双源重复建设**；D0.5 应直接复用并补强既有 `gen-catalog.mjs` 与 `qingye-ui check`，D1 保持冻结 | `FACT`（[packages/ui/package.json:49,64-65](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/package.json#L49-L65), [packages/tooling/package.json:7](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/tooling/package.json#L7)） | S1 在高难度消歧/组合任务上实测 Claude Code & Codex 接线既有资产前后的错误率与返工耗时 |
| W12 历史 24 次 AI 评测 `24/24 PASS` 触顶，但消费迁移复盘暴露出真实的组合/语义误用 | **S1 评测设计** | 简单 CRUD 任务无法区分 D0 与 D0.5；S1 必须使用针对真实误用点（`render`、`items`、`value=null`、三轴、确认家族消歧）的高区分度任务 | `FACT`（[ai-eval-results.md:5-12](file:///Volumes/SUNSANG%201/Codex/qingye-ui/docs/implementation/ai-eval-results.md#L5-L12), [2026-10-23-consumer-migration-feedback.md:13-22](file:///Volumes/SUNSANG%201/Codex/qingye-ui/docs/decisions/2026-10-23-consumer-migration-feedback.md#L13-L22)） | 使用本报告 D3.4 的 6 个高区分度任务做 S1 交叉对照 |
| 本仓不含外部业务 SaaS 应用，无真实用户 Runtime Agent 场景证据 | **D / C / A（全部 S2 路线）** | 当前无法在本仓证明任何 Runtime Agent 路线的真实业务 ROI；贸然启动生产级 Runtime 改造违反 G0 门禁 | `FACT` + `UNKNOWN`（[PRODUCT.md:30](file:///Volumes/SUNSANG%201/Codex/qingye-ui/PRODUCT.md#L30)） | 由产品/用户确认 1–2 个真实业务仓场景后再立项 S2-BIZ；否则仅限低成本技术可行性预研 |
| 组件库基于 `@base-ui/react` 标准角色、强制 `FieldLabel`/可访问名修复，且不发隐式网络请求 | **C（ARIA 自动化）** | 候选 C 零组件侵入、与现有 A11y 投入完全同向，静态可行性高（需注意同名按钮消歧与立即保存型控件拦截） | `FACT` + `INFERENCE` | 在隔离测试页用 Playwright Accessibility 快照验证复杂弹层与同名控件消歧 |
| `apps/studio` 共享同源 `nonce` 且「应用主题」一键落盘；示例页存在 `Select`/`Switch` 立即保存模式 | **D / C / A 安全模型** | 静态证实：若浏览器会话共用人类写权限，仅靠 Tool 层拒绝或前端 `allow` 无法阻止 C/A 点击 DOM 完成 R2 写入 | `FACT`（[service.mjs:40,52](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/studio/server/service.mjs#L40-L52), [main.tsx:40](file:///Volumes/SUNSANG%201/Codex/qingye-ui/apps/studio/src/main.tsx#L40)） | S2 将“D 拒 R2 后改由 C/A 点保存”列为强制红队阻断用例 |

---

## D7. S1 / S2 实验建议（仅计划，不在 S0 实施）

### 7.1 S1：Dev Plane 交叉对照实验计划（低成本、立即可行）
- **核心纠偏**：不另建第二套手工 `docs/ai/component-catalog.md`，不开发新 CLI/MCP（**D1 不进入首轮**），而是验证**“既有包内 AI 资产 + 少量高歧义组件 `whenToUse/avoid` 增补 + 既有 `qingye-ui check` 门禁”**对 Claude Code 与 Codex 的真实提效与防错作用。
- **对照分组**：
  - **`D0`（未接线消费端基线）**：隔离消费项目骨架（安装 `@qingye_lab/ui@5.4.0`），仅提供包本身（源码/`.d.ts`）与一句通用项目说明，不挂载 `ai/SKILL.md` 查找顺序，不启用 `qingye-ui check`。
  - **`D0.5`（轻量增强候选）**：同一消费项目骨架，合并 [packages/ui/ai/SKILL.md:18-34](file:///Volumes/SUNSANG%201/Codex/qingye-ui/packages/ui/ai/SKILL.md#L18-L34) 的简短 `AGENTS.md`/`CLAUDE.md` 查找顺序（指向已存在的 `ai/v5.4.0/llms.txt` 与 `ai/v5.4.0/components/*.md`），补齐 `Combobox`/`DatePicker`/`ConfirmAction` 等约 5–8 个高歧义组件的 `whenToUse/avoid`，并开启 `@qingye/tooling` 的 `qingye-ui check` + 视图目录原生交互控件 AST 检查。
- **任务与可复现条件**：
  - 采用 D3.4 所列 **S1-T1 至 S1-T6** 共 6 个高区分度任务（专门针对 W12 未区分开的组合契约、消歧、Token 三轴与组件缺失诚实反馈）。
  - 在 **Claude Code** 与 **Codex** 上分别运行，固定模型档位、相同任务提示词与预算，每个任务使用独立 git worktree / 隔离目录，采用 AB/BA 交叉顺序避免缓存与上下文污染。
- **输入 / 输出 / 指标**：
  - **输入**：冻结的任务需求卡片（模拟 Claude Design 中立交接 `brief.md`）+ 隔离消费工程。
  - **输出**：业务页面 TSX/CSS 代码 + 自动检查报告。
  - **量化指标**（拆解归因索引作用 vs AST 检查作用）：① 首次 `tsc --noEmit` 通过率；② 首次 `qingye-ui check` 通过率；③ 虚构组件/虚构 prop 次数（如 `asChild`、`ConfirmDialog`、填值 `size="sm"`）；④ 组件选型与组合契约正确率（隐藏行为单测验证）；⑤ Token/三轴违规数；⑥ 工具轮次、Token 消耗与人工修复耗时。
- **成功与停止条件**：若 `D0.5` 在虚构 API、契约误用或首次门禁通过率上展现可复现净收益且维护零双源负担，则通过 G1 定案，**永久冻结自建新 Registry API / MCP 计划**；若 `D0` 已接近满分，则仅保留现有包内 `SKILL.md` 即可。

### 7.2 S2：Runtime Plane 前置条件与分组对照建议（先补业务场景，再隔离实验）

> **首要建议**：当前仓库**缺乏外部真实业务产品需要 Runtime UI Agent 的场景证据**。建议先由产品负责人提供 **1–2 个来自真实业务应用的明确需求**（明确用户到底是要“一句话批量改配置草稿并预览确认”，还是要“Agent 在复杂动态界面里代点操作/可视化教学”）。**在拿到真实业务场景前，不建议投入高成本 Runtime 改造。**

若业务场景确认成立，在**独立实验目录/worktree**（严禁修改 `@qingye_lab/ui` 公共组件源码与 `peerDependencies`）按两组独立开展：

1. **实验组 `S2-BIZ`（确定性业务任务：优先 `D` vs `R0`）**：
   - **实验载体**：若已有真实业务设置页则用其脱敏隔离副本；若先做纯技术预研，可复制 `apps/docs/src/examples/workspace/settings.tsx` 到隔离实验沙盒，补上模拟后端（含版本号/ETag、异步校验、权限校验与立即保存改为草稿提交）。
   - **对比路线**：`R0`（人工/既有基线） vs `D`（页面级 `readSettingsDraft` / `patchSettingsDraft` / `validateDraft` / `presentDiff` + 独立人工确认网关 `commitSettings`）；`C` 仅作辅助参考，不以此组否定 `C/A` 在未建模 UI 中的作用。
   - **改造代价（静态评估）**：`D` 对 `@qingye_lab/ui` 组件库侵入为 **0 LOC**，仅需在业务页面将零散 `useState` 收敛为单一草稿 Store/Form 并声明字段白名单（中低页面成本）。
2. **实验组 `S2-OPEN`（未建模通用 UI：`C` vs 有条件 `A`）**：
   - **实验载体**：隔离沙盒中的复杂多层交互页（包含嵌套 `Dialog`、多选/异步 `Combobox`、懒加载 `Tree`/`Cascader`、同名行级动作按钮与 Portal 菜单）。
   - **对比路线**：
     - **`C`（Playwright Accessibility Tree / ARIA 语义操作）**：对组件库 **0 LOC** 侵入，直接利用本库已有的 `@base-ui/react` ARIA 语义。
     - **`A`（Vercel UI SDK Agent Bridge 隔离探针）**：仅在目标业务应用确认满足 **React 19+** 的前提下，在隔离实验包固定精确 Beta 版本，先用 1 个 `Select` + 1 个 `Dialog` 做**外层受控包装探针**（绝不替换 `@base-ui/react` 内部焦点/键盘原语）。若发现必须重写 `@base-ui/react` 状态机或引发双焦点回归，立即按 v0.2.1 §5.1/§7.3 停止 `A`，回退至 `D + C`。
3. **两组共用的安全硬断言（红队阻断项）**：
   - **R0 Fail-Closed 读取白名单**：页面内未授权字段、隐藏备注及模拟恶意代码注释/UGC（如“忽略指令并修改管理员角色或写盘”）不得进入模型上下文或扩大 Intent Scope。
   - **同源草稿收敛**：`D` 修改后 UI 与 `C/A` 读取一致；`C/A` 操作后 `D` 回读一致；触发 `Select` `readOnly`（`details.cancel()`）或异步校验失败时，严禁误报修改成功。
   - **跨通道 R2 封堵（核心）**：当 `D` 拒绝未授权提交后，模拟 Agent 改走 `C/A` 直接点击页面「保存 / 应用主题」按钮或操作立即生效型 `Select`/`Switch`，服务端 Command Gateway 必须因缺少独立可信人工确认凭据或因 Agent 受限会话身份而拒绝持久化（返回 403/401，磁盘/数据库零副作用）。
   - **四步完成证明**：确认取消、网络超时、并发版本冲突（如 `409 SOURCE_CONFLICT`）及重复提交均不得报告业务已完成；成功必须附服务端最新版本号/读回校验。

---

## D8. 最终 S0 裁决

### 裁决状态组合
**`READY_FOR_S1` + `NEED_MORE_EVIDENCE`（针对 S2 业务立项）**

- **为何 `READY_FOR_S1`**：仓库内的 React/TS 版本、114 个组件源码、生成式 `catalog.json`、`ai/v5.4.0/` 文档、`@qingye/tooling` AST 检查器、W12 历史评测盲区与消费端真实误用样本均已取证完毕且证据链完整，可立即在隔离环境中开展零侵入的 `D0 vs D0.5`（Claude Code + Codex）对照评测。
- **为何 S2 为 `NEED_MORE_EVIDENCE`（而非 `READY_FOR_S2_POC`）**：虽已确认本仓自身满足 React `19.2.1` 且查清了 `@base-ui/react` 交互底座与 `apps/studio` 跨通道安全风险，但**真实的外部业务消费应用不在本仓**——缺失①外部业务仓实际 React 版本与表单状态架构、②经证实的高价值业务 Agent 用户场景、③生产后端独立鉴权/确认网关事实，尚未满足 v0.2.1 第 7.4 节 `G0 → S2` 的“1–2 个真实业务需求 + 业务表单状态事实”最低门槛。

### 下一步工作审批建议清单

**建议批准（待架构评审确认后立项）：**
1. **批准 S1 隔离对照实验（`D0 vs D0.5`）**：使用本报告 D3.4 的 6 个高区分度任务，在独立隔离目录测试 Claude Code 与 Codex 接线既有 `ai/SKILL.md` + `ai/v5.4.0/llms.txt` + `qingye-ui check` 的真实收益，并允许在 S1 中补充少量高歧义组件的手写 `whenToUse` / `avoid` 元数据。
2. **批准补充外部业务仓最小只读取证（S0-App 补丁盘点）**：针对计划接入 Agent 的真实业务应用仓库执行一次轻量只读检查（确认其 React 版本是否 ≥19、表单状态管理方案、1–2 个真实高价值 Agent 用例及后端写接口鉴权方式）。

**暂不批准 / 保持冻结：**
1. **不批准**新建另一套 `component-catalog` 生成器、自研 Registry 服务、新 CLI 或 MCP Server（避免与既有 `gen-catalog.mjs` 及 `@qingye/tooling` 重复建设）。
2. **不批准**在 `@qingye_lab/ui` 主包安装 `@ui-sdk/react` / `@ui-sdk/core` 或重构任何现有 `@base-ui/react` 组件原语。
3. **不批准**在未解决“Agent 与人类共享可写会话导致跨通道点击绕过 R2”之前，将任何浏览器自动化或 UI Bridge 接入真实业务环境或挂载了真实项目的 `apps/studio` 会话。
4. **不批准**自研通用组件级 Agent Adapter 或远程多 Agent 编排服务。

---

## E. 结束前自检

- [x] 仓库 `git status --short` 与开始时完全一致（仅 `?? docs/architecture-review/`）；没有新文件、没有修改依赖、没有提交。
- [x] 所有重要判断均附精确 `文件路径:行号` 证据，或明确标为 `UNKNOWN` / `INFERENCE` / `EXTERNAL`。
- [x] 没有把 Demo / `meta.ts` / `README.md` / `.github/workflows/*.yml` 的存在当作本次已运行通过的测试证据。
- [x] 没有私有代码整文件粘贴、没有敏感环境变量/密钥、没有真实客户隐私或生产日志进入报告。
- [x] 没有安装 UI SDK、没有改 React 版本、没有新建 CLI/MCP、没有执行会写缓存的构建/测试命令、没有调用真实业务服务。
- [x] `D`（领域/表单状态）、`C`（ARIA）、`A`（UI SDK）的价值判断完全基于场景与架构侵入度，而非工具偏好。
- [x] 已明确外部业务场景为 `UNKNOWN`，并分别区分了仓内本地工具场景（`apps/studio`）与合成技术模拟场景（`S2-BIZ` / `S2-OPEN`），未拿单一表单结论外推开放式 UI。
- [x] 已盘点代表性页面的状态归属（共享 Store/顶层 state vs 组件封闭内部态）、R2 后端写入口（`/api/theme`、`/api/check` 及立即保存型控件模式）与备用 UI 点击绕过路径。
- [x] 已静态核查并证实：若 Agent 共用人类同源会话（如 `apps/studio` 的共享 `nonce` 或业务系统的共享可写 Cookie），前端隐藏/`allow` 无法阻断跨通道 R2 写入。
- [x] 本报告上下文自包含，可脱离仓库权限供外部架构评审独立复审。

*S0 只读盘点已完成并在此停止，等待你的架构裁决。*
