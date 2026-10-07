import type { ComponentMeta } from "@/lib/types";
export default {
  title: "行内趋势 Sparkline", titleEn: "Sparkline", description: "坐在文字行里的小型折线，说明一个读数最近怎样变化。", descriptionEn: "A small line set in a line of text, showing how a reading has recently changed.", category: "数据展示", layer: "primitive", source: "local", exports: ["Sparkline"], keywords: ["sparkline", "trend", "迷你图", "趋势"],
  decisions: "高一材，线用浓墨、当前一点用焦墨，不用色相；未知点断开而不当作零；可访问名称给出起止与最高最低。", decisionsEn: "One module tall, the line in medium ink and the current point in full ink, without hue. Unknown points break the line rather than becoming zero. The accessible name states the endpoints and the range.",
  api: [{ name: "Sparkline", description: "按顺序的数值与它量的是什么。", descriptionEn: "Ordered values and what they measure.", props: [
    { name: "label", type: "string", description: "这条线量的是什么；是可访问名称的一部分。", descriptionEn: "What the line measures; part of the accessible name." },
    { name: "values", type: "readonly (number | null)[]", description: "按顺序的数值；null 表示未知，画成断开。", descriptionEn: "Ordered values; null is unknown and breaks the line." },
    { name: "format", type: "(value: number) => string", description: "可访问摘要里的读数格式。", descriptionEn: "Formatting for values in the accessible summary." },
    { name: "width", type: "number", default: "100", description: "坐标宽度（px），默认 5 材；高度固定一材。", descriptionEn: "Plot width in px, five modules by default; the height is always one module." },
  ] }],
  design: { methods: ["名实相符", "墨分五色"], whenToUse: ["读数旁需要「最近在变好还是变坏」的形状。"], avoid: ["需要读出具体值或比较多个系列时用 Chart。"], composition: ["放在 StatValue、表格单元格或正文旁；名称与读数由调用方给出。"], stateOwner: { library: ["形状、未知点的断开与可访问摘要。"], application: ["数值、时间范围与格式。"] }, responsive: ["宽度固定，随文字换行。"], customization: ["颜色读墨阶，不开放色相。"] },
  designEn: { whenToUse: ["A reading needs a shape showing whether it has recently improved or worsened."], avoid: ["Use Chart to read exact values or compare several series."], composition: ["Place beside StatValue, in a table cell, or in text; the caller supplies the name and reading."], stateOwner: { library: ["Shape, broken lines at unknown points, and the accessible summary."], application: ["Values, time range, and formatting."] }, responsive: ["Fixed width that wraps with text."], customization: ["Colors come from the ink ladder; hue is not configurable."] },
} satisfies ComponentMeta;
