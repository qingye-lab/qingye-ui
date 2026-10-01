import type { ComponentMeta } from "@/lib/types";

export default {
  title: "切换按钮 Toggle",
  description: "可按下保持的双态按钮，用于开关一项格式或视图设置，例如加粗、收藏、显示网格。",
  category: "通用",
  source: "coss",
  exports: ["Toggle", "toggleVariants"],
  keywords: ["toggle", "切换", "开关按钮", "pressed"],
  api: [
    {
      name: "Toggle",
      description: "基于 Base UI Toggle，渲染 <button aria-pressed>；按下时带 data-pressed。",
      props: [
        { name: "variant", type: '"default" | "outline"', default: '"default"', description: "default 无边框，outline 带边框与内高光。" },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "高度与最小宽度，仅图标时为正方形。" },
        { name: "pressed / defaultPressed", type: "boolean", description: "受控 / 非受控的按下状态。" },
        { name: "onPressedChange", type: "(pressed: boolean, details) => void", description: "按下状态变化时调用。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Enter / Space", description: "切换按下状态。" },
    { keys: "Tab", description: "移入、移出焦点。" },
  ],
  notes: [
    "仅图标的 Toggle 必须提供 aria-label，且文案不随状态改变——状态由 aria-pressed 表达。",
    "一组互斥或相关的选项用 ToggleGroup，不要手动拼多个 Toggle。",
    "需要立即生效并有“开 / 关”语义的设置项用 Switch。",
  ],
} satisfies ComponentMeta;
