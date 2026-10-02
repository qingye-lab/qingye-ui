import type { ComponentMeta } from "@/lib/types";

export default {
  title: "卡片 Card",
  description: "把一组相关的内容和操作收进一个带边框的表面，例如设置项、统计指标或表单。CardFrame 在外层再包一圈浅底外框，用来收纳多张卡片或卡片样式的表格。",
  category: "布局",
  source: "coss",
  exports: ["Card", "CardHeader", "CardTitle", "CardDescription", "CardAction", "CardPanel", "CardFooter"],
  keywords: ["card", "卡片", "面板", "panel", "容器", "card frame", "外框", "统计卡片", "设置卡片"],
  api: [
    {
      name: "Card",
      description: "根元素，圆角 2xl、半透明边框与一线内高光。内边距由 --card-spacing 控制，移动端自动收紧。",
      props: [
        { name: "size", type: '"default" | "sm"', default: '"default"', description: "sm 收紧内边距与区块间距，适合仪表盘和侧栏。" },
        { name: "render", type: "ReactElement | (props) => ReactElement", description: "替换渲染元素，例如 <section> 或 <a>。" },
      ],
    },
    {
      name: "CardHeader",
      description: "标题区。包含 CardAction 时自动变成两列，操作贴右上角。加 className=\"border-b\" 得到带分隔线的头部。",
    },
    { name: "CardTitle", description: "标题，字重 600。" },
    { name: "CardDescription", description: "标题下方的辅助说明，弱化颜色。" },
    { name: "CardAction", description: "放在 CardHeader 内的操作区，跨标题与说明两行，靠右对齐。" },
    {
      name: "CardPanel",
      description: "主体内容。紧跟无分隔线的头部或底部时自动去掉相邻一侧的内边距；别名 CardContent。",
    },
    {
      name: "CardFooter",
      description: "底部操作区，横向排列。加 className=\"border-t\" 得到带分隔线的底部。",
    },
    {
      name: "CardFrame",
      description: "浅底外框，可容纳 CardFrameHeader、多张 Card 或 <Table variant=\"card\">，内部卡片会去掉阴影并贴合外框圆角。",
      props: [{ name: "render", type: "ReactElement | (props) => ReactElement", description: "替换渲染元素。" }],
    },
    { name: "CardFrameHeader", description: "外框的标题区，包含 CardFrameAction 时自动两列。" },
    { name: "CardFrameTitle", description: "外框标题。" },
    { name: "CardFrameDescription", description: "外框说明文字。" },
    { name: "CardFrameAction", description: "外框标题区右侧的操作。" },
    { name: "CardFrameFooter", description: "外框底部，通常放汇总或次要说明。" },
  ],
  notes: [
    "卡片标题用 CardTitle 只是视觉层级；需要文档大纲时用 render 渲染为 <h2>、<h3>：<CardTitle render={<h3 />} />。",
    "数字指标加 numeric，让并排卡片中的数字对齐、不随数值抖动。",
    "整张卡片可点击时，用 render={<a href />} 渲染为链接，不要在卡片内再嵌套其他可交互元素。",
    "不要层层嵌套卡片；需要把多张卡片归为一组时用 CardFrame。",
  ],
  design: {
    "methods": [
      "相成相制",
      "布白有用"
    ],
    "whenToUse": [
      "一个对象或任务需要独立边界，并且标题、内容与动作属于同一范围。"
    ],
    "avoid": [
      "每段正文套卡片；整卡链接里嵌套按钮；把 CardTitle 的视觉大小当作标题语义。"
    ],
    "composition": [
      "按需组合 Header/Panel/Footer；CardTitle render 为真实标题。整卡导航与卡内独立动作分别设计。"
    ],
    "stateOwner": {
      "library": [
        "表面、部位关系、尺寸角色与 render。"
      ],
      "application": [
        "对象范围、标题级别、动作权限、草稿与异步结果。"
      ]
    },
    "responsive": [
      "长标题和动作共同占位时允许动作换行；卡片内部表格保留二维比较。"
    ],
    "customization": [
      "size 控制内容密度；表面来自集中主题，CardFrame 只用于需要共同外框的一组对象。"
    ]
  },
} satisfies ComponentMeta;
