import type { ComponentMeta } from "@/lib/types";

export default {
  title: "字段组 Fieldset",
  description: "把一组相关的表单项放在同一个标题下，例如“发票信息”“通知方式”；可整体禁用。",
  category: "表单",
  source: "coss",
  exports: ["Fieldset", "FieldsetLegend", "FieldSet", "FieldLegend"],
  keywords: ["fieldset", "legend", "字段组", "分组"],
  api: [
    {
      name: "Fieldset",
      description: "基于 Base UI Fieldset，渲染 <fieldset>，子项纵向排列、间距 16px。别名 FieldSet。",
      props: [{ name: "disabled", type: "boolean", default: "false", description: "禁用组内所有表单项。" }],
    },
    {
      name: "FieldsetLegend",
      description: "组标题，渲染为带语义的 legend。别名 FieldLegend。",
      props: [
        { name: "variant", type: '"legend" | "label"', default: '"legend"', description: "legend 为分节标题；label 与字段标签同级，用于一组复选框或单选。" },
      ],
    },
  ],
  notes: [
    "读屏进入组内控件时会先读出组标题，标签可以写得更短，例如“城市”而不是“收货城市”。",
    "一组复选框、单选按钮共用一个问题时，用 variant=\"label\" 的 legend 作为问题。",
  ],
} satisfies ComponentMeta;
