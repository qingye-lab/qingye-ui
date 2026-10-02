import type { ComponentMeta } from "@/lib/types";

export default {
  title: "骨架屏 Skeleton",
  description: "内容加载时先画出与真实布局一致的占位块，减少等待感和加载完成时的跳动。适合列表、卡片、表格等结构已知的区域。",
  category: "反馈",
  source: "coss",
  exports: ["Skeleton"],
  keywords: ["skeleton", "骨架屏", "占位", "placeholder", "加载", "loading", "shimmer"],
  api: [
    {
      name: "Skeleton",
      description: "一个带扫光动画的占位 <div>，默认 rounded-sm。尺寸与形状全部由 className 决定，如 h-4 w-32、size-10 rounded-full。透传所有 <div> 属性。",
    },
  ],
  notes: [
    "占位块的尺寸尽量与真实内容一致：头像用同样的直径，文字行高度接近字号，按钮用同样的高度与圆角，加载完成时不发生位移。",
    "多个骨架共用同一道扫光（背景固定在视口上），一屏里放再多也不会显得杂乱。",
    "在加载区域的容器上设 aria-busy=\"true\"，并放一段 sr-only 文字（如 “正在加载”），骨架本身对读屏无意义。",
    "系统开启“减少动态效果”时扫光自动停止，只保留静态底色。",
    "加载很快（< 300ms）的内容不要闪一下骨架；不知道结构的区域用 Spinner。",
  ],
  design: {
    "methods": [
      "名实相符",
      "布白有用"
    ],
    "whenToUse": [
      "初次内容尚未到达，已知大致解剖需要稳定占位。"
    ],
    "avoid": [
      "将错误、空数据和加载都显示骨架；重复播报每一条占位；刷新已有内容时全部替换。"
    ],
    "composition": [
      "宿主统一 aria-busy 与加载名称，Skeleton 对齐真实内容结构；有效数据保留，失败显示可恢复信息。"
    ],
    "stateOwner": {
      "library": [
        "占位视觉与公共减少动态效果策略。"
      ],
      "application": [
        "加载状态、何时替换内容、失败和恢复。"
      ]
    },
    "responsive": [
      "占位随真实布局换行与收列，避免固定宽度制造页面溢出。"
    ],
    "customization": [
      "className 设置真实内容的占位尺寸，数量按需要避免把等待变成装饰。"
    ]
  },
} satisfies ComponentMeta;
