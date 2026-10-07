# 组件盘点：按表达九法与少则得复核

## Status

Applied（2026-10-07）。用户要求「审核一下现有的组件，删掉没有价值的，增加缺少的，比如数据图表组件明显不足」，顺序从基础组件到组合组件。依据：根 `design.md` 的总纲（少则得：能组合解决的不增加配置，能复用关系的不新增组件）、器用六法、表达九法；分层判据见 [component-layering.md](component-layering.md)。

组件数：83 → **82**。删除 4 个，新增 3 个；`chart` 增加柱状图，`stat` 增加变化量。

## 删除

| 组件 | 层 | 判据 |
|---|---|---|
| `group` | Foundation | 按 `orientation` 在 `Stack` 与 `Inline` 之间二选一，与 `layout` 是同一个对象的两个名字（名实相符）。`ButtonGroup`、`PendingValue` 直接使用 `Inline` |
| `aspect-ratio` | Foundation | 只设置 CSS `aspect-ratio` 一个属性；`aspect-*` 工具类与原生样式已能组合解决（少则得） |
| `progress-circle` | Primitive | 与 `Progress` 是同一个进度契约，只换了形状。用角度表达比例弱于用长度；圆只给点与身份（应物象形）。按钮内的行内等待由 Button 的状态承担 |
| `carousel` | Pattern | 把并列内容藏进逐张翻看，读者无法比较，也看不出总量（展开有据：高频内容不应要求逐层探索）。媒介陈列属于 Experience 层，可用 `ScrollArea` 与滚动吸附组合 |

## 新增

| 组件 | 层 | 承担的关系 | 依据 |
|---|---|---|---|
| `link` | Primitive | 正文中的文字链接 | 此前 Breadcrumb、Item、Toolbar、Pagination、Sidebar、NavigationMenu、HoverCard 各画一套下划线与悬停，同一关系多种画法（NG3）。统一后这些部位复用同一条规则 |
| `sparkline` | Primitive | 行内趋势：无轴的小型折线，放在读数、表格单元格旁 | 数据面上「这个数在变好还是变坏」反复出现；它必须带可读的摘要（起止、最高最低），不能只是一条线 |
| `proportion` | Primitive | 部分与整体：一条按比例分段的条，带同源图例与数值 | 构成关系此前没有组件承担；用长度而不是角度表达比例，因此不提供饼图 |

## 扩展

| 组件 | 扩展 | 依据 |
|---|---|---|
| `chart` | `type: "line" \| "bar"`：折线表达趋势，柱状表达类别之间的比较 | 二者共用同一契约（命名的轴、行与系列、同源图例与等价数据表、空态与未知值），差别只在编码方式，由任务选定；不另起组件 |
| `stat` | `StatDelta`：与参照期的变化量，方向用符号与文字表达 | 变化方向不代表好坏，颜色只在应用声明好坏时使用（随类赋彩） |

## 数据图表的取色

- 只有一个系列时用焦墨：没有类别要区分，用色相违反 NG10。
- 两个以上系列按 `--qy-chart-1…5` 取色，并配合标记形状与线型，转成灰度后仍可区分。
- 凹槽、网格与轴线取墨阶（淡、清），不另造灰。

## 保留并复核过的近似组件

| 组件 | 与谁相近 | 保留理由 |
|---|---|---|
| `button-group` | `layout` 的 `Inline` | 提供 `role="group"` 与共同名称，是语义而不只是排列 |
| `toggle-group` | `segmented-control` | 前者是命令状态（加粗、斜体，可多选），后者是表单值 |
| `status-dot` | `badge` | 前者表达对象的状态，后者是短标记 |
| `scroll-area` | 原生滚动 | 可聚焦的滚动区，键盘可达 |
| `hover-card` | `popover`、`tooltip` | 预览后再决定是否深入（展开有据） |
| `locale-switch` | `select` | 库自身消费 locale，切换入口应由库提供 |

## Consequences

- 破坏性变更：删除的四个组件的导出、文档页、演示、测试与 locale 键一并移除。消费方迁移：`Group` → `Stack` / `Inline`；`AspectRatio` → `aspect-*`；`ProgressCircle` → `Progress`；`Carousel` → `ScrollArea` 组合。
- `component-layering.md` 的计数与分层清单按本文件更新。
