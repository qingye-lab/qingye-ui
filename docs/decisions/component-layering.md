# 组件分层与命名边界

## Status

Applied（2026-10-03）。本文档是组件库分层的一级判据，供 83 个组件的独立重写使用。[design.md 的系统分层](../../design.md#系统分层) 给出五层定义，本文给出每个组件的归属、判据和拒绝过的替代方案。

组件数量：88 → **83**。删除 9 个，合并 2 个，新增 6 个。2026-10-07 盘点后为 **82**：删除 `group`、`aspect-ratio`、`progress-circle`、`carousel`，新增 `link`、`sparkline`、`proportion`，判据见 [2026-10-07-component-inventory.md](2026-10-07-component-inventory.md)。

（初版本文档把 `field-error` 列为新增项。核实后发现 `packages/ui/src/components/field.tsx` 已导出 `FieldError`，且它已按上下文正确处理校验归属，无需新增。错误归属的处理写入 `docs/decisions/2026-10-03-family-form.md`。）

## Context

组件库此前按「视觉控件」组织：一个文件一个控件，分类依据是外观与领域（表单 / 浮层 / 数据展示）。这带来三个具体问题。

**一、层级缺失导致职责越界。** `field` 承担了字段名称、说明、校验与错误表达；`toolbar` 被当作批量操作范围的承载；`layout` 同时是布局原语和页面骨架。没有分层语言时，「这该是组件还是页面」无法回答。

**二、同一关系被拆成多个组件。** `search-input` 与 `password-input` 是 `input` 的两种形态，不是独立语义；`sheet` 与 `drawer` 是同一关系的两个名字。名实相符要求一个名字对应一个对象，两个名字对应两个对象会迫使用户靠记忆区分。

**三、有的组件鼓励与设计契约相反的做法。** `skeleton` 用猜测形状替代真实内容，与「已有内容刷新时保留仍然有效的工作面」冲突；`spinner` 让等待脱离对象，与「等待、成功、失败按真实事件表达」冲突。它们不是实现有缺陷，是**存在理由不成立**。

同时有三类真实关系没有组件承担：错误的原位归属、危险动作的确认契约、以及「写入结果未知」这一本库核心状态的表达。

## Evidence

| 测量 | 命令 | 结果 |
|---|---|---|
| 组件总数 | `ls packages/ui/src/components/*.tsx \| wc -l` | 88 |
| 匿名组件（无 meta） | 与 `apps/docs/src/content/*/meta.ts` 对照 | 0 |
| 分类分布 | 见 `apps/docs/src/lib/types.ts` 的 `CATEGORIES` | 表单 22、数据展示 14、布局 11、浮层 10、反馈 7、导航 7、通用 7、日期 4、排版 3、工具 3 |
| `field` 的 API 表面积 | `packages/ui/src/components/field.tsx` | 承载字段名称、说明、错误、校验关联与布局，是库内 API 面最大的表单组件 |
| 同义组件 | `sheet` / `drawer`；`disclosure` / `collapsible` | 两者各自导出不同的部件名，但实现同一浮层与折叠关系 |

## Decision

### 分层判据

问一个东西属于哪一层，只问一句：**它在没有业务对象时是否仍然成立。**

| 如果 | 那么属于 |
|---|---|
| 是值、角色或不可违反的底线，不含交互 | Foundation |
| 不能继续拆分而不破坏交互语义 | Primitive |
| 由多个原语组成、解决一类反复出现的问题、无业务对象仍成立 | Pattern |
| 需要具体数据、校验、业务规则或外部系统才成立 | Capability |
| 需要真实页面、真实密度与真实操作链才成立 | Experience |

Capability 与 Experience **不进本库**。`STANDARDS.md` 第 1 节规定组件不含业务逻辑：不发请求、不读路由、不依赖会话。Capability 需要这些，因此它的位置是项目或产品仓库，本库只提供它所需的 Pattern 契约。

### 删除的 9 个

判据分两类：**名实不符**（同一关系两个名字，或名字不反映职责）与**存在理由不成立**（组件鼓励与设计契约相反的做法）。

| 组件 | 类别 | 判据 |
|---|---|---|
| `sheet` | 名实不符 | 与 `drawer` 实现同一关系（侧向浮层）。两个名字对应一个对象，迫使用户记忆差异。保留 `drawer`——它的名字说明动作（抽出），`sheet` 只说明形状 |
| `disclosure` | 名实不符 | 与 `collapsible` 完全同义。保留 `collapsible`——它是无障碍原语名，语义可追溯 |
| `frame` | 存在理由不成立 | 与 `card` 的「独立边界」职责重叠。NG4 的删去检验：去掉边框后内容关系不变，则围合无理由。需要一个单独的"框"组件，说明「为什么要有边界」这个问题没有被回答 |
| `preview-card` | 归属错误 | 产品特定表达，不是通用关系。它的形状由某个具体产品的预览需求决定，属于 Experience 层 |
| `spinner` | 存在理由不成立 | 独立旋转动画没有对象。等待必须有对象与真实事件。旋转作为 Button 与 StatusDot 的内部细节保留，不公开 |
| `skeleton` | 存在理由不成立 | 用猜测形状替代真实内容，与「已有内容刷新时保留仍然有效的工作面」相反。加载时保留旧内容并如实标记其状态，不用假内容替换 |
| `command` | 层级错误 | 命令面板是 Menu 的一种组合情境，不是独立结构。`⌘K` 搜索是 Pattern，由 `menu` + `input` 组合，固化成组件会锁死组合方式 |
| `menubar` | 名实不符 | 桌面应用菜单栏范式，Web 上极少对应真实关系。`navigation-menu` 已覆盖真实导航 |
| `resizable` | 层级错误 | 分栏拖拽是布局能力。且拖拽依赖 `width` 动画，与 `STANDARDS.md` 第 6 节「不动画 width」相抵触 |

**`spinner` 与 `skeleton` 的替代方案**：等待的统一表达是 `StatusDot` 加 `aria-busy`，以及 Button 的 loading 形态。刷新时保留旧内容并降低其可操作性的真实说明，不用假骨架替换。

### 合并的 2 个

| 组件 | 去向 | 判据 |
|---|---|---|
| `search-input` | `input` 的形态 | 带图标与清除按钮的输入框，语义仍是「输入文本」。搜索行为由 `filter-bar` 等 Pattern 承担 |
| `password-input` | `input` 的形态 | 带可见性切换的输入框，语义仍是「输入文本」。可见性切换是 input 的一个可选附属动作 |

`native-select`、`otp-field`、`tag-input` **不合并**，各自有独立语义：`native-select` 对应平台原生选择语义（表单提交、移动端原生选择器）；`otp-field` 有独立的状态机与输入约束；`tag-input` 表达集合而非单值。

### 新增的 6 个

| 组件 | 层 | 承担的关系 | 依据 |
|---|---|---|---|
| `confirm-action` | Pattern | 危险动作的确认契约：针对当前对象、版本与变更内容 | 名实相符；`alert-dialog` 是容器，不表达这个契约 |
| `pending-value` | Primitive | 表达「写入结果未知」，提供核实与恢复入口 | 进退相承：本库核心状态此前无组件承担 |
| `filter-bar` | Pattern | 筛选条件可叠加、可见、可清除，以及筛选后的空态 | 布白有用：集合任务反复出现，目前每页各拼一次 |
| `bulk-action-bar` | Pattern | 批量操作说明范围，并保持与未选中状态的区分 | 名实相符：范围说明是独立关系，不能靠 `toolbar` + 文案约定 |
| `virtual-list` | Primitive | 长集合的可达性与渲染边界 | 随境取度：`data-table` 之外的长列表此前无可靠实现 |
| `locale-switch` | Primitive | 切换应用语言 | 相成相制：库自身消费 locale，切换控件却要各应用自造，与「内置文案统一走 locale」不一致 |

### 82 个组件的分层归属（2026-10-07）

**Foundation（5）** —— 不含交互，是值、角色与底线：

`layout`、`typography`、`motion-provider`、`theme-provider`、`separator`

其中 layout 提供布局组合原语，typography 提供语义文字角色，motion-provider 与 theme-provider 提供主题与动效的运行时契约，separator 无状态、无交互，是几何角色。

**Primitive（45）** —— 不能继续拆分而不破坏交互语义：

`accordion`、`alert`、`avatar`、`badge`、`button`、`button-group`、`checkbox`、`checkbox-group`、`collapsible`、`copy-button`、`dialog`、`drawer`、`field`、`fieldset`、`form`、`hover-card`、`input`、`input-group`、`kbd`、`label`、`link`、`locale-switch`、`meter`、`native-select`、`number-field`、`otp-field`、`pending-value`、`popover`、`progress`、`proportion`、`radio-group`、`scroll-area`、`segmented-control`、`select`、`slider`、`sparkline`、`status-dot`、`switch`、`tag-input`、`textarea`、`toast`、`toggle`、`toggle-group`、`tooltip`、`virtual-list`

承载类组件不在此列：card 与 item 移到 Pattern，因为它们表达的是「内容成组」这一关系，而不是控件语义。

**Pattern（32）** —— 无业务对象仍成立，解决一类反复出现的问题：

`alert-dialog`、`autocomplete`、`breadcrumb`、`bulk-action-bar`、`calendar`、`card`、`chart`、`code-block`、`combobox`、`confirm-action`、`context-menu`、`data-table`、`date-picker`、`date-range-picker`、`date-time-picker`、`description-list`、`empty`、`file-upload`、`filter-bar`、`item`、`menu`、`navigation-menu`、`page-header`、`pagination`、`sidebar`、`stat`、`steps`、`table`、`tabs`、`timeline`、`toolbar`、`tree`

table 是 Pattern 而非 Primitive：它无业务对象成立，但表达的是「比较」这一关系，需要列定义、排序与空态的共同契约。

**Capability 与 Experience（0，不进本库）** —— 需要业务对象、数据或真实页面才成立。本库通过 Pattern 契约支持它们，不实现它们。

### 跨层例外

`tabs` 归 Pattern：它表达"在同一对象上切分视角"，需要面板、键位与焦点返回的共同契约，不是单控件语义。

`toolbar` 归 Pattern：它是操作组的承载关系，不是控件。`bulk-action-bar` 与它的区别是后者必须说明范围。

`sidebar` 归 Pattern：它表达导航与主工作面的长期关系，包含折叠状态与响应式承载。

`chart` 归 Pattern：它无业务对象时仍成立（图表是表达关系的方式），但需要轴、图例、空态与无障碍的共同契约。

## Alternatives

**未把 Capability 放进本库。** 提案曾建议 `Authentication`、`Scheduling`、`Permission`、`Approval` 作为能力层。它们需要数据、校验与外部系统，与 `STANDARDS.md` 第 1 节「组件不含业务逻辑」直接冲突。本库通过 Pattern 契约支持这类实现，不在包内实现它们。

**未按 Atomic Design 的 Atom / Molecule / Organism 分层。** 该体系按组合规模分类，不回答「是否含业务对象」，因而无法裁决 `field` 是否该承担校验、`skeleton` 是否该存在。其术语也与既有文档冲突。

**未全部拆分为独立组件。** 曾考虑把 `input` 的每种形态（搜索、密码、数字、标签）都保留为独立组件。判据是「删除后是否有真实情境缺口」：搜索与密码输入删除后，缺口可由 `input` 的属性承担；数字、OTP 与标签删除后，缺口不能由既有能力承担，因此保留。

**未删除 `toolbar`。** 曾考虑与 `bulk-action-bar` 合并。二者区别是真实关系：`toolbar` 承载常驻操作组，`bulk-action-bar` 必须说明当前操作范围。合并会使常驻操作被迫声明一个不存在的范围。

**未新增 `skeleton` 的替代组件。** 刷新时的状态表达由既有 `aria-busy` 与内容保留承担，不需要新组件。

## Consequences

- 目标组件页为 83 页；被删组件的页、示例与 `meta.ts` 一并移除。逐批完成数量另由当前源与生成投影记录。
- `apps/docs/src/content/{sheet,disclosure,frame,preview-card,spinner,skeleton,command,menubar,resizable,search-input,password-input}/` 删除；`input` 页需要新增覆盖搜索与密码形态的示例。
- 所有组件的 `meta.ts` 增加 `layer` 字段，值为 `foundation` / `primitive` / `pattern` 之一，供目录、检索与 AI 消费。
- 导航分组由「按领域」（表单 / 浮层 / 数据展示）改为「按层」（Foundation / Primitive / Pattern），使层级在文档站上可见。
- `packages/ui/scripts/gen-catalog.mjs` 的目录输出按层重新排序；`ai/v<version>/llms.txt` 的组件段随之分组。
- 删除组件意味着破坏性变更：`sheet`、`command`、`menubar`、`resizable` 的消费方需要迁移到 `drawer`、`menu` 组合、`navigation-menu` 与布局能力。迁移说明写入 `ai/` 分发包，不在本文展开。
- 分层的可验证性受限于一个事实：层级是设计判断，不是运行时属性。其验收方式是「删除检验」与「情境变化检验」，不是类型检查。声称某组件「属于 Primitive」时，须能回答它在没有业务对象时是否仍然成立。
