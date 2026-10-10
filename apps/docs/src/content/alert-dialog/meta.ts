import type { ComponentMeta } from "@/lib/types";

export default {
  title: "决定对话框 AlertDialog", titleEn: "AlertDialog",
  description: "阻断整个工作面，要求对当前对象作出明确选择。", descriptionEn: "Block the work surface for an explicit decision about the current object.",
  category: "浮层", layer: "pattern", source: "local",
  exports: ["AlertDialog", "AlertDialogTrigger", "AlertDialogPopup", "AlertDialogHeader", "AlertDialogTitle", "AlertDialogDescription", "AlertDialogPanel", "AlertDialogFooter", "AlertDialogClose"],
  keywords: ["alertdialog", "确认", "决定", "删除", "危险", "弹窗", "二次确认"],
  decisions: "点遮罩不关闭，默认聚焦面板。Esc 与返回按钮只关闭对话框；继续动作由调用方处理。",
  decisionsEn: "Backdrop presses do not dismiss it; focus starts on the panel. Escape and the return button only close the dialog. The caller handles the affirmative action.",
  api: [
    { name: "AlertDialog", description: "保留 open/defaultOpen/onOpenChange/handle；原语固定阻断并禁止外部指针关闭。", descriptionEn: "Keep open/defaultOpen/onOpenChange/handle; the primitive enforces modality and prevents outside-pointer dismissal." },
    { name: "AlertDialogPopup", description: "与 Dialog 同样的承载结构与内容尺寸关系，默认聚焦面板。", descriptionEn: "Use the same structure and content-driven sizing as Dialog, defaulting focus to the panel.", props: [
      { name: "initialFocus", type: "DialogFocusTarget", default: "panel", description: "可指定保留动作、确认字段或可聚焦标题；危险按钮不得作为默认落点。", descriptionEn: "Choose a protective action, confirmation field or focusable heading. Avoid initial focus on a danger action." },
      { name: "finalFocus", type: "DialogFocusTarget", default: "trigger", description: "触发者移除后由应用指定有意义的上级。", descriptionEn: "Specify a meaningful surviving parent when the trigger is removed." },
      { name: "portalProps / backdropProps / viewportProps", type: "DialogPopupProps", description: "透传承载层的容器、样式、render、ref 与原生属性。", descriptionEn: "Forward containers, styles, render, refs and native attributes to structural layers." },
    ] },
    { name: "AlertDialogTitle / AlertDialogDescription", description: "说明当前选择与必要后果，建立可访问关联。后果写在 Description 里，按钮不承载。", descriptionEn: "Name the decision and its consequences with accessible associations. The consequence belongs in Description; buttons carry none." },
    { name: "AlertDialogTrigger / AlertDialogClose", description: "默认组合 Button。Close 由调用方明确命名，如“返回”；不执行继续动作。", descriptionEn: "Compose Button by default. Name Close explicitly, such as Return; it does not run the affirmative action." },
    { name: "AlertDialogHeader / AlertDialogPanel / AlertDialogFooter", description: "复用 Dialog 的名称、工作内容与动作分组，具有各自 data-slot。", descriptionEn: "Reuse Dialog's title, working-content and action groups with distinct data-slot hooks." },
    { name: "AlertDialogCreateHandle / AlertDialogPrimitive", description: "共享触发 handle 和所用 Base UI 原语命名空间。", descriptionEn: "Shared-trigger handle and the Base UI primitive namespace." },
  ],
  keyboard: [
    { keys: "Enter / Space", description: "打开决定。", descriptionEn: "Open the decision." },
    { keys: "Tab / Shift+Tab", description: "在最上层决定内循环，背景不可操作。", descriptionEn: "Cycle within the topmost decision while the background is unavailable." },
    { keys: "Esc", description: "离开这次决定并返回；危险动作不执行。", descriptionEn: "Leave this decision and return without executing the danger action." },
  ],
  notes: ["普通编辑使用 Dialog；不需要中断时用就地确认或面板。", "后果必须在对话框里可见（Description）。", "关闭与继续动作分别处理。", "必须提供明确的返回选择，不能只依赖 Esc。", "共享层级按真实开启顺序使新工作面高于旧面候选；调用方覆盖 zIndex 可破坏默认关系。", "ARIA实测驱动的契约收窄：Portal固定keepMounted=false，JS传true也不保留关闭DOM。应用显式持有草稿；Primitive自行组合未修复该原语缺陷。"],
  notesEn: ["Use Dialog for ordinary edits, or inline confirmation when interruption is unnecessary.", "Keep the consequence visible in the dialog (Description).", "Handle closing and the affirmative action separately.", "Provide an explicit return choice; Escape alone is insufficient.", "Shared layers put a newly opened surface above older owned popups. Caller zIndex overrides can break that relationship.", "ARIA evidence narrows the contract: Portal forces keepMounted=false, even for JavaScript callers passing true. The application holds drafts explicitly; direct Primitive composition remains affected."],
  design: {
    methods: ["名实相符", "相成相制", "展开有据", "进退相承"],
    whenToUse: ["必须在继续前回应的决定。"], avoid: ["通知、成功反馈、可就地编辑的内容。"],
    composition: ["返回与继续动作同处，必要后果可关联。"],
    stateOwner: { library: ["open、焦点困住、滚动锁、背景阻断和返回。"], application: ["决定内容、后果与继续动作。"] },
    responsive: ["内容决定宽度，视口限制上限；本批只验桌面。"],
    customization: ["与 Dialog 复用圆角、表面、遮罩及阴影角色。", "默认进入面板；入退只由 motion.css 提供。"],
  }, designEn: {"whenToUse":["A decision requiring a response before proceeding."],"avoid":["Notifications, success feedback, or content that can be edited in place."],"composition":["Return and continue actions appear together, with necessary consequences associated."],"stateOwner":{"library":["Open state, focus trapping, scroll lock, background blocking, and return."],"application":["Decision content, consequences, and continuing actions."]},"responsive":["Content determines width within viewport limits; this batch checked desktop only."],"customization":["Shares Dialog radius, surfaces, backdrop, and shadow roles.","Focus enters the panel by default; motion.css alone supplies entry and exit."]},
} satisfies ComponentMeta;
