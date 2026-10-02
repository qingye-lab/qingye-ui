import type { ComponentMeta } from "@/lib/types";

export default {
  title: "工具栏 Toolbar",
  description: "把一组相关控件（格式按钮、切换组、下拉选择）收进同一个可键盘漫游的容器，例如编辑器顶部的格式栏。",
  design: {
    "methods": [
      "相成相制",
      "布白有用",
      "进退相承"
    ],
    "whenToUse": [
      "集中操作同一选中对象，如编辑器格式、视图工具与即时命令。"
    ],
    "avoid": [
      "不要把任意按钮容器都叫 toolbar；工具栏焦点不能抢走正文中需要保留的选择和输入。"
    ],
    "composition": [
      "Button、Toggle、Select 等通过 ToolbarButton render 参与漫游；有键盘编辑行为的字段用 ToolbarInput。"
    ],
    "stateOwner": {
      "library": [
        "提供工具栏名称与方向键漫游、分组关系和原语禁用行为，保留各控件原本语义。"
      ],
      "application": [
        "维护当前选中内容、工具效果、快捷键和命令执行状态；恢复正文焦点按应用编辑器处理。"
      ]
    },
    "responsive": [
      "窄屏保留常用命令，次要操作可进 Menu；不要用换行破坏可预期方向键关系。"
    ],
    "customization": [
      "orientation 决定布局与键盘方向；按钮表面由既有 Button / Toggle 组合，避免重复基础控件。"
    ]
  },
  category: "通用",
  source: "coss",
  exports: ["Toolbar", "ToolbarButton", "ToolbarGroup", "ToolbarSeparator", "ToolbarLink", "ToolbarInput"],
  keywords: ["toolbar", "工具栏", "格式栏", "编辑器"],
  api: [
    {
      name: "Toolbar",
      description: "容器：卡片底色、细边框与 4px 内边距。整个工具栏只占一个 Tab 停靠点。",
      props: [
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "排列方向，同时决定方向键（← → 或 ↑ ↓）。" },
        { name: "loopFocus", type: "boolean", default: "true", description: "焦点到末尾后是否回到开头。" },
      ],
    },
    {
      name: "ToolbarButton",
      description: "工具栏中的按钮，本身不带样式；通过 render 渲染为 Button、ToggleGroupItem 或 SelectTrigger。",
      props: [
        { name: "render", type: "ReactElement", description: "实际渲染的控件，例如 <Button size=\"icon\" variant=\"ghost\" />。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用后仍可聚焦，便于读屏用户发现它。" },
      ],
    },
    { name: "ToolbarGroup", description: "把几项归为一组，间距 4px；可整体禁用。" },
    { name: "ToolbarSeparator", description: "组与组之间的分隔线，方向自动与工具栏垂直。" },
    { name: "ToolbarLink / ToolbarInput", description: "参与键盘漫游的链接与输入框。" },
  ],
  keyboard: [
    { keys: "Tab", description: "进入或离开工具栏（整个工具栏只停一次）。" },
    { keys: "← / →", description: "在控件之间移动焦点（纵向工具栏为 ↑ / ↓）。" },
    { keys: "Home / End", description: "跳到第一个 / 最后一个控件。" },
  ],
  notes: [
    "给 Toolbar 一个 aria-label，说明它控制的对象，例如“正文格式”。",
    "仅图标的按钮需要 aria-label，配合 Tooltip 给鼠标用户显示名称。",
    "工具栏不换行：窄屏放不下时减少按钮，把次要操作收进“更多”菜单。",
  ],
} satisfies ComponentMeta;
