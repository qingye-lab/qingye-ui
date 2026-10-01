import type { ComponentMeta } from "@/lib/types";

export default {
  title: "面包屑 Breadcrumb",
  description: "显示当前页面在层级中的位置，并可逐级返回。放在页面标题上方，层级较深时把中间层收进省略菜单。",
  category: "导航",
  source: "coss",
  exports: [
    "Breadcrumb",
    "BreadcrumbList",
    "BreadcrumbItem",
    "BreadcrumbLink",
    "BreadcrumbPage",
    "BreadcrumbSeparator",
    "BreadcrumbEllipsis",
  ],
  keywords: ["breadcrumb", "面包屑", "路径", "层级", "导航"],
  api: [
    { name: "Breadcrumb", description: "<nav> 容器，默认 aria-label 来自语言包（“面包屑导航”）。" },
    { name: "BreadcrumbList", description: "<ol> 列表，自动换行。" },
    { name: "BreadcrumbItem", description: "<li> 单项。" },
    {
      name: "BreadcrumbLink",
      description: "可点击的上级页面。",
      props: [{ name: "render", type: "ReactElement", description: "替换为路由库的链接组件，例如 <Link to=\"/projects\" />。" }],
    },
    { name: "BreadcrumbPage", description: "当前页，不可点击，带 aria-current=\"page\"。" },
    {
      name: "BreadcrumbSeparator",
      description: "分隔符，对辅助技术隐藏；默认是右箭头，从右到左布局时自动翻转。",
      props: [{ name: "children", type: "ReactNode", description: "自定义分隔符，例如斜线图标。" }],
    },
    { name: "BreadcrumbEllipsis", description: "省略号图标，通常作为菜单触发器的内容，承载被折叠的中间层级。" },
  ],
  keyboard: [
    { keys: "Tab", description: "依次聚焦各级链接；当前页不可聚焦。" },
    { keys: "Enter", description: "打开链接或省略菜单。" },
  ],
  notes: [
    "最后一项用 BreadcrumbPage 表示当前页，不要做成链接。",
    "省略菜单的触发按钮需要 aria-label，例如“显示更多路径”。",
    "窄屏上用 hidden sm:inline-flex 隐藏中间层，并显示省略菜单，保证一行放得下。",
  ],
} satisfies ComponentMeta;
