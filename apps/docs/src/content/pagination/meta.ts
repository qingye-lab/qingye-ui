import type { ComponentMeta } from "@/lib/types";

export default {
  title: "分页 Pagination",
  description: "在多页列表之间跳转。页数多时用省略号收起中间页；移动端改用“第 3 / 12 页”加前后翻页的紧凑形式。",
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
        { name: "disabled", type: "boolean", default: "false", description: "不可用：去掉 href、退出 Tab 顺序，并忽略 onClick。" },
        { name: "size", type: "Button size", default: '"icon"', description: "按钮尺寸，页码默认为正方形。" },
        { name: "render", type: "ReactElement", description: "替换渲染元素。传入时不再附加按钮样式，需自行渲染 Button。" },
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
    "页码超过 7 个时保留首尾与当前页两侧，其余用省略号。",
    "在表格下方与“每页行数”“共 N 条”组合，构成完整的列表底栏。",
  ],
} satisfies ComponentMeta;
