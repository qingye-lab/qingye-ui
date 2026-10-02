import type { ComponentMeta } from "@/lib/types";

export default {
  title: "密码输入框 PasswordInput",
  description: "带显示 / 隐藏切换的密码输入框，用于登录、注册与修改密码。",
  category: "表单",
  source: "local",
  exports: ["PasswordInput"],
  keywords: ["password", "密码", "显示密码", "眼睛"],
  design: {
    "methods": [
      "相成相制",
      "进退相承"
    ],
    "whenToUse": [
      "输入密码，按需查看字符以核对输入。"
    ],
    "avoid": [
      "显示密码只改变可见性，不能复制、清空或自动提交密码。"
    ],
    "composition": [
      "Field 命名输入；尾部 visibility toggle 用稳定名称和 aria-pressed 表达当前可见状态。"
    ],
    "stateOwner": {
      "library": [
        "可见性切换、输入属性与禁用联动。"
      ],
      "application": [
        "密码值、验证、凭据处理及关闭界面时的清理。"
      ]
    },
    "responsive": [
      "输入为主要工作区，尾部图标按钮随尺寸变化并保留触屏命中区。"
    ],
    "customization": [
      "visible 支持由应用集中控制；showLabel 覆盖切换按钮名称。"
    ]
  },
  api: [
    {
      name: "PasswordInput",
      description: "基于 InputGroup。className 作用于外框，其余属性（name、autoComplete、required、ref…）透传给 <input>。",
      props: [
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "输入框尺寸，切换按钮随之调整。" },
        { name: "visible / defaultVisible", type: "boolean", default: "false", description: "受控 / 非受控：是否以明文显示。" },
        { name: "onVisibleChange", type: "(visible: boolean) => void", description: "切换显示状态时调用。" },
        { name: "showLabel", type: "string", default: "locale: showPassword", description: "切换按钮的可访问名称。" },
        { name: "autoComplete", type: "string", description: "登录用 current-password，注册与改密用 new-password。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Tab", description: "从输入框移到显示 / 隐藏按钮。" },
    { keys: "Enter / Space", description: "在按钮上切换明文显示。" },
  ],
  notes: [
    "切换按钮的名称固定为“显示密码”，是否已显示由 aria-pressed 表达，读屏会读作“显示密码，已按下”。",
    "明文显示时关闭了自动大写、自动更正与拼写检查，避免密码被改写或上传到拼写服务。",
    "已隐藏 Edge 自带的显示密码按钮，避免出现两个眼睛图标。",
  ],
} satisfies ComponentMeta;
