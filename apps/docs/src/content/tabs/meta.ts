import type { ComponentMeta } from "@/lib/types";

export default {
  title: "标签页 Tabs",
  description: "在同一位置切换几组相关内容，例如项目的概览、成员与设置。切换的是页面内的面板；跳转到不同地址请用导航链接。",
  category: "导航",
  source: "coss",
  exports: ["Tabs", "TabsList", "TabsTab", "TabsPanel"],
  keywords: ["tabs", "标签页", "选项卡", "切换", "underline"],
  api: [
    {
      name: "Tabs",
      description: "根组件，管理当前选中的标签。",
      props: [
        { name: "value", type: "any", description: "受控的当前值。" },
        { name: "defaultValue", type: "any", default: "0", description: "非受控时的初始值。" },
        { name: "onValueChange", type: "(value, details) => void", description: "选中标签变化时调用。" },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "排列方向；纵向时列表在左、面板在右，方向键改为上下。" },
      ],
    },
    {
      name: "TabsList",
      description: "标签容器，内含滑动的选中指示器。",
      props: [
        { name: "variant", type: '"default" | "underline"', default: '"default"', description: "default 为分段底板加浮起滑块；underline 为下划线，适合页面级分区。" },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "标签高度，移动端自动加高 4px。" },
        { name: "activateOnFocus", type: "boolean", default: "false", description: "方向键移动焦点时是否立即切换面板。" },
      ],
    },
    {
      name: "TabsTab",
      description: "单个标签，别名 TabsTrigger。可放图标与计数。",
      props: [
        { name: "value", type: "any", description: "与对应 TabsPanel 的 value 相同。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用该标签。" },
      ],
    },
    {
      name: "TabsPanel",
      description: "标签对应的内容面板，别名 TabsContent。",
      props: [
        { name: "value", type: "any", description: "与对应 TabsTab 的 value 相同。" },
        { name: "keepMounted", type: "boolean", default: "false", description: "隐藏时是否保留在 DOM 中。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Tab", description: "焦点进入当前选中的标签，再按一次进入面板。" },
    { keys: "← / →", description: "在横向标签之间移动焦点（纵向时为 ↑ / ↓）。" },
    { keys: "Home / End", description: "移动到第一个 / 最后一个标签。" },
    { keys: "Enter / Space", description: "选中获得焦点的标签。" },
  ],
  notes: [
    "标签数量多、窄屏放不下时，把 TabsList 放进 ScrollArea 横向滚动，不要换行。",
    "计数用 numeric 等宽数字，避免数字变化时标签宽度跳动。",
    "仅图标的标签需要 aria-label。",
    "粗指针设备上标签的点击区域自动扩大到 44px，外观不变。",
  ],
} satisfies ComponentMeta;
