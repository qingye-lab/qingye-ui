import type { ComponentMeta } from "@/lib/types";

export default {
  title: "按键 Kbd",
  description: "标示键盘按键或快捷键组合，用在说明文字、按钮、输入框提示与菜单中。",
  category: "排版",
  source: "coss",
  exports: ["Kbd", "KbdGroup"],
  keywords: ["kbd", "快捷键", "按键", "shortcut", "hotkey"],
  api: [
    {
      name: "Kbd",
      description: "渲染 <kbd>，一个按键。放在按钮内时自动跟随按钮的文字颜色。",
    },
    {
      name: "KbdGroup",
      description: "渲染 <kbd>，把多个 Kbd 组合成一个快捷键，例如 ⌘ + K。",
    },
  ],
  notes: [
    "Kbd 只是视觉提示，不注册快捷键；真正的快捷键在应用中监听，并在控件上用 aria-keyshortcuts 声明，例如 aria-keyshortcuts=\"Meta+K\"。",
    "按平台显示修饰键：macOS 用 ⌘ ⌥ ⇧ ⌃，Windows 与 Linux 用 Ctrl、Alt、Shift。",
    "装饰性的提示（如输入框末端的 ⌘K）可加 aria-hidden，避免读屏重复朗读。",
  ],
  design: {
    "methods": [
      "名实相符"
    ],
    "whenToUse": [
      "提示实际存在的快捷键或记录一次键盘输入。"
    ],
    "avoid": [
      "显示并未实现的快捷键；用 Kbd 当可点击按钮；图形按键符号没有可理解名称。"
    ],
    "composition": [
      "Kbd/KbdGroup 跟随对应动作的文字；实际监听在应用或原语中实现，提示不产生行为。"
    ],
    "stateOwner": {
      "library": [
        "kbd 语义与文字在按钮中的颜色继承。"
      ],
      "application": [
        "平台快捷键、冲突处理、作用域与按键名称。"
      ]
    },
    "responsive": [
      "复杂组合允许所在内容换行，不能缩小到不可辨的键帽。"
    ],
    "customization": [
      "className 控制呈现；平台符号与可访问文本按实际系统匹配。"
    ]
  },
} satisfies ComponentMeta;
