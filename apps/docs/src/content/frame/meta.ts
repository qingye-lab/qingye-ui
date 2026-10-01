import type { ComponentMeta } from "@/lib/types";

export default {
  title: "框架 Frame",
  description: "浅底外框里放一块或多块白色面板，把同一主题的信息归为一组，如账单概览、域名或构建设置。比 Card 更适合“一个标题 + 若干并列区块”的结构。",
  category: "布局",
  source: "coss",
  exports: ["Frame", "FrameHeader", "FrameTitle", "FrameDescription", "FramePanel", "FrameFooter"],
  keywords: ["frame", "框架", "外框", "分组", "panel", "面板", "section", "区块"],
  api: [
    {
      name: "Frame",
      description: "根元素：浅底（muted/72）、2xl 圆角、4px 内边距；相邻的 FramePanel 之间自动留 4px 间隔。透传所有 <div> 属性。",
    },
    { name: "FrameHeader", description: "外框顶部的标题区（<header>），落在浅底上，纵向排列标题与说明。" },
    { name: "FrameTitle", description: "标题，14px / 600。" },
    { name: "FrameDescription", description: "标题下方的说明文字。" },
    {
      name: "FramePanel",
      description: "白色面板，xl 圆角、半透明边框与一线内高光，默认 20px 内边距。可以连续放多块。",
    },
    { name: "FrameFooter", description: "外框底部（<footer>），落在浅底上，放汇总、提示或次要操作。" },
  ],
  notes: [
    "FrameTitle 默认是 <div>；需要进入文档大纲时，在内部放 <h2>/<h3>，或直接用标题元素加相同类名。",
    "面板里的内容自行布局；多块面板并列时，每块只讲一件事。",
    "Frame 也可以直接包住 <Table variant=\"card\">，让表头落在浅底上。",
    "需要标题区带操作按钮时，给 FrameHeader 加 flex-row 与 justify-between。",
  ],
} satisfies ComponentMeta;
