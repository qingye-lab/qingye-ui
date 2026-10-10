import type { ComponentMeta } from "@/lib/types";

export default {
  title: "对话框 Dialog", titleEn: "Dialog",
  description: "接管整个工作面，完成当前编辑或决定后返回。", descriptionEn: "Take over the work surface for an edit or decision, then return.",
  category: "浮层", layer: "primitive", source: "local",
  exports: ["Dialog", "DialogTrigger", "DialogPopup", "DialogHeader", "DialogTitle", "DialogDescription", "DialogPanel", "DialogFooter", "DialogClose"],
  keywords: ["dialog", "modal", "对话框", "阻断", "编辑", "弹窗", "弹出框", "模态"],
  decisions: "关闭结束当前呈现并返回触发者，不代表保存。输入内容与后续动作由调用方持有。",
  decisionsEn: "Closing ends the presentation and returns to the trigger; it does not imply saving. The caller owns input values and subsequent actions.",
  api: [
    { name: "Dialog", description: "固定完整阻断模式，保留原语的受控、非受控与共享触发入口。", descriptionEn: "Always fully modal, retaining controlled, uncontrolled and shared-trigger state.", props: [
      { name: "open / defaultOpen", type: "boolean", default: "false", description: "应用控制状态 / 初始展开状态。", descriptionEn: "Controlled state / initial uncontrolled state." },
      { name: "onOpenChange", type: "(open, details) => void", description: "收到打开/关闭请求及原因；不表示提交或取消业务。", descriptionEn: "Receive state requests and reasons, without implying business submission or cancellation." },
      { name: "handle / triggerId / defaultTriggerId", type: "DialogPrimitive.Root.Props", description: "关联共享、受控或初始展开的触发者。", descriptionEn: "Associate shared, controlled or initially open triggers." },
      { name: "disablePointerDismissal", type: "boolean", default: "false", description: "应用确需阻止点遮罩关闭时启用，仍须保留明确退出。", descriptionEn: "Prevent backdrop dismissal when required, keeping an explicit exit." },
    ] },
    { name: "DialogPopup", description: "组合 Portal、遮罩与视口，内容固有宽度受视口约束；不提供尺寸变体。", descriptionEn: "Compose a portal, backdrop and viewport with content-driven width and no size variants.", props: [
      { name: "initialFocus", type: "true | RefObject<HTMLElement | null> | (interaction) => HTMLElement | true | null", default: "true", description: "默认首个控件；触摸进入面板。可指定字段、标题或面板；不支持 false。", descriptionEn: "First control by default, or the panel on touch. A field, heading or panel can be specified; false is unsupported." },
      { name: "finalFocus", type: "true | RefObject<HTMLElement | null> | (interaction) => HTMLElement | true | null", default: "true", description: "默认触发者；触发者会被移除时指定可聚焦上级，不能返回 false。", descriptionEn: "Return to the trigger by default. Provide a focusable parent if it disappears; false is unsupported." },
      { name: "portalProps / backdropProps / viewportProps", type: "Omit<Portal.Props, 'keepMounted'> / Backdrop.Props / Viewport.Props", description: "容器、ref、样式、事件与 render 透传；Portal 不支持保留关闭DOM，局部语言、密度、方向需明确容器。", descriptionEn: "Forward containers, refs, styling, events and render. Retaining closed portal DOM is unsupported; set a container for local language, density or direction." },
      { name: "render / ref / className / style", type: "DialogPrimitive.Popup.Props", description: "覆盖呈现与组合，className 支持原语状态函数。", descriptionEn: "Compose or override presentation; className supports primitive state functions." },
    ] },
    { name: "DialogTitle / DialogDescription", description: "原语建立可访问名称与说明的关联；说明不是重复标题。", descriptionEn: "Primitive-managed accessible name and description; avoid repeating the title." },
    { name: "DialogTrigger / DialogClose", description: "默认复用 Button，支持 render/ref/事件；Close 缺少 children 时读取 locale.close。", descriptionEn: "Use Button by default, with render/ref/events. An empty Close reads locale.close." },
    { name: "DialogHeader / DialogPanel / DialogFooter", description: "名称、工作内容、动作的分组关系。支持 useRender 组合；不产生另一层围合。", descriptionEn: "Group names, working content and actions, with useRender composition and no extra enclosure." },
    { name: "DialogCreateHandle / DialogPrimitive", description: "类型化共享触发 handle 与所用 Base UI 原语命名空间。", descriptionEn: "Typed shared-trigger handle and the Base UI primitive namespace." },
  ],
  keyboard: [
    { keys: "Enter / Space", description: "从触发者进入对话框。", descriptionEn: "Open from the trigger." },
    { keys: "Tab / Shift+Tab", description: "在当前最上层对话框内循环。", descriptionEn: "Cycle within the topmost dialog." },
    { keys: "Esc", description: "关闭当前层并返回触发者或 finalFocus。", descriptionEn: "Close this layer and return to its trigger or finalFocus." },
  ],
  notes: ["不需要阻断时使用就地表单或 Popover；必须明确回应的危险决定使用 AlertDialog。", "草稿策略由应用持有。关闭、放弃草稿、保存和撤销分别命名。", "危险决定用 AlertDialog，后果写在它的说明里；按钮不承载后果。", "无触发者的程序打开也须指定有意义的 finalFocus。", "共享层级按真实开启顺序使新工作面高于旧面候选；调用方覆盖 zIndex 可破坏默认关系。", "ARIA实测驱动的契约收窄：Portal固定keepMounted=false，JS传true也不保留关闭DOM。应用显式持有草稿；Primitive自行组合仍有原语keepMounted隔离缺陷。"],
  notesEn: ["Use an inline form or Popover when interruption is unnecessary; use AlertDialog for an explicit consequential decision.", "The application owns drafts. Name closing, discarding, saving and undo separately.", "Use AlertDialog for consequential decisions and state the consequence in its description; buttons carry none.", "Programmatic opening without a trigger needs a meaningful finalFocus target.", "Shared layers put a newly opened surface above older owned popups. Caller zIndex overrides can break that relationship.", "ARIA evidence narrows the contract: Portal forces keepMounted=false, even for JavaScript callers passing true. The application holds drafts explicitly. Direct Primitive composition still has the upstream retained-portal isolation defect."],
  design: {
    methods: ["展开有据", "相成相制", "名实相符", "进退相承"],
    whenToUse: ["需要停下主线才能完成的编辑或决定。"], avoid: ["可就地完成的高频编辑。", "必须明确回应的决定改用 AlertDialog。"],
    composition: ["Title/Description 关联名称与必要说明。", "Header/Panel/Footer 组织输入与动作，不提供业务状态。"],
    stateOwner: { library: ["open、焦点困住、滚动锁、背景阻断与返回。"], application: ["草稿、版本、保存、失败、放弃与持久化。"] },
    responsive: ["内容固有宽度受视口限制；长内容在面板内滚动。", "既有控件窄屏 token 与触摸目标仍由控件消费；本批演示只验桌面。"],
    customization: ["表面、圆角、遮罩、阴影读取既有角色。", "入退唯一归 motion.css；不在调用点另写动画。"],
  }, designEn: {"whenToUse":["Editing or deciding requires pausing the main flow."],"avoid":["Frequent edits that can happen in place.","Use AlertDialog for decisions requiring an explicit response."],"composition":["Title/Description associate names and necessary explanations.","Header/Panel/Footer organize inputs and actions without supplying business states."],"stateOwner":{"library":["Open state, focus trapping, scroll lock, background blocking, and return."],"application":["Drafts, versions, saves, failures, abandonment, and persistence."]},"responsive":["Intrinsic content width is constrained by the viewport; long content scrolls within the panel.","Controls retain their own narrow-screen tokens and touch targets; this batch's demos checked desktop only."],"customization":["Surfaces, radii, backdrop, and shadow consume existing roles.","motion.css alone owns entry/exit; no additional call-site animation."]},
} satisfies ComponentMeta;
