# 动作与反馈族判据

## Status

Decided for Button / ConfirmAction（2026-10-04，确认组合按第十二批实现）；本次仅同步 ConfirmAction 及其相关状态事实。依据根 [design.md](../../design.md)、[基础层](2026-10-03-foundation.md)、[组件分层](component-layering.md)与[第十二批决定](2026-10-03-batch12-confirm-upload.md)。

本批新增 ConfirmAction，复用当前 ButtonProtection 与 AlertDialog/Input/Field。其它族成员的状态未在本次核对，本文历史“待重写”条目不作为今日 inventory；当前能力读各组件源码与所属批次报告。具体数值区分选择与预设，不从旧实现推出设计要求。本文记录契约，不代替运行验收。

## 一、这一族处理什么真实问题

动作让人触发改变，反馈让人知道发生了什么。发布、删除和停止都须有清楚对象与范围；等待、失败和结果未知也须能指回同一对象。动作不自称结果，反馈不替代决定前的必要后果。

## 二、参与的方法

| 方法 | 本族的约束 |
|---|---|
| 名实相符 | 名称表达对象与动作；成功、失败、未知按事实区分 |
| 相成相制 | 动作、说明与保护互相支持；视觉强度不代理权限 |
| 进退相承 | 等待、失败、取消和恢复围绕同一对象 |
| 随境取度 | 根据位置与任务选择尺寸、强调和命中区域，保持动作语义 |

方法按任务使用，不把固定外观档位或每处重复警告当作要求。

## 三、关系约束与接口选择

### 决定 1：事实由应用持有

Button 不掌握请求结果，也不启动请求。应用传入 boolean loading 也符合此关系，不能仅因布尔类型判为归属错误。

当前 Button **选择** `state: idle | waiting | in-progress | unknown | failed`。联合便于区分不同事实，未被理念强制；unknown 是缺少可靠结果，与等待或已确认失败不同。当前 busy 与 unknown 阻止再次触发，failed 不自行重试；成功由应用在对象处表达。

> **2026-10-10 修订（用户裁决「功能要纯粹」）**：Button 的状态联合已收敛为布尔 `loading`，只表示忙碌；等待/失败/结果未知不再由按钮呈现，改由 Alert、Toast、FieldError、StatusDot 表达。ConfirmAction 的 `state` 同步改为 `loading`。本文中关于状态联合与按钮旁状态文字的叙述是历史记录，现行契约见基础层「2026-10-10 功能纯粹：本次梳理的处置」。

### 决定 2：尺寸、强调和危险语义独立

size、variant、tone 分轴，表达不同决定。危险是应用声明的后果语义；填充更强不获得权限。尺寸可参与强调，例如便于到达的保护入口，但须有任务理由，不能一律禁止。

### 决定 3：危险后果必须可见、在场且可关联

这是**约束**，不是「每次加一个专用包装」。页面已可靠表达后果时复用该说明；否则提供可见说明与所需保护。名称说清动作不能代替关键不可逆影响，关键后果也不能只放在会消失的 Tooltip 中。

ButtonProtection 与外部 aria-describedby 两条路径见第六节。确认针对当前对象、范围以及适用的版本和变更；是否需要二次确认由任务决定，Button 不自行判断。

### 决定 4：反馈能指回对象

字段错误、在场对象的失败优先就地表达，不能由会消失的全局通知承担唯一恢复依据。跨页面或后台结果可用 Toast，内容须说清对象；现有 anchored Toast 是当前能力，不因锚定就自动保证信息持续可见。

Toast 的 loading 默认 30000ms 后变为持续 unknown，保留对象内容；截止时间是**预设**，不代表服务端失败。关闭通知不等于撤销操作。

### 决定 5：进度来自真实分母

有可靠完成比例才用确定进度，否则表达不定进度或已知的等待事实。计时器与动画不提供完成证据。Progress 系列目前已归档，本节是重写契约。

## 四、本族的单元构成

| 分组 | 当前 / 目标成员 | 定位 |
|---|---|---|
| 动作 | 当前 Button；ButtonGroup、Toggle、ToggleGroup、CopyButton 待重写 | 触发动作的原语与组合 |
| 保护关系 | 当前 ButtonProtection 与 ConfirmAction Pattern | 后果关联、当前快照确认、失效后重新阅读与返回 |
| 就地反馈 | Alert、PendingValue 待重写 | 在场对象的事实 |
| 通知 | 当前 Toast，含 anchored 入口 | 应用给出的通知事实 |
| 进度 | Progress、ProgressCircle 待重写 | 已确认进度 |
| 代码展示 | CodeBlock 为拟议 Pattern | 组合内容与复制动作 |

StatusDot 归展示族：它表达对象状态，动作族可以消费它，不把它当触发器。

## 五、Button 的当前声明

| 声明 | 当前契约 |
|---|---|
| 对象 | 调用方给出内容、名称、后果与适用范围 |
| 状态 | 呈现传入事实，不拥有请求结果 |
| 名称 | 使用动作与必要对象，不用「确定」代替实际动作 |
| 共处 | danger 的后果可由 ButtonProtection 或已有说明关联 |
| 适应 | 几何与强调按任务调整，保留语义、状态与可访问名称 |
| 失败 | 显示已确认失败；不自行重试、清草稿或宣布完成 |

### 三档呈现与 bordered 的来由

| variant | 默认边界机制 | 聚焦信号 | 定位 |
|---|---|---|---|
| `solid` | 填充承担范围，无默认边框或外投影 | 填充内侧 2px 配对反色线 | **选择**，可强调主动作或有任务理由的保护动作 |
| `bordered` | 浅色白底，1px 线承担范围；深色读卡片面 | 原边框只变色、不加粗 | **选择**，来自用户「和背景色一致时才保留边框」 |
| `quiet` | 默认透明，内容识别入口 | 自身盒内 1px 细线 | **选择**，不意味着不重要 |

当前 tone 为 neutral / danger，与三档独立组合。neutral bordered 的 `--qy-button-bordered-border` 引用 `--qy-border-input`，聚焦 `--qy-button-bordered-border-focus` 引用 `--qy-ring`。浅色 50% 黑色与输入线同强度；深色源码当前为 44% 白色。danger bordered 局部取危险文字色 50% 合成，聚焦为不透明危险文字色，真实对比按承载面测量。

2px / 1px 焦点宽度为**选择**，不是 AA 的统一下限；强制颜色由 styles.css 统一回退，详见基础层 §15。disabled 的 opacity-64、solid hover/pressed 的 `/90` 都是**继承预设**，不以其来源冒充推导。

### 五档尺寸

Button 的 xs/sm/md/lg/xl 分别使用同名 text-control 档；桌面外高 24/28/32/36/40px，行高 16/18/20/24/26px，每侧垂直视觉余量 4/5/6/6/7px。窄屏外高各 +4px，行高 20/20/22/24/28px。外高与文字值是**预设**，余量由二者换算；lg/xl 不再借低一档文字造成 8px 余量，详见基础层 §2、§8。

shape 为 label / icon，独立于 size；图标居中按档案换算。小入口的 touch-target 自建定位上下文，粗指针扩大命中层，不能覆盖邻居或视口。

> **2026-10-10 用户裁决：本文决定 3 与下面第六节已撤销。**「功能需要纯粹，比如 button 不应该承载警告等作用，这种场景应该使用弹框。」Button 不再校验或承载后果，`ButtonProtection` 移除；后果写在 AlertDialog / ConfirmAction 的对话框说明里。现行契约见基础层「危险后果：归对话框，不归按钮」。以下原文保留为历史记录。

## 六、ButtonProtection 的新契约

用户裁定 danger Button 满足任一即可：

| 路径 | 条件与职责 |
|---|---|
| A：共同结构 | 按钮位于 ButtonProtection 内；consequence 非空，结构渲染可见后果段落并关联按钮 |
| B：已有后果 | 按钮 aria-describedby 指向页面中存在且文本非空的元素；复用已在场的后果，不重复专用包装 |

两者都不满足时，**开发环境抛错，生产不抛**。诊断检查存在与非空不等于已验证可见性或说明正确，调用方仍须确保后果可见且对应当前对象。ButtonProtection 只承担共同结构与关联，不判断权限、不发请求、不强制二次确认。

```tsx
<ButtonProtection consequence="删除设备后，其历史记录无法恢复。">
  <Button tone="danger">删除设备</Button>
</ButtonProtection>
```

```tsx
<section>
  <p id="device-removal">删除设备后，其历史记录无法恢复。</p>
  <Button tone="danger" aria-describedby="device-removal">删除设备</Button>
</section>
```

ConfirmAction 已作为当前 Pattern 导出，是否使用仍按实际保护任务决定。本文不新增 Button consequence 属性。

### ConfirmAction 当前快照契约

snapshot 明确 objectId/objectLabel/version/change/consequence。打开时复制并冻结已读事实，当前任一字段或确认文字条件变化使旧认可失效；可见状态说明与“重新阅读”更新快照并清空旧输入。数据恢复成旧值不自动复活认可。可选 confirmationText 与可见 confirmationLabel 通过 Field/Input 准确匹配；没有任务依据不强制所有确认都输入文字。

onConfirm(snapshot,event) 只请求动作。组件不发网络、不等待 Promise 推断成功、不自动关窗；受控打开拒绝与事件取消都不产生结果。应用提供 state 与 disabled，waiting/in-progress/unknown 阻止重复动作。返回/关闭只退出本界面，不宣称已取消后台操作。AlertDialog 提供模态与触发焦点返回，ButtonProtection 保持所确认后果可见并关联，尺寸/文字/焦点消费既有角色。

同批 FileUpload 只改变本地已接受集合；本地移除不代表取消上传或删除服务端文件。上传 waiting/in-progress/failed/unknown/success 标签、可靠进度分母与恢复动作均由应用明确提供，组件不凭 Promise 或动画推断。

## 七、评审检查

| 错误 | 检查 |
|---|---|
| 等待结束或超时就自称成功 | 请求无可靠响应时保持等待或未知事实 |
| 用视觉强度代理权限 | 强调调整不改变授权事实 |
| 后果缺席、不可见或无法关联 | 两条合法路径分别检查；空文本、失效 ID 与缺少两路径的开发诊断另验 |
| 全局通知承担唯一字段恢复 | 通知消失后字段仍能定位错误并恢复 |
| 假进度或动画结束置完成 | 关闭动画后事实与任务仍成立 |
| 尺寸只增高、未接同名文字 | 五档行高与余量按当前档案核对 |

## 八、与基础层的关系

消费 §1、§2（几何与尺寸）、§5（识别与条件边界）、§7（颜色语义）、§8（同名控件文字）、§9（事实归属）、§10（强调分轴）、§11（交互反馈）、§12（动效所有权）、§15（焦点与命中）、§16（真实对比）、§18（后果关联）。所有编号指向[基础层](2026-10-03-foundation.md)。本族不另定数值。

## Alternatives

联合状态是当前接口选择，boolean loading 不因类型而违背理念。三档按边界机制区分，不固定编码主次。已有后果可用 aria-describedby 关联，专用结构用于确需共同组织的情境。Button 不承担业务确认或授权；当前 ConfirmAction 承担已读快照确认，也不拥有权限和操作结果。

## Consequences

- Button 已有三档、独立 tone、五档同名文字与状态联合；后果关联诊断的新契约由 B 实现并验证，不能只凭文档记 PASS。
- 新契约须验证共同结构、外部非空说明、空/缺失说明，以及开发/生产差别；本任务不改测试。
- Toast 仍有局部视觉与动效预设，职责规范不表示全部保留用法已重写。
- ConfirmAction 的全部快照字段失效、重新阅读、事件取消、受控拒绝、busy/unknown 与返回焦点已有定向行为证据，真实模态/浅深仍由主任务验证。其它成员状态不在本次同步范围；不沿用旧文件行数、旧示例数量或旧实现取值作为当前依据。
