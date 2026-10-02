import type { ComponentMeta } from "@/lib/types";

export default {
  title: "输入框组合 InputGroup",
  description: "在输入框内部加前后缀文字、图标、按键提示、按钮或工具栏，整体共用一个边框与焦点环。",
  category: "表单",
  source: "coss",
  exports: ["InputGroup", "InputGroupAddon", "InputGroupText", "InputGroupInput", "InputGroupTextarea", "InputGroupButton"],
  keywords: ["input group", "前缀", "后缀", "addon", "单位", "输入框组合"],
  design: {
    "methods": [
      "相成相制",
      "布白有用",
      "名实相符"
    ],
    "whenToUse": [
      "让单位、附属动作或提示与一个文本工作区共享边界。"
    ],
    "avoid": [
      "装饰图标不能变成第二个字段；addon 点击不能抢走链接或按钮自己的操作。"
    ],
    "composition": [
      "Input 或 Textarea 是主工作区；inline addon 放短前后缀，block addon 放工具栏。"
    ],
    "stateOwner": {
      "library": [
        "输入部位、addon 焦点分派与公共按钮组合。"
      ],
      "application": [
        "文本值、附属命令的业务后果和请求。"
      ]
    },
    "responsive": [
      "输入可收缩，附属动作保留；多行工具栏占独立行，长提示不挤压编辑区。"
    ],
    "customization": [
      "Addon align 表达位置关系，InputGroupButton 复用 Button 的动作状态。"
    ]
  },
  api: [
    {
      name: "InputGroup",
      description: "外框，role=\"group\"。焦点、无效、禁用状态由内部输入框驱动。",
    },
    {
      name: "InputGroupInput / InputGroupTextarea",
      description: "去掉自身边框的 Input / Textarea，接受它们的全部属性（含 size）。在源码中放在 Addon 之前，Tab 顺序先到输入框。",
    },
    {
      name: "InputGroupAddon",
      description: "附加区域。点击非交互内容时把焦点交给输入框。",
      props: [
        { name: "align", type: '"inline-start" | "inline-end" | "block-start" | "block-end"', default: '"inline-start"', description: "位置：行内首尾，或输入框上方 / 下方（多用于 textarea 工具栏）。" },
      ],
    },
    {
      name: "InputGroupText",
      description: "前后缀文字，如 https://、¥、kg，弱化显示。",
    },
    {
      name: "InputGroupButton",
      description: "适配组内尺寸的按钮，默认 ghost + icon-xs。",
      props: [
        { name: "size", type: '"xs" | "sm" | "icon-xs" | "icon-sm"', default: '"icon-xs"', description: "按钮尺寸；lg 输入框配 icon-sm。" },
        { name: "variant", type: "ButtonProps[\"variant\"]", default: '"ghost"', description: "按钮样式。" },
      ],
    },
  ],
  keyboard: [{ keys: "Tab", description: "依次聚焦输入框与组内按钮。" }],
  notes: [
    "前缀文字紧贴输入内容时，给 InputGroupInput 加 className=\"*:[input]:ps-0!\" 去掉多余间距。",
    "组内仅图标的按钮必须提供 aria-label；装饰性图标加 aria-hidden。",
    "密码与搜索有现成封装：PasswordInput、SearchInput。",
  ],
} satisfies ComponentMeta;
