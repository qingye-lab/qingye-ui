import type { ComponentMeta } from "@/lib/types";

export default {
  title: "开关 Switch",
  description: "切换一项立即生效的设置，例如启用通知。需要提交后才生效的选择用 Checkbox。",
  category: "表单",
  source: "coss",
  exports: ["Switch"],
  keywords: ["switch", "开关", "toggle", "启用"],
  api: [
    {
      name: "Switch",
      description: "Base UI Switch.Root，渲染为 <button role=\"switch\"> 加隐藏的原生输入。",
      props: [
        { name: "checked / defaultChecked / onCheckedChange", type: "boolean / (checked, details) => void", description: "受控 / 非受控的开关状态。" },
        { name: "name / value", type: "string", description: "表单字段名与提交值。" },
        { name: "disabled / readOnly / required", type: "boolean", description: "禁用、只读、必填。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Space / Enter", description: "切换开关。" },
    { keys: "Tab", description: "移到下一个控件。" },
  ],
  notes: [
    "开关必须有可见标签说明它控制什么，标签写设置名而不是「开 / 关」。",
    "触屏设备上点击区扩大到 44px，不改变外观。",
    "从右到左（RTL）布局中滑块方向自动镜像。",
  ],
} satisfies ComponentMeta;
