import type { ComponentMeta } from "@/lib/types";

export default {
  title: "预览卡片 PreviewCard",
  description: "悬停在链接上时显示目标内容的预览，例如成员资料、工单摘要。只是锦上添花：点击链接本身仍然能到达完整页面。",
  design: {
    "methods": [
      "展开有据",
      "布白有用"
    ],
    "whenToUse": [
      "预览真实链接背后的补充信息，帮助决定是否继续进入目标。"
    ],
    "avoid": [
      "唯一操作与关键内容不能只放在悬停预览；预览出现不应阻碍直接访问链接。"
    ],
    "composition": [
      "Trigger 始终保留真实 href；只读摘要放 Popup，需要表单或按钮时改用 Popover。"
    ],
    "stateOwner": {
      "library": [
        "管理预览延迟、焦点或悬停开关与碰撞定位，按可用视口限制内容范围。"
      ],
      "application": [
        "提供真实地址、对象摘要、内容加载与访问权限；目标页面保留完整信息。"
      ]
    },
    "responsive": [
      "预览长文本换行并限制到可用视口；触屏用户可通过原链接完成同一阅读。"
    ],
    "customization": [
      "默认宽度适合摘要，调整 className 宽度时仍保留可用视口限制。"
    ]
  },
  category: "浮层",
  source: "coss",
  exports: ["PreviewCard", "PreviewCardTrigger", "PreviewCardPopup"],
  keywords: ["preview card", "hover card", "悬停卡片", "预览", "名片"],
  api: [
    {
      name: "PreviewCard",
      description: "根组件。别名 HoverCard。",
      props: [
        { name: "open / defaultOpen", type: "boolean", default: "false", description: "受控 / 非受控的打开状态。" },
        { name: "onOpenChange", type: "(open, details) => void", description: "打开状态变化时调用。" },
      ],
    },
    {
      name: "PreviewCardTrigger",
      description: "渲染为 <a> 链接，悬停或聚焦时打开预览。别名 HoverCardTrigger。",
      props: [
        { name: "href", type: "string", description: "链接地址；预览只是补充，链接本身必须可用。" },
        { name: "delay / closeDelay", type: "number", default: "600 / 300", description: "打开 / 关闭前的等待时间（毫秒）。" },
      ],
    },
    {
      name: "PreviewCardPopup",
      description: "预览卡片，默认宽 16rem。别名 HoverCardContent。",
      props: [
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "相对链接的方向，空间不足时自动翻转。" },
        { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "沿边的对齐方式。" },
        { name: "sideOffset / alignOffset", type: "number", default: "4 / 0", description: "与链接的距离 / 对齐偏移。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Tab", description: "聚焦链接时显示预览。" },
    { keys: "Esc", description: "关闭预览。" },
    { keys: "Enter", description: "打开链接。" },
  ],
  notes: [
    "预览内容对读屏用户和触屏用户不可见或难以触达，不要放只能在卡片里完成的操作。",
    "卡片里保持只读信息；需要按钮和表单时用 Popover。",
  ],
} satisfies ComponentMeta;
