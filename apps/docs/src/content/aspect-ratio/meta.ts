import type { ComponentMeta } from "@/lib/types";

export default {
  title: "宽高比 AspectRatio",
  description:
    "让内容按固定宽高比占位，常用于封面图、视频和地图。图片加载前就预留好空间，页面不会跳动。",
  category: "布局",
  source: "local",
  exports: ["AspectRatio"],
  keywords: ["aspect ratio", "ratio", "宽高比", "比例", "图片", "视频", "封面"],
  api: [
    {
      name: "AspectRatio",
      description: "渲染一个按比例占位的 <div>，直接子元素被拉伸铺满；圆角、边框写在 className 上并配合 overflow-hidden。",
      props: [
        { name: "ratio", type: "number", default: "1", description: "宽 ÷ 高，例如 16 / 9、4 / 3。" },
        { name: "render", type: "ReactElement | (props) => ReactElement", description: "替换渲染元素，例如 <figure>。" },
      ],
    },
  ],
  notes: [
    "子元素会被绝对定位铺满，图片和视频自己写 object-cover 或 object-contain 决定裁切方式。",
    "宽度由父容器决定，高度随之计算；需要限制尺寸时给外层加 max-w-*。",
  ],
} satisfies ComponentMeta;
