import type { ComponentMeta } from "@/lib/types";
export default {
  title: "构成 Proportion", titleEn: "Proportion", description: "一个整体由哪几部分组成，各占多少。", descriptionEn: "Which parts make up a whole and how much each takes.", category: "数据展示", layer: "primitive", source: "local", exports: ["Proportion"], keywords: ["proportion", "part to whole", "stacked bar", "构成", "占比"],
  decisions: "用长度而不是角度表达比例，所以不提供饼图；与 Meter 同一条凹槽。两到五个部分按校验过的系列顺序取色，剩余是凹槽本身。图例给出名称、数值与百分比，是完整的文字等价物。", decisionsEn: "Length rather than angle carries the share, so there is no pie; it uses the same groove as Meter. Two to five parts take the validated series order, and the remainder is the groove itself. The legend states names, values and percentages as the full text equivalent.",
  api: [{ name: "Proportion", description: "整体的名称、部分与可选总量。", descriptionEn: "The whole's name, its parts and an optional total.", props: [
    { name: "label", type: "string", description: "整体是什么。", descriptionEn: "What the whole is." },
    { name: "items", type: "readonly { key; label; value }[]", description: "两到五个非负部分；更多时由调用方合并为「其他」。", descriptionEn: "Two to five non-negative parts; fold more into one named part." },
    { name: "total", type: "number", description: "整体总量；省略时等于各部分之和，大于时剩余显示为空槽。", descriptionEn: "The whole; defaults to the sum, and any remainder shows as empty groove." },
    { name: "format", type: "(value: number) => string", description: "图例中数值的格式。", descriptionEn: "Formatting for values in the legend." },
  ] }],
  design: { methods: ["名实相符", "随类赋彩"], whenToUse: ["一个整体的构成需要一眼看出。"], avoid: ["只有一个部分对一个上限时用 Meter；比较各类别的大小用 Chart 柱状。"], composition: ["放在面板、读数旁；名称由调用方给出。"], stateOwner: { library: ["分段、空隙、取色与文字等价物。"], application: ["数值、总量与合并规则。"] }, responsive: ["条占满宽度，图例换行。"], customization: ["系列色来自 chart1..5，不另造调色板。"] },
  designEn: { whenToUse: ["The make-up of a whole should read at a glance."], avoid: ["Use Meter for one part against a limit; use a bar Chart to compare category sizes."], composition: ["Place in panels or beside readings; the caller supplies the name."], stateOwner: { library: ["Segments, gaps, colors and the text equivalent."], application: ["Values, the total and folding rules."] }, responsive: ["The bar fills the width; the legend wraps."], customization: ["Series colors come from chart1..5 without a separate palette."] },
} satisfies ComponentMeta;
