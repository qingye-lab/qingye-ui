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
  design: {
    "methods": [
      "布白有用",
      "相成相制"
    ],
    "whenToUse": [
      "多对象共享同一组属性，读者需要跨行跨列比较。"
    ],
    "avoid": [
      "窄屏自动把每行拆成不同卡片使列关系消失；tr 悬停外观被误解成可点击；数字列混合单位。"
    ],
    "composition": [
      "table/thead/tbody/th/td 保留表结构；Caption 或 aria-label 命名对象，动作放真实按钮，数字列统一单位与对齐。"
    ],
    "stateOwner": {
      "library": [
        "语义表格、表面、密度和容器滚动。"
      ],
      "application": [
        "列含义、scope/headers 的复杂关联、排序选择与行操作。"
      ]
    },
    "responsive": [
      "在外层容器横向滚动保留比较面；表头吸顶要有限高，必要列可指定最小宽度。"
    ],
    "customization": [
      "density 调整行关系，className 属于 table；render 调整外容器，不能混淆两个入口。"
    ]
  },
} satisfies ComponentMeta;
