import type { ComponentMeta } from "@/lib/types";

export default {
  title: "命令面板 Command",
  description: "可搜索的命令与导航列表，通常用快捷键唤起，让熟练用户不离开键盘就能跳转页面或执行操作。也可以内嵌在页面中作为可筛选的选择列表。",
  design: {
    "methods": [
      "名实相符",
      "展开有据",
      "进退相承"
    ],
    "whenToUse": [
      "用可搜索的命令或页面目标缩短熟练用户的操作路径，同时保留可见普通入口。"
    ],
    "avoid": [
      "没有匹配与正在加载、失败不能混为同一空态；选择高亮项不等于业务执行成功。"
    ],
    "composition": [
      "Input + Panel / List 管理查找，Dialog 外壳管理唤起与返回；内嵌输入设置 autoFocus=false 保持当前工作。"
    ],
    "stateOwner": {
      "library": [
        "管理筛选列表、键盘高亮和执行入口、空结果文本、Dialog 名称与焦点返回。"
      ],
      "application": [
        "维护命令对象、搜索数据、权限、全局快捷键冲突与执行结果；跳转后把焦点交给目标页面。"
      ]
    },
    "responsive": [
      "结果列表可滚动并保留搜索框；粗指针命令行保持可点高度，长目标名称优先保留辨认信息。"
    ],
    "customization": [
      "自定义筛选通过 filteredItems 接入，快捷键提示保持可读；不把快捷键展示当成已注册能力。"
    ]
  },
  category: "导航",
  source: "coss",
  exports: [
    "CommandDialog",
    "CommandDialogTrigger",
    "CommandDialogPopup",
    "Command",
    "CommandInput",
    "CommandPanel",
    "CommandList",
    "CommandEmpty",
    "CommandGroup",
    "CommandGroupLabel",
    "CommandCollection",
    "CommandItem",
    "CommandShortcut",
    "CommandSeparator",
    "CommandFooter",
  ],
  keywords: ["command", "command palette", "cmdk", "命令面板", "快捷搜索", "⌘K"],
  api: [
    {
      name: "CommandDialog",
      description: "面板的对话框外壳（基于 Dialog）。",
      props: [
        { name: "open / defaultOpen", type: "boolean", default: "false", description: "受控 / 非受控的打开状态，配合全局快捷键使用受控模式。" },
        { name: "onOpenChange", type: "(open, details) => void", description: "打开状态变化时调用。" },
      ],
    },
    { name: "CommandDialogTrigger", description: "打开面板的按钮。" },
    { name: "CommandDialogPopup", description: "面板容器，顶部对齐，宽 36rem；需要 aria-label 或可见标题提供名称。" },
    {
      name: "Command",
      description: "搜索与列表的根（基于 Autocomplete），始终展开并自动高亮第一项。",
      props: [
        { name: "items", type: "Item[] | Group[]", description: "全部数据；分组时每组含 items。" },
        { name: "filteredItems", type: "Item[] | Group[]", description: "自行筛选（例如拼音或远程搜索）时传入结果。" },
        { name: "value / defaultValue / onValueChange", type: "string", description: "搜索框内容。" },
        { name: "autoHighlight", type: '"always" | boolean', default: '"always"', description: "始终高亮第一个匹配项，回车即可执行。" },
      ],
    },
    {
      name: "CommandInput",
      description: "搜索框，打开时自动聚焦。",
      props: [
        { name: "placeholder", type: "string", default: "“输入命令或搜索…”", description: "占位文字，默认来自 useUILocale()。" },
        { name: "autoFocus", type: "boolean", default: "true", description: "内嵌在页面中时设为 false，避免抢走焦点。" },
      ],
    },
    { name: "CommandPanel", description: "列表外的浮起面板。" },
    { name: "CommandList", description: "结果列表；传入渲染函数逐组 / 逐项渲染，超出时滚动。" },
    { name: "CommandEmpty", description: "没有匹配结果时显示，默认文案“没有匹配的结果”。" },
    { name: "CommandGroup / CommandGroupLabel / CommandCollection", description: "分组、组标题，以及渲染组内条目的集合。" },
    {
      name: "CommandItem",
      description: "一条命令；图标自动对齐尺寸。",
      props: [
        { name: "value", type: "Item", description: "对应的数据项。" },
        { name: "onClick", type: "(event) => void", description: "点击或回车时执行。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用。" },
      ],
    },
    { name: "CommandShortcut", description: "右侧的快捷键提示，仅作展示。" },
    { name: "CommandSeparator", description: "组之间的分隔线，最后一组后自动隐藏。" },
    { name: "CommandFooter", description: "底部的键盘操作提示。" },
  ],
  keyboard: [
    { keys: "⌘K / Ctrl + K", description: "在应用中通常用来唤起面板（需自行注册）。" },
    { keys: "↑ / ↓", description: "在结果之间移动。" },
    { keys: "Enter", description: "执行高亮的命令。" },
    { keys: "Esc", description: "关闭面板，焦点回到之前的位置。" },
  ],
  notes: [
    "全局快捷键需要自行注册，并在按下时调用 preventDefault，避免浏览器默认行为。",
    "条目的 label 参与匹配；需要支持别名或拼音时，用 filteredItems 传入自己的筛选结果。",
    "执行命令后关闭面板；跳转页面时，把焦点交给新页面的标题。",
  ],
} satisfies ComponentMeta;
