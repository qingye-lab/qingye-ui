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
        { "name": "data / columns / getRowId / emptyContent", "type": "T[] / DataTablePatternColumn<T>[] / (row: T) => string / ReactNode", "description": "列显式配置 id、header、accessor、cell、sortable、rowHeader、numeric；可选 size、minSize、maxSize（px）与 ellipsis。写了 size 的列定宽，没写的列平分剩余空间。稳定 getRowId 必填。", "descriptionEn": "Columns configure id, header, accessor, cell, sortable, rowHeader and numeric, with optional size/minSize/maxSize in pixels and ellipsis. Columns with size are fixed; columns without it share the remaining width. Stable getRowId is required." },
        { "name": "state / defaultState / onStateChange", "type": "DataTablePatternState / Partial<DataTablePatternState> / (state, details) => void", "description": "sorting、pagination、rowSelection、activeRowId 共用快照；排序与回到第 1 页只通知一次。外部页码从 1 开始。", "descriptionEn": "A shared snapshot contains sorting, pagination, rowSelection and activeRowId; sorting and reset to page 1 produce one notification. Public page numbers start at 1." },
        { "name": "mode / pagination", "type": "client | server / false | DataTablePatternPagination", "description": "client 对完整数据排序切片并从 data.length 得到总数；server 只展示传入页，分页必须给 totalCount；未知 null 时还必须给 hasNextPage。", "descriptionEn": "Client mode sorts/slices complete data and derives totals from data.length; server mode presents supplied rows and requires totalCount, plus explicit hasNextPage when null." },
        { "name": "selection", "type": "{ label, rowLabel, canSelect? }", "description": "启用选择列；全选只改当页可选行并保留范围外 ID。服务端完整选中范围读取 state.rowSelection，不读当前页的 getSelectedRowModel。", "descriptionEn": "Enables selection; select-all changes eligible rows on the current page while preserving outside IDs. Read state.rowSelection for the complete server selection, not the loaded-page getSelectedRowModel." },
        { "name": "activeRow", "type": "({ trigger?: 'cell', columnId: string } | { trigger: 'row' }) & { onActivate?: (row: T) => void }", "description": "默认在指定列放激活按钮，cell 保持非交互内容；trigger=row 时点击行正文或聚焦行后按 Enter/Space。内部控件、链接、label 与编辑区不触发行激活；活动行与复选状态独立。", "descriptionEn": "By default the named column gets an activation button and its cell must be noninteractive. With trigger=row, click row content or focus the row and press Enter/Space. Nested controls, links, labels and editors do not activate the row; activation and selection remain independent." },
        { "name": "selectionAppearance", "type": "row | checkbox", "default": "row", "description": "checkbox 只取消选中行的底色，真实复选框仍保留；活动行的强调独立保留。", "descriptionEn": "Checkbox mode removes only selected-row fill, retaining actual checkboxes and independent active-row emphasis." },
        { "name": "virtualization", "type": "{ height: number, estimateRowHeight: number, overscan?: number }", "description": "显式启用当前行模型的虚拟化；height 含 caption 与表头，实际行高自动测量。尺寸须有限且为正，overscan 为非负整数（默认 1）。", "descriptionEn": "Explicitly virtualizes the current row model. Height includes the caption and header; actual row heights are measured. Dimensions must be finite and positive; overscan is a nonnegative integer, defaulting to 1." },
        { "name": "stickyHeader / stickyHeaderOffset", "type": "boolean / number | string", "description": "表头吸在最近的滚动区顶部：表格横向放得下时是页面或 Workspace 内容区；横向溢出的宽表、虚拟化视口，或 tableProps.containerProps 设了 height / max-height 时，是表格自己的容器。stickyHeaderOffset 让开滚动区顶上的固定页眉，数字按 px。", "descriptionEn": "Sticks the header to the top of the nearest scroll area: the page or Workspace content when the table fits horizontally; the table's own container for a horizontally overflowing table, the virtualization viewport, or a height / max-height set through tableProps.containerProps. stickyHeaderOffset clears a fixed bar above that area; numbers are px." },
        { "name": "columns[].pinned / columns[].empty", "type": "boolean / ReactNode", "description": "pinned 固定从第一列起连续的前导列（选择列自动一并固定，不连续时抛错），横向滚动后末端出现一条线。empty 是无 cell 的列在 null、undefined、空串时显示的内容，默认「—」加读屏的「无值」；0 照常显示。未知与不适用由调用方用 empty 区分。", "descriptionEn": "pinned fixes a contiguous run of leading columns (the selection column is pinned with them; non-contiguous pins throw) and draws an edge line once scrolled sideways. empty replaces the default dash plus screen-reader 'No value' for null, undefined or empty strings in columns without cell; zero still renders. Callers distinguish unknown from not applicable through empty." },
        { "name": "caption / busy / error / tableProps / native div props", "type": "ReactNode / boolean / ReactNode / DataTableProps / HTML props", "description": "busy 时旧数据行不动，表格顶缘出现不定进度记号，分页暂时挡住翻页但焦点留在原按钮。error 由应用给出内容和重试动作，摆在表格上方并声明 role=alert，旧数据行同样保留。属性分别归属表格或组合外层，不推断请求成功或失败。", "descriptionEn": "While busy the old rows stay put, an indeterminate mark appears along the top edge and the pager blocks paging while keeping focus on the pressed button. error is application content with its own retry action, placed above the table as role=alert; old rows stay as well. Props target the table or composition root and never infer request outcomes." }
      ]
    },
    {
      "name": "DataTable",
      "description": "原生二维集合。",
      "descriptionEn": "A native two-dimensional collection.",
      "props": [
        {
          "name": "table / emptyContent / caption / busy / error / activeRowId / containerProps",
          "type": "TableInstance<T> / ReactNode / TableContainerProps",
          "description": "getRowId 必填、至少一列；零值/caption 保留，busy 不删除有效 rows，也不变暗。数据行悬停读悬停面，选中与活动行保持更深的选中面。error 摆在表格上方（role=alert），应用自带重试动作。",
          "descriptionEn": "GetRowId and at least one visible column are required; zero and caption are retained, and busy keeps valid rows without dimming them. Data rows take the hover surface on pointer hover; selected and active rows keep the deeper selected surface. error is placed above the table as role=alert and carries its own retry action."
        },
        {
          "name": "table.options.columns[].size / table.options.columns[].minSize / table.options.columns[].maxSize / table.options.state.columnSizing",
          "type": "number / number / number / TanStack state",
          "description": "实际像素列宽，按 minSize/maxSize 钳制。显式配置任一尺寸或非空 columnSizing 时启用固定布局与 colgroup；未配置尺寸时保持原生自动布局。写了 size（或 defaultColumn.size，或 columnSizing 里有它）的列定宽，标记列取内容宽，其余列是弹性列：表宽 100%，弹性列平分剩余空间，minSize 是它的下限，未写 minSize 时下限为 150px（TanStack 默认 size）。表格最小宽度 = 定宽列之和 + 标记列之和 + 弹性列数 × 各弹性列下限的最大值，窄于此值时横向滚动。弹性列的 maxSize 不约束宽度，需要上限就写 size。没有弹性列时表宽等于各列之和，组合表头取可见叶列之和。不内置拖拽调宽。",
          "descriptionEn": "Actual pixel widths clamped by minSize/maxSize. Any explicit dimension or nonempty columnSizing opts into fixed layout with colgroup; otherwise native auto layout remains. A column with size (or defaultColumn.size, or an entry in columnSizing) is fixed, a marker column takes its content width, and every other column is flexible: the table is 100% wide, flexible columns split the remaining space, minSize is a flexible column's floor, and without minSize the floor is 150px (TanStack's default size). The table's minimum width is the fixed columns plus the marker columns plus the flexible column count times the largest flexible floor; below it the table scrolls horizontally. maxSize does not constrain a flexible column; write size when a cap is needed. Without flexible columns the table is as wide as its columns together, and grouped headers sum visible leaf widths. Drag resizing is not built in."
        },
        {
          "name": "columnDef.meta.ellipsis",
          "type": "boolean",
          "default": "false",
          "description": "对非交互的表头与单元格文字启用单行省略。完整文字始终在 DOM 与可访问名称里；真的被截断时这一格成为键盘停靠点，聚焦或悬停以 Tooltip 显示全文（不用原生 title：键盘与触屏读不到）。放得下的格不占 Tab 序列。含控件的内容不裁切。不省略时单元格默认折行显示全文；列宽决定容量，关键后果仍应直接可见。",
          "descriptionEn": "Ellipsizes noninteractive header/cell text on one line. The full text always stays in the DOM and accessible name; when actually truncated the cell becomes a keyboard stop and shows the full text in a Tooltip on focus or hover (not a native title, which keyboards and touch cannot read). Cells that fit stay out of the Tab sequence. Interactive content is not clipped. Without ellipsis cells wrap and show the full text; column widths determine capacity, so keep critical consequences visible."
        },
        {
          "name": "columnDef.meta.numeric",
          "type": "boolean",
          "default": "false",
          "description": "数值列由列定义声明，不由内容猜：表头与该列每个单元格同一对齐——行内末端（RTL 下在左）并用等宽数字。Pattern 的列配置同名。",
          "descriptionEn": "A numeric column is declared by the column definition, never guessed from content: header and every cell share one alignment, at the inline end (left in RTL), with tabular figures. The Pattern column config uses the same name."
        },
        {
          "name": "selectionAppearance / onRowActivate / virtualization",
          "type": "row | checkbox / (row: Row<T>) => void / DataTableVirtualization",
          "description": "选择外观与虚拟化同 Pattern；行激活回调收到 TanStack Row，调用方持有 activeRowId。整张表只有一行在 Tab 序列里（最近聚焦的行，否则活动行，否则第一行），方向键在行间移动。点击内部交互元素不激活，data-row-activate-ignore 可排除自定义区域；不改变选择。需要一个可见的 meta.rowHeader 列给行命名，否则抛错。",
          "descriptionEn": "Selection appearance and virtualization match Pattern. Row activation receives a TanStack Row; the caller owns activeRowId. Only one row is in the Tab sequence (the last focused row, else the active row, else the first) and arrow keys move between rows. Nested interactive elements and custom data-row-activate-ignore regions are excluded, and activation never changes selection. A visible meta.rowHeader column is required to name the rows; without one it throws."
        },
        {
          "name": "columnDef.meta.rowHeader",
          "type": "boolean",
          "description": "实际行标题用 th scope=row；比较列不自动隐藏。有可见行标题列时，每一行的 aria-labelledby 指向该行所有行标题单元格，行的可访问名称即这些单元格的文字（多个行标题列按列序连接）。DataTableSelectionCell 用它给每个选择框命名为「选择“该行名称”」，没有行标题列时才用泛称。设置了 onRowActivate 却没有可见的行标题列时抛错。",
          "descriptionEn": "Actual row headers use th scope=row; comparison columns are never automatically hidden. With a visible row-header column, each row's aria-labelledby points at all of its row-header cells, so the row's accessible name is their text (several row-header columns join in column order). DataTableSelectionCell names each checkbox after this row, falling back to a generic name only without a row-header column. onRowActivate without a visible row-header column throws."
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
          "description": "全选的 aria-label 和 scope 必填；checked/mixed 只看该范围可选择 rows。aria-label 只写动作与对象（如「选择条目」），组件按 scope 把范围追加到可访问名称末尾（「仅本页」或「全部筛选结果」），读屏用户据此知道勾选的后果。",
          "descriptionEn": "Select-all requires aria-label and scope; checked/mixed considers only selectable rows in that scope. Write the action and object in aria-label (for example \"Select entries\"); the component appends the range to the accessible name (\"this page only\" or \"all filtered results\") so screen reader users know what checking it selects."
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
    { "keys": "ArrowUp / ArrowDown / Home / End", "description": "行激活或虚拟化时，在行间移动焦点（虚拟化时也可从滚动容器出发，目标行先滚动渲染）；不会接管内部输入框的编辑键位。", "descriptionEn": "With row activation or virtualization, move focus between rows (in virtual mode also from the viewport, scrolling the target row into render first) without intercepting editing keys in nested inputs." }
  ],
  "notes": [
    "标准组合从 components/data-table 导入 DataTablePattern；分页内置复用 PaginationPattern，自 5.2.0 起随其改为一行布局，只有一页时只留范围摘要。跨页选择的对象内容、权限与批量执行范围仍由应用核实。",
    "TanStack 为已声明的可选 peer；应用明确启用排序/筛选/分页模型。",
    "只用排序与选择、不分页时，给 useReactTable 传 `autoResetAll: false`：它的自动重置在渲染之外排队更新状态，页面经 Suspense 懒加载时，被丢弃的那次渲染会让 React 报「未挂载组件更新状态」。",
    "固定布局中未写 size 的文字列是弹性列，平分定宽列与标记列之外的剩余空间；标记列仍按已有 marker 与单元格内缘角色取宽。列宽过小不会裁掉交互控件，请给操作列留下真实容量。",
    "虚拟化保留 table/thead/tbody/tr/th/td。aria-rowcount 与 aria-rowindex 描述当前表格页（含表头），不把服务端全局总数冒充已加载行；全选仍覆盖当前模型的完整范围。",
    "虚拟行按稳定 ID 测量，支持实际可变行高；estimateRowHeight 应接近真实行高，未测量的远端行仍是估计。建议显式列宽，避免自动布局因窗口内容变化而重排；纯客户端页面需要查看或打印所有行时关闭虚拟化。",
    "焦点所在的离屏行额外保留一行，输入草稿不因滚动丢失；该行移出当前模型时，焦点仍属于它才回到滚动容器。"
  ],
  "notesEn": [
    "Import DataTablePattern from components/data-table; its pager reuses PaginationPattern and since 5.2.0 follows its one-row layout, leaving only the range summary for a single page. Applications still verify cross-page object data, permissions and bulk-action scope.",
    "TanStack is a declared optional peer; applications explicitly enable sorting, filtering and pagination models.",
    "With sorting and selection only and no pagination, pass `autoResetAll: false` to useReactTable: its automatic reset queues a state update outside render, and when the page loads lazily through Suspense a discarded render makes React warn about updating an unmounted component.",
    "In fixed layout, text columns without size are flexible and split the width left over by fixed and marker columns; marker columns retain their marker and cell-inset roles. Interactive content is not clipped to force a narrow width: allow actual capacity for action columns.",
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
