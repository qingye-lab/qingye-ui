import type { ComponentMeta } from "@/lib/types";

export default {
  title: "按钮 Button",
  description: "触发一个操作或提交表单。每个区域只放一个主按钮，其余用 outline、secondary、ghost 等次要样式。",
  category: "通用",
  source: "coss",
  exports: ["Button", "buttonVariants"],
  keywords: ["button", "按钮", "操作", "提交", "loading"],
  api: [
    {
      name: "Button",
      description: "渲染原生 <button>（默认 type=\"button\"）；通过 render 可渲染为链接等元素。透传所有原生属性。",
      props: [
        { name: "variant", type: '"default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | "destructive-outline"', default: '"default"', description: "视觉样式。" },
        { name: "size", type: '"xs" | "sm" | "default" | "lg" | "xl" | "icon-xs" | "icon-sm" | "icon" | "icon-lg" | "icon-xl"', default: '"default"', description: "尺寸；icon-* 为仅图标的正方形按钮，与同名文字尺寸等高。" },
        { name: "loading", type: "boolean", default: "false", description: "显示居中的 Spinner、设置 aria-busy 并禁用，文字透明以保留宽度。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用；不透明度降至 64% 并屏蔽指针事件。" },
        { name: "render", type: "ReactElement | (props, state) => ReactElement", description: "替换渲染元素，例如 <a> 或路由库的 Link。" },
        { name: "nativeButton", type: "boolean", default: "true", description: "render 为非 <button> 元素时设为 false，以保持键盘与禁用语义。" },
      ],
    },
    {
      name: "buttonVariants",
      description: "cva 样式函数，供需要按钮外观但不渲染 Button 的场景使用，如分页链接。",
    },
  ],
  keyboard: [
    { keys: "Enter / Space", description: "触发按钮。" },
    { keys: "Tab / Shift+Tab", description: "移入、移出焦点；键盘聚焦时显示焦点环。" },
  ],
  notes: [
    "仅图标的按钮必须提供 aria-label，图标加 aria-hidden。",
    "危险操作用 destructive；不可撤销时配合 AlertDialog 二次确认。",
    "loading 与 disabled 一样会禁用按钮，并保留原有宽度；需要显示进度文字时用 Spinner + disabled 自行组合。",
    "导航用 render={<a href=… />} 并设 nativeButton={false}，不要在 onClick 里跳转。",
    "触屏设备上小于 44px 的按钮会自动扩大点击区域，外观不变。",
  ],
} satisfies ComponentMeta;
