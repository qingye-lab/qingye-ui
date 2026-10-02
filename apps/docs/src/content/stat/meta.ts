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
        { name: "data", type: "readonly number[]", description: "按时间顺序的数值，至少两个点；非有限数值保留时间位置并断开趋势线，末项缺测时不显示最新值圆点。" },
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
    "lg 留给当下重要的指标；比较同级指标时保持相同字号与单位，不为制造层级改变它们的可比性。",
  ],
  design: {
    "methods": [
      "名实相符",
      "相成相制"
    ],
    "whenToUse": [
      "读取一个关键量及其单位、比较周期与趋势。"
    ],
    "avoid": [
      "零与未采集混淆；上涨永远绿色；缺测被删除后跨时间连接；为了层级让同级比较字号不同。"
    ],
    "composition": [
      "Label/Value/Unit 明确量纲；Delta 的 trend 说明方向，inverse 说明好坏；Sparkline 缺测断线且保留时间位置。"
    ],
    "stateOwner": {
      "library": [
        "指标部位、方向文字、情感颜色与趋势线几何。"
      ],
      "application": [
        "真实数值、周期、好坏规则、缺测事实与摘要。"
      ]
    },
    "responsive": [
      "长标签和单位可换行，保留数值容量；迷你线不能成为唯一数据来源。"
    ],
    "customization": [
      "size 按任务层级选择，Sparkline label 提供趋势事实，主题不改变 inverse 的业务含义。"
    ]
  },
} satisfies ComponentMeta;
