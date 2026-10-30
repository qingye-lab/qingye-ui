import type { ComponentMeta } from "@/lib/types";

export default {
  title: "异步确认 Confirm", titleEn: "Confirm",
  description: "等待一次明确决定，再由调用方继续执行。", descriptionEn: "Await one explicit decision, then let the caller continue.",
  category: "反馈", source: "local", layer: "pattern", exports: ["ConfirmProvider", "useConfirm"], keywords: ["confirm", "await", "确认", "异步", "Promise"],
  decisions: "await confirm(options) 只返回是否同意；true 不表示提交成功。已有决定在进行时，后续调用排队，前一个结束并退场后再依次打开，各自的 Promise 各自结算；false 只表示决定者拒绝。涉及对象、版本或变更失效时使用 ConfirmAction。",
  decisionsEn: "await confirm(options) returns approval only; true does not mean a submission succeeded. While a decision is active or closing, later calls wait in order and open after the previous one has closed; each Promise settles on its own, and false only means the decision-maker declined. Use ConfirmAction when changes to an object, version, or change must invalidate approval.",
  api: [
    { name: "ConfirmProvider", description: "为后代 useConfirm 承载一个模态决定，不额外渲染包裹元素。放在应用的 UILocaleProvider 内。", descriptionEn: "Host one modal decision for descendant useConfirm calls without adding a wrapper element. Place it inside the application's UILocaleProvider.", props: [
      { name: "children", type: "ReactNode", description: "调用 useConfirm 的应用内容；Provider 卸载时未决 Promise 返回 false。", descriptionEn: "Application content using useConfirm. Unmounting the provider resolves an outstanding decision to false." },
    ] },
    { name: "useConfirm", description: "返回稳定的 confirm(options): Promise<boolean>；必须位于 ConfirmProvider 内。", descriptionEn: "Return a stable confirm(options): Promise<boolean> function. Requires a ConfirmProvider.", props: [
      { name: "title / description", type: "ReactNode / ReactNode", description: "必需且非空；标题标识决定，说明持续显示必要后果并建立可访问关联。调用时捕获选项，之后修改原 options 不替换已读内容。", descriptionEn: "Required and nonempty. The title names the decision; the description keeps necessary consequences visible and accessible. Options are captured per call; mutating the original options does not replace reviewed content." },
      { name: "confirmLabel / cancelLabel", type: "ReactNode / ReactNode", default: "必填 / locale.cancel", defaultEn: "required / locale.cancel", description: "confirmLabel 必填，写出这个决定具体做什么（「移出」「离开」），没有通用的「确认」默认；缺省或空白抛 TypeError。取消按钮和 Escape 都返回 false；点遮罩不关闭。", descriptionEn: "confirmLabel is required and names what this decision does (Remove, Leave); there is no generic Confirm default, and a missing or blank value throws TypeError. Cancel and Escape resolve false; backdrop presses do not dismiss." },
      { name: "tone", type: "ButtonTone", default: "'neutral'", description: "确认按钮的后果色调；需要危险色时显式传 danger，不赋予权限。", descriptionEn: "The affirmative button's consequence tone. Pass danger explicitly when needed; tone grants no permission." },
      { name: "popupProps", type: "Omit<AlertDialogPopupProps, 'children'>", description: "复用公共浮层的 render、ref、ARIA、承载层和焦点入口。默认聚焦安全面板，关闭回到调用时的活动元素；入口可能移除时用 finalFocus 指向仍在的上级。", descriptionEn: "Reuse public popup render, refs, ARIA, structural layers, and focus targets. Focus starts on the safe panel and returns to the element active at the call. Supply finalFocus with a surviving parent when the entry may be removed." },
      { name: "signal", type: "AbortSignal", description: "已中止的调用直接 false；决定中中止会关闭并返回 false。只中止此次决定，不取消已开始的业务请求。", descriptionEn: "An already-aborted call immediately resolves false. Aborting an active decision closes it and resolves false. This cancels the decision only, not a business request already started." },
      { name: "Promise<boolean>", type: "true | false", description: "确认立即返回 true 并关窗；取消、中止、hook 调用方或 Provider 卸载均返回 false。业务执行不等待退场动画；应用用 Button loading、try/finally 和就地错误承接执行与恢复。", descriptionEn: "Approval immediately resolves true and closes. Cancellation, abort, or unmounting the hook owner or provider resolves false. Business execution does not wait for an exit animation. The application owns execution and recovery through Button loading, try/finally, and inline errors." },
    ] },
  ],
  keyboard: [
    { keys: "Tab / Shift+Tab", description: "在当前模态决定内循环；默认进入面板，不自动聚焦确认按钮。", descriptionEn: "Cycle within the active modal. Focus starts on the panel, never automatically on the affirmative action." },
    { keys: "Enter / Space", description: "激活当前聚焦的明确选择。", descriptionEn: "Activate the focused explicit choice." },
    { keys: "Escape", description: "拒绝此次决定，返回调用入口或 finalFocus。", descriptionEn: "Decline this decision and return to the calling entry or finalFocus target." },
  ],
  notes: ["同一 Provider 同刻只显示一个决定；其余按调用顺序排队，包含同一事件中的重复调用与退场期间。排队中的调用可被 signal 中止，所属 hook 卸载或 Provider 卸载时返回 false。", "调用 useConfirm 的组件卸载会取消它自己的未决决定；保留的旧函数在卸载后也只返回 false。", "授权与执行分开：组件不接收 onConfirm 请求函数，不显示提交中，不推断成功、失败或结果未知。", "需要文字核对、对象与版本变化后重新审阅时使用 ConfirmAction；一般组合控制使用 AlertDialog。"],
  notesEn: ["One decision shows per provider; the rest wait in call order, including repeated calls in one event and during closing. A waiting call can be aborted by its signal and resolves false when its hook owner or the provider unmounts.", "Unmounting the useConfirm owner cancels its own pending decision. Retained functions also resolve false after the owner unmounts.", "Approval and execution are separate: this component accepts no request callback, displays no submitting state, and infers no success, failure, or unknown outcome.", "Use ConfirmAction for exact text checks and review after object or version changes; use AlertDialog for direct composition."],
  design: {
    methods: ["名实相符", "进退相承", "相成相制"], whenToUse: ["一般流程需要在继续前等待一个明确决定。"], avoid: ["对象、版本或变更会改变而需要重新审阅；使用 ConfirmAction。", "执行中进度、业务结果或通知；由应用和反馈组件承接。"],
    composition: ["ConfirmProvider + useConfirm；确认后由应用 Button loading、try/finally 与错误恢复接续。"],
    stateOwner: { library: ["单个未决决定、布尔结果、取消、中止、卸载清理与模态焦点。"], application: ["决定内容、对象版本、权限、提交状态、请求结果与恢复内容。"] },
    responsive: ["直接消费 AlertDialog 的可用空间、几何与焦点机制。"], customization: ["明确动作名称、tone、公共 popupProps 与现有主题。"],
  },
  designEn: { whenToUse: ["A general flow must await one explicit decision before proceeding."], avoid: ["Objects, versions, or changes can invalidate approval; use ConfirmAction.", "Execution progress, business outcomes, or notifications belong to the application and feedback components."], composition: ["ConfirmProvider + useConfirm; the application continues with Button loading, try/finally, and error recovery."], stateOwner: { library: ["One pending decision, its boolean result, cancel, abort, unmount cleanup, and modal focus."], application: ["Decision content, object versions, permissions, submission state, request outcomes, and recovery content."] }, responsive: ["Uses AlertDialog's available space, geometry, and focus mechanisms."], customization: ["Explicit action names, tone, public popupProps, and existing themes."] },
} satisfies ComponentMeta;
