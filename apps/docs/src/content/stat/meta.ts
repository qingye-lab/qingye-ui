import type { ComponentMeta } from "@/lib/types";
export default {
  title: "度量 Stat", titleEn: "Stat", description: "数值、单位与说明分别提供。", descriptionEn: "Values, units and explanations supplied independently.",
  category: "数据展示", layer: "pattern", source: "local", exports: ["Stat", "StatLabel", "StatValue", "StatUnit", "StatDescription", "StatDelta"],
  decisions: "dl/dt/dd 保留度量关系；零值不消失，未知和不适用必由应用说明。变化量必须说明参照期，方向由箭头与文字表达；好坏只由应用声明，未声明时用墨色。", decisionsEn: "dl/dt/dd preserve metric relationships; zero remains visible and the application explains unknown and inapplicable values. A change names its reference period and shows direction with an arrow and text; only the application declares good or bad, otherwise it stays in ink.",
  design: { methods: ["名实相符", "布白有用"], whenToUse: ["需要识别一个度量的名称、值和单位。"], avoid: ["跨对象比较使用 Table；趋势图形由具备真实数据的应用组合。"], stateOwner: { library: ["度量名称、值、单位与说明的语义关系。"], application: ["统计口径、数值状态、更新时间与变化事实。"] }, responsive: ["数值与单位可换行，未知状态不缩为零。"] }, designEn: {"whenToUse":["Identify a metric's name, value, and unit."],"avoid":["Use Table for cross-object comparison; applications with actual data compose trend graphics."],"stateOwner":{"library":["Semantic relationships among metric names, values, units, and explanations."],"application":["Measurement definitions, numeric states, update times, and change facts."]},"responsive":["Values/units wrap; unknown never shrinks to zero."]},
  api: [
    { name: "StatDelta", description: "与参照期相比的变化量（dd）。", descriptionEn: "Change against a reference period (dd).", props: [
      { name: "value", type: "number", description: "带符号的变化量。", descriptionEn: "The signed change." },
      { name: "period", type: "string", description: "参照期，例如「较上周」；必填。", descriptionEn: "The reference period such as \"vs last week\"; required." },
      { name: "format", type: "(absolute: number) => string", description: "绝对值的显示，例如百分比。", descriptionEn: "How the absolute value is shown, such as a percentage." },
      { name: "sentiment", type: '"good" | "bad"', description: "应用声明的好坏；不声明时用墨色。", descriptionEn: "Good or bad as declared by the application; otherwise ink." },
    ] },
    { name: "Stat", description: "dl，状态必填。", descriptionEn: "A dl with required state.", props: [{ name: "state", type: '"known" | "unknown" | "not-applicable"', description: "应用确认的度量状态，不产生替代数值。", descriptionEn: "An application-owned metric state that generates no replacement value." }, { name: "render / ref / native props", type: "useRender.ComponentProps<dl>", description: "传入标题和值；属性属于实际 dl。", descriptionEn: "Supply labels and values; props reach the actual dl." }] },
    { name: "StatLabel / StatValue / StatDescription", description: "dt / dd / dd。", descriptionEn: "dt / dd / dd parts.", props: [{ name: "children / render / ref / native props", type: "useRender.ComponentProps<dt | dd>", description: "值可为数字或状态文字，0 原样保留。", descriptionEn: "Values may be numbers or state text; zero is preserved." }] },
    { name: "StatUnit", description: "StatValue 中的 span。", descriptionEn: "A span inside StatValue.", props: [{ name: "children / render / native props", type: "useRender.ComponentProps<span>", description: "单位由应用提供，不猜测量纲。", descriptionEn: "The caller supplies units; the component infers no dimension." }] },
  ], notes: ["统计口径、更新时间和变化判断属于应用事实；说明可省略。"], notesEn: ["Definitions, update times and changes are application facts; descriptions are optional."],
} satisfies ComponentMeta;
