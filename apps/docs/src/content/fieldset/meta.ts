import type { ComponentMeta } from "@/lib/types";

export default {
  title: "字段组 Fieldset",
  description: "把一组相关的表单项放在同一个标题下，例如“发票信息”“通知方式”；可整体禁用。",
  category: "表单",
  source: "coss",
  exports: ["Fieldset", "FieldsetLegend", "FieldSet", "FieldLegend"],
  keywords: ["fieldset", "legend", "字段组", "分组"],
  design: {
    "methods": [
      "相成相制",
      "布白有用",
      "名实相符"
    ],
    "whenToUse": [
      "给相关字段或选项提供共同问题与作用范围。"
    ],
    "avoid": [
      "只有布局关系时不要额外制造语义分组；每个字段仍需自身名称。"
    ],
    "composition": [
      "Legend 定义共同问题，Field 或 Radio/CheckboxGroup 承载组内独立控件。"
    ],
    "stateOwner": {
      "library": [
        "原生 fieldset、legend 关联与禁用传播。"
      ],
      "application": [
        "分组问题、成员数据和操作范围。"
      ]
    },
    "responsive": [
      "组容器允许收缩，长 legend 可换行；组内字段按任务保留空间。"
    ],
    "customization": [
      "variant=label 适合紧凑选项组，不以缩小命中区换密度。"
    ]
  },
  api: [
    {
      name: "Fieldset",
      description: "基于 Base UI Fieldset，渲染 <fieldset>，子项纵向排列、间距 16px。别名 FieldSet。",
      props: [{ name: "disabled", type: "boolean", default: "false", description: "禁用组内所有表单项。" }],
    },
    {
      name: "FieldsetLegend",
      description:
        "组标题，自动通过 aria-labelledby 关联到 <fieldset>，读屏进入组内控件前会先读出它。Base UI 渲染的是 div 而非原生 <legend>（原生 legend 无法随内容自动布局），语义由 aria-labelledby 提供。别名 FieldLegend。",
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
