import type { ComponentMeta } from "@/lib/types";

export default {
  title: "描述列表 DescriptionList",
  description: "以「名称—值」成对展示一个对象的详情，如订单信息、设备参数、账号资料。渲染为语义化的 <dl>。",
  category: "数据展示",
  source: "local",
  exports: ["DescriptionList", "DescriptionListItem", "DescriptionTerm", "DescriptionDetails"],
  keywords: ["description list", "dl", "key value", "详情", "描述列表", "键值对", "属性"],
  api: [
    {
      name: "DescriptionList",
      description: "<dl> 容器。",
      props: [
        { name: "layout", type: '"horizontal" | "vertical" | "grid"', default: '"horizontal"', description: "horizontal：名称在左侧固定列；vertical：名称在值的上方；grid：上下结构按容器宽度自动分列。" },
        { name: "divided", type: "boolean", default: "false", description: "在条目之间加发丝线。" },
      ],
    },
    { name: "DescriptionListItem", description: "一组名称与值，渲染为 <div>（<dl> 允许的分组元素）。" },
    { name: "DescriptionTerm", description: "<dt>，弱化色，可带图标。" },
    {
      name: "DescriptionDetails",
      description: "<dd>，长文本自动断行。",
      props: [
        { name: "copyValue", type: "string", description: "设置后在值后显示复制按钮（复用 CopyButton），复制这里给出的原文。" },
        { name: "copyLabel", type: "string", default: "locale.copy", description: "复制按钮的可访问名称，建议写明复制的对象，如「复制订单号」。" },
      ],
    },
  ],
  notes: [
    "名称列宽由 --description-list-term 控制（移动端 96px，桌面 144px），可在 className 中覆盖，例如 [--description-list-term:8rem]。",
    "grid 布局按 --description-list-column（默认 10rem）自动决定列数，放在侧栏或窄卡片中也不会挤压。",
    "分别说明未填写、尚未取得与不适用；零显示为零。只在破折号的含义已有明确约定时用它表示空值。",
    "页面中有多个复制按钮时，用 copyLabel 写清复制的是什么，读屏用户才分得清。",
  ],
  design: {
    "methods": [
      "名实相符",
      "布白有用"
    ],
    "whenToUse": [
      "一个对象的名称和值成对出现，读者需要辨认属性关系。"
    ],
    "avoid": [
      "把零、未填写、不适用和未知都写成破折号；多对象比较拆成互不对齐的详情列。"
    ],
    "composition": [
      "每个 Item 包含 Term 与 Details；复制值使用原文本并明确对象，说明和链接仍属于该值。"
    ],
    "stateOwner": {
      "library": [
        "dl/dt/dd 语义、成对布局、部位与复制组合。"
      ],
      "application": [
        "属性事实、空值含义、单位和复制原文。"
      ]
    },
    "responsive": [
      "长标识符需能断行；horizontal 留名称列，过窄时在项目组合切到 vertical 或 grid。"
    ],
    "customization": [
      "layout/--description-list-term/--description-list-column 调整关系；多个对象横向比较使用 Table。"
    ]
  },
} satisfies ComponentMeta;
