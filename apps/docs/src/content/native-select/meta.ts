import type { ComponentMeta } from "@/lib/types";

export default {
  title: "原生选择框 NativeSelect",
  description:
    "外观与 Select 触发器一致的原生 <select>。手机上直接唤起系统选择器，适合移动优先的表单和很长的选项列表；需要图标、搜索或自定义选项时用 Select。",
  category: "表单",
  source: "local",
  exports: ["NativeSelect", "NativeSelectOption", "NativeSelectOptGroup"],
  keywords: ["native select", "select", "下拉", "选择框", "原生", "picker"],
  api: [
    {
      name: "NativeSelect",
      description:
        "渲染原生 <select>，其余属性（name、required、form、onChange……）原样透传。放在 Field 中时自动关联 FieldLabel、描述与校验状态。",
      props: [
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "与 Select 触发器相同的尺寸；粗指针下最小高度 44px。" },
        { name: "placeholder", type: "string | boolean", description: "在首位加入值为空的选项，未选择时以占位色显示；true 使用本地化的“请选择”。required 时该项不可再选。" },
        { name: "value / defaultValue", type: "string", description: "受控 / 非受控的值。" },
        { name: "onValueChange", type: "(value: string) => void", description: "选择变化时回调。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用。" },
        { name: "aria-invalid", type: "boolean", description: "标记为无效，显示错误边框；在 Field 中由校验自动设置。" },
        { name: "className", type: "string", description: "作用于外层控件框（边框、背景、宽度）。" },
        { name: "selectClassName", type: "string", description: "作用于内部 <select> 元素。" },
      ],
    },
    { name: "NativeSelectOption", description: "原生 <option>，带 data-slot。" },
    { name: "NativeSelectOptGroup", description: "原生 <optgroup>，用 label 为一组选项命名。" },
  ],
  keyboard: [
    { keys: "Tab", description: "聚焦选择框。" },
    { keys: "Space / Alt + ↓", description: "打开系统选项列表。" },
    { keys: "↑ / ↓", description: "切换选项（部分平台会先打开列表）。" },
    { keys: "字母或数字", description: "跳到以该字符开头的选项。" },
  ],
  notes: [
    "选项只能是纯文本：不能放图标、描述或多行内容，下拉列表的外观由操作系统决定。",
    "几十上百项的列表（省份、国家、时区）优先用它，系统选择器在手机上比自定义弹层更顺手。",
    "需要明确的“未选择”状态时设置 placeholder，并配合 required 让表单校验生效。",
  ],
} satisfies ComponentMeta;
