import type { ComponentMeta } from "@/lib/types";

export default {
  title: "可调整面板 Resizable",
  description:
    "用拖动分隔条调整相邻面板的大小，适合文件浏览、编辑器、对比视图等多栏工作区。支持横向、纵向、嵌套、最小 / 最大尺寸与折叠，无第三方依赖。",
  category: "布局",
  source: "local",
  exports: ["ResizablePanelGroup", "ResizablePanel", "ResizableHandle"],
  keywords: ["resizable", "split", "splitter", "panel", "分栏", "拖动", "调整大小", "分隔条"],
  api: [
    {
      name: "ResizablePanelGroup",
      description: "面板与分隔条的容器，填满父元素；尺寸以百分比计算，总和恒为 100。",
      props: [
        { name: "direction", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "horizontal 左右排列，vertical 上下排列。" },
        { name: "onLayout", type: "(sizes: number[]) => void", description: "布局变化时回调各面板百分比，可用于持久化。拖动时会连续触发。" },
        { name: "keyboardStep", type: "number", default: "5", description: "方向键每次移动的百分比。" },
      ],
    },
    {
      name: "ResizablePanel",
      description: "一个面板，超出部分裁切；内容的内边距写在子元素上。",
      props: [
        { name: "defaultSize", type: "number", description: "初始百分比；未设置的面板平分剩余空间。" },
        { name: "minSize / maxSize", type: "number", default: "0 / 100", description: "百分比约束。拖到最小值后，再拖动会依次压缩更远的面板。" },
        { name: "collapsible", type: "boolean", default: "false", description: "拖过最小值的一半时收起到 collapsedSize。" },
        { name: "collapsedSize", type: "number", default: "0", description: "收起后的百分比。" },
        { name: "onResize / onCollapse / onExpand", type: "(size) => void / () => void", description: "尺寸变化、收起、展开时回调。" },
        { name: "panelRef", type: "Ref<{ collapse; expand; resize; getSize; isCollapsed }>", description: "命令式控制，例如用按钮切换侧栏。" },
      ],
    },
    {
      name: "ResizableHandle",
      description: '分隔条，role="separator"，可聚焦。悬停与拖动时线条加深，光标在到达边界时提示可移动方向。',
      props: [
        { name: "withHandle", type: "boolean", default: "false", description: "在线条中部显示握把。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁止拖动与键盘调整。" },
        { name: "aria-label", type: "string", default: "“调整大小”", description: "分隔条的无障碍名称；有多个分隔条时建议分别命名。" },
      ],
    },
  ],
  keyboard: [
    { keys: "← / →", description: "横向分组中移动分隔条（RTL 下方向相反）。" },
    { keys: "↑ / ↓", description: "纵向分组中移动分隔条。" },
    { keys: "Home / End", description: "让分隔条前面的面板缩到最小 / 放到最大。" },
    { keys: "Enter", description: "收起或恢复相邻的可折叠面板。" },
  ],
  notes: [
    "分组会填满父元素，记得给外层一个确定的高度（例如 h-80），纵向分组尤其需要。",
    "分隔条的可点按区域比 1px 线条宽，触屏下进一步加宽；拖动期间全局保持调整光标，不会误选文字。",
    "不建议在手机上依赖拖动调整布局，窄屏可改为上下堆叠或用 Tabs 切换。",
  ],
} satisfies ComponentMeta;
