# `@qingye/tooling` 诊断修复指南

本文件随 `@qingye/tooling` 同版本发布，是 `qingye-ui check` 全部 9 条静态规则的唯一修复参考。每条诊断对象的 `repairGuide` 字段按规则名直接指向本文件对应锚点（`rule` 中的 `/` 替换为 `-`，如 `imports/invalid-export` → `#imports-invalid-export`）；`decision` 字段与下文各规则的「诊断建议」逐字一致，均来自 `src/rules.ts` 单一规则表。

说明：
- 归属层遵循 `design.md`「明确修改归属」：`P` 为项目设计层（主题、Token、公共组合与适配器），`A` 为应用侧代码与依赖配置。
- 本指南针对静态 AST 扫描规则；浏览器布局、焦点、对比度与交互状态仍须单独验证，静态 `PASS` 不代表完整验收。
- 仅在有明确业务理由且不适合改写源码时，才在 `exceptions.json` 中登记精确例外（必须包含本指南列出的精确 `rule`、`file`、`line`、`evidence`、`reason` 与未过期 `reviewAfter`，禁止通配符；未知规则名会使配置校验失败，而不是静默不生效）。

---

## token-undefined

- **规则**：`token/undefined` · **归属层**：`P`
- **诊断建议**（`decision`）：Use an installed registered token or explicit project token definition.
- **触发条件**：CSS 声明或 TSX 的 `className` / `style` 引用或定义了 `--qy-*` 变量，但该变量既不在已安装 `@qingye_lab/ui/tokens/*.css` 中，也不在 `ui.config.json` 的 `tokenSources` 中。
- **修复方式**：
  - 若是拼写错误或使用了已移除变量，改为已安装版本 `tokens/*.css` 中的真实语义/组件角色（可通过 `qingye-ui info --project <dir>` 确认已安装版本）。
  - 若确需项目级共享自定义属性，在 `ui.config.json` 的 `tokenSources` 声明其定义文件并在该处集中定义，不要在页面样式中零散造 `--qy-*` 名称。

---

## visual-hardcoded

- **规则**：`visual/hardcoded` · **归属层**：`P`
- **诊断建议**（`decision`）：Move repeated visual decisions into the configured project theme/recipe.
- **触发条件**：在 `tokenSources`、`theme.generated`、`theme.legacyCss` 和 `adapters` 之外的源码中，出现散落的硬编码颜色（HEX / RGB / HSL / OKLCH 等）或写死的字号、字体、字重、字距、圆角、过渡时长（CSS 声明、Tailwind arbitrary value 或内联 `style`）。
- **修复方式**：
  - 优先改为 `@qingye_lab/ui` 语义角色类（如 `bg-surface`、`text-muted-foreground`、`rounded-control`、`text-body`）或已注册的 `var(--qy-*)`。
  - 若属于项目品牌色或重复出现的项目变体，集中写入 `ui.theme.json`（经 `qingye-ui theme update --apply` 生成）或项目公共组合。
  - 若属于第三方控件的视觉适配边界，在 `ui.config.json` 的 `adapters` 显式登记适配目录，不在业务页面散落覆盖。
- **注意**：普通结构性数值（`0`、百分比、`fr`、布局宽高等）和真实数据值不受此规则限制。

---

## visual-dynamic

- **规则**：`visual/dynamic` · **归属层**：`P`
- **状态**：`UNVERIFIED`（静态扫描无法求值，不当作通过）
- **诊断建议**（`decision`）：Review runtime visual expression; static scan cannot determine its value.
- **触发条件**：`className` 或 `style` 中的视觉相关表达式由运行时变量、模板拼接或函数返回决定，AST 无法静态确定其最终值。
- **修复方式**：
  - 若仅有有限几种语义状态，改为静态映射表或 `cn()` 条件分支，让所有类名和角色 token 可静态检查。
  - 若确实来自真实业务数据（例如用户自定义色值或数据可视化映射），人工核对前景/背景对比度并在交付报告中保留实际运行验证记录。

---

## theme-axes

- **规则**：`theme/axes` · **归属层**：`P`
- **诊断建议**（`decision`）：Use data-brand for brand and reserve data-theme for light/dark.
- **触发条件**：CSS 选择器或 JSX 属性将 `data-theme` 设为 `light` / `dark` 之外的值（例如 `[data-theme="sentinel"]`）。
- **修复方式**：
  - 品牌写文档级 `html[data-brand="<brand>"]`；
  - 明暗留给 `ThemeProvider`（默认 `.light` / `.dark`，显式属性模式下使用 `data-theme="light"` / `data-theme="dark"`）；
  - 密度写 `data-density="compact"`。三轴严禁混用，否则 `ThemeProvider` 运行时会覆盖品牌标记。

---

## theme-dynamic

- **规则**：`theme/dynamic` · **归属层**：`P`
- **状态**：`UNVERIFIED`
- **诊断建议**（`decision`）：Verify dynamic theme axis at runtime.
- **触发条件**：JSX 中 `data-theme` 绑定了静态无法求值的表达式。
- **修复方式**：
  - 明暗切换交由 `ThemeProvider` 管理，避免业务组件手动拼写动态 `data-theme`；
  - 若确需动态写入，收窄类型使其取值仅限 `"light" | "dark"`，并在运行时验证不与品牌轴冲突。

---

## imports-private

- **规则**：`imports/private` · **归属层**：`A`
- **诊断建议**（`decision`）：Import through an installed package public export.
- **触发条件**：导入路径以 `@qingye_lab/ui/` 开头，但不匹配已安装 `package.json` 的 `exports` 公开子路径（例如 `@qingye_lab/ui/src/components/button` 或 `@qingye_lab/ui/dist/...`）。
- **修复方式**：改为公开子路径导出（如 `@qingye_lab/ui/components/button`、`@qingye_lab/ui/locale`、`@qingye_lab/ui/utils`、`@qingye_lab/ui/styles.css`）。可运行 `qingye-ui info --project <dir>` 查看当前已安装版本的真实 `exports`。

---

## imports-unresolved

- **规则**：`imports/unresolved` · **归属层**：`A`
- **状态**：`UNVERIFIED`
- **诊断建议**（`decision`）：Resolve the actual dependency/alias; unresolved modules are not validated.
- **触发条件**：TypeScript 按项目 `tsconfig.json` 无法解析该 `import` / `export` 的模块路径，或无法检查其导出表。
- **修复方式**：
  - 检查依赖是否已真实安装、路径别名是否在项目 `tsconfig.json` 中正确配置；
  - 确认导入路径拼写与实际文件或包导出一致，避免在未解析状态下忽略潜在缺失导出或缺失 peer。

---

## imports-invalid-export

- **规则**：`imports/invalid-export` · **归属层**：`A`
- **诊断建议**（`decision`）：Use the actual installed module exports.
- **触发条件**：从已解析模块中具名导入或重导出了不存在的符号（常见于按其他 React UI 库的命名习惯写错，例如 `DialogContent`、`TabsTrigger`、`Toast`）。
- **修复方式**：
  - 运行 `qingye-ui docs <component> --project <dir>` 或查阅已安装 `node_modules/@qingye_lab/ui/catalog.json` 与 `ai/SKILL.md` 中的常见名称纠偏表，改为当前安装版本的真实导出名。

---

## imports-missing-peer

- **规则**：`imports/missing-peer` · **归属层**：`A`
- **退出码影响**：属于执行缺口（`completed: false`，退出码 `2`），不按普通警告忽略。
- **诊断建议**（`decision`）：Install the optional peer required by this actually used component, or choose a component without it.
- **触发条件**：代码实际引用了声明有可选 `peerDependencies` 的组件（例如 `Chart` / `ScatterChart` 需要 `recharts`，`DataTable` 需要 `@tanstack/react-table`），但项目无法解析该 peer 依赖。仅 `import type` 或未使用的绑定不会触发。
- **修复方式**：
  - 在消费项目中安装对应版本范围的可选 peer 依赖；
  - 若业务只需要静态表格或轻量展示而不需要完整数据表/图表引擎，改用无额外 peer 的组件（如 `Table`、`Sparkline`、`Proportion`）。
