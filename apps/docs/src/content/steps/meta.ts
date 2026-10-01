import type { ComponentMeta } from "@/lib/types";

export default {
  title: "步骤条 Steps",
  description: "展示多步流程的进度：已完成、当前、未开始与出错。用于开户、下单、部署等有先后顺序的任务。",
  category: "导航",
  source: "local",
  exports: ["Steps"],
  keywords: ["steps", "stepper", "步骤", "进度", "向导", "wizard"],
  api: [
    {
      name: "Steps",
      description: "渲染 <ol>；其余属性透传到列表元素。",
      props: [
        { name: "items", type: "StepItem[]", description: "步骤：{ id, title, description?, status?, icon?, disabled? }。" },
        { name: "current", type: "number", description: "当前步骤的索引；之前的为已完成，之后的为未开始。" },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "排列方向。步骤多或说明较长时用 vertical。" },
        { name: "size", type: '"sm" | "default"', default: '"default"', description: "指示器 20px / 28px。" },
        { name: "onStepClick", type: "(index, item) => void", description: "提供后每个步骤渲染为按钮，可点击跳转。" },
        { name: "label", type: "string", default: '"步骤"', description: "列表的无障碍名称。" },
      ],
    },
    {
      name: "StepItem",
      description: "单个步骤的数据。",
      props: [
        { name: "status", type: '"complete" | "current" | "upcoming" | "error"', description: "覆盖根据 current 推导的状态，常用于标记出错。" },
        { name: "icon", type: "ReactNode", description: "替换指示器中的序号；已完成与出错仍显示对勾与叉号。" },
        { name: "disabled", type: "boolean", description: "可点击模式下禁止选中该步骤。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Tab", description: "可点击模式下依次聚焦每个步骤。" },
    { keys: "← / →（垂直时 ↑ / ↓）", description: "在可点击的步骤之间移动焦点。" },
    { keys: "Home / End", description: "聚焦第一个 / 最后一个可点击步骤。" },
    { keys: "Enter / Space", description: "跳转到聚焦的步骤。" },
  ],
  notes: [
    "当前步骤带 aria-current=\"step\"；每个步骤的状态以隐藏文字读出，不只依赖颜色。",
    "线性流程中，只让已完成的步骤可点击：把之后的步骤设为 disabled。",
    "超过 4 个步骤或在窄屏上，优先使用 vertical。",
  ],
} satisfies ComponentMeta;
