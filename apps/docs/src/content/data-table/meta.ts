import type { ComponentMeta } from "@/lib/types";
export default {
  "title": "数据集合 DataTable",
  "titleEn": "DataTable",
  "description": "调用方真实集合的比较、排序、范围选择与可选虚拟化。",
  "descriptionEn": "Comparison, sorting, scoped selection and optional virtualization for a caller-owned collection.",
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
  "decisions": "常用集合用 DataTablePattern 配置数据、列与稳定 ID；高级 TanStack 组合继续使用 DataTable。服务端模式不排序或切片传入页；完整跨页选择保存在 rowSelection ID 映射中。虚拟化只改变当前行模型的渲染窗口，不改变全选与分页范围。",
  "decisionsEn": "Configure data, columns and stable IDs with DataTablePattern; retain DataTable for advanced TanStack composition. Server mode does not sort or slice supplied pages; the complete cross-page selection lives in the rowSelection ID map. Virtualization changes only the rendered window of the current row model, preserving selection and pagination scope.",
  "keywords": ["datagrid", "grid", "table", "sort", "表格", "数据表", "排序", "选择行"],
  "api": [
    {
      "name": "DataTablePattern",
      "description": "配置式排序、当页全选、活动行与分页组合，不发请求。",
      "descriptionEn": "Configured sorting, page selection, active rows and pagination without issuing requests.",
      "props": [
        { "name": "data / columns / getRowId / emptyContent", "type": "T[] / DataTablePatternColumn<T>[] / (row: T) => string / ReactNode", "description": "列显式配置 id、header、accessor、cell、sortable、rowHeader、numeric；可选 size、minSize、maxSize（px）与 ellipsis。稳定 getRowId 必填。", "descriptionEn": "Columns configure id, header, accessor, cell, sortable, rowHeader and numeric, with optional size/minSize/maxSize in pixels and ellipsis. Stable getRowId is required." },
        { "name": "state / defaultState / onStateChange", "type": "DataTablePatternState / Partial<DataTablePatternState> / (state, details) => void", "description": "sorting、pagination、rowSelection、activeRowId 共用快照；排序与回到第 1 页只通知一次。外部页码从 1 开始。", "descriptionEn": "A shared snapshot contains sorting, pagination, rowSelection and activeRowId; sorting and reset to page 1 produce one notification. Public page numbers start at 1." },
        { "name": "mode / pagination", "type": "client | server / false | DataTablePatternPagination", "description": "client 对完整数据排序切片并从 data.length 得到总数；server 只展示传入页，分页必须给 totalCount；未知 null 时还必须给 hasNextPage。", "descriptionEn": "Client mode sorts/slices complete data and derives totals from data.length; server mode presents supplied rows and requires totalCount, plus explicit hasNextPage when null." },
        { "name": "selection", "type": "{ label, rowLabel, canSelect? }", "description": "启用选择列；全选只改当页可选行并保留范围外 ID。服务端完整选中范围读取 state.rowSelection，不读当前页的 getSelectedRowModel。", "descriptionEn": "Enables selection; select-all changes eligible rows on the current page while preserving outside IDs. Read state.rowSelection for the complete server selection, not the loaded-page getSelectedRowModel." },
        { "name": "activeRow", "type": "({ trigger?: 'cell', columnId: string } | { trigger: 'row' }) & { onActivate?: (row: T) => void }", "description": "默认在指定列放激活按钮，cell 保持非交互内容；trigger=row 时点击行正文或聚焦行后按 Enter/Space。内部控件、链接、label 与编辑区不触发行激活；活动行与复选状态独立。", "descriptionEn": "By default the named column gets an activation button and its cell must be noninteractive. With trigger=row, click row content or focus the row and press Enter/Space. Nested controls, links, labels and editors do not activate the row; activation and selection remain independent." },
        { "name": "selectionAppearance", "type": "row | checkbox", "default": "row", "description": "checkbox 只取消选中行的底色，真实复选框仍保留；活动行的强调独立保留。", "descriptionEn": "Checkbox mode removes only selected-row fill, retaining actual checkboxes and independent active-row emphasis." },
        { "name": "virtualization", "type": "{ height: number, estimateRowHeight: number, overscan?: number }", "description": "显式启用当前行模型的虚拟化；height 含 caption 与表头，实际行高自动测量。尺寸须有限且为正，overscan 为非负整数（默认 1）。", "descriptionEn": "Explicitly virtualizes the current row model. Height includes the caption and header; actual row heights are measured. Dimensions must be finite and positive; overscan is a nonnegative integer, defaulting to 1." },
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
          "name": "table.options.columns[].size / table.options.columns[].minSize / table.options.columns[].maxSize / table.options.state.columnSizing",
          "type": "number / number / number / TanStack state",
          "description": "实际像素列宽，按 minSize/maxSize 钳制。显式配置任一尺寸或非空 columnSizing 时启用固定布局与 colgroup，组合表头取可见叶列之和；未配置尺寸时保持原生自动布局。不内置拖拽调宽。",
          "descriptionEn": "Actual pixel widths clamped by minSize/maxSize. Any explicit dimension or nonempty columnSizing opts into fixed layout with colgroup; grouped headers sum visible leaf widths. Otherwise native auto layout remains. Drag resizing is not built in."
        },
        {
          "name": "columnDef.meta.ellipsis",
          "type": "boolean",
          "default": "false",
          "description": "对非交互的表头与单元格文字启用单行省略；完整渲染文字保留在 DOM、可访问名称与原生 title 中。含控件的内容不裁切。列宽决定容量，关键后果仍应直接可见。",
          "descriptionEn": "Ellipsizes noninteractive header/cell text on one line while retaining full rendered text in the DOM, accessible name and native title. Interactive content is not clipped. Column widths determine capacity; keep critical consequences visible."
        },
        {
          "name": "selectionAppearance / onRowActivate / virtualization",
          "type": "row | checkbox / (row: Row<T>) => void / DataTableVirtualization",
          "description": "选择外观与虚拟化同 Pattern；行激活回调收到 TanStack Row，调用方持有 activeRowId。点击内部交互元素不激活，data-row-activate-ignore 可排除自定义区域；不改变选择。",
          "descriptionEn": "Selection appearance and virtualization match Pattern. Row activation receives a TanStack Row; the caller owns activeRowId. Nested interactive elements and custom data-row-activate-ignore regions are excluded, and activation never changes selection."
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
  "keyboard": [
    { "keys": "Enter / Space", "description": "聚焦可激活行后执行行激活；内部控件保留自己的键盘行为。", "descriptionEn": "Activate a focused actionable row; nested controls retain their own keyboard behavior." },
    { "keys": "ArrowUp / ArrowDown / Home / End", "description": "虚拟化时，在滚动容器或行本身移动焦点；不会接管内部输入框的编辑键位。", "descriptionEn": "In virtual mode, move focus from the viewport or row itself without intercepting editing keys in nested inputs." }
  ],
  "notes": [
    "标准组合从 components/data-table 导入 DataTablePattern；分页内置复用 PaginationPattern。跨页选择的对象内容、权限与批量执行范围仍由应用核实。",
    "TanStack 为已声明的可选 peer；应用明确启用排序/筛选/分页模型。",
    "只用排序与选择、不分页时，给 useReactTable 传 `autoResetAll: false`：它的自动重置在渲染之外排队更新状态，页面经 Suspense 懒加载时，被丢弃的那次渲染会让 React 报「未挂载组件更新状态」。",
    "固定布局中未配置尺寸的文字列使用 TanStack 的默认尺寸；标记列仍按已有 marker 与单元格内缘角色取宽。列宽过小不会裁掉交互控件，请给操作列留下真实容量。",
    "虚拟化保留 table/thead/tbody/tr/th/td。aria-rowcount 与 aria-rowindex 描述当前表格页（含表头），不把服务端全局总数冒充已加载行；全选仍覆盖当前模型的完整范围。",
    "虚拟行按稳定 ID 测量，支持实际可变行高；estimateRowHeight 应接近真实行高，未测量的远端行仍是估计。建议显式列宽，避免自动布局因窗口内容变化而重排；纯客户端页面需要查看或打印所有行时关闭虚拟化。",
    "焦点所在的离屏行额外保留一行，输入草稿不因滚动丢失；该行移出当前模型时，焦点仍属于它才回到滚动容器。"
  ],
  "notesEn": [
    "Import DataTablePattern from components/data-table; its pager reuses PaginationPattern. Applications still verify cross-page object data, permissions and bulk-action scope.",
    "TanStack is a declared optional peer; applications explicitly enable sorting, filtering and pagination models.",
    "With sorting and selection only and no pagination, pass `autoResetAll: false` to useReactTable: its automatic reset queues a state update outside render, and when the page loads lazily through Suspense a discarded render makes React warn about updating an unmounted component.",
    "In fixed layout, unsized text columns use TanStack's default dimensions; marker columns retain their marker and cell-inset roles. Interactive content is not clipped to force a narrow width: allow actual capacity for action columns.",
    "Virtualization retains table/thead/tbody/tr/th/td. Aria-rowcount and aria-rowindex describe the current table page including headers, without presenting server totals as loaded rows. Select-all still covers the complete current model scope.",
    "Virtual rows are measured by stable ID and support variable actual heights. Choose an estimateRowHeight close to actual rows: distant unmeasured heights remain estimates. Explicit column widths prevent window content from changing natural layout. Disable virtualization to view or print all client rows.",
    "One extra offscreen row retains focus and editor drafts while scrolling. When it leaves the current model, focus returns to the viewport only if that row still owned focus."
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
