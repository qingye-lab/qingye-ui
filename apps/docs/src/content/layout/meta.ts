import type { ComponentMeta } from "@/lib/types";

export default {
  title: "布局 Layout",
  description:
    "四个轻量的布局原语：纵向排列的 Stack、横向排列的 Inline、自动换行的 Grid，以及走字号阶梯的 Text。间距取自设计令牌，读 JSX 时就能看出意图；它们覆盖不到的情况，直接写 Tailwind 即可。",
  category: "布局",
  source: "local",
  exports: ["Stack", "Inline", "Grid", "Text"],
  keywords: ["layout", "布局", "stack", "inline", "grid", "text", "间距", "栅格"],
  api: [
    {
      name: "Stack",
      description: "子元素纵向排列，间距均匀。",
      props: [
        { name: "gap", type: "0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16", default: "4", description: "间距档位，对应 --qy-space-*（4 = 1rem）。" },
        { name: "align", type: '"stretch" | "start" | "center" | "end"', default: '"stretch"', description: "交叉轴对齐。" },
        { name: "as", type: '"div" | "section" | "article" | "form" | "fieldset" | "ul" | "ol" | …', default: '"div"', description: "渲染的元素，属性类型随之变化。" },
      ],
    },
    {
      name: "Inline",
      description: "子元素横向排列、垂直居中，空间不足时换行。",
      props: [
        { name: "gap", type: "同 Stack", default: "2", description: "间距档位。" },
        { name: "align", type: '"center" | "start" | "end" | "baseline" | "stretch"', default: '"center"', description: "交叉轴对齐；混排不同字号时用 baseline。" },
        { name: "justify", type: '"start" | "center" | "end" | "between"', default: '"start"', description: "主轴分布；标题与操作两端对齐用 between。" },
        { name: "wrap", type: "boolean", default: "true", description: "是否允许换行。" },
        { name: "as", type: '"div" | "header" | "footer" | "nav" | "ul" | …', default: '"div"', description: "渲染的元素。" },
      ],
    },
    {
      name: "Grid",
      description: "等宽单元格，窄屏自动减少列数。",
      props: [
        { name: "columns", type: "1 | 2 | 3 | 4", default: "1", description: "宽屏列数；手机一列，640px 起两列，1024px 起达到设定值。按视口计算。" },
        { name: "minItemWidth", type: "string", description: "每格最小宽度（如 \"14rem\"），按容器宽度放下尽可能多的列，优先于 columns。" },
        { name: "gap", type: "同 Stack", default: "4", description: "间距档位。" },
        { name: "as", type: '"div" | "section" | "ul" | "ol"', default: '"div"', description: "渲染的元素。" },
      ],
    },
    {
      name: "Text",
      description: "走字号阶梯与语义色的文字。",
      props: [
        { name: "size", type: '"body" | "label" | "caption"', default: '"body"', description: "14px 正文、13px 标签、12px 说明。" },
        { name: "tone", type: '"default" | "muted" | "success" | "warning" | "danger"', description: "语义色；不传时继承父级颜色。" },
        { name: "as", type: '"span" | "p" | "div" | "small" | "strong" | "em" | "time"', default: '"span"', description: "渲染的元素。" },
      ],
    },
  ],
  notes: [
    "什么时候用：页面与卡片内部的常规排列——表单字段一列、标题配操作、卡片栅格。意图一目了然，间距自动对齐令牌。",
    "什么时候直接写 Tailwind：需要响应式切换方向、复杂的跨列或定位、一次性的精细调整。原语与 Tailwind 可以混用，className 总是最后合并。",
    "Grid 放在宽度不确定的容器里（侧栏、弹窗）时用 minItemWidth，它跟随容器而不是视口。",
    "标题、长文排版与正文链接见排版类组件（Heading、Prose、TextLink）。",
  ],
  design: {
    "methods": [
      "布白有用",
      "随境取度"
    ],
    "whenToUse": [
      "以 Stack/Inline/Grid 组织真实信息关系，Text 表达文字角色。"
    ],
    "avoid": [
      "所有段落用相同 gap；Grid 重排丢失当前焦点；视觉标签替代 heading/label 的语义。"
    ],
    "composition": [
      "as 选择正确 HTML 结构，gap 表达关系；Inline 换行，Grid minItemWidth 按宿主容量流动。"
    ],
    "stateOwner": {
      "library": [
        "布局、角色文字、属性透传与响应式列数。"
      ],
      "application": [
        "任务分组、DOM 阅读顺序、语义元素和工作保留。"
      ]
    },
    "responsive": [
      "minItemWidth 跟随容器而 columns 跟随视口；重要二维比较仍用 Table。"
    ],
    "customization": [
      "gap 使用既有空间档位，Text tone 只改强调，不能改变状态事实。"
    ]
  },
} satisfies ComponentMeta;
