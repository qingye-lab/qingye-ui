import type { ComponentMeta } from "@/lib/types";

export default {
  title: "图表 Chart",
  description: "基于 Recharts 的图表外壳：用 config 统一管理系列名称与颜色，并把坐标轴、网格、提示框、图例调成与组件库一致的克制样式。",
  category: "数据展示",
  source: "local",
  exports: [
    "ChartContainer",
    "ChartTooltip",
    "ChartTooltipContent",
    "ChartLegend",
    "ChartLegendContent",
    "RechartsPrimitive",
    "type ChartConfig",
  ],
  keywords: ["chart", "graph", "recharts", "图表", "折线图", "柱状图", "面积图", "环形图", "饼图", "可视化"],
  api: [
    {
      name: "ChartContainer",
      description: "响应式容器（默认 16:9，可用 aspect-* 或高度类覆盖），并为每个系列提供 --color-<key> 变量。",
      props: [
        { name: "config", type: "ChartConfig", description: "系列 key → { label, color?, theme?, icon? }。color 可写 var(--chart-1) 等主题感知的变量；theme 分别给出 { light, dark }。未给颜色的系列按 config 顺序取 --chart-1…5，超出则为中性灰。" },
        { name: "initialDimension", type: "{ width: number; height: number }", default: "{ width: 320, height: 200 }", description: "测量前使用的尺寸（服务端渲染、测试）。" },
        { name: "children", type: "ReactElement", description: "一个 Recharts 图表，如 <AreaChart>。" },
      ],
    },
    { name: "ChartTooltip", description: "即 Recharts 的 Tooltip，传 content={<ChartTooltipContent />}。" },
    {
      name: "ChartTooltipContent",
      description: "浮层样式的提示框：数值在右、等宽数字、强调色只用于指示标记。",
      props: [
        { name: "indicator", type: '"dot" | "line" | "dashed"', default: '"dot"', description: "系列标记样式。折线图建议 line。" },
        { name: "hideLabel / hideIndicator", type: "boolean", default: "false", description: "隐藏标题行 / 隐藏系列标记。" },
        { name: "labelFormatter", type: "(label, payload) => ReactNode", description: "格式化标题行，例如把日期写成「9 月 30 日 周二」。" },
        { name: "valueFormatter", type: "(value, name, item) => ReactNode", description: "格式化每个数值；默认按界面语言加千分位。" },
        { name: "formatter", type: "Recharts formatter", description: "完全接管一行的渲染。" },
        { name: "nameKey / labelKey", type: "string", description: "从数据中取哪个字段去 config 查找名称。" },
      ],
    },
    { name: "ChartLegend", description: "即 Recharts 的 Legend，传 content={<ChartLegendContent />}。" },
    {
      name: "ChartLegendContent",
      description: "图例：标记形状跟随图形（折线为短线，柱与面积为方块），文字用弱化色。",
      props: [
        { name: "nameKey", type: "string", description: "从数据中取哪个字段去 config 查找名称（饼图常用）。" },
        { name: "hideIcon", type: "boolean", default: "false", description: "不显示 config 中的 icon。" },
      ],
    },
    { name: "RechartsPrimitive", description: "Recharts 命名空间的再导出。在应用中也可以直接从 recharts 导入图形组件。" },
  ],
  keyboard: [
    { keys: "Tab", description: "聚焦图表（Recharts 的可访问层），出现焦点环。" },
    { keys: "← / →", description: "在数据点之间移动，同步显示提示框。" },
  ],
  notes: [
    "recharts 是可选的 peer 依赖：用到图表时安装 recharts@^3.10.1。",
    "两个及以上系列时总是显示图例；只有一个系列时用卡片标题说明内容，不再放图例。",
    "颜色跟随实体而不是排名：筛选掉某个系列时，其余系列保持原色。超过 5 个系列请合并为「其他」或拆成多张小图。",
    "不要使用双 Y 轴；量纲不同的两个指标分成两张图。",
    "提示框只是增强：关键数值应同时出现在标题、Stat 或表格中，键盘与读屏用户才能获取。",
    "颜色变量写成 var(--color-<key>)，config 的 key 需是合法的 CSS 标识符（字母、数字、连字符）。",
  ],
} satisfies ComponentMeta;
