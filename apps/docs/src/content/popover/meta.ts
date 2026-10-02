import type { ComponentMeta } from "@/lib/types";

export default {
  title: "气泡卡片 Popover",
  description: "点击触发、锚定在元素旁的非模态浮层，承载简短表单、筛选或补充信息。只读的悬停提示用 Tooltip，悬停预览用 PreviewCard。",
  design: {
    "methods": [
      "随境取度",
      "展开有据",
      "进退相承"
    ],
    "whenToUse": [
      "在触发对象旁按需展示短表单、选择或可点击帮助，保持上下文。"
    ],
    "avoid": [
      "不能把关键后果只塞进临时浮层；关闭不能被应用当成提交成功。"
    ],
    "composition": [
      "可交互内容用 Popover；纯文本悬停补充用 Tooltip；需要独立模态任务时用 Dialog。"
    ],
    "stateOwner": {
      "library": [
        "管理触发器与浮层关联、定位、碰撞、焦点和 close 请求，保留表单原生语义。"
      ],
      "application": [
        "负责值、验证、提交与错误恢复；受控 open 不替代业务状态。"
      ]
    },
    "responsive": [
      "根据可用高度滚动内容；窄屏仍提供触发与退出，表单长标签应保留可读宽度。"
    ],
    "customization": [
      "side、align 和 anchor 调整与对象的空间关系；tooltipStyle 只改变表面，不移除交互语义。"
    ]
  },
  category: "浮层",
  source: "coss",
  exports: ["Popover", "PopoverTrigger", "PopoverPopup", "PopoverTitle", "PopoverDescription", "PopoverClose"],
  keywords: ["popover", "气泡", "弹出框", "浮层"],
  api: [
    {
      name: "Popover",
      description: "根组件，管理打开状态。",
      props: [
        { name: "open / defaultOpen", type: "boolean", default: "false", description: "受控 / 非受控的打开状态。" },
        { name: "onOpenChange", type: "(open, details) => void", description: "打开状态变化时调用。" },
        { name: "modal", type: 'boolean | "trap-focus"', default: "false", description: "设为 true 时锁定页面滚动与外部交互。" },
        { name: "handle", type: "PopoverCreateHandle()", description: "多个触发器共用一个浮层，切换时浮层平滑移动并变换尺寸。" },
      ],
    },
    {
      name: "PopoverTrigger",
      description: "触发按钮。",
      props: [
        { name: "openOnHover", type: "boolean", default: "false", description: "悬停时也打开，配合 delay 使用。" },
        { name: "handle / payload", type: "Handle / unknown", description: "与共享浮层关联，并传入要渲染的内容。" },
      ],
    },
    {
      name: "PopoverPopup",
      description: "浮层本体，自动避开视口边缘。别名 PopoverContent。",
      props: [
        { name: "side", type: '"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"', default: '"bottom"', description: "相对触发器的方向，空间不足时自动翻转。" },
        { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "沿边的对齐方式。" },
        { name: "sideOffset / alignOffset", type: "number", default: "4 / 0", description: "与触发器的距离 / 对齐偏移。" },
        { name: "tooltipStyle", type: "boolean", default: "false", description: "使用 Tooltip 的紧凑样式，适合触屏上的点击说明。" },
        { name: "anchor", type: "Element | RefObject", description: "锚定到触发器以外的元素。" },
      ],
    },
    { name: "PopoverTitle / PopoverDescription", description: "标题与说明，自动关联为浮层的可访问名称与描述。" },
    { name: "PopoverClose", description: "关闭浮层的按钮。" },
  ],
  keyboard: [
    { keys: "Enter / Space", description: "在触发器上打开或关闭。" },
    { keys: "Esc", description: "关闭浮层，焦点回到触发器。" },
    { keys: "Tab", description: "在浮层内移动焦点；移出浮层时自动关闭。" },
  ],
  notes: [
    "Popover 默认非模态：点击外部或按 Esc 关闭，页面仍可滚动。",
    "只放一两个操作；内容复杂或需要用户专心完成时改用 Dialog。",
    "仅图标的触发器需要 aria-label。",
  ],
} satisfies ComponentMeta;
