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
  design: {
    "methods": [
      "布白有用",
      "随境取度"
    ],
    "whenToUse": [
      "图片、视频或地图需要在资源到来前保留稳定位置。"
    ],
    "avoid": [
      "把标题、正文和说明都塞进被绝对定位的媒体框；重要内容只能通过裁切后的图像识别。"
    ],
    "composition": [
      "AspectRatio 只围住媒体，标题与说明放在同一 figure 的外部；object-cover 与 object-contain 按内容是否可裁切选择。"
    ],
    "stateOwner": {
      "library": [
        "有效比例归一化、媒体占位和 render 透传。"
      ],
      "application": [
        "资源地址、替代文本、加载失败后的替换与焦点内容。"
      ]
    },
    "responsive": [
      "宽度跟随容器；改变比例时核对主体是否仍完整，必要时移动裁切焦点。"
    ],
    "customization": [
      "用 ratio 调整占位，className 集中定义裁切和圆角，比例不代替图片自身尺寸。"
    ]
  },
} satisfies ComponentMeta;
