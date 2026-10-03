# RadioGroup 与 Select：单值选择重写

## Status

Decided（2026-10-03，J）。先写语义与关系，再从零编写代码。设计依据为根 [design.md](../../design.md)，实现接线遵守 [STANDARDS.md](../../STANDARDS.md)、[基础层](2026-10-03-foundation.md)、[逐值裁决](2026-10-03-value-adjudication.md)、[选择器族](2026-10-03-family-selector.md)与[表单族](2026-10-03-family-form.md)。不读取归档组件源码或冻结副本。

## 语义与选用

RadioGroup 表达少量可见候选中的互斥选择。人需要同时看见候选才能比较时，让选项留在页面中。Select 从候选取一个值，候选可收起；它不执行命令，也不切换内容视角。

约 5 项以内且需要比较时优先 RadioGroup。这是**选择**：常见设置的候选能在一小组中并置，不强迫人反复展开记忆；5 不是 design.md 的硬阈值。长说明、复杂比较可能在 3 项时就需要更大的比较结构，6 个短选项也可能适合并置。判断看真实内容和任务，不按数量自动换控件。

| 任务 | 选择 |
|---|---|
| 巡检频率：每小时、每四小时、每天，需要比较覆盖频率 | RadioGroup |
| 在已知区域列表中取一个所属区域，平时只需看当前值 | Select |
| 多选或独立是/否 | Checkbox；立即生效的设置用 Switch |
| 执行命令、切换视角 | Menu、Tabs |
| 很多候选、需要过滤或允许自由输入 | Combobox / Autocomplete；本批不实现它们 |
| 平台原生选择器、自动填充是任务关键 | NativeSelect；本批不实现它 |
| 必须比较复杂对象、后果与多列属性 | 应用比较结构；两者都不替代比较任务 |

## 状态与归属

| 事实 | 入口与归属 |
|---|---|
| 未选择 | RadioGroup 不给 defaultValue，受控可用 null；Select 使用 null。不会擅自选择第一项 |
| 明确选择空字符串或 0 | 真实候选有对应值和可读 label；不是占位状态 |
| 未知、不适用 | 应用用独立业务值及名称表达，不把 null 或 0 当未知 |
| 已选值 | 原语非受控状态，或应用受控；defaultValue 是真实初始选择 |
| 高亮项 | 原语指针/键盘位置，移动高亮不会提交 Select 的新值 |
| 展开、焦点、取消返回 | Base UI；Esc 关闭 Select 并返回触发者，值保留 |
| 无效、候选、加载、失败、结果未知 | 应用；Field invalid / 触发器 aria-invalid 只呈现显式事实 |

Select 是单值接口，不暴露 multiple；完整原语通过 SelectPrimitive 可访问。默认 modal=false 是**选择**：设置中的候选列表不需要阻断其余字段。候选加载或失败由调用方组合内容表达，不自动猜测空列表，也不清空仍有效的已选值。

## 解剖与组合

RadioGroup 提供组语义和状态；Radio 是单个圆形单选入口。现有官网消费方仍导入 Radio，因此保留这个真实消费入口，不新增同义别名。默认 render 为原生 button 且 nativeButton=true，是**选择**：让已选但禁用的圆点也真实退出 Tab 顺序；隐藏 input 仍由原语提供。改成非 button 须显式 nativeButton=false。FieldTitle 的 id 显式作为组的 aria-labelledby，各项由 FieldItem + FieldLabel 关联。FieldDescription 和 FieldError 保留就地结构，原语负责 aria-describedby 与隐藏 input。圆点之外的文字不复制为另一套标签组件。

Select 提供状态；SelectTrigger、SelectValue、SelectPopup、SelectItem、SelectGroup、SelectGroupLabel 提供必要部位。SelectPopup 组合 Portal → Positioner → Popup → List；container 支持项目显式指定继承环境。触发器由 FieldLabel 命名与激活，Esc 返回触发器，说明与错误仍由 Field 负责。items 提供值与名称映射，使关闭时也能辨认当前值；原语支持对象序列化与比较，不自行生成假值。

Base UI 1.7 实测将序列化为 "" 的值视为 placeholder。本批仅为显式空字符串修正 Value 的名称，以及 Trigger/Value 的 placeholder 状态、data 标记和消费方样式回调；不另持有选中状态、不编码业务值、不复制隐藏 input。items 的 record、数组与分组均可提供空值 label，显式 children 表达优先。原生表单仍可能把未选与空字符串均提交为 ""，required 仍按原语/浏览器约束工作；应用不得只靠 FormData 字面空字符串区分这两种 UI 事实。

## 表达与取值定位

| 部位 | 关系与机制 | 定位 |
|---|---|---|
| Select 五档 | 与 Input 同档外高、同名 text-control 文字、padding-bordered；窄屏读 -narrow，sm 回桌面 | **选择**；集中数值是既有**预设**，边框扣除是对齐换算 |
| 触发器圆角 | xs6 / sm7 / md–xl8，读现有角色；不新建值 | **选择**，遵守既定方整约束 |
| Select 焦点 | 既有 1px 边框只变颜色；invalid 聚焦保留危险文字色；无外环或第二条线 | 用户已定**约束** |
| Radio 外圈 | 圆形表达单选身份，不是方整文字控件的胶囊变体；始终保留边框，聚焦只变色 | 形状与识别机制是**选择**，不冒充理念唯一推导 |
| Radio 外径 | 读取同档文字行高，窄屏增加同档外高差；圆点为内部可用边长的一半 | 与标签关系的**选择**；行高与 +4px 为既有**预设**，一半也是选定比例 |
| Radio 选中 | 中心实心点 + aria-checked；不以颜色单独区分 | 状态可辨认是**约束**；点形是**选择** |
| 命中区 | Radio touch-target；Select 粗指针最小外高 --qy-touch-target | 44px 是本库**选择**，不声称 AA 统一门槛；实际组合需避免裁切/重叠 |
| 选项高亮 / 选中 | 高亮使用 accent；已选使用独立勾标与 aria-selected。可同时存在 | 两种事实分离来自语义；表达机制为**选择** |
| 浮层 | raised 表面与现有 overlay 圆角；边框用于区分与承载面同色的候选范围，无默认阴影 | **选择**；不改 Card、不新增阴影值 |
| 入退场 | select-popup slot 接入 motion.css，组件只提供 transform-origin | 所有权已定；时长、scale、opacity 是共享**预设** |
| 层级 | Portal 自然绘制顺序，无 z-index token 或数值 | 用户要求；与其他有层级的浮层并置遮挡仍 **UNVERIFIED** |
| 关系间距 | 组内 field-gap；候选行用 control-md-padding，面板内缘 space-1；浮层默认贴锚点（sideOffset=0，可传入） | **选择**，不把阶梯值写成关系唯一解；0 是无额外间隔 |

Select 行项允许长词与名称换行；触发器用最小外高，可随多行文字增长，不把重要名称唯一藏在截断中。边框、禁用透明度、反馈色、圆角与文字数值均来自当前基础预设。组件无新 token；仅为尺寸档接线使用局部变量。

## 验证与范围

检查受控/非受控、取消值变化、未选择/空/零、禁用/只读、键盘方向与 Select Home/End、类型搜索与 Esc、Field 标签/说明/错误、真实 FormData。Base UI Radio 明确关闭 Home/End，只以方向键导航，不提供类型搜索或 Esc 关闭语义。Select 禁用项可以高亮供辨认，但 Enter 与点击都不能选取；不把高亮等同可选择或强行跳过原语行为。

桌面 ≥1100px 串行检查浅深色真实情境、真实 Tab 焦点、过渡后几何/边框/对比、候选高亮与选中、失败后草稿。组件保留既有窄屏尺寸接线，不新增移动页面适配或390px检查。结果见[J 报告](../implementation/2026-10-03-batch4-j-selectors.md)。

新实现改变归档版本的视觉/API，不承诺保留其外观；具体 API 以本批导出和 metadata 为准。生成 catalog/AI/registry、包构建与发布由主任务汇总完成。本批仅运行 gen:index，不修改来源记录；应删除旧 radio-group.tsx 与 select.tsx 的派生来源条目，由主 agent 统一处理。
