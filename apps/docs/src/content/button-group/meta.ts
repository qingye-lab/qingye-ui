import type { ComponentMeta } from "@/lib/types";

export default {
  title: "动作组 ButtonGroup", titleEn: "ButtonGroup",
  description: "为同一范围的动作提供共同名称与间隔。", descriptionEn: "Give actions in one scope a shared name and spacing.",
  category: "通用", layer: "primitive", source: "local", exports: ["ButtonGroup"], keywords: ["button-group", "动作组", "按钮组"],
  decisions: "共同名称说明范围，每个按钮仍说明自己的动作。ButtonGroup 不选择按钮、不传播禁用，也不建立工具栏键盘行为。",
  decisionsEn: "The shared name identifies the scope; each button still names its action. ButtonGroup adds no selection, disabled propagation or toolbar keyboard behavior.",
  design: {
    methods: ["名实相符", "相成相制", "布白有用"], whenToUse: ["几个动作属于同一可命名的范围。"], avoid: ["用动作组替代单选、多选或工具栏。"],
    composition: ["复用 Group 和 action-gap；成员使用 Button，真实状态仍在成员处表达。"],
    stateOwner: { library: ["原生 group 角色与动作间隔。"], application: ["范围、名称与各动作状态。"] },
    responsive: ["横向默认换行，也可纵向；不合并成员轮廓。"], customization: ["className 与 render 属于组；不统一改写子按钮。"],
  }, designEn: {"whenToUse":["Several actions share a named scope."],"avoid":["Replacing single/multiple selection or a toolbar with an action group."],"composition":["Use Group and action-gap; Button members retain their own actual states."],"stateOwner":{"library":["Native group semantics and action spacing."],"application":["Scope, name, and each action's state."]},"responsive":["Horizontal groups wrap by default; vertical groups are available. Member contours stay independent."],"customization":["className and render belong to the group; do not rewrite every child Button."]},
  api: [{ name: "ButtonGroup", description: "默认 role=group 的开放动作关系。", descriptionEn: "An open action relationship with role=group by default.", props: [
    { name: "aria-label / aria-labelledby", type: "string", description: "动作范围的共同名称，不替代按钮名称。", descriptionEn: "The shared scope name, separate from action names." },
    { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "布局方向。", descriptionEn: "Layout direction." },
    { name: "align / wrap / render / ref / 原生属性", nameEn: "align / wrap / render / ref / native props", type: "ButtonGroupProps", description: "沿用 Group 的组合入口，间隔默认 action-gap。", descriptionEn: "Uses Group composition props with action spacing." },
  ] }],
  keyboard: [{ keys: "Tab / Shift+Tab", description: "依次访问每个可用按钮，禁用按钮不进入焦点顺序。", descriptionEn: "Visit each available action; disabled actions leave the tab order." }],
} satisfies ComponentMeta;
