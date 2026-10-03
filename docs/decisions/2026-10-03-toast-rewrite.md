# Toast：不中断的通知与持续的任务事实

## Status

Decided，2026-10-03。设计依据仅为根 [design.md](../../design.md) 的随境取度、名实相符、进退相承、NG7 与文案判据。基础层与动作/浮层族文档记录当前约束和预设，不作为旧组件实现来源。

## 语义与关系

Toast 补充工作面之外的短消息，不抢焦点、不要求回应。可以只用 Toast 的事实是可恢复、非关键且无需持续决策的通知，例如已复制一个可再次复制的链接、后台生成了可再次到达的报表。失败不必一律打断，但字段校验、付款或删除结果、权限撤回、需要作决定的失败必须在对象所在工作面持续呈现；需阻断继续时用明确的确认结构。将这些事实只放进通知违反 NG7，即使通知设置为持续，它仍可被关闭、被 limit 隐藏或因离开页面消失。

状态事实由应用持有。`waiting` 是排队等待；`in-progress` 是应用已确认开始执行；`unknown` 是缺少可靠结果；`failed` 是已确认失败；`success` 是已确认成功。`loading` 作为现有兼容入口表示进行中，`error` 表示失败，`info` / `warning` 表示补充/注意事实。未知既不等于失败，也不等于完成。Promise resolve/reject 是应用提供的结果；仅有网络中断不应被应用直接判为业务失败。

同一对象用 id 原位更新。关闭只关闭通知，不撤销、不取消后台任务；Action 由应用提供，并保持对象的持续落点。

## 时限、暂停与播报

| 事实 | 本次选择 | 依据与数值定位 |
|---|---|---|
| 普通补充 / 已确认成功 | Provider 默认 5000ms；允许逐条 timeout / 0 | 这是阅读时限**预设**，不是理念推导。Base UI 在悬停、键盘焦点或窗口失焦时暂停消失计时，离开后续计。 |
| 等待 / 进行中 | 不自动关闭；loadingTimeout 默认 30000ms 后转持续 unknown | 保留已公开的期限契约，30000ms 是**预设**。期限衡量可靠结果尚未到达，不受悬停暂停；不推出失败、成功或取消。 |
| 失败 / 未知 | timeout 强制为 0，直到关闭或真实更新 | **选择**：保留核对和恢复时间。仅改 timeout 不能消除失败事实；应用先用真实结果改变 type。 |
| 后续真实结果 | 可由 update 或 Promise 覆盖 unknown；成功回到 Provider 阅读时限，失败仍持续 | 不让过期回调覆盖同批到达的真实结果；保留原对象标题/说明，超期说明只在呈现层加入。Promise 成功回到 Provider 时限；手动 update 需显式指定结果 timeout。应用确认的新等待阶段重新计时，不继承上次超期。 |

默认所有类型均礼貌播报，失败本身不自动要求打断。低优先级消息文本使用 `role=status`、`aria-live=polite`、atomic；Viewport 的整区播报关闭，操作入口不随文字重复播报。应用明确传 `priority=high` 时使用 Base UI 自带的 `role=alert` 播报；通知根为可聚焦 group，保留 F6、Esc、暂停和返回行为。用户主动聚焦高优先级通知后由文本承担播报。超期生成的未知说明仍通过 status 播报。实际辅助技术朗读需单独验证，DOM 角色测试不能冒充实体读屏验收。

## 当前预设的逐项处置

| 现状（基础层记录） | 处置与理由 |
|---|---|
| loading 默认 30000ms 后持续 unknown | **保留并重写机制**：按同一等待阶段计时；不改应用的标题/说明，晚到真实结果仍能恢复；非法计时值抛 RangeError。 |
| 局部堆叠、压缩与缩放 | **删除**：选择完整纵向通知列表，不靠悬停恢复被遮盖文字。limit 仍交给原语，超额根隐藏且 inert；重要事实必须在页面。 |
| 局部阴影 | **删除**：本次选择 raised 表面与已有强边界，不增加未经证明的第二层范围机制。 |
| 伪元素高光 | **删除**：删去不损害识别、执行或恢复。 |
| 局部入退、成功/错误重播动画 | **删除**：复用 motion.css 的 `data-motion=fade-in` 原位进入；退出移除该动效并即时结束。进入180ms为共享预设，退出0ms为本次选择，快于进入。reduce / keyboard 的共享规则接管；文字事实不依赖动态效果。 |
| anchored | **保留**：非关键局部反馈确有对象关系；Base UI Positioner 承担锚定与碰撞。tooltipStyle 只收紧内缘，仍显示全部说明与关闭入口，不把通知变成唯一关键后果。 |

## 表达与公共边界

仅消费已有角色：surface-raised、foreground、foreground-muted、border-strong、radius-overlay、panel-padding-sm、action-gap、space 阶梯、控件图标及完整 body/support 文字档。边界是本次识别**选择**；配色、间距、圆角和字重值均为基础层**预设/选择**，不是 Toast 独立推导。暂取完整内容的 max-content 宽度、视口减两侧 space-6 的上限、纵向滚动列表和 z-50；这些都是布局**选择/预设**。不增加 token、不复用品牌/明暗轴。

Close / Action 组合本库 Button：quiet 的盒内细线、bordered 的边框变色与五档/narrow/token 透传由 Button 拥有；根已有边框聚焦只变色不加粗。强制颜色回退由 styles.css 提供。

保留 `ToastProvider`、`AnchoredToastProvider`、两个 manager、`ToastPrimitive`、两种 Provider Props 和 ToastPosition 的名称与类型。未删除导出。行为变化：失败/未知不能用 timeout 自动消失；列表不压缩；tooltipStyle 不再隐去说明；删除成功/错误重播动画及阴影高光。上述是明确的行为/视觉变化，不称为无影响重构。

## 读取边界与验证计划

现有 toast.tsx 仅通过 TypeScript AST 提取声明名、参数/props 类型与导出；不输出或参考函数体、className、样式。未读取归档组件源码或 provenance-freeze。现有本库 toast.test.tsx 用于用例意图与兼容要求；Base UI 1.7.0 的已安装声明和原语代码用于核实行为，官方 [Toast 文档](https://base-ui.com/react/components/toast)仅核对公共能力，未使用其视觉示例。

单元验证所有状态播报、时限、暂停、关闭、Promise 正常/失败/未知及迟到结果、焦点与 anchored。桌面≥1100px 验证真实报表操作链、持续关键后果、浅深色、真实Tab与减少动态效果。生成物、build、390px、提交与来源记录删除均 NOT_RUN，统一交主 agent。
