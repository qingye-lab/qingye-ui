# 组件库优化调整方案（2026-10-12）

## Status

Approved（2026-10-12）。用户裁决：「需要裁决都按照你的意见实施」——第六节五项全部按推荐执行（轨道选中态取甲；Stat 大号取 32；#4、#16、#17 不采纳；第 4 批纳入 Base UI 升级与强制颜色取证，Browser Mode 试点后置）。同一条消息追加了第八节的任务，并指定由子代理实施、主 agent 下发与审核。

输入有三项：

- 使用方清单 `demo/qingye/docs/ui-component-issues-2026-10-12-design.md`（#9–#23）与前序清单遗留的 #4、#8。
- 本仓库现状：`main` @ `a0753db`（v2.0.0），工作区干净；逐条对照 `packages/ui/src` 核实。
- 外部做法与近期趋势：三路调研（图表、控件与展示、趋势），主 agent 抽查了 Base UI 发布页、web.dev Baseline 公告、Carbon ContentSwitcher 样式页与 shadcn Toggle 源码四处一手来源。未能取到的来源列在文末。

外部做法只用来定接口与职责怎么分；取值仍只依据 `design.md`，取不到依据的标为预设。

## 一、结论

清单 17 条（#9–#23 加遗留的 #4、#8）里，13 条采纳（其中 #9、#11、#12、#20、#21、#22 六条改了形），3 条不采纳（#4、#16、#17），1 条此前已解决（#8）。它们集中在数据面（读数、图表、行与区块），收敛后是四件事：

1. **读数轨道一族补齐**：Meter、Progress、Proportion 共用一条轨道，增加「分格」与「只出轨道」两种摆法，#11、#15、#20 不新增组件。
2. **选中态不再借用主操作的填充**：#10 的根因是分段控件、切换组的选中段直接用 `solid`（`--qy-primary`），品牌一覆写就和主按钮同色同重。给轨道选中一个自己的角色 token。
3. **图表补「参照」与「主次」**：目标带、参照线、背景系列、事件、纵轴范围、状态色系列；Sparkline 与 Heatmap 用同一套词。
4. **行与区块**：Stat 尺寸档、Item 行内操作的显隐、不带边框的 Section。

清单之外，调研带出 5 项值得做的调整（第四节），其中两项是现有缺陷。

## 二、现状核实

| 清单说法 | 核实结果 | 证据 |
|---|---|---|
| #9 Sparkline「没有末端点」 | **不成立**。已画当前点（半径 2.5，外加一圈纸色） | `sparkline.tsx:89` |
| #9 没有参考区间、语义色 | 成立 | `SparklineProps` 只有 6 项 |
| #10 选中段固定 solid | 成立；另：单独的 Toggle 按下也是 solid | `segmented-control.tsx:38`、`toggle-group.tsx:40`、`toggle.tsx:24` |
| #10「Tabs 同轨道」 | **不成立**。Tabs 自 2026-10-07 起用导航线，不在轨道里 | `tabs.tsx`、`nav-line.ts` |
| #17 图表入场「未核实」 | 不提供，且是有意为之 | `chart.tsx:60` 注释；全部 `isAnimationActive={false}` |
| #19 系列能否指定语义色「未核实」 | 不能。颜色按序号固定取 `--qy-chart-1…5`，`ChartSeries` 只有 `key`、`label` | `chart.tsx:15`、`:281` |
| #22 纵轴范围与末端标记「未核实」 | 都不能。纵轴恒含 0；折线每个点都画标记 | `chart.tsx:216`、`:237` |
| #8 Toast 文本出现两份 | 是 Base UI 给高优先级通知放的视觉隐藏播报副本，只在 `priority: "high"` 时出现；2.0.0 的文档已写明 | `apps/docs/src/content/toast/meta.ts:22`；Base UI `ToastViewport.tsx` |

核实中另发现两处缺陷（清单没提）：

- **Heatmap 的可访问名称会读成 `[object Object]`**：`formatValue` 的返回类型是 `ReactNode`，却被 `String()` 拼进格子的 `aria-label`（`heatmap.tsx:90`）。#18 要的「读数里放温度、湿度和偏离」正好会踩到。
- **Heatmap 每个格子都是一个 Tab 停靠点**（`tabIndex={0}`，`heatmap.tsx:91`）。12 间蚕室 × 24 小时是 288 次 Tab 才能离开这张图。

还有一处与 #10 同源的事实：`--qy-primary` 现在被 12 个文件消费（Button、Calendar、Checkbox、Radio、Switch、Slider、Progress、Meter、Steps、Tree、ToggleGroup，SegmentedControl 与 Toggle 经 `buttonVariants` 间接消费）。`semantic.css:22` 写的是「品牌……用法如一方印，少而明确」，实际品牌一覆写会同时改这十几处。

## 三、逐条处置

Tone 一词全库统一为 `"danger" | "warning" | "success" | "info"`，与 Badge 的 `tone` 同一组值；由应用声明，组件不从数值猜好坏（随类赋彩）。

### A. 读数轨道一族（#11、#15、#20）

| # | 处置 | 做法 | 依据 |
|---|---|---|---|
| 15 | 采纳 | `ProgressTrack`、`MeterTrack` 增加 `segments={n}`：同一条轨道按 n 格分开，格间留纸色空隙。用遮罩切出空隙，不需要知道承载面的颜色（基础层 G9）。要求 `(max − min)` 能被 n 整除，否则抛错。阶段名由 `getAriaValueText` 给出（「四龄，第 4 / 7 阶段」） | 同一种读数轨道只有一种几何（§9）；Mantine、Primer 的分段进度都是 Progress 的变体，带标题的步骤才是 Steps |
| 11 | 改形采纳：不给 StatusDot 加 `level` | 级别是「几级里的第几级」，是一个量，用 `Meter` + `MeterTrack segments={3}`；`MeterIndicator` 增加 `tone`。文档补一个「级别」演示 | 状态与程度是两个事实，StatusDot 只说状态（功能纯粹，2026-10-10）；格数本身表达级别，去掉色相仍读得出（灰度检验）。Carbon 把优先级定为「形 + 色 + 文字」的模式，没有库把它做进状态点 |
| 20 | 改形采纳：不给 Stat 加插槽 | `Proportion` 增加 `legend="hidden"`：图例只对读屏保留，画面上只剩轨道；`items[].tone` 可选。Stat 里直接放在 `StatDescription` 的位置，是组合，不是新接口 | 调研没有找到可照搬的做法：Tremor CategoryBar 隐藏标签后没有任何文字替代，是反例。本库的图例本来就是完整的文字等价物，隐藏时保留给读屏即可 |

设计稿的 3px 细条不单独开一档：轨道高是家族共用的 `--qy-readout-track-size`（8px，预设），项目可以在局部覆写这个变量。

### B. 选中态（#10、#4）

| # | 处置 | 做法 | 依据 |
|---|---|---|---|
| 10 | 采纳，**默认值需裁决** | 新增角色 token `--qy-track-selected`、`--qy-track-selected-foreground`。角色：轨道内选中段与按下的 Toggle 的面与字；消费部位：`SegmentedControlItem`、`ToggleGroupItem`、`Toggle`；修改入口：`tokens/semantic.css`。三处不再读 `--qy-primary` | 筛选不是一个视图里的君（§10）；品牌如一方印。调研到的系统里，选中段是中性的浮起块或淡底：Mantine、Radix Themes、Primer `subtle`、Carbon 低对比档、shadcn Toggle（`bg-accent`）；只有 Carbon 高对比档用反色实底，没有一家用品牌色 |
| 4 | 不采纳 | Button 不加 `subtle` 变体，也不加按下态。按下是 Toggle 的本职 | 三档变体按「边界由谁承担」区分（填充、线、无），再加一档浅底就有两个中间选项要选。使用方 2.0 复核写的是「维持 secondary → bordered」，没有做不成的事；原始诉求「筛选切换」由 #10 解决。soft / tonal 在多品牌工具箱里是常见第四档（Radix、Mantine、Chakra、Ant），但名字都不一致，说明它不是稳定的语义 |

**#10 的默认值，两个选项：**

- **甲（推荐）**：选中段 = 淡染（12%）+ 焦墨字，未选段的字降为浓墨。这与 §11「当前位置用淡染」是同一条规则，也就是清单要的「淡墨底 + 焦墨字」。代价：这是 SegmentedControl、ToggleGroup、Toggle 三个组件的**视觉基线变化**；淡染对纸约 1.3:1（估算，未实测），选中这个状态在 WCAG 1.4.11 下只靠面不够 3:1，要靠字的墨色差一起承担，需实测后如实记录。
- **乙**：默认值保持焦墨实底（默认主题外观不变），只是不再跟随品牌。品牌项目里选中段从品牌色回到墨色；想要安静形态的项目自己改这两个 token。

两者都解决「套上品牌蓝后压过主操作」。甲再往前一步，连默认主题里「选中段与主按钮同重」也一并解决。

### C. 图表（#9、#14、#17、#18、#19、#22）

| # | 处置 | 做法 | 依据 |
|---|---|---|---|
| 9 | 采纳（去掉 `marker`） | `Sparkline` 增加 `band={{ from, to, label }}` 与 `tone`。纵向范围把目标带算进去；可访问摘要补上目标与当前值的位置（高于、低于、在内），这是组件算得出的事实。末端点已有 | 目标带用墨（清染），数据才用色。调研：没有库在 Sparkline 上提供 band，只有 MUI X 有按阈值变色，且是付费功能 |
| 14 | 采纳，拆成四项 | ① `references`：`{ kind: "band", from, to, label }` 或 `{ kind: "line", value, label }`，量轴方向，画成墨；纵轴范围自动把它算进去。② `series[].context: true`：背景系列，淡墨细线、不画标记、不占 1–5 的身份色名额，图例里合成一项。③ `events`：`{ rowId, label, tone? }`，落在类别轴上，同时进数据表。④ 有目标带时读数自动多一行「高于目标 3.9」，不加接口 | 参照线、带、点在 Recharts、Mantine、MUI、Grafana 里都是一等公民。主次系列各家靠调用方自由配色；本库的取色次序是色觉安全的机制，不开放自由配色，所以用一个语义标记代替。Recharts 的参照带默认越界即丢弃，必须显式并入范围 |
| 22 | 采纳，各限一种图形 | `valueDomain={[min, max]}` 只对 `line` 生效；柱与面积传入即抛错。标记不加接口：点距小于两个标记宽时只画每个系列的末端点，形状照旧 | 位置编码可以不从零起，长度与面积编码不行（§7「柱与面积从零长出来」）。Datawrapper 同样禁止柱状图截断、允许折线。设计稿的「在线率 80%–100% 面积图」应改成折线 |
| 19 | 采纳，带门禁 | `series[].tone`；一张图里要么全部系列声明 tone，要么都不声明，混用抛错 | 危险、警示是允许的彩色类别（NG10）。调研没有找到任何图表库提供受限的状态色枚举，都是自由颜色。门禁：红、黄、蓝并排的堆叠柱须过 dataviz 校验（相邻色盲 ΔE、明度台阶、对承载面 3:1），不过就调整图内状态色，不放行 |
| 18 | 采纳，拆成四项 | ① `levels`：`[{ label }, { from, label, tone }, …]`，分档上色，图例由渐变条改为分档；档名进格子的可访问名称。② `rowSummary={{ label, value(row) }}`：行尾一列，同时进数据表。③ `renderReadout(cell)`：悬停读数的内容插槽。④ 修上节两处缺陷：名称只用字符串结果，方向键在格子间移动、整张图一个 Tab 停靠点 | 分档色阶在 MUI、ECharts 里是色彩映射的一层，不是另一个组件。行尾汇总没有库提供，但它必须和行对齐，只能在组件里。MUI X 已为热力图加键盘导航 |
| 17 | 不采纳 | 不做入场描线，不做呼吸的末端点。「实时」用文字或 StatusDot 加时间表达 | 动只交代真实变化（§12、NG6）；循环动效全库只有两处，都表示「进行中、比例未知」。面向工作台的 Tremor 同样写死关闭动画；ONS 指南认为动画妨碍比较；超过 5 秒的自动循环受 WCAG 2.2.2 约束，需要暂停入口 |

### D. 行与区块（#12、#21、#13、#23、#16）

| # | 处置 | 做法 | 依据 |
|---|---|---|---|
| 12、21 | 改形采纳 | `Stat` 增加 `size="md" \| "lg"`。lg = 32/40，不是 36 | 字号须在文字档里（§19 检查项）；现有档是 24、32、40，相邻至少差 1.2 倍。28 与 36 都要新开一档。调研：只有 Chakra 给 Stat 分尺寸，Ant 走 token；Maersk 的指南要求同一面板的大数字同一字号 |
| 13 | 采纳 | `ItemActions` 增加 `reveal="hover"` 与 `resting`（平时显示的内容，如时间）。两者叠在同一格，宽度取较宽者，行不跳。隐藏用不透明度，不用 `display`，按钮始终在 Tab 顺序与读屏里。行悬停、行内有焦点、行内有菜单打开时显示；没有悬停能力的设备上两者都显示 | 反馈不改变布局（§11）；触摸时可以改变可见入口，不能改变任务（按情境）。调研的共识：悬停显现只用于次要动作，并且必须在焦点与触摸下同样可达。文档写明：行的主要动作不能藏 |
| 23 | 采纳 | `Section`、`SectionHeader`、`SectionTitle`、`SectionActions`。区块由标题命名（自动接 `aria-labelledby`）；标题行高一个小号控件，右侧操作与标题同一条中线（与 `ChartHeader` 同一规则）；计数是标题里的一段浓墨数字，不另设部件。标题用 `heading` 档（16/24），不是 15px。Section 自己不画线，区块之间用节间距，需要线时放已有的 `Separator` | NG4；疏密检验（去掉线，分组仍读得出）。调研：没有库以这个名字提供带标题的无边框区块，最接近的是 Primer `PageHeader` 的 `hasBorder` 与 Polaris 的 `s-section` |
| 16 | 不采纳 | 侧栏当前项维持「面 + 一段焦墨线」 | 同一平面不加阴影（§6、NG12）；面、线、阴影三种机制不叠加（NG11）；2026-10-07 已为同一理由去掉选中段的阴影。有文档可查的系统（shadcn、Primer）都是平的淡底加字重或指示线，没有找到浮起纸片的做法。清单自己也标为可选 |
| 8 | 已解决 | 无 | 见第二节 |

### 使用方「项目 token」表的库侧答复

- **品牌色的深色取值**：`docs/decisions/theme-axes.md` 的片段本来就是浅、深各一组；项目照此补一组即可，库不需要改。
- **13px 正文**：`data-density="compact"` 只收几何，不缩文字（`design.md`「屋有大小，人无大小」）。按库的规则落地是 14px。

## 四、清单之外

按价值与代价排序。前两项是缺陷，建议随第一批修。

| 项 | 现状 | 调整 | 来源 |
|---|---|---|---|
| Heatmap 名称与键盘 | 见第二节 | 已并入 #18 | 本次核实 |
| 强制颜色与高对比偏好 | 全库只有 1 个文件处理 `forced-colors`，没有 `prefers-contrast`。本库的规则是「填充已划出范围就不描边」，而强制颜色模式会抹掉背景色：实心按钮、选中段、进度条、热力图格子的范围都靠填充 | 逐个核对这些部位在强制颜色下是否还看得出范围，缺的用系统色补线。先取证再定范围 | 趋势调研；UNVERIFIED，尚未在浏览器里看过 |
| Base UI 1.7.0 → 1.9.0 | 锁在 1.7.0（2026-08-04） | 升级。1.8、1.9 没有列出破坏性变更；有 Combobox、Menu、Select 大列表的挂载性能改进，Drawer 滑动手势改进 | Base UI 发布页（已抽查） |
| 浏览器内的断言 | `packages/ui` 的测试是 jsdom 且 `css: false`，看不到 computed 值；视觉事实靠自写脚本 | 用 Vitest 4 的 Browser Mode（已稳定，仓库已在 4.0.16）给本方案新增的几何写 computed 值断言，先只覆盖读数轨道与轨道选中态，作为试点 | Vitest 4 发布说明 |
| 图表键盘导航 | 图形整体 `aria-hidden`，等价物是按需展开的数据表 | 暂不改。Recharts 3 与 MUI X v9 都把键盘导航设为默认，但调研的库里没有一家提供数据表等价物；本库现有做法的信息更完整。列为观察项 | 图表调研 |

**不建议现在做的：**

| 项 | 理由 |
|---|---|
| AI 对话组件（消息、输入框、推理、引用） | shadcn、Vercel、Ant Design X、MUI 都在发，但使用方是工作台，没有这类任务；没有任务依据不加组件 |
| Tour、TreeSelect、Cascader、Scheduler、Marquee | 同上；Marquee 还与 2026-10-07 删除 Carousel 的理由相同 |
| MCP 服务 | 包内已有 `llms.txt`、`catalog.json`、registry 与 `ai/SKILL.md`，覆盖了正在形成的约定里除 MCP 外的全部。各家 MCP 的工具只有列表、属性、示例、搜索四类，且多标为实验或预览 |
| DTCG 2025.10 格式的 token JSON | 规范已出第一个稳定版（2025-10-28），从 `token-ledger.json` 生成的代价不高；但只有在接 Figma 等工具时才有用。有这个需求时再做 |
| 锚点定位、`popover=hint`、`interestfor` | 锚点定位已进 Baseline（2026-01），但浮层定位由 Base UI 承担，换掉它没有可见收益；后两者仍只有部分浏览器支持 |
| Liquid Glass 式半透明、Material 3 Expressive | 与「绘事后素」相反；Liquid Glass 发布后因对比度不足被迫回调 |

使用方 `packages/ui-kit` 里还有几个自己写的东西，本次没有逐一查用途，留到下一轮核对：`Sheet`（在 Dialog 上自建，而库有 Drawer）、`Spinner`（库有意不提供独立的等待标记）、`Disclosure`（直接用 Base UI 原语，而库有 Collapsible）、把 `MenuPortal / MenuPositioner / MenuPopup` 三层包成一个 `DropdownMenuContent`。

## 五、执行顺序

每一批做完，先在预览页给用户看效果，再进下一批。

| 批 | 内容 | 性质 |
|---|---|---|
| 1 | Heatmap 两处缺陷；`Stat size`；`Section`；`ItemActions reveal`；`Proportion legend / tone`；轨道 `segments` 与 `Meter tone`；`Sparkline band / tone` | 纯新增与修缺陷，默认外观不变 |
| 2 | 轨道选中态的角色 token（按裁决取默认值） | 甲：三个组件的视觉基线变化，发布说明单列；乙：仅品牌项目可见 |
| 3 | Chart 的 `references`、`context`、`events`、`valueDomain`、末端标记规则、`series[].tone`；Heatmap 的 `levels`、`rowSummary`、`renderReadout` | 纯新增；`tone` 进图须先过配色校验 |
| 4 | Base UI 升级；强制颜色取证与修补；Browser Mode 试点 | 基础设施 |

接口上没有破坏性变更（Heatmap 的 `formatValue` 仍接受节点，只是名称改用字符串结果），可以作为 2.1.0。

分工：取值、画法与验收由主 agent 做；演示、文档元数据与行为测试可按互不重叠的文件边界交给子代理。每批的验收：受影响的测试文件、`typecheck`、`gen:index` 与 `gen:catalog`、重生成能力清单与 token 台账、对应 playground 的 `audit.mjs` 与 `align-audit.mjs`、新增 token 的 computed 值与对比度实测。不新增只断言类名的测试。

## 六、需要裁决

| # | 问题 | 推荐 |
|---|---|---|
| 1 | 轨道选中态的默认值：甲（淡染 + 焦墨字）还是乙（保持焦墨实底，只是不随品牌） | 甲。两种我都可以先在预览页并排做出来再定 |
| 2 | Stat 的大号用 32（现有档）还是为它新开 36 | 32 |
| 3 | #16 侧栏浮起、#17 图表入场与呼吸点：按不采纳处理 | 不采纳 |
| 4 | #4 Button 浅底变体：按不采纳处理 | 不采纳；出现 bordered 做不成的真实场景时再议 |
| 5 | 第 4 批是否纳入本轮 | 纳入 Base UI 升级与强制颜色取证；Browser Mode 试点可后置 |

## 七、未验证

- 调研没有取到的来源：Apple HIG、Material 3 官方页（分段按钮的 tonal 填充只凭记忆）、Linear、PagerDuty、Datadog、Polaris React、Atlassian 新版按钮与侧栏、Vercel Geist、visx。涉及它们的判断没有写进依据。
- MUI 参照线页面、ECharts `markArea` 与 `visualMap` 页面取回失败，相关属性名未核对。
- 淡染对纸 1.3:1 是估算；强制颜色下的表现没有看过；状态色堆叠的色觉校验没有跑过。三项都要在实施时实测。
- 遮罩切格在目标浏览器上的渲染、Base UI 的 Progress / Meter 部件状态里是否带当前值，实施时核对。

## 八、对照 shadcn 图表页（2026-10-12 追加）

用户问：<https://ui.shadcn.com/charts/area> 上有那么多图，本库为什么少很多。

**事实**：shadcn 的图表页是 70 个可复制的示例，不是 70 个组件。它们来自 shadcn 仓库的 `apps/v4/registry/new-york-v4/charts` 目录（已取到文件清单）：面积 10、柱 10、折线 10、饼 11、雷达 14、径向 6、提示 9。组件只有一个 `Chart`（容器、提示、图例），其余是 Recharts 六种图形的不同配置。本库是一个 `Chart`（7 种 type）加 ScatterChart、Heatmap、Sparkline、Proportion，图形由任务选定，不提供按外观区分的配置。

按「它解决什么读图任务」逐类对照：

| shadcn 示例 | 任务 | 本库 | 处置 |
|---|---|---|---|
| area / line 的 step | 值在两次变化之间保持不变（设定值、状态、阈值、库存）。用直线连接等于编造中间值 | 无 | **补**：`series[].interpolation: "linear" \| "step"` |
| area 的 stacked-expand | 构成的占比随时间或类别怎样变（各部分加总恒为 100%） | 只有绝对量的堆叠 | **补**：`type: "bar-share" \| "area-share"` |
| bar / line 的 label | 柱少而要读准确值时，把数直接标在柱上，省去在轴上找刻度 | 无 | **补**（只给柱）：`valueLabels`；标了值就不再画量轴刻度与网格（NG1） |
| tooltip 的 advanced（带合计） | 堆叠图读的是加总，读数应给出合计 | 读数只列各部分 | **补**：堆叠类的读数与数据表加合计，不加接口 |
| pie 的 label / legend | 部分的名称与数值挨着图读 | 环形图图例只有名称 | **补**：环形图图例带数值与占比，与 Proportion 的图例同一写法，不加接口 |
| area / bar / line / pie 的 interactive | 切换时间范围或指标 | 无专门能力 | **不加接口，加一个组合演示**：SegmentedControl 加 Chart，范围是应用的状态 |
| area 的 default、line 的 default（平滑曲线） | 无；曲线在两点之间画出数据里没有的值 | 直线 | 不补（名实相符） |
| area 的 gradient | 无 | 淡面 | 不补（NG12） |
| bar 的 mixed、line 的 dots-colors（每根柱或每个点一种颜色） | 无；颜色没有对应的类别 | 无 | 不补（NG10） |
| bar 的 active | 标出当前这一类（今天、选中项） | 无 | 暂不补：没有使用方的需求；真要标时间点可用本轮新增的 `events` |
| bar 的 negative | 正负值 | 已支持（数据端圆角跟随正负） | 已有 |
| bar 的 horizontal、multiple、stacked；area 的 stacked、legend、axes；line 的 multiple、dots | — | 已有 | 已有 |
| pie（11 个里除环形以外的） | 一眼占比 | 环形图（2–5 部分）与 Proportion | 不补饼图：角度比长度难比，2026-10-07 盘点时已裁定 |
| radial（6） | 单值进度或计量的环 | Meter、Progress | 不补：2026-10-07 以同一理由删除了 ProgressCircle |
| radar（14） | 一个或几个对象在多个维度上的轮廓 | 无 | 不补，见下 |
| tooltip 的 indicator、label、formatter 变体 | 外观配置 | 一种读数画法；`formatValue` 已可格式化 | 不补（NG3） |

**雷达图不补的理由**：它用折线把互不相关的类别连起来，暗示了不存在的连续；多个对象叠放时互相遮挡；各维度单位不同时必须先归一化，读者读到的形状取决于维度的排列顺序。数据可视化界的主流意见是用分组条形图或共用刻度的小图阵列代替（Observable《Avoid radar charts》、Scott Logic 的评述、Significance 杂志的替代方案一文）。本库的横向条形图与多个 Chart 并排（本轮新增的 `valueDomain` 可让折线小图共用刻度）已覆盖这个任务。若以后出现「同一刻度的评分轮廓」这种真实需求，再单独评估。

**是否使用 /design 技能**：没有使用。新增的五项都是在既有图表法度（基础层 §7）之内的扩展，取值与画法能从现有规则推出；审核时用实测与截图判断。

这五项加一个组合演示作为第 3 批的后半（子代理「Chart-B」），在 Chart 的参照与主次改动落地之后进行——两者改同一个文件，不并行。

## 九、借鉴优秀组件库与近期趋势的适配性改造（2026-10-12 追加）

用户指出第四节只列了五行、其余多是「不建议做」，没有成形的改造计划。为此做了三路只读调研，原文保存在 `docs/plans/2026-10-12-benchmark/`：

- `forms.md`：表单、输入、日期时间 33 个组件，对标 Base UI 1.9、React Aria、Ark、Mantine 9、Ant、MUI、Carbon、shadcn 等。
- `overlays-nav-data.md`：浮层、导航、反馈、数据展示、布局 50 多个组件。
- `platform-trends.md`：库整体——CSS 平台能力、React 19 与框架、分发与工程、WCAG 2.2、主题与 token、给 AI 的接口、文档站。

外部做法只用来判断接口与职责怎么分，取值仍只依据 `design.md`。调研里的缺陷多数只凭源码推断，标了 UNVERIFIED；实施子代理须先在浏览器里复现再改，复现不了的如实交回。

### 9.1 先修的缺陷

| # | 缺陷 | 位置 | 处置 |
|---|---|---|---|
| 1 | Field 里放多个 Radio、SegmentedControlItem、Checkbox 时各项拿到同一个 `id`（主 agent 已在浏览器里确认 SegmentedControl 一处） | `segmented-control.tsx`、`radio-group.tsx`、`checkbox.tsx`、`switch.tsx`、`field.tsx` | 这些控件在 Field 内各自建立标签作用域，不加接口 |
| 2 | 全库没有接 Base UI 的 `DirectionProvider`，`UILocale` 不带书写方向；RTL 下浮层类组件的行为没有保障 | `locale.tsx` | `UILocale` 带 `dir`，Provider 内接方向 |
| 3 | Calendar 的语言只在中文与英文之间二选一；其余语言得到英文月名与美式周起始日 | `calendar.tsx:46` | 月名、星期名与周起始日由区域推出 |
| 4 | 侧栏窄轨的弹层写死物理右侧，且丢了传入属性 | `sidebar.tsx:137、177` | 改逻辑方向，转发属性 |
| 5 | 表格容器恒为一个 Tab 停靠点 | `table.tsx:32` | 只在真的可横向滚动时可聚焦 |
| 6 | Toast 视口 `aria-live="off"` 加逐条 `role="status"`，可能让新通知不被读出 | `toast.tsx:87、124` | 先核实可访问树，再定 |
| 7 | Tree 的 ARIA 结构与只认首字符的键入搜索 | `tree.tsx:122、131` | 先复现 |
| 8 | Popover 触发器的焦点画法与 Button 自带的叠加 | `popover.tsx:28` | 先复现 |
| 9 | 虚拟列表每次渲染 O(n) | `virtual-list.tsx` | 累计偏移加二分 |
| 10 | 验证码粘贴 `123 456`、`123-456` 被整次拒绝；RTL 下分段顺序；触屏无法长按粘贴 | `otp-field.tsx` | `normalizeValue`；分段固定 `dir="ltr"`；其余先复现 |
| 11 | TagInput 的 `required` 落在草稿输入上；未确认的草稿提交时静默丢失 | `tag-input.tsx` | 修 |
| 12 | 日期输入键入第 5 位年份时整个字段被清空 | `date-picker.tsx`、`calendar.tsx:28` | 修 |
| 13 | 外层 fieldset 动态禁用时，日期三件套与 FileUpload 不同步 | `input-facts.ts` 等 | 修 |
| 14 | 拖入文件夹产生伪文件条目 | `file-upload.tsx:173` | 修 |
| 15 | 只读的日期范围显示框可聚焦但键盘打不开 | `date-range-picker.tsx:66` | 修 |
| 16 | 字数演示逐键播报；按 UTF-16 码元计数 | `input/demos/05-character-count.tsx` | 修演示 |
| 17 | 年月下拉没有样式 | `calendar.tsx:49` | 补样式 |
| 18 | `styles.css` 头注释是旧包名；`exports` 没有 `default`；发布包带两份历史 `ai/` 目录；没有 `declarationMap` | 包配置 | 修 |
| 19 | ThemeProvider 不支持严格 CSP（没有 nonce） | `theme-provider.tsx` | 加 `nonce` |

### 9.2 采纳的能力（纯新增，默认行为不变）

| 项 | 接口 | 谁有 | 服务的任务 |
|---|---|---|---|
| 日期三件套补值模型 | `defaultValue`；同源的 `min` / `max`（一处声明，同时约束键入与日历） | React Aria、Ark、Ant、Mantine | 非受控表单；范围只说一遍，不靠调用方同步两处（名实相符） |
| 日期范围的预设 | `presets: { label, value \| () => value }[]`，只写草稿，仍需应用 | Ant、Mantine、Ark | 「近 7 日」「本月」一步到位 |
| 日期范围分别键入两端 | 两个原生日期输入共用一份草稿；反向或不完整不提交 | React Aria、Ark、Ant、Carbon | 键盘用户不必开日历（本库 `family-date.md` 已记为缺口） |
| TagInput 的可选能力 | `splitOn`、`max`、`addOnBlur`、`validate` | Ark、Mantine | 粘贴一串地址；限量；拒绝并说明原因 |
| 验证码与密码对齐 WCAG 3.3.8 | OtpField `normalizeValue`；PasswordInput 开发期缺 `autoComplete` 时警告 | Base UI、Ark | 密码管理器与粘贴不被拦 |
| FileUpload | `validate`（自定义拒绝理由）；粘贴文件 | Ark、Ant | 业务规则的拒绝有文案；截图直接粘贴 |
| Combobox / Autocomplete 的分组 | `Group`、`GroupLabel`、`Separator`、`Status` | Base UI、MUI、React Aria | 与 Select 已有的分组同一画法（NG3）；异步结果对读屏播报 |
| 命令面板 | 不建新组件：Dialog + Autocomplete 的组合与一页文档示例 | cmdk、Mantine Spotlight、Base UI 示例 | 键盘直达；快捷键由应用绑定 |
| 表单失败后落焦点 | 导出纯函数 `focusFirstInvalid(form)` | React Aria、Base UI、GOV.UK | 提交失败后不用找错在哪 |
| 面包屑折叠 | `maxItems`，折叠项进 Menu | Primer、Mantine | 深层路径不撑破标题栏 |
| 折叠内容可被页内查找命中 | Accordion / Collapsible 的 `hiddenUntilFound`（默认关） | 平台能力 `hidden="until-found"` | Ctrl+F 找得到折叠里的字 |
| 标题换行均衡 | 标题档、PageHeader、Empty 加 `text-wrap: balance` | 平台能力（Baseline 2024-05） | 标题不留孤字 |
| 高对比偏好 | `prefers-contrast: more` 下墨阶整体上移一档，只用媒体查询，不加第四轴 | Primer、Carbon 的高对比主题 | 低视力用户；与本轮强制颜色取证相接 |
| axe 进浏览器审计 | 复用现有审计页集，浅深各跑 | 通行做法 | 可访问名称、ARIA 结构不再只靠人查 |
| API 表由类型生成 | `gen-catalog` 用 TS 类型检查器解析属性，取代手写（现状 90/90 是手写未核对） | MUI、Mantine、Base UI 文档 | 文档与代码不再各说各的（名实相符） |
| 给 AI 的入口 | `llms-full.txt`；组件页的 Markdown 备用地址 | shadcn、MUI、Mantine | 工具按安装版本取事实 |
| 发布检查 | `publint` 与 `attw` 进 CI | 通行做法 | 包入口错误在发布前拦下 |
| Base UI 1.7 → 1.9、DayPicker 10.0.2 | 升级；回归 `readOnly` 语义（1.8 起只读时可打开浏览候选） | — | 修复随上游而来 |

### 9.3 需要用户裁决（附推荐，未实施）

| 项 | 推荐 | 为什么要裁决 |
|---|---|---|
| 原生校验失败时只有浏览器气泡，没有就地文案 | 给 Form 一个选项，把原生约束失败转成就地的 FieldError | 会推翻 `family-form.md` 的既有取舍 |
| HoverCard 默认延迟为 0 | 改为有延迟（数值取 Tooltip 已有的延迟角色） | 默认行为变化 |
| 可拖拽分栏 Splitter | 加，作为布局族的一个组件 | 新组件；Ant、shadcn 都有，任务清晰（主从视图调宽） |
| Editable（原位改名） | 暂缓到第一个使用方出现 | 新组件，代价中等 |
| `light-dark()` 与 `color-scheme` | 暂缓 | 未挂 ThemeProvider 的使用方会开始跟随系统明暗 |
| npm Trusted Publishing 与 provenance | 做 | 需要用户在 npm 一侧配置；2.0.0 现在没有 provenance |
| 发布 `@qingye_lab/tooling` | 做 | 发布动作属于用户；它是 MCP 的前提 |
| 渲染期抛错（数据格式不符时卸载子树） | 维持 | 属既有取舍，调研只是提醒 |
| 官网组件页是纯客户端渲染的空壳（抓取工具拿不到正文） | 预渲染组件页 | 改动官网构建方式 |

### 9.4 观察与不采纳

- **观察**：DateField 分段输入（原生日期输入已是平台的分段输入）、Rating、Cascader / TreeSelect、错误摘要、TanStack Table v9、Tabs 与 Toolbar 的溢出、`ariaNotify()`（播报内容不在 DOM 里，事后读不回，与 NG7 相左）、布局族的容器查询（以审计实测的溢出为准，不预先铺开）、React Compiler 兼容声明、Vitest Browser Mode（沿用此前「后置」的裁决）、框架消费矩阵。
- **不采纳**：TimeField、ColorPicker、Signature、Mention、Transfer、PhoneInput、Spinner、Carousel、Tour、Popconfirm、AI 对话组件；MCP 服务（各家都是在线文档的薄包装，本库的前提是先发布 tooling）；DTCG 导出（格式只存色值，表达不了「墨 66% 与纸调和」这类关系，导出会丢掉每个值的来由）；用原生锚点定位替换 Base UI 的定位（整体特征仍未全部可用，替换等于分叉）；APCA 并列报告；Storybook；changesets。

### 9.5 实施分工

升级 Base UI 之后，按互不重叠的文件边界下发：

| 子代理 | 范围 |
|---|---|
| 标签作用域与方向 | 9.1 的 1、2、4；`field`、`radio-group`、`segmented-control`、`checkbox`、`switch`、`locale`、`sidebar` |
| 日期族 | 9.1 的 3、12、13、15、17；9.2 的三项日期能力 |
| 输入族 | 9.1 的 10、11、14、16；9.2 的 TagInput、验证码与密码、FileUpload |
| 浮层与数据 | 9.1 的 5–9；面包屑折叠、`hiddenUntilFound`、标题换行 |
| 候选分组与表单 | Combobox / Autocomplete 分组与 Status；命令面板示例；`focusFirstInvalid` |
| 包与管线 | 9.1 的 18、19；`publint` 与 `attw`；axe 审计 |
| 文档事实 | API 表由类型生成；`llms-full.txt` |
| 高对比偏好 | `prefers-contrast: more`（在强制颜色取证落地之后） |
