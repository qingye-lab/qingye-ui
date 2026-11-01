import type { ComponentMeta } from "@/lib/types";

export default {
  title: "穿梭框 Transfer", titleEn: "Transfer",
  description: "把条目在「候选」与「已选」两个列表之间移动，值是已选一侧的键。", descriptionEn: "Move items between an available list and a selected list; the value is the keys on the selected side.",
  category: "表单", layer: "primitive", source: "local",
  exports: ["Transfer"],
  keywords: ["transfer", "穿梭框", "穿梭", "双栏", "移动", "选择", "列表", "dual list"],
  api: [
    { name: "Transfer", description: "两个带复选框的列表加中间的移动按钮。每个条目只在其中一侧；value 决定哪些条目在右侧。", descriptionEn: "Two checkbox lists with move buttons between them. Each item is on exactly one side; value decides which are on the right.", props: [
      { name: "items", type: "{ value: string; label: string; disabled?: boolean }[]", description: "全部条目。value 与 label 必须非空，value 在 items 内唯一，否则抛错。", descriptionEn: "All items. value and label must be non-empty and value unique within items, or it throws." },
      { name: "value / defaultValue", type: "string[]", default: "[]", description: "右侧（已选）条目的键，受控或非受控。", descriptionEn: "Keys of the items on the right (selected), controlled or uncontrolled." },
      { name: "onValueChange", type: "(value: string[], details: { direction: \"toTarget\" | \"toSource\"; moved: string[] }) => void", description: "移动发生时调用：新的完整键集合，以及本次的方向与被移动的键。移入的键追加在现有值之后。", descriptionEn: "Called when a move happens: the new full set of keys plus the direction and the keys moved. Keys moved in are appended after the current value." },
      { name: "titles", type: "[string, string]", default: "候选 / 已选", description: "两侧标题，同时是各自列表的可访问名称。", descriptionEn: "The two titles, which also name each list for assistive technology." },
      { name: "searchable", type: "boolean", default: "false", description: "每侧加一个筛选输入。全选、计数与移动只作用于筛选后可见的条目。", descriptionEn: "Adds a filter input to each side. Select all, the count and moving act on the visible, filtered items only." },
      { name: "name", type: "string", description: "右侧每个键以同名隐藏字段随原生表单提交；表单重置时恢复默认值。", descriptionEn: "Each key on the right is submitted as a hidden field of this name; a form reset restores the default value." },
      { name: "disabled", type: "boolean", default: "false", description: "整个穿梭框不可操作，不提交。", descriptionEn: "The whole component is inert and is not submitted." },
      { name: "listClassName", type: "string", description: "列表区域的 className。默认两侧同高并固定，移动时版面不跳。", descriptionEn: "className for the list areas. By default both are the same fixed height so the layout does not jump when items move." },
    ] },
  ],
  keyboard: [
    { keys: "Tab / Shift+Tab", description: "依次经过：左侧全选、筛选、各条目复选框、移动按钮、右侧同样的控件。", descriptionEn: "Passes through, in order: the left select-all, filter, item checkboxes, the move buttons, then the same controls on the right." },
    { keys: "Space", description: "切换当前复选框（条目或全选）。", descriptionEn: "Toggles the focused checkbox (an item or select all)." },
    { keys: "Enter（移动按钮）", description: "把所选条目移到另一侧；没有可移动条目时不动作。", descriptionEn: "On a move button: moves the checked items to the other side; does nothing when none can move." },
  ],
  notes: [
    "只有「勾选、当前可见（过了筛选）、未禁用」的条目会移动；被筛选隐藏的已勾选项不会被带走。",
    "移动按钮在没有可移动条目时用 aria-disabled 而不是 disabled：它仍可聚焦，读屏仍能读到它的名字「将所选 n 项移到……」。",
    "每次移动后用 role=\"status\" 的屏幕阅读器专用文字播报「已移到“已选” n 项」。",
    "两侧各自是带名称的复选框组，计数「n / m」是它的描述；全选是父复选框，部分选中时显示不确定态。",
  ],
  notesEn: [
    "Only items that are checked, currently visible (past the filter) and enabled move; checked items hidden by the filter are not carried along.",
    "A move button uses aria-disabled rather than disabled when nothing can move, so it stays focusable and a screen reader can still read its name, \"Move n selected to …\".",
    "After each move a screen-reader-only role=\"status\" announces \"n moved to “Selected”\".",
    "Each side is a named checkbox group whose description is the count \"n / m\"; select all is the parent checkbox and shows the indeterminate state when partially checked.",
  ],
  decisions: "穿梭框解决的是「从一大批里挑出一小批并能回头调整」，所以两侧都是完整的列表，而不是一个下拉加一排标签。它的值只是右侧的键数组，勾选状态是临时的，不进入值。条目多时由应用先做筛选或分页，本组件不做虚拟滚动：固定高度的列表在几百项内足够，更大的数据量应换成 Combobox 或 Table 里的选择。",
  decisionsEn: "Transfer is for picking a small set out of a large one and being able to revise it, so both sides are full lists rather than a dropdown plus a row of tags. Its value is only the keys on the right; checks are transient and never enter the value. It does not virtualise: a fixed-height list is enough for a few hundred items, and larger sets belong in a Combobox or table selection.",
  design: {
    methods: ["名实相符", "进退相承", "疏密有致"],
    whenToUse: ["在两个互斥的集合之间分配一批条目", "需要同时看到「已选」全貌并能逐项撤回"],
    avoid: ["选一个或几个、不需要总览已选项时用 Select 或 Combobox", "条目成千上万时用带搜索的 Combobox 或表格选择", "只有开关含义的少量选项用 CheckboxGroup"],
    composition: ["FieldLabel + Transfer + FieldDescription + FieldError", "titles 取与业务一致的两个名词，而不是「左」「右」"],
    stateOwner: { library: ["非受控的已选键、各侧临时勾选与筛选词、焦点"], application: ["受控的已选键、条目来源、选择的含义与提交、invalid"] },
    responsive: ["三列：两侧等宽，中间按钮列按内容；窄容器内两侧收窄但不换行；本批只做桌面检查"],
    customization: ["titles；listClassName；items 的 disabled"],
  },
  designEn: {
    whenToUse: ["Allocate a batch of items between two mutually exclusive sets.", "People need to see the whole selected set and withdraw items one by one."],
    avoid: ["Use Select or Combobox to pick one or a few without an overview of the chosen set.", "Use a searchable Combobox or table selection for thousands of items.", "Use CheckboxGroup for a few on / off options."],
    composition: ["FieldLabel + Transfer + FieldDescription + FieldError.", "Make titles two nouns the task uses, not \"Left\" and \"Right\"."],
    stateOwner: { library: ["Uncontrolled selected keys, per-side transient checks and filter text, focus."], application: ["Controlled selected keys, where items come from, what the choice means and its submission, invalid."] },
    responsive: ["Three columns: equal sides, a content-sized button column; in narrow containers the sides shrink without wrapping; this batch checked desktop only."],
    customization: ["titles; listClassName; per-item disabled."],
  },
} satisfies ComponentMeta;
