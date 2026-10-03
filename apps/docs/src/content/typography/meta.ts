import type { ComponentMeta } from "@/lib/types";

export default {
  title: "排版 Typography", titleEn: "Typography", category: "排版", layer: "foundation", source: "local",
  description: "标题层级、正文、辅助文字与数值共用已有文字档；语义标签与视觉档独立选择。",
  descriptionEn: "Headings, body copy, supporting text and numbers use the existing text steps. Semantics and visual size are independent.",
  exports: ["Heading", "Text"], keywords: ["文字", "标题", "numeric", "heading", "text"],
  decisions: "level 决定 h1–h6，step 决定视觉档。render 改变实际语义；中文依 lang 使用正常字距，numeric 不格式化值。",
  decisionsEn: "level determines h1–h6 and step selects appearance. render changes actual semantics; language controls CJK tracking and numeric does not format values.",
  api: [
    { name: "Heading", description: "真实标题，层级与字号分离。", descriptionEn: "A real heading with independent outline level and visual step.", props: [
      { name: "level", type: "1 | 2 | 3 | 4 | 5 | 6", default: "2", description: "文档大纲中的标题级别。", descriptionEn: "Heading level in the document outline." },
      { name: "step", type: "TextStep", default: '"heading"', description: "src/text-steps.ts 中已有档；不由 level 推断。", descriptionEn: "An existing TextStep, independent of level." },
      { name: "numeric", type: "boolean", default: "false", description: "应用既有等宽数字规则。", descriptionEn: "Apply the existing tabular figure utility." },
      { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "useRender.ComponentProps<\"h2\">", description: "最终标签决定可访问语义；透传 lang、事件和样式。", descriptionEn: "The final tag determines semantics; language, events and styles are forwarded." },
    ] },
    { name: "Text", description: "正文、辅助说明或数值；默认 p。", descriptionEn: "Body copy, supporting text or numbers; defaults to p.", props: [
      { name: "step", type: "TextStep", default: '"body"', description: "如 reading、support、caption、metric；不新增文字档。", descriptionEn: "For example reading, support, caption or metric; no additional ramp." },
      { name: "numeric", type: "boolean", default: "false", description: "等宽数字；未知与空值由应用如实呈现。", descriptionEn: "Tabular figures; the application preserves unknown and empty values." },
      { name: "render / ref / 原生属性", nameEn: "render / ref / native props", type: "useRender.ComponentProps<\"p\">", description: "内联文字 render 成 span。颜色默认继承。", descriptionEn: "Render as span for inline text. Color inherits by default." },
    ] },
  ],
  notes: ["字号、行高、字重和字距是当前主题预设，不是由理念唯一推导。", "中文容器标记 lang=zh-CN；混排与长词保留内容并换行。", "辅助文字仍按普通文字验证对比；numeric 不把待核实变成 0。"],
  notesEn: ["Font size, leading, weight and tracking are theme presets, not unique deductions.", "Mark Chinese containers with lang=zh-CN; mixed content and long words wrap without losing text.", "Supporting copy still needs normal text contrast; numeric never replaces unknown with zero."],
  design: { methods: ["名实相符", "相成相制", "布白有用"], whenToUse: ["复用文字档同时保留真实标题大纲、正文或数值语义。"], avoid: ["通过字号推断标题层级；把未知写成零；裁切关键后果。"], composition: ["Heading + Text + Layout 形成内容关系；内联文字 render 成 span。"], stateOwner: { library: ["文字档接线、正常换行与数字表现。"], application: ["标题大纲、内容、语言与数值事实。"] }, customization: ["集中主题修改文字档；特殊职责才单项覆写。"], responsive: ["support/dense/control 继续接已有 mobile 档；页面按裁决仅验桌面。"] }, designEn: {"whenToUse":["Reuse text profiles while retaining actual heading outlines, prose, or numeric semantics."],"avoid":["Heading levels inferred from size, unknown as zero, or clipped critical consequences."],"composition":["Heading + Text + Layout establish content relationships; render inline text as span."],"stateOwner":{"library":["Text profiles, ordinary wrapping, and number presentation."],"application":["Heading outlines, content, language, and numeric facts."]},"customization":["The central theme owns text profiles; override individual roles only for specific responsibilities."],"responsive":["support/dense/control retain existing mobile profiles; page checks were desktop only by decision."]},
} satisfies ComponentMeta;
