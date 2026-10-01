import type { ComponentMeta } from "@/lib/types";

export default {
  title: "复选框 Checkbox",
  description: "独立的是 / 否选择，或在一组选项中多选。选择立即生效的开关设置改用 Switch。",
  category: "表单",
  source: "coss",
  exports: ["Checkbox"],
  keywords: ["checkbox", "复选框", "勾选", "多选"],
  api: [
    {
      name: "Checkbox",
      description: "Base UI Checkbox.Root，渲染为 <button role=\"checkbox\"> 加隐藏的原生输入。",
      props: [
        { name: "checked / defaultChecked / onCheckedChange", type: "boolean / (checked, details) => void", description: "受控 / 非受控的勾选状态。" },
        { name: "indeterminate", type: "boolean", default: "false", description: "半选状态，常用于「全选」。" },
        { name: "name / value", type: "string", description: "表单字段名与提交值（默认 \"on\"）。" },
        { name: "disabled / readOnly / required", type: "boolean", description: "禁用、只读、必填。" },
        { name: "aria-invalid", type: "boolean", description: "错误边框；在 Field 中由校验状态自动设置。" },
        { name: "parent", type: "boolean", description: "在 CheckboxGroup 中作为控制全部子项的父复选框。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Space", description: "切换勾选。" },
    { keys: "Tab", description: "移到下一个复选框。" },
  ],
  notes: [
    "用 Label 包住复选框和文字，整行都可点击；触屏设备上点击区扩大到 44px，不改变外观。",
    "说明文字放进 Field，以便作为 aria-describedby 读出。",
    "一组复选框用 CheckboxGroup 管理数组值。",
  ],
} satisfies ComponentMeta;
