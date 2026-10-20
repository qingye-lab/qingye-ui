import type { ComponentMeta } from "@/lib/types";
export default {
  "title": "数据集合 DataTable",
  "titleEn": "DataTable",
  "description": "调用方真实集合的比较、排序与范围选择。",
  "descriptionEn": "Comparison, sorting and scoped selection for a real caller-owned collection.",
  "category": "数据展示",
  "layer": "pattern",
  "source": "local",
  "exports": [
    "DataTablePattern",
    "DataTable",
    "DataTableSortButton",
    "DataTableSelectionCell",
    "DataTableSelectAll"
  ],
  "decisions": "常用集合用 DataTablePattern 配置数据、列与稳定 ID；高级 TanStack 组合继续使用 DataTable。服务端模式不排序或切片传入页；完整跨页选择保存在 rowSelection ID 映射中。",
  "decisionsEn": "Configure data, columns and stable IDs with DataTablePattern; retain DataTable for advanced TanStack composition. Server mode does not sort or slice supplied pages; the complete cross-page selection lives in the rowSelection ID map.",
  "keywords": ["datagrid", "grid", "table", "sort", "表格", "数据表", "排序", "选择行"],
  "api": [
    {
      "name": "DataTablePattern",
      "description": "配置式排序、当页全选、活动行与分页组合，不发请求。",
      "descriptionEn": "Configured sorting, page selection, active rows and pagination without issuing requests.",
      "props": [
        { "name": "data / columns / getRowId / emptyContent", "type": "T[] / DataTablePatternColumn<T>[] / (row: T) => string / ReactNode", "description": "列显式配置 id、header、accessor、cell、sortable、rowHeader、numeric；稳定 getRowId 必填。", "descriptionEn": "Columns configure id, header, accessor, cell, sortable, rowHeader and numeric; stable getRowId is required." },
        { "name": "state / defaultState / onStateChange", "type": "DataTablePatternState / Partial<DataTablePatternState> / (state, details) => void", "description": "sorting、pagination、rowSelection、activeRowId 共用快照；排序与回到第 1 页只通知一次。外部页码从 1 开始。", "descriptionEn": "A shared snapshot contains sorting, pagination, rowSelection and activeRowId; sorting and reset to page 1 produce one notification. Public page numbers start at 1." },
        { "name": "mode / pagination", "type": "client | server / false | DataTablePatternPagination", "description": "client 对完整数据排序切片并从 data.length 得到总数；server 只展示传入页，分页必须给 totalCount；未知 null 时还必须给 hasNextPage。", "descriptionEn": "Client mode sorts/slices complete data and derives totals from data.length; server mode presents supplied rows and requires totalCount, plus explicit hasNextPage when null." },
        { "name": "selection", "type": "{ label, rowLabel, canSelect? }", "description": "启用选择列；全选只改当页可选行并保留范围外 ID。服务端完整选中范围读取 state.rowSelection，不读当前页的 getSelectedRowModel。", "descriptionEn": "Enables selection; select-all changes eligible rows on the current page while preserving outside IDs. Read state.rowSelection for the complete server selection, not the loaded-page getSelectedRowModel." },
        { "name": "activeRow", "type": "{ columnId: string, onActivate?: (row: T) => void }", "description": "该列内容成为可键盘操作的按钮，cell 保持非交互内容；活动行与复选状态独立。", "descriptionEn": "The named column gets a keyboard-accessible activation button and its cell must contain noninteractive content; activation and checkbox selection remain independent." },
        { "name": "caption / busy / tableProps / native div props", "type": "ReactNode / boolean / DataTableProps / HTML props", "description": "刷新保留传入行；属性分别归属表格或组合外层，不推断请求成功或失败。", "descriptionEn": "Refreshes retain supplied rows; props target the table or composition root and never infer request outcomes." }
      ]
    },
    {
      "name": "DataTable",
      "description": "原生二维集合。",
      "descriptionEn": "A native two-dimensional collection.",
      "props": [
        {
          "name": "table / emptyContent / caption / busy / activeRowId / containerProps",
          "type": "TableInstance<T> / ReactNode / TableContainerProps",
          "description": "getRowId 必填、至少一列；零值/caption 保留，busy 不删除有效 rows。",
          "descriptionEn": "GetRowId and at least one visible column are required; zero and caption are retained, and busy preserves valid rows."
        },
        {
          "name": "columnDef.meta.rowHeader",
          "type": "boolean",
          "description": "实际行标题用 th scope=row；比较列不自动隐藏。",
          "descriptionEn": "Actual row headers use th scope=row; comparison columns are never automatically hidden."
        },
        {
          "name": "render / ref / native props",
          "type": "Base UI part props",
          "description": "属性和 ref 归属实际元素；调用方事件与样式保留。",
          "descriptionEn": "Props and refs target actual elements; caller events and styles are preserved."
        }
      ]
    },
    {
      "name": "DataTableSortButton",
      "description": "应用实例的真实排序入口。",
      "descriptionEn": "A real sorting control for the caller instance.",
      "props": [
        {
          "name": "column / Button props",
          "type": "Column<T, unknown> / ButtonProps",
          "description": "触发 TanStack sorter；仅主排序表头写 aria-sort，多重顺序由应用补充。",
          "descriptionEn": "Invokes TanStack sorting; only the primary header gets aria-sort, and applications explain secondary sort order."
        }
      ]
    },
    {
      "name": "DataTableSelectionCell / DataTableSelectAll",
      "description": "行选择与显式范围选择。",
      "descriptionEn": "Row selection and explicit scope selection.",
      "props": [
        {
          "name": "row / table / scope / aria-label",
          "type": "Row<T> / TableInstance<T> / page | filtered / string",
          "description": "全选的 aria-label 和 scope 必填；checked/mixed 只看该范围可选择 rows。",
          "descriptionEn": "Select-all requires aria-label and scope; checked/mixed considers only selectable rows in that scope."
        },
        {
          "name": "onCheckedChange / disabled / ref",
          "type": "CheckboxProps",
          "description": "取消原语细节可阻止改变选择，禁用行不进入全选。",
          "descriptionEn": "Primitive cancellation prevents selection changes; disabled rows are excluded from select-all."
        }
      ]
    }
  ],
  "notes": [
    "标准组合从 components/data-table 导入 DataTablePattern；分页内置复用 PaginationPattern。跨页选择的对象内容、权限与批量执行范围仍由应用核实。",
    "TanStack 为已声明的可选 peer；应用明确启用排序/筛选/分页模型。",
    "只用排序与选择、不分页时，给 useReactTable 传 `autoResetAll: false`：它的自动重置在渲染之外排队更新状态，页面经 Suspense 懒加载时，被丢弃的那次渲染会让 React 报「未挂载组件更新状态」。"
  ],
  "notesEn": [
    "Import DataTablePattern from components/data-table; its pager reuses PaginationPattern. Applications still verify cross-page object data, permissions and bulk-action scope.",
    "TanStack is a declared optional peer; applications explicitly enable sorting, filtering and pagination models.",
    "With sorting and selection only and no pagination, pass `autoResetAll: false` to useReactTable: its automatic reset queues a state update outside render, and when the page loads lazily through Suspense a discarded render makes React warn about updating an unmounted component."
  ],
  "design": {
    "methods": [
      "名实相符",
      "相成相制",
      "布白有用"
    ],
    "whenToUse": [
      "真实集合按共同维度比较并需要排序或选择。"
    ],
    "avoid": [
      "不请求服务、不猜总数、不把未知当空、不自动删列。"
    ],
    "stateOwner": {
      "library": [
        "表格语义、公共组合与范围选择。"
      ],
      "application": [
        "数据、稳定标识、服务端结果与业务范围；高级模式另持有 TanStack 实例。"
      ]
    },
    "responsive": [
      "桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。"
    ],
    "customization": [
      "控件档案、间距和浮层表面消费现有角色；具体外观是预设。"
    ]
  }, designEn: {"whenToUse":["Compare an actual collection along shared dimensions with sorting or selection."],"avoid":["Requesting services, guessing totals, treating unknown as empty, or automatically removing columns."],"stateOwner":{"library":["Table semantics, public composition, and scoped selection."],"application":["TanStack instance, data, stable identifiers, model configuration, and state."]},"responsive":["Keep actual desktop structure; menus fit available space and tables retain complete comparison columns."],"customization":["Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset."]}
} satisfies ComponentMeta;
