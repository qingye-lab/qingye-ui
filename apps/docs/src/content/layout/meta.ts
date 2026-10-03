import type { ComponentMeta } from "@/lib/types";

export default {
  title: "布局 Layout", titleEn: "Layout", category: "布局", layer: "foundation", source: "local",
  description: "用纵向堆叠与横向排列组织内容，间隔按字段、动作、面板或分节关系选择。",
  descriptionEn: "Arrange content vertically or side by side using field, action, panel and section spacing roles.",
  exports: ["Stack", "Inline"], keywords: ["关系间隔", "布局", "stack", "inline", "spacing"],
  decisions: "Stack 纵向排列，Inline 横向排列并默认换行。gap 选择字段、动作或分节关系；语义由 render 与内容提供。",
  decisionsEn: "Stack flows vertically; Inline flows horizontally and wraps by default. Choose field, action or section spacing with gap; render and content supply semantics.",
  api: [
    { name: "Stack", description: "按内容顺序纵向排列。", descriptionEn: "Vertical content flow.", props: [
      { name: "gap", type: '"field" | "fields" | "actions" | "panel" | "section"', default: '"panel"', description: "分别读取 field-gap、field-group-gap、action-gap、panel-gap、section-gap。", descriptionEn: "Reads the corresponding relationship token." },
      { name: "align", type: '"start" | "center" | "end" | "stretch" | "baseline"', default: '"stretch"', description: "横轴对齐。", descriptionEn: "Cross-axis alignment." },
      { name: "render / ref / 原生属性", type: "useRender.ComponentProps<\"div\">", description: "替换元素，透传事件、语言、方向、密度与原生属性。", descriptionEn: "Replace the element and forward native props, events and environment attributes." },
    ] },
    { name: "Inline", description: "相邻动作或内容，可换行。", descriptionEn: "Adjacent actions or content with wrapping.", props: [
      { name: "gap", type: "LayoutGap", default: '"actions"', description: "与 Stack 相同的关系角色。", descriptionEn: "The same relationship roles as Stack." },
      { name: "align", type: "StackProps[\"align\"]", default: '"center"', description: "横排的垂直对齐。", descriptionEn: "Vertical alignment in a row." },
      { name: "wrap", type: "boolean", default: "true", description: "保留全部内容并允许折行。false 需由消费方验证容量。", descriptionEn: "Retains all content and permits wrapping. Consumers must verify capacity when false." },
      { name: "render / ref / 原生属性", type: "useRender.ComponentProps<\"div\">", description: "默认 div；没有自动 group/toolbar 语义。", descriptionEn: "Defaults to div with no automatic group or toolbar role." },
    ] },
  ],
  notes: ["布局没有边框、表面、内边距或业务状态；独立对象边界用 Card。", "角色数值是主题预设。确有特殊关系时在项目组合说明 className/style 覆写理由。", "方向、语言与密度沿真实 DOM 继承；换行不改变内容顺序。"],
  notesEn: ["Layout adds no border, surface, padding or business state; use Card for independent object boundaries.", "Role values are theme presets. Explain special className/style overrides in the project composition.", "Direction, language and density follow the DOM; wrapping does not reorder content."],
  design: { methods: ["布白有用", "相成相制"], whenToUse: ["内容组或动作组需要一致、可独立调整的关系间隔。"], avoid: ["把布局当围合或页面骨架；用数字 gap 代替关系判断。"], composition: ["Stack render 成 section；Inline 组合现有动作；比较保留原生 table/grid。"], stateOwner: { library: ["方向排列、对齐、换行与角色接线。"], application: ["对象、顺序、区域语义、数据与持久状态。"] }, customization: ["优先修改已有角色 token；className/style 是项目特殊关系的例外出口。"], responsive: ["默认换行保留内容；本批页面按裁决只验桌面。"] },
} satisfies ComponentMeta;
