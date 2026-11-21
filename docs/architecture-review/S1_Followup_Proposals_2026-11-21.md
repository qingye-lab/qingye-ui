# S1 收尾后的两项库内候选：裁决材料（2026-11-21）

> 状态：**待用户裁决**。本文件只调研和推荐，不改库代码。
> 问题来源：S0 裁决第 23 条“建议”第 1、2 项、第 24 条（这两条目前只在主检出未提交的 `S0_Ruling_2026-11-20.md` 里）。
> S1 题目 T7、T23 只说明问题从哪里来，**不作为设计依据**；下面的推荐只依据 `design.md`、既有裁决和外部组件库的做法。
> 外部证据按 PASS（已读到原文或源码）/ UNVERIFIED（未读到、或只有二手来源）标注。

## 结论

| 候选 | 推荐 | 兼容性 |
|---|---|---|
| 1. Toc 少于两项时不渲染 | **采纳**：判定条件从 `items.length > 0` 改为 `items.length >= 2`；**暂不加关闭属性** | 行为变更：现在只传一项的调用方会看不到目录。不改类型，不改外观 |
| 2. 禁用原因保持可见 | **不给 Button 加属性**；在 Button 文档里补一个组合示范和一条 `avoid`，不新增组件 | 不破坏兼容，只改文档 |

---

## 一、Toc：少于两项时自己不渲染

### 现状

- `packages/ui/src/components/toc.tsx`：`useRender({ enabled: items.length > 0 })`，只有空列表才不渲染。
- `apps/docs/src/content/toc/meta.ts`：`avoid` 写“少于两个目的地时目录没有意义，由调用方决定是否渲染”；`stateOwner.application` 把“是否需要目录（少于两项时渲染与否）”**明文归给应用**。所以这次要改的不只是一个默认值，而是一条已记录的状态归属，需要用户裁决。
- 本库自己的文档站 `apps/docs/src/components/toc.tsx` 已写了 `if (items.length < 2) return edit;`。第一方消费者自己补了这个判断，说明它不是个别场景。

### 依据

**design.md 和 Toc 的定义。** `toc.tsx` 头注释说 Toc 的任务是“在几个目的地间走动”。只有一个目的地时，没有地方可以走动，读者能做的只有跳到自己正在读的这一节。按“名实相符”，一项的列表不是目录。`design.md`「明确修改归属」把“组件语义、基础状态”放在公共组件库：“这份目录有没有意义”取决于条目数，条目数 Toc 自己拿得到，不依赖路由、权限、异步结果这类应用事实。

**库内先例。** `pagination.tsx:168`：没有摘要、不需要翻页（单页）、也不需要切换页长时直接 `return null`，而且没有关闭入口。Toc 改阈值和这条先例一致：内容不足以构成这个组件的任务时，组件自己不出现。

**外部做法。**

| 来源 | 做法 | 证据 |
|---|---|---|
| USWDS In-page navigation | `data-minimum-heading-count`，**默认 2**；标题数不足时组件不初始化；测试样例设为 `0` 关闭这个判定 | PASS：源码 `const IN_PAGE_NAV_MINIMUM_HEADING_COUNT = 2;`（uswds 3.13.0 `usa-in-page-navigation/src/index.js`）；官方文档说明属性含义 |
| Starlight | 只有全站或单页 `tableOfContents: false` 和标题层级范围，未查到条目数阈值 | 部分 PASS：配置参考页；未读源码 |
| Docusaurus / VitePress | 未查到条目数阈值选项 | UNVERIFIED：只看了配置文档，**不能据此说它们“一项也渲染”** |
| Hugo 社区 | 有“只有一个标题时隐藏目录”的求助帖，靠模板自己判断 | 只说明需求常见 |

只有 USWDS 把阈值做成组件默认行为，其默认值正是 2。文档框架一般把这个判断留给主题或页面。

### 反例检查

1. **“节”按条目算，不按 h2 算。** 判定用 `items.length < 2`：一个 h2 下两个 h3 是 3 项，照常渲染。这样只要求“至少两个可去的目的地”，不对层级做额外假设。
2. **调用方仍需知道 Toc 有没有渲染。** 文档站用同一个阈值决定 `EditLink` 的间距（`items.length < 2` 时编辑链接独占一栏）。Toc 自己不渲染后，外面的栏位和间距仍由调用方决定，调用方继续用 `items.length` 判断即可。这不构成必须加属性的理由，但说明不能把“改了阈值”说成调用方从此不必关心。
3. **内容异步加载，条目从 1 变到 2 以上。** 现在条目从 0 变到 n 时 Toc 已经会突然出现，改阈值后只是把这个时刻推迟到第二项出现，没有新问题。
4. **想展示只有一项的目录**，例如组件演示或 CMS 预览“这篇将来会有目录”。没有找到库内或第一方站点有这种用法；`cover.tsx`、两个 demo、`CompositionPage`、`examples/workspace/help.tsx` 都传多项（help 页按标题扫描，实际页面有多节，改动后需要回看）。

### 要不要加关闭属性（比如 `minItems`）

推荐**暂不加**。

- 没有找到真实需要一项目录的场景（反例 4）。为没出现的需求加属性，违反“优先复用当前属性和组合”。
- 以后需要时再加一个可选属性（如 `minItems?: number`，默认 2），不破坏兼容。现在加了，再删就是破坏性变更。
- USWDS 有这个开关，但从仓库样例看主要用于测试；本库测试可以直接传两项。

如果用户希望现在就留开关，备选写法是 `minItems?: number`（默认 2，传 1 恢复旧行为），不用布尔值，避免出现“`showSingle`”这种只为一种情况命名的属性。

### 影响范围

- `packages/ui/src/components/toc.tsx`：改 `enabled` 条件，更新头注释里“没有条目就不渲染”的描述。
- `packages/ui/test/toc.test.tsx`：现有“空列表不渲染”用例（第 38 行）扩成“0 项和 1 项都不渲染，2 项渲染”。
- `apps/docs/src/content/toc/meta.ts`：中英文 `avoid`、`stateOwner`、`api[0].description` 改为“少于两项时不渲染”，把“是否渲染”从 application 移到 library。之后运行 `pnpm --filter @qingye_lab/ui gen:catalog`。
- `apps/docs/src/components/toc.tsx`：可保留自己的 `< 2` 判断（它还管编辑链接的位置），不必改。
- 版本：行为变更（以前传一项会显示目录，以后不显示）。不改类型和外观，但消费项目能看到差异，需要在变更说明里写明；是否算主版本由用户定。按本仓库惯例（`feat!` 标记显式写出破坏外观约定），推荐按破坏性变更标注。

---

## 二、禁用按钮的原因怎么保持可见

### 现状与前提核实

- `tooltip/meta.ts` 写着“关键后果、禁用原因与失败后的恢复说明留在可见内容中”“禁用原因直接可见”。这条是作者写进组件文档的（提交 `ede731bc`、`a94e8b4e`），**不是用户原话裁决**。
- 用户 2026-10-10 的原话是“保留忙碌没有问题，其他的有需要可以使用提示组件”。按 `docs/decisions/2026-10-03-foundation.md` 第 638 行起的处置表，“提示组件”在那里指承接按钮旁状态文字的 Alert / Toast / FieldError / StatusDot，不是专指 Tooltip。这句话**既不支持也不否定**“禁用原因可以放进 Tooltip”。
- 因此第一个要裁决的是：**这条约定本身成立吗？** 第二个才是：放在哪里。

### 这条约定成立吗：推荐“成立”

1. **触屏上看不到。** Base UI Tooltip 官方文档写明 tooltip 在触屏设备上禁用，并建议重要说明改用页内文字或 Popover（PASS，base-ui.com Tooltip 页 “Alternatives to tooltips”）。本库 Tooltip 基于它，所以 Tooltip 包住禁用按钮的写法在触屏上原因完全不出现。这是可验证的事实，不是审美判断。
2. **design.md。** NG7 禁止“让唯一的关键后果只存在于会消失的提示里”。严格说禁用原因不是“后果”，但它是用户恢复操作所需的唯一信息（缺权限、缺前置条件），性质相同；仓库规则“仅保留识别、决策、错误恢复所需的文字”也把它列为必须保留的那类文字。`design.md` 第 215 行要求禁用条件写下来、可被读到。
3. **外部做法是分歧的，要如实说。**

| 来源 | 做法 | 证据 |
|---|---|---|
| Cloudscape | Button 有 `disabledReason`：提供后按钮可聚焦，原因以 **tooltip** 呈现；较长或复杂的原因改用文字说明或 Alert；**表单提交按钮不要禁用**，改用校验 | PASS：Disabled and read-only states 模式页；属性类型（string）只见于 `@awsui` 类型声明，未逐版核实 |
| PatternFly | 不加原因属性；用 `isAriaDisabled` 保持可聚焦，再由使用方组合 Tooltip | PASS：Button / Tooltip 无障碍页 |
| Wix Design System | 用 tooltip 在 hover/focus 时说明禁用原因，按钮用 aria-disabled | PASS（搜索摘要），未读原页 |
| UHC Abyss | 不加原因属性；用 `aria-describedby` 指向文字（示例为视觉隐藏文字） | 搜索摘要，UNVERIFIED |
| GOV.UK | 禁用按钮对比度差、会让部分用户困惑，**尽量避免**；只有研究表明有帮助时才用。提交时出错用错误信息说明 | PASS：Button 页 “Disabled buttons” 一节 |

**没有找到“Button 属性渲染页内可见文字”的先例。** 唯一一等的 `disabledReason`（Cloudscape）恰好是 tooltip，与本库“直接可见”的约定相反，不能当作支持 Button 属性方案的证据。主流库要么用 tooltip，要么劝人别禁用。本库选择“可见文字”，理由是上面第 1、2 点，这是本库比多数库更严格的地方，要在文档里讲清原因。

### 放在哪里：四个候选

| 候选 | 说明 | 评价 |
|---|---|---|
| A. Button 加 `disabledReason` | 按钮旁渲染可见文字并用 `aria-describedby` 关联 | **不推荐**。① 违反 2026-10-10“功能纯粹”裁决：Button 只触发动作，不承担说明。② 原因文字放在哪（按钮下方、行尾、工具栏外、表格行里）由版面决定，组件替调用方选位置，会出现 2026-10-10 那种“表格行里被迫塞一段文字”的问题。③ 原因内容（权限、前置条件）在「明确修改归属」中属于应用。④ 没有外部先例 |
| B. 新增组合件（如 `ActionNote`） | 一个包住按钮和说明的小组件，负责生成 id 和关联 | **不推荐**。组合只需要 `React.useId()`、一个 `aria-describedby` 和一段文字，组件省不下多少代码，却要定一个版面；与 A 同样替调用方选位置 |
| C. 文档：Button 页补组合示范和 `avoid` | 见下 | **推荐** |
| D. 开发期诊断（如 Tooltip 检测到 `aria-disabled` 触发器时警告） | — | **排除**。“功能纯粹”裁决已明确不在组件里加诊断；而且 Tooltip 包 `aria-disabled` 按钮放补充说明（如快捷键）是合法用法，无法区分 |

### 推荐方案 C 的具体内容

现在的缺口：禁用原因的规则只写在 `tooltip.md`。调用方要先想到“用 Tooltip”才会读到它；Button 页 `06-states` 只示范 `disabled`，没有原因写法。所以规则放错了地方，不是缺少组件能力。

1. **Button 页 `avoid` 加一条**（中英文）：“把禁用原因只放在 Tooltip 或 `title` 里：触屏上不会出现，读屏也不一定读到。原因写成页面文字，用 `aria-disabled` 保持按钮可聚焦，再用 `aria-describedby` 关联。”
2. **Button 页 `composition` 加一条**：“能让用户先操作再纠错的（多数表单提交），不禁用按钮，提交后用 FieldError / Alert 说明（与 Form 的‘就地 FieldError’一致）。确需禁用时，原因放在按钮旁的可见文字里。”这条与 GOV.UK、Cloudscape 一致，也与 `form/meta.ts` 的 decisions 一致。
3. **补一个 demo**（如 `09-disabled-reason.tsx`）：`<Button aria-disabled aria-describedby={id}>` 加一段 `text-support text-muted-foreground` 的原因文字。只用现有组件和原生元素，用真实内容（比如“需要管理员权限”），不写说明书式文案。
4. `tooltip.md` 原有规则保留，但写明理由（触屏不显示），不只写结论。
5. 之后运行 `gen:catalog`，AI 指南随之更新。

### 影响范围

- `apps/docs/src/content/button/meta.ts`（中英文 `avoid`、`composition`）、新增一个 demo 文件、`apps/docs/src/content/tooltip/meta.ts` 补一句理由。
- 不改 `packages/ui/src/components/*`，不改类型，**不破坏兼容**。
- 风险：只靠文档，弱配置的代理可能仍会写成 Tooltip 包按钮。这是方案 C 承认的代价；如果用户认为要用组件能力来兜底，备选是 B，但要先定组合件的版面位置。

---

## 需要用户裁决的问题

1. Toc：同意把“少于两项时不渲染”从应用归属改为组件默认行为吗？同意暂不加 `minItems` 吗？变更按破坏性标注吗？
2. 禁用原因：同意“禁用原因必须是可见文字、不只放在 Tooltip”这条约定成立吗（本库比 Cloudscape、PatternFly 更严格）？
3. 禁用原因：同意不给 Button 加属性、也不新增组合件，只在 Button 文档补示范和规则（方案 C）吗？

## 来源

- USWDS In-page navigation：https://designsystem.digital.gov/components/in-page-navigation ；源码 https://cdn.jsdelivr.net/npm/@uswds/uswds@3.13.0/packages/usa-in-page-navigation/src/index.js
- Starlight 配置参考：https://starlight.astro.build/reference/configuration
- Docusaurus TOC：https://docusaurus.io/docs/markdown-features/toc
- Hugo 论坛：https://discourse.gohugo.io/t/hide-toc-if-only-one-heading-available/42666
- Cloudscape Disabled and read-only states：https://cloudscape.design/patterns/general/disabled-and-read-only-states/ ；需求讨论 https://github.com/cloudscape-design/components/issues/1181
- PatternFly Button 无障碍：https://patternfly.org/components/button/accessibility ；Tooltip 无障碍 https://patternfly.org/components/tooltip/accessibility
- Wix 禁用状态：https://dev.wix.com/docs/wix-design-system/guidelines/interaction-behavior/disabled-states
- UHC Abyss Button：https://abyss.uhc.com/web/ui/button/
- GOV.UK Button：https://design-system.service.gov.uk/components/button/
- Base UI Tooltip：https://base-ui.com/react/components/tooltip
