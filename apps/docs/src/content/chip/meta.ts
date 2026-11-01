import type { ComponentMeta } from "@/lib/types";

export default {
  title: "标签片 Chip", titleEn: "Chip",
  description: "一枚可移除的小记号：已经选定的一项，可以单独去掉。", descriptionEn: "A small removable mark: one chosen item that can be dropped on its own.",
  category: "通用", layer: "primitive", source: "local",
  exports: ["Chip"],
  keywords: ["chip", "tag", "标签", "筛选", "条件", "已选", "移除", "token", "filter"],
  api: [
    { name: "Chip", description: "可移除的记号：一段文字加一个移除按钮。不给 onRemove 就只是一段带底的文字。", descriptionEn: "A removable mark: text plus a remove button. Without onRemove it is only text on a surface.", props: [
      { name: "children", type: "string", description: "记号上的文字，同时决定移除按钮的名称（「移除 X」）。", descriptionEn: "The text on the mark; it also names the remove button (\"Remove X\")." },
      { name: "onRemove", type: "(event) => void", description: "给了才出现移除按钮。点击、Enter、Space、Backspace、Delete 都调用它；移除后记号是否消失、焦点去哪里由调用方决定。", descriptionEn: "The remove button appears only when given. Click, Enter, Space, Backspace and Delete all call it; whether the chip disappears and where focus goes is up to the caller." },
      { name: "disabled", type: "boolean", default: "false", description: "移除按钮不可操作，记号仍显示。", descriptionEn: "The remove button is inert; the mark still shows." },
      { name: "render / ref / className", type: "Base UI composition", description: "根部位 span 的组合入口。", descriptionEn: "Composition entry points of the root span." },
    ] },
  ],
  keyboard: [
    { keys: "Tab / Shift+Tab", description: "每个移除按钮是一个停靠点；记号文字本身不可聚焦。", descriptionEn: "Each remove button is one tab stop; the mark's text is not focusable." },
    { keys: "Enter / Space", description: "移除该记号。", descriptionEn: "Remove the chip." },
    { keys: "Backspace / Delete", description: "焦点在移除按钮上时移除该记号。", descriptionEn: "With focus on the remove button, remove the chip." },
  ],
  notes: [
    "移除按钮的名称是「移除 X」，X 取记号文字，所以同一行里多个记号读屏时彼此可分。",
    "移除之后焦点会随被移除的节点一起消失：由调用方把焦点移到相邻记号或它所在的容器。",
  ],
  notesEn: [
    "The remove button is named \"Remove X\" from the chip text, so several chips in one row are distinguishable to assistive technology.",
    "Focus disappears with the removed node: the caller moves it to a neighbouring chip or to the container.",
  ],
  decisions: "Chip 与 Badge 不是一回事：Badge 是正文里一段静态的字，没有底、没有交互，用来标注状态或类别；Chip 有自己的边界，能被点击或移除，是对象而不是标注。要给一段不可操作的标注加移除按钮，说明它其实是 Chip。可开关的筛选条件不是 Chip：它是二态按钮（aria-pressed），直接用 Toggle size=\"sm\"；早先的 ChipToggle 只是 Toggle 固定 sm 档的同义包装，在发布前删除，避免同一件事有两个名字。编辑框里的标签（TagInput）与多选 Combobox 的已选项是边界内的项，几何由所在边界推出，不使用 Chip；Chip 是独立立着的记号，几何读 sm 控件档。",
  decisionsEn: "Chip is not Badge. Badge is a static run of text in the body, with no surface and no interaction, used to annotate a status or category; Chip has its own boundary and can be clicked or removed, so it is an object rather than an annotation. If you want a remove button on an inert annotation, it was a Chip all along. A toggleable filter is not a Chip: it is a two-state button (aria-pressed), so use Toggle size=\"sm\". The earlier ChipToggle was only Toggle fixed at the sm step and was removed before release so that one thing does not carry two names. The tags in TagInput and the selected items of a multiple Combobox are items inside an edit frame whose geometry is derived from that frame, so they do not use Chip; Chip is a free-standing mark whose geometry reads the sm control step.",
  design: {
    methods: ["名实相符", "相成相制"],
    whenToUse: ["一组已选条件，每个都能单独去掉"],
    avoid: ["可开关的筛选条件用 Toggle size=\"sm\"", "不可操作的状态标注用 Badge", "在输入框内收下的值用 TagInput", "互斥的几个选项用 RadioGroup 或 SegmentedControl"],
    composition: ["多个 Chip 放进 flex-wrap 的行"],
    stateOwner: { library: ["移除按钮的焦点与键盘"], application: ["Chip 的集合（移除后是否保留）、移除后的焦点去向"] },
    responsive: ["文字过长时截断，完整文字仍在 DOM；本批只做桌面检查"],
    customization: ["className；Chip 的 render"],
  },
  designEn: {
    whenToUse: ["A set of chosen conditions, each of which can be dropped on its own."],
    avoid: ["Use Toggle size=\"sm\" for a filter that switches on and off.", "Use Badge for an inert status annotation.", "Use TagInput for values collected inside an input.", "Use RadioGroup or SegmentedControl for mutually exclusive options."],
    composition: ["Place several Chips in a flex-wrap row."],
    stateOwner: { library: ["Focus and keyboard of the remove button."], application: ["The collection of Chips (whether a removed one is kept) and where focus goes after removal."] },
    responsive: ["Long text is truncated while the full text stays in the DOM; this batch checked desktop only."],
    customization: ["className; the Chip render prop."],
  },
} satisfies ComponentMeta;
