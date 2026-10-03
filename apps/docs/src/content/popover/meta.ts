import type { ComponentMeta } from "@/lib/types";

export default {
  title: "浮起面板 Popover",
  titleEn: "Popover",
  description: "与触发对象绑定的非阻断浮层，承载局部操作与补充信息。",
  descriptionEn: "A trigger-bound non-modal popup for local actions and supplementary information.",
  category: "浮层",
  layer: "primitive",
  source: "local",
  exports: ["Popover", "PopoverTrigger", "PopoverPopup", "PopoverTitle", "PopoverDescription", "PopoverClose"],
  keywords: ["popover", "浮层", "非阻断", "气泡"],
  decisions: "关闭只收起浮层，不代表提交或撤销完成。草稿与结果由应用持有；唯一的关键后果须留在持续工作面。",
  decisionsEn: "Closing hides the popup; it does not complete submission or undo. The application owns drafts and results. Keep essential consequences on the persistent work surface.",
  api: [
    {
      name: "Popover",
      description: "管理非阻断打开状态，完整继承 Base UI Root 的控制契约。modal 已移除。",
      descriptionEn: "Manage non-modal open state with the Base UI Root contract. modal has been removed.",
      props: [
        { name: "open / defaultOpen", type: "boolean", default: "false", description: "受控 / 非受控打开状态。", descriptionEn: "Controlled / uncontrolled open state." },
        { name: "onOpenChange", type: "(open, details) => void", description: "原语报告请求及原因，应用决定受控状态。", descriptionEn: "Receive the requested state and reason; the application owns controlled state." },
        { name: "handle / triggerId / defaultTriggerId", type: "Handle / string", description: "共享触发器或受控初始打开时，建立明确关联。", descriptionEn: "Associate shared triggers or a controlled/initially open popup." },
      ],
    },
    {
      name: "PopoverTrigger / PopoverClose",
      description: "原生触发与关闭入口；支持 render、ref、style、事件及按状态求值的 className。",
      descriptionEn: "Native trigger and close controls supporting render, ref, style, events and state class functions.",
    },
    {
      name: "PopoverPopup",
      description: "浮起表面、定位与可滚动内容层；别名 PopoverContent。无日历或 tooltip 样式特判。",
      descriptionEn: "Raised surface, positioning and scrollable content. Aliased as PopoverContent, with no calendar or tooltip-specific variant.",
      props: [
        { name: "side / align", type: "Positioner.Props", default: "bottom / center", description: "相对触发者的方向与对齐；由原语处理碰撞。", descriptionEn: "Anchor-relative side and alignment with primitive-owned collision handling." },
        { name: "sideOffset / alignOffset / anchor", type: "Positioner.Props", default: "0 / 0 / trigger", description: "明确定位关系。默认间距沿用原语 0，不推断内容类型。", descriptionEn: "Explicit positioning. Default offsets follow the primitive at zero." },
        { name: "initialFocus / finalFocus", type: "Popup.Props", default: "true / true", description: "默认原语管理焦点与返回；触发者将被移除时，finalFocus 指定有意义上级。", descriptionEn: "Primitive-managed focus and return. Set finalFocus to a meaningful parent when the trigger will disappear." },
        { name: "portalProps", type: "Portal.Props", description: "局部密度、方向、语言或主题需保留时，将 container 指向已挂载的上下文容器。", descriptionEn: "Use a mounted context container to retain local density, direction, language or theme." },
        { name: "positionerProps / viewportProps", type: "Positioner.Props / Viewport.Props", description: "透传定位层与内容层的 className、style、ref、render 和原生属性。", descriptionEn: "Forward classes, styles, refs, render and native attributes to the positioning and content layers." },
      ],
    },
    { name: "PopoverTitle / PopoverDescription", description: "关联浮层的可访问名称与说明。", descriptionEn: "Associate the popup's accessible name and description." },
    { name: "PopoverCreateHandle / PopoverPrimitive", description: "类型化共享触发器 handle 与 Base UI 原语命名空间。", descriptionEn: "Typed shared-trigger handle and the Base UI primitive namespace." },
  ],
  keyboard: [
    { keys: "Enter / Space", description: "在触发器上打开或关闭。", descriptionEn: "Open or close from the trigger." },
    { keys: "Esc", description: "关闭并返回触发者，或指定的 finalFocus。", descriptionEn: "Close and return to the trigger or finalFocus target." },
    { keys: "Tab / Shift+Tab", description: "遍历内容，允许离开浮层回到工作面。", descriptionEn: "Traverse content and leave the popup for the work surface." },
  ],
  notes: [
    "Popover 始终非阻断；需要阻断决定时用 Dialog 或 AlertDialog。",
    "点击外部入口后保留该入口的焦点，键盘关闭则返回触发者。",
    "默认 Portal 挂到 body，无法继承触发者局部 DOM 上下文；container 必须在打开前挂载。",
    "开关、焦点与定位由 Base UI 管理；入退动效仅由 motion.css 管理。",
  ],
  notesEn: [
    "Popover is always non-modal. Use Dialog or AlertDialog for a blocking decision.",
    "Outside clicks retain focus on the clicked control; keyboard dismissal returns to the trigger.",
    "The default body portal cannot inherit the trigger's local DOM context. Mount container before opening.",
    "Base UI owns open state, focus and positioning; motion.css owns entry and exit motion.",
  ],
  design: {
    methods: ["展开有据", "进退相承", "相成相制"],
    whenToUse: ["在触发对象旁展开局部操作或补充信息，主工作面仍可使用。"],
    avoid: ["阻断式任务；唯一关键后果；把关闭当成保存或取消成功。"],
    composition: ["Trigger 关联对象；Title/Description 建立名称；Close、Esc 与外部入口提供返回。"],
    stateOwner: { library: ["本地打开请求、触发关联、定位、焦点与返回。"], application: ["草稿、业务动作、异步结果、受控 open 与触发器消失后的返回目标。"] },
    responsive: ["在可用高度内滚动，保留焦点内缘；关闭方式与非阻断语义不变。"],
    customization: ["集中表面与浮层圆角；原生属性与定位层透传；不按子内容追加视觉特判。"],
  },
} satisfies ComponentMeta;
