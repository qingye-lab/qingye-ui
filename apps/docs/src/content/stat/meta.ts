import type { ComponentMeta } from "@/lib/types";

export default {
  title: "指标 Stat",
  description: "展示单个关键数字：标签、数值、单位、与上一周期的变化和辅助说明。常放在 Card 中组成仪表盘的指标行。",
  category: "数据展示",
  source: "local",
  exports: ["Stat", "StatLabel", "StatValue", "StatUnit", "StatDelta", "StatDescription", "StatSparkline"],
  keywords: ["stat", "metric", "kpi", "指标", "统计", "数值", "趋势"],
  api: [
    {
      name: "Stat",
      description: "指标容器，纵向排列各部件。可通过 render 替换元素。",
      props: [
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "数值字号 20 / 24 / 32px，单位与标签随之缩放。lg 留给一个视图里最重要的那个数字。" },
      ],
    },
    { name: "StatLabel", description: "指标名称，弱化色、500 字重；可带一个图标。" },
    { name: "StatValue", description: "数值，600 字重、等宽数字，可放入 StatUnit 作为前缀（¥）或后缀（台、ms）。" },
    { name: "StatUnit", description: "单位或货币符号，比数值更小、更淡。" },
    {
      name: "StatDelta",
      description: "变化量。颜色表达好坏而不是方向；图标与读屏前缀（上升 / 下降 / 持平）表达方向。",
      props: [
        { name: "trend", type: '"up" | "down" | "flat"', default: '"flat"', description: "变化方向，决定图标与读屏前缀。" },
        { name: "inverse", type: "boolean", default: "false", description: "下降为好（故障率、耗时、成本）时设置：下降显示为成功色，上升显示为危险色。" },
        { name: "variant", type: '"default" | "badge"', default: '"default"', description: "badge 增加淡色底。" },
        { name: "trendLabel", type: "string", description: "覆盖读屏前缀。" },
      ],
    },
    { name: "StatDescription", description: "数值下方的辅助说明，常与 StatDelta 一起写成「+8.2% 较上周」。" },
    {
      name: "StatSparkline",
      description: "不依赖图表库的迷你趋势线，颜色取 currentColor（默认 text-chart-1），线宽在任意尺寸下保持 1.5px。",
      props: [
        { name: "data", type: "readonly number[]", description: "按时间顺序的数值，至少两个点。" },
        { name: "fill", type: "boolean", default: "true", description: "线下方的淡色渐变。" },
        { name: "showEnd", type: "boolean", default: "true", description: "在最新值处画一个圆点。" },
        { name: "label", type: "string", description: "可访问的摘要，例如「近 12 周订单量持续上升」；不传时视为装饰。" },
      ],
    },
  ],
  notes: [
    "变化量写成带符号的百分比并注明对比周期（较上周、环比），读者才能判断。",
    "颜色只表达「好 / 坏」：指标以下降为好时用 inverse，不要反过来改 trend。",
    "StatDelta 自带读屏前缀，颜色不是唯一信息；不要再在文字里重复「上升」。",
    "一个视图只放一个 lg 指标；其余用默认或 sm，避免数字互相争抢。",
  ],
} satisfies ComponentMeta;
