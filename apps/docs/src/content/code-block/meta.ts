import type { ComponentMeta } from "@/lib/types";

export default {
  title: "代码块 CodeBlock",
  description: "只读的代码展示：可选文件名与语言标题、复制按钮、行号、行高亮、横向滚动与最大高度。另含行内代码 InlineCode。",
  category: "排版",
  source: "local",
  exports: ["CodeBlock", "InlineCode"],
  keywords: ["code", "pre", "snippet", "代码", "代码块", "复制", "行号"],
  api: [
    {
      name: "CodeBlock",
      description: "不内置语法高亮：传纯文本 code，或传入已高亮的节点作为 children。",
      props: [
        { name: "code", type: "string", description: "源代码文本，按原样渲染并用于复制。" },
        { name: "children", type: "ReactNode", description: "已高亮的节点（如 Shiki 输出）。每行加 data-line 即可获得行号与高亮；同时传 code 让复制得到干净文本。" },
        { name: "filename", type: "ReactNode", description: "标题栏中的文件名。" },
        { name: "language", type: "string", description: "标题栏中的语言，同时写入 data-language。" },
        { name: "lineNumbers", type: "boolean", default: "false", description: "显示行号（不可选中，复制时不会带上）。" },
        { name: "highlightLines", type: "number[]", description: "需要强调的行（从 1 开始），使用 --code-highlight 底色。" },
        { name: "wrap", type: "boolean", default: "false", description: "自动换行；默认不换行并横向滚动。" },
        { name: "maxHeight", type: "number | string", description: "超过该高度后纵向滚动，如 320 或 \"20rem\"。" },
        { name: "copyable", type: "boolean", default: "true", description: "显示复制按钮。无标题栏时按钮在右上角，悬停或聚焦时出现（触屏常显）。" },
        { name: "copyLabel", type: "string", default: "locale.copyCode", description: "复制按钮的可访问名称。" },
      ],
    },
    { name: "InlineCode", description: "正文中的行内代码，字号随所在文字缩放（0.875em）。支持 render。" },
  ],
  keyboard: [
    { keys: "Tab", description: "聚焦代码区域（可滚动区域需要键盘可达），再次 Tab 到复制按钮。" },
    { keys: "← / → / ↑ / ↓", description: "聚焦代码区域后滚动。" },
  ],
  notes: [
    "代码区域始终 dir=\"ltr\"，在 RTL 页面中也保持从左到右。",
    "需要语法高亮时在应用侧用 Shiki 等工具生成节点再传入，组件不绑定高亮库。",
    "不要用 CodeBlock 展示需要编辑的内容；可编辑请用 Textarea。",
  ],
  design: {
    "methods": [
      "名实相符",
      "布白有用"
    ],
    "whenToUse": [
      "阅读、选择和复制代码、命令或配置，源文本需要保持准确。"
    ],
    "avoid": [
      "将代码展示当编辑器；把复制请求开始当成功；复制行号、折行空格或装饰文字。"
    ],
    "composition": [
      "code 提供干净源文；预高亮 children 配合 code，行号与高亮只影响阅读。InlineCode 用于短的行内语法。"
    ],
    "stateOwner": {
      "library": [
        "滚动区域、行结构、复制反馈与部位。"
      ],
      "application": [
        "源码、语法高亮生成、敏感信息遮蔽和代码说明。"
      ]
    },
    "responsive": [
      "比较缩进时保留横向滚动；阅读长参数时可 wrap，换行不能修改原文。"
    ],
    "customization": [
      "maxHeight 约束工作面，wrap 决定阅读策略；文件名与语言用于识别而非重复解释。"
    ]
  },
} satisfies ComponentMeta;
