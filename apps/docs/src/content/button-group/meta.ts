import type { ComponentMeta } from "@/lib/types";

export default {
  title: "动作组 ButtonGroup", titleEn: "ButtonGroup",
  description: "为同一范围的动作提供共同名称，可独立排列或连成一体。", descriptionEn: "Give actions in one scope a shared name, spaced apart or attached into one body.",
  category: "通用", layer: "primitive", source: "local", exports: ["ButtonGroup", "ButtonGroupText", "ButtonGroupSeparator"], keywords: ["button-group", "动作组", "按钮组"],
  decisions: "共同名称说明范围，每个按钮仍说明自己的动作。ButtonGroup 不选择按钮、不传播禁用，也不建立工具栏键盘行为。连体（attached）只改变外形：相邻边合并成一条线，成员的名称、焦点与禁用不变；拆分按钮就是连体组里一个主操作加一个打开 Menu 的图标按钮。",
  decisionsEn: "The shared name identifies the scope; each button still names its action. ButtonGroup adds no selection, disabled propagation or toolbar keyboard behavior. Attached only changes the outline: adjacent edges merge into one line while each member keeps its name, focus and disabled state. A split button is an attached group with a primary action and an icon button that opens a Menu.",
  design: {
    methods: ["名实相符", "相成相制", "布白有用"], whenToUse: ["几个动作属于同一可命名的范围。"], avoid: ["用动作组替代单选、多选或工具栏。"],
    composition: ["复用 Group 和 action-gap；成员使用 Button，真实状态仍在成员处表达。", "静态文字段用 ButtonGroupText，成员之间的分隔线用 ButtonGroupSeparator；拆分按钮的图标按钮必须有可访问名称。"],
    stateOwner: { library: ["原生 group 角色与动作间隔。"], application: ["范围、名称与各动作状态。"] },
    responsive: ["横向默认换行，也可纵向；连体时不换行，相邻边合并。"], customization: ["className 与 render 属于组；不统一改写子按钮。"],
  }, designEn: {"whenToUse":["Several actions share a named scope."],"avoid":["Replacing single/multiple selection or a toolbar with an action group."],"composition":["Use Group and action-gap; Button members retain their own actual states.","Use ButtonGroupText for a static text segment and ButtonGroupSeparator between members; the icon button of a split button needs an accessible name."],"stateOwner":{"library":["Native group semantics and action spacing."],"application":["Scope, name, and each action's state."]},"responsive":["Horizontal groups wrap by default; vertical groups are available. Attached groups do not wrap and their adjacent edges merge."],"customization":["className and render belong to the group; do not rewrite every child Button."]},
  api: [{ name: "ButtonGroup", description: "默认 role=group 的开放动作关系。", descriptionEn: "An open action relationship with role=group by default.", props: [
    { name: "aria-label / aria-labelledby", type: "string", description: "必填其一：动作范围的共同名称，不替代按钮名称；缺失或为空时抛错。", descriptionEn: "One is required: the shared scope name, separate from action names. A missing or blank name throws." },
    { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "布局方向。", descriptionEn: "Layout direction." },
    { name: "attached", type: "boolean", default: "false", description: "连体：相邻按钮的边合并为一条线，只保留整组外侧的圆角，横排纵排都成立；聚焦或悬停的成员升到上层，边线完整可见。连体时不换行。", descriptionEn: "Attach members: adjacent edges merge into one line and only the outer corners of the whole group stay rounded, horizontal or vertical. The hovered or focused member is raised so its edge shows in full. Attached groups do not wrap." },
    { name: "align / wrap / render / ref / 原生属性", nameEn: "align / wrap / render / ref / native props", type: "ButtonGroupProps", description: "沿用 Group 的组合入口，间隔默认 action-gap。", descriptionEn: "Uses Group composition props with action spacing." },
  ] }, { name: "ButtonGroupText", description: "组内静态文字段，与同档 bordered 按钮同高、同边线，不可点击也不进焦点顺序。", descriptionEn: "A static text segment in the group, as tall as a bordered button of the same size with the same outline; not clickable and outside the tab order.", props: [
    { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "与同组按钮同一档。", descriptionEn: "The same size as the buttons in the group." },
    { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "useRender props", description: "默认 span。", descriptionEn: "A span by default." },
  ] }, { name: "ButtonGroupSeparator", description: "成员之间的分隔线，方向与组相反；非连体组里同样可用。", descriptionEn: "A divider between members, perpendicular to the group axis; also usable in groups that are not attached.", props: [
    { name: "decorative", type: "boolean", default: "true", description: "分界已由成员表达，默认只是装饰；设为 false 时是带方向的 separator。", descriptionEn: "Members already express the boundary, so it is decorative by default; false exposes an oriented separator." },
  ] }],
  keyboard: [{ keys: "Tab / Shift+Tab", description: "依次访问每个可用按钮，禁用按钮不进入焦点顺序。", descriptionEn: "Visit each available action; disabled actions leave the tab order." }],
} satisfies ComponentMeta;
