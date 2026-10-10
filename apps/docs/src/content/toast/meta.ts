import type { ComponentMeta } from "@/lib/types";

export default {
  title: "通知 Toast", titleEn: "Toast",
  description: "补充可恢复、非关键的操作事实，保持当前工作不中断。",
  descriptionEn: "Report recoverable, non-critical facts while the current work continues.",
  category: "反馈", layer: "primitive", source: "local",
  exports: ["ToastProvider", "toastManager", "AnchoredToastProvider", "anchoredToastManager", "ToastPrimitive"],
  keywords: ["toast", "notification", "通知", "消息"],
  api: [
    { name: "ToastProvider", description: "同一通知通道挂载一次。", descriptionEn: "Mount once per notification channel.", props: [
      { name: "position", type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"', default: '"bottom-right"', description: "通知区域的位置。", descriptionEn: "Notification region placement." },
      { name: "timeout", type: "number", default: "5000", description: "普通通知与成功的阅读时限，0 为持续显示。", descriptionEn: "Reading duration for ordinary/success notices; zero keeps them visible." },
      { name: "limit", type: "number", default: "3", description: "原语限制可见条数，超额根隐藏且 inert；不能作为关键结果的唯一承载。", descriptionEn: "The primitive limits visible entries; overflow roots are hidden/inert. They cannot carry the only critical outcome." },
      { name: "toastManager", type: "ToastPrimitive.createToastManager() 的返回值", typeEn: "Return value of ToastPrimitive.createToastManager()", description: "可选的独立通知通道；省略时用导出的全局 manager。", descriptionEn: "Optional independent notification channel; omission uses the exported global manager." },
      { name: "portalProps", type: "ToastPrimitive.Portal.Props", description: "自定义 Portal 容器、方向和语言等属性。", descriptionEn: "Custom Portal containers, direction, language, and other attributes." },
    ] },
    { name: "toastManager.add(options)", description: "返回 id。相同 id 原位更新。", descriptionEn: "Returns an id. Reusing an id updates in place.", props: [
      { name: "title / description", type: "ReactNode", description: "对象、结果与必要恢复依据。", descriptionEn: "Objects, outcomes, and necessary recovery context." },
      { name: "type", type: "string", description: "waiting / in-progress / unknown / failed / success；保留 loading（进行中）、error（失败）、info 与 warning。", descriptionEn: "waiting/in-progress/unknown/failed/success; retains loading as in-progress, error as failed, info, and warning." },
      { name: "timeout", type: "number", description: "失败/未知/等待/进行中强制持续显示，其他类型按指定时限关闭。", descriptionEn: "Failure/unknown/waiting/in-progress remain persistent; other types close after their specified duration." },
      { name: "priority", type: '"low" | "high"', default: '"low"', description: "low 使用礼貌 status；high 使用原语 alert。失败不自动打断播报。high 时原语在通知区域之外另放一份视觉隐藏的 alert 副本供读屏立即播报，标题与说明因此在 DOM 里各有两份。", descriptionEn: "low uses polite status; high uses primitive alert. Failure never automatically interrupts announcements. For high the primitive adds a visually hidden alert copy outside the notification region for immediate announcement, so the title and description each exist twice in the DOM." },
      { name: "actionProps", type: "React.ComponentPropsWithoutRef<'button'>", description: "应用提供操作与真实处理器，只执行一次；恢复落点仍留在页面。", descriptionEn: "Applications supply actions and actual handlers, invoked once; recovery entries remain on the page." },
      { name: "data.rootProps", type: "ToastPrimitive.Root.Props 的可透传部分", typeEn: "Forwardable ToastPrimitive.Root.Props", description: "透传 id、ARIA、事件、style、render 与 ref，不接管 children/className/toast/swipeDirection。", descriptionEn: "Forward id, ARIA, events, style, render, and refs, excluding children/className/toast/swipeDirection." },
    ] },
    { name: "toastManager.update(id, options)", description: "用真实结果更新同一对象。离开持续状态时显式指定 timeout；Promise 成功自动恢复 Provider 时限。", descriptionEn: "Update the same object with actual outcomes. Specify timeout when leaving a persistent state; Promise success automatically restores Provider duration." },
    { name: "toastManager.promise(promise, { loading, success, error })", description: "进行中→真实成功/失败，更新同一条。通知不设期限、不推断结果：等多久都保持进行中，直到 Promise 落定或应用更新。响应丢失时由应用把这一条改为 unknown，不能将网络拒绝当业务失败。", descriptionEn: "In-progress becomes actual success/failure on the same notice. The notice sets no deadline and infers no outcome: it stays in progress however long it takes, until the promise settles or the application updates it. When a response is lost the application changes the notice to unknown; network rejection is not a business failure." },
    { name: "toastManager.close(id?)", description: "关闭指定/全部通知，不取消或撤销业务任务。", descriptionEn: "Close a specified notice or all notices without canceling or undoing business tasks." },
    { name: "AnchoredToastProvider / anchoredToastManager", description: "局部通知单独通道；positionerProps.anchor 指向关联元素。data.tooltipStyle 收紧内缘，完整说明与关闭仍保留。", descriptionEn: "A separate channel for local notices; positionerProps.anchor identifies the associated element. data.tooltipStyle tightens internal spacing while retaining complete explanation and closing." },
    { name: "ToastPrimitive", description: "Base UI Toast 原语命名空间；useToastManager 可管理所在 Provider 通道。", descriptionEn: "Base UI Toast primitive namespace; useToastManager manages the owning Provider channel." },
  ],
  keyboard: [
    { keys: "F6", description: "主动进入通知区域。", descriptionEn: "Deliberately enter the notification region." },
    { keys: "Tab", description: "到达通知操作与关闭，聚焦时暂停消失计时。", descriptionEn: "Reach notice actions/closing; focus pauses disappearance timing." },
    { keys: "Esc", description: "关闭聚焦通知并返回原焦点。", descriptionEn: "Close the focused notice and return to the original focus." },
  ],
  notes: ["悬停、聚焦与窗口失焦暂停自动消失。", "通知只呈现应用给出的类型，不做推测：没有超时转未知，等待、进行中、未知与失败一直留到应用更新或用户关闭。loadingTimeout 已移除；需要期限时由应用计时并调用 toastManager.update(id, { type: \"unknown\" })。", "测试里按文字查找通知时限定在通知区域内（role=region）或用 data-slot=toast-title：priority=high 的通知另有一份视觉隐藏的播报副本，焦点进入通知区域后副本移除。", "普通成功默认短暂；失败/未知持续但仍可关闭。重要事实和恢复入口必须留在对象页面。", "Viewport 与锚定通知消费共享 notification 层级，低于文档候选与 modal 关键动作。"], notesEn: ["Hover, focus, and window blur pause automatic disappearance.","A notice only presents the type the application gives it and infers nothing: no timeout turns it into unknown, and waiting, in-progress, unknown and failed notices stay until the application updates them or the user closes them. loadingTimeout is removed; when a deadline is needed the application times it and calls toastManager.update(id, { type: \"unknown\" }).","In tests, scope text queries to the notification region (role=region) or use data-slot=toast-title: a priority=high notice also has a visually hidden announcement copy, removed once focus enters the region.","Ordinary success is brief by default; failure/unknown stay but can close. Important facts and recovery entries remain on the object's page.","Viewport and anchored notices consume shared notification layers, below document candidates and critical modal actions."],
  decisions: "通知不抢焦点。未知表示结果未确认，失败表示已有失败事实；关闭只关闭通知。字段错误、不可逆后果和需决策的失败留在工作面或确认结构，不能只用 Toast。",
  decisionsEn: "A notification does not take focus. Unknown means no reliable result; failed means a confirmed failure. Dismissal only closes the notification. Keep field errors, irreversible consequences and decisions on the task surface or in a confirmation structure.",
  design: {
    methods: ["随境取度", "名实相符", "进退相承"],
    whenToUse: ["非关键、可恢复、无需打断当前工作的补充事实。"],
    avoid: ["所有错误都用通知；关键后果只留在可关闭消息里；请求发出就宣布完成。"],
    composition: ["同一 id 连接等待和结果；对象页面保留失败、未知与核对入口。"],
    stateOwner: { library: ["可访问原语、呈现、关闭、暂停与长期状态的持续显示。"], application: ["对象、真实结果、等待期限与何时算未知、优先级、业务取消、核对和重试。"] },
    responsive: ["组件保留已有控件 narrow token；本次页面验证仅桌面≥1100px。"],
    customization: ["样式使用既有角色；时限与位置是选择/预设。入场由 motion.css 原位淡入、退出即时，减少动态效果后文字仍成立。"],
  }, designEn: {"whenToUse":["Supplementary noncritical, recoverable facts without interrupting current work."],"avoid":["Notifications for every error, critical consequences only in closable messages, or completion declared when a request is merely sent."],"composition":["One id connects waiting and outcomes; object pages retain failure, unknown, and verification entries."],"stateOwner":{"library":["Accessible primitives, presentation, closing, pauses, and keeping persistent states on screen."],"application":["Objects, actual outcomes, any waiting deadline and when a result counts as unknown, priority, business cancellation, verification, and retry."]},"responsive":["Retains existing narrow control tokens; this page acceptance checked desktop ≥1100px only."],"customization":["Existing style roles; duration/placement are choices or presets. motion.css fades in at the same position and exits immediately; text remains meaningful with reduced motion."]},
} satisfies ComponentMeta;
