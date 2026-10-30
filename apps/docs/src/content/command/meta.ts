import type { ComponentMeta } from "@/lib/types";

export default {
  title: "命令面板 Command", titleEn: "Command",
  description: "输入框加一张常开的命令列表，用来跳到某处或执行某事。", descriptionEn: "A search box over an always-open list of commands, for jumping somewhere or doing something.",
  category: "浮层", source: "local", layer: "pattern", exports: ["Command", "CommandInput", "CommandList", "CommandGroup", "CommandItem", "CommandEmpty", "CommandSeparator", "CommandDialog"], keywords: ["command palette", "cmdk", "命令面板", "快捷键", "跳转", "搜索", "⌘K"],
  decisions: "条目是命令（动作），不是填进输入框的值：选中只触发 onSelect，查询文字原样保留。全局快捷键（⌘K）由应用注册，库不监听按键。禁用项显示为不可用，但不参与高亮与方向键移动。",
  decisionsEn: "Items are commands (actions), not values filled into the input: selecting only fires onSelect and the query text stays. The global shortcut (⌘K) is registered by the application; the library listens to no keys. Disabled items show as unavailable but take no part in highlighting or arrow-key movement.",
  api: [
    { name: "Command", description: "命令列表本体：一个常开的 combobox + listbox，焦点始终留在输入框，高亮用 aria-activedescendant。可单独嵌在页面里。", descriptionEn: "The list itself: an always-open combobox and listbox. Focus stays in the input and the highlight uses aria-activedescendant. Can sit directly in a page.", props: [
      { name: "filter", type: "(entry: { value, label, keywords }, query: string) => boolean", description: "覆盖默认过滤。默认：不区分大小写，value、文字子级、keywords 任一包含查询即匹配（中文直接包含匹配）。空查询不调用，恒显示。", descriptionEn: "Replace the default filter. By default a case-insensitive match against value, text children, or any keyword; CJK text matches by containment. Not called for an empty query, which shows everything." },
      { name: "query / defaultQuery / onQueryChange", type: "string / string / (query: string) => void", description: "查询文字，受控或非受控。", descriptionEn: "The query text, controlled or uncontrolled." },
      { name: "onItemSelect", type: "(value: string) => void", description: "任一条目被选中后调用，晚于条目自己的 onSelect。", descriptionEn: "Called after any item is selected, after the item's own onSelect." },
    ] },
    { name: "CommandInput", description: "查询框，共用 Input 的几何。缺 aria-label / aria-labelledby 时抛错。", descriptionEn: "The search box, sharing Input's geometry. Throws without aria-label or aria-labelledby." },
    { name: "CommandList", description: "listbox。内容多时在列表内滚动，输入框始终可见。需要名字时传 aria-label。", descriptionEn: "The listbox. Long content scrolls inside it while the input stays visible. Pass aria-label to name it." },
    { name: "CommandGroup", description: "一组命令。组内没有匹配项时整组收起。", descriptionEn: "A group of commands. It collapses when none of its items match.", props: [
      { name: "heading", type: "ReactNode", description: "必填。组名，也是读屏读到的 group 名称。", descriptionEn: "Required. The group's title and the name a screen reader announces for the group." },
    ] },
    { name: "CommandItem", description: "一条命令，外观与 MenuItem 同一几何。", descriptionEn: "One command, with the same geometry as MenuItem.", props: [
      { name: "value", type: "string", description: "必填。命令的标识，参与匹配；onSelect 收到它。", descriptionEn: "Required. The command's identity, used for matching and handed to onSelect." },
      { name: "keywords", type: "readonly string[]", description: "不显示的匹配词：别名、英文名、拼音。", descriptionEn: "Hidden match terms: aliases, English names, pinyin." },
      { name: "onSelect", type: "(value: string) => void", description: "Enter 或点击时调用。", descriptionEn: "Called on Enter or click." },
      { name: "disabled", type: "boolean", default: "false", description: "显示为不可用，不参与高亮与方向键移动，不能被选中。", descriptionEn: "Shown as unavailable; takes no part in highlighting or arrow-key movement and cannot be selected." },
      { name: "shortcut", type: "string | readonly string[]", description: "只显示快捷键，不注册。数组则每个键各一块。", descriptionEn: "Displays a shortcut without registering it. An array shows one block per key." },
    ] },
    { name: "CommandEmpty", description: "没有任何条目匹配时显示。省略 children 用内置缺省文案；元素常驻，内容变化时读屏才会播报。", descriptionEn: "Shown when nothing matches. Omit children for the built-in text. The element stays mounted so that screen readers announce the change." },
    { name: "CommandSeparator", description: "组与组之间的分界。查询非空时不渲染，因为此时组会随结果收起。", descriptionEn: "A divider between groups. Not rendered while the query is non-empty, since groups collapse with the results." },
    { name: "CommandDialog", description: "Dialog 里放一份 Command。每次打开都是新的一份，查询自然清空。", descriptionEn: "A Command inside a Dialog. Each opening is a fresh instance, so the query starts empty.", props: [
      { name: "open / defaultOpen / onOpenChange", type: "boolean / boolean / (open: boolean) => void", description: "打开状态，受控或非受控。", descriptionEn: "Open state, controlled or uncontrolled." },
      { name: "aria-label / aria-labelledby", type: "string", description: "二选一必填，缺失抛错。", descriptionEn: "One is required; omitting both throws." },
      { name: "closeOnSelect", type: "boolean", default: "true", description: "选中条目后关闭。", descriptionEn: "Close after an item is selected." },
    ] },
  ],
  keyboard: [
    { keys: "ArrowDown / ArrowUp", description: "移动高亮；禁用项被跳过。列表挂载时第一项已高亮。", descriptionEn: "Move the highlight, skipping disabled items. The first item is highlighted when the list mounts." },
    { keys: "Enter", description: "触发高亮项的 onSelect。", descriptionEn: "Run the highlighted item's onSelect." },
    { keys: "Escape", description: "在 CommandDialog 中关闭对话框。", descriptionEn: "Close the dialog in a CommandDialog." },
  ],
  notes: ["组件不注册 ⌘K。应用自己监听 metaKey / ctrlKey + k 并控制 CommandDialog 的 open。", "条目 value 是匹配用的文字；显示内容与 value 不同时，用 keywords 补上能被搜到的词。", "命令的后果（删除、发布等）不在命令面板里说明：选中后应打开 AlertDialog 或 ConfirmAction。", "按「候选值」选择文字用 Autocomplete 或 Combobox；命令面板选的是动作。"],
  notesEn: ["The component does not register ⌘K. The application listens for metaKey / ctrlKey + k and controls the CommandDialog's open.", "An item's value is the text it matches on. When the displayed content differs from the value, add keywords for terms that should find it.", "Consequences of a command (delete, publish, …) are not explained in the palette: selecting one should open an AlertDialog or ConfirmAction.", "Use Autocomplete or Combobox to choose a text value; a command palette chooses an action."],
  design: { methods: ["名实相符", "进退相承"], composition: ["CommandDialog + CommandInput + CommandList + CommandGroup / CommandItem + CommandEmpty"], stateOwner: { library: ["查询文字、过滤、高亮、空态与组的收起"], application: ["命令清单、onSelect 的效果、全局快捷键与对话框的打开"] }, responsive: ["列表最高占视口高度的 60%，超出在列表内滚动；对话框宽度不超过容器"], customization: ["filter、keywords、shortcut、CommandDialog 的 popupClassName"] },
  designEn: { composition: ["CommandDialog + CommandInput + CommandList + CommandGroup / CommandItem + CommandEmpty"], stateOwner: { library: ["Query text, filtering, highlight, the empty state, and group collapse."], application: ["The list of commands, what onSelect does, the global shortcut, and opening the dialog."] }, responsive: ["The list is at most 60% of the viewport height and scrolls inside; the dialog is never wider than its container."], customization: ["filter, keywords, shortcut, CommandDialog's popupClassName."] },
} satisfies ComponentMeta;
