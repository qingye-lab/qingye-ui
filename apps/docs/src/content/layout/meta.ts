import type { ComponentMeta } from "@/lib/types";

export default {
  title: "布局 Layout", titleEn: "Layout", category: "布局", layer: "foundation", source: "local",
  description: "用纵向堆叠、横向排列与等宽多列组织内容，间隔按成对、字段、动作、面板或分节关系选择。",
  descriptionEn: "Arrange content vertically, side by side or in equal columns using pair, field, action, panel and section spacing roles.",
  exports: ["Stack", "Inline", "Grid"], keywords: ["关系间隔", "布局", "stack", "inline", "grid", "justify", "多列", "spacing"],
  decisions: "Stack 纵向排列，Inline 横向排列并默认换行，Grid 等宽多列。gap 选择成对、字段、动作或分节关系；语义由 render 与内容提供。",
  decisionsEn: "Stack flows vertically; Inline flows horizontally and wraps by default; Grid lays out equal-width columns. Choose pair, field, action or section spacing with gap; render and content supply semantics.",
  api: [
    { name: "Stack", description: "按内容顺序纵向排列。", descriptionEn: "Vertical content flow.", props: [
      { name: "gap", type: '"pair" | "field" | "fields" | "actions" | "panel" | "section"', default: '"panel"', description: "pair 为一分（4px），用于成对读的名称与其说明、数值与单位；其余分别读取 field-gap、field-group-gap、action-gap、panel-gap、section-gap。", descriptionEn: "pair is one fen (4px) for things read as a pair: a name and its description, or a value and its unit; the others read field-gap, field-group-gap, action-gap, panel-gap and section-gap." },
      { name: "align", type: '"start" | "center" | "end" | "stretch" | "baseline"', default: '"stretch"', description: "横轴对齐。", descriptionEn: "Cross-axis alignment." },
      { name: "justify", type: '"start" | "center" | "end" | "between" | "around" | "evenly"', description: "主轴（纵向）分布。不设则保持默认；容器高于内容时才看得出。", descriptionEn: "Main-axis (vertical) distribution. Unset keeps the default; visible only when the container is taller than its content." },
      { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "useRender.ComponentProps<\"div\">", description: "替换元素，透传事件、语言、方向、密度与原生属性。", descriptionEn: "Replace the element and forward native props, events and environment attributes." },
    ] },
    { name: "Inline", description: "相邻动作或内容，可换行。", descriptionEn: "Adjacent actions or content with wrapping.", props: [
      { name: "gap", type: "LayoutGap", default: '"actions"', description: "与 Stack 相同的关系角色。", descriptionEn: "The same relationship roles as Stack." },
      { name: "align", type: "StackProps[\"align\"]", default: '"center"', description: "横排的垂直对齐。", descriptionEn: "Vertical alignment in a row." },
      { name: "justify", type: "StackProps[\"justify\"]", description: "横排的水平分布，如 between 把末项推到另一端。不设则保持默认。", descriptionEn: "Horizontal distribution in a row, e.g. between pushes the last item to the far end. Unset keeps the default." },
      { name: "wrap", type: "boolean", default: "true", description: "保留全部内容并允许折行。false 需由消费方验证容量。", descriptionEn: "Retains all content and permits wrapping. Consumers must verify capacity when false." },
      { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "useRender.ComponentProps<\"div\">", description: "默认 div；没有自动 group/toolbar 语义。", descriptionEn: "Defaults to div with no automatic group or toolbar role." },
    ] },
    { name: "Grid", description: "等宽多列，纵横间隔取同一角色。", descriptionEn: "Equal-width columns with one spacing role for rows and columns.", props: [
      { name: "gap", type: "LayoutGap", default: '"panel"', description: "与 Stack 相同的关系角色，行距与列距相等。", descriptionEn: "The same relationship roles as Stack; row and column gaps are equal." },
      { name: "columns", type: "number", default: "2", description: "固定列数，每列等宽。与 minItemWidth 同时给出时以 minItemWidth 为准。", descriptionEn: "Fixed number of equal columns. minItemWidth wins when both are given." },
      { name: "minItemWidth", type: "string", description: "每列最小宽度（CSS 长度，如 \"12rem\"）：按容器宽度自动决定列数，窄到放不下一列时收为单列。", descriptionEn: "Minimum column width as a CSS length such as \"12rem\": the column count follows the container, collapsing to one column when even one does not fit." },
      { name: "align", type: "StackProps[\"align\"]", default: '"stretch"', description: "每个格子内的纵向对齐。", descriptionEn: "Block-axis alignment of items within their cells." },
      { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "useRender.ComponentProps<\"div\">", description: "默认 div；没有自动 list/grid 语义，需要列表语义时 render 成 ul。", descriptionEn: "Defaults to div with no automatic list or grid role; render as ul when list semantics are needed." },
    ] },
  ],
  notes: ["布局没有边框、表面、内边距或业务状态；独立对象边界用 Card。", "Grid 只管等宽列；需要跨列、对齐表头的比较仍用原生 table/grid。","角色数值是主题预设。确有特殊关系时在项目组合说明 className/style 覆写理由。", "方向、语言与密度沿真实 DOM 继承；换行不改变内容顺序。"],
  notesEn: ["Layout adds no border, surface, padding or business state; use Card for independent object boundaries.", "Grid only does equal-width columns; keep native table/grid for spanning or header-aligned comparison.","Role values are theme presets. Explain special className/style overrides in the project composition.", "Direction, language and density follow the DOM; wrapping does not reorder content."],
  design: { methods: ["布白有用", "相成相制"], whenToUse: ["内容组或动作组需要一致、可独立调整的关系间隔。"], avoid: ["把布局当围合或页面骨架；用数字 gap 代替关系判断。"], composition: ["Stack render 成 section；Inline 组合现有动作；比较保留原生 table/grid；等宽并排的同类对象用 Grid。"], stateOwner: { library: ["方向排列、对齐、换行与角色接线。"], application: ["对象、顺序、区域语义、数据与持久状态。"] }, customization: ["优先修改已有角色 token；className/style 是项目特殊关系的例外出口。"], responsive: ["默认换行保留内容；本批页面按裁决只验桌面。"] }, designEn: {"whenToUse":["Content or action groups need consistent, independently adjustable relationship spacing."],"avoid":["Treating layout as enclosure or a page skeleton; numeric gaps without judging relationships."],"composition":["Render Stack as section; compose existing actions with Inline; retain native table/grid for comparison; use Grid for equal-width peers."],"stateOwner":{"library":["Direction, alignment, wrapping, and role wiring."],"application":["Objects, order, region semantics, data, and persistent state."]},"customization":["Adjust existing role tokens first; className/style are exceptions for project-specific relationships."],"responsive":["Default wrapping retains content; this batch's page checks were desktop only by decision."]},
} satisfies ComponentMeta;
