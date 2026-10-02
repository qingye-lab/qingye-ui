import type { ComponentMeta } from "@/lib/types";

export default {
  title: "下拉菜单 Menu",
  description: "点击按钮后展开的操作列表，收纳次要操作、视图选项和导航链接。从表单中选值用 Select，右键菜单用 ContextMenu。",
  design: {
    "methods": [
      "名实相符",
      "相成相制",
      "展开有据"
    ],
    "whenToUse": [
      "收纳同一对象的命令、相关模式或真实导航，核心操作仍可直接到达。"
    ],
    "avoid": [
      "不能用 Menu 代替表单 Select；危险属性在键盘高亮时不能被普通项颜色覆盖。"
    ],
    "composition": [
      "命令用 Item，地址用 LinkItem，保持选项用 Checkbox / Radio；不可逆命令按后果接 AlertDialog。"
    ],
    "stateOwner": {
      "library": [
        "管理菜单角色、方向键、高亮、子菜单、焦点返回与可用视口；长标签保持完整可读。"
      ],
      "application": [
        "决定对象、命令范围、权限与执行结果；Shortcut 只展示快捷键而不注册。"
      ]
    },
    "responsive": [
      "菜单项在粗指针下保持整行目标；长对象名换行，超高菜单内部滚动，RTL 子菜单指向实际展开侧。"
    ],
    "customization": [
      "variant 标识真实危险动作；集中主题控制高亮与辅助文字，窗口宽度受可用视口约束。"
    ]
  },
  category: "浮层",
  source: "coss",
  exports: [
    "Menu",
    "MenuTrigger",
    "MenuPopup",
    "MenuItem",
    "MenuSeparator",
    "MenuGroup",
    "MenuGroupLabel",
    "MenuShortcut",
  ],
  keywords: ["menu", "dropdown", "dropdown menu", "下拉菜单", "操作菜单", "更多"],
  api: [
    {
      name: "Menu",
      description: "根组件。别名 DropdownMenu。",
      props: [
        { name: "open / defaultOpen", type: "boolean", default: "false", description: "受控 / 非受控的打开状态。" },
        { name: "onOpenChange", type: "(open, details) => void", description: "打开状态变化时调用。" },
        { name: "modal", type: "boolean", default: "true", description: "打开时锁定页面滚动与外部交互。" },
        { name: "loopFocus", type: "boolean", default: "true", description: "方向键到达末尾后回到开头。" },
      ],
    },
    {
      name: "MenuTrigger",
      description: "触发按钮。别名 DropdownMenuTrigger。",
      props: [
        { name: "openOnHover", type: "boolean", default: "false", description: "悬停打开，适合顶部导航。" },
        { name: "delay / closeDelay", type: "number", default: "100 / 0", description: "悬停打开 / 关闭的等待时间。" },
      ],
    },
    {
      name: "MenuPopup",
      description: "菜单浮层。别名 DropdownMenuContent。",
      props: [
        { name: "side", type: '"top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"', default: '"bottom"', description: "弹出方向，空间不足时自动翻转。" },
        { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "沿边的对齐方式。" },
        { name: "sideOffset / alignOffset", type: "number", default: "4 / 0", description: "与触发器的距离 / 对齐偏移。" },
      ],
    },
    {
      name: "MenuItem",
      description: "菜单项。别名 DropdownMenuItem。",
      props: [
        { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "destructive 用于删除等危险操作。" },
        { name: "inset", type: "boolean", default: "false", description: "左侧留出图标宽度，与带图标的项对齐。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用；键盘导航时跳过。" },
        { name: "closeOnClick", type: "boolean", default: "true", description: "点击后是否关闭菜单。" },
        { name: "onClick", type: "(event) => void", description: "选中时调用（鼠标、Enter、Space）。" },
      ],
    },
    { name: "MenuLinkItem", description: "渲染为 <a> 的导航项，用 render 接入路由链接。" },
    {
      name: "MenuCheckboxItem",
      description: "可勾选的项。别名 DropdownMenuCheckboxItem。",
      props: [
        { name: "checked / defaultChecked", type: "boolean", description: "受控 / 非受控的勾选状态。" },
        { name: "onCheckedChange", type: "(checked) => void", description: "勾选变化时调用。" },
        { name: "variant", type: '"default" | "switch"', default: '"default"', description: "switch 在右侧显示开关。" },
      ],
    },
    {
      name: "MenuRadioGroup / MenuRadioItem",
      description: "单选组。别名 DropdownMenuRadioGroup / DropdownMenuRadioItem。",
      props: [{ name: "value / defaultValue / onValueChange", type: "string", description: "当前选中值。" }],
    },
    { name: "MenuGroup / MenuGroupLabel", description: "分组与组标题，标题自动关联为组的可访问名称。别名 DropdownMenuGroup / DropdownMenuLabel。" },
    { name: "MenuSeparator", description: "分隔线。" },
    { name: "MenuShortcut", description: "右侧的快捷键提示，仅作展示，不会注册快捷键。" },
    { name: "MenuSub / MenuSubTrigger / MenuSubPopup", description: "子菜单。别名 DropdownMenuSub / DropdownMenuSubTrigger / DropdownMenuSubContent。" },
  ],
  keyboard: [
    { keys: "Enter / Space / ↓", description: "在触发器上打开菜单并聚焦第一项。" },
    { keys: "↑ / ↓", description: "在菜单项之间移动。" },
    { keys: "→ / ←", description: "打开 / 关闭子菜单。" },
    { keys: "Home / End", description: "跳到第一项 / 最后一项。" },
    { keys: "字母键", description: "跳到以该字符开头的项。" },
    { keys: "Esc", description: "关闭菜单，焦点回到触发器。" },
  ],
  notes: [
    "仅图标的触发器需要 aria-label，例如“更多操作”。",
    "危险操作放在最后，用分隔线隔开并设 variant=\"destructive\"；不可撤销时再弹 AlertDialog 确认。",
    "从菜单打开对话框时，对话框放在菜单之外并用状态控制，见 Dialog 的“从菜单打开”。",
    "触屏设备上菜单项最小高度 44px，方便点按。",
  ],
} satisfies ComponentMeta;
