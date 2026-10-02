import type { ComponentMeta } from "@/lib/types";

export default {
  title: "文字提示 Tooltip",
  description: "悬停或聚焦时出现的简短说明，常用于解释图标按钮或展示快捷键。内容只能是纯文本提示，不放可交互元素。",
  design: {
    "methods": [
      "名实相符",
      "随境取度"
    ],
    "whenToUse": [
      "补充图标名称、快捷键或短解释，供悬停与键盘聚焦时阅读。"
    ],
    "avoid": [
      "不能承担控件唯一可访问名称、关键后果、错误恢复或交互元素。"
    ],
    "composition": [
      "图标 Button 自带 aria-label；应用根挂 TooltipProvider，点击式帮助用 Popover 的 tooltipStyle。"
    ],
    "stateOwner": {
      "library": [
        "管理提示延迟、trigger 关联、Esc 关闭与位置，提示不接管执行状态。"
      ],
      "application": [
        "决定是否有必要补充以及文本与动作事实是否一致。"
      ]
    },
    "responsive": [
      "长词按可用宽度换行；触屏缺少悬停时正文或点击帮助仍可获得必需信息。"
    ],
    "customization": [
      "用 side、align、anchor 调整位置；简短内容共享主题表面，避免逐个自定义延迟。"
    ]
  },
  category: "浮层",
  source: "coss",
  exports: ["Tooltip", "TooltipTrigger", "TooltipPopup"],
  keywords: ["tooltip", "提示", "文字提示", "hint"],
  api: [
    {
      name: "TooltipProvider",
      description: "在应用根部挂载一次。相邻的提示共享延迟：第一个按默认延迟出现，移动到下一个时立即显示。",
      props: [
        { name: "delay", type: "number", default: "600", description: "首次悬停到出现的等待时间（毫秒）。保留默认值，避免鼠标划过时到处弹出。" },
        { name: "closeDelay", type: "number", default: "0", description: "离开后关闭前的等待时间。" },
      ],
    },
    {
      name: "Tooltip",
      description: "根组件。",
      props: [
        { name: "open / defaultOpen", type: "boolean", default: "false", description: "受控 / 非受控的打开状态。" },
        { name: "onOpenChange", type: "(open, details) => void", description: "打开状态变化时调用。" },
        { name: "disabled", type: "boolean", default: "false", description: "临时停用提示。" },
        { name: "handle", type: "TooltipCreateHandle()", description: "多个触发器共用一个提示，切换时提示平滑移动。" },
      ],
    },
    {
      name: "TooltipTrigger",
      description: "触发元素；用 render 渲染为 Button 等控件。",
      props: [{ name: "delay / closeDelay", type: "number", description: "单独覆盖 Provider 的延迟。" }],
    },
    {
      name: "TooltipPopup",
      description: "提示本体。别名 TooltipContent。",
      props: [
        { name: "side", type: '"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"', default: '"top"', description: "相对触发器的方向，空间不足时自动翻转。" },
        { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "沿边的对齐方式。" },
        { name: "sideOffset / alignOffset", type: "number", default: "4 / 0", description: "与触发器的距离 / 对齐偏移。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Tab", description: "聚焦触发器时显示提示。" },
    { keys: "Esc", description: "关闭提示，焦点保持在触发器上。" },
  ],
  notes: [
    "提示不能替代可访问名称：仅图标的按钮仍然需要 aria-label。",
    "触屏设备没有悬停，不要把关键信息只放在 Tooltip 里；需要点击查看的说明用 Popover 的 tooltipStyle。",
    "禁用的按钮不会触发悬停事件；需要解释禁用原因时，把提示放在外层包裹元素上。",
    "文档站与应用都应在根部挂载一次 TooltipProvider，不要在每个提示外再包一层。",
  ],
} satisfies ComponentMeta;
