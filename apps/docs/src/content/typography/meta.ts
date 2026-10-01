import type { ComponentMeta } from "@/lib/types";

export default {
  title: "排版 Typography",
  description: "标题 Heading、长文容器 Prose 与文字链接 TextLink。字号取自类型令牌，中文长文使用更宽松的行高。正文与辅助文字请用布局中的 Text。",
  category: "排版",
  source: "local",
  exports: ["Heading", "Prose", "TextLink"],
  keywords: ["typography", "heading", "prose", "link", "排版", "标题", "正文", "链接", "文章"],
  api: [
    {
      name: "Heading",
      description: "语义层级与视觉字号分离：level 决定 <h1>–<h6>，size 决定字号。",
      props: [
        { name: "level", type: "1 | 2 | 3 | 4 | 5 | 6", default: "2", description: "文档大纲层级。" },
        { name: "size", type: '"display" | "title" | "heading" | "label"', description: "28 / 18 / 15 / 13px，对应 --qy-text-* 令牌。默认：1→display，2→title，3–4→heading，5–6→label。" },
        { name: "render", type: "ReactElement | (props) => ReactElement", description: "替换渲染元素。" },
      ],
    },
    {
      name: "Prose",
      description: "为一段 HTML 长文（段落、列表、链接、引用、行内代码、代码块、表格、分隔线、图片）提供克制的样式。内部的组件库组件保持自身样式。",
      props: [
        { name: "size", type: '"sm" | "default"', default: '"default"', description: "default：15px / 1.8 行高，适合文章与帮助中心；sm：14px / 1.75，适合侧栏与说明。" },
      ],
    },
    {
      name: "TextLink",
      description: "行内文字链接：细下划线、悬停加深、键盘焦点环。支持 render 接入路由链接。",
      props: [
        { name: "variant", type: '"default" | "muted"', default: '"default"', description: "muted 用于辅助文字中，下划线更淡，悬停时转为正文色。" },
        { name: "external", type: "boolean", default: "false", description: "新标签页打开（rel=\"noopener noreferrer\"），追加箭头图标与读屏提示「在新标签页中打开」。" },
      ],
    },
  ],
  keyboard: [{ keys: "Tab / Enter", description: "聚焦并打开链接。" }],
  notes: [
    "中文不加负字距：display 字号的收紧只在非中日韩语言下生效。",
    "Prose 只作用于没有 data-slot 的普通元素；给其中某个元素加 className 会覆盖默认样式。",
    "标题层级不要跳级；需要较小的视觉字号时改 size，不要用 h4 冒充小标题。",
    "Text 组件（正文、标签、说明）在 layout 中，这里不重复定义。",
  ],
} satisfies ComponentMeta;
