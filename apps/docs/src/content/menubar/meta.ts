import type { ComponentMeta } from "@/lib/types";

export default {
  title: "菜单栏 Menubar",
  description:
    "桌面应用式的一排菜单（文件 / 编辑 / 视图），适合编辑器、设计工具等命令很多的工作台。菜单内容沿用 Menu 的全部部件。",
  design: {
    "methods": [
      "相成相制",
      "展开有据"
    ],
    "whenToUse": [
      "在编辑器或工具工作面集中收纳高频命令，保持对当前内容对象的连续操作。"
    ],
    "avoid": [
      "网站的地址导航不因外形相近而改用应用菜单栏；快捷键提示不等于快捷键已注册。"
    ],
    "composition": [
      "顶层用 MenubarMenu 和 Trigger；内容共享 Menu 的命令、选项、危险状态与子菜单。"
    ],
    "stateOwner": {
      "library": [
        "提供顶层方向键漫游、相邻菜单切换和内部菜单关系，复用 Menu 的长内容约束。"
      ],
      "application": [
        "决定命令组织、文档选择、权限、快捷键冲突与执行结果。"
      ]
    },
    "responsive": [
      "窄屏按命令重要性保留直接入口并收纳次要命令；触屏检查顶层目标和菜单行。"
    ],
    "customization": [
      "orientation 表达真实布局与键盘方向；层级关系不靠额外菜单深度解决。"
    ]
  },
  category: "导航",
  source: "local",
  exports: [
    "Menubar",
    "MenubarMenu",
    "MenubarTrigger",
    "MenubarContent",
    "MenubarItem",
    "MenubarSeparator",
    "MenubarShortcut",
  ],
  keywords: ["menubar", "menu bar", "菜单栏", "文件菜单", "桌面应用", "命令"],
  api: [
    {
      name: "Menubar",
      description: "菜单的容器，提供触发器之间的方向键漫游。",
      props: [
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "排列方向，同时决定方向键。" },
        { name: "loopFocus", type: "boolean", default: "true", description: "方向键到末尾后回到第一个。" },
        { name: "modal", type: "boolean", default: "true", description: "打开菜单时是否锁定页面滚动与外部交互。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用整个菜单栏。" },
      ],
    },
    { name: "MenubarMenu", description: "一个菜单，即 Menu 的根部件；支持 open / defaultOpen / onOpenChange。" },
    { name: "MenubarTrigger", description: "顶层按钮，样式同 ghost 按钮，打开时保持选中底色。" },
    {
      name: "MenubarContent",
      description: "菜单面板（别名 MenubarPopup），默认与触发器起始边对齐，使菜单项文字与触发器文字对齐。",
      props: [
        { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "对齐方式。" },
        { name: "sideOffset / alignOffset", type: "number", default: "8 / -3", description: "与触发器的间距与对齐偏移。" },
      ],
    },
    {
      name: "MenubarItem · MenubarCheckboxItem · MenubarRadioGroup · MenubarRadioItem",
      description: "即 MenuItem 等部件，用法与下拉菜单完全一致；MenubarItem 支持 variant=\"destructive\" 与 inset。",
    },
    {
      name: "MenubarSub · MenubarSubTrigger · MenubarSubContent",
      description: "二级菜单。",
    },
    {
      name: "MenubarGroup · MenubarLabel · MenubarSeparator · MenubarShortcut",
      description: "分组、分组标题、分隔线与快捷键提示。",
    },
  ],
  keyboard: [
    { keys: "← / →", description: "在顶层触发器之间移动；菜单打开时直接切换到相邻菜单。" },
    { keys: "Enter / Space / ↓", description: "打开当前菜单并聚焦第一项。" },
    { keys: "↑ / ↓", description: "在菜单项之间移动。" },
    { keys: "→ / ←", description: "在二级菜单触发项上展开 / 收起二级菜单。" },
    { keys: "Esc", description: "关闭菜单，焦点回到触发器。" },
    { keys: "字母", description: "跳到以该字符开头的菜单项。" },
  ],
  notes: [
    "MenubarShortcut 只是提示文字，快捷键本身需要由应用注册。",
    "顶层菜单控制在 3–6 个；更深的层级放进二级菜单，不要超过两层。",
    "窄屏上菜单栏会占满一行，建议把次要菜单合并为一个“更多”菜单。",
  ],
} satisfies ComponentMeta;
