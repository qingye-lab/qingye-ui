import type { ComponentMeta } from "@/lib/types";

export default {
  title: "按钮组 ButtonGroup",
  description:
    "把相关的按钮、输入框或选择框拼接成一个整体，共享边框与圆角，例如分页切换、拆分按钮和“输入 + 操作”。它是 Group 的 shadcn 命名别名，两者是同一个组件。",
  category: "通用",
  source: "coss",
  exports: ["ButtonGroup", "ButtonGroupSeparator", "ButtonGroupText"],
  keywords: ["button group", "group", "按钮组", "拆分按钮", "split button", "segmented"],
  api: [
    {
      name: "ButtonGroup",
      description: '容器（即 Group），role="group"；相邻子元素合并边框与圆角，聚焦的子元素浮到上层以完整显示焦点环。嵌套的 ButtonGroup 之间留出间距。',
      props: [
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "排列方向。" },
        { name: "aria-label", type: "string", description: "为一组操作命名，屏幕阅读器会读出。" },
      ],
    },
    {
      name: "ButtonGroupSeparator",
      description: "子元素之间的分隔线（即 GroupSeparator），用于实心按钮之间；相邻输入框聚焦时随之高亮。",
      props: [{ name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "竖直组中改为 horizontal。" }],
    },
    {
      name: "ButtonGroupText",
      description: "不可交互的文字块（即 GroupText），用于前缀、单位或说明；通过 render 可渲染为 <label>。",
    },
  ],
  keyboard: [{ keys: "Tab", description: "依次聚焦组内的每个控件；按钮组本身不拦截方向键。" }],
  notes: [
    "只把同一主题的操作放在一组，最多 3–5 个；需要单选切换时用 ToggleGroup 或 SegmentedControl。",
    "仅图标的按钮必须提供 aria-label。",
    "实心按钮之间加 ButtonGroupSeparator，描边按钮自带边框，不需要分隔线。",
  ],
} satisfies ComponentMeta;
