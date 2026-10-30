import type { ComponentMeta } from "@/lib/types";

export default {
  title: "树形选择 TreeSelect", titleEn: "TreeSelect",
  description: "在弹层里的树上选一个节点，或勾选若干叶子。", descriptionEn: "Choose one node, or check several leaves, on a tree inside a popup.",
  category: "表单", layer: "primitive", source: "local",
  exports: ["TreeSelect"],
  keywords: ["tree select", "treeselect", "树形选择", "树形下拉", "组织架构", "部门", "层级", "多选", "选择"],
  api: [
    { name: "TreeSelect", description: "触发器、弹层里的 Tree 与表单值。触发器与 Select、Cascader 同一套几何；弹层用 Popover 的面板。", descriptionEn: "Trigger, the Tree inside the popup, and the form value. The trigger shares Select and Cascader's geometry; the popup uses Popover's panel.", props: [
      { name: "nodes", type: "readonly TreeNode[]", description: "沿用 Tree 的节点：id 全树唯一、label 非空；disabled 的节点不可选。", descriptionEn: "Tree's own nodes: ids are unique across the tree and labels are nonempty; disabled nodes cannot be chosen." },
      { name: "value / defaultValue / onValueChange", type: "string | null  (multiple: readonly string[])", description: "单选是所选节点的 id（分支也可被选），null 是未选择；选中即提交并关闭，重选同一节点只关闭。多选是已勾选的叶子 id，勾选不关闭，回调里的 ids 按树的顺序。回调的 details 与 Tree 同形，cancel() 后不提交（单选时弹层也保持打开）。", descriptionEn: "Single holds the chosen node's id (a branch can be chosen) and null is no selection; choosing commits and closes, and choosing the same node only closes. Multiple holds the checked leaf ids; checking does not close, and the ids in the callback follow the tree's order. The callback's details have Tree's shape; after cancel() nothing is committed (and in single mode the popup stays open)." },
      { name: "multiple", type: "boolean", default: "false", description: "为 true 时使用 Tree 的 checkable：勾选分支会勾上它启用的叶子，部分勾选显示 mixed，禁用的叶子保持原状。", descriptionEn: "With true the Tree is checkable: checking a branch checks its enabled leaves, a partial state shows mixed, and disabled leaves keep their state." },
      { name: "placeholder", type: "ReactNode", default: "locale.selectPlaceholder", description: "仅未选择时显示；不能替代 FieldLabel。", descriptionEn: "Shown only without selection; cannot replace FieldLabel." },
      { name: "disabled / readOnly / required", type: "boolean", default: "false", description: "只读保留当前值且不打开弹层；禁用的字段不提交；required 参与原生校验并标 aria-required。invalid 跟随 Field。", descriptionEn: "Read-only keeps the value and never opens the popup; a disabled field is not submitted; required joins native validation and sets aria-required. invalid follows Field." },
      { name: "name / form", type: "string", description: "隐藏输入的名称与所属表单。单选提交所选 id，未选择提交空字符串；多选每个已选 id 一条同名值，未选择不提交（required 时拦下提交）。", descriptionEn: "Name and owning form of the hidden input. Single submits the chosen id, or an empty string when nothing is chosen; multiple submits one value per chosen id and nothing when empty (required blocks submission)." },
      { name: "aria-label / aria-labelledby / id / className", type: "string", description: "触发器与弹层里树的名称、触发器的样式入口。没有名称会抛错：用 aria-label、aria-labelledby，或放进带 FieldLabel 的 Field。", descriptionEn: "Name of the trigger and of the tree in the popup, and the trigger's styling entry. A missing name throws: use aria-label, aria-labelledby, or place it in a Field with a FieldLabel." },
    ] },
  ],
  keyboard: [
    { keys: "Enter / Space / ↓ / ↑", description: "在触发器上打开弹层，焦点落在已选节点（多选是第一个已勾选的叶子，都没有则是第一个节点），其祖先已展开。", descriptionEn: "On the trigger, open the popup with focus on the chosen node (the first checked leaf in multiple mode, otherwise the first node) and its ancestors expanded." },
    { keys: "↑ ↓ ← → / Home / End / 字首", keysEn: "↑ ↓ ← → / Home / End / Typeahead", description: "同 Tree：在可见节点间移动，← → 收起、展开或进出父子，键入标签开头跳转。", descriptionEn: "As in Tree: move between visible nodes, ← → collapse, expand or move to parent and child, and typing the start of a label jumps to it." },
    { keys: "Enter / Space", description: "单选：选中并关闭，焦点回触发器。多选：Space 勾选或取消勾选，弹层保持打开。", descriptionEn: "Single: choose and close with focus back on the trigger. Multiple: Space checks or unchecks and the popup stays open." },
    { keys: "Esc", description: "关闭并回到触发器，保留原值。", descriptionEn: "Close and return to the trigger, retaining the value." },
  ],
  notes: [
    "不做搜索与异步加载：键入标签开头可跳转，节点由调用方一次给全。",
    "触发器是 combobox，弹出的是 tree（aria-haspopup=\"tree\"）。多选时触发器列出已选叶子的名称，超过两项写成「首项及其余 N 项」，其余仍在树里可见。",
  ],
  notesEn: [
    "No search and no async loading: typing the start of a label jumps to it, and the caller provides all nodes at once.",
    "The trigger is a combobox and the popup a tree (aria-haspopup=\"tree\"). In multiple mode the trigger lists the checked leaves; beyond two it reads \"first and N more\", and the rest stay visible in the tree.",
  ],
  decisions: "单选的值是节点 id，分支也可以被选；多选的值只含叶子 id，分支的勾选是派生显示，与 Tree 的 checkable 同一约定，所以「勾一个分支」不会被多计成 N+1 项。展开状态由 TreeSelect 持有并在每次打开时按已选节点重算，因为弹层关闭会卸载 Tree。",
  decisionsEn: "The single value is a node id and a branch can be chosen; the multiple value holds leaf ids only, and a branch's check is a derived display, the same convention as Tree's checkable, so checking one branch is never miscounted as N+1 items. TreeSelect owns the expansion and recomputes it from the chosen nodes on every open, because closing the popup unmounts the Tree.",
  design: {
    methods: ["名实相符", "展开有据", "进退相承"],
    whenToUse: ["候选天然成层、值是其中某个节点或若干叶子：部门、组织、类目"],
    avoid: ["只有一层候选用 Select，候选很多需过滤用 Combobox", "沿一条路径逐级选择、要把整条路径作为值时用 Cascader", "树本身就是页面内容、不需要收进触发器时直接用 Tree"],
    composition: ["FieldLabel + TreeSelect + FieldDescription + FieldError"],
    stateOwner: { library: ["焦点、展开状态、未受控值"], application: ["受控值、节点数据、invalid 与保存事实"] },
    responsive: ["弹层跟随可用高度滚动；本批只做桌面检查"],
    customization: ["触发器 className、Popover 的面板与定位"],
  },
  designEn: {
    whenToUse: ["Candidates that naturally nest and the value is one node or several leaves: departments, organizations, categories."],
    avoid: ["Use Select for a single level and Combobox when many candidates need filtering.", "Use Cascader when choosing level by level and the whole path is the value.", "Use Tree directly when the tree is itself page content and need not fold into a trigger."],
    composition: ["FieldLabel + TreeSelect + FieldDescription + FieldError."],
    stateOwner: { library: ["Focus, expansion, and the uncontrolled value."], application: ["Controlled values, node data, invalid and save facts."] },
    responsive: ["The popup scrolls with the available height; this batch checked desktop only."],
    customization: ["Trigger className, Popover's panel and positioning."],
  },
} satisfies ComponentMeta;
