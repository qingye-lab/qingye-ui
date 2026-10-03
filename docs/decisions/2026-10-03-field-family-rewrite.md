# Field / Fieldset / Separator 独立重写

## 状态与依据

Decided（2026-10-03，先于本批实现落盘）。本次任务明确重写三个仍派生自上游的文件；不保留其实现。依据根 `design.md` 的语义→关系→表达顺序、`STANDARDS.md`、基础层 §3/§5/§8/§9/§16/§18、表单族判据及当前用户裁决。

表单族文档的“保留现有 FieldError 实现”在本任务中由独立重写要求覆盖。错误文案只接受调用方内容，不读取原语自动生成的错误。`invalid` 默认 `false`，由调用方明确声明；错误内容、required、输入值或 blur 均不替调用方判定无效。

实现期的契约探针发现：安装版原语在 `invalid=false` 且 `validationMode=onBlur` 时仍会从原生约束推成 `aria-invalid=true`，仅传 false 不足以履行本任务。本批因此删除 Field 的 `validate` / `validationMode` / `validationDebounceTime` / `actionsRef` 自动校验入口，以默认 onSubmit 模式避免编辑中自动校验；通过 [mergeProps 的 preventBaseUIHandler](https://base-ui.com/react/utils/merge-props) 阻止 native invalid 事件改变原语状态，保留调用方事件和浏览器约束（不 preventDefault、不 stopPropagation）。应用用自己的校验过程分别传结果与内容；完整的原语自动校验在 `FieldPrimitive` 出口。当前审查页、FocusFallback 与 Input 示例不使用被删除的属性；字段页旧校验示例改为应用在原生 form 中读取 validity 后传入 invalid 与错误。与具有自动校验的 Base UI Form 组合不属于本批已验收的应用管理路径，完整使用原语组合时由原语管理状态。

公共行为依据 [Base UI Field](https://base-ui.com/react/components/field)、[Fieldset](https://base-ui.com/react/components/fieldset)、[Separator](https://base-ui.com/react/components/separator) 与安装版 `@base-ui/react@1.7.0` 的公开声明。在线文档当前为 1.8.0；实现以安装版类型和实测为准。不读取这些原语的实现或示例 CSS。

## 语义与关系

| 导出 | 存在理由与边界 |
|---|---|
| `Field` / `FieldOrientation` | 同一个值的名称、控件、说明和错误共处。纵向编辑与横向二值选项是已使用的两种关系；方向不改变关联或草稿。 |
| `FieldLabel` | Base UI Label 命名已注册的控件；支持显式 htmlFor。不以 placeholder 代替。 |
| `FieldDescription` | Base UI Description 关联帮助理解该值的事实，进入 aria-describedby。 |
| `FieldError` | 调用方提供的就地错误。children 优先，errors 忽略空项、按原顺序去重；多条用列表。无内容不渲染，不补浏览器或服务端文案，不推断 invalid。默认显式显示给定内容；match 保留原语过滤入口。字段外可显示给定内容，但不能自动关联别处的控件。 |
| `FieldContent` | 横向字段的可收缩内容列，让名称和说明换行而保留另一列的控件。 |
| `FieldTitle` | 普通文字标题，不是 label。用于控件自行命名、未知或不适用等无输入框的事实；需要命名复合控件时调用方显式 aria-labelledby。 |
| `FieldGroup` | 字段之间的关系间隔；只组织位置，不虚构共同名称或围合。 |
| `FieldSeparator` | 字段组已有明确分界时使用。无文字直接复用 Separator；有文字时文字表达关系，两侧线为装饰，不增加两个语义 separator。 |
| `FieldItem` | Base UI Item 为同一 Field 内的具体控件与其标签提供局部关联；不是通用布局或可选标记容器。 |
| `FieldControl` / `FieldValidity` / `FieldPrimitive` | 自定义控件注册、读取原语状态和显式采用完整原语 API 的出口。Control/Validity 直接转出，不再包第二个注册层；自动校验须完整采用原语组合，不把它的状态归属与调用方管理的 Field 混合。 |
| `Fieldset` | Base UI Root 提供相关字段的共同范围和整体禁用；共同名称不代替各字段名称。 |
| `FieldsetLegend` | Base UI Legend 命名字段组。默认使用真实 legend，经 render 保留替换入口；legend/label 文字档分别适合分节和共同问题。 |
| `FieldsetPrimitive` / `SeparatorPrimitive` | 遵循本库原语出口规则，供明确的公共组合使用。 |
| `Separator` | 两组内容之间的关系分界。默认 role=separator；decorative=true 使用 presentation 与 aria-hidden，不承担语义。方向由实际布局选择，没有拖动或焦点行为。 |

不导出 `FieldSet` / `FieldLegend`：它们是大小写/简称别名，在当前审查页、FocusFallback 和 Input 示例中没有独立任务依据。统一入口是 `components/fieldset` 的 Fieldset / FieldsetLegend；明确记录此 API 删除。

## 表达与数值来源

| 部位 | 入口 | 来源与调整边界 |
|---|---|---|
| 字段内部、横向内容列 | `--qy-field-gap` | 关系要求名称、说明、错误与控件共处；8px 是基础层已有预设，不由理念唯一推出。 |
| 字段之间、字段组 | `--qy-field-group-gap` | 与字段内部是不同关系；20px 是已有预设。Fieldset 不新增一层边框或卡片。 |
| 标签与事实标题、共同问题 | `text-label` | 名称角色；字号、行高、字重是集中预设。 |
| 描述、错误、分隔文字 | `text-support-mobile sm:text-support` | 辅助事实；同档保留错误可读性，不缩成装饰档。 |
| 分节共同名称 | `text-heading` | 分组层级；具体文字值是预设，variant=label 改用名称档。 |
| 描述/正文/错误 | `text-muted-foreground` / `text-foreground` / `text-destructive-foreground` | 分别承载辅助、名称和调用方错误；普通大小文字在真实承载面 ≥4.5:1。 |
| 分隔线 | `border-border-strong`，1px border | 分界角色需可辨认，强边界为已有预设；1px 为本次线条表达选择，不称为设计推导。必要非文本在实际承载面 ≥3:1。 |
| 多条错误的列表标记缩进 | `--qy-space-4` | 列表标记需要自己的空间；16px 是已有阶梯预设，未新增关系 token。 |
| 容器宽度、收缩与重置 | full、min-width:0、flex、0 padding/margin/border | 结构约束，不是新的尺度 token。分隔线的长轴跟随容器，短轴由 border 绘制。 |

本批不新增 token，不新增组件内置文案，不改变焦点实现。没有借助旧组件、归档组件或冻结来源推导样式。视觉基线会变化：字段组统一消费 field-group-gap，Legend 默认是真实 legend，分隔线采用强边界；这些是明确的表达/API 变化，不藏在 refactor 中。

浏览器确认真实 legend 不参加 fieldset 的匿名 flex 内容盒：只设 gap=20px 时，legend 到第一字段实际为 0。组根通过直接子 legend 的 margin-bottom 接同一个 field-group-gap，其他元素替换仍由 flex gap 负责。间隔由组根拥有，没有给 Legend 部件另造独立 margin 值。

## 来源清单处置

三个文件由上述任务与原语公共 API 独立编写，删除文件头上游声明并从 coss-source.json 删除它们的对应记录；其他记录和声明原文保留。不因此删除 THIRD_PARTY_NOTICES.md。

本批边界完成后应保留的上游派生文件为：

- `src/components/toast.tsx`
- `src/components/tooltip.tsx`
- `src/hooks/use-copy-to-clipboard.ts`
- `src/hooks/use-media-query.ts`

清单是本批的预期边界；最终 grep 实际结果和并发变化记在执行报告。来源台账含已归档组件的历史记录，本批不清理这些记录或重算历史汇总。

## 验收契约

标签可 getByLabelText 查询；说明和显式错误共同进入 aria-describedby；传入错误或编辑格式错误的值均不自动改变 invalid；显式 true/false 能切换并保留输入。字段组由 legend 命名且整体禁用。Separator 语义和装饰路径分别可观察。横向、自带名称、无输入事实、空错误、错误去重、原生属性/ref/render/className 透传覆盖正常与替代路径。

审查页在浅深色 × 桌面/390px 串行浏览器检查，记录键盘关联、实际 token 消费、文字/边界对比和控制台；辅助技术实际朗读另记未运行。生成物不属于本批，不重建或修补生成物相关测试。
