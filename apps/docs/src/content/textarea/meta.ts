import type { ComponentMeta } from "@/lib/types";

export default {
  title: "多行输入 Textarea",
  description: "多行文本输入，高度随内容增长。用于备注、描述、反馈等较长的文字。",
  category: "表单",
  source: "coss",
  exports: ["Textarea"],
  keywords: ["textarea", "多行", "文本域", "备注"],
  api: [
    {
      name: "Textarea",
      description: "基于 Base UI Field.Control。外层 <span data-slot=\"textarea-control\"> 承载边框与焦点环，className 作用于外层；其余属性透传给 <textarea>。",
      props: [
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "最小高度与内边距。" },
        { name: "rows", type: "number", description: "初始行数；内容增长时自动加高（field-sizing: content）。" },
        { name: "unstyled", type: "boolean", default: "false", description: "去掉外层样式，供 InputGroup 组合使用。" },
      ],
    },
  ],
  keyboard: [{ keys: "Tab", description: "移入、移出焦点。" }],
  notes: [
    "需要限制最大高度时给外层加 max-h-* 并让 textarea 滚动，例如 className=\"*:max-h-40\"。",
    "需要底部工具栏、发送按钮时用 InputGroup + InputGroupTextarea。",
  ],
} satisfies ComponentMeta;
