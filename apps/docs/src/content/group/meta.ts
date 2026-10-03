import type { ComponentMeta } from "@/lib/types";

export default {
  title: "成组布局 Group", titleEn: "Group",
  description: "按共同关系安排成员的方向与间隔。", descriptionEn: "Arrange related members with a direction and a spacing role.",
  category: "布局", layer: "primitive", source: "local", exports: ["Group"], keywords: ["group", "分组", "布局"],
  decisions: "Group 只组织位置。字段共同问题用 Fieldset，动作范围用 ButtonGroup；成员名称与状态仍各自成立。",
  decisionsEn: "Group arranges position. Use Fieldset for a shared field question and ButtonGroup for an action scope; member names and states stay independent.",
  design: {
    methods: ["布白有用", "相成相制"], whenToUse: ["多个成员共享一个布局关系。"], avoid: ["用布局容器冒充字段、工具栏或选择集合。"],
    composition: ["横向复用 Inline，纵向复用 Stack；语义由原生 render 或显式 role 承担。"],
    stateOwner: { library: ["方向、换行和既有间隔角色。"], application: ["成员、名称、范围和状态。"] },
    responsive: ["横向默认换行，按文档顺序保留成员。"], customization: ["gap 复用 layout 的五个关系角色；无默认围合。"],
  }, designEn: {"whenToUse":["Several members share a layout relationship."],"avoid":["Layout containers impersonating fields, toolbars, or selection collections."],"composition":["Horizontal uses Inline and vertical uses Stack; native render or an explicit role supplies semantics."],"stateOwner":{"library":["Direction, wrapping, and existing gap roles."],"application":["Members, names, scope, and state."]},"responsive":["Horizontal layout wraps by default, retaining document order."],"customization":["gap uses layout's five relationship roles; there is no default enclosure."]},
  api: [{ name: "Group", description: "默认无角色的开放布局。", descriptionEn: "An open layout with no default role.", props: [
    { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "布局方向；不改变 DOM 顺序。", descriptionEn: "Layout direction without changing DOM order." },
    { name: "gap", type: '"field" | "fields" | "actions" | "panel" | "section"', default: '"panel"', description: "既有关系间隔。", descriptionEn: "An existing spacing role." },
    { name: "align / wrap", type: "InlineProps", description: "沿用 layout 公共入口；wrap 仅适用于横向。", descriptionEn: "Uses layout public props; wrap applies horizontally." },
    { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "InlineProps", description: "原生语义、事件、ARIA 与样式透传。", descriptionEn: "Forwards native semantics, events, ARIA and styling." },
  ] }],
} satisfies ComponentMeta;
