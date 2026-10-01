import type { ComponentMeta } from "@/lib/types";

export default {
  title: "手风琴 Accordion",
  description: "一组可以逐个展开的分节，用于常见问题、分组设置这类“标题一览、按需展开”的内容。只有一个折叠区时用 Disclosure。",
  category: "数据展示",
  source: "coss",
  exports: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionPanel"],
  keywords: ["accordion", "手风琴", "折叠面板", "FAQ", "常见问题"],
  api: [
    {
      name: "Accordion",
      description: "根组件，管理哪些分节处于展开状态。",
      props: [
        { name: "multiple", type: "boolean", default: "false", description: "是否允许同时展开多个分节。" },
        { name: "value / defaultValue", type: "any[]", description: "展开分节的 value 列表（受控 / 非受控）。" },
        { name: "onValueChange", type: "(value: any[]) => void", description: "展开状态变化时调用。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用全部分节。" },
      ],
    },
    {
      name: "AccordionItem",
      description: "单个分节，分节之间以细线分隔。",
      props: [
        { name: "value", type: "any", description: "分节标识；不传时自动生成。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用该分节。" },
      ],
    },
    { name: "AccordionTrigger", description: "分节标题按钮，右侧箭头随展开旋转。外层自动包一个标题元素（h3）。" },
    {
      name: "AccordionPanel",
      description: "分节内容，高度过渡展开与收起，可被中途打断。别名 AccordionContent。",
      props: [
        { name: "keepMounted", type: "boolean", default: "false", description: "收起时保留在 DOM 中。" },
        { name: "hiddenUntilFound", type: "boolean", default: "false", description: "收起时内容仍可被浏览器页内搜索找到并自动展开。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Tab", description: "在分节标题之间移动。" },
    { keys: "Enter / Space", description: "展开或收起当前分节。" },
    { keys: "↑ / ↓", description: "移动到上一个 / 下一个分节标题。" },
    { keys: "Home / End", description: "移动到第一个 / 最后一个分节标题。" },
  ],
  notes: [
    "标题写成问题或名词短语，保持简短；内容很长时考虑拆成独立页面。",
    "不要把必须阅读的信息藏在默认收起的分节里。",
  ],
} satisfies ComponentMeta;
