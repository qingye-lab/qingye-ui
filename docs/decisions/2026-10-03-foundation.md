# 基础层：关系、约束与当前取值

## Status

Applied（2026-10-03，按逐值裁决修订）。设计依据是根 [design.md](../../design.md)，值的定位按[逐值裁决第三、四节](2026-10-03-value-adjudication.md)。实现规则见 [STANDARDS.md](../../STANDARDS.md)。

本文描述当前仓库的基础层与消费部位。现存组件为 Button、Input、Card、Popover、Field、Fieldset、Separator、Toast、Tooltip、ThemeProvider、MotionProvider，共 11 个文件；未重写组件已归档，不能把它们的旧用法写成当前事实。四个试点之外的保留实现仍有待重写的规则差异，下面逐项列明。

| 定位 | 含义 |
|---|---|
| **推导** | 明确关系或用户要求决定结果，换成相反结果即违反该要求 |
| **约束** | 给出可接受的条件或区间，未决定区间内的唯一值 |
| **选择** | 在约束内选定的机制或取值，另一个满足条件的选择也可能成立 |
| **预设** | 当前集中默认值，尚无关系能唯一决定；继承值也按此记录 |

当前数值读取自 `packages/ui/tokens/*.css`、`theme.css`、`styles.css`、`utilities.css`、`motion.css` 与这 11 个组件。除另注明外，px 换算以根字号 16px 为基准；源码中的 rem 值仍随根字号变化。源码接线核对不等于浏览器验收，未实测的组合记为 `UNVERIFIED`，未运行的检查记为 `NOT_RUN`。

## Context

此前文档把外高比例、焦点宽度、圆角取上限等选择写成唯一推导，还把旧实现的尺寸、透明度与动效值写成理念要求。修订保留真实关系，并把当前值及其修改入口分开列出。组件复用已定义的角色；只有关系需要独立调整且有明确消费部位时，才补充基础层。结构性的 0、百分比和正常布局不必另建 token。

## 1. 单位内部几何

文字需要可读的空间，并与相邻控件对齐。关系约束文字不贴边、必要内容可读及对齐成立，不能唯一算出水平留白。

| 档 | 桌面名义外高 | 水平视觉留白（含边框） | 留白 / 名义外高 | 有 1px 边框时的 padding |
|---|---|---|---|---|
| `xs` | 24px | 10px | 41.7% | 9px |
| `sm` | 28px | 12px | 42.9% | 11px |
| `md` | 32px | 14px | 43.8% | 13px |
| `lg` | 36px | 16px | 44.4% | 15px |
| `xl` | 40px | 16px | 40.0% | 15px |

10/12/14/16/16px 与约 40–44% 均为**预设**，不是合规区间；44.4% 也不需要另造阈值。容量上限由控件的真实宽度、文字、图标、附属动作和换行方式决定，不能只用外高比例判定。32px 高配 18px 留白也可能成立，须看剩余内容空间。

Button 的文字形态分别消费 `--qy-control-xs-padding`、`--qy-control-sm-padding`、`--qy-control-md-padding`、`--qy-control-lg-padding`、`--qy-control-xl-padding`。bordered 按钮与 Input 读取对应的 `--qy-control-xs-padding-bordered`、`--qy-control-sm-padding-bordered`、`--qy-control-md-padding-bordered`、`--qy-control-lg-padding-bordered`、`--qy-control-xl-padding-bordered`。

**推导**：为保持相同文字起点，有边框的 padding = 水平视觉留白 − 实际边框宽度。内部可用高度 = 外高 − 上下边框；单行内容每侧的垂直视觉余量 =（外高 − 行高）/ 2，padding 再扣该侧边框。图标居中余量 =（外高 − 图标尺寸）/ 2；居中关系决定算式，图标尺寸仍是预设。

Button 用最小高度和同名文字档，Input 用共同边界包住实际输入；多行或放大后的外高可增长，水平留白保持该档值。评审看真实内容容量、文字起点和换行后的任务是否成立，不把比例下降当作违规。

## 2. 单位外部尺寸

尺寸与强调两轴**独立可选**；尺寸可以参与表达，须有任务理由，例如异常时更容易抵达的停止入口。尺寸不自动赋予重要性、权限或安全性。

| 档 | 桌面外高 | 窄屏外高 | 同名文字档 | 字号（桌面 / 窄屏） | 行高（桌面 / 窄屏） | 每侧垂直视觉余量（桌面 / 窄屏） |
|---|---|---|---|---|---|---|
| `xs` | 24px | 28px | `text-control-xs` | 12 / 14px | 16 / 20px | 4 / 4px |
| `sm` | 28px | 32px | `text-control-sm` | 13 / 14px | 18 / 20px | 5 / 6px |
| `md` | 32px | 36px | `text-control-md` | 14 / 15px | 20 / 22px | 6 / 7px |
| `lg` | 36px | 40px | `text-control-lg` | 16 / 17px | 24 / 24px | 6 / 8px |
| `xl` | 40px | 44px | `text-control-xl` | 18 / 19px | 26 / 28px | 7 / 8px |

外高序列是继承的**预设**，窄屏 +4px 也是**预设**。Button 与 Input 在 `sm:`（默认 640px）回到桌面档；窄屏与粗指针不是同一条件。当前 Input 在粗指针下由 `--qy-touch-target` 保证至少 44px，不能把此时的实际高度当作名义外高。

桌面入口为 `--qy-control-xs`、`--qy-control-sm`、`--qy-control-md`、`--qy-control-lg`、`--qy-control-xl`；窄屏入口为 `--qy-control-xs-narrow`、`--qy-control-sm-narrow`、`--qy-control-md-narrow`、`--qy-control-lg-narrow`、`--qy-control-xl-narrow`。基础层用 `--qy-control-mobile-extra` 换算，组件只读换算结果。

**选择**：五档分别使用同名文字档；文字值见 §8。桌面的 4/5/6/6/7px 余量是选定外高与行高后的**推导结果**，不是五个额外 padding 预设。lg 曾借用 md 文字档，36px 外高配 20px 行高，每侧余量从 md 的 6px 增至 8px，行高占比由 62.5% 降到 55.6%；xl 曾借用 lg 的 24px 行高，余量也为 8px。只涨高度使增量全部落到空白，当前两档已接入自己的文字档。

评审同时核对外部占位、边框内可用区域与命中区域；换重要性不强制换尺寸，换尺寸也不强制换强调。

## 3. 间距角色

`design.md` 区分关系间隔、工作空间与判断余地。角色用来标出可独立修改的关系；各角色的具体值是**预设**，不要求三个角色必须数值不同。

| 入口 | 当前默认值 | 当前消费与边界 |
|---|---|---|
| `--qy-space-1` | 4px | 阶梯原料；阶梯含 0、4、8、12、16、20、24、32、40、48、64px |
| `--qy-field-gap` | 8px | Field 的名称、控件、错误关系 |
| `--qy-field-group-gap` | 20px | FieldGroup 内字段关系 |
| `--qy-action-gap` | 8px | ButtonProtection 内相邻动作 |
| `--qy-panel-padding` | 24px；≤767px 时 16px | 面板内缘；四个试点不直接读取此默认入口 |
| `--qy-panel-padding-sm` | 16px | Popover 的滚动内容层 |
| `--qy-panel-gap` | 16px；compact 12px | 已定义；现存组件无直接消费 |
| `--qy-section-gap` | 20px；compact 16px | 已定义；现存组件无直接消费 |
| `--qy-row-default` / `--qy-row-compact` | 48 / 40px | compact 将前者绑定后者；当前无列表组件消费 |

同一字段与一组动作分别有角色；`--qy-action-gap` 当前不决定动作组到字段的距离。现存 Field 的横向间隔、FieldContent、Fieldset 仍直接读空间阶梯，不能声称所有保留组件已改成关系角色。新增或重写时优先复用能表达该关系的入口，确有独立需要才新增。

## 4. 圆角角色

`design.md` 要求轮廓方整而转角有缓，未唯一规定百分比。当前采用 `r ≤ 25% × 名义外高` 作为方整独立控件的**约束**；25% 是选定的判据，不是理念公式。文字控件仍须有足够真实宽度，放大、换行后的轮廓另看实际几何。

| 控件档 | 名义外高 | 当前圆角 | 定位 | 消费入口 |
|---|---|---|---|---|
| `xs` | 24px | 6px | **选择**：取约束上限 | `--qy-radius-xs` |
| `sm` | 28px | 7px | **选择**：取约束上限 | `--qy-radius-sm` |
| `md` | 32px | 8px | **选择**：取约束上限 | `--qy-radius-control` |
| `lg` | 36px | 8px | **选择**：沿用同一控件圆角 | `--qy-radius-control` |
| `xl` | 40px | 8px | **选择**：沿用同一控件圆角 | `--qy-radius-control` |

xs 入口为 `--qy-radius-xs`，sm 为 `--qy-radius-sm`，md/lg/xl 为 `--qy-radius-control`。6/7px 不由约束唯一推出，取更小的值也可能满足约束。8px 默认控件圆角、12px 面板与浮层圆角都是**选择**。

| 入口 | 当前值 | 用途 |
|---|---|---|
| `--qy-radius` / `--qy-radius-lg` / `--qy-radius-control` | 8px | 默认控件集中修改链 |
| `--qy-radius-md` | 8px | 独立几何档，与默认控件同值，非内外层关系 |
| `--qy-radius-panel` | 12px | Card 面板 |
| `--qy-radius-overlay` | 12px | Popover 浮层，独立于面板覆写 |
| `--qy-radius-xl` / `--qy-radius-2xl` | 10 / 12px | 其余几何预设 |
| `--qy-radius-marker` / `--qy-radius-item` | 4 / 6px | 标记与行项预设；当前无对应重写组件消费 |
| `--qy-radius-full` | 9999px | 圆与胶囊的预设实现 |

**同心换算的适用范围**：只有**同一承载轮廓等距内缩**时，才有 `r内 = max(0, r外 − inset)`，inset 是从外轮廓到内轮廓的实际距离，包含经过的边框与 padding。负结果退化为直角，不能保留负半径或声称退化后仍有圆弧同心。

Card 内的独立 Button 是子对象，不是 Card 的内轮廓。12px 面板配 24px 内边距时，按钮仍读自己的 8px 角色，不能被强制改成 0。Input 附属按钮当前读取控件圆角减 1px 并钳制为非负；这是当前实现的**选择**，是否所有相邻角都属于同一内缩轮廓需按部位判断。

## 5. 边界与描边

**约束**：必要识别机制必须存在；描边是可选机制之一，填充、文字、图标和空间关系也可承担识别。不能从可辨认推出「所有可编辑区和浮层一律描边」。

用户规则是「**和背景色一致时才保留边框**」。按钮填充已划出范围时，不重复加线；底色与承载面一致而需要独立范围时，由线承担。必要识别若仍不足，须重新选择对比色或承载面并实测，不能机械给所有按钮加框。

| 当前部位 | 当前机制 | 定位 |
|---|---|---|
| Button `solid` | 填充承担范围，无默认 border、无外投影 | **选择**，适合需要填充强调的任务 |
| Button `bordered` | 浅色白底，深色读卡片面；1px 边框承担范围 | **选择**：同底色情境下保留边界的第三档 |
| Button `quiet` | 默认透明，文字或图标识别入口，悬停/按下用局部反馈 | **选择**，仍须名称可读与焦点可见 |
| Input | 外层共同边界 1px，实际输入透明；深色外层用内嵌表面 | **选择**：标出当前编辑范围 |
| Card / Popover 面板 | 1px 边框与承载面 | **选择**：边界是否必要按真实组合判断 |

neutral bordered 的 `--qy-button-bordered-border` 引用 `--qy-border-input`，聚焦入口 `--qy-button-bordered-border-focus` 引用 `--qy-ring`。用户选定与输入框同强度：浅色黑色 alpha 50%；**当前深色源码为白色 alpha 44%**，不能把「50%」写成深浅两色的现有事实。danger bordered 在组件局部用危险文字色的 50% 合成边框，聚焦改为不透明危险文字色。

`--qy-border` 是容器线（浅色黑色 8%、深色白色 6%）；`--qy-border-input` 是输入线；`--qy-border-strong` 是较强线（浅色黑色 54%、深色白色 50%）。这些 alpha 是**预设**，不等于任意背景下达标。

### G9：承载面与合成

调用方必须知道实际绘制的承载面。当前没有库级自动识别父背景或自动补边框的协议；项目局部变量的名称与补色情境仍未定，记为 `UNVERIFIED`。使用现有主题与组合入口表达实际表面，不把一个虚构变量写成已生效的 API。

半透明颜色按真实叠层合成：每个 sRGB 通道的结果 = alpha × 前景 +（1 − alpha）× 底色。边框下有控件填充时先合成填充，再比较必要边界与相邻承载面；填充内侧焦点线比较对象填充。图片、渐变与未知祖先背景需运行时取证，未测记为 `UNVERIFIED`。详见 §15、§16。

## 6. 表面层级

先判断临时浮起、独立身份、内嵌承载，再决定是否需要额外表面。角色分工是**约束**，具体配色与层次数值是**预设**。

| 入口 | 用途 | 当前消费 |
|---|---|---|
| `--qy-background` | 持续工作面 | body、FieldSeparator 标签底面 |
| `--qy-surface` | 独立面板 | Card、Input 浅色共同边界、bordered Button |
| `--qy-surface-raised` | 临时浮起 | Popover、Tooltip、Toast |
| `--qy-surface-subtle` | 从属区域底面 | 当前保留组件无直接消费 |
| `--qy-surface-inset` | 内嵌区或轨道，不表示失败/禁用 | 深色 Input |
| `--qy-overlay` | 阻断遮罩 | 当前无阻断组件消费 |

浅色的 surface 与 raised 当前同为白色，深色分别以 background 的 98% / 94% 与白色混合；同色不抹掉角色差别。inset 是半透明层，不能当作最终背景色。Card 无默认内边距和标题槽，但仍默认同时挂面、线与 `shadow-panel`。该阴影的独立用途**未证，UNVERIFIED**；需有无阴影的真实组合比较，不能把默认存在当作必要性证据。

所有阴影参数都是**预设**。当前 token 的真实值如下，括号为黑色 alpha：

| 入口 | 浅色 | 深色 |
|---|---|---|
| `--qy-shadow-panel` | `0 1px 2px`（4%）+ `0 4px 12px -8px`（12%） | 同几何（20% / 24%） |
| `--qy-shadow-control` | `0 1px 2px`（6%）+ `0 2px 4px -2px`（6%） | 仅 `0 1px 2px`（24%） |
| `--qy-shadow-inset` | `0 1px 2px`（4.5%） | 同几何（20%） |
| `--qy-shadow-raised` | `0 10px 32px -8px`（12%）+ `0 2px 6px`（5%） | 同几何（50% / 28%） |
| `--qy-shadow-overlay` | `0 24px 64px -16px`（20%）+ `0 4px 12px`（6%） | 同几何（64% / 32%） |

Card 消费 panel，Popover 消费 raised；其余阴影角色目前无组件直接消费。Tooltip 与 Toast 仍有局部阴影和伪元素高光，属于保留实现的**预设**，未完成本节的角色收敛，不能声称已统一。

## 7. 颜色角色

颜色表达任务、层级和真实状态，不能代理权限。语义分工是**约束**；原始色板、合成百分比和明暗配对是**预设**，实际可访问对比须另验。

| 入口 | 用途 |
|---|---|
| `--qy-primary` / `--qy-primary-foreground` | neutral 实心强调与其前景；可用于异常时的保护入口，不限定为主动作 |
| `--qy-danger` / `--qy-danger-foreground` | 危险标记与可读危险文字 |
| `--qy-danger-fill` / `--qy-danger-on-fill` | 危险实心填充与其配对前景 |
| `--qy-success` / `--qy-warning` / `--qy-info` | 已确认成功、需注意条件、中性补充事实 |
| `--qy-foreground` / `--qy-foreground-strong` | 正文、标题等主要文字 |
| `--qy-foreground-muted` / `--qy-foreground-subtle` | 辅助与较弱文字；普通大小仍适用 4.5:1 |
| `--qy-accent` | 局部指针反馈 |
| `--qy-chart-1`、`--qy-chart-2`、`--qy-chart-3`、`--qy-chart-4`、`--qy-chart-5` | 数据系列，不表示好坏；当前无图表组件消费 |

同一状态可有标记、文字、实心与柔化表达，并非「只能有一个 token」。`--qy-danger-soft`、`--qy-warning-soft`、`--qy-success-soft`、`--qy-info-soft` 当前各以状态色 8% 与透明混合；8% 是**预设**。危险事实由应用给出，组件不从颜色猜测。

## 8. 文字档位

内容文字按任务角色命名，控件文字按尺寸档命名。角色不可随意混同；字号、行高、字距和字重的数值是**预设**，同值角色也可独立调整。

| 内容档 | 当前字号 | 当前行高 | 当前字重 |
|---|---|---|---|
| `display-lg` / `display` | 40 / 32px | 1.1 / 1.15 | 600 |
| `title` / `chapter` / `heading` | 24 / 22 / 16px | 1.35 / 1.3 / 1.4 | 600 |
| `body` / `body-strong` | 14px | 1.5 | 400 / 500 |
| `reading` | 15px | 1.7 | 400 |
| `prose` / `prose-strong` | 15px | 1.6 | 400 / 500 |
| `support` / `support-strong` | 14px；mobile 16px | 20px；mobile 24px | 400 / 500 |
| `dense` / `dense-strong` | 12px；mobile 14px | 16px；mobile 20px | 400 / 500 |
| `caption` / `caption-strong` | 12px | 1.5 | 400 / 500 |
| `label` | 13px | 1.5 | 500 |
| `metric` | 24px | 1.1；附带等宽数字 | 600 |
| `micro` | 11px | 1.2 | 500 |

每个文字档由自己的 size/leading/tracking/weight 四元组和 `theme.css` 映射共同定义。优先用完整语义类；只有确有不同职责时才覆写一项并说明。当前 Toast 标题仍单写 `font-medium`，不能宣称 11 个组件已全部收敛。

### 五档控件文字

五档的字号、行高及余量见 §2。Button 与 Input 使用 `text-control-xs`、`text-control-sm`、`text-control-md`、`text-control-lg`、`text-control-xl`，窄屏分别使用其 `-mobile` 类，`sm:` 回到同名桌面类。当前均为 500 字重，且独立于内容档。FieldLabel / FieldTitle 当前读取 md 控件文字档。

窄屏字号增加 2/1/1/1/1px 是**预设**，不是触摸必增字号的底线，也不保证避免 iOS 输入缩放。字距不由字号唯一推出：display 两档为 −0.032em，title −0.022em，chapter −0.02em，heading −0.012em，body −0.006em，caption 0，micro +0.01em，均为**预设**。`utilities.css` 用 `:lang(zh/ja/ko)` 将中日韩字距设为 normal；当前仓库没有 `typography.tsx`。

评审使用真实标点、混排、长标签与字体回退，不能只查类名或字号递减关系。

## 9. 状态词汇与归属

**约束**：控件可持有焦点、展开和临时选择；应用持有请求、权限、版本与持久化事实。应用传入 boolean loading 也能满足此关系，不能把布尔类型本身判为归属错误。

| 事实 | 归属与表达 |
|---|---|
| 指针、焦点、按下、展开、临时选择 | 控件与无障碍原语，可由应用控制展开 |
| 选中、无效、当前项 | 控件可自持，也可受控 |
| 等待 / 进行中 / 结果未知 / 失败 / 部分成功 | 应用决定事实，界面分别表达 |
| 权限、审批、版本、持久化 | 应用 |

Button 当前选择 `state = idle | waiting | in-progress | unknown | failed`，这是**接口选择**，不是理念唯一允许的 API。waiting / in-progress 体现忙碌，unknown 阻止默认再次触发，failed 不自行重试；成功仍由应用在对象处表达，控件不以动画或超时宣布结果。

Toast 的 loading 默认 30000ms 后改成持续 unknown，保留原对象内容，不等同服务端失败；30000ms 是**预设**，应用可调整。已有内容刷新保留有效工作面，未知不得混成零、空或失败。

## 10. 强调与层级

**约束**：功能作用与视觉强调分别判断，size、variant、tone 不代理权限。solid 可以强调主动作，也可以强调停止、核实范围或其他有任务理由的入口。

| 当前表达 | 承担什么 | 不自动意味着什么 |
|---|---|---|
| `solid` | 填充承担范围与强调 | 主动作、已授权、更安全 |
| `bordered` | 与承载面同底色时，由线承担范围 | 固定第二级或固定次要动作 |
| `quiet` | 默认透明，内容识别入口 | 不重要 |
| `tone="danger"` | 危险后果语义，独立于三档 | 已获授权 |

三档是当前**选择**，不把君臣佐使固定编码成外观等级。异常时停止可优先，阅读时正文可优先。每一处强表达须有任务理由，数量没有全局硬限制。

## 11. 交互反馈

反馈须对应真实发生的交互，保持布局与对象连续。

| 当前部位 | 表达 | 定位 |
|---|---|---|
| solid Button 悬停 / 按下 | 填充 `/90` | **预设**：90% 继承值，不由理念决定 |
| bordered / quiet Button 悬停 / 按下 | accent 或 danger-soft | **选择**；颜色合成值是预设 |
| `qy-pressable` 按下 | scale 0.97，键盘与 reduce 下不执行此缩放 | **预设** |
| 键盘焦点 | §15 的部位机制 | 不以鼠标悬停冒充焦点 |
| disabled | Button、Input、FieldLabel 等使用 `opacity-64` | **预设**：64% 为逐字继承；真实禁用另由原生/ARIA 与事件约束承担 |
| 粗指针命中 | Button 与 Popover 入口使用 touch-target；Input 外高至少 44px | 机制选择，44px 为库内选择 |

透明度不能代替真实禁用，pressed 也不能宣布保存完成。检查 hover/focus/invalid 的组合以及相邻命中层是否相互覆盖。

## 12. 动效角色

**约束**：动效说明变化，可中断，业务完成不依赖动画。时长与曲线均为**预设**，距离较远不唯一决定 450ms。

| 入口 | 当前值 | 角色 |
|---|---|---|
| `--qy-duration-instant` | 0ms | 程序性即时变化 |
| `--qy-duration-press` | 100ms | 按压；Popover / Tooltip 退出 |
| `--qy-duration-fast` | 140ms | 快速反馈；Popover / Tooltip 进入 |
| `--qy-duration-feedback` | 180ms | 原位进入 |
| `--qy-duration-base` | 220ms | 展开、滑动 |
| `--qy-duration-slow` | 320ms | 较大范围变化预设 |
| `--qy-duration-drawer` | 450ms | 抽屉预设；当前无组件消费 |
| `--qy-ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | 默认反馈 |
| `--qy-ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | 双向变化预设 |
| `--qy-ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | 抽屉预设 |
| `--qy-ease-spring` | `cubic-bezier(0.34, 1.3, 0.64, 1)` | 回弹预设；当前组件无直接消费 |
| `--qy-stagger` | 40ms | 内容错峰预设 |

**所有权选择**：Popover / Tooltip 的入退由 `motion.css` 拥有，组件提供位置、触发点与 slot，不另写入退参数。起止 `scale(0.98)` 与 `opacity(0)` 是继承的**预设**，迁入共享文件不改变来源。MotionProvider 在文档根记录键盘/指针方式；keyboard 下即时切换，reduce 下删除位移与缩放并保留可读状态。

当前 Toast 仍有局部入退、堆叠参数与 theme.css 的成功/错误动画，FieldError 也保留局部反馈。它们的数值是保留实现的**预设**；不能写成全部动效已经由一个文件接管。`motion.css` 中未归档的旧 slot 策略不证明相应组件仍存在。

## 13. 密度与三轴

三轴分工是**约束**。改变表达不改变权限、范围、草稿和结果事实。

| 轴 | 写入方与标记 | 当前边界 |
|---|---|---|
| 品牌 | 项目写文档级 `html[data-brand]` | 调整视觉身份，不写入明暗轴 |
| 明暗 | ThemeProvider 写 `.light/.dark`；显式属性模式写 `data-theme` | 仅 light / dark，默认 system 选择由环境解析 |
| 密度 | 容器或组件写 `data-density` | compact 只调整 row-default、panel-gap、section-gap 关系 |

compact 不改触摸目标或控件文字。组件尺寸在 640px 切换，页边距与面板 padding 的根覆写在 ≤767px，不能把两个断点或密度都叫「移动端」。当前 Card 不替调用方设置密度；Popover Portal 的局部密度、方向与语言需通过容器保留，不能假定离开祖先后仍继承。

## 14. 方向与语言

**约束**：语言和方向改变后，名称、关系、输入与返回仍可用。优先逻辑方向；箭头定位和实际坐标有物理方向理由时可保留。

字距、换行、平衡与截断是**预设或情境选择**，不存在「单行必截断」的理念禁令。Button 当前允许标签换行，Field 的标签/说明允许长词换行；Tooltip 的上一块切换内容仍使用 truncate。必要后果不能因截断或提示消失而丢失。内置文案来自 locale，新增时同步中文与英文，真实混排和 200% 放大另验。

## 15. 焦点与命中

用户已定的要求是「**控件外面不出现任何一圈**」。有边框的 Input、可聚焦 Card、Popover 面板和 bordered Button **只变边框色，不加粗**；solid 在填充内侧画 2px 反色线，quiet 在自身盒内画 1px 细线。信号属于实际获得焦点的对象或它拥有的共同边界。

### 标准要求与项目决定

- **约束，AA 2.4.7**：键盘焦点须可见，未规定统一像素宽度。[W3C：Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- **约束，AA 1.4.11**：识别控件或其状态所必需的非文本信息与相邻颜色至少 3:1；不是要求普通态与聚焦态的相同像素相互达到 3:1。[W3C：Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- **AAA 2.4.13**：焦点指示的面积至少等同未聚焦组件或子组件的 2 CSS px 厚周界面积，并要求同一像素在聚焦前后至少 3:1。它是面积判据，不是 AA 的 2px 宽度下限；本库的 1px 变色边框与 quiet 细线不据此宣称 AAA。[W3C：Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)

### 当前值：每个值的定位与消费

| 值或入口 | 当前实现 | 定位与理由 |
|---|---|---|
| 外围新增焦点圈 | 不允许 | **推导**：用户明确禁止，外扩即违反 |
| Input / Card / Popover / bordered 的 border 宽度 | 1px，聚焦仍为 1px | **选择**：现有描边宽度；**约束**：用户要求只变色不加粗 |
| neutral 聚焦边框 | `--qy-ring` | **选择**：浅色 neutral-800、深色 neutral-300，分别与实际邻接面核对 |
| invalid Input 聚焦边框 | `--qy-danger-foreground` | **选择**：保留错误事实，当前只变色，不增加内描边 |
| `--qy-focus-ring-width` | 2px | **选择**：solid、Input 附属按钮、裸 Popover 入口的内线；非 AA 强制值 |
| `--qy-focus-quiet-width` | 1px | **选择**：quiet 自身盒内细线，组件局部接入 ring 宽度 |
| `--qy-focus-ring-on-solid` | `--qy-primary-foreground` | **选择**：neutral 实心填充的配对前景 |
| danger solid 的焦点色 | `--qy-danger-on-fill` | **选择**：与危险填充配对，不能误取 neutral 反色 |
| `--qy-focus-ring-color` | 默认 `--qy-ring`，solid 在部位内重新绑定配对色 | **选择**：与该部位的真实填充或局部承载面比较 |
| `--qy-button-bordered-border` | 默认 `--qy-border-input` | **选择**：浅色 50% 输入线强度；深色当前 44%，详见 §5 |
| `--qy-button-bordered-border-focus` | 默认 `--qy-ring`；danger 局部为危险文字色 | **选择**：只改变已有边框颜色 |
| inset 线的位置 | 贴着对象盒内侧，不参与布局 | **推导**：不能新增外围圈；具体 1/2px 宽度仍是选择 |
| 强制颜色 fallback 的通道 | `styles.css` 统一恢复 CSS `outline` | **选择**：系统会移除 box-shadow，需要仍可绘制的焦点机制 |
| 强制颜色 fallback 宽度 | `2px solid !important` | **选择**：可见回退宽度，不由 AA 唯一决定 |
| 强制颜色 fallback 位置 | `outline-offset: calc(-1 * var(--qy-focus-ring-width)) !important`，默认 −2px | **选择**：当前向内回退，服务于用户不外扩要求 |
| 强制颜色 fallback 颜色 | 不自行指定，由系统色接管 | **选择**：保留系统控制；不能从默认主题色推断其对比 |
| fallback 的优先级 | `!important` | **推导**：在当前层序中，base 普通声明不足以覆盖 utilities 的 outline-none |
| `--qy-touch-target` | 2.75rem，默认 44px | **选择**：库内粗指针目标，不是 AA 统一下限 |
| touch-target 宿主定位 | coarse 下 `position: relative` | **推导**：命中层须归属控件；自建上下文避免裸触发者把伪元素解析到视口 |
| 命中层宽 / 高 | 各为 `max(100%, var(--qy-touch-target))` | **选择**：既不缩小宿主，也覆盖选定目标值 |
| 命中层居中 | top / left 50%，translate −50% / −50% | **选择**：围绕宿主均匀扩展，不改变可见外高 |

Input 外层用 `has-[input:focus-visible]` 改色，实际输入不再单画第二个信号。它的清空/密码附属按钮当前仍用 2px 自盒内线，不能把 quiet Button 的 1px 值套写到这些原生按钮。裸 PopoverTrigger / Close 当前是透明占位 border 加 2px 自盒内线；与 Button 组合时应避免重复信号，实际组合另验。

Popover 面板**实际会获得焦点**：独立审查记录 Enter 打开后 Popup 匹配 focus-visible，见[逐值裁决第六节](2026-10-03-value-adjudication.md)。当前面板因此有 `focus-visible:border-ring`，只变色。静态 Card 默认 div 不强制可聚焦；render 成链接等真实焦点入口后才使用其边框信号。

强制颜色是正常主题机制之外的系统回退。现有三入口审查不能外推完整矩阵，完整强制颜色组合仍为 `UNVERIFIED`。检查必须用真实 Tab 触发 focus-visible，等过渡至少 500ms，再读取焦点部位、边框宽色、阴影与矩形；不能用脚本 focus 或候选对比页覆盖样式作为现状证据。

[WCAG 2.2 AA 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) 的目标尺寸基础要求为 24×24 CSS px，并有间距、等价、行内、用户代理控制及必要性例外。44px 是本库选择。命中层需实测不被裁切、不覆盖相邻目标或视口，调用方显式改宿主定位时也须复核。

## 16. 对比底线

| 对象 | 约束 |
|---|---|
| 普通大小文字，包括辅助文字 | ≥4.5:1 |
| 大文本（约 ≥18.67px 粗体 / ≥24px） | ≥3:1 |
| 必要控件识别、图形信息及焦点状态信息 | 与相邻颜色 ≥3:1，适用范围见 §15 |

半透明层量实际合成结果，浅深色分别测；不能拿 token 字面色或一组默认表面保证任意组合。静态 Card 装饰线不自动等同必要控件边界；Card 成为入口时的识别与焦点另验。默认主题的旧实测只覆盖当时的源码、表面与状态，不是本轮的浏览器 `PASS`。

## 17. 内容容量

空、零、未知与不适用是不同事实；各自使用可识别表达，按任务提供空态入口。截断或换行是按位置的**选择**；真实宽度、语言、图标、附属操作和文字放大共同决定容量上限，见 §1。

Button 允许标签换行，Input 让实际文本占剩余宽度；必要对象、范围与后果不得被唯一地藏进截断或会消失提示。检查替换数据、最长真实标签与 200% 放大后的识别和操作，不以单行作为全局合规条件。

## 18. 组合契约

| 关系 | 当前契约 |
|---|---|
| 相邻 | 同组单位优先读已有关系间隔，见 §3；组件不凭各自偏好增加外间距 |
| 嵌套 | 仅同一承载轮廓等距内缩才用 §4 的同心换算，负值退化；独立子对象保持自己的角色 |
| 分组 | 围合由独立身份与删去检验决定，重复机制不必叠加 |
| 继承 | 密度、方向、语言按实际祖先继承；Portal 要单独确认容器 |
| 让步 | 组合采用所在位置的已定义角色；尺寸与强调仍独立可选 |
| 危险后果 | 后果必须可见、在场且与按钮可关联；已有可靠表达无需重复专用包装 |
| 一致性 | 同一产品面不混用互不相干的圆角、重量与间距逻辑 |

### ButtonProtection 与外部说明的新契约

这是用户裁定的**约束**，实现由并行任务 B 负责。`tone="danger"` 满足以下任一条件即可：

1. 按钮位于 `ButtonProtection` 内。它接受非空 consequence，渲染可见后果段落，并把说明关联到按钮。
2. 按钮的 `aria-describedby` 指向页面中存在且文本非空的元素。可复用已在页面说清的后果，无需再加包装。

两者都不满足时，**开发环境抛错，生产环境不抛**。后一条是开发诊断契约，不让构建模式改变任务事实。存在非空 DOM 文本不自动证明说明可见、内容正确或对应当前对象；调用方仍须确保后果在场、可见并针对当前范围。确认步骤按风险与已有保护决定，ButtonProtection 不判断权限、不自行发请求、不强制二次弹窗。

本轮文档写入该契约，代码与测试验收由 B 的证据确认，不能仅凭本文记为实现 `PASS`。

## 现有基础层的核对边界

| 项 | 当前事实与后续边界 |
|---|---|
| 控件几何 | Button / Input 五档同名文字、10/12/14/16/16px 水平留白、桌面 4/5/6/6/7px 垂直余量已在当前源码接线 |
| 焦点 | 当前四试点按 §15 分部位实现；强制颜色与全部组合须按运行证据分别记状态 |
| 未消费角色 | row、部分 panel/section、marker/item、部分阴影与抽屉动效仍有定义；不声称它们已接管归档组件 |
| `--qy-topbar-height` | 56px，≤767px 时 54px；现存组件无直接消费，不据此推导站点实高 |
| 保留基础组件 | Field / Fieldset / Toast / Tooltip / Separator 仍有直接阶梯、局部值或高光；全部值按预设核对，不读取归档实现来补理由 |
| 未验证决定 | Card 默认阴影独立用途、G9 项目声明协议、完整强制颜色矩阵为 `UNVERIFIED` |

## Alternatives

尺寸与强调分轴，使重要但紧凑的入口、较大的保护入口都可表达。状态联合帮助区分等待与未知，但 boolean loading 也能由应用持有。危险后果可由共享结构或既有可见说明承载，专用包装不是唯一解。同心换算描述一条轮廓的几何，不替独立子对象决定圆角。

## Consequences

- 本次只修订基础层与下位文档，未改任何数值、代码或测试；实际外观变化由对应实现任务报告。
- STANDARDS 与四份族文档按本文同步，生成副本由统一重建更新。
- 旧组件数量、旧文字副本、旧 API 与待迁移行号不再充当当前事实；归档组件重写时重新建立任务与消费依据。
- 关系无法唯一决定的具体值保留其选择或预设定位，未来调整须说明真实消费部位并验证受影响组合。
