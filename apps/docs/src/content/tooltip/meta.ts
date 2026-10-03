import type { ComponentMeta } from "@/lib/types";

export default {
  title: "文字提示 Tooltip",
  titleEn: "Tooltip",
  description: "悬停或聚焦时阅读快捷键、格式与短解释。",
  descriptionEn: "Read shortcuts, formats and brief context on hover or focus.",
  decisions: "名称来自控件自己的文字或 aria-label；提示只补充。关键后果、禁用原因与失败后的恢复说明留在可见内容中。",
  decisionsEn: "Controls supply their own text or aria-label. Hints supplement it. Keep consequences, disabled reasons and recovery instructions visible.",
  category: "浮层",
  layer: "primitive",
  source: "local",
  exports: ["Tooltip", "TooltipTrigger", "TooltipPopup", "TooltipContent", "TooltipProvider", "TooltipCreateHandle", "TooltipPrimitive"],
  keywords: ["tooltip", "提示", "快捷键", "hint"],
  api: [
    {
      name: "TooltipProvider",
      description: "共享指针延迟。键盘聚焦立即展开。",
      descriptionEn: "Share pointer delays. Keyboard focus opens immediately.",
      props: [
        { name: "delay", type: "number", default: "600", description: "首次悬停等待毫秒数，原语预设，可由应用覆盖。", descriptionEn: "Initial hover delay in milliseconds; an overridable primitive preset." },
        { name: "closeDelay", type: "number", default: "0", description: "离开触发者和提示后的等待时间。", descriptionEn: "Delay after leaving both trigger and hint." },
        { name: "timeout", type: "number", default: "400", description: "连续提示立即展开的共享窗口，原语预设。", descriptionEn: "Shared instant-opening window in milliseconds, a primitive preset." },
      ],
    },
    {
      name: "Tooltip",
      description: "非阻断打开状态。提示可被悬停，不接收交互内容。",
      descriptionEn: "Non-modal open state. Hints remain hoverable and contain no interactive controls.",
      props: [
        { name: "open / defaultOpen", type: "boolean", default: "false", description: "受控 / 非受控打开。", descriptionEn: "Controlled / uncontrolled open state." },
        { name: "onOpenChange", type: "(open, details) => void", description: "接收实际请求与原因；受控值由应用决定。", descriptionEn: "Receive requests and reasons; the application owns controlled state." },
        { name: "disabled", type: "boolean", default: "false", description: "停用提示，不停用触发控件的动作。", descriptionEn: "Disable hints while leaving the trigger's action available." },
        { name: "disableHoverablePopup", type: "boolean", default: "false", description: "类型保留兼容；包装始终使用 false，满足可悬停约束。", descriptionEn: "Retained in the type for compatibility; the wrapper always uses false to keep hints hoverable." },
        { name: "trackCursorAxis", type: '"none" | "x" | "y" | "both"', default: "none", description: "both 归一为 none，以保留指针移入提示的通路；其余取值透传。", descriptionEn: "both is normalized to none to preserve pointer access to the hint; other values are forwarded." },
        { name: "handle / triggerId / defaultTriggerId", type: "Handle / string", description: "关联共享触发者及受控或初始展开。", descriptionEn: "Associate shared triggers and controlled or initial opening." },
      ],
    },
    {
      name: "TooltipTrigger",
      description: "支持 render、ref、事件、ARIA 和按状态求值的 className。",
      descriptionEn: "Supports render, refs, events, ARIA and state-based classes.",
      props: [
        { name: "delay / closeDelay", type: "number", description: "覆盖当前触发者的指针延迟。", descriptionEn: "Override pointer delays for this trigger." },
        { name: "disabled", type: "boolean", default: "false", description: "仅停用提示。原生禁用动作通过 render 的控件声明。", descriptionEn: "Disable hints only. Set native action disabling on the rendered control." },
      ],
    },
    {
      name: "TooltipPopup / TooltipContent",
      description: "提示正文与定位。可换行；入退由 motion.css 管理。",
      descriptionEn: "Hint text and positioning with wrapping. motion.css owns entry and exit.",
      props: [
        { name: "side / align", type: "Positioner.Props", default: "top / center", description: "原语默认位置，空间不足时自动翻转。", descriptionEn: "Primitive positioning defaults with collision handling." },
        { name: "sideOffset / alignOffset / anchor", type: "Positioner.Props", default: "0 / 0 / trigger", description: "相对锚点的显式位置关系。", descriptionEn: "Explicit positioning relative to the anchor." },
        { name: "portalProps", type: "Portal.Props", description: "container 可保留局部语言、方向和密度。默认挂到 body。", descriptionEn: "Set container to retain local language, direction and density; default portal target is body." },
      ],
    },
    { name: "TooltipCreateHandle / TooltipPrimitive", description: "共享触发者的类型化 handle 与 Base UI 公共原语。", descriptionEn: "Typed shared-trigger handles and the public Base UI namespace." },
  ],
  keyboard: [
    { keys: "Tab / Shift+Tab", description: "聚焦即显示，离开时关闭；不困住焦点。", descriptionEn: "Show on focus and close on leaving without trapping focus." },
    { keys: "Esc", description: "收起提示，焦点保持当前触发者。", descriptionEn: "Dismiss while retaining focus on the trigger." },
  ],
  notes: [
    "纯图标按钮自带 aria-label；打开时 aria-describedby 关联提示，保留已有说明。",
    "提示只承载短文本。需要点击帮助或交互内容时用 Popover，需要持续依据时用正文。",
    "直接 render 的 disabled 控件同时停用提示；render 函数/自定义控件内部禁用须同步 Trigger.disabled。禁用原因直接可见。",
  ],
  notesEn: [
    "Icon buttons supply aria-label. While open, aria-describedby links the hint and preserves existing descriptions.",
    "Use short text only. Use Popover for click help or interactive content, and visible text for persistent information.",
    "Directly rendered disabled controls also disable hints. Synchronize Trigger.disabled for disabling inside render functions or custom controls. Keep the reason visible.",
  ],
  design: {
    methods: ["展开有据", "相成相制", "名实相符"],
    whenToUse: ["在已可辨认的对象或动作旁补充快捷键、格式或简短上下文。"],
    avoid: ["唯一名称、唯一关键后果、禁用原因、失败恢复或可交互内容。"],
    composition: ["控件自带名称；Tooltip 关联补充文字；持续结果放在对象旁。"],
    stateOwner: { library: ["聚焦/悬停展开、关联、延迟、定位与 Esc。"], application: ["补充内容与受控 open。"] },
    responsive: ["按原语可用宽度换行；控制文字保留窄屏角色，必要信息始终可见。"],
    customization: ["应用根共享延迟；使用已有表面、阴影和圆角 token。"],
  },
} satisfies ComponentMeta;
