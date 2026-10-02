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
  design: {
    "methods": [
      "相成相制",
      "布白有用"
    ],
    "whenToUse": [
      "需要视觉或语义分隔已经不同的内容范围。"
    ],
    "avoid": [
      "每两行都画线；把 Separator 当可拖动分隔条；只靠线说明新任务开始。"
    ],
    "composition": [
      "标题和间距先说明关系；separator 只是边界，需要调面板大小时用 ResizableHandle。"
    ],
    "stateOwner": {
      "library": [
        "分隔原语、方向与边界颜色。"
      ],
      "application": [
        "内容分组、边界是否需要辅助技术感知。"
      ]
    },
    "responsive": [
      "横竖方向随实际布局选择，不用固定高度把相邻控件挤压。"
    ],
    "customization": [
      "orientation 决定几何；颜色来自边界角色，装饰与语义选择遵守当前原语 API。"
    ]
  },
} satisfies ComponentMeta;
