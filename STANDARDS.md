# 组件规范

这份规范记录 `@qingye_lab/ui` 的组件实现规则。生成器将它投影为随包分发的 `ai/style.md`，不手改生成副本。设计依据是根 [design.md](design.md)，当前值与定位见[基础层](docs/decisions/2026-10-03-foundation.md)，按[逐值裁决](docs/decisions/2026-10-03-value-adjudication.md)修订。

## 0. 硬要求、选择与预设

设计硬要求引用 [design.md「必须」](design.md#必须)，不在本规范另立副本。数值须区分推导、约束、选择与预设：约束内的一个值不自动成为唯一推导，继承值也不能改名后写成理念要求。当前尺寸、配色、字距、阴影与时长中没有唯一依据的值标为预设。

组件按当前分层与路线图逐批重写，已完成文件从 `packages/ui/src/components/` 读取；完成情况与检查证据见各批实施记录，不用不断变化的文件数代替验收。归档组件不作为实现或设计值来源。

## 1. 结构与 API

- 一个组件一个文件，位于 `packages/ui/src/components/<name>.tsx`，文件名用 kebab-case。
- 可样式化部位带 `data-slot`；外部类最后合并，透传 id、ARIA、data 属性与事件。
- `cn()` 只在变体与选择器字符串完全相同时把两条类当作同一属性的冲突去重；作用于同一元素的不同选择器会同时留下，谁生效由样式表顺序决定。同一元素同一属性分量只留一个来源。
- 改渲染元素使用 Base UI `render`、`useRender` 与 `mergeProps`；不新增无任务依据的别名或 `as` API。当前 Card 是组合入口，不自动提供标题槽或 padding。
- 基于 Base UI 的组件导出所用原语命名空间。可控状态同时保留适用的受控与非受控入口；职责按 [design.md「明确修改归属」](design.md#明确修改归属) 判断。
- 请求事实与结果推断按 [design.md「名称与状态」](design.md#名称与状态)。Button 当前选择状态联合 `idle / waiting / in-progress / unknown / failed`；boolean loading 也能符合状态归属，联合不是理念强制。
- 危险后果必须可见且可关联。danger Button 位于 ButtonProtection 内，或其 `aria-describedby` 指向页面中存在且文本非空的元素，满足任一即可；两者都无时开发环境抛错，生产不抛。运行时缺少 `process` 时按生产处理，跳过开发诊断。ButtonProtection 的 consequence 为非空可见文字，说明当前对象与后果；已有可靠说明不重复包装。后果关联见基础层 §18，缺少运行时环境的验证见批次 3 D 报告。

## 2. 尺寸

几何由材（20px，正文一行）与分（4px）派生，见基础层 §1–§2。不在组件里另写尺寸数值；需要新尺寸时先找它与材、分的关系。

| 等 | 外高 = 材 + n 分 | 窄屏 | 横向留白 = (外高 − 分) / 2 | 圆角 | 图标 | 按钮文字档 |
|---|---|---|---|---|---|---|
| `xs` | 24px | 28px | 10px | 6px | 14px | 12/16 |
| `sm` | 28px | 32px | 12px | 7px | 14px | 13/20 |
| `md` | 32px | 36px | 14px | 8px | 16px | 14/20 |
| `lg` | 36px | 40px | 16px | 8px | 18px | 16/24 |
| `xl` | 40px | 44px | 18px | 8px | 20px | 18/28 |

- 只有命令类（Button 及其派生）提供五等；名称随等变化。填值控件与标记只读角色层（`--qy-fill-*`、`--qy-marker-size`），不提供 `size`；紧凑密度由 `data-density` 表达。值的文字始终是 md 文字档。
- 区分外部占位、边框内可用尺寸与触摸命中尺寸。有 1px 边框时留白扣 1px，保持文字起点。
- 小于 44px 的独立控件使用 `touch-target`；它在粗指针下自建定位上下文，验证无裁切、相邻覆盖或视口误命中。
- 标记坐在标签行内并居中（`--qy-marker-inset`）；开关读 `--qy-switch-size`。

## 3. 表面与边界

围合与表面的任务判据引用 [design.md「空间与表面」](design.md#空间与表面)和[「删去检验」](design.md#判据)。识别机制的具体选择见基础层 §5、§6。

| 当前 Button variant | 范围机制 | 焦点机制 |
|---|---|---|
| `solid` | 填充，无默认边框或外投影 | 填充内侧 2px 反色线 |
| `bordered` | 浅色白底、线承担范围；深色读卡片面 | 原 1px 边框只变色 |
| `quiet` | 默认透明，内容识别入口 | 自身盒内 1px 细线 |

三档是当前选择，不固定对应三种重要性；tone 独立。用户规则「和背景色一致时才保留边框」解释 bordered 的来由，不给已有足够填充的入口重复补线。

neutral bordered 的 `--qy-button-bordered-border` 读 `--qy-border-input`，聚焦 `--qy-button-bordered-border-focus` 读 `--qy-ring`。两色均为墨阶的「重」（50%）：浅色为黑、深色为白。danger bordered 局部用危险文字色 50% 合成，焦点读不透明危险文字色。

- 表面读语义角色，不写死灰色。surface/raised 当前浅色为白色，深色用不透明 color-mix 配色；surface-inset、线与反馈层为半透明，须按真实叠层测合成结果。
- Input 当前外层为 1px 共同边界；内部 input 透明。深色外层读内嵌表面。Card / Popover 当前各有 1px 容器边界；这描述现状，不证明所有情境都必须保留线。
- 高光与阴影按上引删去检验判断。当前 solid Button 和 Card 无默认外投影；Card 移除 shadow-panel 是可逆默认选择，独立用途未证不等于所有项目都不得使用。Popover / Tooltip 读取 shadow-raised，Dialog / Drawer 读取 shadow-overlay；所有阴影参数都是预设，使用角色不证明其在每个组合中必要。
- 必要边界的对比判据引用[基础层 §16](docs/decisions/2026-10-03-foundation.md#16-对比底线)；不存在运行时自动读取父背景、自动补边框的库契约。G9 项目声明协议仍未定，不能把提案当现有 API。

## 4. 圆角

方以载事，圆以标点（基础层 §4）。独立控件 r = min(外高 / 4, 2 分)；只有点与身份（状态点、头像、单选标记、滑块抓手）用圆。

| 类 / 角色 | 值 | 关系 |
|---|---|---|
| `rounded-xs` / `rounded-sm` | 6 / 7px | 外高 / 4 |
| `rounded-control` | 8px | 2 分 |
| `rounded-overlay` | 12px | 控件圆角 + 浮层内缩 |
| `--qy-radius-overlay-item` | 8px | 浮层圆角 − 内缩 |
| `rounded-panel` | 12px | 与浮层同为承载面 |
| `rounded-marker` | 4px | 标记边长 / 4 |
| `rounded-item` | 6px | 与最小控件同角 |

只有同一轮廓等距内缩时才用 `r内 = max(0, r外 − inset)`，负值退化为直角。独立子对象（Card 里的按钮）保持自己的角色。

## 5. 状态与焦点

状态归属与叠加判据引用 [design.md「名称与状态」](design.md#名称与状态)；下表仅记录当前部位的实现。

| 状态 | 当前表达与定位 |
|---|---|
| hover / pressed | solid 填充 `/90` 为继承预设；bordered/quiet 用 accent 或 danger-soft；不改变布局。qy-pressable 的 0.97 缩放也是预设 |
| focus-visible | 控件外不新增一圈；Input、可聚焦 Card、Popover 面板、bordered Button 的边框只变色不加粗。solid 内线 2px，quiet 自盒内线 1px |
| disabled | 真实原生/ARIA 与事件约束另行成立；当前 opacity-64 是继承预设，不能代替真实禁用 |
| invalid | 事实由调用方声明。Input 保留 aria-invalid 和错误边框，聚焦改危险文字色，宽度仍 1px，不增加内描边 |
| waiting / in-progress / unknown / failed | Button 呈现传入事实，保留动作名称；忙碌与 unknown 防止再次触发，不自行推断成功或重试 |
| selected / open | 使用原语实际提供的 data 状态；事实与名称对应，换外观不换语义 |

焦点值见基础层 §15：`--qy-focus-ring-width` 当前选择 2px，`--qy-focus-quiet-width` 选择 1px。Input 清空/密码原生附属按钮与裸 Popover 入口目前用 2px 内线，不能把它们误写成 quiet Button。Popover 面板会实际获得焦点，审查记录 Enter 打开后匹配 focus-visible；其边框只变色。

强制颜色下 box-shadow 会被系统移除，`styles.css` 统一恢复 CSS outline：宽度和内缩位置均读取局部 `--qy-focus-ring-width`，默认 2px，quiet 为 1px；系统色接管。`!important` 用于覆盖 utilities 层的 outline-none。宽度是选择，不是 AA 下限。完整强制颜色组合矩阵仍为 UNVERIFIED。

测试 focus-visible 使用真实 `keyboard.press("Tab")`，等过渡至少 500ms 再取 computed 值；聚焦前后宽高不变、信号可见、无外扩。静态样式与候选覆盖页不等于运行验收。

## 6. 动效

- 动效的事实、可中断与任务连续性要求引用 [design.md「变化与恢复」](design.md#变化与恢复)及[禁止 NG6](design.md#禁止)。
- 时长和曲线是预设。当前 press 100ms、fast 140ms、feedback 180ms、base 220ms、slow 320ms、drawer 450ms；使用对应角色而不内联另定同类值，见基础层 §12。
- Popover / Tooltip 的入退由 motion.css 接管；组件提供结构、触发位置与 slot。起止 scale 0.98 / opacity 0 是继承预设，迁入共享文件不改变来源。当前进入 140ms、退出 100ms，是策略选择。
- Toast 仍保留局部入退与堆叠，theme.css 还有成功/错误动画；这些值均为预设，不能声称全部保留组件已完成动效收敛。
- MotionProvider 记录输入方式，键盘即时切换；reduce 时删除位移与缩放，保留可读颜色/透明度和加载指示。其运行验收引用 [design.md「人和 AI 的交付检查」](design.md#人和-ai-的交付检查)。

## 7. 排版与容量

每个语义档自带字号、行高、字距与字重；当前数值都是预设。控制档独立于内容档，文字层级判据引用 [design.md「强调与内容」](design.md#强调与内容)。

| 内容档 | 字号 / 行高 | 字重 |
|---|---|---|
| `display-xl` | 64/80 | 600 |
| `display-lg` / `display` | 40/48、32/40 | 600 |
| `title` / `chapter` / `heading` | 24/32、20/28、16/24 | 600 |
| `body` | 14/20 | 400 |
| `reading` / `prose` | 16/28 | 400 |
| `support` / `label` | 13/20 | 400 / 500 |
| `caption` / `dense` | 12/20、12/16 | 400 |
| `metric` | 24/28 | 600 |
| `micro` | 11/16 | 500 |

- 行高一律是分的整数倍；字号为预设，相邻内容档至少差约 1.2 倍。字号相差无几时用墨色与字重分层。
- 字距不由字号唯一决定，默认规律不作为硬禁令。当前字重 400/500/600；改主题值须检查真实层级与对比，不能把当前偏好变成普遍要求。
- utilities.css 用 :lang 将中日韩字距设为 normal；当前无 typography 组件负责这件事。排版验收引用 [design.md「强调与内容」](design.md#强调与内容)和[交付检查](design.md#人和-ai-的交付检查)。
- numeric（等宽数字）只用于需要纵向对齐的数：表格列、坐标轴、计数器；单独的大号读数（text-metric）用比例数字。
- 截断、换行、text-balance、text-pretty 按任务选择，不规定单行必截断。Button 当前允许标签换行；后果与空值的判据引用 [design.md「名称与状态」](design.md#名称与状态)及[禁止 NG7](design.md#禁止)，具体容量见基础层 §14、§17。

## 8. 无障碍

- 保留原语的键盘、名称、状态与焦点行为；装饰图标隐藏，纯图标入口有名称。
- 对比规则只引用 [design.md「人和 AI 的交付检查」](design.md#人和-ai-的交付检查)与[基础层 §16「对比底线」](docs/decisions/2026-10-03-foundation.md#16-对比底线)，不在这里重复数值；合成方法见基础层 §5。
- 焦点标准的适用范围、命中目标与项目选择引用[基础层 §15「焦点与命中」](docs/decisions/2026-10-03-foundation.md#15-焦点与命中)及上引交付检查；当前部位机制仍见本规范 §5。
- 图形状态不能仅靠颜色，结合名称、文字、图标和 ARIA 表达真实事实。

## 9. 国际化、方向与三轴

- 内置文案走 useUILocale，新增同时补 src/locale.tsx 与 src/locales/en-US.ts，调用方显式名称优先。
- 优先逻辑方向；箭头定位等有物理方向任务理由的保留。Portal 的语言/方向/密度需按实际容器确认。
- 三轴与紧凑表达的判据引用 [design.md「必须」](design.md#必须)和[「空间与表面」](design.md#空间与表面)。实现入口：ThemeProvider 默认 class、显式 attribute 模式；文档级品牌与 compact 当前接线见基础层 §13。

## 10. 明暗与实现来源

真实组合的验收引用 [design.md「人和 AI 的交付检查」](design.md#人和-ai-的交付检查)，合成与明暗取样按基础层 §16。来源记录与设计推导分开；仍有派生文件时保留分发所需法律声明，不读取归档组件源码来决定值，也不把复制改名当原创。

## 11. 文档与验收

组件文档协议引用 [design.md「可执行的协议」](design.md#可执行的协议)，界面文案引用[「文案」](design.md#文案)；本文只记录组件实现规则。

检查范围与证据状态引用 [design.md「人和 AI 的交付检查」](design.md#人和-ai-的交付检查)，按当前任务影响与用户裁定选择组合；焦点采样方式见本规范 §5。截图只发现变化，不为通过而批量更新。改断言必须逐条说明理由。

生成 ai/style.md 与统一构建由全部并行任务结束后执行，不在本批范围内。

<!-- qingye:translation:en:start source-sha256=12bcd8773074199a154d6a461684a1c9ee2ad175b250462ab2f020ea02472344 -->
# Component Standards

These are implementation rules for `@qingye_lab/ui`. The generator projects them into the distributed `ai/style.en.md`; edit this source rather than generated copies. The design basis is [design.en.md](design.en.md). Current values and classifications are recorded in the [foundation](docs/decisions/2026-10-03-foundation.md), revised through [value adjudication](docs/decisions/2026-10-03-value-adjudication.md). The Chinese source remains authoritative; the generator checks this translation's source hash.

## 0. Requirements, choices, and presets

Design requirements refer to [Required](design.en.md#required), without establishing a second normative copy here. Classify values as derived, constrained, chosen, or preset. One value within a constraint is not automatically a unique derivation; renaming an inherited value cannot turn it into a design requirement. Current dimensions, colors, tracking, shadows, and durations without a unique basis are presets.

Components are rewritten by current layers and roadmap batches. Read completed files in `packages/ui/src/components/` and their execution records for evidence. A changing file count cannot establish acceptance. Archived components are not implementation or design-value sources.

## 1. Structure and API

- One component per `packages/ui/src/components/<name>.tsx` file, named in kebab-case.
- Styleable parts have `data-slot`. Merge external classes last; forward id, ARIA, data attributes, and events.
- `cn()` deduplicates two classes only when their variant and selector strings are identical; different selectors reaching the same element both remain, and stylesheet order decides. Give each property component of an element one source.
- Use Base UI `render`, `useRender`, and `mergeProps` to replace rendered elements. Avoid aliases or an `as` API without a task basis. Current Card is a composition entry without automatic title slots or padding.
- Components based on Base UI export their primitive namespace. Controlled state retains applicable controlled and uncontrolled entries. Assign responsibilities using [Assigning changes](design.en.md#assigning-changes).
- Request facts and outcome inference follow [Names and states](design.en.md#names-and-states). Button currently chooses `idle / waiting / in-progress / unknown / failed`. A boolean loading prop could also respect ownership; the union is a choice rather than a design requirement.
- Danger consequences must be visible and associated. Place a danger Button inside ButtonProtection or reference existing nonblank text through `aria-describedby`. Development throws when neither exists; production does not. Missing runtime `process` is treated as production. ButtonProtection requires visible nonblank consequence text about the current object. Do not duplicate a reliable existing explanation. See foundation §18 and batch 3 D for the missing-runtime check.

## 2. Dimensions

Geometry derives from the module (20px, one line of body text) and the unit (4px); see foundation §1–§2. Components do not write their own dimension values; a new dimension starts from its relationship to the module and unit.

| Grade | Height = module + n units | Narrow | Horizontal space = (height − unit) / 2 | Radius | Icon | Button text |
|---|---|---|---|---|---|---|
| `xs` | 24px | 28px | 10px | 6px | 14px | 12/16 |
| `sm` | 28px | 32px | 12px | 7px | 14px | 13/20 |
| `md` | 32px | 36px | 14px | 8px | 16px | 14/20 |
| `lg` | 36px | 40px | 16px | 8px | 18px | 16/24 |
| `xl` | 40px | 44px | 18px | 8px | 20px | 18/28 |

- Only commands (Button and its derivatives) offer five grades; names follow the grade. Fill controls and markers read role layers (`--qy-fill-*`, `--qy-marker-size`) without a `size` prop; compact density uses `data-density`. Value text always uses the md text profile.
- Distinguish occupied dimensions, usable space inside borders, and touch hit dimensions. A 1px border subtracts 1px from padding to keep the text origin.
- Independent controls below 44px use `touch-target`, which establishes its own positioning context on coarse pointers; check clipping, neighboring overlap, and viewport hits.
- Markers sit centered in their label line (`--qy-marker-inset`); Switch reads `--qy-switch-size`.

## 3. Surfaces and boundaries

Task criteria come from [Space and surfaces](design.en.md#space-and-surfaces) and [Removal](design.en.md#tests-of-judgment). Foundation §5 and §6 describe the selected identification mechanisms.

| Current Button variant | Boundary mechanism | Focus mechanism |
|---|---|---|
| `solid` | Fill; no default border or external shadow | 2px contrasting line inside the fill |
| `bordered` | White surface in light mode with a boundary line; card surface in dark mode | Change the existing 1px border's color |
| `quiet` | Transparent by default; content identifies the entry | 1px line inside its own box |

These three variants are current choices, not fixed importance levels; tone is independent. The user's rule to retain borders when a surface matches its background motivates bordered, without adding lines to entries already distinguished by fill.

Neutral bordered reads `--qy-border-input` through `--qy-button-bordered-border`, and `--qy-ring` through `--qy-button-bordered-border-focus`. Both appearances use the ink ladder's heavy step (50%): black in light mode and white in dark mode. Danger bordered locally mixes danger text at 50%, with opaque danger text for focus.

- Use semantic surface roles rather than hard-coded gray. Surface/raised currently use white in light mode and opaque color mixes in dark mode. Surface-inset, lines, and feedback layers are translucent; measure their actual compositions.
- Input currently has a 1px shared outer boundary and a transparent inner input; dark mode reads the inset surface. Current Card/Popover each have a 1px container boundary. This records implementation rather than requiring a line in every context.
- Judge highlights and shadows with the removal test. Current solid Button and Card have no default external shadow. Removing Card's shadow-panel is a reversible default choice; an unproven independent purpose does not forbid shadows in every project. Popover/Tooltip consume shadow-raised and Dialog/Drawer shadow-overlay. All parameters are presets; consuming a role does not establish necessity in every composition.
- Necessary boundary contrast refers to foundation §16. No library contract reads parent backgrounds or adds borders automatically. The G9 project declaration protocol is undecided; proposals are not current APIs.

## 4. Radii

Square for work, round for points (foundation §4). Independent controls use r = min(height / 4, 2 units); only points and identities (status dots, avatars, radio marks, slider thumbs) are round.

| Class / role | Value | Relationship |
|---|---|---|
| `rounded-xs` / `rounded-sm` | 6 / 7px | height / 4 |
| `rounded-control` | 8px | 2 units |
| `rounded-overlay` | 12px | control radius + overlay inset |
| `--qy-radius-overlay-item` | 8px | overlay radius − inset |
| `rounded-panel` | 12px | same carrying surface as overlays |
| `rounded-marker` | 4px | marker edge / 4 |
| `rounded-item` | 6px | same as the smallest control |

Use `inner radius = max(0, outer radius − inset)` only for an equal inset of the same contour; negatives become square. Independent child objects such as a Button inside a Card keep their own role.

## 5. States and focus

Ownership and simultaneous states follow [Names and states](design.en.md#names-and-states). This table records current part implementations.

| State | Current expression and classification |
|---|---|
| hover / pressed | solid fill `/90` is an inherited preset; bordered/quiet use accent or danger-soft without layout changes. qy-pressable's 0.97 scale is a preset |
| focus-visible | No additional outer ring. Input, focusable Card, Popover panel, and bordered Button change existing border color without thickness changes. solid uses an internal 2px line; quiet an internal 1px line |
| disabled | Native/ARIA semantics and event guards apply independently. Current opacity-64 is an inherited preset rather than a substitute for actual disabled behavior |
| invalid | Caller-declared facts. Input retains aria-invalid and an error border, changing to danger text color on focus at the same 1px width without an added inner ring |
| waiting / in-progress / unknown / failed | Button expresses supplied facts and retains the action name. Busy and unknown block repeated activation without inferring success or retry |
| selected / open | Consume actual primitive data states; preserve semantics when changing appearance |

Foundation §15 records focus values: `--qy-focus-ring-width` currently chooses 2px and `--qy-focus-quiet-width` 1px. Input's clear/password adjunct buttons and bare Popover entries currently use 2px internal lines, rather than quiet Button's 1px. Popover panel actually receives focus; review observed focus-visible after opening with Enter, and its border only changes color.

In forced colors, systems remove box shadows. `styles.css` restores CSS outline with width and inward offset reading local `--qy-focus-ring-width`: 2px by default and 1px for quiet. System colors take over; `!important` overrides utilities-layer outline-none. Widths are choices rather than AA minimums. The full forced-color composition matrix remains UNVERIFIED.

Test focus-visible through actual `keyboard.press("Tab")`, wait at least 500ms for transitions, then read computed values. Dimensions must remain unchanged, the signal visible, and the outline internal. Static styles and a candidate coverage page are not runtime acceptance.

## 6. Motion

- Actual changes, interruption, and continuity follow [Change and recovery](design.en.md#change-and-recovery) and ban NG6.
- Durations and curves are presets. Current press is 100ms, fast 140ms, feedback 180ms, base 220ms, slow 320ms, drawer 450ms. Consume roles instead of another inline value for the same purpose; see foundation §12.
- motion.css owns Popover/Tooltip entry and exit. Components provide structure, trigger position, and slots. Initial scale 0.98 and opacity 0 are inherited presets whose migration into a shared file does not change provenance. Entry at 140ms and exit at 100ms are policy choices.
- Toast retains local entry/exit and stacking; theme.css also contains success/error animations. These values are presets. This source does not claim complete motion consolidation across retained components.
- MotionProvider records input method and switches instantly for keyboard. Reduced motion removes translation and scale while retaining readable color, opacity, and loading indications. Runtime acceptance follows [Delivery checks](design.en.md#delivery-checks-for-people-and-ai).

## 7. Typography and capacity

Each semantic profile includes font size, line height, tracking, and weight; current values are presets. Control profiles are separate from content profiles. Hierarchy follows [Emphasis and content](design.en.md#emphasis-and-content).

| Content profile | Size / line height | Weight |
|---|---|---|
| `display-xl` | 64/80 | 600 |
| `display-lg` / `display` | 40/48, 32/40 | 600 |
| `title` / `chapter` / `heading` | 24/32, 20/28, 16/24 | 600 |
| `body` | 14/20 | 400 |
| `reading` / `prose` | 16/28 | 400 |
| `support` / `label` | 13/20 | 400 / 500 |
| `caption` / `dense` | 12/20, 12/16 | 400 |
| `metric` | 24/28 | 600 |
| `micro` | 11/16 | 500 |

- Every line height is a whole number of units; sizes are presets, with adjacent content profiles at least about 1.2× apart. When sizes are close, ink tone and weight carry the hierarchy.
- Font size does not uniquely determine tracking; the default pattern is not a hard ban. Current weights are 400/500/600. Theme changes require actual hierarchy and contrast checks rather than making a preference universal.
- utilities.css uses :lang to set Chinese/Japanese/Korean tracking to normal. The source records no typography-component ownership of this rule. Check typography with Emphasis and content and Delivery checks.
- numeric (tabular figures) serves numbers that align vertically: table columns, axes, counters. Standalone large readouts (text-metric) use proportional figures.
- Choose truncation, wrapping, text-balance, and text-pretty for the task. Single-line truncation is not mandatory. Button currently permits wrapping. Consequences and empty values follow Names and states and NG7; see foundation §14 and §17 for capacity.

## 8. Accessibility

- Preserve primitive keyboard, naming, state, and focus behavior. Hide decorative icons and name icon-only entries.
- Contrast follows [Delivery checks](design.en.md#delivery-checks-for-people-and-ai) and foundation §16 without copying its numbers here. Composition is described in foundation §5.
- Applicable focus criteria, hit targets, and project choices refer to foundation §15 and Delivery checks. Current mechanisms are in §5 above.
- Graphics must express states through names, text, icons, and ARIA as well as color.

## 9. Internationalization, direction, and theme axes

- Built-in strings use useUILocale; add keys to both src/locale.tsx and src/locales/en-US.ts. Caller-supplied explicit names take precedence.
- Prefer logical directions. Keep physical direction where its task requires it, such as arrow positioning. Check actual Portal language, direction, and density containers.
- Independent axes and compact presentation follow Required and Space and surfaces. ThemeProvider defaults to class with an explicit attribute mode. Current document-level brand and compact wiring are in foundation §13.

## 10. Appearance and implementation provenance

Accept actual combinations through Delivery checks; composition and light/dark sampling follow foundation §16. Provenance and design derivation are separate. Retain legally required notices for distributed derived files. Never read archived component source to decide values or call renamed copies original work.

## 11. Documentation and acceptance

Component documentation follows [Executable protocols](design.en.md#executable-protocols); interface copy follows [Copy](design.en.md#copy). These standards record implementation rules only.

Select checks and combinations by current task impact and user decisions, using Delivery checks for evidence statuses and §5 above for focus sampling. Screenshots reveal changes; do not update them in bulk to pass. Explain every changed assertion.

Generating AI style resources and the unified build follows completion of parallel tasks; it is outside an individual component batch.
<!-- qingye:translation:en:end -->

