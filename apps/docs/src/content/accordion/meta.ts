import type { ComponentMeta } from "@/lib/types";

export default {
  title: "手风琴 Accordion",
  description: "一组可以逐个展开的分节，用于常见问题、分组设置这类“标题一览、按需展开”的内容。只有一个折叠区时用 Disclosure。",
  design: {
    "methods": [
      "布白有用",
      "展开有据",
      "进退相承"
    ],
    "whenToUse": [
      "围绕一组可独立阅读的章节按需展开，如问题列表和次要分组设置。"
    ],
    "avoid": [
      "关键后果、必填项与错误恢复不能仅藏在关闭章节中；文档标题层级不能由视觉大小代替。"
    ],
    "composition": [
      "Trigger 通过 headerProps.render 匹配页面 h2 / h3 等层级；需要保留字段时为 Panel 设 keepMounted。"
    ],
    "stateOwner": {
      "library": [
        "关联章节标题、展开按钮与面板，支持单开或多开、禁用及键盘导航。"
      ],
      "application": [
        "决定章节分类、哪些内容必须先显示，及收起后的草稿保留与清除。"
      ]
    },
    "responsive": [
      "长标题与箭头分别占位；窄屏展开文本应可读，粗指针检查整行目标。"
    ],
    "customization": [
      "边界来自章节之间的分隔，不要求每节套卡片；展开与退出使用共享时长和缓动。"
    ]
  },
  category: "数据展示",
  source: "coss",
  exports: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionPanel"],
  keywords: ["accordion", "手风琴", "折叠面板", "FAQ", "常见问题"],
  api: [
    {
      name: "Accordion",
      description: "根组件，管理哪些分节处于展开状态。",
      props: [
        { name: "multiple", type: "boolean", default: "false", description: "是否允许同时展开多个分节。" },
        { name: "value / defaultValue", type: "any[]", description: "展开分节的 value 列表（受控 / 非受控）。" },
        { name: "onValueChange", type: "(value: any[]) => void", description: "展开状态变化时调用。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用全部分节。" },
      ],
    },
    {
      name: "AccordionItem",
      description: "单个分节，分节之间以细线分隔。",
      props: [
        { name: "value", type: "any", description: "分节标识；不传时自动生成。" },
        { name: "disabled", type: "boolean", default: "false", description: "禁用该分节。" },
      ],
    },
    {
      name: "AccordionTrigger",
      description: "分节标题按钮，右侧箭头随展开旋转；默认外层标题为 h3。",
      props: [
        { name: "headerProps", type: "Accordion.Header props", description: "设置标题层级与属性，例如 { render: <h2 /> }，以匹配所在文档结构。" },
      ],
    },
    {
      name: "AccordionPanel",
      description: "分节内容，高度过渡展开与收起，可被中途打断。别名 AccordionContent。",
      props: [
        { name: "keepMounted", type: "boolean", default: "false", description: "收起时保留在 DOM 中。" },
        { name: "hiddenUntilFound", type: "boolean", default: "false", description: "收起时内容仍可被浏览器页内搜索找到并自动展开。" },
      ],
    },
  ],
  keyboard: [
    { keys: "Tab", description: "在分节标题之间移动。" },
    { keys: "Enter / Space", description: "展开或收起当前分节。" },
    { keys: "↑ / ↓", description: "移动到上一个 / 下一个分节标题。" },
    { keys: "Home / End", description: "移动到第一个 / 最后一个分节标题。" },
  ],
  notes: [
    "标题写成问题或名词短语，保持简短；内容很长时考虑拆成独立页面。",
    "不要把必须阅读的信息藏在默认收起的分节里。",
  ],
} satisfies ComponentMeta;
