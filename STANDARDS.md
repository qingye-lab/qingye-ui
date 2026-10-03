# 组件规范

这份规范记录 `@qingye/ui` 的组件实现规则。生成器将它投影为随包分发的 `ai/style.md`，不手改生成副本。设计依据是根 [design.md](design.md)，当前值与定位见[基础层](docs/decisions/2026-10-03-foundation.md)，按[逐值裁决](docs/decisions/2026-10-03-value-adjudication.md)修订。

## 0. 硬要求、选择与预设

设计硬要求引用 [design.md「必须」](design.md#必须)，不在本规范另立副本。数值须区分推导、约束、选择与预设：约束内的一个值不自动成为唯一推导，继承值也不能改名后写成理念要求。当前尺寸、配色、字距、阴影与时长中没有唯一依据的值标为预设。

当前仓库有 11 个组件文件，四个试点是 Button、Input、Card、Popover。其余保留组件仍有直接空间阶梯、局部动效和高光；以下重写规则不等于它们全部已满足。未归档组件的现状从当前源码读取，归档组件不作为设计值来源。

## 1. 结构与 API

- 一个组件一个文件，位于 `packages/ui/src/components/<name>.tsx`，文件名用 kebab-case。
- 可样式化部位带 `data-slot`；外部类最后合并，透传 id、ARIA、data 属性与事件。
- 改渲染元素使用 Base UI `render`、`useRender` 与 `mergeProps`；不新增无任务依据的别名或 `as` API。当前 Card 是组合入口，不自动提供标题槽或 padding。
- 基于 Base UI 的组件导出所用原语命名空间。可控状态同时保留适用的受控与非受控入口；职责按 [design.md「明确修改归属」](design.md#明确修改归属) 判断。
- 请求事实与结果推断按 [design.md「名称与状态」](design.md#名称与状态)。Button 当前选择状态联合 `idle / waiting / in-progress / unknown / failed`；boolean loading 也能符合状态归属，联合不是理念强制。
- 危险后果必须可见且可关联。danger Button 位于 ButtonProtection 内，或其 `aria-describedby` 指向页面中存在且文本非空的元素，满足任一即可；两者都无时开发环境抛错，生产不抛。运行时缺少 `process` 时按生产处理，跳过开发诊断。ButtonProtection 的 consequence 为非空可见文字，说明当前对象与后果；已有可靠说明不重复包装。后果关联见基础层 §18，缺少运行时环境的验证见批次 3 D 报告。

## 2. 尺寸

尺寸与强调两轴独立可选；尺寸参与表达须有任务理由。外高、字号与窄屏 +4px 是当前预设，不能说尺寸绝不表达重要性。`sm:` 默认 640px 回到桌面档；粗指针的命中要求另行处理。

| size | 桌面外高 / 窄屏外高 | 同名文字档 | 字号（桌面 / 窄屏） | 行高（桌面 / 窄屏） | 桌面每侧垂直视觉余量 |
|---|---|---|---|---|---|
| `xs` | 24 / 28px | `text-control-xs` | 12 / 14px | 16 / 20px | 4px |
| `sm` | 28 / 32px | `text-control-sm` | 13 / 14px | 18 / 20px | 5px |
| `md` | 32 / 36px | `text-control-md` | 14 / 15px | 20 / 22px | 6px |
| `lg` | 36 / 40px | `text-control-lg` | 16 / 17px | 24 / 24px | 6px |
| `xl` | 40 / 44px | `text-control-xl` | 18 / 19px | 26 / 28px | 7px |

px 换算以根字号 16px 为基准。Button 与 Input 每档读取同名文字档，窄屏用其 `-mobile` 类，`sm:` 回到桌面类。lg 曾借 md 的文字档，xl 曾借 lg 的文字档，只增高而未增行高，使每侧空白变成 8px；当前 4/5/6/6/7px 是选定外高与行高的换算结果，见基础层 §2、§8。

- 区分外部占位、边框内可用尺寸与触摸命中尺寸。外高取尺寸角色，不通过调大全局 spacing 间接改变。
- 水平视觉留白 10/12/14/16/16px、约 40–44% 是预设，不是容量底线；容量由实际宽度与文字、图标、附属操作决定。bordered / Input 的同档 padding 扣实际 1px 边框，保持文字起点；无边框读未扣边框的档案，见基础层 §1。
- 图标也读同档角色。桌面 xs/sm 为 14px、md/lg 为 16px、xl 为 18px；窄屏分别 16/16/18/18/20px，均为预设。图标形态是 shape 轴，居中余量按外高与图标尺寸换算。
- 小于库内 44px 目标的独立控件使用 touch-target。该工具类在粗指针下**自建定位上下文**，居中扩展伪元素，不依赖调用方另写 relative；验证无裁切、相邻覆盖或视口误命中。Input 粗指针下最小外高读 `--qy-touch-target`，不改变名义档位。

## 3. 表面与边界

围合与表面的任务判据引用 [design.md「空间与表面」](design.md#空间与表面)和[「删去检验」](design.md#判据)。识别机制的具体选择见基础层 §5、§6。

| 当前 Button variant | 范围机制 | 焦点机制 |
|---|---|---|
| `solid` | 填充，无默认边框或外投影 | 填充内侧 2px 反色线 |
| `bordered` | 浅色白底、线承担范围；深色读卡片面 | 原 1px 边框只变色 |
| `quiet` | 默认透明，内容识别入口 | 自身盒内 1px 细线 |

三档是当前选择，不固定对应三种重要性；tone 独立。用户规则「和背景色一致时才保留边框」解释 bordered 的来由，不给已有足够填充的入口重复补线。

neutral bordered 的 `--qy-button-bordered-border` 读 `--qy-border-input`，聚焦 `--qy-button-bordered-border-focus` 读 `--qy-ring`。浅色当前为黑色 alpha 50%，深色当前为白色 alpha 44%；不能把用户选定的 50% 写成两色现值。danger bordered 局部用危险文字色 50% 合成，焦点读不透明危险文字色。

- 表面读语义角色，不写死灰色。surface/raised 当前浅色为白色，深色用不透明 color-mix 配色；surface-inset、线与反馈层为半透明，须按真实叠层测合成结果。
- Input 当前外层为 1px 共同边界；内部 input 透明。深色外层读内嵌表面。Card / Popover 当前各有 1px 容器边界；这描述现状，不证明所有情境都必须保留线。
- 高光与阴影按上引删去检验判断。当前 solid Button 无外投影；Card 默认 shadow-panel 的独立用途**未证，UNVERIFIED**。Popover 默认 shadow-raised；所有阴影参数都是预设。Tooltip / Toast 仍保留局部阴影与伪元素高光，不能宣称已经统一或已证明必要。
- 必要边界的对比判据引用[基础层 §16](docs/decisions/2026-10-03-foundation.md#16-对比底线)；不存在运行时自动读取父背景、自动补边框的库契约。G9 项目声明协议仍未定，不能把提案当现有 API。

## 4. 圆角

当前方整独立控件采用 `r ≤ 25% × 名义外高` 的约束；25% 是选定判据，6/7/8px 是区间内的选择。xs/sm/md 取上限不是唯一解，lg/xl 保持 8px；真实宽度、放大与换行仍需核对。

| 当前类 / 角色 | 值 | 消费 |
|---|---|---|
| `rounded-xs` / `rounded-sm` | 6 / 7px | xs / sm 控件 |
| `rounded-control` | 8px | md/lg/xl Button 与 Input |
| `rounded-panel` | 12px | Card |
| `rounded-overlay` | 12px | Popover 面板，独立修改入口 |
| `rounded-md` / `rounded-lg` | 8 / 8px | 独立几何档 / 默认控件链 |
| `rounded-xl` / `rounded-2xl` | 10 / 12px | 其他几何预设 |
| `rounded-marker` / `rounded-item` | 4 / 6px | 已定义标记/行项预设，当前无对应重写组件 |

`--qy-radius-md` 是直接值，`--qy-radius-lg` 读取 `--qy-radius`；当前同值不表示内外层关系。只有**同一承载轮廓等距内缩**时才用 `r内 = max(0, r外 − inset)`，负值退化为直角。独立子对象不适用：Card 内的独立 8px Button 不随 Card 的 padding 强制换算，见基础层 §4、§18。

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

强制颜色下 box-shadow 会被系统移除，`styles.css` 统一恢复 CSS outline：当前宽度 2px，位置按焦点宽度取负，系统色接管；`!important` 用于覆盖 utilities 层的 outline-none。宽度是选择，不是 AA 下限。完整强制颜色组合矩阵仍为 UNVERIFIED。

测试 focus-visible 使用真实 `keyboard.press("Tab")`，等过渡至少 500ms 再取 computed 值；聚焦前后宽高不变、信号可见、无外扩。静态样式与候选覆盖页不等于运行验收。

## 6. 动效

- 动效的事实、可中断与任务连续性要求引用 [design.md「变化与恢复」](design.md#变化与恢复)及[禁止 NG6](design.md#禁止)。
- 时长和曲线是预设。当前 press 100ms、fast 140ms、feedback 180ms、base 220ms、slow 320ms、drawer 450ms；使用对应角色而不内联另定同类值，见基础层 §12。
- Popover / Tooltip 的入退由 motion.css 接管；组件提供结构、触发位置与 slot。起止 scale 0.98 / opacity 0 是继承预设，迁入共享文件不改变来源。当前进入 140ms、退出 100ms，是策略选择。
- Toast 仍保留局部入退与堆叠，theme.css 还有成功/错误动画；这些值均为预设，不能声称全部保留组件已完成动效收敛。
- MotionProvider 记录输入方式，键盘即时切换；reduce 时删除位移与缩放，保留可读颜色/透明度和加载指示。其运行验收引用 [design.md「人和 AI 的交付检查」](design.md#人和-ai-的交付检查)。

## 7. 排版与容量

每个语义档自带字号、行高、字距与字重；当前数值都是预设。控制档独立于内容档，文字层级判据引用 [design.md「强调与内容」](design.md#强调与内容)。

| 内容档 | 当前字号 | 当前字距 |
|---|---|---|
| `display-lg` / `display` | 40 / 32px | −0.032em |
| `title` | 24px | −0.022em |
| `chapter` | 22px | −0.02em |
| `heading` | 16px | −0.012em |
| `body` / `label` | 14 / 13px | −0.006em |
| `caption` | 12px | 0 |
| `micro` | 11px | +0.01em |

- 字距不由字号唯一决定，默认规律不作为硬禁令。当前字重 400/500/600；改主题值须检查真实层级与对比，不能把当前偏好变成普遍要求。
- utilities.css 用 :lang 将中日韩字距设为 normal；当前无 typography 组件负责这件事。排版验收引用 [design.md「强调与内容」](design.md#强调与内容)和[交付检查](design.md#人和-ai-的交付检查)。
- numeric 用于数字列、计数等；text-metric 自带等宽数字。
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
