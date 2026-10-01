import type { ComponentMeta } from "@/lib/types";

export default {
  title: "悬停卡片 HoverCard",
  description:
    "鼠标悬停或键盘聚焦链接时，预览链接背后的内容，例如成员资料或项目摘要。它是 PreviewCard 的 shadcn 命名别名，两者是同一个组件。",
  category: "浮层",
  source: "coss",
  exports: ["HoverCard", "HoverCardTrigger", "HoverCardContent"],
  keywords: ["hover card", "preview card", "悬停", "预览", "名片", "资料卡"],
  api: [
    {
      name: "HoverCard",
      description: "根部件（即 PreviewCard），管理开关状态。",
      props: [
        { name: "open / defaultOpen / onOpenChange", type: "boolean / (open) => void", description: "受控 / 非受控的开关。" },
      ],
    },
    {
      name: "HoverCardTrigger",
      description: "触发的链接，默认渲染 <a>；应当是一个真实可访问的链接。",
      props: [
        { name: "delay", type: "number", default: "600", description: "悬停多少毫秒后打开。" },
        { name: "closeDelay", type: "number", default: "300", description: "移开多少毫秒后关闭。" },
        { name: "render", type: "ReactElement", description: "接入路由库的 Link。" },
      ],
    },
    {
      name: "HoverCardContent",
      description: "卡片浮层（别名 HoverCardPopup、PreviewCardPopup），默认宽 16rem。",
      props: [
        { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "相对触发器的对齐方式。" },
        { name: "sideOffset", type: "number", default: "4", description: "与触发器的距离。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Tab", description: "聚焦触发链接时打开卡片，移开焦点后关闭。" },
    { keys: "Enter", description: "跟随链接。" },
    { keys: "Esc", description: "关闭卡片。" },
  ],
  notes: [
    "卡片只做预览：不要把唯一的操作入口放进去，触屏设备上它不会出现。",
    "卡片内容在打开时才渲染，可以按需加载数据。",
    "需要点击才出现、且包含表单或操作的浮层，请用 Popover。",
  ],
} satisfies ComponentMeta;
