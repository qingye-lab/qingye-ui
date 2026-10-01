import type { ComponentMeta } from "@/lib/types";

export default {
  title: "分隔线 Separator",
  description: "在内容组之间画一条 1px 的细线，横向分开段落区块，纵向分开行内的链接或操作。",
  category: "布局",
  source: "coss",
  exports: ["Separator"],
  keywords: ["separator", "divider", "分隔线", "分割线", "hr"],
  api: [
    {
      name: "Separator",
      description: "带 role=\"separator\" 的细线，颜色为半透明边框色，在任何底色上都协调。",
      props: [
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "横线占满宽度；竖线在 flex 行内自动拉伸到行高，也可用 h-* 指定高度。" },
      ],
    },
  ],
  notes: [
    "只用于区分内容组；纯装饰的线条用边框（border-t 等）即可，不需要语义。",
    "竖线放在 flex 行内才会自动拉伸；指定 h-4 之类的高度时以指定为准。",
  ],
} satisfies ComponentMeta;
