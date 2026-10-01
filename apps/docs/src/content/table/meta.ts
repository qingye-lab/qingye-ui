import type { ComponentMeta } from "@/lib/types";

export default {
  title: "表格 Table",
  description: "以行列呈现结构化数据，适合订单、设备、成员等需要对比与扫读的列表。需要排序、搜索、分页时改用 DataTable。",
  category: "数据展示",
  source: "coss",
  exports: ["Table", "TableHeader", "TableBody", "TableFooter", "TableRow", "TableHead", "TableCell", "TableCaption"],
  keywords: ["table", "表格", "列表", "数据"],
  api: [
    {
      name: "Table",
      description: "外层是可横向滚动的容器，className 作用于内部 <table>。",
      props: [
        { name: "variant", type: '"default" | "card"', default: '"default"', description: "card 让表体呈卡片样式，通常放在 CardFrame 中。" },
        { name: "density", type: '"default" | "compact"', default: '"default"', description: "行高，分别读取 --qy-row-default（48px）与 --qy-row-compact（40px）；表头比行矮 8px，最低 36px。" },
        { name: "stickyHeader", type: "boolean", default: "false", description: "表头吸顶。容器即滚动区域，需要通过 render 给容器限高。" },
        { name: "render", type: "ReactElement | (props) => ReactElement", description: "替换外层容器，例如 render={<div className=\"max-h-80\" />}。" },
      ],
    },
    { name: "TableHeader", description: "<thead>，表头行不响应悬停。" },
    { name: "TableBody", description: "<tbody>。" },
    { name: "TableFooter", description: "<tfoot>，用于合计、汇总行。" },
    {
      name: "TableRow",
      description: "<tr>，悬停时轻微加深。",
      props: [{ name: "data-state", type: '"selected"', description: "标记选中行，呈现选中底色。" }],
    },
    { name: "TableHead", description: "<th>，默认左对齐（RTL 下右对齐）；数字列加 text-end。" },
    { name: "TableCell", description: "<td>，不换行；数字、金额、时间加 numeric 等宽数字并右对齐。" },
    { name: "TableCaption", description: "<caption>，显示在表格下方的说明。" },
  ],
  notes: [
    "数字、金额、日期列使用 text-end numeric，让位数对齐便于比较。",
    "表格在窄屏上于容器内横向滚动，不会撑破页面；列宽靠内容决定，必要时给关键列 min-w-*。",
    "选择列的复选框需要 aria-label；选中行设置 data-state=\"selected\"。",
    "没有排序、筛选、分页需求时用 Table；需要这些交互时用 DataTable。",
  ],
} satisfies ComponentMeta;
