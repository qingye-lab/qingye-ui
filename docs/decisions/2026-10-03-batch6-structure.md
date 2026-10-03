# 第六批：名称、提交与成组结构

## Status

Decided（2026-10-03）。依据根 `design.md` 的名实相符、相成相制、布白有用与进退相承，`STANDARDS.md`，基础层 §1–5、§8–9、§15、§18，以及表单族、动作族。仅从当前重写后的公共组件与 Base UI 公共 API 组合，不读取归档、冻结或上游组件。

## 语义先于表达

| 组件 | 真实职责 | 关系与边界 | 状态归属 |
|---|---|---|---|
| Label | 原生 label 为一个 labelable 控件命名 | `htmlFor` 或原生嵌套；Field 内优先 FieldLabel，不另造注册协议 | 名称与对象由调用方给出；浏览器负责标签激活 |
| Form | 原生提交范围与重置上下文 | 保留原生 onSubmit、onReset、FormData、noValidate、ref 与 render；就地错误用既有 Field 组合 | 草稿、错误和提交结果归应用；平台持有约束有效性；库不请求、不推断事实 |
| InputGroup | 输入与附件共用编辑边界 | InputGroupInput 复用 Input 的 unstyled 出口；Addon 不获得 tabIndex、不拦点击、不替输入抢焦点 | 输入与 Field 保持原状态；附件操作使用现有 Button |
| NativeSelect | 平台原生值选择 | 保留 select、option、optgroup、multiple、原生数字 size 与表单值；Field 用 FieldControl 的 render 公开组合 | 浏览器持有非受控选择，应用可受控；disabled / required 是原生事实 |
| Group | 位置关系与间隔 | 复用 Inline / Stack；默认无 ARIA 角色，无边框、无成员状态传播 | 方向和间隔由调用方选择，成员仍独立 |
| ButtonGroup | 同一范围的动作成组 | Group + `role="group"`；调用方命名范围，每个 Button 仍有自己的动作名称与状态 | 不选择按钮、不发明 roving tab、不代表工具栏或选项集合 |

`Form` 只承接原生 onSubmit 与平台表单语义。应用通过 FormData 读取全部真实表单值；没有 onFormSubmit、errors 聚合、发送函数、成功态或草稿持久化入口。应用显式给 Field.invalid 与 FieldError.errors/children；外部错误可以随当前值共处，无需另一个表单状态上下文。

初次精准测试证明安装的 Base UI Form 默认 noValidate 并自行调用字段 validate，原生提交取消也未阻止其 onFormSubmit；空内容的当前 FieldError 也不会自动显示其 errors 上下文。该自动协议不符合当前显式 Field 契约。因此经主 agent 裁定改用原生 form + useRender / mergeProps，没有修补拦截器、内部原语依赖或第二套错误协议。保留原生 constraint validation 不是库猜测校验事实；noValidate 仍由调用方选择。

NativeSelect 的 `controlSize` 采用 `xs / sm / md / lg / xl`，选择几何与文字档；原生数字 `size` 保留平台显示行数。`multiple` 或多行 size 不强制单行高度。单值 NativeSelect 在 Field 中使用 `FieldControl render={<NativeSelect />}`；多值数组直接使用原生 select 与 Label / FieldTitle 显式名称关联，不把 input 原语的字符串值协议冒充数组注册。

## 表达取舍与数值定位

- Label 读现有 `text-label` 与前景色；具体字号、字重是基础层预设，长名称允许换行。
- Form 不附加布局或围合。字段关系由 FieldGroup / Fieldset / Group 等已有组合承担。
- InputGroup 与 NativeSelect 使用当前输入角色：浅色 card、深色 surface-inset、1px 输入边界。边界机制是选择；1px 是基础层既有选择，不是设计理念唯一结果。
- 两者五档外高、窄屏 +4px、同名文字档、水平留白、圆角、disabled opacity 与快反馈时长均读现有角色；值沿用基础层的预设/选择定位。
- InputGroup 内部可用高度服从外高减上下边框的关系；Input 的 unstyled 已消费这一换算。附件与输入无第二条围合。聚焦输入只变共同边框颜色，invalid 仍为危险色；附件 Button 保持自己的盒内焦点机制。
- NativeSelect 保留平台下拉箭头和平台菜单，不重画浮层、选项或关闭逻辑。聚焦只变现有边框颜色；外部不增加 ring、shadow 或 outline。
- Group 复用既有关系间隔；ButtonGroup 默认 action-gap。开放间隔是选择，不把相邻独立按钮假装成一条轮廓。
- 不新增 token，不新增内置文案，不写品牌/明暗/密度轴。

## InputGroup 容量修正

主 agent 在唯一浏览器会话确认初版 `FAIL`：320px 根，短附件 42.25 / 56px、输入 219.75px，scrollWidth 318px；将前附件换成长连续文本后，附件 318 / 56px、输入 26px（只有 padding）、scrollWidth 374px；两侧都为长连续文本时 scrollWidth 734px。仅给每个附件 max-width:100% 没有建立共同容量关系，且 shrink-0 拒绝让出编辑空间。

修正只落本组件：Addon 可收缩，wrap-anywhere 将连续字符纳入断行；根允许按 DOM 顺序换行，始终保留共同边界与原有名称/焦点链；输入 wrapper 最小内联容量为 `min(100%, 2 × 当前档 bordered padding + 4em)`。两侧 padding 读现有 control role，**4em 是局部普通文本容量的选择/预设**：保留至少四个全宽字符的可编辑窗口，窄于该容量时以可用整行宽度为限，不由理念唯一推导。附件共享剩余空间，不各自领取一个百分比配额；组合不足时换行，而不是只留下输入 padding。没有新增全局 token、几何 API 或其他页面修补。

`InputGroupInput.controlClassName` 仍是显式覆写入口；附属动作保持自己的真实名称和焦点。搜索/密码内部附属部位由当前 Input 组合承接，其极窄容量仍须按真实组合检查，不能把普通文本窗口冒充所有组合都已验收。

主 agent 复用原浏览器确认本次修复 `PASS`：320px 短附件仍为输入 219.75px / scrollWidth 318px；单侧长附件、双侧长附件均为输入 318px / scrollWidth 318px；200px 双长附件为输入 198px / scrollWidth 198px。断行保持 DOM 顺序，所测组合无水平溢出。本证据只覆盖上述容量情境，不外推焦点/对比或全部内部附属形态。

## 可观察验收

精准行为测试覆盖标签名称/焦点、Form 真实值与字段失败后草稿保留、InputGroup 的值与附件焦点顺序/禁用、NativeSelect 原生 optgroup/multiple/禁用/表单数据，以及 Group / ButtonGroup 原生 render/ref/事件与独立成员禁用。源码检查不能代替浏览器 computed 尺寸、焦点颜色/边界、触屏命中、浅深色对比与平台移动选择器；这些由主 agent 统一验收。
