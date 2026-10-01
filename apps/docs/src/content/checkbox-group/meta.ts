import type { ComponentMeta } from "@/lib/types";

export default {
  title: "复选框组 CheckboxGroup",
  description: "管理一组复选框的数组值，支持「全选」父复选框。",
  category: "表单",
  source: "coss",
  exports: ["CheckboxGroup", "Checkbox"],
  keywords: ["checkbox group", "复选框组", "多选", "全选"],
  api: [
    {
      name: "CheckboxGroup",
      description: "Base UI CheckboxGroup；子 Checkbox 用 value 标识自己。",
      props: [
        { name: "value / defaultValue / onValueChange", type: "string[]", description: "受控 / 非受控的已选值。" },
        { name: "allValues", type: "string[]", description: "全部子项的值；配合 <Checkbox parent> 实现全选与半选。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用整组。" },
        { name: "aria-labelledby", type: "string", description: "指向组标题；或放进 Fieldset 用 FieldsetLegend 命名。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Tab", description: "在复选框之间移动。" },
    { keys: "Space", description: "切换当前复选框；在父复选框上切换全部。" },
  ],
  notes: ["组需要名称：用 Fieldset + FieldsetLegend，或 aria-labelledby 指向可见标题。"],
} satisfies ComponentMeta;
