import type { ComponentMeta } from "@/lib/types";

export default {
  title: "空状态 Empty",
  description: "列表、表格或页面暂时没有内容时，说明原因并给出下一步。用于首次使用、筛选无结果和清空后的状态。",
  category: "反馈",
  source: "coss",
  exports: ["Empty", "EmptyHeader", "EmptyMedia", "EmptyTitle", "EmptyDescription", "EmptyContent"],
  keywords: ["empty", "空状态", "空白", "无数据", "no data", "暂无", "empty state", "无结果", "no results", "zero state"],
  api: [
    {
      name: "Empty",
      description: "根元素，居中纵向排列，默认上下留白 48px（≥768px 时 80px）。放进卡片或表格时用 className 收紧，如 py-10。",
    },
    { name: "EmptyHeader", description: "包住插图、标题与说明，最大宽度 24rem。" },
    {
      name: "EmptyMedia",
      description: "插图区。className 与其余属性只作用在外层包裹元素上；icon 变体中可见的图标方块带 data-slot=\"empty-media-content\"，两侧是装饰用的倾斜副本。",
      props: [
        {
          name: "variant",
          type: '"default" | "icon"',
          default: '"default"',
          description: "icon 把图标放进带边框的小方块并叠出两张倾斜卡片；default 不加修饰，适合放头像组或插画。",
        },
      ],
    },
    {
      name: "EmptyTitle",
      description: "一句话说明当前状态。默认 18px / 600；嵌在卡片或表格里时用 size=\"sm\" 降到正文大小。",
      props: [
        {
          name: "size",
          type: '"default" | "sm"',
          default: '"default"',
          description: "sm 使用正文大小，适合卡片、表格单元格等已有层级标题的容器。",
        },
      ],
    },
    { name: "EmptyDescription", description: "补充原因或下一步；内部的 <a> 自动带下划线。" },
    { name: "EmptyContent", description: "操作区，放按钮、搜索框或链接，最大宽度 24rem。" },
  ],
  notes: [
    "标题说明“现在是什么情况”，说明文字告诉用户“接下来能做什么”，再配一个主要操作；不要只写“暂无数据”。",
    "筛选或搜索无结果时，在标题里带上关键词，并提供“清除筛选”的出口。",
    "图标是装饰，加 aria-hidden=\"true\"；需要读屏感知的信息写进标题和说明。",
    "嵌在卡片、表格等容器里时收紧上下留白，并给标题加 size=\"sm\"，避免喧宾夺主。",
  ],
} satisfies ComponentMeta;
