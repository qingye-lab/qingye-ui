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

## 待裁决项的处置（按业内做法，2026-11-01）

用户授权：剩余待裁决项「全部按照最佳实践以及业内认可的标准裁决，并且问题全部修复」。
下表每项给出裁决、业内依据与落地位置；依据只引用公开规范与成熟库的**行为**，不引用其实现或取值。

| 项 | 裁决 | 依据 | 落地 |
|---|---|---|---|
| Rating 清除后的提交 | 清除即不提交该字段，与原生单选组一致；只读时 `ref`、`id` 仍落在同一个根上 | HTML 单选组无选中时不进入表单数据 | `rating.tsx` |
| ChipToggle | **发布前删除**。可切换的筛选标签用 `Toggle size="sm"` | 它只是把 Toggle 固定在 sm 档，一个能力两个名字；一个组件一项职责 | `chip.tsx`、Chip 文档 |
| Composer 定位 | 独立组件；不接 `name` 与 Field，值经 `onSubmit` 离开 | 值是片段数组，没有表单字段形态；对话输入的通行做法是提交回调 | Composer 文档 notes |
| Composer 文字还原 | `composerValueFromText` 只在词的开头还原令牌（前一字符不是字母数字下划线也不是触发字符，令牌以字母数字结尾时后一字符也不能是）；无损保存应存片段数组 | 提及的通行判定是词边界，避免把邮箱地址或更长的名字误认为提及 | `composer/model.ts` 与测试 |
| Select 清除按钮 | **不加 Clear 部件** | 触发器是按钮，按钮里再嵌按钮是无效的交互内容嵌套；需要可清除的选择用 Combobox | 不改 |
| `InputGroupSelectTrigger` | 不随内容撑宽 | 联合控件里输入是主体，附加的选择保持自身宽度 | 不改 |
| `NumberFieldScrubArea` | 保留名称 | 「拖动调值区」是该能力的通行叫法，改名无收益 | 不改 |
| InputGroup 相邻留白 | **修复真缺陷**：相邻规则原用模板插值拼类名，Tailwind 只扫字面量，构建产物里一条都没生成；改为字面量。对齐到行内起止端的附加区按位置判断，与没写 `data-align` 的按 DOM 相邻判断 | Tailwind 的类名必须是完整字面量 | `input-group.tsx` |
| ButtonGroup 连体 | 相邻边合并只发生在都有边框的成员之间；组内文字段与按钮共用同一份五档几何 | 无边框成员没有可合并的边，强行拉近会吃掉间隔 | `control-size.ts`、`button.tsx`、`button-group.tsx` |
| 开关与勾选标记的几何 | Switch 与 MenuSwitchItem、Checkbox 与 Tree/Transfer 的勾选标记各共用一份几何，不再各抄一份 | 同一件东西只在一处定义 | `switch-geometry.ts`、`marker-geometry.ts` |
| 文案键 | 删除未发布的重复键 `selectSeparator`，Select 共用已在 v5.1.0 发布的 `treeSelectSeparator`（名字保留以免破坏已发布接口）；新增 `dateInvalid` | 已发布接口不改名；同一用途只有一个键 | `locale.tsx`、`locales/en-US.ts` |
| CornerMark `hostShape` | 保留 | 与成熟库「角标按宿主形状偏移」的做法一致（如徽标的 overlap 选项） | 不改 |
| 无法识别的日期 | DatePicker 周期文字解析不了时报 `dateInvalid`（「无法识别的日期」），未填完整仍是 `dateIncomplete`；DateRangePicker 的 `onInvalid` 新增原因 `unrecognized` | 原生 `ValidityState` 也把「没填完」与「填了但认不出」（badInput）分开 | `date-picker.tsx`、`date-range-picker.tsx` |
| 周期区间的天数与禁用 | 非按天时 `calendarProps.min` / `max` 按规范后的整段（首个周期起点到末个周期最后一天）计算天数；`excludeDisabled` 按周期判断：范围不得跨过整个被禁用的周期，周期里还有可选的日子就可选 | 与按天时同一条规则，只把单位换成周期，不另设一套 | `date-range-picker.tsx` 与测试 |
| 非按天的多选 | 不提供 | 周、月、季、年的多选在成熟库里都不是常见形态，需要时用区间 | 文档说明 |
| DateTimePicker 粒度 | 不接 `granularity` | 有时间就必然精确到天 | 不改 |
| 宽松的 ISO 输入（如 `2026-W44`） | 保留 | 粘贴来的标准写法应能识别 | 不改 |
| ScrollArea 渐隐 | 渐隐止于原生滚动条之前，滚动条所在条带整条不透明（实测条带宽度，覆盖式滚动条为 0） | 滚动条是操作部件，不应随内容一起变淡 | `scroll-area.tsx`、`hooks/use-scrollable.ts` |
| Tabs 轨道外观 | 轨道外框画在外层 `tabs-track`，滚动与渐隐留在里面的列表上 | 放不下时只渐隐标签，轨道外框保持完整 | `tabs.tsx` |
| Workspace 跳转链接 | 复用 SkipLink | 同一能力只在一处实现；SkipLink 会给没有 tabindex 的目标补上并滚动到位 | `workspace.tsx` |

## 实施状态（2026-11-01 收尾）

待实施清单六项与上两张裁决表全部落地，各项所在提交：

| 清单项 | 落地 |
|---|---|
| 1 区间类 | 周、月、季、年粒度 `7899c4b`；TimeRangeField 与 DateTimeRangePicker `187dac0`；数字区间由 InputGroup 组合两个 NumberField 给出（InputGroup 示例「数值区间」），不另设组件 |
| 2 联合控件 | InputGroup 成员与附加区位置 `a142e3a`；ButtonGroup 连体 `8c2ecb2` |
| 3 Select 多选、轨道外观 | `a142e3a`、`8c2ecb2`；`tabs.tsx`、`nav-line.ts` 头注释与组件文档已改，基础层 §6「并列候选的轨道」「导航线」两段在本次收尾同步 |
| 4 整件第一档 | Transfer、Rating `add2380`；AvatarGroup、ImagePreview `7b88375` |
| 5 小能力补丁 | OtpField、ScrollArea 渐隐、Drawer 离边、MenuSwitchItem / ContextMenuSwitchItem `10c412b`；CornerMark 角位 `7b88375`；Cascader 多选、TreeSelect 搜索、Tree 按需加载与拖拽 `52b2921`；NumberField 拖动调值、忙碌标记（`src/busy-mark.tsx`）与 Autocomplete `loading` `a142e3a` |
| 6 整件第二档 | Composer `653fe54`；Tour `ab95dc5`；Chip `add2380`；Result、SkipLink `7b88375` |
| 主 agent 裁决的示例 | Card 嵌套组合（Card 示例「嵌套」）；可点击的头像（Avatar 示例「可点击的头像」） |
| 待裁决项 | `bd6ca2b` |
