import type { ComponentMeta } from "@/lib/types";

export default {
  title: "控件组 Group",
  description: "把相邻的按钮、输入框、选择器拼成一个整体：共享边框、只在两端保留圆角。用于分段操作、带前后缀的输入、拆分按钮等。",
  category: "通用",
  source: "coss",
  exports: ["Group", "GroupSeparator", "GroupText"],
  keywords: ["group", "button group", "控件组", "按钮组", "拆分按钮", "输入组合"],
  api: [
    {
      name: "Group",
      description: "容器，带 role=\"group\"；子控件相接处的圆角与边框自动去掉。别名 ButtonGroup。",
      props: [
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "排列方向。" },
        { name: "aria-label", type: "string", description: "说明这组控件的用途。" },
      ],
    },
    {
      name: "GroupSeparator",
      description: "相邻控件之间的分隔线；相邻输入框聚焦时随之变为焦点色。别名 ButtonGroupSeparator。",
      props: [{ name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "纵向组里用 horizontal。" }],
    },
    {
      name: "GroupText",
      description: "不可交互的文字块，作前缀或后缀（如 https://、元）。用 render 渲染为 Label 以关联输入框。别名 ButtonGroupText。",
    },
  ],
  keyboard: [{ keys: "Tab", description: "依次聚焦组内每个控件；组本身不改变键盘行为。" }],
  notes: [
    "同一组内的控件保持同一尺寸与样式（都用 outline 或都用 default）。",
    "需要方向键漫游、单选或多选时，改用 ToggleGroup 或 Toolbar。",
    "组可以嵌套：外层组的子组之间保留 8px 间距。",
  ],
} satisfies ComponentMeta;
