import type { ComponentMeta } from "@/lib/types";

export default {
  title: "按钮 Button",
  description: "触发一个操作。每个区域只放一个主按钮，其余用 outline、ghost 等次要样式。",
  category: "通用",
  source: "coss",
  exports: ["Button"],
  keywords: ["button", "按钮", "操作"],
  api: [
    {
      name: "Button",
      description: "渲染原生 <button>；通过 render 可渲染为链接等元素。",
      props: [
        { name: "variant", type: '"default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | "destructive-outline"', default: '"default"', description: "视觉样式。" },
        { name: "size", type: '"xs" | "sm" | "default" | "lg" | "xl" | "icon-xs" | "icon-sm" | "icon" | "icon-lg" | "icon-xl"', default: '"default"', description: "尺寸；icon-* 为仅图标的正方形按钮。" },
        { name: "loading", type: "boolean", default: "false", description: "显示加载指示并禁用，保留按钮宽度。" },
        { name: "render", type: "ReactElement | (props) => ReactElement", description: "替换渲染元素，例如 <a>。" },
        { name: "nativeButton", type: "boolean", default: "true", description: "render 为非 button 元素时设为 false，以保持键盘与禁用语义。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Enter / Space", description: "触发按钮。" },
    { keys: "Tab", description: "移动焦点到下一个可聚焦元素。" },
  ],
  notes: [
    "仅图标的按钮必须提供 aria-label。",
    "危险操作用 destructive，并在不可撤销时配合 AlertDialog 二次确认。",
  ],
} satisfies ComponentMeta;
