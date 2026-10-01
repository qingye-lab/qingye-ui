import type { ComponentMeta } from "@/lib/types";

export default {
  title: "折叠 Collapsible",
  description: "无样式的折叠原语：一个触发器控制一块内容的展开与收起，高度平滑过渡。触发器外观完全自定，适合“显示更多”、树节点等。需要现成样式时用 Disclosure。",
  category: "布局",
  source: "coss",
  exports: ["Collapsible", "CollapsibleTrigger", "CollapsiblePanel"],
  keywords: ["collapsible", "折叠", "展开", "收起", "显示更多"],
  api: [
    {
      name: "Collapsible",
      description: "根组件。",
      props: [
        { name: "open / defaultOpen", type: "boolean", description: "展开状态（受控 / 非受控）。" },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "展开状态变化时调用。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用。" },
        { name: "render", type: "ReactElement", description: "替换根元素，例如渲染为 <li>。" },
      ],
    },
    { name: "CollapsibleTrigger", description: "触发按钮，不带样式；展开时带 data-panel-open，可据此旋转箭头。用 render 渲染为 Button。" },
    {
      name: "CollapsiblePanel",
      description: "折叠内容，高度过渡。别名 CollapsibleContent。",
      props: [
        { name: "keepMounted", type: "boolean", default: "false", description: "收起时保留在 DOM 中。" },
        { name: "hiddenUntilFound", type: "boolean", default: "false", description: "收起的内容可被页内搜索找到。" },
      ],
    },
  ],
  keyboard: [{ keys: "Enter / Space", description: "展开或收起。" }],
  notes: ["触发器的文字或图标要随状态变化（如“显示更多 / 收起”、箭头旋转），让状态可感知。"],
} satisfies ComponentMeta;
