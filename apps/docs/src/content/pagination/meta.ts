import type { ComponentMeta } from "@/lib/types";

export default {
  title: "分页 Pagination",
  description: "在多页列表之间跳转。页数多时用省略号收起中间页；移动端改用“第 3 / 12 页”加前后翻页的紧凑形式。",
  design: {
    "methods": [
      "名实相符",
      "展开有据",
      "进退相承"
    ],
    "whenToUse": [
      "在可定位的多页内容之间前进、后退与直达，当前页有明确标识。"
    ],
    "avoid": [
      "禁用首页上一页或末页下一页时，不得因路由组件自带目的地再次恢复导航；页数未知不能显示成零页。"
    ],
    "composition": [
      "用真实 href / 路由链接保留分享与浏览器返回；与总数和每页条数组成列表底栏。"
    ],
    "stateOwner": {
      "library": [
        "提供导航名称、当前页、禁用目的地与激活阻止，省略页说明保留给辅助技术。"
      ],
      "application": [
        "维护页数、数据请求、已加载内容、筛选与页码关系；失败时保留可继续操作的旧内容。"
      ]
    },
    "responsive": [
      "窄屏可用当前页 / 总页数与前后翻页；隐藏可见文字仍保留前后动作名称。"
    ],
    "customization": [
      "size 调整几何，render 接入路由链接并获得相同样式；disabled 改为无 href 原生链接占位，保留标签、名称、className 与 style。"
    ]
  },
  category: "导航",
  source: "coss",
  exports: [
    "Pagination",
    "PaginationContent",
    "PaginationItem",
    "PaginationLink",
    "PaginationPrevious",
    "PaginationNext",
    "PaginationEllipsis",
  ],
  keywords: ["pagination", "分页", "翻页", "页码"],
  api: [
    { name: "Pagination", description: "<nav> 容器，默认 aria-label 来自语言包（“分页”）。" },
    { name: "PaginationContent", description: "<ul> 列表，横向排列页码。" },
    { name: "PaginationItem", description: "<li> 单项。" },
    {
      name: "PaginationLink",
      description: "页码链接，样式来自 Button，数字等宽。",
      props: [
        { name: "isActive", type: "boolean", default: "false", description: "当前页：outline 样式并带 aria-current=\"page\"。" },
        { name: "disabled", type: "boolean", default: "false", description: "不可用：输出无 href 的原生链接占位、退出 Tab 顺序并阻止激活；自定义路由组件也不会重新生成目的地。" },
        { name: "size", type: "Button size", default: '"icon"', description: "按钮尺寸，页码默认为正方形。" },
        { name: "render", type: "ReactElement | render function", description: "接入转发属性的路由 Link，仍提供页码样式。禁用时保留该元素的内容、名称与样式，以原生链接占位取代路由组件。" },
      ],
    },
    { name: "PaginationPrevious", description: "上一页；窄屏只显示箭头，文字来自语言包，可用 children 覆盖。接受 PaginationLink 的全部属性。" },
    { name: "PaginationNext", description: "下一页；同上。" },
    { name: "PaginationEllipsis", description: "省略号，表示被收起的页码，对辅助技术读作“更多页”。" },
  ],
  keyboard: [
    { keys: "Tab", description: "依次聚焦上一页、各页码与下一页；禁用项被跳过。" },
    { keys: "Enter", description: "跳转到聚焦的页。" },
  ],
  notes: [
    "页码是导航：能用 URL 表示的页面优先用 href（如 ?page=3），便于分享与后退。",
    "首页时禁用“上一页”、末页时禁用“下一页”，保持位置不变，避免整行跳动。",
    "页数超出当前容器容量时保留首尾与当前页邻近页，其余用省略号；按可读性与可触达性决定容量。",
    "在表格下方与“每页行数”“共 N 条”组合，构成完整的列表底栏。",
  ],
} satisfies ComponentMeta;
