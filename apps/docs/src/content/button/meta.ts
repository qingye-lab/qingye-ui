import type { ComponentMeta } from "@/lib/types";

export default {
  title: "按钮 Button",
  description: "触发名称明确的操作或提交表单。按当前任务安排显著程度，完成与保护动作都可以成为重点。",
  category: "通用",
  source: "coss",
  exports: ["Button", "buttonVariants"],
  keywords: ["button", "按钮", "操作", "提交", "loading"],
  api: [
    {
      name: "Button",
      description: "渲染原生 <button>（默认 type=\"button\"）；通过 render 可更换命令载体。真正导航使用原生 a / Link 配合 buttonVariants，以保留链接语义。透传所有原生属性。",
      props: [
        { name: "variant", type: '"default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | "destructive-outline"', default: '"default"', description: "视觉样式。" },
        { name: "size", type: '"xs" | "sm" | "default" | "lg" | "xl" | "icon-xs" | "icon-sm" | "icon" | "icon-lg" | "icon-xl"', default: '"default"', description: "尺寸；icon-* 为仅图标的正方形按钮，与同名文字尺寸等高。" },
        { name: "loading", type: "boolean", default: "false", description: "显示居中的 Spinner、设置 aria-busy 并禁用，文字透明以保留宽度。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用；不透明度降至 64% 并屏蔽指针事件。" },
        { name: "render", type: "ReactElement | (props, state) => ReactElement", description: "替换命令的渲染元素；不会自动把按钮语义改成链接语义。" },
        { name: "nativeButton", type: "boolean", default: "true", description: "命令载体不是原生 <button> 时设为 false；仍保留按钮 role，导航应使用原生链接。" },
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
    "导航用原生 a / Link 配合 buttonVariants；Button render + nativeButton={false} 仍属于按钮命令语义，不要依靠它自动获得 link role。",
    "触屏设备上小于 44px 的按钮会自动扩大点击区域，外观不变。",
  ],
} satisfies ComponentMeta;
