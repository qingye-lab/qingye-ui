# 组件缺口盘点与裁决（2026-11-01）

## 来源

用户在实际项目中反复遇到缺少区间选择等能力，要求对照成熟组件库梳理缺口。本轮把 coss 的 529 个
用法示例（particle）逐条与本库对照，只盘点**能力有无**，不读取、不采用其实现与取值
（硬规则见根 `CLAUDE.md`「重写进行中」）。粗计：已有或可由现有组件组合约 400 条，
已有组件缺能力约 30 条，整件缺失约 30 条，不适用约 30 条，待裁决约 15 条。

## 用户裁决

| 项 | 裁决 |
|---|---|
| Select 不带搜索的多选 | **需要**。Select 支持 `multiple`；带搜索的多选仍由 Combobox 承担 |
| 标签页与导航的轨道外观 | **允许，且外观不限定条目从哪来**。同一种轨道外观可以承载切换面板的标签页、跳转路由的链接导航和只产生一个值的分段控件；外观不再与作用一一绑定。各自的语义（tablist/tab/tabpanel、链接与 `aria-current`、radio）不变，由所用组件承担。推翻 2026-10-07 起「Tabs 只用导航线（`src/nav-line.ts`）、轨道只属于 SegmentedControl」的分工；实施时须同步改 `tabs.tsx`、`nav-line.ts` 头注释与相应家族文档中的这条分工 |
| 对话输入（Composer） | **进库**。多行输入，`@` 提及与 `/` 命令弹出候选，选中项在输入内成为标签块；候选可同步给出也可异步加载，不限定来源。消息列表等对话界面不随之进库 |

## 主 agent 按用户授权作出的裁决

用户授权：能确认的按推荐定，不能确认的先解释再交用户裁决。

| 项 | 裁决 | 依据 |
|---|---|---|
| Spinner | **不恢复独立组件**。把 Button 内部已有的旋转忙碌标记整理为库内共享部件，供 `InputGroupAddon` 使用；Autocomplete 补 `loading`，与 Combobox 的候选状态一致 | `component-layering.md` 删除 spinner 的理由是「等待脱离对象」。coss 的 6 条用例（按钮、输入框附加区、自动补全）全部附着在控件上，缺的是这些控件的忙碌能力，不是一个独立旋转图形 |
| Frame | **不恢复，也不给 Card 加头部、底部部件**。「多张卡片与表头、表尾收进同一外壳」用 Card 嵌套加布局原语组合，补示例 | `card.tsx` 注释与展示族决定 2：Card 只围合独立对象，不替内容决定标题、内边距或布局；嵌套同心由组合显式推导。Frame 的删除理由「与 Card 重叠」仍成立 |
| Autocomplete 行内补全（`mode`） | **维持关闭** | `autocomplete.tsx` 写明「高亮永远不会成为提交值」，这是有意的语义选择；行内补全会让高亮项直接写入输入框。用例频率低 |
| DatePicker 按钮式触发器 | **不加** | 现有 DatePicker 是可键入的输入框加日历弹层，支持键入与粘贴，能力上已覆盖按钮式触发器；再加一种会形成两套交互模型 |
| 可交互头像 | **Avatar 保持图像身份**。需要点击时放进按钮或链接，由外层承担名称、焦点与提示；补示例 | `avatar.tsx` 的 `role="img"` 可被调用方属性覆盖，不构成硬冲突；交互职责放在外层，符合一个组件一项职责 |

## 待实施清单（按优先级）

1. 区间类：周、月、季度、年的选择与区间；日期加时间区间；时间段；数字区间（依赖第 2 项）。
2. 联合控件：InputGroup 接 NumberField、Textarea、Select，附加区上下块级位置与纯文字附加区；
   ButtonGroup 连体形态（相邻边合并、组内文字段、分隔），覆盖拆分按钮。
3. Select 多选；Tabs 与链接导航的轨道外观（上表用户裁决）。
4. 整件缺失第一档：Transfer、AvatarGroup、Image 预览、Rating。
5. 小能力补丁：OtpField 分组、逐格占位与遮蔽输入；NumberField 拖动调值；ScrollArea 边缘渐隐（复用
   `useOverflowEdges`）；Drawer 离边浮起形态；Menu 与 ContextMenu 的开关式勾选项；CornerMark 其他角位；
   Cascader 多选；TreeSelect 搜索；Tree 按需加载与拖拽；InputGroupAddon 忙碌标记与 Autocomplete `loading`。
6. 整件缺失第二档：Composer、Tour、Chip、Result、SkipLink。（初稿列入的面积图、堆叠柱状图经核实
   已由 `chart.tsx` 的 `area`、`area-stacked`、`bar-stacked` 等类型覆盖，删除。）

## 核实结论

Avatar、Toggle、SegmentedControl、Stat 仍带 `size`，**不与密度裁决冲突**。2026-10-05 裁决删除
`size` 的范围是填值控件与勾选类；Toggle 与 SegmentedControl 属于 Button 派生，按同一裁决保留五档；
Avatar 的尺寸是身份图像的显示大小，Stat 的尺寸是读数字号档，都不是「控件本身随内容放大」。
